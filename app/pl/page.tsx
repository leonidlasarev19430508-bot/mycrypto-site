import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Najlepsze Giełdy Kryptowalut 2026 | Porównanie Binance, Bybit, OKX',
  description: 'Porównaj najlepsze giełdy kryptowalut w Polsce. Binance, Bybit, OKX — niskie prowizje, szybka rejestracja, bezpieczny handel. Zacznij inwestować w krypto już dziś!',
  keywords: 'giełda kryptowalut, bitcoin polska, binance polska, kryptowaluty 2026, jak kupić bitcoin',
  openGraph: {
    title: 'Najlepsze Giełdy Kryptowalut 2026',
    description: 'Porównaj Binance, Bybit i OKX. Znajdź najlepszą giełdę dla siebie.',
    locale: 'pl_PL',
  },
};

const EXCHANGES = [
  {
    name: 'Binance',
    id: 'binance',
    badge: 'Najpopularniejsza',
    description: 'Największa giełda na świecie z najniższymi prowizjami',
    features: ['Niskie prowizje 0.1%', 'Szybka rejestracja', 'Polska obsługa klienta', 'Ponad 350 kryptowalut'],
    affiliate: 'https://www.binance.com/register?ref=GRO_28502_BIO0R',
    color: 'border-yellow-400',
    badgeColor: 'bg-yellow-500',
    cta: 'Zarejestruj się na Binance',
  },
  {
    name: 'Bybit',
    id: 'bybit',
    badge: null,
    description: 'Idealna dla aktywnych traderów z zaawansowanymi narzędziami',
    features: ['Dźwignia do 100x', 'Wysoka płynność', 'Wsparcie 24/7', 'Kopia handlu'],
    affiliate: 'https://www.bybit.com/register?ref=CRYPTONAV',
    color: 'border-gray-200',
    badgeColor: '',
    cta: 'Zarejestruj się na Bybit',
  },
  {
    name: 'WhiteBIT',
    id: 'whitebit',
    badge: '🇵🇱 Popularna w PL',
    description: 'Europejska giełda z weryfikacją i wypłatami w PLN',
    features: ['Wypłaty w PLN', 'Europejskie prawo', 'Prosta obsługa', 'Niskie prowizje'],
    affiliate: 'https://whitebit.com/referral/54626c3b-5240-4d39-9784-8e3eda5736de',
    color: 'border-blue-300',
    badgeColor: 'bg-blue-500',
    cta: 'Zarejestruj się na WhiteBIT',
  },
];

const FAQS = [
  {
    q: 'Jak kupić Bitcoin w Polsce?',
    a: 'Zarejestruj się na Binance lub WhiteBIT, przejdź weryfikację KYC, wpłać PLN przelewem lub kartą i kup BTC. Cały proces zajmuje około 15 minut.',
  },
  {
    q: 'Czy kryptowaluty są legalne w Polsce?',
    a: 'Tak, handel kryptowalutami jest legalny w Polsce. Zyski podlegają opodatkowaniu 19% podatkiem od zysków kapitałowych.',
  },
  {
    q: 'Która giełda jest najlepsza dla początkujących?',
    a: 'Binance — ze względu na prostą obsługę, niskie prowizje i dostępność po polsku. WhiteBIT jest dobry ze względu na możliwość wypłaty w PLN.',
  },
  {
    q: 'Ile trzeba zainwestować na początku?',
    a: 'Można zacząć już od 50-100 PLN. Kryptowaluty są podzielne, więc nie trzeba kupować całego Bitcoina.',
  },
];

export default function PLPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-blue-500/20 text-blue-300 text-sm px-4 py-1 rounded-full mb-4">
            🇵🇱 Polska wersja
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            Najlepsze Giełdy<br />Kryptowalut 2026
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Porównaj Binance, Bybit i WhiteBIT. Znajdź giełdę idealną dla siebie i zacznij zarabiać na krypto.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <span>✓ Niskie prowizje</span>
            <span>✓ Szybka rejestracja</span>
            <span>✓ Bezpieczny handel</span>
            <span>✓ Wsparcie po polsku</span>
          </div>
        </div>
      </section>

      {/* Giełdy */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Porównanie Giełd Kryptowalut
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EXCHANGES.map((ex) => (
            <div
              key={ex.id}
              className={`bg-white rounded-2xl border-2 ${ex.color} p-6 shadow-sm hover:shadow-md transition relative`}
            >
              {ex.badge && (
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 ${ex.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap`}>
                  {ex.badge}
                </span>
              )}
              <h3 className="text-xl font-bold mb-2">{ex.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{ex.description}</p>
              <ul className="space-y-2 mb-6">
                {ex.features.map((f) => (
                  <li key={f} className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="text-green-500 font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href={ex.affiliate}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-orange-500 hover:bg-orange-600 text-white text-center font-semibold py-2.5 px-4 rounded-xl transition"
              >
                {ex.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Kalkulator Bitcoin */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">💰 Ile byś zarobił na Bitcoin?</h2>
          <p className="text-gray-500 mb-6">Sprawdź, ile byś dziś miał, gdybyś kupił BTC rok temu</p>
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
            <p className="text-4xl font-black text-orange-600 mb-2">+340%</p>
            <p className="text-gray-600">Średni zwrot z Bitcoin w ciągu ostatnich 3 lat</p>
            <a
              href="https://www.binance.com/register?ref=GRO_28502_BIO0R"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
            >
              Kup Bitcoin na Binance →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">❓ Często zadawane pytania</h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-12 px-6 text-center">
        <h2 className="text-3xl font-black mb-4">Zacznij inwestować już dziś!</h2>
        <p className="text-blue-200 mb-6">Dołącz do milionów inwestorów na całym świecie</p>
        <a
          href="https://www.binance.com/register?ref=GRO_28502_BIO0R"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition"
        >
          Zarejestruj się za darmo na Binance →
        </a>
      </section>

      {/* Nawigacja */}
      <div className="text-center py-6 text-sm text-gray-400">
        <Link href="/" className="hover:text-gray-600">🇺🇦 Українська</Link>
        {' · '}
        <Link href="/de" className="hover:text-gray-600">🇩🇪 Deutsch</Link>
      </div>

    </main>
  );
}
