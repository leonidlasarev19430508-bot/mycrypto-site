export const metadata = {
  title: "CryptoNavigator — Najlepsze Giełdy Krypto 2026",
  description: "Porównaj Binance, Bybit, OKX. Analiza wiadomości AI, ceny na żywo, Indeks Strachu i Chciwości.",
  alternates: {
    canonical: 'https://cryptotop.chat/pl',
    languages: {
      'uk': 'https://cryptotop.chat',
      'en': 'https://cryptotop.chat/en',
      'pl': 'https://cryptotop.chat/pl',
      'de': 'https://cryptotop.chat/de',
    },
  },
  openGraph: {
    title: "CryptoNavigator — Najlepsze Giełdy Krypto 2026",
    description: "Porównaj Binance, Bybit, OKX. Analiza wiadomości AI, ceny na żywo.",
    url: 'https://cryptotop.chat/pl',
    siteName: 'CryptoNavigator',
    locale: 'pl_PL',
    type: 'website',
  },
};

export default function PLLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}