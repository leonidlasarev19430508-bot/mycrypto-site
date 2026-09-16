import type { Metadata } from 'next';
import MethodologyPage from '../../components/MethodologyPage';

export const metadata: Metadata = {
  title: 'Methodik der Börsenbewertung — CryptoNavigator',
  description: 'Wie CryptoNavigator Kryptobörsen-Bewertungen erstellt: Kriterien, Gewichtung und Grenzen.',
  alternates: { canonical: 'https://cryptotop.chat/de/methodology' },
};

export default function Page() {
  return <MethodologyPage locale="de" />;
}