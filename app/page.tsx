import type { Metadata } from 'next';
import HomePageClient from './components/HomePageClient';

export const metadata: Metadata = {
  title: 'CryptoNavigator — Кращі Крипто-Біржі 2026',
  description: 'Порівняй Binance, Bybit, OKX. AI-аналіз новин, live ціни, Fear & Greed Index. Почни торгувати сьогодні.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
