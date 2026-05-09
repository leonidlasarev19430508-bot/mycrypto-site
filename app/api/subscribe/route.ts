import { NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    await pool.query(
      `INSERT INTO subscribers (email, is_active, created_at)
       VALUES ($1, true, NOW())
       ON CONFLICT (email) DO UPDATE SET is_active = true`,
      [email]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}