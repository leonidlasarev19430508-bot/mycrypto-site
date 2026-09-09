'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import t from './i18n/uk.json';
import { getAffiliateLink } from './lib/affiliates';

const CryptoPrices = dynamic(() => import('./components/CryptoPrices'));
const FearGreedIndex = dynamic(() => import('./components/FearGreedIndex'));
const WhatIfCalculator = dynamic(() => import('./components/WhatIfCalculator'));
const ExchangeQuiz = dynamic(() => import('./components/ExchangeQuiz'));
const LatestArticles = dynamic(() => import('./components/LatestArticles'));
const ComparisonTable = dynamic(() => import('./components/ComparisonTable'));
const ChatWidget = dynamic(() => import('./components/ChatWidget'));
const WhaleAlertTicker = dynamic(() => import('./components/WhaleAlertTicker'));
const WhaleAlertPopup = dynamic(() => import('./components/WhaleAlertPopup'));
const SubscribeForm = dynamic(() => import('./components/SubscribeForm'));

const OFFERS = [
  {
    name: 'Binance', id: 'binance',
    description: t.offers[0].description,
    features: t.offers[0].features,
    badge: t.offers[0].badge,
    affiliate: getAffiliateLink('binance'),
  },
  {
    name: 'MEXC', id: 'mexc',
    description: 'Українська біржа з простим інтерфейсом та підтримкою гривні',
    features: ['Українська підтримка', 'Гривня UAH', 'Швидка верифікація'],
    badge: '🇺🇦 Для українців',
    affiliate: getAffiliateLink('mexc'),
  },
  {
    name: 'Bybit', id: 'bybit',
    description: 'Ідеально для активної торгівлі',
    features: ['Просунуті інструменти', 'Висока ліквідність', '24/7 підтримка'],
    badge: null,
    affiliate: getAffiliateLink('bybit'),
  },
  {
    name: 'OKX', id: 'okx',
    description: 'Сучасна платформа з широкими можливостями',
    features: ['Web3 інтеграція', 'Стейкінг', 'Низькі комісії'],
    badge: null,
    affiliate: getAffiliateLink('okx'),
  },
];

export default function HomePage() {
  return (
    <>
      <WhaleAlertTicker />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Кращі крипто-біржі 2026 та AI-аналіз ринку</h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">CryptoNavigator допомагає порівнювати біржі, аналізувати ринок через AI та тренуватися без ризику. Ідеально для новачків та досвідчених трейдерів.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/simulator" className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg text-lg">Спробувати симулятор</Link>
            <Link href="/markets" className="px-8 py-3 bg-gray-800 hover:bg-gray-900 text-white font-bold rounded-xl shadow-lg text-lg">Аналіз настрою</Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Чому CryptoNavigator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['🤖 AI-аналіз новин', '📊 Порівняння комісій', '🎮 Безризиковий симулятор', '🔔 Миготливі сповіщення'].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="text-3xl mb-3">{item.split(' ')[0]}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item}</h3>
                <p className="text-gray-600">{i === 0 ? 'Аналіз сотень новин щодня' : i === 1 ? 'Детальне порівняння бірж' : i === 2 ? 'Тренування на реальних цінах' : 'Сповіщення про ринкові зміни'}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">🚀 Безризиковий крипто-симулятор</h2>
          <p className="text-gray-600 mb-6">Торгуйте на реальних цінах без ризику втратити гроші. Ідеально для новачків.</p>
          <div>
            <ul className="space-y-3 mb-6">
              {['Реальні ціни з CoinGecko', 'Live та Replay режими', 'Віртуальний баланс $10,000', 'Історія угод'].map((f, i) => (
                <li key={i} className="flex items-center gap-3"><span className="text-green-500 text-xl">✓</span> {f}</li>
              ))}
            </ul>
            <Link href="/simulator" className="inline-flex items-center px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg">
              Запустити симулятор →
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">🏦 Популярні біржі</h2>
          <CryptoPrices />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-8">
            {OFFERS.map(offer => (
              <div key={offer.id} className="p-5 border-2 rounded-2xl bg-white shadow-sm">
                {offer.badge && <span className="block text-center bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">{offer.badge}</span>}
                <Link href={`/exchange/${offer.id}`} className="text-lg font-bold text-gray-900 hover:text-orange-500 block">{offer.name}</Link>
                <p className="text-gray-500 text-sm mt-1">{offer.description}</p>
                <ul className="mt-2.5 space-y-1">
                  {offer.features.map(f => <li key={f} className="text-sm text-gray-500"><span className="text-green-500">✓</span> {f}</li>)}
                </ul>
                <a href={offer.affiliate} target="_blank" rel="sponsored noopener noreferrer" className="mt-4 block bg-orange-500 text-white text-center px-4 py-2 rounded-xl hover:bg-orange-600 text-sm font-semibold">
                  {t.exchanges.cta} {offer.name}
                </a>
                <Link href={`/exchange/${offer.id}`} className="mt-2 text-xs text-gray-400 hover:text-orange-500 block text-center">Детальний огляд →</Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/coins" className="text-orange-500 hover:text-orange-600 font-bold">Дивитися всі криптовалюти →</Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">😱 Fear & Greed Index</h2>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <FearGreedIndex />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">💸 Порівняння комісій</h2>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <ComparisonTable />
          </div>
          <div className="text-center mt-6">
            <Link href="/trading-bots" className="text-orange-500 hover:text-orange-600 font-bold">Дізнатись про торгові боти →</Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">🧮 Інструменти</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm"><WhatIfCalculator locale="uk" /></div>
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm"><ExchangeQuiz /></div>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">📰 Останні новини</h2>
            <Link href="/blog" className="text-orange-500 hover:text-orange-600 font-bold">Всі новини →</Link>
          </div>
          <LatestArticles />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">🔗 Корисні розділи</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              {icon: '🎮', label: 'Симулятор', href: '/simulator'},
              {icon: '📊', label: 'Криптовалюти', href: '/coins'},
              {icon: '🧠', label: 'Настрій', href: '/markets'},
              {icon: '📰', label: 'Блог', href: '/blog'},
              {icon: '🤖', label: 'AI Асистент', href: '/assistant'}
            ].map(item => (
              <Link key={item.href} href={item.href} className="p-4 bg-white border border-gray-200 rounded-xl text-center hover:shadow-md transition">
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="font-bold text-gray-900">{item.label}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <SubscribeForm />
        </section>
      </main>
      <WhaleAlertPopup />
      <ChatWidget locale="uk" />
    </>
  );
}

