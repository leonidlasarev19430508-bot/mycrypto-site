'use client';
import Link from 'next/link';
import CryptoPrices from '../components/CryptoPrices';
import FearGreedIndex from '../components/FearGreedIndex';
import WhatIfCalculator from '../components/WhatIfCalculator';
import WhaleAlertTicker from '../components/WhaleAlertTicker';
import TradingCounter from '../components/TradingCounter';
import { useState } from 'react';

function SubscribeForm() {
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
      <h3 className="text-xl font-semibold mb-2">Otrzymuj codzienny digest</h3>
      <p className="text-gray-600 mb-4 text-sm">Codzienny wybór wiadomości krypto z analizą AI</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Twój email" className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <button type="submit" disabled={status === 'sending'} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">{status === 'sending' ? 'Zapisuję...' : 'Zapisz się'}</button>
      </form>
      {status === 'success' && <p className="text-green-600 mt-2">Zapisano pomyślnie!</p>}
      {status === 'error' && <p className="text-red-600 mt-2">Błąd. Spróbuj później.</p>}
    </div>
  );
}

const EXCHANGES = [
  { name: 'Binance', id: 'binance', description: 'Największa giełda na świecie z najniższymi prowizjami', features: ['Niskie prowizje 0.1%', 'Szybka rejestracja', 'Polska obsługa klienta', 'Ponad 350 kryptowalut'], badge: 'Najpopularniejsza', affiliate: 'https://www.binance.com/register?ref=GRO_28502_BIO0R' },
  { name: 'Bybit', id: 'bybit', description: 'Idealna dla aktywnych traderów z zaawansowanymi narzędziami', features: ['Dźwignia do 100x', 'Wysoka płynność', 'Wsparcie 24/7', 'Kopia handlu'], badge: null, affiliate: 'https://www.bybit.com/register?ref=CRYPTONAV' },
  { name: 'WhiteBIT', id: 'whitebit', description: 'Europejska giełda z weryfikacją i wypłatami w PLN', features: ['Wypłaty w PLN', 'Europejskie prawo', 'Prosta obsługa', 'Niskie prowizje'], badge: '🇵🇱 Popularna w PL', affiliate: 'https://whitebit.com/referral/54626c3b-5240-4d39-9784-8e3eda5736de' },
];

export default function PLPage() {
  return (
    <>
      <WhaleAlertTicker />
      <main className="p-6 md:p-10 max-w-6xl mx-auto">
        <div className="flex justify-end gap-3 mb-4 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-800">🇺🇦 Ukraiński</Link>
          <span className="text-gray-300">|</span>
          <span className="text-blue-600 font-semibold">🇵🇱 Polski</span>
          <span className="text-gray-300">|</span>
          <Link href="/de" className="text-gray-500 hover:text-gray-800">🇩🇪 Deutsch</Link>
        </div>
        <div className="text-center mt-2 mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">Najlepsze Giełdy Kryptowalut 2026</h1>
          <p className="text-gray-500 mt-3 text-lg">Porównaj giełdy i zacznij handlować już dziś</p>
        </div>
        <div className="max-w-2xl mx-auto mb-10"><TradingCounter /></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EXCHANGES.map(offer => (
            <div key={offer.id} className={`p-6 border-2 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow relative ${offer.badge ? 'border-orange-400' : 'border-gray-100'}`}>
              {offer.badge && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">{offer.badge}</span>}
              <h2 className="text-xl font-bold text-gray-900">{offer.name}</h2>
              <p className="mt-2 text-gray-500 text-sm">{offer.description}</p>
              <ul className="mt-3 space-y-1.5">{offer.features.map(f => (<li key={f} className="text-sm text-gray-500 flex items-center gap-1.5"><span className="text-green-500 font-bold">✓</span> {f}</li>))}</ul>
              <a href={offer.affiliate} target="_blank" rel="noopener noreferrer" className="mt-5 block bg-orange-500 text-white text-center px-4 py-2.5 rounded-xl hover:bg-orange-600 transition font-semibold">Zarejestruj się na {offer.name}</a>
            </div>
          ))}
        </div>
        <CryptoPrices />
        <FearGreedIndex />
        <WhatIfCalculator />
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">❓ Często zadawane pytania</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              { q: 'Jak kupić Bitcoin w Polsce?', a: 'Zarejestruj się na Binance lub WhiteBIT, przejdź weryfikację KYC, wpłać PLN i kup BTC. Cały proces zajmuje około 15 minut.' },
              { q: 'Czy kryptowaluty są legalne w Polsce?', a: 'Tak, handel kryptowalutami jest legalny w Polsce. Zyski podlegają opodatkowaniu 19% podatkiem od zysków kapitałowych.' },
              { q: 'Która giełda jest najlepsza dla początkujących?', a: 'Binance — ze względu na prostą obsługę i niskie prowizje. WhiteBIT jest dobry ze względu na możliwość wypłaty w PLN.' },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
        <SubscribeForm />
      </main>
    </>
  );
}
