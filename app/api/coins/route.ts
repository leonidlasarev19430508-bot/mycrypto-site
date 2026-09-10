import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const idsParam = searchParams.get('ids');
  
  // Base URL with common parameters
  let url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  
  // If specific ids are requested, modify the URL
  if (idsParam) {
    // For specific ids, we use a different parameter and limit to those coins
    url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${idsParam}&order=market_cap_desc&per_page=${idsParam.split(',').length}&page=1&sparkline=false`;
  }

  try {
    const apiKey = process.env.COINGECKO_API_KEY;
    
    // Different revalidation times: 60 seconds for specific coins (homepage), 1 hour for top 100
    const revalidateTime = idsParam ? 60 : 3600;
    
    const res = await fetch(url, {
      headers: apiKey ? { 'x-cg-demo-api-key': apiKey } : {},
      next: { revalidate: revalidateTime },
    });

    if (!res.ok) return NextResponse.json([], { status: 200 });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
