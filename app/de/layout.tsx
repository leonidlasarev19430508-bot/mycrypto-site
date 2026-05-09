export const metadata = {
  title: "CryptoNavigator — Beste Krypto-Börsen 2026",
  description: "Vergleiche Binance, Bybit, OKX. KI-Nachrichtenanalyse, Live-Preise, Fear & Greed Index.",
  alternates: {
    canonical: 'https://cryptotop.chat/de',
    languages: {
      'uk': 'https://cryptotop.chat',
      'en': 'https://cryptotop.chat/en',
      'pl': 'https://cryptotop.chat/pl',
      'de': 'https://cryptotop.chat/de',
    },
  },
  openGraph: {
    title: "CryptoNavigator — Beste Krypto-Börsen 2026",
    description: "Vergleiche Binance, Bybit, OKX. KI-Nachrichtenanalyse, Live-Preise.",
    url: 'https://cryptotop.chat/de',
    siteName: 'CryptoNavigator',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function DELayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}