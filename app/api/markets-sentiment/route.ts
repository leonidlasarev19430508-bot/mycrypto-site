import { NextResponse } from 'next/server';
import pool from '../../lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        coin_slug,
        REPLACE(coin_name, '=', '') as coin_name,
        COUNT(*) as total_news,
        SUM(CASE WHEN sentiment = 'positive' THEN 1 ELSE 0 END) as positive_count,
        SUM(CASE WHEN sentiment = 'negative' THEN 1 ELSE 0 END) as negative_count,
        SUM(CASE WHEN sentiment = 'neutral' THEN 1 ELSE 0 END) as neutral_count,
        ROUND(AVG(CASE
          WHEN sentiment = 'positive' THEN 1
          WHEN sentiment = 'negative' THEN -1
          ELSE 0
        END)::numeric, 2) as sentiment_score,
        MODE() WITHIN GROUP (ORDER BY recommendation) as top_recommendation,
        MAX(published_at) as latest_news_at
      FROM ai_news
      WHERE coin_slug IS NOT NULL
        AND coin_slug != ''
        AND coin_name IS NOT NULL
        AND coin_name != '='
        AND coin_name != ''
      GROUP BY coin_slug, coin_name
      HAVING COUNT(*) >= 1
      ORDER BY total_news DESC, latest_news_at DESC
      LIMIT 50
    `);

    return NextResponse.json({ coins: result.rows });
  } catch (error) {
    console.error('Error fetching market sentiment:', error);
    return NextResponse.json({ coins: [] });
  }
}
