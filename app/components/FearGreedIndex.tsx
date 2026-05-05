"use client";
import { useEffect, useState } from "react";

interface FGData { value: string; value_classification: string; timestamp: string; }

const UA_LABELS: Record<string,string> = {
  "Extreme Fear":"Екстремальний страх",
  "Fear":"Страх",
  "Neutral":"Нейтрально",
  "Greed":"Жадібність",
  "Extreme Greed":"Екстремальна жадібність"
};

function getColor(v: number){ return v<25?"#E24B4A":v<45?"#EF9F27":v<56?"#FAC775":v<75?"#97C459":"#639922"; }

export default function FearGreedIndex(){
  const [data, setData] = useState<FGData[]|null>(null);

  useEffect(()=>{
    fetch("https://api.alternative.me/fng/?limit=32")
      .then(r=>r.json())
      .then(d=>setData(d.data))
      .catch(()=>{});
  },[]);

  if(!data) return (
    <div className="max-w-xl mx-auto py-8 px-4 text-center text-gray-400 text-sm">
      Завантаження Fear &amp; Greed Index...
    </div>
  );

  const now=data[0], yesterday=data[1], weekAgo=data[7], monthAgo=data[30];
  const val=parseInt(now.value);
  const color=getColor(val);
  const angle=-90+(val/100)*180;

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
        <div className="text-5xl font-medium mt-2" style={{color}}>{val}</div>
        <div className="text-base font-medium mt-1" style={{color}}>{UA_LABELS[now.value_classification]}</div>
      </div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Динаміка</p>
        {([["Зараз",now],["Вчора",yesterday],["Тиждень тому",weekAgo],["Місяць тому",monthAgo]] as [string,FGData][]).map(([label,d])=>{
          const v=parseInt(d.value);
          const c=getColor(v);
          return (
            <div key={label} className="flex items-center gap-3 mb-2">
              <span className="text-xs text-gray-400 w-28">{label}</span>
              <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                <div className="h-1.5 rounded-full" style={{width:v+"%",background:c}}/>
              </div>
              <span className="text-xs font-medium w-6 text-right">{v}</span>
              <span className="text-xs w-24 text-right" style={{color:c}}>{UA_LABELS[d.value_classification]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
