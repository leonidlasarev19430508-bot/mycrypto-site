import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Article {
  id: number;
  title: string;
  title_uk: string;
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
  full_article_uk: string;
  full_article_en: string;
  meta_description_uk: string;
  meta_description_en: string;
  tags: string[];
}

async function getArticle(id: string): Promise<Article | null> {
  try {
    const res = await fetch(`https://cryptotop.chat/api/blog/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.article || null;
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) return { title: 'Article not found' };
  const title = article.title_uk || article.title;
  const description = article.meta_description_uk || article.summary?.slice(0, 160) || '';
  return {
    title: `${title} | CryptoNavigator`,
    description,
    alternates: { canonical: `https://cryptotop.chat/blog/${id}` },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://cryptotop.chat/blog/${id}`,
    },
  };
}

const SENTIMENT_COLORS: Record<string, string> = {
  positive: 'bg-green-100 text-green-700',
  negative: 'bg-red-100 text-red-700',
  neutral: 'bg-gray-100 text-gray-700',
};

const RECOMMENDATION_COLORS: Record<string, string> = {
  buy: 'bg-green-500 text-white',
  sell: 'bg-red-500 text-white',
  hold: 'bg-yellow-400 text-gray-900',
};

const REC_LABELS: Record<string, string> = {
  buy: '📈 Купити',
  sell: '📉 Продати',
  hold: '⏸ Тримати',
};

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) notFound();

  const date = new Date(article.published_at).toLocaleDateString('uk-UA', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const sentiment = article.sentiment?.toLowerCase() || 'neutral';
  const rec = article.recommendation?.toLowerCase() || 'hold';
  const displayTitle = article.title_uk || article.title;
  const hasFullArticle = !!(article.full_article_uk && article.full_article_uk.length > 50);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": displayTitle,
    "description": article.meta_description_uk || article.summary?.slice(0, 160) || "",
    "datePublished": article.published_at,
    "dateModified": article.published_at,
    "author": {
      "@type": "Organization",
      "name": "CryptoNavigator",
      "url": "https://cryptotop.chat"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CryptoNavigator",
      "logo": { "@type": "ImageObject", "url": "https://cryptotop.chat/favicon.ico" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://cryptotop.chat/blog/${article.id}` },
    "keywords": [article.coin_name, "криптовалюта", "крипто новини", ...(article.tags || [])].filter(Boolean).join(", "),
    "inLanguage": "uk",
    "isAccessibleForFree": true,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Навігація */}
        <Link href="/blog" className="text-orange-600 hover:underline text-sm font-semibold mb-6 inline-block">
          ← Назад до блогу
        </Link>

        {/* Бейджі */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {article.coin_name && (
            <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
              {article.coin_name}
            </span>
          )}
          <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${SENTIMENT_COLORS[sentiment] || SENTIMENT_COLORS.neutral}`}>
            {sentiment === 'positive' ? '📈 Позитив' : sentiment === 'negative' ? '📉 Негатив' : '⚖️ Нейтрально'}
          </span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${RECOMMENDATION_COLORS[rec] || RECOMMENDATION_COLORS.hold}`}>
            {REC_LABELS[rec] || rec}
          </span>
          <span className="text-sm text-gray-500 ml-auto">{date}</span>
        </div>

        {/* Заголовок */}
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 leading-tight">
          {displayTitle}
        </h1>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 flex items-start gap-2 mb-6">
          <span className="text-yellow-600 font-bold text-sm mt-0.5">⚠️</span>
          <p className="text-yellow-800 text-sm leading-relaxed">
            Аналіз згенеровано штучним інтелектом і не є фінансовою порадою. Рекомендації носять виключно інформаційний характер.
          </p>
        </div>

        {/* Повна стаття або короткий summary */}
        {hasFullArticle ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-6">
            <div className="prose prose-gray max-w-none">
              {article.full_article_uk.split('\n').filter(p => p.trim()).map((paragraph, i) => (
                <p key={i} className="text-gray-800 text-base leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-6">
            <p className="text-gray-800 text-base leading-relaxed font-medium">
              {article.summary}
            </p>
          </div>
        )}

        {/* Переклади (показуємо якщо немає повної статті) */}
        {!hasFullArticle && (article.summary_en || article.summary_pl || article.summary_de) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {article.summary_en && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">🇬🇧 English</p>
                <p className="text-sm text-gray-800 leading-relaxed">{article.summary_en}</p>
              </div>
            )}
            {article.summary_pl && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">🇵🇱 Polski</p>
                <p className="text-sm text-gray-800 leading-relaxed">{article.summary_pl}</p>
              </div>
            )}
            {article.summary_de && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">🇩🇪 Deutsch</p>
                <p className="text-sm text-gray-800 leading-relaxed">{article.summary_de}</p>
              </div>
            )}
          </div>
        )}

        {/* Теги */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag, i) => (
              <span key={i} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA симулятор */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-6">
          <p className="font-bold text-orange-800 mb-2">🎮 Хочеш перевірити стратегію?</p>
          <p className="text-orange-700 text-sm mb-4">Спробуй безкоштовний симулятор торгівлі — без ризику для реальних грошей.</p>
          <Link href="/simulator" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-xl text-sm transition">
            Відкрити симулятор →
          </Link>
        </div>

        {/* Посилання на оригінал */}
        {article.source_url && (
          <a href={article.source_url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-bold px-6 py-3 rounded-xl transition text-sm">
            Читати оригінал на {article.source_name || 'джерелі'} →
          </a>
        )}

      </div>
    </>
  );
}
