import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plattformen für Trading-Bots 2025 | CryptoNavigator',
  description: 'Überblick über Plattformen: Binance, Bybit, 3Commas, Pionex und mehr.',
  alternates: { canonical: 'https://cryptotop.chat/de/trading-bots/platforms' },
};

export default function PlatformsPageDe() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Wo einen Trading-Bot starten: Plattform-Übersicht 2025</h1>
      <p className="text-gray-700">Kurzüberblick über beliebte Plattformen.</p>
    </main>
  );
}
