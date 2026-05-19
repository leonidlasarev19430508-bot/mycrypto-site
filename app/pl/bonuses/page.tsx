import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bonusy Giełd Kryptowalut 2026 | CryptoNavigator',
  description: 'Porównaj bonusy rejestracyjne na Binance, Bybit, OKX, WhiteBIT. Do $600 za pierwszą rejestrację. Aktualne kody promocyjne i linki referalne.',
  alternates: { canonical: 'https://cryptotop.chat/pl/bonuses' },
  openGraph: {
    title: 'Bonusy Giełd Kryptowalut 2026',
    description: 'Do $600 bonusów za rejestrację na topowych giełdach kryptowalut.',
    url: 'https://cryptotop.chat/pl/bonuses',
  },
};

const EXCHANGES = [
  {
    name: 'Binance',
    logo: '🟡',
    bonus: 'Do $600 USDT',
    bonusDetails: 'Bonus za rejestrację + weryfikację + pierwszy depozyt',
    conditions: ['Weryfikacja KYC', 'Pierwszy depozyt od $50', 'Wolumen handlowy od $100'],
    fee: '0.1%',
    feeDiscount: '-25% z BNB',
    rating: 4.8,
    badge: '🏆 Najlepszy wybór',
    badgeColor: 'bg-yellow-500',
    affiliate: 'https://www.binance.com/register?ref=GRO_28502_BIO0R',
    pros: ['Największa płynność', 'Najniższe opłaty', '350+ monet', 'Wsparcie po polsku'],
    color: 'border-yellow-400',
  },
  {
    name: 'WhiteBIT',
    logo: '⚪',
    bonus: 'Do $150 USDT',
    bonusDetails: 'Bonus referalny + bonus za depozyt',
    conditions: ['Rejestracja przez link', 'Weryfikacja', 'Depozyt od $10'],
    fee: '0.1%',
    feeDiscount: 'Zniżki VIP dostępne',
    rating: 4.4,
    badge: '🇺🇦 Ukraińska giełda',
    badgeColor: 'bg-blue-500',
    affiliate: 'https://whitebit.com/referral/54626c3b-5240-4d39-9784-8e3eda5736de',
    pros: ['Ukraińska giełda', 'Prosty interfejs', 'Szybka weryfikacja', 'Niskie opłaty'],
    color: 'border-blue-400',
  },
  {
    name: 'Bybit',
    logo: '🔵',
    bonus: 'Do $30,000 USDT',
    bonusDetails: 'Pakiet bonusów powitalnych dla nowych traderów',
    conditions: ['Rejestracja przez link', 'Depozyt od $100', 'Handel kontraktami'],
    fee: '0.1%',
    feeDiscount: '0.02% dla makerów',
    rating: 4.6,
    badge: '⚡ Dla traderów',
    badgeColor: 'bg-blue-600',
    affiliate: 'https://www.bybit.com/register?ref=CRYPTONAV',
    pros: ['Duże bonusy', 'Dźwignia do 100x', 'Copy trading', 'Wysoka płynność'],
    color: 'border-blue-300',
  },
  {
    name: 'OKX',
    logo: '⚫',
    bonus: 'Mystery Box $10,000',
    bonusDetails: 'Mystery Box z szansą wygrania do $10,000 USDT',
    conditions: ['Rejestracja przez link', 'Weryfikacja KYC', 'Pierwszy depozyt'],
    fee: '0.08%',
    feeDiscount: 'Najniższe na rynku',
    rating: 4.5,
    badge: '🌐 Platforma Web3',
    badgeColor: 'bg-gray-700',
    affiliate: 'https://www.okx.com/join/CRYPTONAV',
    pros: ['Najniższe opłaty', 'Portfel Web3', 'Staking do 20%', 'Marketplace NFT'],
    color: 'border-gray-400',
  },
];

export default function BonusesPLPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
          Aktualne — Maj 2026
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          🎁 Bonusy za Rejestrację
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Porównaj bonusy topowych giełd. Zarejestruj się przez nasze linki i uzyskaj maksymalny bonus.
        </p>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 mb-10 text-white text-center">
        <p className="text-sm font-semibold uppercase tracking-wide opacity-80 mb-1">Łączny potencjalny bonus</p>
        <p className="text-5xl font-black mb-2">Do $40,750</p>
        <p className="text-orange-100 text-sm">jeśli zarejestrujesz się na wszystkich 4 giełdach</p>
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
                  <p className="text-xs text-green-600 font-semibold uppercase tracking-wide mb-1">Bonus za rejestrację</p>
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
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2">Warunki</p>
                  <div className="flex flex-wrap gap-2">
                    {ex.conditions.map(c => (
                      <span key={c} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:w-52 flex-shrink-0">
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-xs text-gray-400 mb-1">Opłata spot</p>
                  <p className="text-xl font-black text-gray-900">{ex.fee}</p>
                  <p className="text-xs text-green-600 font-semibold">{ex.feeDiscount}</p>
                </div>
                <a href={ex.affiliate} target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl transition text-sm">
                  Odbierz Bonus →
                </a>
                <p className="text-xs text-gray-400 text-center mt-2">Rejestracja jest bezpłatna</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">❓ FAQ</h2>
        <div className="space-y-4">
          {[
            { q: 'Czy mogę zarejestrować się na kilku giełdach?', a: 'Tak, możesz zarejestrować się na wszystkich giełdach jednocześnie i otrzymać bonus na każdej.' },
            { q: 'Czy KYC jest wymagane do bonusu?', a: 'Na większości giełd weryfikacja KYC jest wymagana do wypłaty środków i otrzymania pełnego bonusu.' },
            { q: 'Jak długo trwa rejestracja?', a: 'Rejestracja zajmuje 5 minut. Weryfikacja — od 30 minut do 24 godzin.' },
            { q: 'Czy bonusy są naprawdę darmowe?', a: 'Tak, rejestracja jest bezpłatna. Niektóre bonusy wymagają pierwszego depozytu lub wolumenu handlowego.' },
          ].map(({ q, a }) => (
            <div key={q} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <p className="font-semibold text-gray-900 mb-1">{q}</p>
              <p className="text-sm text-gray-500">{a}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-gray-400">
        * Kwoty bonusów mogą się zmieniać. Aktualne informacje na stronach giełd. Nie jest to porada finansowa.
      </p>
    </div>
  );
}
