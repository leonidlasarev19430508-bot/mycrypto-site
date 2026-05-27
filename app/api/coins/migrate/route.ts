import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  try {
    await client.connect();
    await client.query('ALTER TABLE ai_news ADD COLUMN IF NOT EXISTS title_uk TEXT');
    await client.end();
    return NextResponse.json({ success: true, message: 'Column title_uk added' });
  } catch (e: any) {
    try { await client.end(); } catch {}
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
