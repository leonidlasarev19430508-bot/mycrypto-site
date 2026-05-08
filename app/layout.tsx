import ClientHeader from './components/ClientHeader';
import "./globals.css";

export const metadata = {
  title: "CryptoNavigator — Кращі Крипто-Біржі 2026",
  description: "Порівняй Binance, Bybit, OKX. AI-аналіз новин, live ціни, Fear & Greed Index.",
  verification: {
    google: "TlsKtc6ADSMKIRsPoP6Cenvenlw5TsN16Kly2lpSFmo",
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