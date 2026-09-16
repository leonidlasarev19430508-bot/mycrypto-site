'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation, type Locale } from '../lib/i18n';
import { getAffiliateLink } from '../lib/exchanges';

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
const AffiliateDisclosure = dynamic(() => import('./AffiliateDisclosure'));

const OFFER_LOGO: Record<string, string> = {
  binance: '🟡',
  bybit: '🔵',
  okx: '⚫',
  kucoin: '🟢',
};

function localeFromPath(pathname: string): Locale {
  if (pathname.startsWith('/en')) return 'en';
  if (pathname.startsWith('/pl')) return 'pl';
  if (pathname.startsWith('/de')) return 'de';
  return 'uk';
}

// Prefix an internal path with the locale segment (uk = no prefix).
function localize(path: string, locale: Locale): string {
  return locale === 'uk' ? path : `/${locale}${path}`;
}

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

function PopularCoinsSection({
  coins,
  loading,
  error,
  locale,
  strings,
}: {
  coins: CoinData[];
  loading: boolean;
  error: boolean;
  locale: Locale;
  strings: any;
}) {
  const coinConfigs = [
    { id: 'bitcoin', symbol: '₿', name: 'Bitcoin', description: strings.coins[0].desc },
    { id: 'ethereum', symbol: 'Ξ', name: 'Ethereum', description: strings.coins[1].desc },
    { id: 'solana', symbol: '◎', name: 'Solana', description: strings.coins[2].desc },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{strings.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {coinConfigs.map((config) => {
          const coinData = coins.find((c) => c.id === config.id);

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
                <div className="text-gray-400 text-sm">{strings.unavailable}</div>
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
                href={localize(`/coin/${config.id}`, locale)}
                className="mt-4 inline-block px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-lg"
              >
                {strings.analyze}
              </Link>
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <Link href={localize('/coins', locale)} className="text-orange-500 hover:text-orange-600 font-bold text-lg">
          {strings.viewAll}
        </Link>
      </div>
    </section>
  );
}

export default function HomePage() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const t = useTranslation(locale);

  // Canonical roster driven by the i18n `offers` array (single source of truth).
  const offers = t.offers.map((offer: any) => ({
    name: offer.name,
    id: offer.id,
    description: offer.description,
    features: offer.features,
    badge: offer.badge,
    affiliate: getAffiliateLink(offer.id),
  }));

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

  const h = t.home;

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* HERO */}
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">{h.hero.title}</h1>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">{h.hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={localize('/coins', locale)} className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg text-base transition-all transform hover:scale-105">{h.hero.ctaCoins}</Link>
            <Link href={localize('/simulator', locale)} className="px-8 py-3 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-800 font-bold rounded-xl shadow-lg text-base transition">{h.hero.ctaSimulator}</Link>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{h.howItWorks.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {h.howItWorks.steps.map((step: any, i: number) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm text-center">
                <div className="text-2xl mb-2">{step.icon}</div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <PopularCoinsSection coins={coinsData} loading={coinsLoading} error={coinsError} locale={locale} strings={h.popularCoins} />

        {/* MARKET NOW */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{h.market.title}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">{h.market.prices}</h3>
              <CryptoPrices prices={coinsData} loading={coinsLoading} error={coinsError} />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">{h.market.fearGreed}</h3>
              <FearGreedIndex locale={locale} />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">{h.market.whale}</h3>
              <p className="text-gray-600 mb-4">{h.market.whaleDesc}</p>
              <WhaleAlertTicker />
            </div>
          </div>
          <div className="text-center">
            <Link href={localize('/markets', locale)} className="text-orange-500 hover:text-orange-600 font-bold text-lg">{h.market.openAnalysis}</Link>
          </div>
        </section>

        {/* EXCHANGE COMPARISON */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{h.exchangeCompare.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offers.map((offer) => (
              <div key={offer.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{OFFER_LOGO[offer.id] || '🪙'}</span>
                  <h3 className="font-bold text-base">{offer.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">{offer.description}</p>
                <ul className="text-xs text-gray-600 space-y-1 mb-5">
                  {offer.features.slice(0, 3).map((f: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">✓ {f}</li>
                  ))}
                </ul>
                <a href={offer.affiliate} target="_blank" rel="sponsored noopener noreferrer"
                  className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-center py-3 rounded-xl transition">
                  {h.exchangeCompare.cta}
                </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href={localize('/bonuses', locale)} className="text-orange-500 hover:text-orange-600 font-bold">{h.exchangeCompare.viewBonuses}</Link>
          </div>
        </section>

        {/* FEE COMPARISON TABLE */}
        <ComparisonTable locale={locale} />

        {/* AFFILIATE DISCLOSURE */}
        <AffiliateDisclosure />

        {/* SIMULATOR */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-2xl p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{h.simulator.title}</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">{h.simulator.desc}</p>
            <Link href={localize('/simulator', locale)} className="inline-flex items-center px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg text-base">
              {h.simulator.cta}
            </Link>
          </div>
        </section>

        {/* TOOLS */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{h.tools.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm"><WhatIfCalculator locale={locale} /></div>
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm"><ExchangeQuiz locale={locale} /></div>
          </div>
        </section>

        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{h.news.title}</h2>
            <Link href={localize('/blog', locale)} className="text-orange-500 hover:text-orange-600 font-bold">{h.news.viewAll}</Link>
          </div>
          <LatestArticles />
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{h.useful.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {h.useful.items.map((item: any) => (
              <Link key={item.page} href={localize(`/${item.page}`, locale)} className="p-4 bg-white border border-gray-200 rounded-xl text-center hover:shadow-md transition">
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
      <ChatWidget locale={locale} />
    </>
  );
}