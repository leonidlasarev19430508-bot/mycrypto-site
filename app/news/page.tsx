export const metadata = {
  title: "Крипто Новини 2026 — CryptoNavigator",
  description: "Останні новини криптовалют: Bitcoin, Ethereum, altcoins. AI-аналіз ринку в реальному часі на CryptoNavigator.",
  alternates: { canonical: "https://cryptotop.chat/news" },
};

import Link from 'next/link';
import { Client } from 'pg';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getNews() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  try {
    await client.connect();
    const result = await client.query(`
      SELECT * FROM ai_news ORDER BY created_at DESC LIMIT 50
    `);
    await client.end();
    return result.rows;
  } catch (error) {
    console.error('Помилка підключення до БД:', error);
    try { await client.end(); } catch {}
    throw error;
  }
}

const LOCALE_CONFIG = {
  uk: {
    title: '📰 AI Crypto News',
    subtitle: 'Автоматичний аналіз крипто-новин за допомогою штучного інтелекту',
    empty: 'Новини завантажуються. Завітайте пізніше.',
    source: 'Джерело',
    readMore: '🔗 Читати оригінал →',
    sentiment: { positive: '📈 Позитив', negative: '📉 Негатив', neutral: '⚖️ Нейтрально' },
    recommendation: { buy: '💰 Купувати', sell: '💸 Продавати', hold: '✋ Тримати' },
    summaryField: 'summary',
  },
  en: {
    title: '📰 AI Crypto News',
    subtitle: 'Automated crypto news analysis powered by artificial intelligence',
    empty: 'News is loading. Check back later.',
    source: 'Source',
    readMore: '🔗 Read original →',
    sentiment: { positive: '📈 Positive', negative: '📉 Negative', neutral: '⚖️ Neutral' },
    recommendation: { buy: '💰 Buy', sell: '💸 Sell', hold: '✋ Hold' },
    summaryField: 'summary_en',
  },
  pl: {
    title: '📰 AI Crypto News',
    subtitle: 'Automatyczna analiza wiadomości krypto przy użyciu sztucznej inteligencji',
    empty: 'Wiadomości się ładują. Sprawdź później.',
    source: 'Źródło',
    readMore: '🔗 Czytaj oryginał →',
    sentiment: { positive: '📈 Pozytywny', negative: '📉 Negatywny', neutral: '⚖️ Neutralny' },
    recommendation: { buy: '💰 Kup', sell: '💸 Sprzedaj', hold: '✋ Trzymaj' },
    summaryField: 'summary_pl',
  },
  de: {
    title: '📰 AI Crypto News',
    subtitle: 'Automatisierte Krypto-Nachrichtenanalyse mit künstlicher Intelligenz',
    empty: 'Nachrichten werden geladen. Schauen Sie später vorbei.',
    source: 'Quelle',
    readMore: '🔗 Original lesen →',
    sentiment: { positive: '📈 Positiv', negative: '📉 Negativ', neutral: '⚖️ Neutral' },
    recommendation: { buy: '💰 Kaufen', sell: '💸 Verkaufen', hold: '✋ Halten' },
    summaryField: 'summary_de',
  },
};

function SentimentBadge({ sentiment, t }: { sentiment: string; t: typeof LOCALE_CONFIG.uk }) {
  const colors: Record<string, string> = {
    positive: 'bg-green-100 text-green-800',
    negative: 'bg-red-100 text-red-800',
    neutral: 'bg-gray-100 text-gray-800',
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[sentiment] || colors.neutral}`}>
      {t.sentiment[sentiment as keyof typeof t.sentiment] || t.sentiment.neutral}
    </span>
  );
}

function RecommendationBadge({ recommendation, t }: { recommendation: string; t: typeof LOCALE_CONFIG.uk }) {
  const colors: Record<string, string> = {
    buy: 'bg-green-100 text-green-800',
    sell: 'bg-red-100 text-red-800',
    hold: 'bg-yellow-100 text-yellow-800',
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[recommendation] || colors.hold}`}>
      {t.recommendation[recommendation as keyof typeof t.recommendation] || t.recommendation.hold}
    </span>
  );
}

export default async function NewsPage({ locale = 'uk' }: { locale?: string }) {
  const t = LOCALE_CONFIG[locale as keyof typeof LOCALE_CONFIG] || LOCALE_CONFIG.uk;
  let news: any[] = [];

  try {
    news = await getNews();
  } catch (err: any) {
    return (
      <div className="p-10">
        <h1 className="text-4xl font-bold text-center mb-2">{t.title}</h1>
        <div className="max-w-4xl mx-auto bg-red-50 border border-red-200 rounded-xl p-6 mt-6">
          <h2 className="text-red-800 font-bold mb-2">❌ Database error</h2>
          <pre className="bg-red-100 p-3 rounded text-sm overflow-auto">{err.message}</pre>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-center mb-2">{t.title}</h1>
      <p className="text-center text-gray-600 mb-10">{t.subtitle}</p>

      {news.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500">{t.empty}</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {news.map((item) => (
            <div key={item.id} className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <Link href={`/coin/${item.coin_slug}`} className="text-lg font-semibold text-blue-600 hover:underline">
                  {item.coin_name || item.coin_slug || 'Crypto'}
                </Link>
                <SentimentBadge sentiment={item.sentiment} t={t} />
                <RecommendationBadge recommendation={item.recommendation} t={t} />
              </div>
              <h2 className="text-xl font-medium mb-2">{item.title}</h2>
              <p className="text-gray-700 mb-4">
                {item[t.summaryField] || item.summary}
              </p>
              <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 border-t pt-3">
                <span>📌 {t.source}: {item.source_name || 'RSS Feed'}</span>
                <span>📅 {new Date(item.created_at).toLocaleDateString(locale === 'uk' ? 'uk-UA' : locale)}</span>
              </div>
              {item.source_url && (
                <a href={item.source_url} target="_blank" rel="noopener noreferrer"
                  className="inline-block mt-3 text-blue-600 hover:underline text-sm">
                  {t.readMore}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}