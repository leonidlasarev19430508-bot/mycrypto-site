'use client';
import { useState, useEffect } from 'react';

interface CoinPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

interface CryptoPricesProps {
  prices?: CoinPrice[];
  loading?: boolean;
  error?: boolean;
}

const SKELETON_COINS = ['Bitcoin', 'Ethereum', 'Solana', 'BNB'];

export default function CryptoPrices({ prices: externalPrices, loading: externalLoading, error: externalError }: CryptoPricesProps = {}) {
  const [internalPrices, setInternalPrices] = useState<CoinPrice[]>([]);
  const [internalLoading, setInternalLoading] = useState(true);
  const [internalError, setInternalError] = useState(false);

  // If external props are provided, use them; otherwise use internal state
  const useExternal = externalPrices !== undefined || externalLoading !== undefined || externalError !== undefined;
  const prices = useExternal ? (externalPrices || []) : internalPrices;
  const loading = useExternal ? (externalLoading ?? false) : internalLoading;
  const error = useExternal ? (externalError ?? false) : internalError;

  useEffect(() => {
    // Skip internal fetch if using external data
    if (useExternal) return;

    const fetchPrices = async () => {
      try {
        const res = await fetch('/api/coins?ids=bitcoin,ethereum,solana,binancecoin');
        const data = await res.json();
        setInternalPrices(data);
        setInternalError(false);
      } catch (error) {
        console.error('Error fetching prices:', error);
        setInternalError(true);
      } finally {
        setInternalLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, [useExternal]);

  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-xl">
      <div className="flex justify-center gap-8 flex-wrap">
        {loading
          ? SKELETON_COINS.map((name) => (
              <div key={name} className="text-center" style={{ minWidth: '80px' }}>
                <div className="font-semibold text-gray-700">{name}</div>
                <div className="text-xl font-bold mt-1">
                  <div className="animate-pulse bg-gray-300 rounded h-7 w-24 mx-auto" />
                </div>
                <div className="mt-1">
                  <div className="animate-pulse bg-gray-300 rounded h-4 w-12 mx-auto" />
                </div>
              </div>
            ))
          : prices.map((coin) => (
              <div key={coin.id} className="text-center" style={{ minWidth: '80px' }}>
                <span className="font-semibold text-gray-700">{coin.name}</span>
                <div className="text-xl font-bold">${coin.current_price.toLocaleString()}</div>
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
