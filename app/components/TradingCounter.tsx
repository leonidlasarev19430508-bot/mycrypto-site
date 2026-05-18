'use client';
import { useState, useEffect } from 'react';

interface CoinPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const SKELETON_COINS = ['Bitcoin', 'Ethereum'];

export default function TradingCounter() {
  const [prices, setPrices] = useState<CoinPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum&order=market_cap_desc&per_page=5&page=1&sparkline=false'
        );
        const data = await res.json();
        setPrices(data);
      } catch (error) {
        console.error('Error fetching prices:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-xl">
      <div className="flex justify-center gap-6 flex-wrap">
        {loading
          ? SKELETON_COINS.map((name) => (
              <div key={name} className="text-center" style={{ minWidth: '90px' }}>
                <div className="font-semibold">{name}</div>
                <div className="text-xl font-bold mt-1">
                  <div className="animate-pulse bg-gray-300 rounded h-7 w-28 mx-auto" />
                </div>
                <div className="mt-1">
                  <div className="animate-pulse bg-gray-300 rounded h-4 w-12 mx-auto" />
                </div>
              </div>
            ))
          : prices.map((coin) => (
              <div key={coin.id} className="text-center" style={{ minWidth: '90px' }}>
                <span className="font-semibold">{coin.name}</span>
                <div className="text-xl font-bold">
                  ${coin.current_price.toLocaleString()}
                </div>
                <div className={coin.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {coin.price_change_percentage_24h >= 0 ? '▲' : '▼'}
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
