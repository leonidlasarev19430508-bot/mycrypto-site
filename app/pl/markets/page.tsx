import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Rynki Krypto — Ceny Bitcoin i Top 100 Monet 2026 | CryptoNavigator",
  description: "Aktualne ceny kryptowalut w czasie rzeczywistym. Bitcoin, Ethereum, BNB, Solana i top 100 monet. Wykresy, kapitalizacja rynkowa, zmiany cen w ciągu 24 godzin.",
  alternates: { canonical: "https://cryptotop.chat/pl/markets" },
};

export { default } from '../../markets/page';
