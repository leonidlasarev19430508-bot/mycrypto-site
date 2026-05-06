import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Beste Krypto Börsen 2026 | Vergleich Binance, Bybit, OKX Deutschland',
  description: 'Vergleiche die besten Kryptobörsen in Deutschland. Binance, Bybit, OKX — niedrige Gebühren, schnelle Registrierung, sicherer Handel. Jetzt mit Bitcoin investieren!',
  keywords: 'krypto börse deutschland, bitcoin kaufen, binance deutschland, kryptowährung 2026, ethereum kaufen',
  openGraph: {
    title: 'Beste Krypto Börsen 2026 | Deutschland',
    description: 'Vergleiche Binance, Bybit und OKX. Finde die beste Börse für dich.',
    locale: 'de_DE',
  },
};

const EXCHANGES = [
  {
    name: 'Binance',
    id: 'binance',
    badge: 'Beliebteste Börse',
    description: 'Die größte Kryptobörse der Welt mit den niedrigsten Gebühren',
    features: ['Niedrige Gebühren 0.1%', 'Schnelle Registrierung', 'Deutsche Benutzeroberfläche', 'Über 350 Kryptowährungen'],
    affiliate: 'https://www.binance.com/register?ref=GRO_28502_BIO0R',
    color: 'border-yellow-400',
    badgeColor: 'bg-yellow-500',
    cta: 'Bei Binance registrieren',
  },
  {
    name: 'Bybit',
    id: 'bybit',
    badge: null,
    description: 'Ideal für aktive Trader mit fortgeschrittenen Werkzeugen',
    features: ['Hebel bis 100x', 'Hohe Liquidität', '24/7 Support', 'Copy Trading'],
    affiliate: 'https://www.bybit.com/register?ref=CRYPTONAV',
    color: 'border-gray-200',
    badgeColor: '',
    cta: 'Bei Bybit registrieren',
  },
  {
    name: 'OKX',
    id: 'okx',
    badge: '🇪🇺 EU reguliert',
    description: 'Moderne Plattform mit Web3 Integration und Staking',
    features: ['Web3 Wallet', 'Staking bis 20%', 'Niedrige Gebühren', 'NFT Marktplatz'],
    affiliate: 'https://www.okx.com/join/CRYPTONAV',
    color: 'border-blue-300',
    badgeColor: 'bg-blue-500',
    cta: 'Bei OKX registrieren',
  },
];

const FAQS = [
  {
    q: 'Wie kaufe ich Bitcoin in Deutschland?',
    a: 'Registriere dich bei Binance oder OKX, schließe die KYC-Verifizierung ab, zahle EUR per Banküberweisung oder Kreditkarte ein und kaufe BTC. Der gesamte Vorgang dauert etwa 15 Minuten.',
  },
  {
    q: 'Sind Kryptowährungen in Deutschland legal?',
    a: 'Ja, der Handel mit Kryptowährungen ist in Deutschland legal. Gewinne über 600€ pro Jahr unterliegen der Kapitalertragssteuer von 25% + Solidaritätszuschlag.',
  },
  {
    q: 'Welche Börse ist am besten für Anfänger?',
    a: 'Binance — wegen der einfachen Bedienung, niedrigen Gebühren und deutscher Sprachunterstützung. OKX ist gut für fortgeschrittene Nutzer mit Web3-Funktionen.',
  },
  {
    q: 'Wie viel muss ich mindestens investieren?',
    a: 'Du kannst bereits ab 10-20€ beginnen. Kryptowährungen sind teilbar, du musst also keinen ganzen Bitcoin kaufen.',
  },
];

export default function DEPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-yellow-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-yellow-500/20 text-yellow-300 text-sm px-4 py-1 rounded-full mb-4">
            🇩🇪 Deutsche Version
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            Beste Krypto Börsen<br />Deutschland 2026
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Vergleiche Binance, Bybit und OKX. Finde die ideale Börse für dich und starte noch heute mit Krypto.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <span>✓ Niedrige Gebühren</span>
            <span>✓ Schnelle Registrierung</span>
            <span>✓ Sicherer Handel</span>
            <span>✓ EUR Einzahlung</span>
          </div>
        </div>
      </section>

      {/* Börsen Vergleich */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Kryptobörsen Vergleich 2026
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

      {/* Bitcoin Rechner */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">💰 Wie viel hättest du mit Bitcoin verdient?</h2>
          <p className="text-gray-500 mb-6">Berechne, wie viel du heute hättest, wenn du BTC vor einem Jahr gekauft hättest</p>
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
            <p className="text-4xl font-black text-orange-600 mb-2">+340%</p>
            <p className="text-gray-600">Durchschnittliche Bitcoin-Rendite in den letzten 3 Jahren</p>
            <a
              href="https://www.binance.com/register?ref=GRO_28502_BIO0R"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
            >
              Bitcoin auf Binance kaufen →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">❓ Häufig gestellte Fragen</h2>
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
      <section className="bg-yellow-500 text-white py-12 px-6 text-center">
        <h2 className="text-3xl font-black mb-4">Jetzt mit Krypto starten!</h2>
        <p className="text-yellow-100 mb-6">Schließe dich Millionen von Investoren weltweit an</p>
        <a
          href="https://www.binance.com/register?ref=GRO_28502_BIO0R"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-yellow-600 font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition"
        >
          Kostenlos bei Binance registrieren →
        </a>
      </section>

      {/* Navigation */}
      <div className="text-center py-6 text-sm text-gray-400">
        <Link href="/" className="hover:text-gray-600">🇺🇦 Українська</Link>
        {' · '}
        <Link href="/pl" className="hover:text-gray-600">🇵🇱 Polski</Link>
      </div>

    </main>
  );
}
