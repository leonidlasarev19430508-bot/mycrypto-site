'use client';
import { ExchangeModal, useExchangeModal } from '../components/ExchangeModal';

const EXCHANGES = [
  {
    name: 'Binance', id: 'binance', logo: '🟡',
    bonus: 'До $600 USDT',
    bonusDetails: 'Бонус за реєстрацію + верифікацію + перший депозит',
    conditions: ['Верифікація KYC', 'Перший депозит від $50', 'Торговий об\'єм від $100'],
    fee: '0.1%', feeDiscount: '-25% з BNB', rating: 4.8,
    badge: '🏆 Найкращий вибір', badgeColor: 'bg-yellow-500',
    affiliate: 'https://www.binance.com/register?ref=Q5HR1JVW',
    pros: ['Найбільша ліквідність', 'Найнижчі комісії', '350+ монет', 'Українська підтримка'],
    color: 'border-yellow-400',
  },
  {
    name: 'Bybit', id: 'bybit', logo: '🔵',
    bonus: 'До $30,000 USDT',
    bonusDetails: 'Пакет привітальних бонусів для нових трейдерів',
    conditions: ['Реєстрація за посиланням', 'Депозит від $100', 'Ф\'ючерсна торгівля'],
    fee: '0.1%', feeDiscount: '0.02% для мейкерів', rating: 4.6,
    badge: '⚡ Для трейдерів', badgeColor: 'bg-blue-600',
    affiliate: 'https://www.bybit.com/register?ref=CRYPTONAV',
    pros: ['Великі бонуси', 'Плече до 100x', 'Copy trading', 'Висока ліквідність'],
    color: 'border-blue-300',
  },
  {
    name: 'OKX', id: 'okx', logo: '⚫',
    bonus: 'Mystery Box $10,000',
    bonusDetails: 'Mystery Box з шансом виграти до $10,000 USDT',
    conditions: ['Реєстрація за посиланням', 'Верифікація KYC', 'Перший депозит'],
    fee: '0.08%', feeDiscount: 'Найнижча на ринку', rating: 4.5,
    badge: '🌐 Web3 платформа', badgeColor: 'bg-gray-700',
    affiliate: 'https://www.okx.com/join/CRYPTONAV',
    pros: ['Найнижчі комісії', 'Web3 гаманець', 'Стейкінг до 20%', 'NFT маркетплейс'],
    color: 'border-gray-400',
  },
  {
    name: 'KuCoin', id: 'kucoin', logo: '🟢',
    bonus: 'До $500 USDT',
    bonusDetails: 'Бонус за реєстрацію та перший депозит',
    conditions: ['Реєстрація за посиланням', 'Верифікація KYC', 'Перший депозит від $50'],
    fee: '0.1%', feeDiscount: 'Знижки для VIP', rating: 4.4,
    badge: '🌱 700+ монет', badgeColor: 'bg-green-600',
    affiliate: 'https://www.kucoin.com/r/rf/CXEPY4S5',
    pros: ['700+ монет', 'Стейкінг', 'Web3 інтеграція', 'Низькі комісії'],
    color: 'border-green-400',
  },
];

export default function BonusesPage() {
  const { activeExchange, open, close } = useExchangeModal();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">Актуально — Травень 2026</span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">🎁 Бонуси при реєстрації</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">Порівняй бонуси топових бірж. Реєструйся за нашими посиланнями і отримай максимальний бонус.</p>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 mb-10 text-white text-center">
        <p className="text-sm font-semibold uppercase tracking-wide opacity-80 mb-1">Загальний потенційний бонус</p>
        <p className="text-5xl font-black mb-2">До $41,100</p>
        <p className="text-orange-100 text-sm">якщо зареєструватись на всіх 4 біржах</p>
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
                      {/* Клікабельна назва біржі */}
                      <button
                        onClick={() => open(ex.id)}
                        className="text-2xl font-black text-gray-900 hover:text-orange-500 transition-colors underline decoration-dotted underline-offset-2 cursor-pointer"
                      >
                        {ex.name}
                      </button>
                      <span className={`text-white text-xs font-bold px-2 py-0.5 rounded-full ${ex.badgeColor}`}>{ex.badge}</span>
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
                  <p className="text-xs text-green-600 font-semibold uppercase tracking-wide mb-1">Бонус за реєстрацію</p>
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
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2">Умови отримання</p>
                  <div className="flex flex-wrap gap-2">
                    {ex.conditions.map(c => (
                      <span key={c} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{c}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:w-52 flex-shrink-0">
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-xs text-gray-400 mb-1">Комісія спот</p>
                  <p className="text-xl font-black text-gray-900">{ex.fee}</p>
                  <p className="text-xs text-green-600 font-semibold">{ex.feeDiscount}</p>
                </div>
                <a href={ex.affiliate} target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl transition text-sm">
                  Отримати бонус →
                </a>
                <p className="text-xs text-gray-400 text-center mt-2">Реєстрація безкоштовна</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">❓ Часті запитання</h2>
        <div className="space-y-4">
          {[
            { q: 'Чи можна зареєструватись на кількох біржах?', a: 'Так, можна реєструватись на всіх біржах одночасно і отримати бонус на кожній.' },
            { q: 'Чи потрібна верифікація для бонусу?', a: 'На більшості бірж KYC верифікація обов\'язкова для виведення коштів і отримання повного бонусу.' },
            { q: 'Скільки часу займає реєстрація?', a: 'Реєстрація займає 5 хвилин. Верифікація — від 30 хвилин до 24 годин.' },
            { q: 'Бонуси дійсно безкоштовні?', a: 'Так, реєстрація безкоштовна. Деякі бонуси вимагають першого депозиту або торгового об\'єму.' },
          ].map(({ q, a }) => (
            <div key={q} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <p className="font-semibold text-gray-900 mb-1">{q}</p>
              <p className="text-sm text-gray-500">{a}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-gray-400">* Розміри бонусів можуть змінюватись. Актуальна інформація на сайтах бірж. Не є фінансовою порадою.</p>

      {/* Модальне вікно */}
      {activeExchange && (
        <ExchangeModal
          exchangeId={activeExchange}
          locale="uk"
          onClose={close}
        />
      )}
    </div>
  );
}
