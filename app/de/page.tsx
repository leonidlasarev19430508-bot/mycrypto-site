'use client';
import CryptoPrices from '../components/CryptoPrices';
import FearGreedIndex from '../components/FearGreedIndex';
import WhatIfCalculator from '../components/WhatIfCalculator';
import WhaleAlertTicker from '../components/WhaleAlertTicker';
import TradingCounter from '../components/TradingCounter';
import ChatWidget from '../components/ChatWidget';
import ExchangeQuiz from '../components/ExchangeQuiz';
import WhaleAlertPopup from '../components/WhaleAlertPopup';
import { useTranslation } from '../lib/i18n';
import { useState } from 'react';

const AFFILIATE_LINKS: Record<string, string> = {
  binance: process.env.NEXT_PUBLIC_AFFILIATE_BINANCE || 'https://www.binance.com/register?ref=GRO_28502_BIO0R',
  bybit: process.env.NEXT_PUBLIC_AFFILIATE_BYBIT || 'https://www.bybit.com/register?ref=CRYPTONAV',
  okx: 'https://www.okx.com/join/CRYPTONAV',
};

function SubscribeForm() {
  const t = useTranslation('de');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (res.ok) { setStatus('success'); setEmail(''); }
    else setStatus('error');
  };
  return (
    <div className="mt-10 p-6 bg-gray-100 rounded-xl text-center">
      <h3 className="text-xl font-semibold mb-2">{t.subscribe.title}</h3>
      <p className="text-gray-600 mb-4 text-sm">{t.subscribe.subtitle}</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t.subscribe.placeholder} className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <button type="submit" disabled={status === 'sending'} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">{status === 'sending' ? t.subscribe.sending : t.subscribe.button}</button>
      </form>
      {status === 'success' && <p className="text-green-600 mt-2">{t.subscribe.success}</p>}
      {status === 'error' && <p className="text-red-600 mt-2">{t.subscribe.error}</p>}
    </div>
  );
}

export default function DEPage() {
  const t = useTranslation('de');
  return (
    <>
      <WhaleAlertTicker />
      <main className="p-6 md:p-10 max-w-6xl mx-auto">
        <div className="text-center mt-6 mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">{t.hero.title}</h1>
          <p className="text-gray-500 mt-3 text-lg">{t.hero.subtitle}</p>
        </div>
        <div className="max-w-2xl mx-auto mb-10"><TradingCounter /></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.offers.map(offer => (
            <div key={offer.id} className={`p-6 border-2 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow relative ${offer.badge ? 'border-orange-400' : 'border-gray-100'}`}>
              {offer.badge && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">{offer.badge}</span>}
              <h2 className="text-xl font-bold text-gray-900">{offer.name}</h2>
              <p className="mt-2 text-gray-500 text-sm">{offer.description}</p>
              <ul className="mt-3 space-y-1.5">{offer.features.map(f => (<li key={f} className="text-sm text-gray-500 flex items-center gap-1.5"><span className="text-green-500 font-bold">✓</span> {f}</li>))}</ul>
              <a href={AFFILIATE_LINKS[offer.id] || '#'} target="_blank" rel="noopener noreferrer" className="mt-5 block bg-orange-500 text-white text-center px-4 py-2.5 rounded-xl hover:bg-orange-600 transition font-semibold">{t.exchanges.cta} {offer.name}</a>
            </div>
          ))}
        </div>
        <CryptoPrices />
        <FearGreedIndex locale="de" />
        <WhatIfCalculator locale="de" />
        <ExchangeQuiz locale="de" />
        <SubscribeForm />
      </main>
      <WhaleAlertPopup />
      <ChatWidget locale="de" />
    </>
  );
}