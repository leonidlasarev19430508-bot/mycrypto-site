import pool from './db';

// Декодує найпоширеніші HTML-сутності (&apos; &#8217; &amp; тощо)
function decodeEntities(text: string): string {
  const named: Record<string, string> = {
    '&apos;': "'", '&quot;': '"', '&amp;': '&', '&lt;': '<', '&gt;': '>',
    '&nbsp;': ' ', '&laquo;': '«', '&raquo;': '»', '&mdash;': '—', '&ndash;': '–',
  };
  return text
    .replace(/&(?:apos|quot|amp|lt|gt|nbsp|laquo|raquo|mdash|ndash);/g, m => named[m] || m)
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)));
}

export type Article = {
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
};

export async function getBlogArticles(
  locale: string = 'uk',
  coin?: string | null,
  sentiment?: string | null,
  limit: number = 12,
  offset: number = 0
): Promise<{ articles: Article[]; total: number }> {
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
      title: decodeEntities(row.title?.replace(/^=+/, '') || ''),
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

    return {
      articles,
      total: parseInt(countResult.rows[0].count),
    };
  } catch (error) {
    console.error('Error fetching blog articles:', error);
    return { articles: [], total: 0 };
  }
}