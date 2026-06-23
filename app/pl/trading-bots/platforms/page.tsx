import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gdzie uruchomić bota: przegląd platform 2025 | CryptoNavigator',
  description: 'Przegląd platform: Binance, Bybit, 3Commas, Pionex i inne.',
  alternates: { canonical: 'https://cryptotop.chat/pl/trading-bots/platforms' },
};

export default function PlatformsPagePl() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Gdzie uruchomić bota: przegląd platform 2025</h1>
      <p className="text-gray-700">Krótki opis platform.</p>
    </main>
  );
}
