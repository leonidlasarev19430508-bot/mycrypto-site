import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const base = process.env.N8N_WEBHOOK_BASE;
    if (!base) throw new Error('N8N_WEBHOOK_BASE not set');

    const res = await fetch(`${base}/whale-alerts`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('n8n error: ' + res.status);

    const data = await res.json();
    return NextResponse.json(Array.isArray(data) ? data : []);
  } catch (e) {
    console.error('[whale-alerts]', e);
    return NextResponse.json([]);
  }
}
