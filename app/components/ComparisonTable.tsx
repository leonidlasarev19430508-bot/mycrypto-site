'use client';
import Link from 'next/link';

const EXCHANGES = [
  {
    name: 'Binance',
    spot: '0.10%',
    futures: '0.02% / 0.05%',
    withdrawal: 'Від $0.5',
    bonus: 'До $600',
    coins: '350+',
    rating: 4.8,
    badge: '🏆',
    affiliate: 'https://www.binance.com/register?ref=GRO_28502_BIO0R',
    highlight: true,
  },
  {
    name: 'WhiteBIT',
    spot: '0.10%',
    futures: '0.01% / 0.05%',
    withdrawal: 'Від $1',
    bonus: 'До $150',
    coins: '250+',
    rating: 4.4,
    badge: '🇺🇦',
    affiliate: 'https://whitebit.com/referral/54626c3b-5240-4d39-9784-8e3eda5736de',
    highlight: false,
  },
  {
    name: 'Bybit',
    spot: '0.10%',
    futures: '0.02% / 0.055%',
    withdrawal: 'Від $1',
    bonus: 'До $30,000',
    coins: '300+',
    rating: 4.6,
    badge: '⚡',
    affiliate: 'https://www.bybit.com/register?ref=CRYPTONAV',
    highlight: false,
  },
  {
    name: 'OKX',
    spot: '0.08%',
    futures: '0.02% / 0.05%',
    withdrawal: 'Від $0.5',
    bonus: 'Mystery Box',
    coins: '300+',
    rating: 4.5,
    badge: '🌐',
    affiliate: 'https://www.okx.com/join/CRYPTONAV',
    highlight: false,
  },
];

export default function ComparisonTable() {
  return (
    <section className="mt-12 max-w-5xl mx-auto px-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-gray-900">📊 Порівняння комісій бірж</h2>
        <p className="text-gray-500 text-sm mt-1">Актуальні тарифи топових криптобірж — Травень 2026</p>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Біржа</th>
              <th className="text-center px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Спот</th>
              <th className="text-center px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Фʼючерси</th>
              <th className="text-center px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Виведення</th>
              <th className="text-center px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Монет</th>
              <th className="text-center px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Бонус</th>
              <th className="text-center px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide"></th>
            </tr>
          </thead>
          <tbody>
            {EXCHANGES.map((ex) => (
              <tr key={ex.name} className={`border-b border-gray-50 hover:bg-orange-50 transition ${ex.highlight ? 'bg-orange-50/30' : ''}`}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{ex.badge}</span>
                    <div>
                      <span className="font-bold text-gray-900">{ex.name}</span>
                      {ex.highlight && <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-semibold">Топ</span>}
                    </div>
                  </div>
                  <div className="flex mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-xs ${i < Math.floor(ex.rating) ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-bold text-gray-900">{ex.spot}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-sm text-gray-600">{ex.futures}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-sm text-gray-600">{ex.withdrawal}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-semibold text-gray-700">{ex.coins}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-sm font-bold text-green-600">{ex.bonus}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <a
                    href={ex.affiliate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition whitespace-nowrap"
                  >
                    Реєстрація →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {EXCHANGES.map((ex) => (
          <div key={ex.name} className={`bg-white border rounded-xl p-4 ${ex.highlight ? 'border-orange-300' : 'border-gray-100'}`}>
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{ex.badge}</span>
                <span className="font-bold text-gray-900">{ex.name}</span>
              </div>
              <span className="text-sm font-bold text-green-600">{ex.bonus}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3 text-center">
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-gray-400">Спот</p>
                <p className="font-bold text-sm">{ex.spot}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-gray-400">Монет</p>
                <p className="font-bold text-sm">{ex.coins}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-gray-400">Рейтинг</p>
                <p className="font-bold text-sm">{ex.rating}</p>
              </div>
            </div>
            <a
              href={ex.affiliate}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-orange-500 text-white font-bold py-2 rounded-lg text-sm"
            >
              Реєстрація →
            </a>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <Link href="/bonuses" className="text-sm text-orange-600 hover:underline font-semibold">
          🎁 Детальніше про бонуси при реєстрації →
        </Link>
      </div>
    </section>
  );
}
