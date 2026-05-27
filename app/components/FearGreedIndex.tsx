"use client";
import { useEffect, useState } from "react";

interface FGData { value: string; value_classification: string; timestamp: string; }

const LABELS: Record<string, Record<string, string>> = {
  uk: {
    "Extreme Fear": "Екстремальний страх",
    "Fear": "Страх",
    "Neutral": "Нейтрально",
    "Greed": "Жадібність",
    "Extreme Greed": "Екстремальна жадібність",
    "loading": "Завантаження...",
    "dynamics": "Динаміка",
    "now": "Зараз",
    "yesterday": "Вчора",
    "week": "Тиждень тому",
    "month": "Місяць тому",
  },
  pl: {
    "Extreme Fear": "Ekstremalny strach",
    "Fear": "Strach",
    "Neutral": "Neutralny",
    "Greed": "Chciwość",
    "Extreme Greed": "Ekstremalna chciwość",
    "loading": "Ładowanie...",
    "dynamics": "Dynamika",
    "now": "Teraz",
    "yesterday": "Wczoraj",
    "week": "Tydzień temu",
    "month": "Miesiąc temu",
  },
  de: {
    "Extreme Fear": "Extremer Angst",
    "Fear": "Angst",
    "Neutral": "Neutral",
    "Greed": "Gier",
    "Extreme Greed": "Extreme Gier",
    "loading": "Laden...",
    "dynamics": "Dynamik",
    "now": "Jetzt",
    "yesterday": "Gestern",
    "week": "Vor einer Woche",
    "month": "Vor einem Monat",
  },
  en: {
    "Extreme Fear": "Extreme Fear",
    "Fear": "Fear",
    "Neutral": "Neutral",
    "Greed": "Greed",
    "Extreme Greed": "Extreme Greed",
    "loading": "Loading...",
    "dynamics": "Dynamics",
    "now": "Now",
    "yesterday": "Yesterday",
    "week": "Week ago",
    "month": "Month ago",
  },
};

function getColor(v: number) {
  return v < 25 ? "#E24B4A" : v < 45 ? "#EF9F27" : v < 56 ? "#FAC775" : v < 75 ? "#97C459" : "#639922";
}

interface Props {
  locale?: 'uk' | 'pl' | 'de' | 'en';
}

export default function FearGreedIndex({ locale = 'uk' }: Props) {
  const [data, setData] = useState<FGData[] | null>(null);
  const t = LABELS[locale] || LABELS.uk;

  useEffect(() => {
    fetch("https://api.alternative.me/fng/?limit=32")
      .then(r => r.json())
      .then(d => {
        if (Array.isArray(d.data) && d.data.length > 0) setData(d.data);
      })
      .catch(() => {});
  }, []);

  if (!data) return (
    <div className="max-w-xl mx-auto py-8 px-4 text-center text-gray-400 text-sm">
      {t.loading}
    </div>
  );

  const now = data[0];
  const yesterday = data[1] ?? data[0];
  const weekAgo = data[7] ?? data[data.length - 1] ?? data[0];
  const monthAgo = data[30] ?? data[data.length - 1] ?? data[0];

  if (!now) return null;

  const val = parseInt(now.value);
  const color = getColor(val);
  const angle = -90 + (val / 100) * 180;

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <span className="font-medium text-sm">Fear &amp; Greed Index</span>
        <span className="text-xs text-gray-400">alternative.me</span>
      </div>
      <div className="flex flex-col items-center mb-6">
        <svg viewBox="0 0 280 160" width="260">
          <path d="M30,140 A110,110 0 0,1 250,140" fill="none" stroke="#E24B4A" strokeWidth="18"/>
          <path d="M30,140 A110,110 0 0,1 250,140" fill="none" stroke="#EF9F27" strokeWidth="18" strokeDasharray="138 207" strokeDashoffset="-138"/>
          <path d="M30,140 A110,110 0 0,1 250,140" fill="none" stroke="#FAC775" strokeWidth="18" strokeDasharray="69 276" strokeDashoffset="-207"/>
          <path d="M30,140 A110,110 0 0,1 250,140" fill="none" stroke="#97C459" strokeWidth="18" strokeDasharray="69 276" strokeDashoffset="-276"/>
          <path d="M30,140 A110,110 0 0,1 250,140" fill="none" stroke="#639922" strokeWidth="18" strokeDasharray="69 276" strokeDashoffset="-345"/>
          <line x1="140" y1="140" x2="140" y2="42" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${angle},140,140)`}/>
          <circle cx="140" cy="140" r="6" fill="#374151"/>
        </svg>
        <div className="text-5xl font-medium mt-2" style={{ color }}>{val}</div>
        <div className="text-base font-medium mt-1" style={{ color }}>{t[now.value_classification]}</div>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">{t.dynamics}</p>
        {([[t.now, now], [t.yesterday, yesterday], [t.week, weekAgo], [t.month, monthAgo]] as [string, FGData][]).map(([label, d]) => {
          if (!d) return null;
          const v = parseInt(d.value);
          const c = getColor(v);
          return (
            <div key={label} className="flex items-center gap-3 mb-2">
              <span className="text-xs text-gray-400 w-28">{label}</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                <div className="h-1.5 rounded-full" style={{ width: v + "%", background: c }}/>
              </div>
              <span className="text-xs font-medium w-6 text-right">{v}</span>
              <span className="text-xs w-24 text-right" style={{ color: c }}>{t[d.value_classification]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
