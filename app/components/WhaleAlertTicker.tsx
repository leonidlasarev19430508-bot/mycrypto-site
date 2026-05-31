'use client';
import { useState, useEffect } from 'react';

const DEMO = [
  { id:'1', symbol:'BTC', amountUsd:164000000, from:'Binance', to:'Unknown', timestamp:Date.now()-120000 },
  { id:'2', symbol:'ETH', amountUsd:111000000, from:'Unknown', to:'Coinbase', timestamp:Date.now()-300000 },
  { id:'3', symbol:'BTC', amountUsd:69500000,  from:'Unknown', to:'Binance',  timestamp:Date.now()-600000 },
  { id:'4', symbol:'XRP', amountUsd:58000000,  from:'Ripple',  to:'Unknown',  timestamp:Date.now()-900000 },
];

function timeAgo(ts: number): string {const s=Math.floor((Date.now()-ts)/1000);if(s<60)return s+'с тому';if(s<3600)return Math.floor(s/60)+'хв тому';return Math.floor(s/3600)+'год тому';}
function fmtUsd(n: number): string {if(n>=1e9)return'$'+(n/1e9).toFixed(1)+'B';return'$'+Math.round(n/1e6)+'M';}

export default function WhaleAlertTicker(){
  const [txns,setTxns]=useState(DEMO);
  useEffect(()=>{
    fetch('/api/whale-alerts').then(r=>r.json()).then(d=>{if(Array.isArray(d)&&d.length>0)setTxns(d);}).catch(()=>{});
  },[]);
  const items=[...txns,...txns];
  return(
    <div className='w-full bg-gray-900 border-y border-gray-800 overflow-hidden'>
      <div className='flex items-stretch'>
        <div className='flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-orange-500'>
          <span className='w-2 h-2 rounded-full bg-white animate-pulse'/>
          <span className='text-white text-xs font-bold uppercase tracking-wider whitespace-nowrap'>Whale Alert</span>
        </div>
        <div className='overflow-hidden flex-1'>
          <div className='flex whitespace-nowrap' style={{animation:'ticker 40s linear infinite'}}>
            {items.map((tx,i)=>(
              <div key={tx.id+i} className='inline-flex items-center gap-2 px-5 py-2 border-r border-gray-800 flex-shrink-0'>
                <span className='text-xs font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-700'>{tx.symbol}</span>
                <span className='text-white text-sm font-semibold'>{fmtUsd(tx.amountUsd)}</span>
                <span className='text-gray-400 text-xs'>{tx.from} to {tx.to}</span>
                <span className='text-gray-400 text-xs'>{timeAgo(tx.timestamp)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{}</style>
    </div>
  );
}