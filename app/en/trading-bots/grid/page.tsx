import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grid bots — profit from volatility | CryptoNavigator',
  description: 'How grid bots work, when they succeed and when they fail. Risks and practical notes.',
  alternates: { canonical: 'https://cryptotop.chat/en/trading-bots/grid' },
};

export default function GridPageEn() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Grid bot: profiting from volatility — and its limits</h1>
      <p className="text-gray-700 mb-4">The crypto market rarely moves in a straight line. Even in a strong trend, price constantly fluctuates — up and down, up and down. The grid bot is designed to profit from exactly these fluctuations.</p>

      <div className="space-y-6 mb-6">
        <div>
          <h2 className="font-semibold mb-2">How it works</h2>
          <p className="text-gray-700">A grid bot places a series of buy and sell orders at regular intervals within a defined price range. It profits from fluctuations — buys cheaper, sells more expensive, and repeats the cycle.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <p className="font-semibold mb-2">Example</p>
          <p className="text-gray-700">BTC is trading near $60,000. Setup:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1 text-gray-700">
            <li>Range: $55,000 to $65,000</li>
            <li>Number of levels: 10</li>
            <li>Capital: $1,000</li>
          </ul>
          <p className="text-gray-700 mt-3">The bot places orders every $1,000 price interval. Each time price crosses a level — a trade and small profit. The cycle continues as long as price stays in range.</p>
        </div>

        <div className="mb-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <svg viewBox="0 0 600 260" className="w-full h-auto" aria-label="Grid bot diagram">
              <defs>
                <linearGradient id="gridBgEn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fef3c7" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="600" height="260" fill="url(#gridBgEn)" />
              <g stroke="#9ca3af" strokeWidth="1">
                <line x1="60" y1="40" x2="540" y2="40" />
                <line x1="60" y1="90" x2="540" y2="90" />
                <line x1="60" y1="140" x2="540" y2="140" />
                <line x1="60" y1="190" x2="540" y2="190" />
                <line x1="60" y1="240" x2="540" y2="240" />
              </g>
              <text x="60" y="32" fill="#111827" fontSize="13" fontWeight="600">Upper bound</text>
              <text x="60" y="248" fill="#111827" fontSize="13" fontWeight="600">Lower bound</text>
              <text x="310" y="180" fill="#111827" fontSize="13" fontWeight="600">Current price</text>
              <circle cx="310" cy="180" r="7" fill="#f43f5e" />
              <path d="M80 230 L120 170 L180 190 L240 150 L300 160 L360 120 L420 140 L480 100 L520 130" fill="none" stroke="#2563eb" strokeWidth="3" />
              <g fill="#16a34a">
                <text x="74" y="254" fontSize="12">Buy</text>
                <circle cx="80" cy="230" r="5" />
                <text x="234" y="174" fontSize="12">Buy</text>
                <circle cx="240" cy="150" r="5" />
              </g>
              <g fill="#ef4444">
                <text x="178" y="184" fontSize="12">Sell</text>
                <circle cx="180" cy="190" r="5" />
                <text x="410" y="124" fontSize="12">Sell</text>
                <circle cx="420" cy="140" r="5" />
              </g>
            </svg>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Works well when</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Sideways market with moderate volatility</li>
            <li>Asset trades in a clear range</li>
            <li>Low exchange fees</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">When it fails</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Strong downtrend — bot buys across the entire range and holds losing positions</li>
            <li>Strong uptrend — bot sells too early and misses further gains</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Safety rules</h2>
          <ol className="list-decimal pl-5 text-gray-700 space-y-1">
            <li>Never allocate your entire capital to a grid bot</li>
            <li>Always set a lower stop-loss</li>
            <li>Choose assets with sufficient liquidity</li>
            <li>Regularly check if price is in range</li>
            <li>Be ready to stop the bot if conditions change</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
