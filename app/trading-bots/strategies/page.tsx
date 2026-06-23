import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Торгові стратегії: розбір та реальність | CryptoNavigator',
  description: 'Огляд базових і технічних стратегій, застереження і рекомендації щодо використання автоматизації.',
  alternates: { canonical: 'https://cryptotop.chat/trading-bots/strategies' },
};

export default function StrategiesPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Торгові стратегії: розбір, застереження, реальність</h1>
      <p className="text-gray-700 mb-4">Чесна відповідь на питання "яку стратегію закласти в бота": не існує стратегії яка працює завжди. Є стратегії які підходять для певних умов — і провалюються в інших.</p>

      <div className="space-y-6 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Базові стратегії</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li><strong>DCA</strong> — регулярні покупки фіксованої суми. Для кого: довгострокові інвестори. Умови: працює при достатньому горизонті. Застереження: не захищає від затяжного ведмежого ринку.</li>
            <li><strong>HODLing</strong> — купи і тримай. Важливий факт: більшість роздрібних трейдерів які активно торгують показують гірші результати ніж ті хто просто купив BTC і тримає.</li>
            <li><strong>Trend Following</strong> — торгівля за трендом. Проблеми: важко визначити початок тренду, легко потрапити на хибний сигнал, провалюється в боковому ринку.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Технічні стратегії</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li><strong>MA Crossover</strong> — перетин ковзних середніх. Купуй коли коротка MA перетинає довгу знизу вгору. Проблеми: запізнює сигнали, багато хибних угод у боковику.</li>
            <li><strong>RSI Oversold/Overbought</strong> — купуй при RSI &lt; 30, продавай при RSI &gt; 70. Проблеми: у сильному тренді RSI довго в екстремумах, 30/70 — умовність.</li>
            <li><strong>Breakout Trading</strong> — торгівля на пробоях рівнів. Проблеми: більшість пробоїв хибні, потрібне точне визначення рівнів.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Головні застереження</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Бектест ≠ реальний результат. Будь-яку стратегію можна підігнати під минуле.</li>
            <li>Жодна стратегія не працює завжди.</li>
            <li>Управління ризиком важливіше за стратегію.</li>
            <li>Макроподії скасовують технічний аналіз.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Як тестувати безпечно</h2>
          <ol className="list-decimal pl-5 text-gray-700 space-y-1">
            <li>Теорія — зрозумій логіку стратегії.</li>
            <li>Симулятор — протестуй без реальних грошей.</li>
            <li>Мікро-тест — мінімальна сума на реальному ринку.</li>
            <li>Масштабування — тільки після підтвердження.</li>
          </ol>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <p className="font-bold text-orange-800 mb-2">Нагадування</p>
        <p className="text-orange-700 mb-4">Реальний ринок додає емоції і непередбачуваність. Симулятор показує логіку, але не замінює контроль.</p>
        <Link href="/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Спробувати симулятор →</Link>
      </div>
    </main>
  );
}
