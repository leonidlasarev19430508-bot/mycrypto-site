export const metadata = {
  title: "Крипто Ринки — Live Ціни Bitcoin та Топ-100 Монет 2026 | CryptoNavigator",
  description: "Актуальні ціни криптовалют в реальному часі. Bitcoin, Ethereum, BNB, Solana та топ-100 монет. Графіки, ринкова капіталізація, зміна за 24 години та обсяги торгів.",
  alternates: { canonical: "https://cryptotop.chat/markets" },
};

import Link from 'next/link';
import pool from '../lib/db';

async function getTopCoins() {
  try {
    const result = await pool.query(`
      SELECT 
        coin_slug as id,
        coin_name as name,
        COUNT(*) as news_count,
        ROUND(AVG(CASE 
          WHEN sentiment = 'positive' THEN 1 
          WHEN sentiment = 'negative' THEN -1 
          ELSE 0 
        END), 2) as sentiment_score
      FROM ai_news
      WHERE coin_slug IS NOT NULL 
        AND coin_slug != 'unknown'
        AND coin_slug != ''
      GROUP BY coin_slug, coin_name
      HAVING COUNT(*) > 0
      ORDER BY news_count DESC
      LIMIT 100
    `);
    return result.rows;
  } catch (error) {
    console.error('Error fetching coins:', error);
    return [];
  }
}

export default async function MarketsPage() {
  const coins = await getTopCoins();

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-center mb-2">
        Top 100 Cryptocurrencies
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Click on any coin to see detailed information and AI analysis
      </p>
      
      {coins.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500">Завантаження даних...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {coins.map((coin) => (
            <Link 
              key={coin.id}
              href={`/coin/${coin.id}`}
              className="block"
            >
              <div className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-blue-600">
                    {coin.name || coin.id}
                  </h2>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {coin.news_count} новин
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-gray-500">Настрій:</span>
                  <span className={`text-sm font-medium ${
                    coin.sentiment_score > 0.2 ? 'text-green-600' : 
                    coin.sentiment_score < -0.2 ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {coin.sentiment_score > 0.2 ? '📈 Позитивний' : 
                     coin.sentiment_score < -0.2 ? '📉 Негативний' : '⚖️ Нейтральний'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}