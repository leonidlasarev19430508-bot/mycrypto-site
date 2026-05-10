import ClientHeader from './components/ClientHeader';
import "./globals.css";

export const metadata = {
  title: "CryptoNavigator — Кращі Крипто-Біржі 2026",
  description: "Порівняй Binance, Bybit, OKX. AI-аналіз новин, live ціни, Fear & Greed Index. Почни торгувати сьогодні.",
  verification: {
    google: "TlsKtc6ADSMKIRsPoP6Cenvenlw5TsN16Kly2lpSFmo",
  },
  alternates: {
    canonical: 'https://cryptotop.chat',
    languages: {
      'uk': 'https://cryptotop.chat',
      'en': 'https://cryptotop.chat/en',
      'pl': 'https://cryptotop.chat/pl',
      'de': 'https://cryptotop.chat/de',
    },
  },
  openGraph: {
    title: "CryptoNavigator — Кращі Крипто-Біржі 2026",
    description: "Порівняй Binance, Bybit, OKX. AI-аналіз новин, live ціни, Fear & Greed Index.",
    url: 'https://cryptotop.chat',
    siteName: 'CryptoNavigator',
    locale: 'uk_UA',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'CryptoNavigator',
  url: 'https://cryptotop.chat',
  description: 'Порівняй Binance, Bybit, OKX. AI-аналіз новин, live ціни, Fear & Greed Index.',
  inLanguage: ['uk', 'en', 'pl', 'de'],
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://cryptotop.chat/news',
    'query-input': 'required name=search_term_string',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Що таке криптовалюта?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Криптовалюта — це цифрова валюта, яка використовує криптографію для захисту транзакцій. Найвідоміша — Bitcoin (BTC), створений у 2009 році.',
      },
    },
    {
      '@type': 'Question',
      name: 'З якої біржі краще почати новачку?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Для початківців найкраще підходять Binance або WhiteBIT. Binance — найбільша біржа світу. WhiteBIT — українська біржа з простим інтерфейсом.',
      },
    },
    {
      '@type': 'Question',
      name: 'Скільки грошей потрібно для старту?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Починати можна з будь-якої суми — навіть з $10-20. Більшість бірж не мають мінімального депозиту.',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="bg-gray-50 text-gray-900">
        <ClientHeader />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-100 text-gray-600 text-center py-6 mt-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-6">
              <iframe
                data-aa='2437186'
                src='//ad.a-ads.com/2437186/?size=300x250'
                style={{border:0, padding:0, width:'300px', height:'250px', overflow:'hidden', display:'block', margin:'auto'}}
              />
            </div>
            <p>© 2026 CryptoNavigator. AI-powered crypto insights.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}