import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

// Lazy-ініціалізація: клієнт створюється лише під час реального запиту,
// а не під час білда (коли DATABASE_URL ще недоступний у Next.js build step)
function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL не налаштований');
  }
  return neon(process.env.DATABASE_URL);
}

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';

const ALLOWED_INTERVALS = ['1m', '5m', '15m', '1h', '4h', '1d'] as const;
type Interval = typeof ALLOWED_INTERVALS[number];

const INTERVAL_MS: Record<Interval, number> = {
  '1m': 60_000,
  '5m': 5 * 60_000,
  '15m': 15 * 60_000,
  '1h': 60 * 60_000,
  '4h': 4 * 60 * 60_000,
  '1d': 24 * 60 * 60_000,
};

// Мапа символів (стиль Binance, напр. BTCUSDT) на CoinGecko coin id.
// Розширюйте за потреби, коли додаватимете нові монети.
const SYMBOL_TO_COINGECKO_ID: Record<string, string> = {
  BTCUSDT: 'bitcoin',
  ETHUSDT: 'ethereum',
  SOLUSDT: 'solana',
  XRPUSDT: 'ripple',
  ADAUSDT: 'cardano',
  DOGEUSDT: 'dogecoin',
  BNBUSDT: 'binancecoin',
};

interface Candle {
  openTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

/**
 * GET /api/replay/candles?symbol=BTCUSDT&interval=1h&from=1640995200000&to=1641081600000
 *
 * from/to — timestamp у мілісекундах
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const symbol = searchParams.get('symbol')?.toUpperCase();
  const interval = searchParams.get('interval') as Interval;
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  if (!symbol || !interval || !from || !to) {
    return NextResponse.json(
      { error: 'Потрібні параметри: symbol, interval, from, to' },
      { status: 400 }
    );
  }

  if (!ALLOWED_INTERVALS.includes(interval)) {
    return NextResponse.json(
      { error: `Інтервал має бути одним з: ${ALLOWED_INTERVALS.join(', ')}` },
      { status: 400 }
    );
  }

  const coinId = SYMBOL_TO_COINGECKO_ID[symbol];
  if (!coinId) {
    return NextResponse.json(
      { error: `Символ ${symbol} поки не підтримується. Додайте мапінг у SYMBOL_TO_COINGECKO_ID.` },
      { status: 400 }
    );
  }

  const fromTs = parseInt(from, 10);
  const toTs = parseInt(to, 10);

  if (isNaN(fromTs) || isNaN(toTs) || fromTs >= toTs) {
    return NextResponse.json(
      { error: 'Некоректний діапазон from/to' },
      { status: 400 }
    );
  }

  try {
    const cached = await getCachedCandles(symbol, interval, fromTs, toTs);

    if (cached.length > 0 && isCoverageComplete(cached, fromTs, toTs, interval)) {
      return NextResponse.json({ candles: cached, source: 'cache' });
    }

    const fresh = await fetchFromCoinGecko(coinId, interval, fromTs, toTs);

    if (fresh.length === 0) {
      return NextResponse.json(
        { error: 'Дані не знайдено для заданого періоду/символу' },
        { status: 404 }
      );
    }

    await cacheCandles(symbol, interval, fresh);

    return NextResponse.json({ candles: fresh, source: 'coingecko' });
  } catch (error) {
    console.error('Помилка отримання historical candles:', error);
    return NextResponse.json(
      { error: 'Внутрішня помилка сервера при отриманні даних', details: String(error) },
      { status: 500 }
    );
  }
}

async function getCachedCandles(
  symbol: string,
  interval: string,
  from: number,
  to: number
): Promise<Candle[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT open_time, open, high, low, close, volume
    FROM historical_candles
    WHERE symbol = ${symbol}
      AND interval = ${interval}
      AND open_time >= ${from}
      AND open_time <= ${to}
    ORDER BY open_time ASC
  `;

  return rows.map((row: any) => ({
    openTime: Number(row.open_time),
    open: Number(row.open),
    high: Number(row.high),
    low: Number(row.low),
    close: Number(row.close),
    volume: Number(row.volume),
  }));
}

function isCoverageComplete(
  candles: Candle[],
  from: number,
  to: number,
  interval: Interval
): boolean {
  const intervalMs = INTERVAL_MS[interval];
  const expectedCount = Math.floor((to - from) / intervalMs);
  return candles.length >= expectedCount - 1;
}

/**
 * Тягне історичні ціни з CoinGecko (market_chart/range — підтримує довільний
 * діапазон from/to, на відміну від /ohlc, який рахує дні назад від "зараз").
 * Цей ендпоінт віддає не готові свічки, а серію точок ціни/обсягу,
 * тому ми самостійно "збираємо" їх у candle потрібного інтервалу.
 * Документація: https://docs.coingecko.com/reference/coins-id-market-chart-range
 */
async function fetchFromCoinGecko(
  coinId: string,
  interval: Interval,
  from: number,
  to: number
): Promise<Candle[]> {
  const url = new URL(`${COINGECKO_BASE}/coins/${coinId}/market_chart/range`);
  url.searchParams.set('vs_currency', 'usd');
  url.searchParams.set('from', Math.floor(from / 1000).toString());
  url.searchParams.set('to', Math.floor(to / 1000).toString());

  const headers: Record<string, string> = {};
  const apiKey = process.env.COINGECKO_API_KEY;
  if (apiKey) headers['x-cg-demo-api-key'] = apiKey;

  const response = await fetch(url.toString(), { headers });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`CoinGecko API помилка: ${response.status} ${errBody}`);
  }

  const data = await response.json();
  const prices: [number, number][] = data.prices || [];
  const volumes: [number, number][] = data.total_volumes || [];

  if (prices.length === 0) return [];

  // Мапа часу -> обсяг для швидкого пошуку під час групування
  const volumeByTime = new Map<number, number>();
  for (const [t, v] of volumes) volumeByTime.set(t, v);

  return bucketPricesIntoCandles(prices, volumeByTime, INTERVAL_MS[interval], from, to);
}

/**
 * Групує серію точок [timestamp, price] у свічки заданого інтервалу:
 * open — перша ціна в "кошику", close — остання, high/low — екстремуми,
 * volume — сума обсягів точок, що потрапили в цей кошик.
 */
function bucketPricesIntoCandles(
  prices: [number, number][],
  volumeByTime: Map<number, number>,
  intervalMs: number,
  from: number,
  to: number
): Candle[] {
  const buckets = new Map<number, { prices: number[]; volume: number }>();

  for (const [time, price] of prices) {
    if (time < from || time > to) continue;

    const bucketStart = Math.floor((time - from) / intervalMs) * intervalMs + from;

    if (!buckets.has(bucketStart)) {
      buckets.set(bucketStart, { prices: [], volume: 0 });
    }
    const bucket = buckets.get(bucketStart)!;
    bucket.prices.push(price);
    bucket.volume += volumeByTime.get(time) || 0;
  }

  const candles: Candle[] = [];
  const sortedKeys = Array.from(buckets.keys()).sort((a, b) => a - b);

  for (const key of sortedKeys) {
    const { prices: p, volume } = buckets.get(key)!;
    candles.push({
      openTime: key,
      open: p[0],
      high: Math.max(...p),
      low: Math.min(...p),
      close: p[p.length - 1],
      volume,
    });
  }

  return candles;
}

async function cacheCandles(
  symbol: string,
  interval: string,
  candles: Candle[]
): Promise<void> {
  const sql = getSql();
  const BATCH_SIZE = 200;

  for (let i = 0; i < candles.length; i += BATCH_SIZE) {
    const batch = candles.slice(i, i + BATCH_SIZE);

    await Promise.all(
      batch.map((c) =>
        sql`
          INSERT INTO historical_candles
            (symbol, interval, open_time, open, high, low, close, volume)
          VALUES
            (${symbol}, ${interval}, ${c.openTime}, ${c.open}, ${c.high}, ${c.low}, ${c.close}, ${c.volume})
          ON CONFLICT (symbol, interval, open_time) DO NOTHING
        `
      )
    );
  }
}
