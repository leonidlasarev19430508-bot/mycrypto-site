import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Крипто ринки — Настрій ринку та ціни в реальному часі | CryptoNavigator',
  description: 'Аналіз настрою ринку криптовалют, індекс Fear & Greed, ціни Bitcoin, Ethereum, Solana та інших топових монет.',
  alternates: {
    canonical: '/markets',
    languages: {
      'uk': '/markets',
      'en': '/en/markets',
      'pl': '/pl/markets',
      'de': '/de/markets',
    },
  },
};

export default function MarketsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}