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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body className="bg-gray-50 text-gray-900">
        <ClientHeader />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-100 text-gray-600 text-center py-6 mt-12">
          <div className="max-w-6xl mx-auto px-4">
            <p>© 2026 CryptoNavigator. AI-powered crypto insights.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}