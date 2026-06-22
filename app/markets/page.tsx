'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '../lib/i18n';

type CoinSentiment = {
  coin_slug: string;
  coin_name: string;
  total_news: number;
  positive_count: number;
  negative_count: number;
  neutral_count: number;
  sentiment_score: number;
  top_recommendation: string;
  latest_news_at: string;
};

export default function MarketsPage() {
  const pathname = usePathname();
  const locale = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/pl') ? 'pl' : pathname.startsWith('/de') ? 'de' : 'uk';
  const t = useTranslation(locale);

  const [coins, setCoins] = useState<CoinSentiment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'bullish' | 'bearish' | 'neutral'>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/markets-sentiment')
      .then(r => r.json())
      .then(data => {
        setCoins(data.coins || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = coins.filter(c => {
    const matchSearch = !search ||
      c.coin_name.toLowerCase().includes(search.toLowerCase()) ||
      c.coin_slug.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' ||
      (filter === 'bullish' && c.sentiment_score > 0.2) ||
      (filter === 'bearish' && c.sentiment_score < -0.2) ||
      (filter === 'neutral' && c.sentiment_score >= -0.2 && c.sentiment_score <= 0.2);
    return matchSearch && matchFilter;
  });

  const getSentimentLabel = (score: number) => {
    if (score > 0.5) return { label: t.markets.sentiment.very_positive, color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200' };
    if (score > 0.2) return { label: t.markets.sentiment.positive, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' };
    if (score < -0.5) return { label: t.markets.sentiment.very_negative, color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' };
    if (score < -0.2) return { label: t.markets.sentiment.negative, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' };
    return { label: t.markets.sentiment.neutral, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-100' };
  };

  const getRecLabel = (rec: string) => {
    if (rec === 'buy') return { label: t.markets.recommendation.buy, color: 'text-green-700', bg: 'bg-green-100' };
    if (rec === 'sell') return { label: t.markets.recommendation.sell, color: 'text-red-700', bg: 'bg-red-100' };
    return { label: t.markets.recommendation.hold, color: 'text-yellow-700', bg: 'bg-yellow-100' };
  };

  const timeAgo = (dateStr: string) => {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 3600) return Math.floor(diff / 60) + ' ' + t.markets.time_ago.minutes;
    if (diff < 86400) return Math.floor(diff / 3600) + ' ' + t.markets.time_ago.hours;
    return Math.floor(diff / 86400) + ' ' + t.markets.time_ago.days;
  };

  const bullish = coins.filter(c => c.sentiment_score > 0.2).length;
  const bearish = coins.filter(c => c.sentiment_score < -0.2).length;
  const neutral = coins.filter(c => c.sentiment_score >= -0.2 && c.sentiment_score <= 0.2).length;

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
          {t.markets.title}
        </h1>
        <p className="text-gray-500 text-lg">
          {t.markets.subtitle}
        </p>
      </div>

      {/* Stats */}
      {!loading && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div onClick={() => setFilter('bullish')}
            className="bg-green-50 border border-green-100 rounded-2xl p-4 text-center cursor-pointer hover:shadow-md transition">
            <p className="text-3xl font-black text-green-600">{bullish}</p>
            <p className="text-sm text-gray-500 mt-1">{t.markets.stats.bullish}</p>
          </div>
          <div onClick={() => setFilter('neutral')}
            className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center cursor-pointer hover:shadow-md transition">
            <p className="text-3xl font-black text-gray-600">{neutral}</p>
            <p className="text-sm text-gray-500 mt-1">{t.markets.stats.neutral}</p>
          </div>
          <div onClick={() => setFilter('bearish')}
            className="bg-red-50 border border-red-100 rounded-2xl p-4 text-center cursor-pointer hover:shadow-md transition">
            <p className="text-3xl font-black text-red-600">{bearish}</p>
            <p className="text-sm text-gray-500 mt-1">{t.markets.stats.bearish}</p>
          </div>
        </div>
      )}

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder={t.markets.search_placeholder}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm bg-white"
        />
        <div className="flex gap-2">
          {[
            { value: 'all', label: t.markets.filters.all },
            { value: 'bullish', label: t.markets.filters.bullish },
            { value: 'bearish', label: t.markets.filters.bearish },
            { value: 'neutral', label: t.markets.filters.neutral },
          ].map(f => (
            <button key={f.value} onClick={() => setFilter(f.value as typeof filter)}
              className={`px-3 py-3 rounded-xl text-sm font-semibold transition whitespace-nowrap ${
                filter === f.value ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-20">
          <div className="inline-block w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-500">{t.markets.loading}</p>
        </div>
      )}

      {/* Coins grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(coin => {
            const sentiment = getSentimentLabel(coin.sentiment_score);
            const rec = getRecLabel(coin.top_recommendation);
            const positivePercent = Math.round((coin.positive_count / coin.total_news) * 100);
            const negativePercent = Math.round((coin.negative_count / coin.total_news) * 100);
            const neutralPercent = 100 - positivePercent - negativePercent;

            return (
              <Link key={coin.coin_slug} href={`/coin/${coin.coin_slug}`}
                className={`bg-white border-2 ${sentiment.border} rounded-2xl p-5 hover:shadow-md transition block`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="font-black text-gray-900 text-lg">{coin.coin_name}</h2>
                    <p className="text-xs text-gray-400 uppercase">{coin.coin_slug}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${rec.bg} ${rec.color}`}>
                    {rec.label}
                  </span>
                </div>

                {/* Sentiment */}
                <div className={`${sentiment.bg} rounded-xl p-3 mb-3`}>
                  <p className={`text-sm font-bold ${sentiment.color}`}>{sentiment.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Score: {coin.sentiment_score > 0 ? '+' : ''}{coin.sentiment_score}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex rounded-full overflow-hidden h-2">
                    <div className="bg-green-400" style={{ width: `${positivePercent}%` }} />
                    <div className="bg-gray-200" style={{ width: `${neutralPercent}%` }} />
                    <div className="bg-red-400" style={{ width: `${negativePercent}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>📈 {positivePercent}%</span>
                    <span>⚖️ {neutralPercent}%</span>
                    <span>📉 {negativePercent}%</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>📰 {coin.total_news} {t.markets.card_footer}</span>
                  <span>{timeAgo(coin.latest_news_at)}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-3xl mb-2">🔍</p>
          <p>{t.markets.no_results}</p>
        </div>
      )}

      <p className="text-center text-xs text-gray-400 mt-8">
        {t.markets.footer}
      </p>
    </main>
  );
}
