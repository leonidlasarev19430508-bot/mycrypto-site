import { NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    await pool.query(
      `INSERT INTO subscribers (email, preferences) VALUES ($1, ARRAY[]::text[])
       ON CONFLICT (email) DO UPDATE SET is_active = TRUE`,
      [email]
    );
    return NextResponse.json({ success: true, message: 'Підписка успішна!' });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
