import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Strategia DCA — jak kupować bez stresu | CryptoNavigator',
  description: 'DCA wyjaśnione: przykłady, zalety i ograniczenia.',
  alternates: { canonical: 'https://cryptotop.chat/pl/trading-bots/dca' },
};

export default function DcaPagePl() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Strategia DCA: jak kupować krypto bez stresu</h1>
      <p className="text-gray-700 mb-4">Wyóbraż sobie dwóch inwestorów. Pierwszy czeka na "właściwy moment" — analizuje wykresy, czyta wiadomości, próbuje kupić na dnie. Drugi po prostu kupuje 100$ Bitcoiną co tydzień — niezależnie od ceny, niezależnie od wiadomości.</p>
      <p className="text-gray-700 mb-4">Statystycznie drugi inwestor częściej wykazuje lepsze wyniki. Nie dlatego, że jest mądrzejszy. Ale dlatego, że wyeliminował najbardziej niebezpieczny element handlu — decyzje emocjonalne. To właśnie DCA — Dollar-Cost Averaging, czyli ujednolicanie kosztu.</p>

      <div className="space-y-4 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Jak to działa</h2>
          <p className="text-gray-700">Istota strategii: kupujesz stałą ilość aktywu w regularnych odstępach czasu. Codziennie, co tydzień lub miesiącznie — niezależnie od bieżącej ceny. Gdy cena wysoka — na tę samą sumę kupujesz mniej monet. Gdy cena niska — kupujesz więcej monet. W rezultacie Twoja średnia cena wejścia automatycznie się wygładzaja.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <p className="font-semibold mb-2">Przykład z cyframi</p>
          <p className="text-gray-700 leading-7">Kupujesz 200$ BTC co tydzień przez 5 tygodni:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1 text-gray-700">
            <li>Tydzień 1: cena 60 000$ → otrzymujesz 0,00333 BTC</li>
            <li>Tydzień 2: cena 50 000$ → otrzymujesz 0,00400 BTC</li>
            <li>Tydzień 3: cena 45 000$ → otrzymujesz 0,00444 BTC</li>
            <li>Tydzień 4: cena 52 000$ → otrzymujesz 0,00385 BTC</li>
            <li>Tydzień 5: cena 58 000$ → otrzymujesz 0,00345 BTC</li>
          </ul>
          <p className="text-gray-700 mt-3">W sumie wydano: 1000$. W sumie otrzymano: 0,01907 BTC. Średnia cena wejścia: ~52 440$.</p>
          <p className="text-gray-700 mt-2">Gdyby kupił wszystko na raz w tygodniu 1 — średnia była by 60 000$. DCA dała lepszą średnią cenę bez żadnego "zgadywania rynku".</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <svg viewBox="0 0 600 260" className="w-full h-auto" aria-label="Diagram wykresu DCA">
            <defs>
              <linearGradient id="priceGradientPl" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path d="M40 200 C120 170 180 190 240 150 C300 110 360 140 420 120 C480 100 540 130 560 90" fill="none" stroke="#3b82f6" strokeWidth="4" />
            <circle cx="70" cy="190" r="8" fill="#fb923c" />
            <circle cx="190" cy="180" r="8" fill="#fb923c" />
            <circle cx="310" cy="145" r="8" fill="#fb923c" />
            <circle cx="430" cy="125" r="8" fill="#fb923c" />
            <circle cx="540" cy="95" r="8" fill="#fb923c" />
            <line x1="40" y1="170" x2="560" y2="170" stroke="#16a34a" strokeWidth="3" strokeDasharray="8 6" />
            <text x="560" y="62" fill="#1f2937" fontSize="14" textAnchor="end">Cena</text>
            <text x="560" y="82" fill="#1f2937" fontSize="14" textAnchor="end">Twoje zakupy</text>
            <text x="560" y="102" fill="#1f2937" fontSize="14" textAnchor="end">Średnia cena</text>
            <path d="M40 170 H560" stroke="#16a34a" strokeWidth="3" />
          </svg>
        </div>
      </div>

      <div className="space-y-6 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Zalety</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Komfort psychiczny — nie musisz przejmować się czy to "właściwy moment"</li>
            <li>Ochrona przed błędem timingu — nawet doświadczeni traderzy się mylają</li>
            <li>Dyscyplina zamiast emocji — bot kupuje według harmonogramu nawet gdy wszyscy wokół panikują</li>
            <li>Prostota — nie musisz analizować wykresów codziennie</li>
            <li>Dla zajętych — 10 minut na ustawienie i strategia pracuje miesięcami</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Ograniczenia i ryzyka</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Na silnym rynku w górę DCA może przegrywić jednorązowym zakupem</li>
            <li>Nie chroni przed długotrwałym rynkiem niedwiedzia</li>
            <li>Wymaga czasu — DCA to strategia długoterminowa</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Dla kogo to pasuje</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Inwestorzy długoterminowi (1-3+ lat)</li>
            <li>Osoby z regularnym dochodem, które chcą akumulować</li>
            <li>Ci, którzy nie chcą spedzać czasu na analizę codziennie</li>
            <li>Początkujący już zaczynają</li>
          </ul>
        </div>
      </div>

      <p className="mb-4">Binance i Bybit mają wbudowane DCA boty za darmo. Wystarczy podają kwotę, aktyw i częstotliwość zakupów.</p>
      <p className="mb-4">Platformy: <a href="https://www.binance.com/en/register?ref=Q5HR1JVW" rel="sponsored noopener noreferrer" className="text-orange-600">Binance</a>, <a href="https://www.bybit.com/register?ref=CRYPTONAV" rel="sponsored noopener noreferrer" className="text-orange-600">Bybit</a>.</p>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <p className="font-bold text-orange-800 mb-2">Wytrenuj DCA w symulatorze</p>
        <Link href="/pl/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Otwórz symulator →</Link>
      </div>
    </main>
  );
}
