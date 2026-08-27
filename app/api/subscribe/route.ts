import { NextResponse } from 'next/server';
import pool from '../../lib/db';
import { getIp, isRateLimited } from '../../lib/rate-limit';

export async function POST(request: Request) {
  // Rate limiting check
  const ip = getIp(request);
  if (isRateLimited('/api/subscribe', ip)) {
    return NextResponse.json(
      { error: 'Too many subscription attempts. Please wait 10 minutes before trying again.' },
      { 
        status: 429,
        headers: { 'Retry-After': '600' }
      }
    );
  }

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