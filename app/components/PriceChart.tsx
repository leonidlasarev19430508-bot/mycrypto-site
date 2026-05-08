'use client';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const COINS = [
  { id: 'bitcoin', symbol: 'BTC', color: '#f97316' },
  { id: 'ethereum', symbol: 'ETH', color: '#6366f1' },
  { id: 'solana', symbol: 'SOL', color: '#10b981' },
];

export default function PriceChart() {
  const [selected, setSelected] = useState(COINS[0]);
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.coingecko.com/api/v3/coins/${selected.id}/market_chart?vs_currency=usd&days=7`)
      .then(r => r.json())
      .then(data => {
        const prices = data.prices as [number, number][];
        const labels = prices.map(([ts]) =>
          new Date(ts).toLocaleDateString('uk-UA', { month: 'short', day: 'numeric' })
        );
        const values = prices.map(([, p]) => p);
        const first = values[0];
        const last = values[values.length - 1];
        setCurrentPrice(last);
        setPriceChange(((last - first) / first) * 100);
        setChartData({
          labels,
          datasets: [{
            label: selected.symbol,
            data: values,
            borderColor: selected.color,
            backgroundColor: selected.color + '20',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4,
          }],
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selected]);

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) => `$${ctx.parsed.y.toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { maxTicksLimit: 7, font: { size: 11 } },
      },
      y: {
        grid: { color: '#f3f4f6' },
        ticks: {
          font: { size: 11 },
          callback: (v: any) => '$' + Number(v).toLocaleString('en-US', { maximumFractionDigits: 0 }),
        },
      },
    },
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📈 Графіки цін</h2>

      <div className="bg-white rounded-2xl shadow-md p-6">
        {/* Перемикач монет */}
        <div className="flex gap-3 mb-6">
          {COINS.map(coin => (
            <button
              key={coin.id}
              onClick={() => setSelected(coin)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${
                selected.id === coin.id
                  ? 'text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={selected.id === coin.id ? { backgroundColor: coin.color } : {}}
            >
              {coin.symbol}
            </button>
          ))}
        </div>

        {/* Ціна і зміна */}
        {currentPrice && (
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-bold text-gray-900">
              ${currentPrice.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </span>
            {priceChange !== null && (
              <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                priceChange >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}% за 7 днів
              </span>
            )}
          </div>
        )}

        {/* Графік */}
        {loading ? (
          <div className="h-64 flex items-center justify-center text-gray-400">Завантаження...</div>
        ) : chartData ? (
          <Line data={chartData} options={options as any} />
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-400">Помилка завантаження</div>
        )}

        <p className="text-xs text-gray-400 mt-3 text-right">Дані: CoinGecko • 7 днів</p>
      </div>
    </section>
  );
}