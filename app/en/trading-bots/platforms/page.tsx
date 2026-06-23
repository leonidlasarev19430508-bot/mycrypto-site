import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Where to run trading bots: platforms 2025 | CryptoNavigator',
  description: 'Overview of platforms for bots: Binance, Bybit, 3Commas, Pionex and more. Comparison table and affiliate links.',
  alternates: { canonical: 'https://cryptotop.chat/en/trading-bots/platforms' },
};

export default function PlatformsPageEn() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Where to run a trading bot: platforms overview 2025</h1>
      <table className="w-full text-left border-collapse mb-6">
        <thead>
          <tr className="text-sm text-gray-600">
            <th className="pb-2">Platform</th>
            <th className="pb-2">Type</th>
            <th className="pb-2">Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr className="align-top border-t"><td className="py-2">Binance</td><td className="py-2">Built-in</td><td className="py-2">Low fees — <a href="https://www.binance.com/en/register?ref=Q5HR1JVW" rel="sponsored noopener noreferrer" className="text-orange-600">ref</a></td></tr>
          <tr className="align-top border-t"><td className="py-2">Bybit</td><td className="py-2">Built-in + API</td><td className="py-2">Good liquidity — <a href="https://www.bybit.com/register?ref=CRYPTONAV" rel="sponsored noopener noreferrer" className="text-orange-600">ref</a></td></tr>
          <tr className="align-top border-t"><td className="py-2">3Commas</td><td className="py-2">Third-party</td><td className="py-2">Many strategies, subscription</td></tr>
          <tr className="align-top border-t"><td className="py-2">Pionex</td><td className="py-2">Built-in</td><td className="py-2">Easy to set up</td></tr>
        </tbody>
      </table>
    </main>
  );
}
