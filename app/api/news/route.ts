import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres'; // або твій клієнт PostgreSQL

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Валідація
    if (!body.coin_slug || !body.summary) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Зберігаємо в БД
    const result = await sql`
      INSERT INTO ai_news (
        coin_slug, coin_name, title, summary, 
        sentiment, recommendation, source_url, source_name, published_at
      ) VALUES (
        ${body.coin_slug}, ${body.coin_name}, ${body.title}, ${body.summary},
        ${body.sentiment}, ${body.recommendation}, ${body.source_url}, 
        ${body.source_name}, ${body.published_at}
      )
      RETURNING id
    `;

    return NextResponse.json({ 
      success: true, 
      id: result.rows[0].id 
    });

  } catch (error) {
    console.error('Error saving news:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}