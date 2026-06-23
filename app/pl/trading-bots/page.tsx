import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Boty handlowe — automatyzacja tradingu | CryptoNavigator',
  description: 'Hub o botach handlowych: jak automatyzacja uzupełnia człowieka, przegląd strategii i platform.',
  alternates: { canonical: 'https://cryptotop.chat/pl/trading-bots' },
};

export default function TradingBotsHubPl() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Boty handlowe: narzędzie w rękach człowieka, nie jego zastępstwo</h1>
      <p className="text-gray-700 mb-6">Sekcja wyjaśnia automatyzację, strategie i bezpieczne praktyki. Automatyzacja uzupełnia człowieka, nie go zastępuje.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Link href="/pl/trading-bots/dca" className="p-4 bg-white border rounded-lg hover:shadow">DCA</Link>
        <Link href="/pl/trading-bots/grid" className="p-4 bg-white border rounded-lg hover:shadow">Grid boty</Link>
        <Link href="/pl/trading-bots/strategies" className="p-4 bg-white border rounded-lg hover:shadow">Strategie</Link>
        <Link href="/pl/trading-bots/platforms" className="p-4 bg-white border rounded-lg hover:shadow">Platformy</Link>
        <Link href="/pl/trading-bots/risks" className="p-4 bg-white border rounded-lg hover:shadow">Ryzyko</Link>
      </div>
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <Link href="/pl/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Otwórz symulator →</Link>
      </div>
    </main>
  );
}
