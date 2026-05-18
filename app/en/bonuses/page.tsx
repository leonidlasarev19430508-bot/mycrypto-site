import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crypto Exchange Bonuses 2026 | CryptoNavigator',
  description: 'Compare registration bonuses on Binance, Bybit, OKX, WhiteBIT. Up to $600 for your first registration. Current promo codes and referral links.',
  alternates: { canonical: 'https://cryptotop.chat/en/bonuses' },
  openGraph: {
    title: 'Crypto Exchange Bonuses 2026',
    description: 'Up to $600 in bonuses for registering on top crypto exchanges.',
    url: 'https://cryptotop.chat/en/bonuses',
  },
};

const EXCHANGES = [
  {
    name: 'Binance',
    logo: '🟡',
    bonus: 'Up to $600 USDT',
    bonusDetails: 'Bonus for registration + verification + first deposit',
    conditions: ['KYC Verification', 'First deposit from $50', 'Trading volume from $100'],
    fee: '0.1%',
    feeDiscount: '-25% with BNB',
    rating: 4.8,
    badge: '🏆 Best Choice',
    badgeColor: 'bg-yellow-500',
    affiliate: 'https://www.binance.com/register?ref=GRO_28502_BIO0R',
    pros: ['Highest liquidity', 'Lowest fees', '350+ coins', 'English support'],
    color: 'border-yellow-400',
  },
  {
    name: 'WhiteBIT',
    logo: '⚪',
    bonus: 'Up to $150 USDT',
    bonusDetails: 'Referral bonus + deposit bonus',
    conditions: ['Register via link', 'Verification', 'Deposit from $10'],
    fee: '0.1%',
    feeDiscount: 'VIP discounts available',
    rating: 4.4,
    badge: '🇺🇦 Ukrainian Exchange',
    badgeColor: 'bg-blue-500',
    affiliate: 'https://whitebit.com/referral/54626c3b-5240-4d39-9784-8e3eda5736de',
    pros: ['Ukrainian exchange', 'UAH support', 'Simple interface', 'Fast verification'],
    color: 'border-blue-400',
  },
  {
    name: 'Bybit',
    logo: '🔵',
    bonus: 'Up to $30,000 USDT',
    bonusDetails: 'Welcome bonus package for new traders',
    conditions: ['Register via link', 'Deposit from $100', 'Futures trading'],
    fee: '0.1%',
    feeDiscount: '0.02% for makers',
    rating: 4.6,
    badge: '⚡ For Traders',
    badgeColor: 'bg-blue-600',
    affiliate: 'https://www.bybit.com/register?ref=CRYPTONAV',
    pros: ['Large bonuses', 'Up to 100x leverage', 'Copy trading', 'High liquidity'],
    color: 'border-blue-300',
  },
  {
    name: 'OKX',
    logo: '⚫',
    bonus: 'Mystery Box $10,000',
    bonusDetails: 'Mystery Box with a chance to win up to $10,000 USDT',
    conditions: ['Register via link', 'KYC Verification', 'First deposit'],
    fee: '0.08%',
    feeDiscount: 'Lowest on the market',
    rating: 4.5,
    badge: '🌐 Web3 Platform',
    badgeColor: 'bg-gray-700',
    affiliate: 'https://www.okx.com/join/CRYPTONAV',
    pros: ['Lowest fees', 'Web3 wallet', 'Staking up to 20%', 'NFT marketplace'],
    color: 'border-gray-400',
  },
];

export default function BonusesENPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
          Updated — May 2026
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          🎁 Registration Bonuses
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Compare bonuses from top exchanges. Register via our links and get the maximum bonus.
        </p>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 mb-10 text-white text-center">
        <p className="text-sm font-semibold uppercase tracking-wide opacity-80 mb-1">Total potential bonus</p>
        <p className="text-5xl font-black mb-2">Up to $40,750</p>
        <p className="text-orange-100 text-sm">if you register on all 4 exchanges</p>
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
                  <p className="text-xs text-green-600 font-semibold uppercase tracking-wide mb-1">Registration Bonus</p>
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
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2">Conditions</p>
                  <div className="flex flex-wrap gap-2">
                    {ex.conditions.map(c => (
                      <span key={c} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:w-52 flex-shrink-0">
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-xs text-gray-400 mb-1">Spot fee</p>
                  <p className="text-xl font-black text-gray-900">{ex.fee}</p>
                  <p className="text-xs text-green-600 font-semibold">{ex.feeDiscount}</p>
                </div>
                <a href={ex.affiliate} target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl transition text-sm">
                  Get Bonus →
                </a>
                <p className="text-xs text-gray-400 text-center mt-2">Registration is free</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">❓ FAQ</h2>
        <div className="space-y-4">
          {[
            { q: 'Can I register on multiple exchanges?', a: 'Yes, you can register on all exchanges simultaneously and get a bonus on each one.' },
            { q: 'Is KYC required for the bonus?', a: 'On most exchanges, KYC verification is required to withdraw funds and receive the full bonus.' },
            { q: 'How long does registration take?', a: 'Registration takes 5 minutes. Verification — from 30 minutes to 24 hours.' },
            { q: 'Are the bonuses really free?', a: 'Yes, registration is free. Some bonuses require a first deposit or trading volume.' },
          ].map(({ q, a }) => (
            <div key={q} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <p className="font-semibold text-gray-900 mb-1">{q}</p>
              <p className="text-sm text-gray-500">{a}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-gray-400">
        * Bonus amounts may change. Current information on exchange websites. Not financial advice.
      </p>
    </div>
  );
}
