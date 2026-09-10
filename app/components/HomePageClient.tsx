'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import t from '../i18n/uk.json';
import { getAffiliateLink } from '../lib/affiliates';

const CryptoPrices = dynamic(() => import('./CryptoPrices'));
const FearGreedIndex = dynamic(() => import('./FearGreedIndex'));
const WhatIfCalculator = dynamic(() => import('./WhatIfCalculator'));
const ExchangeQuiz = dynamic(() => import('./ExchangeQuiz'));
const LatestArticles = dynamic(() => import('./LatestArticles'));
const ComparisonTable = dynamic(() => import('./ComparisonTable'));
const ChatWidget = dynamic(() => import('./ChatWidget'));
const WhaleAlertTicker = dynamic(() => import('./WhaleAlertTicker'));
const WhaleAlertPopup = dynamic(() => import('./WhaleAlertPopup'));
const SubscribeForm = dynamic(() => import('./SubscribeForm'));

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

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}



function PopularCoinsSection({ coins, loading, error }: { coins: CoinData[], loading: boolean, error: boolean }) {


  const coinConfigs = [
    { id: 'bitcoin', symbol: '₿', name: 'Bitcoin', description: 'Перша криптовалюта' },
    { id: 'ethereum', symbol: 'Ξ', name: 'Ethereum', description: 'Платформа для смарт-контрактів' },
    { id: 'solana', symbol: '◎', name: 'Solana', description: 'Швидкі та дешеві транзакції' },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Популярні монети</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {coinConfigs.map((config) => {
          const coinData = coins.find(c => c.id === config.id);
          
          return (
            <div key={config.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm text-center">
              <div className="text-2xl mb-3">{config.symbol}</div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{config.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{config.description}</p>
              
              {loading ? (
                <div className="space-y-2">
                  <div className="animate-pulse bg-gray-200 rounded h-7 w-32 mx-auto"></div>
                  <div className="animate-pulse bg-gray-200 rounded h-5 w-20 mx-auto"></div>
                </div>
              ) : error || !coinData ? (
                // Show only name and CTA when error or no data
                <div className="text-gray-400 text-sm">Дані тимчасово недоступні</div>
              ) : (
                <>
                  <div className="text-2xl font-black text-gray-900 mb-2">
                    ${coinData.current_price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className={`text-sm font-bold ${coinData.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {coinData.price_change_percentage_24h >= 0 ? '▲' : '▼'}
                    {Math.abs(coinData.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </>
              )}
              
              <Link 
                href={`/coin/${config.id}`} 
                className="mt-4 inline-block px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-lg"
              >
                Аналіз монети
              </Link>
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <Link href="/coins" className="text-orange-500 hover:text-orange-600 font-bold text-lg">
          Переглянути всі монети →
        </Link>
      </div>
    </section>
  );
}
export default function HomePage() {
  const [coinsData, setCoinsData] = useState<CoinData[]>([]);
  const [coinsLoading, setCoinsLoading] = useState(true);
  const [coinsError, setCoinsError] = useState(false);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch('/api/coins?ids=bitcoin,ethereum,solana,binancecoin');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (Array.isArray(data)) {
          setCoinsData(data);
          setCoinsError(false);
        } else {
          throw new Error('Invalid response');
        }
      } catch (error) {
        console.error('Error fetching coins:', error);
        setCoinsError(true);
      } finally {
        setCoinsLoading(false);
      }
    };

    fetchCoins();
    const interval = setInterval(fetchCoins, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* HERO */}
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">Зрозумій крипторинок перед тим, як вкладати гроші</h1>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">Ціни, AI‑аналіз, симулятор і порівняння бірж — в одному місці.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/coins" className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg text-base transition-all transform hover:scale-105">Обрати монету</Link>
            <Link href="/simulator" className="px-8 py-3 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-800 font-bold rounded-xl shadow-lg text-base transition">Спробувати симулятор</Link>
          </div>
        </section>

        {/* ЯК ЦЕ ПРАЦЮЄ (4‑КРОКОВИЙ FLOW) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Як це працює</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: '🪙', title: 'Обери монету', description: 'Оберіть криптовалюту зі списку 100+ монет' },
              { icon: '📊', title: 'Подивись дані та AI‑сентимент', description: 'Аналіз ціни, графіків та ринкового настрою' },
              { icon: '🎮', title: 'Перевір сценарій у симуляторі', description: 'Протестуйте стратегії на реальних цінах без ризику' },
              { icon: '🏦', title: 'Порівняй біржі та обери платформу', description: 'Знайдіть найкращі умови для торгівлі' },
            ].map((step, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm text-center">
                <div className="text-2xl mb-2">{step.icon}</div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </section>



        {/* TODO Sprint 2C: connect shared homepage market data */}
        <PopularCoinsSection coins={coinsData} loading={coinsLoading} error={coinsError} />

        {/* РИНОК ЗАРАЗ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Ринок зараз</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">📈 Криптоціни</h3>
              <CryptoPrices prices={coinsData} loading={coinsLoading} error={coinsError} />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">😱 Fear & Greed Index</h3>
              <FearGreedIndex />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">⚠️ Whale Alerts</h3>
              <p className="text-gray-600 mb-4">Великі транзакції на ринку відстежуються в реальному часі.</p>
              <WhaleAlertTicker />
            </div>
          </div>
          <div className="text-center">
            <Link href="/markets" className="text-orange-500 hover:text-orange-600 font-bold text-lg">Відкрити AI-аналіз ринку →</Link>
          </div>
        </section>

        {/* ПОРІВНЯННЯ БІРЖ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Де вигідніше купувати криптовалюту?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {OFFERS.map((offer) => (
              <div key={offer.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{offer.id === 'binance' ? '🟡' : offer.id === 'mexc' ? '🔷' : offer.id === 'bybit' ? '🔵' : '⚫'}</span>
                  <h3 className="font-bold text-base">{offer.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">{offer.description}</p>
                <ul className="text-xs text-gray-600 space-y-1 mb-5">
                  {offer.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-center gap-2">✓ {f}</li>
                  ))}
                </ul>
                <a href={offer.affiliate} target="_blank" rel="noopener noreferrer"
                  className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-center py-3 rounded-xl transition">
                  Перейти до біржі ↗
                </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/bonuses" className="text-orange-500 hover:text-orange-600 font-bold">Дивитися всі бонуси →</Link>
          </div>
        </section>

        {/* СИМУЛЯТОР */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-2xl p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Перевір ідею без ризику</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Користувач може протестувати Buy/Sell сценарій на реальних цінах без втрати реальних грошей.</p>
            <Link href="/simulator" className="inline-flex items-center px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg text-base">
              Запустити симулятор →
            </Link>
          </div>
        </section>

        {/* ІНСТРУМЕНТИ */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🧮 Інструменти</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm"><WhatIfCalculator locale="uk" /></div>
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm"><ExchangeQuiz /></div>
          </div>
        </section>

        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">📰 Останні новини</h2>
            <Link href="/blog" className="text-orange-500 hover:text-orange-600 font-bold">Всі новини →</Link>
          </div>
          <LatestArticles />
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🔗 Корисні розділи</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              {icon: '🎮', label: 'Симулятор', href: '/simulator'},
              {icon: '📊', label: 'Криптовалюти', href: '/coins'},
              {icon: '🧠', label: 'Настрій', href: '/markets'},
              {icon: '📰', label: 'Блог', href: '/blog'},
              {icon: '🤖', label: 'AI Асистент', href: '/assistant'}
            ].map(item => (
              <Link key={item.href} href={item.href} className="p-4 bg-white border border-gray-200 rounded-xl text-center hover:shadow-md transition">
                <div className="text-xl mb-2">{item.icon}</div>
                <p className="font-bold text-gray-900">{item.label}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <SubscribeForm />
        </section>
      </main>
      <WhaleAlertPopup />
      <ChatWidget locale="uk" />
    </>
  );
}



