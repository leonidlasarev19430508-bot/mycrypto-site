import Link from 'next/link';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getCoinData(slug: string) {
  if (!slug) return null;

  const apiUrl = `https://api.coingecko.com/api/v3/coins/${slug}`;
  
  try {
    const res = await fetch(apiUrl, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch:", err);
    return null;
  }
}

export default async function CoinPage(props: PageProps) {
  const params = await props.params;
  const slug = params.slug;
  
  const coin = await getCoinData(slug);

  if (!coin) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">Coin not found</h1>
        <p>Could not find data for "{slug}"</p>
        <Link href="/markets" className="text-blue-600 hover:underline mt-4 inline-block">
          ← Back to all coins
        </Link>
      </div>
    );
  }

  const price = coin.market_data?.current_price?.usd;
  // Правильний URL для n8n роутера (production)
  const router = "http://localhost:5678/webhook/testgo";

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{coin.name}</h1>
      <p className="text-gray-600 mb-1">Symbol: {coin.symbol?.toUpperCase()}</p>
      <p className="text-2xl font-semibold mb-6">
        Current price (USD): {price ? `$${price.toLocaleString()}` : "N/A"}
      </p>
      
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Ready to trade {coin.name}?</h2>
        <p className="text-gray-600 mb-4">Get the best rates on top exchanges</p>
        
        <a 
          href={`${router}?offer=${slug}&utm_source=coin_page&utm_campaign=${slug}`}
          className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Trade {coin.symbol?.toUpperCase()} Now
        </a>
        
        <p className="text-xs text-gray-500 mt-3">You will be redirected to our partner exchange</p>
      </div>
      
      <Link href="/markets" className="text-blue-600 hover:underline">
        ← Back to all coins
      </Link>
    </div>
  );
}