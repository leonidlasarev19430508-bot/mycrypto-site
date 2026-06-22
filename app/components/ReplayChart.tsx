'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

interface Candle {
  openTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface ReplayChartProps {
  symbol: string;
  coinGeckoId: string;
  onPriceUpdate: (price: number) => void;
  locale?: string;
  recordingMode?: boolean;
}

const SPEED_OPTIONS = [
  { label: '1×', value: 1000 },
  { label: '5×', value: 200 },
  { label: '15×', value: 66 },
  { label: '60×', value: 16 },
];

const PRESETS = [
  { label: '7 днів', daysAgo: 7 },
  { label: '1 місяць', daysAgo: 30 },
  { label: '3 місяці', daysAgo: 90 },
  { label: '1 рік', daysAgo: 365 },
];

const UI: Record<string, Record<string, string>> = {
  uk: {
    loading: 'Завантаження свічок...',
    noData: 'Дані відсутні для цього діапазону',
    play: '▶ Відтворити',
    pause: '⏸ Пауза',
    restart: '⏮ Спочатку',
    speed: 'Швидкість',
    period: 'Період',
    candle: 'Свічка',
    of: 'з',
    replayMode: '⏪ Режим Replay',
    interval: 'Інтервал',
  },
  en: {
    loading: 'Loading candles...',
    noData: 'No data for this range',
    play: '▶ Play',
    pause: '⏸ Pause',
    restart: '⏮ Restart',
    speed: 'Speed',
    period: 'Period',
    candle: 'Candle',
    of: 'of',
    replayMode: '⏪ Replay Mode',
    interval: 'Interval',
  },
  pl: {
    loading: 'Ładowanie świec...',
    noData: 'Brak danych dla tego zakresu',
    play: '▶ Odtwórz',
    pause: '⏸ Pauza',
    restart: '⏮ Od początku',
    speed: 'Prędkość',
    period: 'Okres',
    candle: 'Świeca',
    of: 'z',
    replayMode: '⏪ Tryb Replay',
    interval: 'Interwał',
  },
  de: {
    loading: 'Kerzen werden geladen...',
    noData: 'Keine Daten für diesen Bereich',
    play: '▶ Abspielen',
    pause: '⏸ Pause',
    restart: '⏮ Neustart',
    speed: 'Geschwindigkeit',
    period: 'Zeitraum',
    candle: 'Kerze',
    of: 'von',
    replayMode: '⏪ Replay-Modus',
    interval: 'Intervall',
  },
};

export default function ReplayChart({
  symbol,
  coinGeckoId,
  onPriceUpdate,
  locale = 'uk',
  recordingMode = false,
}: ReplayChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<any>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [candles, setCandles] = useState<Candle[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [speedMs, setSpeedMs] = useState(200);
  const [daysAgo, setDaysAgo] = useState(30);
  const [chartInterval, setChartInterval] = useState<'1h' | '4h' | '1d'>('1h');

  const t = UI[locale] || UI.uk;

  const loadCandles = useCallback(async () => {
    setLoading(true);
    setError('');
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);

    const to = Date.now();
    const from = to - daysAgo * 24 * 60 * 60 * 1000;

    try {
      const res = await fetch(
        `/api/replay/candles?symbol=${symbol}&interval=${chartInterval}&from=${from}&to=${to}`
      );
      const data = await res.json();
      if (!res.ok || !data.candles?.length) {
        setError(t.noData);
        setCandles([]);
        return;
      }
      setCandles(data.candles);
      setCurrentIndex(0);
    } catch {
      setError(t.noData);
    } finally {
      setLoading(false);
    }
  }, [symbol, daysAgo, chartInterval, t]);

  useEffect(() => { loadCandles(); }, [loadCandles]);

  // Ініціалізація графіка — lightweight-charts v5 API
  useEffect(() => {
    if (!chartContainerRef.current || candles.length === 0) return;

    import('lightweight-charts').then((lc) => {
      // Очищаємо попередній графік
      if (chartRef.current) {
        try { chartRef.current.remove(); } catch {}
        chartRef.current = null;
        seriesRef.current = null;
      }

      const chart = lc.createChart(chartContainerRef.current!, {
        layout: {
          background: { type: lc.ColorType.Solid, color: '#ffffff' },
          textColor: '#374151',
          attributionLogo: false, // прибираємо логотип TradingView
        },
        grid: {
          vertLines: { color: '#f3f4f6' },
          horzLines: { color: '#f3f4f6' },
        },
        rightPriceScale: { borderColor: '#e5e7eb' },
        timeScale: {
          borderColor: '#e5e7eb',
          timeVisible: true,
          secondsVisible: false,
        },
        width: chartContainerRef.current!.clientWidth,
        height: 360,
      });

      // v5 API: addSeries з CandlestickSeries
      const candleSeries = chart.addSeries(lc.CandlestickSeries, {
        upColor: '#22c55e',
        downColor: '#ef4444',
        borderVisible: false,
        wickUpColor: '#22c55e',
        wickDownColor: '#ef4444',
      });

      chartRef.current = chart;
      seriesRef.current = candleSeries;

      const initialCount = Math.min(30, candles.length);
      const initialData = candles.slice(0, initialCount).map(c => ({
        time: Math.floor(c.openTime / 1000) as any,
        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close,
      }));
      candleSeries.setData(initialData);
      setCurrentIndex(initialCount);
      onPriceUpdate(candles[initialCount - 1]?.close || 0);
      // Показуємо останні 60 свічок щоб вони були достатньо широкими
      chart.timeScale().fitContent();
      if (initialData.length > 0) {
        const lastTime = initialData[initialData.length - 1].time as number;
        const firstTime = initialData[Math.max(0, initialData.length - 60)].time as number;
        chart.timeScale().setVisibleRange({ from: firstTime as any, to: (lastTime + 3600) as any });
      }

      const resizeObserver = new ResizeObserver(() => {
        if (chartContainerRef.current && chartRef.current) {
          chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
        }
      });
      if (chartContainerRef.current) resizeObserver.observe(chartContainerRef.current);

      return () => {
        resizeObserver.disconnect();
        try { chart.remove(); } catch {}
      };
    });
  }, [candles]);

  // Логіка відтворення
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!isPlaying || !seriesRef.current || candles.length === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev >= candles.length) {
          setIsPlaying(false);
          return prev;
        }
        const candle = candles[prev];
        try {
          seriesRef.current?.update({
            time: Math.floor(candle.openTime / 1000) as any,
            open: candle.open,
            high: candle.high,
            low: candle.low,
            close: candle.close,
          });
        } catch {}
        onPriceUpdate(candle.close);
        return prev + 1;
      });
    }, speedMs);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, speedMs, candles, onPriceUpdate]);

  const handleRestart = () => {
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (seriesRef.current && candles.length > 0) {
      const initialCount = Math.min(30, candles.length);
      const initialData = candles.slice(0, initialCount).map(c => ({
        time: Math.floor(c.openTime / 1000) as any,
        open: c.open, high: c.high, low: c.low, close: c.close,
      }));
      try { seriesRef.current.setData(initialData); } catch {}
      setCurrentIndex(initialCount);
      onPriceUpdate(candles[initialCount - 1]?.close || 0);
    }
  };

  const progress = candles.length > 0 ? Math.round((currentIndex / candles.length) * 100) : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {!recordingMode && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
          <span className="text-sm font-bold text-gray-700">{t.replayMode} — {symbol}</span>
          <span className="text-xs text-gray-400">
            {t.candle} {currentIndex} {t.of} {candles.length}
          </span>
        </div>
      )}

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-2" />
              <p className="text-sm text-gray-500">{t.loading}</p>
            </div>
          </div>
        )}
        {error && !loading && (
          <div className="h-[360px] flex items-center justify-center text-gray-400">
            <p>{error}</p>
          </div>
        )}
        <div ref={chartContainerRef} className="w-full" style={{ height: 360 }} />
      </div>

      {!recordingMode && candles.length > 0 && (
        <div className="h-1 bg-gray-100">
          <div className="h-1 bg-orange-500 transition-all duration-200" style={{ width: `${progress}%` }} />
        </div>
      )}

      {!recordingMode && (
        <div className="px-4 py-3 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsPlaying(p => !p)}
              disabled={loading || candles.length === 0}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-bold rounded-xl text-sm transition"
            >
              {isPlaying ? t.pause : t.play}
            </button>
            <button
              onClick={handleRestart}
              disabled={loading || candles.length === 0}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-gray-700 font-bold rounded-xl text-sm transition"
            >
              {t.restart}
            </button>
            <div className="flex items-center gap-1 ml-auto">
              <span className="text-xs text-gray-500 font-semibold">{t.speed}:</span>
              {SPEED_OPTIONS.map(opt => (
                <button key={opt.value} onClick={() => setSpeedMs(opt.value)}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition ${speedMs === opt.value ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-500 font-semibold">{t.period}:</span>
            {PRESETS.map(p => (
              <button key={p.daysAgo} onClick={() => setDaysAgo(p.daysAgo)}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition ${daysAgo === p.daysAgo ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {p.label}
              </button>
            ))}
            <div className="flex items-center gap-1 ml-auto">
              <span className="text-xs text-gray-500 font-semibold">{t.interval}:</span>
              {(['1h', '4h', '1d'] as const).map(iv => (
                <button key={iv} onClick={() => setChartInterval(iv)}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition ${chartInterval === iv ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {iv}
                </button>
              ))}
            </div>
          </div>

          {/* CoinGecko Attribution — вимога Demo плану */}
          <div className="flex justify-end">
            <a href="https://www.coingecko.com?utm_source=cryptonavigator&utm_medium=referral"
              target="_blank" rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-gray-600 transition">
              Price data provided by <span className="font-semibold text-gray-600">CoinGecko</span>
            </a>
          </div>
        </div>
      )}

      {recordingMode && (
        <div className="px-4 py-2 text-right">
          <span className="text-xs text-gray-400">Price data provided by CoinGecko</span>
        </div>
      )}
    </div>
  );
}
