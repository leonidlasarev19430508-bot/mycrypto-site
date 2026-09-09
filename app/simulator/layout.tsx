import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Крипто симулятор торгівлі — Безризиковий тренажер для початківців | CryptoNavigator',
  description: 'Торгуйте на реальних цінах без ризику втратити гроші. Безкоштовний симулятор криптовалютної торгівлі з віртуальним балансом $10,000.',
  alternates: {
    canonical: '/simulator',
    languages: {
      'uk': '/simulator',
      'en': '/en/simulator',
      'pl': '/pl/simulator',
      'de': '/de/simulator',
    },
  },
};

export default function SimulatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}