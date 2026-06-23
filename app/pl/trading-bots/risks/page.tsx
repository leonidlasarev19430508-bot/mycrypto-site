import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '5 ryzyk botów handlowych | CryptoNavigator',
  description: 'Pięć ryzyk botów: curve fitting, opłaty, bezpieczeństwo API, wydarzenia makro, fałszywe poczucie bezpieczeństwa.',
  alternates: { canonical: 'https://cryptotop.chat/pl/trading-bots/risks' },
};

export default function RisksPagePl() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">5 ryzyk botów handlowych, o których milczą marketerzy</h1>
      <ul className="list-disc pl-5 space-y-2 mb-6">
        <li><strong>Curve fitting:</strong> nadmierne dopasowanie do danych historycznych.</li>
        <li><strong>Opłaty:</strong> częste zlecenia mogą zjadać zyski.</li>
        <li><strong>API Security:</strong> klucze to cele dla hakerów.</li>
        <li><strong>Brak reakcji na makro:</strong> boty nie czytają newsów.</li>
        <li><strong>Fałszywe poczucie bezpieczeństwa:</strong> automatyzacja nie gwarantuje zysków.</li>
      </ul>
    </main>
  );
}
