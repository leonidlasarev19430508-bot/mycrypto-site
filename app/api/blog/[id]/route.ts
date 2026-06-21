import { NextResponse } from 'next/server';
import pool from '../../../lib/db';
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const result = await pool.query(
      `SELECT id, title, title_uk, coin_slug, coin_name, sentiment, recommendation,
              source_url, source_name, published_at,
              summary, summary_en, summary_pl, summary_de,
              full_article_uk, full_article_en,
              meta_description_uk, meta_description_en, tags
       FROM ai_news WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ article: result.rows[0] });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
