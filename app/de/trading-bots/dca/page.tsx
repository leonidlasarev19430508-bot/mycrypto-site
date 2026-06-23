import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DCA-Strategie — Stressfrei kaufen | CryptoNavigator',
  description: 'DCA erklärt: regelmäßige Käufe, Vorteile und Grenzen.',
  alternates: { canonical: 'https://cryptotop.chat/de/trading-bots/dca' },
};

export default function DcaPageDe() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">DCA-Strategie: wie man stressfrei kauft</h1>
      <p className="text-gray-700">Beispiel: $100 wöchentlich für ein Jahr.</p>
    </main>
  );
}
