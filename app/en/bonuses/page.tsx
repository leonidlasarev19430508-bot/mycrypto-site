'use client';
import { ExchangeModal, useExchangeModal } from '../../components/ExchangeModal';

const EXCHANGES = [
  {
    name: 'Binance', id: 'binance', logo: '🟡',
    bonus: 'Up to $600 USDT',
    bonusDetails: 'Bonus for registration + verification + first deposit',
    conditions: ['KYC Verification', 'First deposit from $50', 'Trading volume from $100'],
    fee: '0.1%', feeDiscount: '-25% with BNB', rating: 4.8,
    badge: '🏆 Best Choice', badgeColor: 'bg-yellow-500',
    affiliate: 'https://www.binance.com/register?ref=Q5HR1JVW',
    pros: ['Highest liquidity', 'Lowest fees', '350+ coins', 'English support'],
    color: 'border-yellow-400',
  },
  {
    name: 'Bybit', id: 'bybit', logo: '🔵',
    bonus: 'Up to $30,000 USDT',
    bonusDetails: 'Welcome bonus package for new traders',
    conditions: ['Register via link', 'Deposit from $100', 'Futures trading'],
    fee: '0.1%', feeDiscount: '0.02% for makers', rating: 4.6,
    badge: '⚡ For Traders', badgeColor: 'bg-blue-600',
    affiliate: 'https://www.bybit.com/register?ref=CRYPTONAV',
    pros: ['Large bonuses', 'Up to 100x leverage', 'Copy trading', 'High liquidity'],
    color: 'border-blue-300',
  },
  {
    name: 'OKX', id: 'okx', logo: '⚫',
    bonus: 'Mystery Box $10,000',
    bonusDetails: 'Mystery Box with a chance to win up to $10,000 USDT',
    conditions: ['Register via link', 'KYC Verification', 'First deposit'],
    fee: '0.08%', feeDiscount: 'Lowest on the market', rating: 4.5,
    badge: '🌐 Web3 Platform', badgeColor: 'bg-gray-700',
    affiliate: 'https://www.okx.com/join/CRYPTONAV',
    pros: ['Lowest fees', 'Web3 wallet', 'Staking up to 20%', 'NFT marketplace'],
    color: 'border-gray-400',
  },
  {
    name: 'KuCoin', id: 'kucoin', logo: '🟢',
    bonus: 'Up to $500 USDT',
    bonusDetails: 'Bonus for registration and first deposit',
    conditions: ['Register via link', 'KYC Verification', 'First deposit from $50'],
    fee: '0.1%', feeDiscount: 'VIP discounts available', rating: 4.4,
    badge: '🌱 700+ coins', badgeColor: 'bg-green-600',
    affiliate: 'https://www.kucoin.com/r/rf/CXEPY4S5',
    pros: ['700+ coins', 'Staking rewards', 'Web3 integration', 'Low fees'],
    color: 'border-green-400',
  },
];

export default function BonusesENPage() {
  const { activeExchange, open, close } = useExchangeModal();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">Updated — May 2026</span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">🎁 Registration Bonuses</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">Compare bonuses from top exchanges. Register via our links and get the maximum bonus.</p>
      </div>
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 mb-10 text-white text-center">
        <p className="text-sm font-semibold uppercase tracking-wide opacity-80 mb-1">Total potential bonus</p>
        <p className="text-5xl font-black mb-2">Up to $41,100</p>
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
                      <button
                        onClick={() => open(ex.id)}
                        className="text-2xl font-black text-gray-900 hover:text-orange-500 transition-colors underline decoration-dotted underline-offset-2 cursor-pointer"
                      >
                        {ex.name}
                      </button>
                      <span className={`text-white text-xs font-bold px-2 py-0.5 rounded-full ${ex.badgeColor}`}>{ex.badge}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[...Array(5)].map((_, i) => (<span key={i} className={i < Math.floor(ex.rating) ? 'text-yellow-400' : 'text-gray-300'}>★</span>))}
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
                  {ex.pros.map(pro => (<div key={pro} className="flex items-center gap-1.5 text-sm text-gray-600"><span className="text-green-500 font-bold">✓</span> {pro}</div>))}
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2">Conditions</p>
                  <div className="flex flex-wrap gap-2">
                    {ex.conditions.map(c => (<span key={c} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{c}</span>))}
                  </div>
                </div>
              </div>
              <div className="md:w-52 flex-shrink-0">
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-xs text-gray-400 mb-1">Spot fee</p>
                  <p className="text-xl font-black text-gray-900">{ex.fee}</p>
                  <p className="text-xs text-green-600 font-semibold">{ex.feeDiscount}</p>
                </div>
                <a href={ex.affiliate} target="_blank" rel="sponsored noopener noreferrer"
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
      <p className="text-center text-xs text-gray-400">* Bonus amounts may change. Current information on exchange websites. Not financial advice.</p>

      {activeExchange && (
        <ExchangeModal exchangeId={activeExchange} locale="en" onClose={close} />
      )}
    </div>
  );
}
