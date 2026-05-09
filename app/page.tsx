'use client';
import FearGreedIndex from './components/FearGreedIndex';
import ExchangeQuiz from './components/ExchangeQuiz';
import CryptoPrices from "./components/CryptoPrices";
import PriceChart from "./components/PriceChart";
import TradingCounter from "./components/TradingCounter";
import WhatIfCalculator from "./components/WhatIfCalculator";
import WhaleAlertTicker from "./components/WhaleAlertTicker";
import ChatWidget from "./components/ChatWidget";
import WhaleAlertPopup from "./components/WhaleAlertPopup";
import { useState } from "react";

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
      <h3 className="text-xl font-semibold mb-2">Отримуйте дайджест новин</h3>
      <p className="text-gray-600 mb-4 text-sm">Щоденна підбірка крипто-новин з AI-аналізом</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Ваш email" className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <button type="submit" disabled={status === 'sending'} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">{status === 'sending' ? 'Підписуємо...' : 'Підписатися'}</button>
      </form>
      {status === 'success' && <p className="text-green-600 mt-2">Підписка успішна!</p>}
      {status === 'error' && <p className="text-red-600 mt-2">Помилка. Спробуйте пізніше.</p>}
    </div>
  );
}

const OFFERS = [
  { name: 'Binance', id: 'binance', description: 'Найбільша біржа у світі з низькими комісіями', features: ['Низькі комісії', 'Швидка реєстрація', 'Надійна платформа'], badge: 'Найпопулярніша', affiliate: process.env.NEXT_PUBLIC_AFFILIATE_BINANCE || 'https://www.binance.com/register?ref=GRO_28502_BIO0R' },
  { name: 'Bybit', id: 'bybit', description: 'Ідеально для активної торгівлі', features: ['Просунуті інструменти', 'Висока ліквідність', '24/7 підтримка'], badge: null, affiliate: process.env.NEXT_PUBLIC_AFFILIATE_BYBIT || 'https://www.bybit.com/register?ref=CRYPTONAV' },
  { name: 'OKX', id: 'okx', description: 'Сучасна платформа з широкими можливостями', features: ['Web3 інтеграція', 'Стейкінг', 'Низькі комісії'], badge: null, affiliate: 'https://www.okx.com/join/CRYPTONAV' },
];

export default function Home() {
  return (
    <>
      <WhaleAlertTicker />
      <main className="p-6 md:p-10 max-w-6xl mx-auto">
        <div className="text-center mt-6 mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">Кращі Крипто-Біржі 2026</h1>
          <p className="text-gray-500 mt-3 text-lg">Порівняй біржі і почни торгувати сьогодні</p>
        </div>
        <div className="max-w-2xl mx-auto mb-10"><TradingCounter /></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OFFERS.map(offer => (
            <div key={offer.id} className={`p-6 border-2 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow relative ${offer.badge ? 'border-orange-400' : 'border-gray-100'}`}>
              {offer.badge && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">{offer.badge}</span>}
              <h2 className="text-xl font-bold text-gray-900">{offer.name}</h2>
              <p className="mt-2 text-gray-500 text-sm">{offer.description}</p>
              <ul className="mt-3 space-y-1.5">{offer.features.map(f => (<li key={f} className="text-sm text-gray-500 flex items-center gap-1.5"><span className="text-green-500 font-bold">✓</span> {f}</li>))}</ul>
              <a href={offer.affiliate} target="_blank" rel="noopener noreferrer" className="mt-5 block bg-orange-500 text-white text-center px-4 py-2.5 rounded-xl hover:bg-orange-600 transition font-semibold">Почати торгівлю на {offer.name}</a>
            </div>
          ))}
        </div>
        <CryptoPrices />
        <PriceChart />
        <FearGreedIndex />
        <WhatIfCalculator locale="uk" />
        <ExchangeQuiz />
        <SubscribeForm />
      </main>
      <WhaleAlertPopup />
      <ChatWidget locale="uk" />
    </>
  );
}