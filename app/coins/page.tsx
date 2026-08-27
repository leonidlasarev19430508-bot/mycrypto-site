import CoinsTable from '../components/CoinsTable';
import { getCoins } from '../lib/coins';

type Coin = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
  market_cap_rank: number;
};

export const revalidate = 3600; // ISR: оновлення кожну годину

async function fetchCoins(): Promise<Coin[]> {
  try {
    const coins = await getCoins();
    return coins;
  } catch (error) {
    console.error('Error fetching coins:', error);
    return [];
  }
}

export default async function CoinsPage() {
  const coins = await fetchCoins();

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <CoinsTable initialCoins={coins} />
    </main>
  );
}
