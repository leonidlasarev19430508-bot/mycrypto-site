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
      <p className="text-gray-700 mb-4">Rynek kryptowalut rzadko porusza się liniowo. Nawet w silnym trendzie cena stale się zmienia — w górę i w dół, w górę i w dół. Grid bot został stworzony, aby zarabiać właśnie na tych wahaniach.</p>

      <div className="space-y-6 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Jak to działa</h2>
          <p className="text-gray-700">Grid bot rozmieszcza serię zleceń kupna i sprzedaży w równych odstępach w określonym przedziale cen. Zarabia na wahaniach — kupuje taniej, sprzedaje drożej i powtarza cykl.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <p className="font-semibold mb-2">Przykład</p>
          <p className="text-gray-700">BTC handluje się koło 60 000$. Ustawienie:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1 text-gray-700">
            <li>Zakres: od 55 000$ do 65 000$</li>
            <li>Liczba poziomów: 10</li>
            <li>Kapitał: 1 000$</li>
          </ul>
          <p className="text-gray-700 mt-3">Bot rozmieszcza zlecenia co 1 000$. Ilekroć cena przecina poziom — transakcja i mały zysk. Cykl powtarza się, gdy cena pozostaje w przedziale.</p>
        </div>

        <div className="mb-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <svg viewBox="0 0 600 260" className="w-full h-auto" aria-label="Diagram grid bota">
              <defs>
                <linearGradient id="gridBgPl" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fef3c7" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="600" height="260" fill="url(#gridBgPl)" />
              <g stroke="#9ca3af" strokeWidth="1">
                <line x1="60" y1="40" x2="540" y2="40" />
                <line x1="60" y1="90" x2="540" y2="90" />
                <line x1="60" y1="140" x2="540" y2="140" />
                <line x1="60" y1="190" x2="540" y2="190" />
                <line x1="60" y1="240" x2="540" y2="240" />
              </g>
              <text x="60" y="32" fill="#111827" fontSize="13" fontWeight="600">Górny limit</text>
              <text x="60" y="248" fill="#111827" fontSize="13" fontWeight="600">Dolny limit</text>
              <text x="310" y="180" fill="#111827" fontSize="13" fontWeight="600">Aktualna cena</text>
              <circle cx="310" cy="180" r="7" fill="#f43f5e" />
              <path d="M80 230 L120 170 L180 190 L240 150 L300 160 L360 120 L420 140 L480 100 L520 130" fill="none" stroke="#2563eb" strokeWidth="3" />
              <g fill="#16a34a">
                <text x="74" y="254" fontSize="12">Kupuj</text>
                <circle cx="80" cy="230" r="5" />
                <text x="234" y="174" fontSize="12">Kupuj</text>
                <circle cx="240" cy="150" r="5" />
              </g>
              <g fill="#ef4444">
                <text x="178" y="184" fontSize="12">Sprzedaj</text>
                <circle cx="180" cy="190" r="5" />
                <text x="410" y="124" fontSize="12">Sprzedaj</text>
                <circle cx="420" cy="140" r="5" />
              </g>
            </svg>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Działa dobrze gdy</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Rynek boczny z umiarkowaną zmiennością</li>
            <li>Aktywo handluje w jasnym przedziale</li>
            <li>Niskie opłaty giełdy</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Kiedy zawodzi</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Silny trend spadkowy — bot kupuje na całym przedziale i trzyma straty</li>
            <li>Silny trend wzrostowy — bot sprzedaje zbyt wcześnie i traci zyski</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Zasady bezpieczeństwa</h2>
          <ol className="list-decimal pl-5 text-gray-700 space-y-1">
            <li>Nigdy nie przydzielaj całego kapitału grid botowi</li>
            <li>Zawsze ustawiaj dolny stop-loss</li>
            <li>Wybieraj aktywa o wystarczającej płynności</li>
            <li>Regularnie sprawdzaj, czy cena jest w przedziale</li>
            <li>Bądź gotów zatrzymać bota jeśli zmienią się warunki</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
