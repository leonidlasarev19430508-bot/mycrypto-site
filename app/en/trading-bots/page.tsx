import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Trading bots — automation for traders | CryptoNavigator',
  description: 'Hub about trading bots: how automation complements humans, overview of strategies and platforms.',
  alternates: { canonical: 'https://cryptotop.chat/en/trading-bots' },
};

export default function TradingBotsHubEn() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Trading bots: a tool in the trader's hands, not a replacement</h1>
      <p className="text-gray-700 mb-6">This section explains how trading automation works, common strategies and safe integration practices. Automation complements humans — it doesn't replace them.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Link href="/en/trading-bots/dca" className="p-4 bg-white border rounded-lg hover:shadow">DCA strategy</Link>
        <Link href="/en/trading-bots/grid" className="p-4 bg-white border rounded-lg hover:shadow">Grid bots</Link>
        <Link href="/en/trading-bots/strategies" className="p-4 bg-white border rounded-lg hover:shadow">Strategies</Link>
        <Link href="/en/trading-bots/platforms" className="p-4 bg-white border rounded-lg hover:shadow">Platforms</Link>
        <Link href="/en/trading-bots/risks" className="p-4 bg-white border rounded-lg hover:shadow">Risks</Link>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <p className="font-bold text-orange-800 mb-2">Try the simulator</p>
        <p className="text-orange-700 mb-4">Test automated strategies with no risk to real money.</p>
        <Link href="/en/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Open simulator →</Link>
      </div>
    </main>
  );
}
