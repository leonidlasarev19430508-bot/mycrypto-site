'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const EXCHANGES = {
  binance: { name: 'Binance', url: 'https://www.binance.com/register?ref=GRO_28502_BIO0R' },
};

const LABELS = {
  uk: { live: 'LIVE Whale Alert', amount: 'Сума', action: 'Торгувати зараз' },
  en: { live: 'LIVE Whale Alert', amount: 'Amount', action: 'Trade now' },
  pl: { live: 'LIVE Whale Alert', amount: 'Kwota', action: 'Handluj teraz' },
  de: { live: 'LIVE Whale Alert', amount: 'Betrag', action: 'Jetzt handeln' },
};

const FALLBACK_ALERTS = [
  { symbol: 'BTC', amount_usd: 164000000, direction: 'to_exchange' },
  { symbol: 'ETH', amount_usd: 111000000, direction: 'from_exchange' },
  { symbol: 'BTC', amount_usd: 89000000, direction: 'to_exchange' },
];

const TITLES = {
  uk: (sym: string, dir: string) => dir === 'to_exchange' ? `🚨 Великий переказ ${sym} на біржу!` : `🐋 Кит виводить ${sym} з біржі!`,
  en: (sym: string, dir: string) => dir === 'to_exchange' ? `🚨 Large ${sym} transfer to exchange!` : `🐋 Whale withdrawing ${sym} from exchange!`,
  pl: (sym: string, dir: string) => dir === 'to_exchange' ? `🚨 Duży transfer ${sym} na giełdę!` : `🐋 Wieloryb wypłaca ${sym} z giełdy!`,
  de: (sym: string, dir: string) => dir === 'to_exchange' ? `🚨 Großer ${sym} Transfer zur Börse!` : `🐋 Wal hebt ${sym} von der Börse ab!`,
};

const MESSAGES = {
  uk: (amt: string, sym: string, dir: string) => dir === 'to_exchange' ? `${amt} ${sym} переміщено на біржу. Будь готовий!` : `${amt} ${sym} виведено з біржі. Можливе зростання!`,
  en: (amt: string, sym: string, dir: string) => dir === 'to_exchange' ? `${amt} ${sym} moved to exchange. Be prepared!` : `${amt} ${sym} withdrawn from exchange. Possible rally!`,
  pl: (amt: string, sym: string, dir: string) => dir === 'to_exchange' ? `${amt} ${sym} przeniesiono na giełdę. Bądź gotowy!` : `${amt} ${sym} wypłacono z giełdy. Możliwy wzrost!`,
  de: (amt: string, sym: string, dir: string) => dir === 'to_exchange' ? `${amt} ${sym} an Börse transferiert. Sei bereit!` : `${amt} ${sym} von Börse abgehoben. Mögliche Rally!`,
};

function fmtUsd(n: number): string {
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B';
  return '$' + Math.round(n / 1e6) + 'M';
}

const COOLDOWN_KEY = 'whale_popup_shown';
const COOLDOWN_MS = 24 * 60 * 60 * 1000;

type WhaleAlert = { symbol: string; amount_usd: number; direction?: string; };

export default function WhaleAlertPopup() {
  const pathname = usePathname();
  const locale = pathname.startsWith('/pl') ? 'pl'
    : pathname.startsWith('/de') ? 'de'
    : pathname.startsWith('/en') ? 'en'
    : 'uk';

  const labels = LABELS[locale as keyof typeof LABELS];
  const [alert, setAlert] = useState<WhaleAlert | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem(COOLDOWN_KEY);
    if (lastShown && Date.now() - Number(lastShown) < COOLDOWN_MS) return;

    fetch('/api/whale-alerts')
      .then(r => r.json())
      .then(data => {
        const items = Array.isArray(data) && data.length > 0 ? data : FALLBACK_ALERTS;
        const item = items[Math.floor(Math.random() * Math.min(items.length, 3))];
        setTimeout(() => {
          setAlert(item);
          setVisible(true);
          localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
          setTimeout(() => setVisible(false), 12000);
        }, 8000);
      })
      .catch(() => {});
  }, []);

  if (!visible || !alert) return null;

  const sym = alert.symbol || 'BTC';
  const dir = alert.direction || 'to_exchange';
  const amtFormatted = fmtUsd(alert.amount_usd || 0);
  const color = dir === 'to_exchange' ? 'from-red-600 to-red-700' : 'from-green-600 to-green-700';
  const titleFn = TITLES[locale as keyof typeof TITLES];
  const msgFn = MESSAGES[locale as keyof typeof MESSAGES];

  return (
    <div className="fixed bottom-24 left-4 z-40 w-80" style={{ animation: 'slideIn 0.5s ease-out' }}>
      <div className={`bg-gradient-to-r ${color} rounded-2xl shadow-2xl overflow-hidden`}>
        <div className="flex items-center justify-between px-4 py-3 bg-black/20">
          <span className="text-white text-xs font-bold uppercase tracking-wider">🔴 {labels.live}</span>
          <button onClick={() => setVisible(false)} className="text-white/70 hover:text-white text-lg">✕</button>
        </div>
        <div className="px-4 py-4">
          <div className="flex gap-3 mb-3">
            <span className="text-3xl">{dir === 'to_exchange' ? '🚨' : '🐋'}</span>
            <div>
              <p className="text-white font-bold">{titleFn(sym, dir)}</p>
              <p className="text-white/80 text-sm mt-1">{msgFn(amtFormatted, sym, dir)}</p>
            </div>
          </div>
          <div className="bg-white/20 rounded-xl px-3 py-2 mb-4 flex justify-between">
            <span className="text-white/80 text-xs">{labels.amount}</span>
            <span className="text-white font-bold">{amtFormatted}</span>
          </div>
          <a href={EXCHANGES.binance.url} target="_blank" rel="noopener noreferrer"
            className="block w-full text-center bg-white text-gray-900 font-bold py-3 rounded-xl hover:bg-gray-100 transition text-sm">
            🚀 {labels.action} on {EXCHANGES.binance.name} →
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
