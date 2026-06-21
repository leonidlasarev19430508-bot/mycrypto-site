'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Article = {
  id: number;
  title: string;
  coin_slug: string;
  coin_name: string;
  sentiment: string;
  recommendation: string;
  source_name: string;
  source_url: string;
  published_at: string;
  summary: string;
};

const UI = {
  uk: {
    title: '📰 Крипто Блог',
    subtitle: 'AI-аналіз новин криптовалютного ринку',
    all: 'Всі',
    positive: '📈 Позитивні',
    negative: '📉 Негативні',
    neutral: '⚖️ Нейтральні',
    readMore: 'Читати далі →',
    source: 'Джерело',
    loading: 'Завантаження...',
    noArticles: 'Статей не знайдено',
    loadMore: 'Завантажити ще',
    buy: '🟢 Купити',
    sell: '🔴 Продати',
    hold: '🟡 Тримати',
  },
  en: {
    title: '📰 Crypto Blog',
    subtitle: 'AI analysis of cryptocurrency market news',
    all: 'All',
    positive: '📈 Positive',
    negative: '📉 Negative',
    neutral: '⚖️ Neutral',
    readMore: 'Read more →',
    source: 'Source',
    loading: 'Loading...',
    noArticles: 'No articles found',
    loadMore: 'Load more',
    buy: '🟢 Buy',
    sell: '🔴 Sell',
    hold: '🟡 Hold',
  },
  pl: {
    title: '📰 Blog Krypto',
    subtitle: 'Analiza AI wiadomości rynku kryptowalut',
    all: 'Wszystkie',
    positive: '📈 Pozytywne',
    negative: '📉 Negatywne',
    neutral: '⚖️ Neutralne',
    readMore: 'Czytaj więcej →',
    source: 'Źródło',
    loading: 'Ładowanie...',
    noArticles: 'Nie znaleziono artykułów',
    loadMore: 'Załaduj więcej',
    buy: '🟢 Kupuj',
    sell: '🔴 Sprzedaj',
    hold: '🟡 Trzymaj',
  },
  de: {
    title: '📰 Krypto Blog',
    subtitle: 'KI-Analyse der Kryptowährungsmarktnachrichten',
    all: 'Alle',
    positive: '📈 Positiv',
    negative: '📉 Negativ',
    neutral: '⚖️ Neutral',
    readMore: 'Mehr lesen →',
    source: 'Quelle',
    loading: 'Laden...',
    noArticles: 'Keine Artikel gefunden',
    loadMore: 'Mehr laden',
    buy: '🟢 Kaufen',
    sell: '🔴 Verkaufen',
    hold: '🟡 Halten',
  },
};

function timeAgo(dateStr: string, locale: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (locale === 'uk') {
    if (diff < 3600) return Math.floor(diff / 60) + ' хв тому';
    if (diff < 86400) return Math.floor(diff / 3600) + ' год тому';
    return Math.floor(diff / 86400) + ' дн тому';
  }
  if (locale === 'pl') {
    if (diff < 3600) return Math.floor(diff / 60) + ' min temu';
    if (diff < 86400) return Math.floor(diff / 3600) + ' godz temu';
    return Math.floor(diff / 86400) + ' dni temu';
  }
  if (locale === 'de') {
    if (diff < 3600) return 'vor ' + Math.floor(diff / 60) + ' Min';
    if (diff < 86400) return 'vor ' + Math.floor(diff / 3600) + ' Std';
    return 'vor ' + Math.floor(diff / 86400) + ' Tagen';
  }
  if (diff < 3600) return Math.floor(diff / 60) + ' min ago';
  if (diff < 86400) return Math.floor(diff / 3600) + ' h ago';
  return Math.floor(diff / 86400) + ' days ago';
}

export default function BlogPage() {
  const pathname = usePathname();
  const locale = pathname.startsWith('/en') ? 'en'
    : pathname.startsWith('/pl') ? 'pl'
    : pathname.startsWith('/de') ? 'de'
    : 'uk';
  const t = UI[locale as keyof typeof UI] || UI.uk;

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [sentiment, setSentiment] = useState('');
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const LIMIT = 12;

  const fetchArticles = async (newOffset = 0, newSentiment = sentiment, append = false) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        locale,
        limit: String(LIMIT),
        offset: String(newOffset),
      });
      if (newSentiment) params.set('sentiment', newSentiment);
      const res = await fetch(`/api/blog?${params}`);
      const data = await res.json();
      if (append) {
        setArticles(prev => [...prev, ...data.articles]);
      } else {
        setArticles(data.articles || []);
      }
      setTotal(data.total || 0);
      setOffset(newOffset);
    } catch {
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(0, '');
  }, []);

  const handleSentimentChange = (s: string) => {
    setSentiment(s);
    fetchArticles(0, s);
  };

  const sentimentColor = (s: string) => {
    if (s === 'positive') return 'bg-green-100 text-green-700';
    if (s === 'negative') return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-600';
  };

  const recommendationLabel = (r: string) => {
    if (r === 'buy') return t.buy;
    if (r === 'sell') return t.sell;
    return t.hold;
  };

  const recommendationColor = (r: string) => {
    if (r === 'buy') return 'bg-green-50 text-green-700 border-green-200';
    if (r === 'sell') return 'bg-red-50 text-red-700 border-red-200';
    return 'bg-yellow-50 text-yellow-700 border-yellow-200';
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">{t.title}</h1>
        <p className="text-gray-600 text-lg">{t.subtitle}</p>
      </div>

      {/* Sentiment filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {[
          { value: '', label: t.all },
          { value: 'positive', label: t.positive },
          { value: 'negative', label: t.negative },
          { value: 'neutral', label: t.neutral },
        ].map(({ value, label }) => (
          <button
            key={value}
            onClick={() => handleSentimentChange(value)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              sentiment === value
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Stats */}
      {!loading && (
        <p className="text-center text-sm text-gray-500 mb-6">
          {total} {locale === 'uk' ? 'статей' : locale === 'pl' ? 'artykułów' : locale === 'de' ? 'Artikel' : 'articles'}
        </p>
      )}

      {/* Articles grid */}
      {loading && articles.length === 0 ? (
        <div className="text-center py-20">
          <div className="inline-block w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-600">{t.loading}</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-3xl mb-2">📭</p>
          <p>{t.noArticles}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link key={article.id} href={`/blog/${article.id}`}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col cursor-pointer">
              {/* Top badges */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {article.coin_name && (
                    <span className="text-xs font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                      {article.coin_name}
                    </span>
                  )}
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${sentimentColor(article.sentiment)}`}>
                    {article.sentiment === 'positive' ? '📈' : article.sentiment === 'negative' ? '📉' : '⚖️'}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{timeAgo(article.published_at, locale)}</span>
              </div>

              {/* Title */}
              <h2 className="font-bold text-gray-900 text-base leading-snug mb-3 flex-1 line-clamp-3">
                {article.title}
              </h2>

              {/* Summary */}
              <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-5">
                {article.summary}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                <span className={`text-xs font-bold px-2 py-1 rounded-lg border ${recommendationColor(article.recommendation)}`}>
                  {recommendationLabel(article.recommendation)}
                </span>
                <a
                  href={article.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-orange-600 hover:underline font-semibold"
                >
                  {article.source_name} →
                </a>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Load more */}
      {!loading && articles.length < total && (
        <div className="text-center mt-10">
          <button
            onClick={() => fetchArticles(offset + LIMIT, sentiment, true)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition"
          >
            {t.loadMore}
          </button>
        </div>
      )}

      {loading && articles.length > 0 && (
        <div className="text-center mt-6">
          <div className="inline-block w-6 h-6 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </main>
  );
}
