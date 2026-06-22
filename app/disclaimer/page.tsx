import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Дисклеймер — CryptoNavigator',
  description: 'Фінансовий дисклеймер CryptoNavigator (cryptotop.chat)',
  alternates: { canonical: 'https://cryptotop.chat/disclaimer' },
};

export default function DisclaimerPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-black mb-2">Дисклеймер</h1>
      <p className="text-sm text-gray-400 mb-8">Останнє оновлення: червень 2026</p>

      <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6 mb-10">
        <p className="font-black text-red-800 text-lg mb-2">⚠️ НЕ Є ФІНАНСОВОЮ ПОРАДОЮ</p>
        <p className="text-red-700">Весь контент на CryptoNavigator призначений виключно для <strong>освітніх та інформаційних цілей</strong>. Ніщо на цьому сайті не є фінансовою, інвестиційною, торговельною, юридичною чи податковою порадою.</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Інвестиційні ризики</h2>
        <p>Криптовалютні ринки надзвичайно волатильні. Вартість криптовалют може різко зростати або падати за короткий проміжок часу. Ви можете втратити частину або всі вкладені кошти. Минулі результати не є індикатором майбутніх.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Аналіз, згенерований ШІ</h2>
        <p>Новинні зведення, аналіз настроїв ринку та рекомендації «купити/продати/тримати», що відображаються на платформі, генеруються штучним інтелектом. Це <strong>автоматизовані алгоритмічні оцінки</strong>, а не професійні фінансові поради. Вони можуть бути неточними, неповними або застарілими.</p>
      </section>

      <section className="mb-8" id="affiliate">
        <h2 className="text-xl font-bold mb-3">Партнерські посилання</h2>
        <p>CryptoNavigator містить партнерські посилання на криптовалютні біржі. Ми отримуємо комісію, якщо ви реєструєтесь або торгуєте за нашими посиланнями. Саме так ми фінансуємо платформу. Наш аналіз та рекомендації <strong>не залежать</strong> від партнерських відносин.</p>
        <p className="mt-2">Партнерські біржі: Binance, Bybit, OKX, KuCoin.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Відсутність гарантій точності</h2>
        <p>Хоча ми прагнемо надавати точну та актуальну інформацію, ми не даємо жодних гарантій щодо повноти, точності, надійності чи доступності будь-якої інформації на платформі.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Ваша відповідальність</h2>
        <p>Будь-які фінансові рішення ви приймаєте виключно на власну відповідальність. Ми наполегливо рекомендуємо проконсультуватися з кваліфікованим фінансовим радником перед будь-якими інвестиційними рішеннями.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">Контакт</h2>
        <p>Питання щодо цього дисклеймеру: <strong>info@cryptotop.chat</strong></p>
      </section>
    </main>
  );
}
