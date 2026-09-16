import type { Metadata } from 'next';
import MethodologyPage from '../../components/MethodologyPage';

export const metadata: Metadata = {
  title: 'Metodyka oceny giełd — CryptoNavigator',
  description: 'Jak CryptoNavigator buduje oceny giełd krypto: kryteria, wagi i ograniczenia.',
  alternates: { canonical: 'https://cryptotop.chat/pl/methodology' },
};

export default function Page() {
  return <MethodologyPage locale="pl" />;
}