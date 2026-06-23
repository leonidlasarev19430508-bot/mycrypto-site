import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'DCA-стратегія — як купувати без стресу | CryptoNavigator',
  description: 'DCA: простий підхід для регулярних покупок криптовалюти. Приклади з цифрами, переваги та обмеження.',
  alternates: { canonical: 'https://cryptotop.chat/trading-bots/dca' },
};

export default function DcaPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">DCA-стратегія: як купувати крипту без стресу</h1>
      <p className="text-gray-700 mb-4">Уяви двох інвесторів. Перший чекає "правильного моменту" — вивчає графіки, читає новини, намагається купити на самому дні. Другий просто купує Bitcoin на $100 щотижня — незалежно від ціни, незалежно від новин.</p>
      <p className="text-gray-700 mb-4">Статистично другий інвестор частіше показує кращий результат. Не тому що він розумніший. А тому що він прибрав найнебезпечніший елемент торгівлі — емоційні рішення. Це і є DCA — Dollar-Cost Averaging, або усереднення вартості.</p>

      <div className="space-y-4 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Як працює DCA</h2>
          <p className="text-gray-700">Суть стратегії: купуєш фіксовану суму активу через рівні проміжки часу. Щодня, щотижня або щомісяця — незалежно від поточної ціни. Коли ціна висока — на ту саму суму купуєш менше монет. Коли ціна низька — купуєш більше монет. В результаті твоя середня ціна входу автоматично згладжується.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <p className="font-semibold mb-2">Приклад з цифрами</p>
          <p className="text-gray-700 leading-7">Ти купуєш BTC на $200 щотижня протягом 5 тижнів:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1 text-gray-700">
            <li>Тиждень 1: ціна $60 000 → отримуєш 0.00333 BTC</li>
            <li>Тиждень 2: ціна $50 000 → отримуєш 0.00400 BTC</li>
            <li>Тиждень 3: ціна $45 000 → отримуєш 0.00444 BTC</li>
            <li>Тиждень 4: ціна $52 000 → отримуєш 0.00385 BTC</li>
            <li>Тиждень 5: ціна $58 000 → отримуєш 0.00345 BTC</li>
          </ul>
          <p className="text-gray-700 mt-3">Разом витрачено: $1 000. Разом отримано: 0.01907 BTC. Середня ціна входу: ~$52 440.</p>
          <p className="text-gray-700 mt-2">Якби купив все одразу на тижні 1 — середня була б $60 000. DCA дала кращу середню ціну без жодного "вгадування ринку".</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <svg viewBox="0 0 600 260" className="w-full h-auto" aria-label="DCA chart diagram">
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path d="M40 200 C120 170 180 190 240 150 C300 110 360 140 420 120 C480 100 540 130 560 90" fill="none" stroke="#3b82f6" strokeWidth="4" />
            <circle cx="70" cy="190" r="8" fill="#fb923c" />
            <circle cx="190" cy="180" r="8" fill="#fb923c" />
            <circle cx="310" cy="145" r="8" fill="#fb923c" />
            <circle cx="430" cy="125" r="8" fill="#fb923c" />
            <circle cx="540" cy="95" r="8" fill="#fb923c" />
            <line x1="40" y1="170" x2="560" y2="170" stroke="#16a34a" strokeWidth="3" strokeDasharray="8 6" />
            <text x="560" y="62" fill="#1f2937" fontSize="14" textAnchor="end">Ціна</text>
            <text x="560" y="82" fill="#1f2937" fontSize="14" textAnchor="end">Ваші покупки</text>
            <text x="560" y="102" fill="#1f2937" fontSize="14" textAnchor="end">Середня ціна</text>
            <path d="M40 170 H560" stroke="#16a34a" strokeWidth="3" />
          </svg>
        </div>
      </div>

      <div className="space-y-6 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Переваги</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Психологічний комфорт — не потрібно переживати чи "правильний момент".</li>
            <li>Захист від помилки таймінгу — навіть досвідчені трейдери помиляються з точкою входу.</li>
            <li>Дисципліна замість емоцій — бот купує за розкладом навіть коли всі навколо панікують.</li>
            <li>Простота — не потрібно аналізувати графіки щодня.</li>
            <li>Підходить для зайнятих — 10 хвилин на налаштування і стратегія працює місяцями.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Обмеження і ризики</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>У сильному бичачому ринку DCA може поступатись разовій покупці.</li>
            <li>Не захищає від затяжного ведмежого ринку.</li>
            <li>Потребує часу — DCA довгострокова стратегія.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Для кого підходить</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Довгострокові інвестори (1-3+ роки)</li>
            <li>Особи з регулярним доходом, які хочуть накопичувати</li>
            <li>Ті, хто не хоче витрачати час на аналіз щодня</li>
            <li>Новачки, які тільки починають</li>
          </ul>
        </div>
      </div>

      <p className="mb-4">Binance і Bybit мають вбудовані DCA-боти безкоштовно. Достатньо вказати суму, актив і частоту покупок.</p>
      <p className="mb-4">Платформи: <a href="https://www.binance.com/en/register?ref=Q5HR1JVW" rel="sponsored noopener noreferrer" className="text-orange-600">Binance</a>, <a href="https://www.bybit.com/register?ref=CRYPTONAV" rel="sponsored noopener noreferrer" className="text-orange-600">Bybit</a>.</p>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <p className="font-bold text-orange-800 mb-2">Потренуйте DCA в симуляторі</p>
        <Link href="/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Відкрити симулятор →</Link>
      </div>
    </main>
  );
}
