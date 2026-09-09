'use client';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const WelcomeBubble = dynamic(() => import('./WelcomeBubble'), {
  ssr: false,
  loading: () => null,
});

export default function LocaleWelcomeBubble() {
  const pathname = usePathname();

  const locale = pathname.startsWith('/en') ? 'en'
    : pathname.startsWith('/pl') ? 'pl'
    : pathname.startsWith('/de') ? 'de'
    : 'uk';

  return <WelcomeBubble locale={locale} />;
}