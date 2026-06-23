import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Trading-Bots — Automatisierung für Trader | CryptoNavigator',
  description: 'Hub über Trading-Bots: wie Automatisierung den Menschen ergänzt, Überblick über Strategien und Plattformen.',
  alternates: { canonical: 'https://cryptotop.chat/de/trading-bots' },
};

export default function TradingBotsHubDe() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Trading-Bots: ein Werkzeug in den Händen des Menschen, kein Ersatz</h1>
      <p className="text-gray-700 mb-6">Dieser Bereich erklärt Automatisierung, Strategien und sichere Integration. Automatisierung ergänzt den Menschen, ersetzt ihn nicht.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Link href="/de/trading-bots/dca" className="p-4 bg-white border rounded-lg hover:shadow">DCA-Strategie</Link>
        <Link href="/de/trading-bots/grid" className="p-4 bg-white border rounded-lg hover:shadow">Grid-Bots</Link>
        <Link href="/de/trading-bots/strategies" className="p-4 bg-white border rounded-lg hover:shadow">Strategien</Link>
        <Link href="/de/trading-bots/platforms" className="p-4 bg-white border rounded-lg hover:shadow">Plattformen</Link>
        <Link href="/de/trading-bots/risks" className="p-4 bg-white border rounded-lg hover:shadow">Risiken</Link>
      </div>
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <Link href="/de/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Simulator öffnen →</Link>
      </div>
    </main>
  );
}
