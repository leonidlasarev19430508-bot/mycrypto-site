import Link from 'next/link';

export const metadata = {
  title: "Крипто Лікбез — Навчання для початківців | CryptoNavigator",
  description: "Дізнайся все про криптовалюти з нуля. Що таке Bitcoin, як купити крипту, що таке гаманець, блокчейн та DeFi — простими словами.",
};

const LESSONS = [
  {
    id: 'what-is-crypto',
    emoji: '🪙',
    title: 'Що таке криптовалюта?',
    level: 'Початківець',
    duration: '5 хв',
    color: 'from-blue-500 to-blue-600',
    content: [
      { type: 'text', text: 'Криптовалюта — це цифрові гроші, які існують тільки в інтернеті. На відміну від звичайних грошей (гривня, долар), ними не керує жоден банк чи уряд.' },
      { type: 'highlight', text: '💡 Простий приклад: Уяви що у тебе є цифровий золотий злиток, який можна надіслати будь-кому у світі за лічені секунди без банку.' },
      { type: 'text', text: 'Bitcoin (BTC) — перша і найвідоміша криптовалюта, створена у 2009 році анонімним розробником під псевдонімом Сатоші Накамото. Сьогодні існує понад 20,000 різних криптовалют.' },
      { type: 'list', title: 'Головні характеристики:', items: ['Децентралізація — немає єдиного контролера', 'Прозорість — всі транзакції публічні', 'Безпека — захищено криптографією', 'Глобальність — працює у будь-якій країні'] },
    ],
  },
  {
    id: 'what-is-blockchain',
    emoji: '⛓️',
    title: 'Що таке блокчейн?',
    level: 'Початківець',
    duration: '7 хв',
    color: 'from-purple-500 to-purple-600',
    content: [
      { type: 'text', text: 'Блокчейн — це публічна база даних, в якій зберігаються всі транзакції криптовалюти. Уяви величезну книгу обліку, копія якої є у мільйонів комп\'ютерів по всьому світу.' },
      { type: 'highlight', text: '💡 Аналогія: Блокчейн — як Google Docs, до якого мають доступ мільйони людей. Жоден не може підробити запис, бо всі інші одразу це побачать.' },
      { type: 'list', title: 'Як це працює:', items: ['Транзакція створюється і надсилається в мережу', 'Тисячі комп\'ютерів (майнери) перевіряють її', 'Підтверджена транзакція записується в "блок"', 'Блок додається до ланцюжка — це і є блокчейн'] },
      { type: 'text', text: 'Завдяки блокчейну неможливо підробити транзакцію або "надрукувати" зайві Bitcoin — правила записані в коді.' },
    ],
  },
  {
    id: 'how-to-buy',
    emoji: '💳',
    title: 'Як купити першу крипту?',
    level: 'Початківець',
    duration: '10 хв',
    color: 'from-green-500 to-green-600',
    content: [
      { type: 'text', text: 'Купити криптовалюту сьогодні так само просто як купити щось в інтернет-магазині. Найпростіший спосіб — через криптовалютну біржу.' },
      { type: 'list', title: 'Крок за кроком:', items: ['Вибери біржу (Binance або WhiteBIT для початківців)', 'Зареєструйся і пройди верифікацію (паспорт/ID)', 'Поповни рахунок (карткою, банківським переказом)', 'Вибери криптовалюту і купи'] },
      { type: 'highlight', text: '⚠️ Порада: Починай з невеликих сум — $20-50. Крипторинок волатильний, інвестуй тільки те, що готовий втратити.' },
      { type: 'text', text: 'Для українців найзручніша WhiteBIT — підтримує гривню і не потребує складної верифікації. Binance — найбільша біржа світу з максимальними можливостями.' },
    ],
  },
  {
    id: 'wallets',
    emoji: '👛',
    title: 'Що таке криптогаманець?',
    level: 'Початківець',
    duration: '8 хв',
    color: 'from-orange-500 to-orange-600',
    content: [
      { type: 'text', text: 'Криптогаманець — це не місце де зберігається крипта (вона зберігається в блокчейні), а ключ доступу до неї. Як ключ від банківського сейфу.' },
      { type: 'list', title: 'Типи гаманців:', items: ['Гарячий гаманець (на біржі) — зручний, але менш безпечний', 'Програмний гаманець (MetaMask) — на комп\'ютері/телефоні', 'Апаратний гаманець (Ledger) — найбезпечніший, як флешка'] },
      { type: 'highlight', text: '🔑 Найважливіше: Seed-фраза (12-24 слова) — єдиний спосіб відновити доступ. Ніколи не діліться нею з кимось і зберігайте офлайн!' },
      { type: 'text', text: 'Для новачків: зберігай невеликі суми на біржі, великі — на апаратному гаманці.' },
    ],
  },
  {
    id: 'btc-vs-eth',
    emoji: '⚔️',
    title: 'Bitcoin vs Ethereum',
    level: 'Середній',
    duration: '8 хв',
    color: 'from-yellow-500 to-orange-500',
    content: [
      { type: 'text', text: 'Bitcoin і Ethereum — дві найбільші криптовалюти, але з різними цілями.' },
      { type: 'list', title: 'Bitcoin (BTC):', items: ['Створений у 2009 році', '"Цифрове золото" — засіб збереження вартості', 'Обмежена кількість: лише 21 мільйон BTC', 'Простий і надійний'] },
      { type: 'list', title: 'Ethereum (ETH):', items: ['Створений у 2015 році', 'Платформа для смарт-контрактів і додатків', 'Основа для DeFi, NFT, Web3', 'Більш технологічний'] },
      { type: 'highlight', text: '💡 Простий висновок: BTC — це цифрове золото для збереження. ETH — це цифрова нафта для роботи додатків.' },
    ],
  },
  {
    id: 'defi',
    emoji: '🌐',
    title: 'Що таке DeFi?',
    level: 'Середній',
    duration: '10 хв',
    color: 'from-teal-500 to-teal-600',
    content: [
      { type: 'text', text: 'DeFi (Decentralized Finance — децентралізовані фінанси) — це фінансові послуги без банків і посередників, що працюють на блокчейні.' },
      { type: 'list', title: 'Що можна робити в DeFi:', items: ['Позичати криптовалюту і отримувати відсотки', 'Брати кредит під заставу крипти', 'Торгувати на децентралізованих біржах (DEX)', 'Заробляти на надданні ліквідності (yield farming)'] },
      { type: 'highlight', text: '⚠️ Ризики DeFi: смарт-контракти можуть містити баги, немає страхування як в банках. Починай з малих сум і перевіряй проекти.' },
      { type: 'text', text: 'Найвідоміші DeFi платформи: Uniswap, Aave, Compound, MakerDAO.' },
    ],
  },
  {
    id: 'staking',
    emoji: '💰',
    title: 'Стейкінг — пасивний дохід',
    level: 'Середній',
    duration: '7 хв',
    color: 'from-pink-500 to-pink-600',
    content: [
      { type: 'text', text: 'Стейкінг — це заробіток на криптовалюті без активної торгівлі. Ти "заморожуєш" свої монети на певний час і отримуєш відсотки.' },
      { type: 'highlight', text: '💡 Аналогія: Стейкінг — як банківський депозит, тільки з вищими відсотками (5-20% річних) і без банку.' },
      { type: 'list', title: 'Де стейкувати:', items: ['На біржі (Binance Earn, WhiteBIT) — найпростіше', 'В гаманці (MetaMask) — більше контролю', 'В DeFi протоколах — найвищі відсотки але ризики'] },
      { type: 'text', text: 'Популярні монети для стейкінгу: ETH (4-5%), SOL (6-8%), ADA (4-6%), DOT (10-12%).' },
    ],
  },
  {
    id: 'security',
    emoji: '🔒',
    title: 'Безпека в крипті',
    level: 'Важливо',
    duration: '10 хв',
    color: 'from-red-500 to-red-600',
    content: [
      { type: 'text', text: 'Безпека — найважливіше в криптовалютах. На відміну від банку, тут немає служби підтримки яка поверне вкрадені кошти.' },
      { type: 'list', title: '10 правил безпеки:', items: ['Ніколи не діліться seed-фразою', 'Використовуй 2FA (Google Authenticator)', 'Унікальний пароль для кожної біржі', 'Перевіряй URL сайтів — фішинг дуже поширений', 'Не клікай на підозрілі посилання', 'Зберігай великі суми на апаратному гаманці', 'Перевіряй адресу перед відправкою', 'Не довіряй "гарантованим" прибуткам', 'Увімкни антифішинговий код на біржі', 'Регулярно оновлюй паролі'] },
      { type: 'highlight', text: '🚨 Найпоширеніші шахрайства: фейкові біржі, "подарунки" від знаменитостей, схеми Понці, фішингові листи.' },
    ],
  },
];

const LEVEL_COLORS: Record<string, string> = {
  'Початківець': 'bg-green-100 text-green-700',
  'Середній': 'bg-blue-100 text-blue-700',
  'Важливо': 'bg-red-100 text-red-700',
};

function LessonContent({ content }: { content: typeof LESSONS[0]['content'] }) {
  return (
    <div className="space-y-4">
      {content.map((block, i) => {
        if (block.type === 'text') return (
          <p key={i} className="text-gray-700 leading-relaxed">{block.text}</p>
        );
        if (block.type === 'highlight') return (
          <div key={i} className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-xl">
            <p className="text-blue-800 leading-relaxed">{block.text}</p>
          </div>
        );
        if (block.type === 'list') return (
          <div key={i}>
            {block.title && <p className="font-semibold text-gray-900 mb-2">{block.title}</p>}
            <ul className="space-y-2">
              {block.items?.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
        return null;
      })}
    </div>
  );
}

export default function LearnPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/" className="text-blue-600 hover:underline text-sm mb-6 inline-block">← На головну</Link>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">📚 Крипто Лікбез</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">Все що потрібно знати про криптовалюти — від основ до практики. Простими словами, без зайвого жаргону.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {LESSONS.map(lesson => (
          <a key={lesson.id} href={`#${lesson.id}`}
            className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition hover:border-blue-300 group">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${lesson.color} flex items-center justify-center text-2xl mb-3`}>
              {lesson.emoji}
            </div>
            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition mb-2">{lesson.title}</h3>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LEVEL_COLORS[lesson.level]}`}>{lesson.level}</span>
              <span className="text-xs text-gray-400">⏱ {lesson.duration}</span>
            </div>
          </a>
        ))}
      </div>

      <div className="space-y-12">
        {LESSONS.map(lesson => (
          <div key={lesson.id} id={lesson.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden scroll-mt-6">
            <div className={`bg-gradient-to-r ${lesson.color} p-6`}>
              <div className="flex items-center gap-4">
                <span className="text-4xl">{lesson.emoji}</span>
                <div>
                  <h2 className="text-2xl font-bold text-white">{lesson.title}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-white/80 text-sm">{lesson.level}</span>
                    <span className="text-white/60 text-sm">•</span>
                    <span className="text-white/80 text-sm">⏱ {lesson.duration}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <LessonContent content={lesson.content} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Готовий почати торгівлю?</h2>
        <p className="text-blue-200 mb-6">Пройди квіз і знайди ідеальну біржу для себе</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition">
            🎯 Пройти квіз →
          </Link>
          <Link href="/faq" className="bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-3 rounded-xl transition">
            ❓ FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}