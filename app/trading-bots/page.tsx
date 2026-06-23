import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Торгові боти — автоматизація трейдингу | CryptoNavigator',
  description: 'Хаб про торгові боти: як автоматизація доповнює людину, огляд стратегій і платформ.',
  alternates: { canonical: 'https://cryptotop.chat/trading-bots' },
};

export default function TradingBotsHub() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Торгові боти: інструмент в руках людини, а не її заміна</h1>
      <p className="text-gray-700 mb-6">Якщо ввести в пошук "торговий бот для крипти" — побачиш тисячі обіцянок пасивного доходу, автоматичного прибутку і "роботи поки спиш". Реальність інша. Торговий бот — це програма яка виконує твої торгові рішення автоматично і без емоцій. Але якщо стратегія хибна — бот просто швидше і ефективніше втратить гроші.</p>
      <p className="text-gray-700 mb-6">Цей розділ — чесний погляд на автоматизацію трейдингу. Без хайпу і без страшилок. Тільки те що реально варто знати перш ніж довірити алгоритму свої кошти.</p>

      <div className="space-y-6 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Що таке торговий бот</h2>
          <p className="text-gray-700">Торговий бот — це програма яка підключається до біржі через API і автоматично виконує угоди за заданими правилами. Наприклад: "купуй BTC на $100 щопонеділка" або "продавай якщо ціна виросла на 2% від покупки". Бот не спить, не панікує і не піддається жадібності — він просто виконує правила.</p>
          <p className="text-gray-700 mt-3">Але є важливий нюанс: правила задає людина. І якщо правила неправильні — результат буде відповідний.</p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Для кого підходить автоматизація</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Для тих хто вже має стратегію і хоче прибрати емоційний фактор</li>
            <li>Для довгострокових інвесторів які хочуть автоматизувати регулярні покупки (DCA)</li>
            <li>Для досвідчених трейдерів які хочуть торгувати 24/7</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Для кого не підходить</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Для тих хто шукає "чарівну кнопку" яка заробляє сама</li>
            <li>Для новачків без розуміння базових принципів торгівлі</li>
            <li>Для тих хто не готовий регулярно моніторити бота</li>
          </ul>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-6">
        <p className="font-bold text-orange-800 mb-2">Головна теза</p>
        <p className="text-orange-700">Автоматизація доповнює людину — але не замінює її. Найуспішніші трейдери використовують ботів як інструмент, залишаючи за собою стратегічні рішення і контроль ризиків.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Link href="/trading-bots/dca" className="p-4 bg-white border rounded-lg hover:shadow">DCA-стратегія</Link>
        <Link href="/trading-bots/grid" className="p-4 bg-white border rounded-lg hover:shadow">Grid-боти</Link>
        <Link href="/trading-bots/strategies" className="p-4 bg-white border rounded-lg hover:shadow">Стратегії</Link>
        <Link href="/trading-bots/platforms" className="p-4 bg-white border rounded-lg hover:shadow">Платформи</Link>
        <Link href="/trading-bots/risks" className="p-4 bg-white border rounded-lg hover:shadow">Ризики</Link>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <p className="font-bold text-orange-800 mb-2">Спробуйте симулятор</p>
        <p className="text-orange-700 mb-4">Тестуйте автоматичні стратегії без ризику для реальних грошей.</p>
        <Link href="/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Відкрити симулятор →</Link>
      </div>
    </main>
  );
}
