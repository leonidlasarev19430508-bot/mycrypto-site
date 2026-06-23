import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Trading-Strategien: Analyse und Realität | CryptoNavigator',
  description: 'Übersicht über Basis- und technische Strategien, Warnungen und Empfehlungen zur Automatisierung.',
  alternates: { canonical: 'https://cryptotop.chat/de/trading-bots/strategies' },
};

export default function StrategiesPageDe() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Trading-Strategien: Analyse, Warnungen, Realität</h1>
      <p className="text-gray-700 mb-4">Basisstrategien wie Trendfolge, Mean-Reversion und Breakout. Automatisierung hilft bei der Ausführung, ersetzt aber nicht die menschliche Kontrolle.</p>
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <Link href="/de/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Simulator öffnen →</Link>
      </div>
    </main>
  );
}
