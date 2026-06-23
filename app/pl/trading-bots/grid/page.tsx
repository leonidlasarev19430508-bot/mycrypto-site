import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grid bot — zysk z zmienności | CryptoNavigator',
  description: 'Jak działają grid boty, kiedy działają i jakie są ryzyka.',
  alternates: { canonical: 'https://cryptotop.chat/pl/trading-bots/grid' },
};

export default function GridPagePl() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Grid bot: zysk z zmienności — i jego granice</h1>
      <p className="text-gray-700">Działanie i ryzyka.</p>
    </main>
  );
}
