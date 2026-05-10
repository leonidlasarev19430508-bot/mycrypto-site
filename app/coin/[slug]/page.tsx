import Link from 'next/link';

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getCoinData(slug: string) {
  if (!slug) return null;
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${slug}?localization=false&tickers=false&community_data=false&developer_data=false`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function fmt(n: number) {
  if (!n) return 'N/A';
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  return `$${n.toLocaleString('en-US')}`;
}

function fmtPrice(n: number) {
  if (!n) return 'N/A';
  if (n < 0.01) return `$${n.toFixed(8)}`;
  if (n < 1) return `$${n.toFixed(4)}`;
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const AFFILIATE = 'https://www.binance.com/register?ref=GRO_28502_BIO0R';

export default async function CoinPage(props: PageProps) {
  const params = await props.params;
  const coin = await getCoinData(params.slug);

  if (!coin) {
    return (
      <div className="p-10 text-center">
        <p className="text-5xl mb-4">😕</p>
        <h1 className="text-2xl font-bold mb-2">Монету не знайдено</h1>
        <p className="text-gray-500 mb-6">Не вдалося знайти дані для &quot;{params.slug}&quot;</p>
        <Link href="/coins" className="text-blue-600 hover:underline">← До всіх монет</Link>
      </div>
    );
  }

  const price = coin.market_data?.current_price?.usd;
  const change24h = coin.market_data?.price_change_percentage_24h;
  const change7d = coin.market_data?.price_change_percentage_7d;
  const marketCap = coin.market_data?.market_cap?.usd;
  const volume24h = coin.market_data?.total_volume?.usd;
  const high24h = coin.market_data?.high_24h?.usd;
  const low24h = coin.market_data?.low_24h?.usd;
  const ath = coin.market_data?.ath?.usd;
  const athChange = coin.market_data?.ath_change_percentage?.usd;
  const supply = coin.market_data?.circulating_supply;
  const maxSupply = coin.market_data?.max_supply;
  const rank = coin.market_cap_rank;
  const description = coin.description?.en?.split('. ').slice(0, 3).join('. ');

  const isPositive = change24h > 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* Back */}
      <Link href="/coins" className="text-blue-600 hover:underline text-sm mb-6 inline-block">
        ← До всіх монет
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        {coin.image?.large && (
          <img src={coin.image.large} alt={coin.name} width={64} height={64} className="rounded-full" />
        )}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-gray-900">{coin.name}</h1>
            <span className="text-sm font-bold text-gray-400 uppercase bg-gray-100 px-2 py-0.5 rounded">
              {coin.symbol}
            </span>
            {rank && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                #{rank}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-3xl font-black text-gray-900">{fmtPrice(price)}</span>
            <span className={`text-sm font-bold px-2 py-1 rounded-lg ${
              isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
            }`}>
              {isPositive ? '▲' : '▼'} {Math.abs(change24h).toFixed(2)}% (24г)
            </span>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Ринкова капіталізація', value: fmt(marketCap) },
          { label: "Обʼєм (24г)", value: fmt(volume24h) },
          { label: 'Максимум (24г)', value: fmtPrice(high24h) },
          { label: 'Мінімум (24г)', value: fmtPrice(low24h) },
          { label: 'ATH', value: fmtPrice(ath) },
          { label: 'Від ATH', value: athChange ? `${athChange.toFixed(1)}%` : 'N/A' },
          { label: 'В обігу', value: supply ? `${(supply / 1_000_000).toFixed(2)}M` : 'N/A' },
          { label: 'Макс. емісія', value: maxSupply ? `${(maxSupply / 1_000_000).toFixed(2)}M` : '∞' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1">{label}</p>
            <p className="font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      {/* 7d change */}
      {change7d !== undefined && (
        <div className="bg-gray-50 rounded-xl p-4 mb-8 flex items-center gap-3">
          <span className="text-sm text-gray-500">Зміна за 7 днів:</span>
          <span className={`font-bold ${change7d > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {change7d > 0 ? '▲' : '▼'} {Math.abs(change7d).toFixed(2)}%
          </span>
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="bg-white border border-gray-100 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-3">Про {coin.name}</h2>
          <p className="text-gray-600 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description + '.' }}
          />
        </div>
      )}

      {/* CTA */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-bold mb-1">Готовий торгувати {coin.name}?</h2>
        <p className="text-orange-100 text-sm mb-4">
          Купи {coin.symbol?.toUpperCase()} на Binance — найбільшій біржі світу
        </p>
        <a
          href={AFFILIATE}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-orange-600 font-bold px-6 py-3 rounded-xl hover:bg-orange-50 transition"
        >
          Торгувати {coin.symbol?.toUpperCase()} на Binance →
        </a>
        <p className="text-xs text-orange-200 mt-3">Реєстрація безкоштовна · Комісія 0.1%</p>
      </div>

    </div>
  );
}
