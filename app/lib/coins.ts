import { NextResponse } from 'next/server';

export async function getCoins(): Promise<any[]> {
  try {
    const apiKey = process.env.COINGECKO_API_KEY;
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

    const res = await fetch(url, {
      headers: apiKey ? { 'x-cg-demo-api-key': apiKey } : {},
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}