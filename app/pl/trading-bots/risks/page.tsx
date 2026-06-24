import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '5 ryzyk botów handlowych | CryptoNavigator',
  description: 'Pięć ryzyk botów: curve fitting, opłaty, bezpieczeństwo API, wydarzenia makro, fałszywe poczucie bezpieczeństwa.',
  alternates: { canonical: 'https://cryptotop.chat/pl/trading-bots/risks' },
};

export default function RisksPagePl() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">5 ryzyk botów handlowych, o których milczą marketerzy</h1>
      <p className="text-gray-700 mb-4">Analizujemy główne ryzyka: curve fitting, opłaty, bezpieczeństwo API, ślepotę na zdarzenia makro i fałszywe poczucie bezpieczeństwa.</p>
      <ul className="list-disc pl-5 space-y-2 mb-6">
        <li><strong>Curve fitting:</strong> bot jest dostrojony do danych historycznych i wygląda idealnie na backteście. Na rzeczywistym rynku — porażka.</li>
        <li><strong>Opłaty:</strong> częste transakcje jedzą zysk. 20 transakcji dziennie × 100$ obrotu = 2$ dziennie przy opłacie 0,1%.</li>
        <li><strong>Bezpieczeństwo API:</strong> klucze na hostingu — cel dla hakerów. Używaj kluczy bez praw do wypłaty.</li>
        <li><strong>Ślepota makro:</strong> bot handluje niezależnie od wiadomości, sankcji, kryzysów.</li>
        <li><strong>Fałszywe poczucie bezpieczeństwa:</strong> gdy bot "pracuje", ludzie przestają monitorować.</li>
      </ul>

      <div className="space-y-6 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Ryzyko 1: Curve fitting</h2>
          <p className="text-gray-700">Strategia jest dostrojona do danych historycznych i wygląda idealnie na backteście. Na rzeczywistym rynku — porażka. Rynek stale się zmienia, a to, co działało w 2021, może być nieskuteczne w 2024.</p>
          <p className="text-gray-700">Jak się chronić: testuj na danych, które nie były używane do dostrajania.</p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Ryzyko 2: Opłaty</h2>
          <p className="text-gray-700">Grid bot wykonuje dziesiątki transakcji dziennie. Każda transakcja — opłata.</p>
          <p className="text-gray-700">Na kapitale 500$ opłata 0,1% może stanowić do 12% miesięcznie.</p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Ryzyko 3: Bezpieczeństwo API</h2>
          <p className="text-gray-700">Klucz API to hasło dostępu do konta. Jeśli platforma zostanie zhakowana lub serwis jest oszukańczy — atakujący uzyskają dostęp do handlu.</p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Tylko prawa handlu, bez wypłaty</li>
            <li>Nie daj klucza nieznanym serwisów</li>
            <li>Regularnie aktualizuj klucze</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Ryzyko 4: Ślepota na makro</h2>
          <p className="text-gray-700">Bot nie czyta wiadomości. Handluje algorytmicznie niezależnie od tego, co dzieje się na świecie.</p>
          <p className="text-gray-700">Jeśli dojdzie do COVID, sankcji lub kryzysu giełdy — bot może dalej działać według starych reguł.</p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Ryzyko 5: Fałszywe poczucie bezpieczeństwa</h2>
          <p className="text-gray-700">Osoba widzi, że bot "pracuje" i przestaje monitorować. Rynek robi gwałtowny ruch, a właściciel dowiaduje się o stratach zbyt późno.</p>
          <p className="text-gray-700">Jak się chronić: alerty o bilansie, codzienne sprawdzanie bota i gotowość do jego zatrzymania.</p>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-6">
        <p className="font-bold text-orange-800 mb-2">Podsumowanie</p>
        <p className="text-orange-700">Bot to wzmacniacz strategii. Dobra strategia + bot = lepsza dobra strategia. Zła strategia + bot = lepsza zła strategia.</p>
        <p className="text-orange-700 mt-2">Automatyzacja uzupełnia człowieka. Ale go nie zastępuje.</p>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <p className="font-bold text-orange-800 mb-2">Przetestuj strategię w symulatorze</p>
        <Link href="/pl/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Otwórz symulator →</Link>
      </div>
    </main>
  );
}
