'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const EXCHANGES = {
  binance: { name: 'Binance', url: 'https://www.binance.com/register?ref=GRO_28502_BIO0R' },
};

function fmtUsd(n: number): string {
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B';
  return '$' + Math.round(n / 1e6) + 'M';
}

const POPUPS = {
  uk: [
    { emoji: '🚨', title: 'Великий продаж BTC!', message: '$164M BTC переміщено на біржу. Будь готовий!', action: 'Торгувати зараз', amount: '$164M', color: 'from-red-600 to-red-700', amountUsd: 164000000 },
    { emoji: '🐋', title: 'Кит виводить ETH!', message: '$111M ETH виведено з біржі. Можливе зростання!', action: 'Купити зараз', amount: '$111M', color: 'from-green-600 to-green-700', amountUsd: 111000000 },
  ],
  en: [
    { emoji: '🚨', title: 'Massive BTC sell-off!', message: '$164M BTC moved to exchange. Be prepared!', action: 'Trade now', amount: '$164M', color: 'from-red-600 to-red-700', amountUsd: 164000000 },
    { emoji: '🐋', title: 'Whale withdrawing ETH!', message: '$111M ETH withdrawn from exchange. Possible rally!', action: 'Buy now', amount: '$111M', color: 'from-green-600 to-green-700', amountUsd: 111000000 },
  ],
  pl: [
    { emoji: '🚨', title: 'Masowa sprzedaż BTC!', message: '$164M BTC przeniesiono na giełdę. Bądź gotowy!', action: 'Handluj teraz', amount: '$164M', color: 'from-red-600 to-red-700', amountUsd: 164000000 },
    { emoji: '🐋', title: 'Wieloryb wypłaca ETH!', message: '$111M ETH wypłacono z giełdy. Możliwy wzrost!', action: 'Kup teraz', amount: '$111M', color: 'from-green-600 to-green-700', amountUsd: 111000000 },
  ],
  de: [
    { emoji: '🚨', title: 'Massiver BTC-Verkauf!', message: '$164M BTC an Börse transferiert. Sei bereit!', action: 'Jetzt handeln', amount: '$164M', color: 'from-red-600 to-red-700', amountUsd: 164000000 },
    { emoji: '🐋', title: 'Wal hebt ETH ab!', message: '$111M ETH von Börse abgehoben. Mögliche Rally!', action: 'Jetzt kaufen', amount: '$111M', color: 'from-green-600 to-green-700', amountUsd: 111000000 },
  ],
};

const LABELS = {
  uk: { live: 'LIVE Whale Alert', amount: 'Сума' },
  en: { live: 'LIVE Whale Alert', amount: 'Amount' },
  pl: { live: 'LIVE Whale Alert', amount: 'Kwota' },
  de: { live: 'LIVE Whale Alert', amount: 'Betrag' },
};

type PopupType = typeof POPUPS.uk[0];

export default function WhaleAlertPopup() {
  const pathname = usePathname();
  const locale = pathname.startsWith('/pl') ? 'pl'
    : pathname.startsWith('/de') ? 'de'
    : pathname.startsWith('/en') ? 'en'
    : 'uk';

  const popups = POPUPS[locale as keyof typeof POPUPS];
  const labels = LABELS[locale as keyof typeof LABELS];

  const [popup, setPopup] = useState<PopupType | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = (p: PopupType) => { setPopup(p); setVisible(true); setTimeout(() => setVisible(false), 12000); };
    const t1 = setTimeout(() => show(popups[0]), 6000);
    const t2 = setTimeout(() => show(popups[1]), 180000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [locale]);

  if (!visible || !popup) return null;

  const ex = EXCHANGES.binance;

  return (
    <div className="fixed bottom-24 left-4 z-40 w-80" style={{ animation: 'slideIn 0.5s ease-out' }}>
      <div className={`bg-gradient-to-r ${popup.color} rounded-2xl shadow-2xl overflow-hidden`}>
        <div className="flex items-center justify-between px-4 py-3 bg-black/20">
          <span className="text-white text-xs font-bold uppercase tracking-wider">🔴 {labels.live}</span>
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
            <span className="text-white/80 text-xs">{labels.amount}</span>
            <span className="text-white font-bold">{fmtUsd(popup.amountUsd)}</span>
          </div>
          <a href={ex.url} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-white text-gray-900 font-bold py-3 rounded-xl hover:bg-gray-100 transition text-sm">
            🚀 {popup.action} on {ex.name} →
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