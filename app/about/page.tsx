import Link from 'next/link';

export const metadata = {
  title: "Про нас — CryptoNavigator | AI-платформа для крипто-інвесторів",
  description: "CryptoNavigator — AI-платформа для порівняння Binance, Bybit, OKX, WhiteBIT. Аналіз новин, live ціни, Fear & Greed Index та персональний AI-консультант 24/7.",
};

const CONTENT = {
  uk: {
    back: '← На головну',
    title: '🚀 Про CryptoNavigator',
    mission: { title: '🎯 Наша місія', text: 'CryptoNavigator — це AI-платформа яка допомагає людям зробити правильний вибір у світі криптовалют. Ми порівнюємо біржі, аналізуємо новини та надаємо персональні рекомендації на основі штучного інтелекту.' },
    featuresTitle: '💡 Що ми пропонуємо',
    features: [
      { icon: '🤖', title: 'AI-аналіз новин', desc: 'Автоматичний аналіз крипто-новин з 4 провідних джерел. Оновлюється кожні 6 годин.' },
      { icon: '🏆', title: 'Порівняння бірж', desc: 'Детальний аналіз Binance, Bybit, OKX, WhiteBIT за комісіями та надійністю.' },
      { icon: '🎯', title: 'Персональний квіз', desc: 'Відповідай на 5 питань і отримай персональну рекомендацію біржі.' },
      { icon: '💬', title: 'CryptoBot', desc: 'AI-консультант на базі Claude від Anthropic. Відповідає 24/7.' },
      { icon: '📈', title: 'Live ціни', desc: 'Актуальні ціни BTC, ETH, SOL та графіки за 7 днів.' },
      { icon: '😨', title: 'Fear & Greed Index', desc: 'Ключовий індикатор настрою ринку в реальному часі.' },
    ],
    langsTitle: '🌍 Мови',
    techTitle: '⚡ Технології',
    ctaTitle: 'Готовий почати?',
    ctaDesc: 'Пройди квіз і знайди свою ідеальну біржу за 2 хвилини',
    ctaBtn: '🎯 Пройти квіз →',
  },
  en: {
    back: '← Back to Home',
    title: '🚀 About CryptoNavigator',
    mission: { title: '🎯 Our Mission', text: 'CryptoNavigator is an AI-powered platform that helps people make the right choices in the world of cryptocurrency. We compare exchanges, analyze news, and provide personalized recommendations based on artificial intelligence.' },
    featuresTitle: '💡 What We Offer',
    features: [
      { icon: '🤖', title: 'AI News Analysis', desc: 'Automatic crypto news analysis from 4 leading sources. Updated every 6 hours.' },
      { icon: '🏆', title: 'Exchange Comparison', desc: 'Detailed analysis of Binance, Bybit, OKX, WhiteBIT by fees and reliability.' },
      { icon: '🎯', title: 'Personal Quiz', desc: 'Answer 5 questions and get a personalized exchange recommendation.' },
      { icon: '💬', title: 'CryptoBot', desc: 'AI consultant powered by Claude from Anthropic. Available 24/7.' },
      { icon: '📈', title: 'Live Prices', desc: 'Real-time BTC, ETH, SOL prices and 7-day charts.' },
      { icon: '😨', title: 'Fear & Greed Index', desc: 'Key market sentiment indicator in real time.' },
    ],
    langsTitle: '🌍 Languages',
    techTitle: '⚡ Technologies',
    ctaTitle: 'Ready to start?',
    ctaDesc: 'Take the quiz and find your ideal exchange in 2 minutes',
    ctaBtn: '🎯 Take the quiz →',
  },
  pl: {
    back: '← Powrót do strony głównej',
    title: '🚀 O CryptoNavigator',
    mission: { title: '🎯 Nasza misja', text: 'CryptoNavigator to platforma AI, która pomaga ludziom dokonać właściwego wyboru w świecie kryptowalut. Porównujemy giełdy, analizujemy wiadomości i zapewniamy spersonalizowane rekomendacje oparte na sztucznej inteligencji.' },
    featuresTitle: '💡 Co oferujemy',
    features: [
      { icon: '🤖', title: 'Analiza wiadomości AI', desc: 'Automatyczna analiza wiadomości krypto z 4 wiodących źródeł. Aktualizowana co 6 godzin.' },
      { icon: '🏆', title: 'Porównanie giełd', desc: 'Szczegółowa analiza Binance, Bybit, OKX, WhiteBIT pod względem prowizji i niezawodności.' },
      { icon: '🎯', title: 'Osobisty quiz', desc: 'Odpowiedz na 5 pytań i uzyskaj spersonalizowaną rekomendację giełdy.' },
      { icon: '💬', title: 'CryptoBot', desc: 'Konsultant AI oparty na Claude od Anthropic. Dostępny 24/7.' },
      { icon: '📈', title: 'Ceny na żywo', desc: 'Aktualne ceny BTC, ETH, SOL i wykresy 7-dniowe.' },
      { icon: '😨', title: 'Indeks Strachu i Chciwości', desc: 'Kluczowy wskaźnik nastrojów rynkowych w czasie rzeczywistym.' },
    ],
    langsTitle: '🌍 Języki',
    techTitle: '⚡ Technologie',
    ctaTitle: 'Gotowy do startu?',
    ctaDesc: 'Przejdź quiz i znajdź swoją idealną giełdę w 2 minuty',
    ctaBtn: '🎯 Przejdź quiz →',
  },
  de: {
    back: '← Zurück zur Startseite',
    title: '🚀 Über CryptoNavigator',
    mission: { title: '🎯 Unsere Mission', text: 'CryptoNavigator ist eine KI-gestützte Plattform, die Menschen hilft, die richtigen Entscheidungen in der Welt der Kryptowährungen zu treffen. Wir vergleichen Börsen, analysieren Nachrichten und geben personalisierte Empfehlungen auf Basis künstlicher Intelligenz.' },
    featuresTitle: '💡 Was wir anbieten',
    features: [
      { icon: '🤖', title: 'KI-Nachrichtenanalyse', desc: 'Automatische Krypto-Nachrichtenanalyse aus 4 führenden Quellen. Alle 6 Stunden aktualisiert.' },
      { icon: '🏆', title: 'Börsenvergleich', desc: 'Detaillierte Analyse von Binance, Bybit, OKX, WhiteBIT nach Gebühren und Zuverlässigkeit.' },
      { icon: '🎯', title: 'Persönliches Quiz', desc: 'Beantworte 5 Fragen und erhalte eine personalisierte Börsenempfehlung.' },
      { icon: '💬', title: 'CryptoBot', desc: 'KI-Berater auf Basis von Claude von Anthropic. Verfügbar 24/7.' },
      { icon: '📈', title: 'Live-Preise', desc: 'Aktuelle BTC, ETH, SOL Preise und 7-Tage-Charts.' },
      { icon: '😨', title: 'Fear & Greed Index', desc: 'Wichtiger Marktstimmungsindikator in Echtzeit.' },
    ],
    langsTitle: '🌍 Sprachen',
    techTitle: '⚡ Technologien',
    ctaTitle: 'Bereit anzufangen?',
    ctaDesc: 'Mache das Quiz und finde deine ideale Börse in 2 Minuten',
    ctaBtn: '🎯 Quiz starten →',
  },
};

const LANGUAGES = [
  { flag: '🇺🇦', lang: 'Українська', href: '/' },
  { flag: '🇬🇧', lang: 'English', href: '/en' },
  { flag: '🇵🇱', lang: 'Polski', href: '/pl' },
  { flag: '🇩🇪', lang: 'Deutsch', href: '/de' },
];

const TECHS = ['Next.js 16 + TypeScript', 'Tailwind CSS', 'Claude AI (Anthropic)', 'PostgreSQL (Neon)', 'Railway (hosting)', 'n8n (automation)', 'CoinGecko API', 'Chart.js'];

export default function AboutPage({ locale = 'uk' }: { locale?: string }) {
  const lang = (locale in CONTENT) ? locale as keyof typeof CONTENT : 'uk';
  const c = CONTENT[lang];
  const homeHref = lang === 'uk' ? '/' : `/${lang}`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href={homeHref} className="text-blue-600 hover:underline text-sm mb-6 inline-block">{c.back}</Link>
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{c.title}</h1>
      <div className="space-y-8 text-gray-700 leading-relaxed">

        <div className="bg-blue-50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{c.mission.title}</h2>
          <p>{c.mission.text}</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">{c.featuresTitle}</h2>
          <ul className="space-y-3">
            {c.features.map(item => (
              <li key={item.title} className="flex gap-4 bg-white rounded-xl p-4 border border-gray-100">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{c.langsTitle}</h2>
          <div className="flex flex-wrap gap-3">
            {LANGUAGES.map(l => (
              <Link key={l.lang} href={l.href}
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 hover:border-blue-400 transition">
                <span>{l.flag}</span>
                <span className="text-sm font-medium">{l.lang}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-orange-50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{c.techTitle}</h2>
          <div className="grid grid-cols-2 gap-3">
            {TECHS.map(tech => (
              <div key={tech} className="bg-white rounded-lg px-3 py-2 text-sm text-gray-700 border border-orange-100">
                ✓ {tech}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-3">{c.ctaTitle}</h2>
          <p className="text-blue-200 mb-6">{c.ctaDesc}</p>
          <Link href={homeHref} className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition">
            {c.ctaBtn}
          </Link>
        </div>

      </div>
    </div>
  );
}