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
      <p className="text-gray-700 mb-4">Imagine two investors. The first waits for the "right moment" — studies charts, reads news, tries to buy at the bottom. The second simply buys $100 of Bitcoin every week — regardless of price, regardless of news.</p>
      <p className="text-gray-700 mb-4">Statistically, the second investor often shows better results. Not because they're smarter. But because they removed the most dangerous element of trading — emotional decisions. This is DCA — Dollar-Cost Averaging, or value averaging.</p>

      <div className="space-y-4 mb-6">
        <div>
          <h2 className="font-semibold mb-2">How DCA works</h2>
          <p className="text-gray-700">The essence of the strategy: you buy a fixed amount of an asset at regular intervals. Daily, weekly, or monthly — regardless of current price. When price is high — the same amount buys fewer coins. When price is low — you buy more coins. The result: your average entry price smooths out automatically.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <p className="font-semibold mb-2">Example with numbers</p>
          <p className="text-gray-700 leading-7">You buy $200 of BTC weekly for 5 weeks:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1 text-gray-700">
            <li>Week 1: price $60,000 → you get 0.00333 BTC</li>
            <li>Week 2: price $50,000 → you get 0.00400 BTC</li>
            <li>Week 3: price $45,000 → you get 0.00444 BTC</li>
            <li>Week 4: price $52,000 → you get 0.00385 BTC</li>
            <li>Week 5: price $58,000 → you get 0.00345 BTC</li>
          </ul>
          <p className="text-gray-700 mt-3">Total spent: $1,000. Total received: 0.01907 BTC. Average entry price: ~$52,440.</p>
          <p className="text-gray-700 mt-2">If you'd bought all at once in week 1 — your average would be $60,000. DCA gave you a better average price without any "market timing guessing."</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <svg viewBox="0 0 600 260" className="w-full h-auto" aria-label="DCA chart diagram">
            <defs>
              <linearGradient id="priceGradientEn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path d="M40 200 C120 170 180 190 240 150 C300 110 360 140 420 120 C480 100 540 130 560 90" fill="none" stroke="#3b82f6" strokeWidth="4" />
            <circle cx="70" cy="190" r="8" fill="#fb923c" />
            <circle cx="190" cy="180" r="8" fill="#fb923c" />
            <circle cx="310" cy="145" r="8" fill="#fb923c" />
            <circle cx="430" cy="125" r="8" fill="#fb923c" />
            <circle cx="540" cy="95" r="8" fill="#fb923c" />
            <line x1="40" y1="170" x2="560" y2="170" stroke="#16a34a" strokeWidth="3" strokeDasharray="8 6" />
            <text x="560" y="62" fill="#1f2937" fontSize="14" textAnchor="end">Price</text>
            <text x="560" y="82" fill="#1f2937" fontSize="14" textAnchor="end">Your purchases</text>
            <text x="560" y="102" fill="#1f2937" fontSize="14" textAnchor="end">Average price</text>
            <path d="M40 170 H560" stroke="#16a34a" strokeWidth="3" />
          </svg>
        </div>
      </div>

      <div className="space-y-6 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Advantages</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Psychological comfort — no need to worry about timing the "right moment"</li>
            <li>Protection from timing mistakes — even experienced traders get entry points wrong</li>
            <li>Discipline over emotion — the bot buys on schedule even when everyone around is panicking</li>
            <li>Simplicity — no need to analyze charts daily</li>
            <li>For busy people — 10 minutes to set up and your strategy runs for months</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Limitations and risks</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>In a strong bull market, DCA may underperform a single large purchase</li>
            <li>Doesn't protect against prolonged bear markets</li>
            <li>Requires time — DCA is a long-term strategy</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Who it's for</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Long-term investors (1-3+ years)</li>
            <li>People with regular income who want to accumulate</li>
            <li>Those who don't want to spend time analyzing daily</li>
            <li>Beginners just starting out</li>
          </ul>
        </div>
      </div>

      <p className="mb-4">Binance and Bybit have built-in DCA bots for free. Just specify the amount, asset, and purchase frequency.</p>
      <p className="mb-4">Platforms: <a href="https://www.binance.com/en/register?ref=Q5HR1JVW" rel="sponsored noopener noreferrer" className="text-orange-600">Binance</a>, <a href="https://www.bybit.com/register?ref=CRYPTONAV" rel="sponsored noopener noreferrer" className="text-orange-600">Bybit</a>.</p>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <p className="font-bold text-orange-800 mb-2">Practice DCA in the simulator</p>
        <Link href="/en/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Open simulator →</Link>
      </div>
    </main>
  );
}
