'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

type Coin = {
  id: string; symbol: string; name: string;
  current_price: number; price_change_percentage_24h: number;
  market_cap: number; image: string; market_cap_rank: number;
};

export default function CoinsDEPage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filtered, setFiltered] = useState<Coin[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'gainers' | 'losers'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/coins').then(r => r.json()).then(data => {
      if (Array.isArray(data) && data.length > 0) { setCoins(data); setFiltered(data); }
      else setError(true);
      setLoading(false);
    }).catch(() => { setError(true); setLoading(false); });
  }, []);

  useEffect(() => {
    let result = coins;
    if (search) result = result.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.symbol.toLowerCase().includes(search.toLowerCase()));
    if (filter === 'gainers') result = result.filter(c => c.price_change_percentage_24h > 0);
    if (filter === 'losers') result = result.filter(c => c.price_change_percentage_24h < 0);
    setFiltered(result);
  }, [search, filter, coins]);

  const gainers = coins.filter(c => c.price_change_percentage_24h > 0).length;
  const losers = coins.filter(c => c.price_change_percentage_24h < 0).length;

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">📊 Top 100 Kryptowährungen</h1>
        <p className="text-gray-500 text-lg">Aktuelle Preise · 24h-Änderung · Marktkapitalisierung</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input type="text" placeholder="🔍 Suche: Bitcoin, BTC, Ethereum..." value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white" />
        <div className="flex gap-2">
          {(['all', 'gainers', 'losers'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-3 rounded-xl text-sm font-semibold transition whitespace-nowrap ${filter === f ? f === 'gainers' ? 'bg-green-500 text-white' : f === 'losers' ? 'bg-red-500 text-white' : 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {f === 'all' ? '🌐 Alle' : f === 'gainers' ? '▲ Steigend' : '▼ Fallend'}
            </button>
          ))}
        </div>
      </div>
      {!loading && !error && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-4 text-center cursor-pointer" onClick={() => setFilter('all')}>
            <p className="text-2xl font-black text-blue-600">{coins.length}</p>
            <p className="text-xs text-gray-500 mt-1">Coins gesamt</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center cursor-pointer" onClick={() => setFilter('gainers')}>
            <p className="text-2xl font-black text-green-600">{gainers}</p>
            <p className="text-xs text-gray-500 mt-1">▲ Steigend heute</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 text-center cursor-pointer" onClick={() => setFilter('losers')}>
            <p className="text-2xl font-black text-red-500">{losers}</p>
            <p className="text-xs text-gray-500 mt-1">▼ Fallend heute</p>
          </div>
        </div>
      )}
      <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100 mb-2">
        <div className="col-span-1">#</div>
        <div className="col-span-4">Coin</div>
        <div className="col-span-2 text-right">Preis</div>
        <div className="col-span-2 text-right">24h</div>
        <div className="col-span-3 text-right">Marktkapital.</div>
      </div>
      {loading && <div className="text-center py-20"><div className="inline-block w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div><p className="text-gray-500">Daten werden geladen...</p></div>}
      {error && <div className="text-center py-20"><p className="text-4xl mb-3">😕</p><p className="text-gray-500">Daten konnten nicht geladen werden. Bitte später versuchen.</p></div>}
      {!loading && !error && filtered.length === 0 && <div className="text-center py-20 text-gray-400"><p className="text-3xl mb-2">🔍</p><p>Nichts gefunden für &quot;{search}&quot;</p></div>}
      {!loading && !error && filtered.length > 0 && (
        <div className="space-y-1.5">
          {filtered.map((coin) => (
            <Link key={coin.id} href={`/coin/${coin.id}`}
              className="grid grid-cols-12 gap-4 items-center px-4 py-3 bg-white border border-gray-100 rounded-xl hover:shadow-md hover:border-blue-200 transition group">
              <div className="col-span-1 text-sm text-gray-400 font-medium">{coin.market_cap_rank}</div>
              <div className="col-span-6 md:col-span-4 flex items-center gap-3">
                <img src={coin.image} alt={coin.name} width={36} height={36} className="rounded-full flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-bold text-gray-900 group-hover:text-blue-600 transition text-sm truncate">{coin.name}</p>
                  <p className="text-xs text-gray-400 uppercase">{coin.symbol}</p>
                </div>
              </div>
              <div className="col-span-3 md:col-span-2 text-right">
                <p className="font-bold text-gray-900 text-sm">${coin.current_price < 1 ? coin.current_price.toFixed(6) : coin.current_price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div className="col-span-2 text-right">
                <span className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-lg ${coin.price_change_percentage_24h > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                  {coin.price_change_percentage_24h > 0 ? '▲' : '▼'}{Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </span>
              </div>
              <div className="hidden md:block col-span-3 text-right text-sm text-gray-400">${(coin.market_cap / 1_000_000_000).toFixed(2)}B</div>
            </Link>
          ))}
        </div>
      )}
      <p className="text-center text-xs text-gray-400 mt-8">Daten: CoinGecko API · Stündlich aktualisiert · Keine Finanzberatung</p>
    </main>
  );
}
