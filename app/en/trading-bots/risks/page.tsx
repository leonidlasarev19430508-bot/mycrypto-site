import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '5 risks of trading bots | CryptoNavigator',
  description: 'Five risks of trading bots: curve fitting, fees, API security, macro events, false sense of security.',
  alternates: { canonical: 'https://cryptotop.chat/en/trading-bots/risks' },
};

export default function RisksPageEn() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">5 risks of trading bots that marketers won't tell you</h1>
      <p className="text-gray-700 mb-4">Here we break down the main risks: curve fitting, fees, API security, blindness to macro events, and false sense of security.</p>
      <ul className="list-disc pl-5 space-y-2 mb-6">
        <li><strong>Curve fitting:</strong> the bot is tuned to historical data and looks perfect on backtest. On real market — failure.</li>
        <li><strong>Fees:</strong> frequent trades eat profit. 20 trades per day × $100 volume = $2/day at 0.1% fee.</li>
        <li><strong>API security:</strong> keys on hosting — target for hacks. Use keys without withdrawal rights.</li>
        <li><strong>Macro blindness:</strong> bot trades regardless of news, sanctions, crises.</li>
        <li><strong>False security:</strong> when bot "works," people often stop monitoring.</li>
      </ul>

      <div className="space-y-6 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Risk 1: Curve fitting</h2>
          <p className="text-gray-700">The strategy is tuned to historical data and looks perfect on backtest. On real market — failure. Markets constantly change, and what worked in 2021 may be ineffective in 2024.</p>
          <p className="text-gray-700">How to protect: test on data that wasn't used for tuning.</p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Risk 2: Fees</h2>
          <p className="text-gray-700">A grid bot makes dozens of trades per day. Each trade = a fee.</p>
          <p className="text-gray-700">On $500 capital, 0.1% fee can amount to up to 12% per month.</p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Risk 3: API security</h2>
          <p className="text-gray-700">An API key is your password to the account. If the platform is hacked or service is fraudulent — attackers get trading access.</p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Trading rights only, no withdrawal</li>
            <li>Don't give key to unknown services</li>
            <li>Update keys regularly</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Risk 4: Macro blindness</h2>
          <p className="text-gray-700">The bot doesn't read news. It trades by algorithm regardless of what happens in the world.</p>
          <p className="text-gray-700">If COVID happens, sanctions or exchange collapse — bot may keep following old rules.</p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Risk 5: False sense of security</h2>
          <p className="text-gray-700">A person sees the bot "working" and stops monitoring. Market makes a sharp move, and the owner discovers losses too late.</p>
          <p className="text-gray-700">How to protect: balance alerts, check bot daily, and be ready to stop it.</p>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-6">
        <p className="font-bold text-orange-800 mb-2">Conclusion</p>
        <p className="text-orange-700">A bot is a strategy amplifier. Good strategy + bot = better good strategy. Bad strategy + bot = better bad strategy.</p>
        <p className="text-orange-700 mt-2">Automation complements humans. But doesn't replace them.</p>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <p className="font-bold text-orange-800 mb-2">Test your strategy in the simulator</p>
        <Link href="/en/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Open simulator →</Link>
      </div>
    </main>
  );
}
