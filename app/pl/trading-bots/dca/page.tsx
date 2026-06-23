import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Strategia DCA — jak kupować bez stresu | CryptoNavigator',
  description: 'DCA wyjaśnione: przykłady, zalety i ograniczenia.',
  alternates: { canonical: 'https://cryptotop.chat/pl/trading-bots/dca' },
};

export default function DcaPagePl() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Strategia DCA: jak kupować bez stresu</h1>
      <p className="text-gray-700 mb-4">Dollar-cost averaging to regularne zakupy małych kwot niezależnie od ceny. Przykład: kupowanie 100$ co tydzień przez rok.</p>
      <h2 className="font-semibold mt-4 mb-2">Zalety</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>Mniej decyzji emocjonalnych</li>
        <li>Rozłożenie ryzyka w czasie</li>
      </ul>
      <h2 className="font-semibold mt-4 mb-2">Ograniczenia</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>Może przegrać w silnych trendach wzrostowych</li>
        <li>Wymaga dyscypliny i regularności</li>
      </ul>
      <p className="mb-4">Platformy: <a href="https://www.binance.com/en/register?ref=Q5HR1JVW" rel="sponsored noopener noreferrer" className="text-orange-600">Binance</a>, <a href="https://www.bybit.com/register?ref=CRYPTONAV" rel="sponsored noopener noreferrer" className="text-orange-600">Bybit</a>.</p>
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <Link href="/pl/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Wypróbuj symulator →</Link>
      </div>
    </main>
  );
}
