import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Торгові стратегії: розбір та реальність | CryptoNavigator',
  description: 'Огляд базових і технічних стратегій, застереження і рекомендації щодо використання автоматизації.',
  alternates: { canonical: 'https://cryptotop.chat/trading-bots/strategies' },
};

export default function StrategiesPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Торгові стратегії: розбір, застереження, реальність</h1>
      <p className="text-gray-700 mb-4">Короткий огляд базових стратегій (trend-following, mean-reversion, breakout) та технічних індикаторів. Автоматизація допомагає тестувати і виконувати, але не скасовує необхідність контролю.</p>
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <p className="font-bold text-orange-800 mb-2">Нагадування</p>
        <p className="text-orange-700 mb-4">Ніяких гарантій прибутку. Автоматизація доповнює людину — не замінює її.</p>
        <Link href="/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Спробувати симулятор →</Link>
      </div>
    </main>
  );
}
