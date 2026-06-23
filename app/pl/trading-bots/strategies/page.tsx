import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Strategie handlowe: analiza i rzeczywistość | CryptoNavigator',
  description: 'Przegląd strategii i ostrzeżenia dotyczące automatyzacji.',
  alternates: { canonical: 'https://cryptotop.chat/pl/trading-bots/strategies' },
};

export default function StrategiesPagePl() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Strategie handlowe: analiza, ostrzeżenia, rzeczywistość</h1>
      <p className="text-gray-700">Przegląd podstawowych strategii i uwagi.</p>
    </main>
  );
}
