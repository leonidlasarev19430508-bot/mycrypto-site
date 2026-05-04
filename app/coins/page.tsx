import React from "react";
import Link from "next/link";

type Coin = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
};

async function getTopCoins() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
      { 
        // 🟢 Зміни на next: { revalidate: 3600 } (1 година)
        next: { revalidate: 3600 }
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch coins:", res.status);
      return [];
    }

    const data = await res.json();
    return data as Coin[];
  } catch (err) {
    console.error("Error fetching coins:", err);
    return [];
  }
}

export default async function CoinsPage() {
  const coins = await getTopCoins();

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Top 100 Cryptocurrencies</h1>
      <p>Click on any coin to see detailed information.</p>
      
      <ul style={{ listStyle: "none", padding: 0 }}>
        {coins.map((coin) => (
          <li 
            key={coin.id}
            style={{
              margin: "10px 0",
              padding: "10px",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9"
            }}
          >
            <Link 
              href={`/coin/${coin.id}`}
              style={{ textDecoration: "none", color: "inherit", display: "block" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <img 
                  src={coin.image} 
                  alt={coin.name} 
                  width="32" 
                  height="32"
                  style={{ borderRadius: "50%" }}
                />
                <div style={{ minWidth: "150px" }}>
                  <strong>{coin.name}</strong>
                  <span style={{ color: "#666", marginLeft: "8px" }}>
                    {coin.symbol.toUpperCase()}
                  </span>
                </div>
                <div style={{ minWidth: "100px", textAlign: "right" }}>
                  ${coin.current_price.toLocaleString()}
                </div>
                <div 
                  style={{ 
                    minWidth: "80px", 
                    textAlign: "right",
                    color: coin.price_change_percentage_24h > 0 ? "#22c55e" : "#ef4444",
                    fontWeight: 500
                  }}
                >
                  {coin.price_change_percentage_24h > 0 ? "▲" : "▼"}
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </div>
                <div style={{ marginLeft: "auto", color: "#666" }}>
                  ${(coin.market_cap / 1_000_000_000).toFixed(2)}B
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}