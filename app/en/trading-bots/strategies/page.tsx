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
      <p className="text-gray-700 mb-4">Honest answer to "which strategy should I put in a bot": there is no strategy that works always. There are strategies that work well under certain conditions — and fail under others.</p>

      <div className="space-y-6 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Basic strategies</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li><strong>DCA</strong> — regular fixed purchases. For: long-term investors. Works when: you have a long enough horizon. Warning: doesn't protect against prolonged bear markets.</li>
            <li><strong>HODLing</strong> — buy and hold. Important fact: most retail traders who trade actively show worse results than those who just bought BTC and held it.</li>
            <li><strong>Trend Following</strong> — trade with the trend. Problems: hard to identify trend start, easy to get false signals, fails in sideways markets.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Technical strategies</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li><strong>MA Crossover</strong> — moving average crossover. Buy when short MA crosses long MA from below. Problems: delayed signals, many false trades in sideways markets.</li>
            <li><strong>RSI Oversold/Overbought</strong> — buy at RSI &lt; 30, sell at RSI &gt; 70. Problems: in strong trends RSI stays in extremes for long, 30/70 are arbitrary.</li>
            <li><strong>Breakout Trading</strong> — trade on level breakouts. Problems: most breakouts are false, requires precise level identification.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Main warnings</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Backtest ≠ real results. Any strategy can be fitted to past data.</li>
            <li>No strategy works always.</li>
            <li>Risk management is more important than the strategy itself.</li>
            <li>Macro events override technical analysis.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">How to test safely</h2>
          <ol className="list-decimal pl-5 text-gray-700 space-y-1">
            <li>Theory — understand the strategy logic</li>
            <li>Simulator — test without real money</li>
            <li>Micro-test — minimal amount on live market</li>
            <li>Scaling — only after confirmation</li>
          </ol>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <p className="font-bold text-orange-800 mb-2">Reminder</p>
        <p className="text-orange-700 mb-4">Real market adds emotion and unpredictability. The simulator shows logic but doesn't replace control.</p>
        <Link href="/en/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Try simulator →</Link>
      </div>
    </main>
  );
}
