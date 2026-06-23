import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grid-бот: заробіток на волатильності | CryptoNavigator',
  description: 'Grid-боти автоматично виставляють ордери в сітці — як це працює, коли працює і які ризики.',
  alternates: { canonical: 'https://cryptotop.chat/trading-bots/grid' },
};

export default function GridPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Grid-бот: заробіток на волатильності — і його межі</h1>
      <p className="text-gray-700 mb-4">Крипторинок рідко рухається прямолінійно. Навіть у сильному тренді ціна постійно коливається — вгору-вниз, вгору-вниз. Grid-бот створений щоб заробляти саме на цих коливаннях.</p>

      <div className="space-y-6 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Принцип роботи</h2>
          <p className="text-gray-700">Grid-бот розставляє серію ордерів на купівлю і продаж через рівні інтервали у визначеному діапазоні цін. Він заробляє на коливаннях — купує дешевше, продає дорожче, і так по колу.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <p className="font-semibold mb-2">Приклад</p>
          <p className="text-gray-700">BTC торгується біля $60 000. Налаштування:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1 text-gray-700">
            <li>Діапазон: від $55 000 до $65 000</li>
            <li>Кількість рівнів: 10</li>
            <li>Капітал: $1 000</li>
          </ul>
          <p className="text-gray-700 mt-3">Бот розставляє ордери через кожні $1 000. Щоразу коли ціна проходить рівень — угода і невеликий прибуток. І так по колу поки ціна залишається в діапазоні.</p>
        </div>

        <div className="mb-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <svg viewBox="0 0 600 260" className="w-full h-auto" aria-label="Grid bot diagram">
              <defs>
                <linearGradient id="gridBg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fef3c7" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="600" height="260" fill="url(#gridBg)" />
              <g stroke="#9ca3af" strokeWidth="1">
                <line x1="60" y1="40" x2="540" y2="40" />
                <line x1="60" y1="90" x2="540" y2="90" />
                <line x1="60" y1="140" x2="540" y2="140" />
                <line x1="60" y1="190" x2="540" y2="190" />
                <line x1="60" y1="240" x2="540" y2="240" />
              </g>
              <text x="60" y="32" fill="#111827" fontSize="13" fontWeight="600">Верхня межа</text>
              <text x="60" y="248" fill="#111827" fontSize="13" fontWeight="600">Нижня межа</text>
              <text x="310" y="180" fill="#111827" fontSize="13" fontWeight="600">Поточна ціна</text>
              <circle cx="310" cy="180" r="7" fill="#f43f5e" />
              <path d="M80 230 L120 170 L180 190 L240 150 L300 160 L360 120 L420 140 L480 100 L520 130" fill="none" stroke="#2563eb" strokeWidth="3" />
              <g fill="#16a34a">
                <text x="74" y="254" fontSize="12">Купити</text>
                <circle cx="80" cy="230" r="5" />
                <text x="234" y="174" fontSize="12">Купити</text>
                <circle cx="240" cy="150" r="5" />
              </g>
              <g fill="#ef4444">
                <text x="178" y="184" fontSize="12">Продати</text>
                <circle cx="180" cy="190" r="5" />
                <text x="410" y="124" fontSize="12">Продати</text>
                <circle cx="420" cy="140" r="5" />
              </g>
            </svg>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Коли працює добре</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Боковий ринок з помірною волатильністю</li>
            <li>Актив торгується в чіткому діапазоні</li>
            <li>Низькі комісії на біржі</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Коли провалюється</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Сильний спадний тренд — бот накупив на всьому діапазоні і тримає збиткові позиції</li>
            <li>Сильний зростаючий тренд — бот продав все занадто рано і пропускає подальше зростання</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Правила безпеки</h2>
          <ol className="list-decimal pl-5 text-gray-700 space-y-1">
            <li>Ніколи не виділяй на grid-бота весь капітал</li>
            <li>Завжди встановлюй нижній стоп-лос</li>
            <li>Обирай активи з достатньою ліквідністю</li>
            <li>Регулярно перевіряй чи ціна в діапазоні</li>
            <li>Будь готовий зупинити бота при зміні умов</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
