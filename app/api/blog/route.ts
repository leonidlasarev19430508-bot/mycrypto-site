import { NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'uk';
  const coin = searchParams.get('coin') || null;
  const sentiment = searchParams.get('sentiment') || null;
  const limit = parseInt(searchParams.get('limit') || '12');
  const offset = parseInt(searchParams.get('offset') || '0');

  try {
    let query = `
      SELECT
        id, title, coin_slug, coin_name, sentiment, recommendation,
        source_url, source_name, published_at, created_at,
        summary, summary_en, summary_pl, summary_de
      FROM ai_news
      WHERE title IS NOT NULL AND title != ''
    `;
    const params: (string | number)[] = [];
    let paramCount = 1;

    if (coin) {
      query += ` AND coin_slug = $${paramCount}`;
      params.push(coin);
      paramCount++;
    }

    if (sentiment) {
      query += ` AND sentiment = $${paramCount}`;
      params.push(sentiment);
      paramCount++;
    }

    query += ` ORDER BY published_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    // Count total
    let countQuery = `SELECT COUNT(*) FROM ai_news WHERE title IS NOT NULL AND title != ''`;
    const countParams: (string | number)[] = [];
    let countParamCount = 1;
    if (coin) { countQuery += ` AND coin_slug = $${countParamCount}`; countParams.push(coin); countParamCount++; }
    if (sentiment) { countQuery += ` AND sentiment = $${countParamCount}`; countParams.push(sentiment); }
    const countResult = await pool.query(countQuery, countParams);

    const articles = result.rows.map(row => ({
      id: row.id,
      title: row.title?.replace(/^=+/, '') || '',
      coin_slug: row.coin_slug,
      coin_name: row.coin_name?.replace('=', '') || '',
      sentiment: row.sentiment,
      recommendation: row.recommendation,
      source_url: row.source_url,
      source_name: row.source_name,
      published_at: row.published_at,
      summary: locale === 'en' ? (row.summary_en || row.summary)
             : locale === 'pl' ? (row.summary_pl || row.summary)
             : locale === 'de' ? (row.summary_de || row.summary)
             : row.summary,
    }));

    return NextResponse.json({
      articles,
      total: parseInt(countResult.rows[0].count),
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching blog articles:', error);
    return NextResponse.json({ articles: [], total: 0 });
  }
}
