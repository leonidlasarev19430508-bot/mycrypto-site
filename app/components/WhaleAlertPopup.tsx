'use client';
import { useState, useEffect } from 'react';

const EXCHANGES = {
  binance: { name: 'Binance', url: 'https://www.binance.com/register?ref=GRO_28502_BIO0R' },
  whitebit: { name: 'WhiteBIT', url: 'https://whitebit.com/referral/54626c3b-5240-4d39-9784-8e3eda5736de' },
};

function fmtUsd(n: number): string {
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B';
  return '$' + Math.round(n / 1e6) + 'M';
}

const DEMO_POPUPS = [
  { symbol: 'BTC', amountUsd: 164_000_000, from: 'Unknown', to: 'Binance', emoji: '🚨', title: 'Великий продаж BTC!', message: '$164M BTC переміщено на біржу. Можливий тиск на ціну — будь готовий!', action: 'Торгувати зараз', color: 'from-red-600 to-red-700', exchange: 'binance' },
  { symbol: 'ETH', amountUsd: 111_000_000, from: 'Unknown', to: 'Coinbase', emoji: '🐋', title: 'Кит виводить ETH!', message: '$111M ETH виведено з біржі. Сигнал накопичення — можливе зростання!', action: 'Купити зараз', color: 'from-green-600 to-green-700', exchange: 'binance' },
  { symbol: 'BTC', amountUsd: 69_500_000, from: 'Unknown', to: 'Binance', emoji: '🚨', title: 'Увага! Рух BTC!', message: '$69M BTC переміщено на Binance. Великий гравець в дії!', action: 'Діяти зараз', color: 'from-orange-600 to-orange-700', exchange: 'binance' },
];

export default function WhaleAlertPopup() {
  const [popup, setPopup] = useState<typeof DEMO_POPUPS[0] | null>(null);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Перший popup через 6 секунд
    const first = setTimeout(() => {
      setPopup(DEMO_POPUPS[0]);
      setVisible(true);

      // Ховаємо через 12 секунд
      setTimeout(() => setVisible(false), 12000);
    }, 6000);

    // Другий popup через 3 хвилини
    const second = setTimeout(() => {
      setPopup(DEMO_POPUPS[1]);
      setVisible(true);
      setTimeout(() => setVisible(false), 12000);
    }, 180000);

    // Третій popup через 6 хвилин
    const third = setTimeout(() => {
      setPopup(DEMO_POPUPS[2]);
      setVisible(true);
      setTimeout(() => setVisible(false), 12000);
    }, 360000);

    return () => {
      clearTimeout(first);
      clearTimeout(second);
      clearTimeout(third);
    };
  }, []);

  if (!visible || !popup) return null;

  const exchange = EXCHANGES[popup.exchange as keyof typeof EXCHANGES];

  return (
    <div
      className="fixed bottom-24 left-4 z-40 max-w-sm"
      style={{ animation: 'slideIn 0.5s ease-out' }}
    >
      <div className={`bg-gradient-to-r ${popup.color} rounded-2xl shadow-2xl overflow-hidden`}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-black/20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white text-xs font-bold uppercase tracking-wider">🔴 LIVE Whale Alert</span>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="text-white/70 hover:text-white text-lg leading-none ml-4"
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

          <div className="bg-white/20 rounded-xl px-3 py-2 mb-4 flex items-center justify-between">
            <span className="text-white/80 text-xs">Сума транзакції</span>
            <span className="text-white font-bold text-lg">{fmtUsd(popup.amountUsd)}</span>
          </div>

          
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
          <div className="h-1 bg-white/60 rounded" style={{ animation: 'shrink 12s linear forwards' }} />
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(-110%); opacity: 0; }
          to { transform: translateX(0); opac