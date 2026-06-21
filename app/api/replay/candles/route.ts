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

const BINANCE_KLINES_URL = 'https://api.binance.com/api/v3/klines';

// Дозволені інтервали (відповідають Binance API)
const ALLOWED_INTERVALS = ['1m', '5m', '15m', '1h', '4h', '1d'] as const;
type Interval = typeof ALLOWED_INTERVALS[number];

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

    // 3. Інакше тягнемо свіжі дані з Binance і кешуємо
    const fresh = await fetchFromBinance(symbol, interval, fromTs, toTs);

    if (fresh.length === 0) {
      return NextResponse.json(
        { error: 'Дані не знайдено для заданого періоду/символу' },
        { status: 404 }
      );
    }

    await cacheCandles(symbol, interval, fresh);

    return NextResponse.json({ candles: fresh, source: 'binance' });
  } catch (error) {
    console.error('Помилка отримання historical candles:', error);
    return NextResponse.json(
      { error: 'Внутрішня помилка сервера при отриманні даних' },
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
 * Спрощена евристика: порівнюємо кількість отриманих свічок з очікуваною
 * кількістю для даного інтервалу й діапазону.
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
  const map: Record<Interval, number> = {
    '1m': 60_000,
    '5m': 5 * 60_000,
    '15m': 15 * 60_000,
    '1h': 60 * 60_000,
    '4h': 4 * 60 * 60_000,
    '1d': 24 * 60 * 60_000,
  };
  return map[interval];
}

/**
 * Тягне історичні свічки з Binance public API.
 * Binance віддає максимум 1000 свічок за один запит — за потреби робимо пагінацію.
 */
async function fetchFromBinance(
  symbol: string,
  interval: Interval,
  from: number,
  to: number
): Promise<Candle[]> {
  const allCandles: Candle[] = [];
  let currentFrom = from;
  const MAX_LIMIT = 1000;

  while (currentFrom < to) {
    const url = new URL(BINANCE_KLINES_URL);
    url.searchParams.set('symbol', symbol);
    url.searchParams.set('interval', interval);
    url.searchParams.set('startTime', currentFrom.toString());
    url.searchParams.set('endTime', to.toString());
    url.searchParams.set('limit', MAX_LIMIT.toString());

    const response = await fetch(url.toString());

    if (!response.ok) {
      // Binance повертає 400 якщо символ невірний тощо
      const errBody = await response.text();
      throw new Error(`Binance API помилка: ${response.status} ${errBody}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      break;
    }

    for (const k of data) {
      allCandles.push({
        openTime: k[0],
        open: parseFloat(k[1]),
        high: parseFloat(k[2]),
        low: parseFloat(k[3]),
        close: parseFloat(k[4]),
        volume: parseFloat(k[5]),
      });
    }

    const lastOpenTime = data[data.length - 1][0];

    // Якщо отримали менше за ліміт — це останній шматок даних
    if (data.length < MAX_LIMIT) break;

    currentFrom = lastOpenTime + intervalToMs(interval);
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
  // Вставляємо пачками, щоб не перевантажити запит
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
