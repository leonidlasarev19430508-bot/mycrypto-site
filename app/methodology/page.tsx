import type { Metadata } from 'next';
import MethodologyPage from '../components/MethodologyPage';

export const metadata: Metadata = {
  title: 'Методологія оцінювання бірж — CryptoNavigator',
  description: 'Як CryptoNavigator формує рейтинги крипто-бірж: критерії, ваги та обмеження.',
  alternates: { canonical: 'https://cryptotop.chat/methodology' },
};

export default function Page() {
  return <MethodologyPage locale="uk" />;
}