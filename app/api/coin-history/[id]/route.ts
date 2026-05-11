import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  if (!id || !date) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 });
  }

  try {
    const apiKey = process.env.COINGECKO_API_KEY;
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/history?date=${date}&localization=false`,
      {
        headers: apiKey ? { 'x-cg-demo-api-key': apiKey } : {},
        next: { revalidate: 86400 },
      }
    );
    if (!res.ok) return NextResponse.json(null, { status: 200 });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(null, { status: 200 });
  }
}
