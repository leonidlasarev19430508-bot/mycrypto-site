import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '5 Risiken von Trading-Bots | CryptoNavigator',
  description: 'Fünf Risiken von Trading-Bots: curve fitting, Gebühren, API-Sicherheit, makroökonomische Ereignisse, falsches Sicherheitsgefühl.',
  alternates: { canonical: 'https://cryptotop.chat/de/trading-bots/risks' },
};

export default function RisksPageDe() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">5 Risiken von Trading-Bots, die Vermarkter verschweigen</h1>
      <ul className="list-disc pl-5 space-y-2 mb-6">
        <li><strong>Curve fitting:</strong> Überanpassung an historische Daten.</li>
        <li><strong>Gebühren:</strong> Häufige Orders verringern Profite.</li>
        <li><strong>API-Sicherheit:</strong> Keys sind Angriffsziele.</li>
        <li><strong>Blindheit gegenüber Makro:</strong> Bots lesen keine News.</li>
        <li><strong>Falsches Sicherheitsgefühl:</strong> Automatisierung ≠ garantierte Renditen.</li>
      </ul>
    </main>
  );
}
