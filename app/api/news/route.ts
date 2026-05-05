import { NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function GET() {
  try {
    const result = await pool.query(
      'SELECT * FROM ai_news ORDER BY published_at DESC LIMIT 20'
    );
    return NextResponse.json({ news: result.rows });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ news: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.coin_slug || !body.summary) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const result = await pool.query(
      `INSERT INTO ai_news (coin_slug, coin_name, title, summary, sentiment, recommendation, source_url, source_name, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`,
      [body.coin_slug, body.coin_name, body.title, body.summary, body.sentiment, body.recommendation, body.source_url, body.source_name, body.published_at]
    );
    return NextResponse.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error('Error saving news:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
