import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '5 ризиків торгових ботів | CryptoNavigator',
  description: "П'ять ризиків торгових ботів: curve fitting, комісії, безпека API, макро, хибне відчуття безпеки.",
  alternates: { canonical: 'https://cryptotop.chat/trading-bots/risks' },
};

export default function RisksPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">5 ризиків торгових ботів про які мовчать маркетологи</h1>
      <p className="text-gray-700 mb-4">Тут ми розбираємо головні ризики: curve fitting (перетренування), комісії, безпека API-ключів, сліпота до макроподій та хибне відчуття безпеки.</p>
      <ul className="list-disc pl-5 space-y-2 mb-6">
        <li><strong>Curve fitting:</strong> бот налаштовується під історичні дані і виглядає ідеально на бектесті. На реальному ринку — провал.</li>
        <li><strong>Комісії:</strong> часті угоди з’їдають прибуток. 20 угод на день × $100 обороту = $2 на день при 0.1% комісії.</li>
        <li><strong>Безпека API:</strong> ключі на хостингу — ціль для зломів. Використовуй ключі без прав виведення.</li>
        <li><strong>Сліпота до макроподій:</strong> бот торгує незалежно від новин, санкцій та криз.</li>
        <li><strong>Хибне відчуття безпеки:</strong> коли бот "працює", людина часто припиняє стежити.</li>
      </ul>

      <div className="space-y-6 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Ризик 1: Curve fitting</h2>
          <p className="text-gray-700">Стратегія налаштовується під історичні дані і виглядає ідеально на бектесті. На реальному ринку — провал. Ринок постійно змінюється, і те що працювало у 2021 може бути неефективним у 2024.</p>
          <p className="text-gray-700">Як захиститись: тестуй на даних які не використовувались для налаштування.</p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Ризик 2: комісії</h2>
          <p className="text-gray-700">Grid-бот робить десятки угод на день. Кожна угода — комісія.</p>
          <p className="text-gray-700">На капіталі $500 комісія 0.1% може становити до 12% на місяць.</p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Ризик 3: безпека API</h2>
          <p className="text-gray-700">API-ключ — це пароль доступу до акаунту. Якщо платформа зламана або сервіс шахрайський — зловмисники отримують доступ до торгівлі.</p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Тільки права торгівлі, без виведення</li>
            <li>Не давай ключ незнайомим сервісам</li>
            <li>Оновлюй ключі регулярно</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Ризик 4: сліпота до макроподій</h2>
          <p className="text-gray-700">Бот не читає новини. Він торгує за алгоритмом незалежно від того, що відбувається у світі.</p>
          <p className="text-gray-700">Якщо трапляється COVID, санкції або крах біржі — бот може продовжувати діяти за старими правилами.</p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Ризик 5: хибне відчуття безпеки</h2>
          <p className="text-gray-700">Людина бачить, що бот "працює", і перестає перевіряти. Ринок робить різкий рух, а власник дізнається про збитки занадто пізно.</p>
          <p className="text-gray-700">Як захиститись: сповіщення про баланс, перевірка бота щодня і готовність зупинити.</p>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <p className="font-bold text-orange-800 mb-2">Висновок</p>
        <p className="text-orange-700">Бот — це підсилювач стратегії. Хороша стратегія + бот = ефективніша хороша стратегія. Погана стратегія + бот = ефективніша погана стратегія.</p>
        <p className="text-orange-700 mt-2">Автоматизація доповнює людину. Але не замінює її.</p>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <p className="font-bold text-orange-800 mb-2">Перевірте стратегію в симуляторі</p>
        <Link href="/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Відкрити симулятор →</Link>
      </div>
    </main>
  );
}
