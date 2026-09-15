'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface WhaleAlert {
  id: string;
  symbol: string;
  amountUsd: number;
  from: string;
  to: string;
  timestamp: number;
}

function localeFromPathname(pathname: string): 'uk' | 'en' | 'pl' | 'de' {
  if (pathname.startsWith('/en')) return 'en';
  if (pathname.startsWith('/pl')) return 'pl';
  if (pathname.startsWith('/de')) return 'de';
  return 'uk';
}

const TIME: Record<'uk' | 'en' | 'pl' | 'de', { s: string; m: string; h: string; d: string }> = {
  uk: { s: 'с тому', m: 'хв тому', h: 'год тому', d: 'дн тому' },
  en: { s: 's ago', m: 'm ago', h: 'h ago', d: 'd ago' },
  pl: { s: 's temu', m: 'min temu', h: 'godz. temu', d: 'dni temu' },
  de: { s: 's her', m: 'Min. her', h: 'Std. her', d: 'Tagen her' },
};

function timeAgo(ts: number, t: (typeof TIME)['uk']): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}${t.s}`;
  if (s < 3600) return `${Math.floor(s / 60)}${t.m}`;
  if (s < 86400) return `${Math.floor(s / 3600)}${t.h}`;
  return `${Math.floor(s / 86400)}${t.d}`;
}

function fmtUsd(n: number): string {
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B';
  return '$' + Math.round(n / 1e6) + 'M';
}

export default function WhaleAlertTicker() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const t = TIME[locale];

  // Start empty: never show placeholder/demo data as if it were real market
  // signals. The n8n webhook is the only source of truth.
  const [txns, setTxns] = useState<WhaleAlert[]>([]);

  useEffect(() => {
    fetch('/api/whale-alerts')
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d) && d.length > 0) setTxns(d);
      })
      .catch(() => {});
  }, []);

  if (txns.length === 0) return null;

  // Duplicate the list once so the CSS marquee loops seamlessly.
  const items = [...txns, ...txns];

  return (
    <div className="w-full bg-gray-900 border-y border-gray-800 overflow-hidden">
      <div className="flex items-stretch">
        <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-orange-500">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-white text-xs font-bold uppercase tracking-wider whitespace-nowrap">
            Whale Alert
          </span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="flex whitespace-nowrap" style={{ animation: 'ticker 40s linear infinite' }}>
            {items.map((tx, i) => (
              <div
                key={tx.id + i}
                className="inline-flex items-center gap-2 px-5 py-2 border-r border-gray-800 flex-shrink-0"
              >
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-700">
                  {tx.symbol}
                </span>
                <span className="text-white text-sm font-semibold">{fmtUsd(tx.amountUsd)}</span>
                <span className="text-gray-400 text-xs">
                  {tx.from} to {tx.to}
                </span>
                <span className="text-gray-400 text-xs">{timeAgo(tx.timestamp, t)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}