import ClientHeader from './components/ClientHeader';
import WelcomeBubble from './components/WelcomeBubble';
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
  twitter: {
    card: 'summary_large_image',
    title: 'CryptoNavigator — Кращі Крипто-Біржі 2026',
    description: 'Порівняй Binance, Bybit, OKX. AI-аналіз новин, live ціни, Fear & Greed Index.',
    images: ['https://cryptotop.chat/avatar-robot.png'],
  },
  openGraph: {
    title: "CryptoNavigator — Кращі Крипто-Біржі 2026",
    description: "Порівняй Binance, Bybit, OKX. AI-аналіз новин, live ціни, Fear & Greed Index.",
    url: 'https://cryptotop.chat',
    siteName: 'CryptoNavigator',
    locale: 'uk_UA',
    type: 'website',
    images: [{ url: 'https://cryptotop.chat/avatar-robot.png', width: 400, height: 400, alt: 'CryptoNavigator' }],
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

const exchangesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Кращі крипто-біржі 2026',
  description: 'Порівняння найкращих криптовалютних бірж за комісіями, надійністю та зручністю',
  url: 'https://cryptotop.chat',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'FinancialService',
        name: 'Binance',
        description: 'Найбільша криптовалютна біржа у світі з низькими комісіями 0.1%',
        url: 'https://www.binance.com/register?ref=GRO_28502_BIO0R',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          bestRating: '5',
          worstRating: '1',
          reviewCount: '45230',
        },
        offers: {
          '@type': 'Offer',
          price: '0.1',
          priceCurrency: 'USD',
          description: 'Комісія за спот-торгівлю',
        },
        areaServed: ['UA', 'PL', 'DE', 'GB'],
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'FinancialService',
        name: 'Bybit',
        description: 'Провідна біржа для активних трейдерів з плечем до 100x',
        url: 'https://www.bybit.com/register',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.6',
          bestRating: '5',
          worstRating: '1',
          reviewCount: '28150',
        },
        offers: {
          '@type': 'Offer',
          price: '0.1',
          priceCurrency: 'USD',
          description: 'Комісія за спот-торгівлю',
        },
        areaServed: ['UA', 'PL', 'DE', 'GB'],
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'FinancialService',
        name: 'OKX',
        description: 'Сучасна біржа з Web3 інтеграцією та стейкінгом до 20%',
        url: 'https://www.okx.com/join/CRYPTONAV',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.5',
          bestRating: '5',
          worstRating: '1',
          reviewCount: '19800',
        },
        offers: {
          '@type': 'Offer',
          price: '0.08',
          priceCurrency: 'USD',
          description: 'Комісія за спот-торгівлю',
        },
        areaServed: ['UA', 'PL', 'DE', 'GB'],
      },
    },
  ],
};

const GA_ID = 'G-WK4PW4T4R3';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <head>
        {/* Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                document.querySelectorAll('a[href*="binance.com"], a[href*="bybit.com"], a[href*="okx.com"], a[href*="whitebit.com"]').forEach(function(link) {
                  link.addEventListener('click', function() {
                    var exchange = link.href.includes('binance') ? 'Binance'
                      : link.href.includes('bybit') ? 'Bybit'
                      : link.href.includes('okx') ? 'OKX'
                      : 'WhiteBIT';
                    gtag('event', 'exchange_click', {
                      'exchange_name': exchange,
                      'page_location': window.location.pathname
                    });
                  });
                });
                var subscribeForm = document.querySelector('form');
                if (subscribeForm) {
                  subscribeForm.addEventListener('submit', function() {
                    gtag('event', 'subscribe_submit', {
                      'page_location': window.location.pathname
                    });
                  });
                }
              });
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(exchangesJsonLd) }}
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
        {/* Welcome Bubble — AI асистент */}
        <WelcomeBubble />
      </body>
    </html>
  );
}
