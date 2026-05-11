import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids');

  if (!ids) {
    return NextResponse.json({ error: 'Missing ids' }, { status: 400 });
  }

  try {
    const apiKey = process.env.COINGECKO_API_KEY;
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`,
      {
        headers: apiKey ? { 'x-cg-demo-api-key': apiKey } : {},
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return NextResponse.json({}, { status: 200 });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({}, { status: 200 });
  }
}
