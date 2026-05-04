import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Зберігаємо підписника
    await sql`
      INSERT INTO subscribers (email, preferences)
      VALUES (${email}, ARRAY[]::text[])
      ON CONFLICT (email) DO UPDATE SET
        is_active = TRUE
    `;

    return NextResponse.json({ success: true, message: 'Підписка успішна!' });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}