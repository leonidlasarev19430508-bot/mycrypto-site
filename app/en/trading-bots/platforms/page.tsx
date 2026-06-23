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
      <h1 className="text-3xl font-black mb-4">Where to run a trading bot: platform overview 2025</h1>
      <p className="text-gray-700 mb-4">Choosing a platform is an important decision. It affects fund safety, setup convenience, and cost.</p>
      <p className="text-gray-700 mb-6">Two approaches:</p>
      <div className="space-y-4 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Exchange built-in bots</h2>
          <p className="text-gray-700">Pros: free, no API needed, funds stay on exchange, simple setup. Cons: limited strategies.</p>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Third-party services</h2>
          <p className="text-gray-700">Pros: more strategies, support for many exchanges. Cons: paid subscriptions, API key required, more complex setup.</p>
        </div>
      </div>

      <table className="w-full text-left border-collapse mb-6">
        <thead>
          <tr className="text-sm text-gray-600">
            <th className="pb-2">Platform</th>
            <th className="pb-2">Type</th>
            <th className="pb-2">Note</th>
          </tr>
        </thead>
        <tbody>
          <tr className="align-top border-t"><td className="py-2">Binance</td><td className="py-2">DCA and Grid</td><td className="py-2">Free — <a href="https://www.binance.com/en/register?ref=Q5HR1JVW" rel="sponsored noopener noreferrer" className="text-orange-600">ref</a></td></tr>
          <tr className="align-top border-t"><td className="py-2">Bybit</td><td className="py-2">DCA, Grid, Martingale</td><td className="py-2">Convenient interface — <a href="https://www.bybit.com/register?ref=CRYPTONAV" rel="sponsored noopener noreferrer" className="text-orange-600">ref</a></td></tr>
          <tr className="align-top border-t"><td className="py-2">OKX</td><td className="py-2">Grid, DCA, Arbitrage</td><td className="py-2"><a href="https://www.okx.com/join/CRYPTONAV" rel="sponsored noopener noreferrer" className="text-orange-600">ref</a></td></tr>
          <tr className="align-top border-t"><td className="py-2">KuCoin</td><td className="py-2">DCA and Grid</td><td className="py-2"><a href="https://www.kucoin.com/rf/CXEPY4S5" rel="sponsored noopener noreferrer" className="text-orange-600">ref</a></td></tr>
          <tr className="align-top border-t"><td className="py-2">3Commas</td><td className="py-2">Third-party service</td><td className="py-2">20+ exchanges, subscription</td></tr>
          <tr className="align-top border-t"><td className="py-2">Pionex</td><td className="py-2">Built-in bots</td><td className="py-2">16 free bots</td></tr>
        </tbody>
      </table>

      <div className="space-y-4 mb-6">
        <div>
          <h2 className="font-semibold mb-2">For beginners</h2>
          <p className="text-gray-700">Binance or Bybit — free, no API, simple interface.</p>
        </div>
        <div>
          <h2 className="font-semibold mb-2">For intermediate</h2>
          <p className="text-gray-700">Pionex or 3Commas — more strategies, but may have subscription costs.</p>
        </div>
        <div>
          <h2 className="font-semibold mb-2">For advanced</h2>
          <p className="text-gray-700">TradingView Pine Script or Python + CCXT.</p>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <p className="font-bold text-orange-800 mb-2">Important</p>
        <p className="text-orange-700">Never provide an API key with withdrawal rights.</p>
      </div>
    </main>
  );
}
