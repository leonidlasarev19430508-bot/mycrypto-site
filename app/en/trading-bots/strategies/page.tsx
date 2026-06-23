import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Trading strategies: analysis and reality | CryptoNavigator',
  description: 'Overview of basic and technical strategies, warnings and recommendations on automation.',
  alternates: { canonical: 'https://cryptotop.chat/en/trading-bots/strategies' },
};

export default function StrategiesPageEn() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Trading strategies: analysis, warnings, reality</h1>
      <p className="text-gray-700 mb-4">Basic strategies: trend-following, mean-reversion, breakout. Automation helps execute but doesn't replace human oversight.</p>
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <Link href="/en/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Try simulator →</Link>
      </div>
    </main>
  );
}
