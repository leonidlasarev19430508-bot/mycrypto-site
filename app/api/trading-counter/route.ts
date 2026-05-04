import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const base = process.env.N8N_WEBHOOK_BASE;
    if (!base) throw new Error('N8N_WEBHOOK_BASE not set');

    const res = await fetch(`${base}/trading-counter`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) throw new Error('n8n error: ' + res.status);

    const data = await res.json();
    const row = Array.isArray(data) ? data[0] : data;

    return NextResponse.json({
      lastHour: Number(row?.lastHour ?? row?.lasthour) || 0,
      last24h:  Number(row?.last24h)  || 0,
      total:    Number(row?.total)    || 0,
    });
  } catch (e) {
    console.error('[trading-counter]', e);
    return NextResponse.json({ lastHour: 0, last24h: 0, total: 0 });
  }
}
