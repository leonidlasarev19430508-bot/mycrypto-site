'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const WelcomeBubble = dynamic(() => import('./WelcomeBubble'), {
  ssr: false,
  loading: () => null,
});

export default function LocaleWelcomeBubble() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  const locale = pathname.startsWith('/en') ? 'en'
    : pathname.startsWith('/pl') ? 'pl'
    : pathname.startsWith('/de') ? 'de'
    : 'uk';

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;
  return <WelcomeBubble locale={locale} />;
}