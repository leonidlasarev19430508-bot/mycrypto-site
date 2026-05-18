import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Krypto Börsen Boni 2026 | CryptoNavigator',
  description: 'Vergleiche Registrierungsboni auf Binance, Bybit, OKX, WhiteBIT. Bis zu $600 für Ihre erste Registrierung. Aktuelle Promo-Codes und Empfehlungslinks.',
  alternates: { canonical: 'https://cryptotop.chat/de/bonuses' },
  openGraph: {
    title: 'Krypto Börsen Boni 2026',
    description: 'Bis zu $600 Boni für die Registrierung bei Top-Kryptobörsen.',
    url: 'https://cryptotop.chat/de/bonuses',
  },
};

const EXCHANGES = [
  {
    name: 'Binance',
    logo: '🟡',
    bonus: 'Bis zu $600 USDT',
    bonusDetails: 'Bonus für Registrierung + Verifizierung + erste Einzahlung',
    conditions: ['KYC-Verifizierung', 'Erste Einzahlung ab $50', 'Handelsvolumen ab $100'],
    fee: '0.1%',
    feeDiscount: '-25% mit BNB',
    rating: 4.8,
    badge: '🏆 Beste Wahl',
    badgeColor: 'bg-yellow-500',
    affiliate: 'https://www.binance.com/register?ref=GRO_28502_BIO0R',
    pros: ['Höchste Liquidität', 'Niedrigste Gebühren', '350+ Coins', 'Deutsche Oberfläche'],
    color: 'border-yellow-400',
  },
  {
    name: 'WhiteBIT',
    logo: '⚪',
    bonus: 'Bis zu $150 USDT',
    bonusDetails: 'Empfehlungsbonus + Einzahlungsbonus',
    conditions: ['Registrierung über Link', 'Verifizierung', 'Einzahlung ab $10'],
    fee: '0.1%',
    feeDiscount: 'VIP-Rabatte verfügbar',
    rating: 4.4,
    badge: '🇺🇦 Ukrainische Börse',
    badgeColor: 'bg-blue-500',
    affiliate: 'https://whitebit.com/referral/54626c3b-5240-4d39-9784-8e3eda5736de',
    pros: ['Ukrainische Börse', 'Einfache Oberfläche', 'Schnelle Verifizierung', 'Niedrige Gebühren'],
    color: 'border-blue-400',
  },
  {
    name: 'Bybit',
    logo: '🔵',
    bonus: 'Bis zu $30,000 USDT',
    bonusDetails: 'Willkommensbonus-Paket für neue Trader',
    conditions: ['Registrierung über Link', 'Einzahlung ab $100', 'Futures-Handel'],
    fee: '0.1%',
    feeDiscount: '0.02% für Maker',
    rating: 4.6,
    badge: '⚡ Für Trader',
    badgeColor: 'bg-blue-600',
    affiliate: 'https://www.bybit.com/register?ref=CRYPTONAV',
    pros: ['Große Boni', 'Hebel bis 100x', 'Copy Trading', 'Hohe Liquidität'],
    color: 'border-blue-300',
  },
  {
    name: 'OKX',
    logo: '⚫',
    bonus: 'Mystery Box $10,000',
    bonusDetails: 'Mystery Box mit der Chance, bis zu $10,000 USDT zu gewinnen',
    conditions: ['Registrierung über Link', 'KYC-Verifizierung', 'Erste Einzahlung'],
    fee: '0.08%',
    feeDiscount: 'Niedrigste auf dem Markt',
    rating: 4.5,
    badge: '🌐 Web3-Plattform',
    badgeColor: 'bg-gray-700',
    affiliate: 'https://www.okx.com/join/CRYPTONAV',
    pros: ['Niedrigste Gebühren', 'Web3-Wallet', 'Staking bis 20%', 'NFT-Marktplatz'],
    color: 'border-gray-400',
  },
];

export default function BonusesDEPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
          Aktuell — Mai 2026
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          🎁 Registrierungsboni
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Vergleiche Boni der Top-Börsen. Registriere dich über unsere Links und erhalte den maximalen Bonus.
        </p>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 mb-10 text-white text-center">
        <p className="text-sm font-semibold uppercase tracking-wide opacity-80 mb-1">Gesamtpotenzialbonus</p>
        <p className="text-5xl font-black mb-2">Bis zu $40,750</p>
        <p className="text-orange-100 text-sm">wenn du dich bei allen 4 Börsen registrierst</p>
      </div>

      <div className="space-y-6 mb-12">
        {EXCHANGES.map((ex) => (
          <div key={ex.name} className={`bg-white border-2 ${ex.color} rounded-2xl p-6 shadow-sm hover:shadow-md transition`}>
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{ex.logo}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-black text-gray-900">{ex.name}</h2>
                      <span className={`text-white text-xs font-bold px-2 py-0.5 rounded-full ${ex.badgeColor}`}>
                        {ex.badge}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(ex.rating) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                      ))}
                      <span className="text-xs text-gray-400 ml-1">{ex.rating}/5</span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                  <p className="text-xs text-green-600 font-semibold uppercase tracking-wide mb-1">Registrierungsbonus</p>
                  <p className="text-2xl font-black text-green-700">{ex.bonus}</p>
                  <p className="text-sm text-gray-600 mt-1">{ex.bonusDetails}</p>
                </div>
                <div className="grid grid-cols-2 gap-1.5 mb-4">
                  {ex.pros.map(pro => (
                    <div key={pro} className="flex items-center gap-1.5 text-sm text-gray-600">
                      <span className="text-green-500 font-bold">✓</span> {pro}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2">Bedingungen</p>
                  <div className="flex flex-wrap gap-2">
                    {ex.conditions.map(c => (
                      <span key={c} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:w-52 flex-shrink-0">
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-xs text-gray-400 mb-1">Spot-Gebühr</p>
                  <p className="text-xl font-black text-gray-900">{ex.fee}</p>
                  <p className="text-xs text-green-600 font-semibold">{ex.feeDiscount}</p>
                </div>
                <a href={ex.affiliate} target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl transition text-sm">
                  Bonus erhalten →
                </a>
                <p className="text-xs text-gray-400 text-center mt-2">Registrierung ist kostenlos</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">❓ FAQ</h2>
        <div className="space-y-4">
          {[
            { q: 'Kann ich mich bei mehreren Börsen registrieren?', a: 'Ja, du kannst dich gleichzeitig bei allen Börsen registrieren und bei jeder einen Bonus erhalten.' },
            { q: 'Ist KYC für den Bonus erforderlich?', a: 'Bei den meisten Börsen ist die KYC-Verifizierung für Abhebungen und den vollen Bonus erforderlich.' },
            { q: 'Wie lange dauert die Registrierung?', a: 'Die Registrierung dauert 5 Minuten. Verifizierung — von 30 Minuten bis 24 Stunden.' },
            { q: 'Sind die Boni wirklich kostenlos?', a: 'Ja, die Registrierung ist kostenlos. Einige Boni erfordern eine erste Einzahlung oder Handelsvolumen.' },
          ].map(({ q, a }) => (
            <div key={q} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <p className="font-semibold text-gray-900 mb-1">{q}</p>
              <p className="text-sm text-gray-500">{a}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-gray-400">
        * Bonusbeträge können sich ändern. Aktuelle Informationen auf den Börsen-Websites. Keine Finanzberatung.
      </p>
    </div>
  );
}
