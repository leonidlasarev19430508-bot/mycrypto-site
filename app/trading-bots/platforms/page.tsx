import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Де запустити торгового бота: огляд платформ 2025 | CryptoNavigator',
  description: 'Огляд платформ для ботів: Binance, Bybit, 3Commas, Pionex та інші. Порівняння функцій і комісій.',
  alternates: { canonical: 'https://cryptotop.chat/trading-bots/platforms' },
};

export default function PlatformsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Де запустити торгового бота: огляд платформ 2025</h1>
      <p className="text-gray-700 mb-4">Короткий огляд популярних платформ для запуску ботів: вбудовані рішення на біржах та сторонні сервіси.</p>

      <table className="w-full text-left border-collapse mb-6">
        <thead>
          <tr className="text-sm text-gray-600">
            <th className="pb-2">Платформа</th>
            <th className="pb-2">Тип</th>
            <th className="pb-2">Переваги</th>
          </tr>
        </thead>
        <tbody>
          <tr className="align-top border-t"><td className="py-2">Binance</td><td className="py-2">Вбудовані боти</td><td className="py-2">Низькі комісії, інтеграція з біржею — <a href="https://www.binance.com/en/register?ref=Q5HR1JVW" rel="sponsored noopener noreferrer" className="text-orange-600">реф</a></td></tr>
          <tr className="align-top border-t"><td className="py-2">Bybit</td><td className="py-2">Вбудовані + API</td><td className="py-2">Гарна ліквідність — <a href="https://www.bybit.com/register?ref=CRYPTONAV" rel="sponsored noopener noreferrer" className="text-orange-600">реф</a></td></tr>
          <tr className="align-top border-t"><td className="py-2">3Commas</td><td className="py-2">Сторонній сервіс</td><td className="py-2">Багато стратегій, підписка</td></tr>
          <tr className="align-top border-t"><td className="py-2">Pionex</td><td className="py-2">Вбудовані боти</td><td className="py-2">Прості у налаштуванні</td></tr>
          <tr className="align-top border-t"><td className="py-2">OKX</td><td className="py-2">Вбудовані</td><td className="py-2"><a href="https://www.okx.com/join/CRYPTONAV" rel="sponsored noopener noreferrer" className="text-orange-600">реф</a></td></tr>
          <tr className="align-top border-t"><td className="py-2">KuCoin</td><td className="py-2">Вбудовані</td><td className="py-2"><a href="https://www.kucoin.com/rf/CXEPY4S5" rel="sponsored noopener noreferrer" className="text-orange-600">реф</a></td></tr>
        </tbody>
      </table>

      <p className="text-gray-700">Вибір платформи залежить від вашого бюджету, бажаного рівня автоматизації та готовності платити за підписку.</p>
    </main>
  );
}
