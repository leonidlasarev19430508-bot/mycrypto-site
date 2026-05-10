'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

type Coin = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
  market_cap_rank: number;
};

export default function CoinsPage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filtered, setFiltered] = useState<Coin[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'gainers' | 'losers'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    )
      .then(r => r.json())
      .then(data => {
        setCoins(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = coins;
    if (search) {
      result = result.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.symbol.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filter === 'gainers') result = result.filter(c => c.price_change_percentage_24h > 0);
    if (filter === 'losers') result = result.filter(c => c.price_change_percentage_24h < 0);
    setFiltered(result);
  }, [search, filter, coins]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
          📊 Топ 100 Криптовалют
        </h1>
        <p className="text-gray-500 text-lg">Актуальні ціни, зміна за 24 години, ринкова капіталізація</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="🔍 Пошук за назвою або символом..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <div className="flex gap-2">
          {(['all', 'gainers', 'losers'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-3 rounded-xl text-sm font-semibold transition ${
                filter === f
                  ? f === 'gainers' ? 'bg-green-500 text-white'
                  : f === 'losers' ? 'bg-red-500 text-white'
                  : 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f === 'all' ? 'Всі' : f === 'gainers' ? '▲ Ростуть' : '▼ Падають'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-blue-600">{coins.length}</p>
          <p className="text-xs text-gray-500 mt-1">Всього монет</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-green-600">
            {coins.filter(c => c.price_change_percentage_24h > 0).length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Ростуть сьогодні</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-red-500">
            {coins.filter(c => c.price_change_percentage_24h < 0).length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Падають сьогодні</p>
        </div>
      </div>

      <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
        <div className="col-span-1">#</div>
        <div className="col-span-4">Монета</div>
        <div className="col-span-2 text-right">Ціна</div>
        <div className="col-span-2 text-right">24г</div>
        <div className="col-span-3 text-right">Капіталізація</div>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">Завантаження даних...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">Нічого не знайдено</div>
      ) : (
        <div className="space-y-2">
          {filtered.map((coin) => (
            <Link
              key={coin.id}
              href={`/coin/${coin.id}`}
              className="grid grid-cols-12 gap-4 items-center px-4 py-3 bg-white border border-gray-100 rounded-xl hover:shadow-md hover:border-blue-200 transition group"
            >
              <div className="col-span-1 text-sm text-gray-400 font-medium">
                {coin.market_cap_rank}
              </div>
              <div className="col-span-6 md:col-span-4 flex items-center gap-3">
                <img src={coin.image} alt={coin.name} width={36} height={36} className="rounded-full" />
                <div>
                  <p className="font-bold text-gray-900 group-hover:text-blue-600 transition text-sm">{coin.name}</p>
                  <p className="text-xs text-gray-400 uppercase">{coin.symbol}</p>
                </div>
              </div>
              <div className="col-span-3 md:col-span-2 text-right">
                <p className="font-bold text-gray-900 text-sm">
                  ${coin.current_price < 1
                    ? coin.current_price.toFixed(6)
                    : coin.current_price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="col-span-2 text-right">
                <span className={`inline-flex items-center gap-0.5 text-sm font-semibold px-2 py-0.5 rounded-lg ${
                  coin.price_change_percentage_24h > 0
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-600'
                }`}>
                  {coin.price_change_percentage_24h > 0 ? '▲' : '▼'}
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </span>
              </div>
              <div className="hidden md:block col-span-3 text-right text-sm text-gray-500">
                ${(coin.market_cap / 1_000_000_000).toFixed(2)}B
              </div>
            </Link>
          ))}
        </div>
      )}

      <p className="text-center text-xs text-gray-400 mt-8">
        Дані: CoinGecko API · Оновлено щогодини · Не є фінансовою порадою
      </p>
    </main>
  );
}
