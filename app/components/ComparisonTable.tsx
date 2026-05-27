'use client';
import Link from 'next/link';

type Locale = 'uk' | 'en' | 'pl' | 'de';

interface ComparisonTableProps {
  locale?: Locale;
}

const EXCHANGES = [
  { name: 'Binance', spot: '0.10%', futures: '0.02% / 0.05%', withdrawal: '$0.5+', bonus: '$600', coins: '350+', rating: 4.8, badge: '🏆', highlight: true, affiliate: 'https://www.binance.com/register?ref=Q5HR1JVW' },
  { name: 'Bybit', spot: '0.10%', futures: '0.02% / 0.055%', withdrawal: '$1+', bonus: '$30,000', coins: '300+', rating: 4.6, badge: '⚡', highlight: false, affiliate: 'https://www.bybit.com/register?ref=CRYPTONAV' },
  { name: 'OKX', spot: '0.08%', futures: '0.02% / 0.05%', withdrawal: '$0.5+', bonus: 'Mystery Box', coins: '300+', rating: 4.5, badge: '🌐', highlight: false, affiliate: 'https://www.okx.com/join/CRYPTONAV' },
  { name: 'KuCoin', spot: '0.10%', futures: '0.02% / 0.06%', withdrawal: '$1+', bonus: '$500', coins: '700+', rating: 4.4, badge: '🟢', highlight: false, affiliate: 'https://www.kucoin.com/r/rf/CXEPY4S5' },
];

const LABELS: Record<Locale, { title: string; subtitle: string; exchange: string; spot: string; futures: string; withdrawal: string; coins: string; bonus: string; register: string; top: string; more: string; bonusLink: string }> = {
  uk: { title: '📊 Порівняння комісій бірж', subtitle: 'Актуальні тарифи топових криптобірж — Травень 2026', exchange: 'Біржа', spot: 'Спот', futures: 'Ф\'ючерси', withdrawal: 'Виведення', coins: 'Монет', bonus: 'Бонус', register: 'Реєстрація →', top: 'Топ', more: '🎁 Детальніше про бонуси при реєстрації →', bonusLink: '/bonuses' },
  en: { title: '📊 Exchange Fee Comparison', subtitle: 'Current rates for top crypto exchanges — May 2026', exchange: 'Exchange', spot: 'Spot', futures: 'Futures', withdrawal: 'Withdrawal', coins: 'Coins', bonus: 'Bonus', register: 'Register →', top: 'Top', more: '🎁 More about registration bonuses →', bonusLink: '/en/bonuses' },
  pl: { title: '📊 Porównanie opłat giełd', subtitle: 'Aktualne stawki topowych giełd krypto — Maj 2026', exchange: 'Giełda', spot: 'Spot', futures: 'Futures', withdrawal: 'Wypłata', coins: 'Monety', bonus: 'Bonus', register: 'Rejestracja →', top: 'Top', more: '🎁 Więcej o bonusach rejestracyjnych →', bonusLink: '/pl/bonuses' },
  de: { title: '📊 Börsengebühren Vergleich', subtitle: 'Aktuelle Tarife der Top-Kryptobörsen — Mai 2026', exchange: 'Börse', spot: 'Spot', futures: 'Futures', withdrawal: 'Auszahlung', coins: 'Münzen', bonus: 'Bonus', register: 'Registrieren →', top: 'Top', more: '🎁 Mehr über Registrierungsboni →', bonusLink: '/de/bonuses' },
};

export default function ComparisonTable({ locale = 'uk' }: ComparisonTableProps) {
  const l = LABELS[locale];

  return (
    <section className="mt-12 max-w-5xl mx-auto px-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-gray-900">{l.title}</h2>
        <p className="text-gray-500 text-sm mt-1">{l.subtitle}</p>
      </div>

      {/* Desktop */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">{l.exchange}</th>
              <th className="text-center px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">{l.spot}</th>
              <th className="text-center px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">{l.futures}</th>
              <th className="text-center px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">{l.withdrawal}</th>
              <th className="text-center px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">{l.coins}</th>
              <th className="text-center px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">{l.bonus}</th>
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
                      {ex.highlight && <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-semibold">{l.top}</span>}
                    </div>
                  </div>
                  <div className="flex mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-xs ${i < Math.floor(ex.rating) ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4 text-center font-bold text-gray-900">{ex.spot}</td>
                <td className="px-4 py-4 text-center text-sm text-gray-600">{ex.futures}</td>
                <td className="px-4 py-4 text-center text-sm text-gray-600">{ex.withdrawal}</td>
                <td className="px-4 py-4 text-center font-semibold text-gray-700">{ex.coins}</td>
                <td className="px-4 py-4 text-center text-sm font-bold text-green-600">{ex.bonus}</td>
                <td className="px-4 py-4 text-center">
                  <a href={ex.affiliate} target="_blank" rel="noopener noreferrer"
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition whitespace-nowrap">
                    {l.register}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
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
                <p className="text-xs text-gray-400">{l.spot}</p>
                <p className="font-bold text-sm">{ex.spot}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-gray-400">{l.coins}</p>
                <p className="font-bold text-sm">{ex.coins}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-gray-400">Rating</p>
                <p className="font-bold text-sm">{ex.rating}</p>
              </div>
            </div>
            <a href={ex.affiliate} target="_blank" rel="noopener noreferrer"
              className="block w-full text-center bg-orange-500 text-white font-bold py-2 rounded-lg text-sm">
              {l.register}
            </a>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <Link href={l.bonusLink} className="text-sm text-orange-600 hover:underline font-semibold">
          {l.more}
        </Link>
      </div>
    </section>
  );
}
