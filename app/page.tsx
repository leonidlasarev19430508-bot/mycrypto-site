'use client';
import dynamic from 'next/dynamic';
import ComparisonTable from "./components/ComparisonTable";
import { useState } from "react";
import t from "./i18n/uk.json";
import { ExchangeModal, useExchangeModal } from "./components/ExchangeModal";

const WhaleAlertTicker = dynamic(() => import('./components/WhaleAlertTicker'), {
  ssr: false,
  loading: () => <div className="w-full bg-gray-900 border-y border-gray-800" style={{ height: '37px' }} />,
});
const CryptoPrices = dynamic(() => import('./components/CryptoPrices'), { ssr: false });
const FearGreedIndex = dynamic(() => import('./components/FearGreedIndex'), { ssr: false });
const WhatIfCalculator = dynamic(() => import('./components/WhatIfCalculator'), { ssr: false });
const ExchangeQuiz = dynamic(() => import('./components/ExchangeQuiz'), { ssr: false });
const WhaleAlertPopup = dynamic(() => import('./components/WhaleAlertPopup'), { ssr: false });
const ChatWidget = dynamic(() => import('./components/ChatWidget'), { ssr: false });
const LatestArticles = dynamic(() => import('./components/LatestArticles'), { ssr: false });

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
      <h3 className="text-xl font-semibold mb-2">{t.subscribe.title}</h3>
      <p className="text-gray-600 mb-4 text-sm">{t.subscribe.subtitle}</p>
      <ul className="text-left text-sm text-gray-600 mb-4 space-y-1 max-w-xs mx-auto">
        {t.subscribe.alerts.map((alert, i) => (<li key={i}>{alert}</li>))}
      </ul>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder={t.subscribe.placeholder}
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <button type="submit" disabled={status === 'sending'}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
          {status === 'sending' ? t.subscribe.sending : t.subscribe.button}
        </button>
      </form>
      {status === 'success' && <p className="text-green-600 mt-2">{t.subscribe.success}</p>}
      {status === 'error' && <p className="text-red-600 mt-2">{t.subscribe.error}</p>}
    </div>
  );
}

const OFFERS = [
  {
    name: 'Binance', id: 'binance',
    description: t.offers[0].description,
    features: t.offers[0].features,
    badge: t.offers[0].badge,
    affiliate: process.env.NEXT_PUBLIC_AFFILIATE_BINANCE || 'https://www.binance.com/register?ref=Q5HR1JVW',
  },
  {
    name: 'MEXC', id: 'mexc',
    description: 'Українська біржа з простим інтерфейсом та підтримкою гривні',
    features: ['Українська підтримка', 'Гривня UAH', 'Швидка верифікація'],
    badge: '🇺🇦 Для українців',
    affiliate: process.env.NEXT_PUBLIC_AFFILIATE_MEXC || 'https://promote.mexc.com/r/q2p1TSAUnh',
  },
  {
    name: 'Bybit', id: 'bybit',
    description: t.offers[1].description,
    features: t.offers[1].features,
    badge: t.offers[1].badge,
    affiliate: process.env.NEXT_PUBLIC_AFFILIATE_BYBIT || 'https://www.bybit.com/register?ref=CRYPTONAV',
  },
  {
    name: 'KuCoin', id: 'kucoin',
    description: t.offers[2].description,
    features: t.offers[2].features,
    badge: t.offers[2].badge,
    affiliate: process.env.NEXT_PUBLIC_AFFILIATE_KUCOIN || 'https://www.kucoin.com/r/rf/CXEPY4S5',
  },
];

export default function Home() {
  const { activeExchange, open, close } = useExchangeModal();

  return (
    <>
      <WhaleAlertTicker />
      <main className="p-6 md:p-10 max-w-6xl mx-auto">
        <div className="text-center mt-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-3">
            Потренуйся торгувати криптою —<br />без вкладання реальних грошей
          </h1>
          <p className="text-gray-500 text-lg mb-6">
            Реальні ціни. Віртуальний капітал. Справжній досвід.
          </p>
          <a href="/simulator" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-black px-8 py-4 rounded-2xl text-lg transition shadow-lg">
            🎮 Запустити симулятор →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {OFFERS.map(offer => (
            <div key={offer.id} className={`p-6 border-2 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow relative ${offer.badge ? 'border-orange-400' : 'border-gray-100'}`}>
              {offer.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  {offer.badge}
                </span>
              )}
              {/* Клікабельна назва біржі */}
              <button
                onClick={() => open(offer.id)}
                className="text-xl font-bold text-gray-900 hover:text-orange-500 transition-colors text-left underline decoration-dotted underline-offset-2 cursor-pointer"
              >
                {offer.name}
              </button>
              <p className="mt-2 text-gray-500 text-sm">{offer.description}</p>
              <ul className="mt-3 space-y-1.5">
                {offer.features.map(f => (
                  <li key={f} className="text-sm text-gray-500 flex items-center gap-1.5">
                    <span className="text-green-500 font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href={offer.affiliate} target="_blank" rel="noopener noreferrer"
                className="mt-5 block bg-orange-500 text-white text-center px-4 py-2.5 rounded-xl hover:bg-orange-600 transition font-semibold text-sm">
                {t.exchanges.cta} {offer.name}
              </a>
            </div>
          ))}
        </div>
        <ComparisonTable />
        <CryptoPrices />
        <FearGreedIndex />
        <WhatIfCalculator locale="uk" />
        <ExchangeQuiz />
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black text-gray-900">📰 Останні новини</h2>
            <a href="/blog" className="text-orange-500 hover:text-orange-600 font-bold text-sm">Всі новини →</a>
          </div>
          <LatestArticles />
        </div>
        <SubscribeForm />
      </main>
      <WhaleAlertPopup />
      <ChatWidget locale="uk" />

      {/* Модальне вікно біржі */}
      {activeExchange && (
        <ExchangeModal
          exchangeId={activeExchange}
          locale="uk"
          onClose={close}
        />
      )}
    </>
  );
}
