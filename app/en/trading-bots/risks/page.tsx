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
      <h1 className="text-3xl font-black mb-4">5 risks of trading bots marketers don't tell you</h1>
      <p className="text-gray-700 mb-4">We cover curve fitting, fees, API security, blindness to macro events, and the false sense of security bots can create.</p>
      <ul className="list-disc pl-5 space-y-2 mb-6">
        <li><strong>Curve fitting:</strong> over-optimizing for past data that doesn't generalize.</li>
        <li><strong>Fees:</strong> frequent orders can eat profits.</li>
        <li><strong>API security:</strong> keys stored on hosts are targets for hacks.</li>
        <li><strong>Blindness to macro:</strong> bots don't read news or sanctions.</li>
        <li><strong>False sense of security:</strong> automation ≠ guaranteed returns.</li>
      </ul>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <p className="font-bold text-orange-800 mb-2">Test in simulator</p>
        <Link href="/en/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Open simulator →</Link>
      </div>
    </main>
  );
}
