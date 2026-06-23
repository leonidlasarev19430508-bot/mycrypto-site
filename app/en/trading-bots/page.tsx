import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Trading bots — automation for traders | CryptoNavigator',
  description: 'Complete guide to trading bots: strategies, platforms, safety. Learn DCA, grid bots, and real risks.',
  alternates: { canonical: 'https://cryptotop.chat/en/trading-bots' },
};

export default function TradingBotsHubEn() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Trading bots: a tool in the trader's hands, not a replacement</h1>
      <p className="text-gray-700 mb-6">Search "crypto trading bot" online and you'll find thousands of promises: passive income, automatic profit, "earn while you sleep." The reality is different. A trading bot is a program that executes your trading decisions automatically and without emotions. But if your strategy is flawed — the bot will simply lose money faster and more efficiently.</p>
      <p className="text-gray-700 mb-6">This section offers an honest look at trading automation. No hype, no horror stories. Just what you really need to know before entrusting your funds to an algorithm.</p>

      <div className="space-y-6 mb-6">
        <div>
          <h2 className="font-semibold mb-2">What is a trading bot</h2>
          <p className="text-gray-700">A trading bot is a program that connects to an exchange via API and automatically executes trades based on predefined rules. For example: "buy $100 of BTC every Monday" or "sell if price rises 2% from purchase." The bot doesn't sleep, doesn't panic, and isn't driven by greed — it simply follows the rules.</p>
          <p className="text-gray-700 mt-3">But there's an important nuance: the rules are set by a human. And if the rules are wrong — the result will be too.</p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Who automation is for</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Those who already have a strategy and want to remove the emotional factor</li>
            <li>Long-term investors who want to automate regular purchases (DCA)</li>
            <li>Experienced traders who want to trade 24/7</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Who it's not for</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Those looking for a "magic button" that makes money on its own</li>
            <li>Beginners without understanding of basic trading principles</li>
            <li>Those not willing to monitor the bot regularly</li>
          </ul>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-6">
        <p className="font-bold text-orange-800 mb-2">Main thesis</p>
        <p className="text-orange-700">Automation complements humans — but doesn't replace them. The most successful traders use bots as a tool, keeping strategic decisions and risk control in their own hands.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Link href="/en/trading-bots/dca" className="p-4 bg-white border rounded-lg hover:shadow">DCA strategy</Link>
        <Link href="/en/trading-bots/grid" className="p-4 bg-white border rounded-lg hover:shadow">Grid bots</Link>
        <Link href="/en/trading-bots/strategies" className="p-4 bg-white border rounded-lg hover:shadow">Strategies</Link>
        <Link href="/en/trading-bots/platforms" className="p-4 bg-white border rounded-lg hover:shadow">Platforms</Link>
        <Link href="/en/trading-bots/risks" className="p-4 bg-white border rounded-lg hover:shadow">5 risks</Link>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <p className="font-bold text-orange-800 mb-2">Try the simulator</p>
        <p className="text-orange-700 mb-4">Test automated strategies with no risk to real money.</p>
        <Link href="/en/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Open simulator →</Link>
      </div>
    </main>
  );
}
