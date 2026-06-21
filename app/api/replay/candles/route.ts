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

const KRAKEN_OHLC_URL = 'https://api.kraken.com/0/public/OHLC';

// Дозволені інтервали (наша внутрішня нотація)
const ALLOWED_INTERVALS = ['1m', '5m', '15m', '1h', '4h', '1d'] as const;
type Interval = typeof ALLOWED_INTERVALS[number];

// Kraken очікує інтервал у хвилинах
const INTERVAL_TO_MINUTES: Record<Interval, number> = {
  '1m': 1,
  '5m': 5,
  '15m': 15,
  '1h': 60,
  '4h': 240,
  '1d': 1440,
};

// Мапа наших символів (у стилі Binance, напр. BTCUSDT) на пари Kraken.
// Розширюйте за потреби, коли додаватимете нові монети.
const SYMBOL_TO_KRAKEN_PAIR: Record<string, string> = {
  BTCUSDT: 'XBTUSDT',
  ETHUSDT: 'ETHUSDT',
  SOLUSDT: 'SOLUSDT',
  XRPUSDT: 'XRPUSDT',
  ADAUSDT: 'ADAUSDT',
  DOGEUSDT: 'DOGEUSDT',
  BNBUSDT: 'BNBUSDT',
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

  // Валідація вхідних параметрів
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

  const krakenPair = SYMBOL_TO_KRAKEN_PAIR[symbol];
  if (!krakenPair) {
    return NextResponse.json(
      { error: `Символ ${symbol} поки не підтримується. Додайте мапінг у SYMBOL_TO_KRAKEN_PAIR.` },
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
    // 1. Спершу перевіряємо кеш у БД
    const cached = await getCachedCandles(symbol, interval, fromTs, toTs);

    // 2. Якщо в кеші достатньо даних — віддаємо одразу
    if (cached.length > 0 && isCoverageComplete(cached, fromTs, toTs, interval)) {
      return NextResponse.json({ candles: cached, source: 'cache' });
    }

    // 3. Інакше тягнемо свіжі дані з Kraken і кешуємо
    const fresh = await fetchFromKraken(krakenPair, interval, fromTs, toTs);

    if (fresh.length === 0) {
      return NextResponse.json(
        { error: 'Дані не знайдено для заданого періоду/символу' },
        { status: 404 }
      );
    }

    await cacheCandles(symbol, interval, fresh);

    return NextResponse.json({ candles: fresh, source: 'kraken' });
  } catch (error) {
    console.error('Помилка отримання historical candles:', error);
    return NextResponse.json(
      { error: 'Внутрішня помилка сервера при отриманні даних', details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * Дістає свічки з кешу (Neon Postgres)
 */
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

/**
 * Перевіряє, чи кеш покриває весь запитаний діапазон без великих "дірок".
 */
function isCoverageComplete(
  candles: Candle[],
  from: number,
  to: number,
  interval: Interval
): boolean {
  const intervalMs = intervalToMs(interval);
  const expectedCount = Math.floor((to - from) / intervalMs);

  // Допускаємо невелику похибку (наприклад, відсутність останньої незакритої свічки)
  return candles.length >= expectedCount - 1;
}

function intervalToMs(interval: Interval): number {
  return INTERVAL_TO_MINUTES[interval] * 60_000;
}

/**
 * Тягне історичні свічки з Kraken public API.
 * Kraken повертає максимум 720 свічок за один запит — робимо пагінацію через `since`.
 * Документація: https://docs.kraken.com/api/docs/rest-api/get-ohlc-data
 */
async function fetchFromKraken(
  pair: string,
  interval: Interval,
  from: number,
  to: number
): Promise<Candle[]> {
  const allCandles: Candle[] = [];
  const minutes = INTERVAL_TO_MINUTES[interval];
  let sinceSeconds = Math.floor(from / 1000);
  const toSeconds = Math.floor(to / 1000);

  // Запобіжник від нескінченного циклу
  let iterations = 0;
  const MAX_ITERATIONS = 20;

  while (sinceSeconds < toSeconds && iterations < MAX_ITERATIONS) {
    iterations++;

    const url = new URL(KRAKEN_OHLC_URL);
    url.searchParams.set('pair', pair);
    url.searchParams.set('interval', minutes.toString());
    url.searchParams.set('since', sinceSeconds.toString());

    const response = await fetch(url.toString());

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`Kraken API помилка: ${response.status} ${errBody}`);
    }

    const data = await response.json();

    if (data.error && data.error.length > 0) {
      throw new Error(`Kraken API помилка: ${data.error.join(', ')}`);
    }

    // Результат лежить під ключем пари, напр. data.result['XBTUSDT']
    const resultKeys = Object.keys(data.result || {}).filter((k) => k !== 'last');
    if (resultKeys.length === 0) break;

    const rows: any[] = data.result[resultKeys[0]];
    if (!Array.isArray(rows) || rows.length === 0) break;

    for (const r of rows) {
      const openTimeMs = r[0] * 1000;
      if (openTimeMs < from || openTimeMs > to) continue;

      allCandles.push({
        openTime: openTimeMs,
        open: parseFloat(r[1]),
        high: parseFloat(r[2]),
        low: parseFloat(r[3]),
        close: parseFloat(r[4]),
        volume: parseFloat(r[6]),
      });
    }

    const last = data.result.last;
    if (!last || last === sinceSeconds) break; // немає прогресу — зупиняємось

    sinceSeconds = last;
  }

  return allCandles;
}

/**
 * Зберігає свічки в кеш. Використовує ON CONFLICT для уникнення дублікатів.
 */
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
