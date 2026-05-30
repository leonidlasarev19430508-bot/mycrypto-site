import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const EXCHANGES: Record<string, {
  name: string;
  logo: string;
  color: string;
  accentColor: string;
  founded: string;
  founder: string;
  headquarters: string;
  employees: string;
  coins: string;
  volume: string;
  users: string;
  fee: string;
  affiliate: string;
  description: string;
  history: { year: string; event: string }[];
  pros: string[];
  cons: string[];
  features: { icon: string; title: string; description: string }[];
  bonus: string;
  bonusDetails: string;
}> = {
  binance: {
    name: 'Binance',
    logo: '🟡',
    color: '#F0B90B',
    accentColor: '#F0B90B',
    founded: '2017',
    founder: 'Чанпен Чжао (CZ)',
    headquarters: 'Кайманові острови',
    employees: '8,000+',
    coins: '350+',
    volume: '$15B+/день',
    users: '170M+',
    fee: '0.1%',
    affiliate: 'https://www.binance.com/register?ref=Q5HR1JVW',
    description: 'Binance — найбільша криптовалютна біржа у світі за обсягом торгів. Заснована у 2017 році Чанпен Чжао, вона за рекордно короткий час стала домінуючою платформою у крипто-індустрії.',
    history: [
      { year: '2017', event: 'Заснування Binance. За 6 місяців стала найбільшою біржею за обсягом торгів.' },
      { year: '2018', event: 'Запуск Binance Chain та токену BNB. Відкриття офісів по всьому світу.' },
      { year: '2019', event: 'Запуск Binance US та Binance DEX — децентралізованої біржі.' },
      { year: '2020', event: 'Запуск Binance Smart Chain (BSC). Понад 500 проєктів на платформі.' },
      { year: '2021', event: 'Рекордний обсяг торгів — $76B за один день. 90M+ користувачів.' },
      { year: '2023', event: 'CZ пішов у відставку, новим CEO став Річард Тенг.' },
      { year: '2024', event: '170M+ користувачів. Найбільша біржа світу за всіма показниками.' },
    ],
    pros: ['Найнижчі комісії на ринку', 'Найбільша ліквідність', '350+ торгових пар', 'Українська підтримка', 'Стейкінг до 20%', 'Власний блокчейн BNB Chain'],
    cons: ['Складний інтерфейс для новачків', 'Регуляторні проблеми в деяких країнах'],
    features: [
      { icon: '💹', title: 'Спотова торгівля', description: 'Торгівля 350+ криптовалютами з комісіями 0.1%' },
      { icon: '📈', title: 'Ф\'ючерси', description: 'Торгівля з плечем до 125x на BTC та ETH' },
      { icon: '🏦', title: 'Стейкінг', description: 'Заробляй до 20% річних на своїх активах' },
      { icon: '🎨', title: 'NFT маркетплейс', description: 'Купуй та продавай NFT без комісії' },
      { icon: '💳', title: 'Binance Card', description: 'Крипто-картка для щоденних покупок' },
      { icon: '🔐', title: 'Холодне зберігання', description: '90% коштів у захищеному холодному гаманці' },
    ],
    bonus: 'До $600 USDT',
    bonusDetails: 'Бонус за реєстрацію + верифікацію KYC + перший депозит від $50',
  },
  mexc: {
    name: 'MEXC',
    logo: '🔷',
    color: '#2196F3',
    accentColor: '#00BCD4',
    founded: '2018',
    founder: 'Команда досвідчених трейдерів',
    headquarters: 'Сейшельські острови',
    employees: '1,000+',
    coins: '1500+',
    volume: '$2B+/день',
    users: '10M+',
    fee: '0%',
    affiliate: 'https://promote.mexc.com/r/q2p1TSAUnh',
    description: 'MEXC — популярна криптовалютна біржа з підтримкою гривні UAH та україномовним інтерфейсом. Відома найбільшим вибором альткоїнів та нульовою комісією на спотову торгівлю.',
    history: [
      { year: '2018', event: 'Заснування MEXC Global. Фокус на лістингу нових токенів.' },
      { year: '2019', event: 'Запуск торгівлі деривативами та маржинальної торгівлі.' },
      { year: '2020', event: 'Понад 200 торгових пар. Розширення на азійські ринки.' },
      { year: '2021', event: 'Запуск підтримки UAH. Понад 1000 торгових пар.' },
      { year: '2022', event: 'Нульова комісія на спот-торгівлю для всіх користувачів.' },
      { year: '2024', event: '10M+ користувачів. 1500+ монет. Лідер за кількістю лістингів.' },
    ],
    pros: ['Нульова комісія на спот', 'Підтримка гривні UAH', '1500+ монет', 'Україномовний інтерфейс', 'Швидкий лістинг нових токенів'],
    cons: ['Менша ліквідність ніж Binance', 'Менш відома в Європі'],
    features: [
      { icon: '🇺🇦', title: 'Українська підтримка', description: 'Повний україномовний інтерфейс та підтримка UAH' },
      { icon: '0️⃣', title: 'Нульова комісія', description: '0% комісія на всі спотові угоди' },
      { icon: '🪙', title: '1500+ монет', description: 'Найбільший вибір альткоїнів серед усіх бірж' },
      { icon: '⚡', title: 'Швидкий лістинг', description: 'Нові токени виходять першими на MEXC' },
      { icon: '📱', title: 'Мобільний додаток', description: 'Зручний додаток для iOS та Android' },
      { icon: '🎯', title: 'Лаунчпад', description: 'Ранній доступ до нових проєктів' },
    ],
    bonus: 'До $1,000 USDT',
    bonusDetails: 'Бонус за реєстрацію та перший депозит',
  },
  bybit: {
    name: 'Bybit',
    logo: '🔵',
    color: '#2F80ED',
    accentColor: '#56CCF2',
    founded: '2018',
    founder: 'Бен Чжоу',
    headquarters: 'Дубай, ОАЕ',
    employees: '2,500+',
    coins: '300+',
    volume: '$8B+/день',
    users: '30M+',
    fee: '0.1%',
    affiliate: 'https://www.bybit.com/register?ref=CRYPTONAV',
    description: 'Bybit — провідна криптовалютна біржа для активних трейдерів. Заснована у 2018 році, спеціалізується на деривативах та торгівлі з плечем до 100x.',
    history: [
      { year: '2018', event: 'Заснування Bybit. Фокус на деривативах та торгівлі з плечем.' },
      { year: '2019', event: 'Запуск USDT-маргінальних контрактів. Швидке зростання.' },
      { year: '2020', event: 'Понад 1M зареєстрованих користувачів. Запуск опціонів.' },
      { year: '2021', event: 'Запуск спотової торгівлі. 10M+ користувачів.' },
      { year: '2022', event: 'Переїзд до Дубаї. Отримання ліцензії VARA.' },
      { year: '2023', event: 'Запуск Copy Trading та Web3 гаманця.' },
      { year: '2024', event: '30M+ користувачів. Топ-3 біржа за обсягом деривативів.' },
    ],
    pros: ['Плече до 100x', 'Copy trading', 'Висока ліквідність', '24/7 підтримка', 'Великі бонуси для нових юзерів', 'Регульована біржа (VARA)'],
    cons: ['Складно для новачків', 'Фокус на деривативах'],
    features: [
      { icon: '📊', title: 'Деривативи', description: 'Торгівля деривативами з плечем до 100x' },
      { icon: '🤝', title: 'Copy Trading', description: 'Копіюй угоди найкращих трейдерів автоматично' },
      { icon: '🏆', title: 'Торгові турніри', description: 'Регулярні змагання з призовим фондом $1M+' },
      { icon: '💎', title: 'Launchpad', description: 'Ексклюзивний доступ до нових проєктів' },
      { icon: '🌐', title: 'Web3 гаманець', description: 'Вбудований некастодіальний Web3 гаманець' },
      { icon: '📱', title: 'Мобільний додаток', description: 'Повнофункціональний додаток для трейдингу' },
    ],
    bonus: 'До $30,000 USDT',
    bonusDetails: 'Пакет привітальних бонусів для нових трейдерів',
  },
  kucoin: {
    name: 'KuCoin',
    logo: '🟢',
    color: '#23AF91',
    accentColor: '#00C896',
    founded: '2017',
    founder: 'Майкл Ган та Джонні Лю',
    headquarters: 'Сейшельські острови',
    employees: '1,500+',
    coins: '700+',
    volume: '$1B+/день',
    users: '27M+',
    fee: '0.1%',
    affiliate: 'https://www.kucoin.com/r/rf/CXEPY4S5',
    description: 'KuCoin — народна біржа з найширшим вибором монет серед топових платформ. Заснована у 2017 році, відома раннім лістингом перспективних проєктів та широкими можливостями для пасивного заробітку.',
    history: [
      { year: '2017', event: 'Заснування KuCoin. Позиціонування як народна біржа.' },
      { year: '2018', event: 'Запуск KCS токену та програми розподілу прибутку.' },
      { year: '2019', event: 'Понад 200 торгових пар. Запуск маржинальної торгівлі.' },
      { year: '2020', event: 'Хакерський інцидент на $280M — всі кошти відшкодовано.' },
      { year: '2021', event: 'Залучення $150M інвестицій. Оцінка $10B.' },
      { year: '2022', event: 'Запуск KuCoin Win та NFT маркетплейсу.' },
      { year: '2024', event: '27M+ користувачів. 700+ монет. Лідер за різноманіттям активів.' },
    ],
    pros: ['700+ монет', 'Ранній лістинг нових токенів', 'Стейкінг та lending', 'Web3 інтеграція', 'KCS токен з вигодами'],
    cons: ['Менша ліквідність на деяких парах', 'Хакерський інцидент у минулому'],
    features: [
      { icon: '🪙', title: '700+ монет', description: 'Найбільший вибір серед топових бірж' },
      { icon: '🌱', title: 'Spotlight', description: 'Ранній доступ до нових перспективних проєктів' },
      { icon: '💰', title: 'Earning', description: 'Стейкінг, lending та yield farming' },
      { icon: '🤖', title: 'Trading Bot', description: 'Вбудовані торгові боти для автоматизації' },
      { icon: '🎯', title: 'KCS Holder', description: 'Власники KCS отримують частину прибутку біржі' },
      { icon: '🌐', title: 'Web3 гаманець', description: 'Мультичейн Web3 гаманець для DeFi' },
    ],
    bonus: 'До $500 USDT',
    bonusDetails: 'Бонус за реєстрацію та перший депозит від $50',
  },
  okx: {
    name: 'OKX',
    logo: '⚫',
    color: '#000000',
    accentColor: '#3772FF',
    founded: '2017',
    founder: 'Стар Сю',
    headquarters: 'Сейшельські острови',
    employees: '3,000+',
    coins: '300+',
    volume: '$5B+/день',
    users: '50M+',
    fee: '0.08%',
    affiliate: 'https://www.okx.com/join/CRYPTONAV',
    description: 'OKX — одна з найбільших криптовалютних бірж світу. Виділяється найнижчими комісіями на ринку, власним Web3 гаманцем та розвиненою екосистемою DeFi продуктів.',
    history: [
      { year: '2017', event: 'Заснування OKEx (пізніше перейменована на OKX).' },
      { year: '2018', event: 'Запуск торгівлі деривативами. Входження в топ-3 бірж.' },
      { year: '2020', event: 'Тимчасове призупинення виведень — відновлено через місяць.' },
      { year: '2021', event: 'Ребрендинг з OKEx на OKX. Фокус на Web3.' },
      { year: '2022', event: 'Запуск OKX Web3 гаманця та NFT маркетплейсу.' },
      { year: '2023', event: 'Партнерство з Manchester City. 50M+ користувачів.' },
      { year: '2024', event: 'Найнижчі комісії 0.08%. Лідер Web3 екосистеми.' },
    ],
    pros: ['Найнижчі комісії 0.08%', 'Кращий Web3 гаманець', 'Стейкінг до 20%', 'NFT маркетплейс', 'DeFi інтеграція', 'Велика ліквідність'],
    cons: ['Складний інтерфейс', 'Менш відомий в Україні'],
    features: [
      { icon: '💸', title: 'Комісії 0.08%', description: 'Найнижчі комісії серед топових бірж' },
      { icon: '🌐', title: 'Web3 гаманець', description: 'Найкращий мультичейн Web3 гаманець на ринку' },
      { icon: '🎨', title: 'NFT маркетплейс', description: 'Агрегатор NFT з усіх маркетплейсів' },
      { icon: '📈', title: 'Деривативи', description: 'Торгівля деривативами з плечем до 100x' },
      { icon: '🏦', title: 'Earn', description: 'Стейкінг та DeFi до 20% річних' },
      { icon: '⛓️', title: 'OKX Chain', description: 'Власний блокчейн для DeFi додатків' },
    ],
    bonus: 'Mystery Box до $10,000',
    bonusDetails: 'Mystery Box з шансом виграти до $10,000 USDT',
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ex = EXCHANGES[slug];
  if (!ex) return { title: 'Біржа не знайдена' };
  return {
    title: `${ex.name} — Огляд біржі 2026 | CryptoNavigator`,
    description: ex.description.slice(0, 160),
    alternates: { canonical: `https://cryptotop.chat/exchange/${slug}` },
  };
}

export function generateStaticParams() {
  return Object.keys(EXCHANGES).map(slug => ({ slug }));
}

export default async function ExchangePage({ params }: PageProps) {
  const { slug } = await params;
  const ex = EXCHANGES[slug];
  if (!ex) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* Hero */}
      <div className="rounded-3xl p-8 mb-10 text-white relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${ex.color}dd, ${ex.accentColor}99)` }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{ex.logo}</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-black">{ex.name}</h1>
              <p className="opacity-80 mt-1">Заснована {ex.founded} &bull; {ex.headquarters}</p>
            </div>
          </div>
          <p className="text-lg opacity-90 max-w-2xl leading-relaxed">{ex.description}</p>
          <a href={ex.affiliate} target="_blank" rel="noopener noreferrer"
            className="inline-block mt-6 bg-white text-gray-900 font-black px-8 py-3 rounded-2xl hover:scale-105 transition-transform text-sm">
            Зареєструватись на {ex.name} →
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Рік заснування', value: ex.founded, icon: '📅' },
          { label: 'Користувачів', value: ex.users, icon: '👥' },
          { label: 'Монет', value: ex.coins, icon: '🪙' },
          { label: 'Добовий обіг', value: ex.volume, icon: '📊' },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-black text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Bonus banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 mb-10 text-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide opacity-80 mb-1">Бонус за реєстрацію</p>
          <p className="text-3xl font-black">{ex.bonus}</p>
          <p className="text-orange-100 text-sm mt-1">{ex.bonusDetails}</p>
        </div>
        <a href={ex.affiliate} target="_blank" rel="noopener noreferrer"
          className="shrink-0 bg-white text-orange-600 font-black px-6 py-3 rounded-xl hover:bg-orange-50 transition text-sm whitespace-nowrap">
          Отримати бонус →
        </a>
      </div>

      {/* Features */}
      <div className="mb-10">
        <h2 className="text-2xl font-black text-gray-900 mb-6">Ключові можливості</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ex.features.map(f => (
            <div key={f.title} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{f.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900">{f.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{f.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <h3 className="font-black text-gray-900 mb-4">Переваги</h3>
          <ul className="space-y-2">
            {ex.pros.map(p => (
              <li key={p} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-500 font-bold">+</span> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <h3 className="font-black text-gray-900 mb-4">Недоліки</h3>
          <ul className="space-y-2">
            {ex.cons.map(c => (
              <li key={c} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-red-400 font-bold">-</span> {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* History */}
      <div className="mb-10">
        <h2 className="text-2xl font-black text-gray-900 mb-6">Історія {ex.name}</h2>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-orange-200" />
          <div className="space-y-6">
            {ex.history.map((item, i) => (
              <div key={i} className="flex gap-6 relative">
                <div className="shrink-0 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-xs z-10">
                  {item.year}
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-4 flex-1 shadow-sm">
                  <p className="text-sm text-gray-700">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info table */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-10 shadow-sm">
        <h2 className="text-xl font-black text-gray-900 mb-4">Основна інформація</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { label: 'Засновник', value: ex.founder },
            { label: 'Рік заснування', value: ex.founded },
            { label: 'Штаб-квартира', value: ex.headquarters },
            { label: 'Кількість співробітників', value: ex.employees },
            { label: 'Комісія спот', value: ex.fee },
            { label: 'Кількість монет', value: ex.coins },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-400">{label}</span>
              <span className="text-sm font-bold text-gray-900">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-gray-900 rounded-3xl p-10 text-white">
        <p className="text-3xl font-black mb-2">Готовий почати?</p>
        <p className="text-gray-400 mb-6">Зареєструйся на {ex.name} і отримай бонус {ex.bonus}</p>
        <a href={ex.affiliate} target="_blank" rel="noopener noreferrer"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-black px-10 py-4 rounded-2xl transition text-lg">
          Зареєструватись на {ex.name} →
        </a>
        <p className="text-xs text-gray-500 mt-4">Реєстрація безкоштовна. Не є фінансовою порадою.</p>
      </div>

    </div>
  );
}
