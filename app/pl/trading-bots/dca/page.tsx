import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Strategia DCA — jak kupować bez stresu | CryptoNavigator',
  description: 'DCA wyjaśnione: przykłady, zalety i ograniczenia.',
  alternates: { canonical: 'https://cryptotop.chat/pl/trading-bots/dca' },
};

export default function DcaPagePl() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Strategia DCA: jak kupować bez stresu</h1>
      <p className="text-gray-700 mb-4">Przykład: kupowanie 100$ co tydzień przez rok.</p>
    </main>
  );
}
