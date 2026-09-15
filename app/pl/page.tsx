import type { Metadata } from 'next';
import HomePage from '../components/HomePageClient';
import { getTranslation } from '../lib/i18n';

const t = getTranslation('pl');

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: { canonical: '/pl' },
};

export default function PLPage() {
  return <HomePage />;
}