import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Політика конфіденційності — CryptoNavigator',
  description: 'Політика конфіденційності CryptoNavigator (cryptotop.chat)',
  alternates: { canonical: 'https://cryptotop.chat/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-black mb-2">Політика конфіденційності</h1>
      <p className="text-sm text-gray-400 mb-8">Останнє оновлення: червень 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">1. Хто ми</h2>
        <p>CryptoNavigator («ми», «нас», «наш») керує сайтом <a href="https://cryptotop.chat" className="text-orange-500 hover:underline">cryptotop.chat</a> — освітньою криптовалютною платформою з аналізом ринку, торговим симулятором та агрегацією новин.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">2. Яку інформацію ми збираємо</h2>
        <p className="mb-2">Ми збираємо такі типи інформації:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Дані про використання:</strong> відвідані сторінки, час на сайті, тип браузера та пристрою — через Google Analytics (анонімізовано).</li>
          <li><strong>Email-адреса:</strong> лише якщо ви підписуєтесь на розсилку. Для надсилання листів використовуємо Resend.</li>
          <li><strong>Дані симулятора:</strong> торговий симулятор зберігає дані локально у вашому браузері (localStorage). Ми не збираємо та не передаємо ці дані.</li>
          <li><strong>Файли cookie:</strong> використовуємо для аналітики та базової функціональності. Детальніше — у розділі 5.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">3. Як ми використовуємо інформацію</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Для надання та вдосконалення наших послуг</li>
          <li>Для надсилання розсилки (лише за вашою згодою)</li>
          <li>Для аналізу трафіку та поведінки користувачів</li>
          <li>Для виконання юридичних зобов'язань</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">4. Сторонні сервіси</h2>
        <p className="mb-2">Ми використовуємо такі сторонні сервіси:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Google Analytics</strong> — аналітика відвідуваності</li>
          <li><strong>CoinGecko / Binance API</strong> — дані про ціни криптовалют в реальному часі</li>
          <li><strong>TradingView</strong> — вбудовані графіки</li>
          <li><strong>Resend</strong> — доставка email-листів</li>
          <li><strong>Anthropic Claude API</strong> — AI-аналіз новин</li>
        </ul>
        <p className="mt-2">Кожен сервіс має власну політику конфіденційності. Рекомендуємо з нею ознайомитися.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">5. Файли cookie</h2>
        <p>Ми використовуємо cookie для:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Відстеження Google Analytics (анонімізована IP-адреса)</li>
          <li>Збереження мовних налаштувань</li>
          <li>Базового керування сесіями</li>
        </ul>
        <p className="mt-2">Ви можете вимкнути cookie у налаштуваннях браузера. Деякі функції можуть працювати некоректно без cookie.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">6. Партнерські посилання</h2>
        <p>CryptoNavigator містить партнерські посилання на криптовалютні біржі (Binance, Bybit, OKX, KuCoin). Якщо ви реєструєтесь за цими посиланнями, ми можемо отримати комісію без додаткових витрат для вас. Ми рекомендуємо лише ті платформи, які вважаємо корисними для користувачів.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">7. Зберігання даних</h2>
        <p>Аналітичні дані зберігаємо до 26 місяців. Дані email-підписників — до скасування підписки. Ви можете будь-коли запросити видалення своїх даних.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">8. Ваші права (GDPR)</h2>
        <p className="mb-2">Якщо ви знаходитесь в Європейському Союзі, ви маєте право:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Отримати доступ до своїх персональних даних</li>
          <li>Виправити неточні дані</li>
          <li>Вимагати видалення своїх даних</li>
          <li>Заперечити проти обробки даних</li>
          <li>Перенести свої дані</li>
        </ul>
        <p className="mt-2">Для реалізації цих прав зв'яжіться з нами: <strong>info@cryptotop.chat</strong></p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">9. Конфіденційність дітей</h2>
        <p>Наші послуги не призначені для осіб до 18 років. Ми свідомо не збираємо персональні дані неповнолітніх.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">10. Зміни до цієї політики</h2>
        <p>Ми можемо час від часу оновлювати цю Політику конфіденційності. Зміни будуть опубліковані на цій сторінці з оновленою датою.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">11. Контакт</h2>
        <p>З питань конфіденційності: <strong>info@cryptotop.chat</strong></p>
      </section>
    </main>
  );
}
