import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Торгові боти — автоматизація трейдингу | CryptoNavigator',
  description: 'Хаб про торгові боти: як автоматизація доповнює людину, огляд стратегій і платформ.',
  alternates: { canonical: 'https://cryptotop.chat/trading-bots' },
};

export default function TradingBotsHub() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Торгові боти: інструмент в руках людини, а не її заміна</h1>
      <p className="text-gray-700 mb-6">У цьому розділі ми пояснюємо, як працює автоматизація торгівлі, які стратегії використовуються і як безпечно інтегрувати бота в вашу стратегію. Автоматизація доповнює людину, але не замінює її — завжди контролюйте ризики.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Link href="/trading-bots/dca" className="p-4 bg-white border rounded-lg hover:shadow">DCA-стратегія</Link>
        <Link href="/trading-bots/grid" className="p-4 bg-white border rounded-lg hover:shadow">Grid-боти</Link>
        <Link href="/trading-bots/strategies" className="p-4 bg-white border rounded-lg hover:shadow">Стратегії</Link>
        <Link href="/trading-bots/platforms" className="p-4 bg-white border rounded-lg hover:shadow">Платформи</Link>
        <Link href="/trading-bots/risks" className="p-4 bg-white border rounded-lg hover:shadow">Ризики</Link>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <p className="font-bold text-orange-800 mb-2">Спробуйте симулятор</p>
        <p className="text-orange-700 mb-4">Тестуйте автоматичні стратегії без ризику для реальних грошей.</p>
        <Link href="/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Відкрити симулятор →</Link>
      </div>
    </main>
  );
}
