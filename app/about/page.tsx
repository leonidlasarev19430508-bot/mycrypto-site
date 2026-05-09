import Link from 'next/link';

export const metadata = {
  title: "Про нас — CryptoNavigator",
  description: "CryptoNavigator — AI-платформа для порівняння криптобірж. Дізнайся більше про наш проект та місію.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/" className="text-blue-600 hover:underline text-sm mb-6 inline-block">← На головну</Link>

      <h1 className="text-4xl font-bold text-gray-900 mb-6">🚀 Про CryptoNavigator</h1>

      <div className="space-y-8 text-gray-700 leading-relaxed">

        <div className="bg-blue-50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">🎯 Наша місія</h2>
          <p>CryptoNavigator — це AI-платформа яка допомагає людям зробити правильний вибір у світі криптовалют. Ми порівнюємо біржі, аналізуємо новини та надаємо персональні рекомендації на основі штучного інтелекту.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">💡 Що ми пропонуємо</h2>
          <ul className="space-y-3">
            {[
              { icon: '🤖', title: 'AI-аналіз новин', desc: 'Автоматичний аналіз крипто-новин з 4 провідних джерел. Sentiment аналіз та рекомендації оновлюються кожні 6 годин.' },
              { icon: '🏆', title: 'Порівняння бірж', desc: 'Детальний порівняльний аналіз Binance, Bybit, OKX, WhiteBIT за комісіями, надійністю та зручністю.' },
              { icon: '🎯', title: 'Персональний квіз', desc: 'Відповідай на 5 питань і отримай персональну рекомендацію біржі яка підходить саме тобі.' },
              { icon: '💬', title: 'CryptoBot', desc: 'AI-консультант на базі Claude від Anthropic. Відповідає на будь-які питання про крипту 24/7.' },
              { icon: '📈', title: 'Live ціни', desc: 'Актуальні ціни BTC, ETH, SOL та графіки за 7 днів в реальному часі.' },
              { icon: '😨', title: 'Fear & Greed Index', desc: 'Індекс страху та жадібності — ключовий індикатор настрою ринку.' },
            ].map(item => (
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
          <h2 className="text-xl font-bold text-gray-900 mb-3">🌍 Мови</h2>
          <p className="mb-3">Сайт доступний на 4 мовах для максимального охоплення аудиторії:</p>
          <div className="flex flex-wrap gap-3">
            {[
              { flag: '🇺🇦', lang: 'Українська', href: '/' },
              { flag: '🇬🇧', lang: 'English', href: '/en' },
              { flag: '🇵🇱', lang: 'Polski', href: '/pl' },
              { flag: '🇩🇪', lang: 'Deutsch', href: '/de' },
            ].map(l => (
              <Link key={l.lang} href={l.href}
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 hover:border-blue-400 transition">
                <span>{l.flag}</span>
                <span className="text-sm font-medium">{l.lang}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-orange-50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">⚡ Технології</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              'Next.js 16 + TypeScript',
              'Tailwind CSS',
              'Claude AI (Anthropic)',
              'PostgreSQL (Neon)',
              'Railway (хостинг)',
              'n8n (автоматизація)',
              'CoinGecko API',
              'Chart.js',
            ].map(tech => (
              <div key={tech} className="bg-white rounded-lg px-3 py-2 text-sm text-gray-700 border border-orange-100">
                ✓ {tech}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-3">Готовий почати?</h2>
          <p className="text-blue-200 mb-6">Пройди квіз і знайди свою ідеальну біржу за 2 хвилини</p>
          <Link href="/" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition">
            🎯 Пройти квіз →
          </Link>
        </div>

      </div>
    </div>
  );
}