"use client";
import { useEffect, useRef, useState } from "react";
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
} from "chart.js";

Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Tooltip, Filler);

const COINS = [
  { id: "bitcoin",  symbol: "BTC", color: "#F7931A" },
  { id: "ethereum", symbol: "ETH", color: "#627EEA" },
  { id: "solana",   symbol: "SOL", color: "#9945FF" },
  { id: "binancecoin", symbol: "BNB", color: "#F3BA2F" },
];

const RANGES = [
  { label: "24г", days: 1 },
  { label: "7д",  days: 7 },
  { label: "30д", days: 30 },
];

export default function PriceChart() {
  const [activeCoin, setActiveCoin] = useState(COINS[0]);
  const [activeRange, setActiveRange] = useState(RANGES[1]);
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState<number | null>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    fetchAndRender();
  }, [activeCoin, activeRange]);

  async function fetchAndRender() {
    if (!chartRef.current) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${activeCoin.id}/market_chart?vs_currency=usd&days=${activeRange.days}`
      );
      const data = await res.json();
      const prices: [number, number][] = data.prices;

      const labels = prices.map(([ts]) => {
        const d = new Date(ts);
        return activeRange.days === 1
          ? d.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })
          : d.toLocaleDateString("uk-UA", { day: "2-digit", month: "2-digit" });
      });
      const values = prices.map(([, v]) => v);

      const pct = ((values[values.length - 1] - values[0]) / values[0]) * 100;
      setChange(pct);

      if (chartInstance.current) chartInstance.current.destroy();

      const isUp = pct >= 0;
      const color = isUp ? "#22c55e" : "#ef4444";

      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels,
          datasets: [{
            data: values,
            borderColor: color,
            borderWidth: 2,
            pointRadius: 0,
            fill: true,
            backgroundColor: isUp ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
            tension: 0.4,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: {
            callbacks: {
              label: (ctx) => ` $${ctx.parsed.y.toLocaleString("en-US", { maximumFractionDigits: 2 })}`,
            }
          }},
          scales: {
            x: { grid: { display: false }, ticks: { maxTicksLimit: 6, color: "#9ca3af" } },
            y: { grid: { color: "rgba(156,163,175,0.15)" }, ticks: {
              color: "#9ca3af",
              callback: (v) => `$${Number(v).toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
            }},
          },
        },
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📈 Графіки цін</h2>

      {/* Монети */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {COINS.map((coin) => (
          <button
            key={coin.id}
            onClick={() => setActiveCoin(coin)}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
              activeCoin.id === coin.id
                ? "text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={activeCoin.id === coin.id ? { backgroundColor: coin.color } : {}}
          >
            {coin.symbol}
          </button>
        ))}
      </div>

      {/* Картка */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-lg font-bold text-gray-800">{activeCoin.symbol}/USD</span>
            {change !== null && (
              <span className={`ml-3 text-sm font-semibold ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {change >= 0 ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
              </span>
            )}
          </div>
          {/* Діапазони */}
          <div className="flex gap-1">
            {RANGES.map((r) => (
              <button
                key={r.days}
                onClick={() => setActiveRange(r)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  activeRange.days === r.days
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative h-64">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-xl z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800" />
            </div>
          )}
          <canvas ref={chartRef} />
        </div>
      </div>
    </section>
  );
}
