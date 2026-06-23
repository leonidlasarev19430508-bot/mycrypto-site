import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'DCA-стратегія — як купувати без стресу | CryptoNavigator',
  description: 'DCA: простий підхід для регулярних покупок криптовалюти. Приклади з цифрами, переваги та обмеження.',
  alternates: { canonical: 'https://cryptotop.chat/trading-bots/dca' },
};

export default function DcaPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">DCA-стратегія: як купувати крипту без стресу</h1>
      <p className="text-gray-700 mb-4">Dollar-cost averaging (DCA) — регулярні покупки невеликими сумами незалежно від ціни. Приклад: купувати $100 щотижня протягом року.</p>
      <h2 className="font-semibold mt-4 mb-2">Переваги</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>Менше емоційних рішень</li>
        <li>Розподіл ризику у часі</li>
      </ul>
      <h2 className="font-semibold mt-4 mb-2">Обмеження</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>Може програвати в сильні цикли зростання</li>
        <li>Потрібна дисципліна</li>
      </ul>

      <p className="mb-4">Платформи: <a href="https://www.binance.com/en/register?ref=Q5HR1JVW" rel="sponsored noopener noreferrer" className="text-orange-600">Binance</a>, <a href="https://www.bybit.com/register?ref=CRYPTONAV" rel="sponsored noopener noreferrer" className="text-orange-600">Bybit</a>.</p>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <p className="font-bold text-orange-800 mb-2">Потренуйте DCA в симуляторі</p>
        <Link href="/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Відкрити симулятор →</Link>
      </div>
    </main>
  );
}
