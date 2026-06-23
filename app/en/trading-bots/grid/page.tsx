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
      <p className="text-gray-700 mb-4">Grid bots place orders above and below the price. They work well in range markets but suffer in strong trends.</p>
    </main>
  );
}
