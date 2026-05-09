'use client';
import { useState, useEffect } from 'react';

type Popup = { emoji: string; title: string; message: string; action: string; color: string; amountUsd: number; };

const POPUPS: Popup[] = [
  { emoji: '🚨', title: 'Великий продаж BTC!', message: '$164M BTC переміщено на біржу. Будь готовий!', action: 'Торгувати зараз', color: 'from-red-600 to-red-700', amountUsd: 164000000 },
  { emoji: '🐋', title: 'Кит виводить ETH!', message: '$111M ETH виведено з біржі. Можливе зростання!', action: 'Купити зараз', color: 'from-green-600 to-green-700', amountUsd: 111000000 },
];

const URL = 'https://www.binance.com/register?ref=GRO_28502_BIO0R';

function fmt(n: number) { return n >= 1e9 ? '$'+(n/1e9).toFixed(1)+'B' : '$'+Math.round(n/1e6)+'M'; }

export default function WhaleAlertPopup() {
  const [popup, setPopup] = useState<Popup | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = (p: Popup) => { setPopup(p); setVisible(true); setTimeout(() => setVisible(false), 12000); };
    const t1 = setTimeout(() => show(POPUPS[0]), 6000);
    const t2 = setTimeout(() => show(POPUPS[1]), 180000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible || !popup) return null;

  return (
    <div className="fixed bottom-24 left-4 z-40 w-80" style={{ animation: 'slideIn 0.5s ease-out' }}>
      <div className={`bg-gradient-to-r ${popup.color} rounded-2xl shadow-2xl overflow-hidden`}>
        <div className="flex items-center justify-between px-4 py-3 bg-black/20">
          <span className="text-white text-xs font-bold uppercase tracking-wider">🔴 LIVE Whale Alert</span>
          <button onClick={() => setVisible(false)} className="text-white/70 hover:text-white text-lg">✕</button>
        </div>
        <div className="px-4 py-4">
          <div className="flex gap-3 mb-3">
            <span className="text-3xl">{popup.emoji}</span>
            <div>
              <p className="text-white font-bold">{popup.title}</p>
              <p className="text-white/80 text-sm mt-1">{popup.message}</p>
            </div>
          </div>
          <div className="bg-white/20 rounded-xl px-3 py-2 mb-4 flex justify-between">
            <span className="text-white/80 text-xs">Сума</span>
            <span className="text-white font-bold">{fmt(popup.amountUsd)}</span>
          </div>
          <a href={URL} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-white text-gray-900 font-bold py-3 rounded-xl hover:bg-gray-100 transition text-sm">
            🚀 {popup.action} на Binance →
          </a>
        </div>
        <div className="h-1 bg-white/20">
          <div className="h-1 bg-white/60" style={{ animation: 'shrink 12s linear forwards' }} />
        </div>
      </div>
      <style>{`
        @keyframes slideIn { from { transform: translateX(-110%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes shrink { from { width: 100%; } to { width: 0%; } }
      `}</style>
    </div>
  );
}