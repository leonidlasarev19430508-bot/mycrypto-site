import type { Metadata } from 'next';
import MethodologyPage from '../../components/MethodologyPage';

export const metadata: Metadata = {
  title: 'Exchange Rating Methodology — CryptoNavigator',
  description: 'How CryptoNavigator builds crypto exchange ratings: criteria, weights and limitations.',
  alternates: { canonical: 'https://cryptotop.chat/en/methodology' },
};

export default function Page() {
  return <MethodologyPage locale="en" />;
}