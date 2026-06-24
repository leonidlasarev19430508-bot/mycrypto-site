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
      <p className="text-gray-700 mb-4">Вибір платформи — важливе рішення. Від нього залежить безпека коштів, зручність налаштування і вартість.</p>
      <p className="text-gray-700 mb-6">Два підходи:</p>
      <div className="space-y-4 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Вбудовані боти бірж</h2>
          <p className="text-gray-700">Плюси: безкоштовно, API не потрібен, кошти на біржі, просте налаштування. Мінуси: обмежені стратегії.</p>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Сторонні сервіси</h2>
          <p className="text-gray-700">Плюси: більше стратегій, підтримка багатьох бірж. Мінуси: платна підписка, потрібен API-ключ, складніше налаштування.</p>
        </div>
      </div>

      <table className="w-full text-left border-collapse mb-6">
        <thead>
          <tr className="text-sm text-gray-600">
            <th className="pb-2">Платформа</th>
            <th className="pb-2">Тип</th>
            <th className="pb-2">Нотатка</th>
          </tr>
        </thead>
        <tbody>
          <tr className="align-top border-t"><td className="py-2">Binance</td><td className="py-2">DCA та Grid</td><td className="py-2">Безкоштовно — <a href="https://www.binance.com/en/register?ref=Q5HR1JVW" rel="sponsored noopener noreferrer" className="text-orange-600">реф</a></td></tr>
          <tr className="align-top border-t"><td className="py-2">Bybit</td><td className="py-2">DCA, Grid, Martingale</td><td className="py-2">Зручний інтерфейс — <a href="https://www.bybit.com/register?ref=CRYPTONAV" rel="sponsored noopener noreferrer" className="text-orange-600">реф</a></td></tr>
          <tr className="align-top border-t"><td className="py-2">OKX</td><td className="py-2">Grid, DCA, Arbitrage</td><td className="py-2"><a href="https://www.okx.com/join/CRYPTONAV" rel="sponsored noopener noreferrer" className="text-orange-600">реф</a></td></tr>
          <tr className="align-top border-t"><td className="py-2">KuCoin</td><td className="py-2">DCA і Grid</td><td className="py-2"><a href="https://www.kucoin.com/rf/CXEPY4S5" rel="sponsored noopener noreferrer" className="text-orange-600">реф</a></td></tr>
          <tr className="align-top border-t"><td className="py-2">3Commas</td><td className="py-2">Сторонній сервіс</td><td className="py-2">20+ бірж, підписка</td></tr>
          <tr className="align-top border-t"><td className="py-2">Pionex</td><td className="py-2">Вбудовані боти</td><td className="py-2">16 безкоштовних ботів</td></tr>
        </tbody>
      </table>

      <div className="space-y-4 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Для початківців</h2>
          <p className="text-gray-700">Binance або Bybit — безкоштовно, без API та з простим інтерфейсом.</p>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Для середнього рівня</h2>
          <p className="text-gray-700">Pionex або 3Commas — більше стратегій, але можуть бути витрати на підписку.</p>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Для досвідчених</h2>
          <p className="text-gray-700">TradingView Pine Script або Python + CCXT.</p>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <p className="font-bold text-orange-800 mb-2">Важливо</p>
        <p className="text-orange-700">Ніколи не надавай API-ключ з правами виведення коштів.</p>
      </div>
    </main>
  );
}
