import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grid-Bots — Gewinn aus Volatilität | CryptoNavigator',
  description: 'Funktionsweise von Grid-Bots, Anwendungsfälle und Risiken.',
  alternates: { canonical: 'https://cryptotop.chat/de/trading-bots/grid' },
};

export default function GridPageDe() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Grid-Bot: Gewinn aus Volatilität — und seine Grenzen</h1>
      <p className="text-gray-700">Kurze Erklärung der Mechanik und Risiken.</p>
    </main>
  );
}
