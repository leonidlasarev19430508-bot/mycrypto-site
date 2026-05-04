import Link from 'next/link';
import { Client } from 'pg';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getNews() {
  const client = new Client({
    host: process.env.DB_HOST || 'postgres',
    port: 5432,
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'supersecret',
    database: process.env.DB_NAME || 'n8n',
  });

  try {
    await client.connect();
    const result = await client.query(`
      SELECT * FROM ai_news
      ORDER BY created_at DESC
      LIMIT 50
    `);
    await client.end();
    return result.rows;
  } catch (error) {
    console.error('Помилка підключення до БД:', error);
    await client.end();
    throw error;
  }
}

function SentimentBadge({ sentiment }: { sentiment: string }) {
  const colors: Record<string, string> = {
    positive: 'bg-green-100 text-green-800',
    negative: 'bg-red-100 text-red-800',
    neutral: 'bg-gray-100 text-gray-800'
  };
  const labels: Record<string, string> = {
    positive: '📈 Позитив',
    negative: '📉 Негатив',
    neutral: '⚖️ Нейтрально'
  };
  const color = colors[sentiment] || colors.neutral;
  const label = labels[sentiment] || '⚖️ Нейтрально';

  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>{label}</span>;
}

function RecommendationBadge({ recommendation }: { recommendation: string }) {
  const colors: Record<string, string> = {
    buy: 'bg-green-100 text-green-800',
    sell: 'bg-red-100 text-red-800',
    hold: 'bg-yellow-100 text-yellow-800'
  };
  const labels: Record<string, string> = {
    buy: '💰 Купувати',
    sell: '💸 Продавати',
    hold: '✋ Тримати'
  };
  const color = colors[recommendation] || colors.hold;
  const label = labels[recommendation] || '✋ Тримати';

  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>{label}</span>;
}

export default async function NewsPage() {
  let news = [];
  let error = null;

  try {
    news = await getNews();
  } catch (err: any) {
    error = err;
    console.error('Помилка на сторінці:', err);
  }

  if (error) {
    return (
      <div className="p-10">
        <h1 className="text-4xl font-bold text-center mb-2">📰 AI Crypto News</h1>
        <div className="max-w-4xl mx-auto bg-red-50 border border-red-200 rounded-xl p-6 mt-6">
          <h2 className="text-red-800 font-bold mb-2">❌ Помилка підключення до бази даних</h2>
          <p className="text-red-700 mb-2">Не вдалося отримати новини з бази даних.</p>
          <pre className="bg-red-100 p-3 rounded text-sm overflow-auto">
            {error.message || String(error)}
          </pre>
          <p className="mt-4 text-gray-600">Перевірте:</p>
          <ul className="list-disc list-inside text-gray-600 ml-4">
            <li>Чи працює PostgreSQL контейнер</li>
            <li>Чи правильні змінні середовища DB_HOST, DB_USER, DB_PASSWORD</li>
            <li>Чи існує таблиця ai_news</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-center mb-2">
        📰 AI Crypto News
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Автоматичний аналіз крипто-новин за допомогою штучного інтелекту
      </p>

      {news.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500">Новини завантажуються. Завітайте пізніше.</p>
          <p className="text-gray-400 text-sm mt-2">(В БД немає новин. Запустіть AI News Engine в n8n)</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {news.map((item) => (
            <div key={item.id} className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <Link
                  href={`/coin/${item.coin_slug}`}
                  className="text-lg font-semibold text-blue-600 hover:underline"
                >
                  {item.coin_name || item.coin_slug || 'Криптовалюта'}
                </Link>
                <SentimentBadge sentiment={item.sentiment} />
                <RecommendationBadge recommendation={item.recommendation} />
              </div>

              <h2 className="text-xl font-medium mb-2">{item.title}</h2>
              <p className="text-gray-700 mb-4">{item.summary}</p>

              <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 border-t pt-3">
                <span>📌 Джерело: {item.source_name || 'RSS Feed'}</span>
                <span>📅 {new Date(item.created_at).toLocaleDateString('uk-UA')}</span>
              </div>

              {item.source_url && (
                <a
                  href={item.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-blue-600 hover:underline text-sm"
                >
                  🔗 Читати оригінал →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}