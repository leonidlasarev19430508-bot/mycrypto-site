'use client';
import { useState, useEffect, useCallback } from 'react';

const EXCHANGES = {
  binance: { name: 'Binance', url: 'https://www.binance.com/register?ref=GRO_28502_BIO0R', color: 'bg-yellow-500' },
  whitebit: { name: 'WhiteBIT', url: 'https://whitebit.com/referral/54626c3b-5240-4d39-9784-8e3eda5736de', color: 'bg-blue-600' },
};

function fmtUsd(n: number): string {
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B';
  return '$' + Math.round(n / 1e6) + 'M';
}

function getSignal(tx: { symbol: string; from: string; to: string; amountUsd: number }) {
  const toExchange = ['binance', 'coinbase', 'kraken', 'okx', 'bybit'].some(e =>
    tx.to.toLowerCase().includes(e)
  );
  const fromExchange = ['binance', 'coinbase', 'kraken', 'okx', 'bybit'].some(e =>
    tx.from.toLowerCase().includes(e)
  );

  if (toExchange && tx.amountUsd > 50_000_000) {
    return {
      type: 'warning',
      emoji: '🚨',
      title: `Великий продаж ${tx.symbol}!`,
      message: `${fmtUsd(tx.amountUsd)} ${tx.symbol} переміщено на біржу. Можливий тиск на ціну — будь готовий!`,
      action: 'Торгувати зараз',
      color: 'from-red-600 to-red-700',
      exchange: 'binance',
    };
  }
  if (fromExchange && tx.amountUsd > 50_000_000) {
    return {
      type: 'bullish',
      emoji: '🐋',
      title: `Кит виводить ${tx.symbol}!`,
      message: `${fmtUsd(tx.amountUsd)} ${tx.symbol} виведено з біржі. Сигнал накопичення — можливе зростання!`,
      action: 'Купити зараз',
      color: 'from-green-600 to-green-700',
      exchange: 'binance',
    };
  }
  return {
    type: 'neutral',
    emoji: '🐳',
    title: `Whale Alert: ${tx.symbol}`,
    message: `${fmtUsd(tx.amountUsd)} ${tx.symbol} переміщено між гаманцями. Великий гравець в русі!`,
    action: 'Стежити за ринком',
    color: 'from-blue-600 to-blue-700',
    exchange: 'binance',
  };
}

export default function WhaleAlertPopup() {
  const [popup, setPopup] = useState<ReturnType<typeof getSignal> & { symbol: string; amount: string } | null>(null);
  const [visible, setVisible] = useState(false);
  const [shownIds, setShownIds] = useState<Set<string>>(new Set());

  const checkForWhales = useCallback(async () => {
    try {
      const res = await fetch('/api/whale-alerts');
      const data = await res.json();
      if (!Array.isArray(data)) return;

      const bigTx = data.find((tx: any) =>
        tx.amountUsd > 50_000_000 && !shownIds.has(tx.id)
      );

      if (bigTx) {
        const signal = getSignal(bigTx);
        setPopup({ ...signal, symbol: bigTx.symbol, amount: fmtUsd(bigTx.amountUsd) });
        setVisible(true);
        setShownIds(prev => new Set([...prev, bigTx.id]));

        setTimeout(() => setVisible(false), 15000);
      }
    } catch {}
  }, [shownIds]);

  useEffect(() => {
    // Показуємо demo popup через 5 секунд після завантаження
    const demoTimer = setTimeout(() => {
      const demoTx = {
        id: 'demo-1',
        symbol: 'BTC',
        amountUsd: 164_000_000,
        from: 'Unknown',
        to: 'Binance',
      };
      if (!shownIds.has('demo-1')) {
        const signal = getSignal(demoTx);
        setPopup({ ...signal, symbol: 'BTC', amount: '$164M' });
        setVisible(true);
        setShownIds(prev => new Set([...prev, 'demo-1']));
        setTimeout(() => setVisible(false), 15000);
      }
    }, 5000);

    // Перевіряємо реальні дані кожні 2 хвилини
    const interval = setInterval(checkForWhales, 120000);

    return () => {
      clearTimeout(demoTimer);
      clearInterval(interval);
    };
  }, []);

  if (!visible || !popup) return null;

  const exchange = EXCHANGES[popup.exchange as keyof typeof EXCHANGES];

  return (
    <div className="fixed bottom-24 left-4 z-40 max-w-sm animate-slide-in">
      <div className={`bg-gradient-to-r ${popup.color} rounded-2xl shadow-2xl overflow-hidden`}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-black/20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"/>
            <span className="text-white text-xs font-bold uppercase tracking-wider">🔴 LIVE Whale Alert</span>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="text-white/70 hover:text-white text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-4">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-3xl">{popup.emoji}</span>
            <div>
              <p className="text-white font-bold text-base leading-tight">{popup.title}</p>
              <p className="text-white/80 text-sm mt-1 leading-relaxed">{popup.message}</p>
            </div>
          </div>

          {/* Amount badge */}
          <div className="bg-white/20 rounded-xl px-3 py-2 mb-4 flex items-center justify-between">
            <span className="text-white/80 text-xs">Сума транзакції</span>
            <span className="text-white font-bold text-lg">{popup.amount}</span>
          </div>

          {/* CTA */}
          
            href={exchange.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-white text-gray-900 font-bold py-3 rounded-xl hover:bg-gray-100 transition text-sm"
          >
            🚀 {popup.action} на {exchange.name} →
          </a>
        </div>

        {/* Timer bar */}
        <div className="h-1 bg-white/20">
          <div
            className="h-1 bg-white/60 rounded"
            style={{ animation: 'shrink 15s linear forwards' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}