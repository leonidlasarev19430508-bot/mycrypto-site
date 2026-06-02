import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Article {
  id: number;
  title: string;
  coin_slug: string;
  coin_name: string;
  sentiment: string;
  recommendation: string;
  source_url: string;
  source_name: string;
  published_at: string;
  summary: string;
  summary_en: string;
  summary_pl: string;
  summary_de: string;
}

async function getArticle(id: string): Promise<Article | null> {
  try {
    const res = await fetch(`https://cryptotop.chat/api/blog/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.article || null;
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const article = await getArticle(params.id);
  if (!article) return { title: 'Article not found' };
  return {
    title: `${article.title} | CryptoNavigator Blog`,
    description: article.summary?.slice(0, 160) || '',
    openGraph: {
      title: article.title,
      description: article.summary?.slice(0, 160) || '',
      type: 'article',
      url: `https://cryptotop.chat/blog/${params.id}`,
    },
  };
}

const SENTIMENT_COLORS: Record<string, string> = {
  bullish: 'bg-green-100 text-green-700',
  bearish: 'bg-red-100 text-red-700',
  neutral: 'bg-gray-100 text-gray-700',
};

const RECOMMENDATION_COLORS: Record<string, string> = {
  buy: 'bg-green-500 text-white',
  sell: 'bg-red-500 text-white',
  hold: 'bg-yellow-400 text-white',
};

const REC_LABELS: Record<string, string> = {
  buy: '📈 Купити',
  sell: '📉 Продати',
  hold: '⏸ Тримати',
};

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);
  if (!article) notFound();

  const date = new Date(article.published_at).toLocaleDateString('uk-UA', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const sentiment = article.sentiment?.toLowerCase() || 'neutral';
  const rec = article.recommendation?.toLowerCase() || 'hold';

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/blog" className="text-orange-500 hover:underline text-sm font-semibold mb-6 inline-block">
        ← Назад до блогу
      </Link>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
          {article.coin_name || article.coin_slug}
        </span>
        <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${SENTIMENT_COLORS[sentiment] || SENTIMENT_COLORS.neutral}`}>
          {sentiment}
        </span>
        {rec && (
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${RECOMMENDATION_COLORS[rec] || RECOMMENDATION_COLORS.hold}`}>
            {REC_LABELS[rec] || rec}
          </span>
        )}
        <span className="text-xs text-gray-400 ml-auto">{date}</span>
      </div>

      <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 leading-tight">
        {article.title}
      </h1>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-6">
        <p className="text-gray-800 text-base leading-relaxed font-medium">
          {article.summary}
        </p>
      </div>

      {(article.summary_en || article.summary_pl || article.summary_de) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {article.summary_en && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">🇬🇧 English</p>
              <p className="text-sm text-gray-700 leading-relaxed">{article.summary_en}</p>
            </div>
          )}
          {article.summary_pl && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">🇵🇱 Polski</p>
              <p className="text-sm text-gray-700 leading-relaxed">{article.summary_pl}</p>
            </div>
          )}
          {article.summary_de && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">🇩🇪 Deutsch</p>
              <p className="text-sm text-gray-700 leading-relaxed">{article.summary_de}</p>
            </div>
          )}
        </div>
      )}

      {article.source_url && (
        <a href={article.source_url} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-bold px-6 py-3 rounded-xl transition text-sm">
          Читати оригінал на {article.source_name || 'джерелі'} →
        </a>
      )}
    </div>
  );
}
