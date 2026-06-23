import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'DCA strategy — buy without stress | CryptoNavigator',
  description: 'DCA explained with numbers, advantages and limits. Use with discipline and risk management.',
  alternates: { canonical: 'https://cryptotop.chat/en/trading-bots/dca' },
};

export default function DcaPageEn() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">DCA strategy: how to buy crypto without stress</h1>
      <p className="text-gray-700 mb-4">Dollar-cost averaging — regular purchases. Example: $100 weekly for a year.</p>
      <p className="mb-4">Platforms: <a href="https://www.binance.com/en/register?ref=Q5HR1JVW" rel="sponsored noopener noreferrer" className="text-orange-600">Binance</a>, <a href="https://www.bybit.com/register?ref=CRYPTONAV" rel="sponsored noopener noreferrer" className="text-orange-600">Bybit</a>.</p>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <Link href="/en/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Try simulator →</Link>
      </div>
    </main>
  );
}
