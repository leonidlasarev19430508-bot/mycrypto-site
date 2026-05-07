'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALES, LOCALE_FLAGS, LOCALE_NAMES, LOCALE_HREFS, getTranslation, type Locale } from '../lib/i18n';

const TRANSLATIONS = {
  uk: { home: 'Головна', markets: 'Ринки', news: 'AI Новини', assistant: 'AI Асистент', homeHref: '/' },
  pl: { home: 'Strona główna', markets: 'Rynki', news: 'AI Wiadomości', assistant: 'AI Asystent', homeHref: '/pl' },
  de: { home: 'Startseite', markets: 'Märkte', news: 'AI Nachrichten', assistant: 'AI Assistent', homeHref: '/de' },
};

export default function ClientHeader() {
  const pathname = usePathname();
  const lang = pathname.startsWith('/pl') ? 'pl' : pathname.startsWith('/de') ? 'de' : 'uk';
  const t = TRANSLATIONS[lang];

  return (
    <header className="bg-black text-white p-4">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
        <Link href={t.homeHref} className="font-bold text-xl hover:text-gray-300">
          CryptoNavigator
        </Link>
        <nav className="flex flex-wrap gap-6 items-center">
          <Link href={t.homeHref} className="hover:text-gray-300">{t.home}</Link>
          <Link href="/markets" className="hover:text-gray-300">{t.markets}</Link>
          <Link href="/news" className="hover:text-gray-300">{t.news}</Link>
          <Link href="/assistant" className="hover:text-gray-300">{t.assistant}</Link>
          <div className="flex gap-2 ml-4 border-l border-gray-600 pl-4">
            <Link href="/" className={`text-sm hover:text-white ${lang === 'uk' ? 'text-white font-bold' : 'text-gray-400'}`}>🇺🇦 UA</Link>
            <Link href="/pl" className={`text-sm hover:text-white ${lang === 'pl' ? 'text-white font-bold' : 'text-gray-400'}`}>🇵🇱 PL</Link>
            <Link href="/de" className={`text-sm hover:text-white ${lang === 'de' ? 'text-white font-bold' : 'text-gray-400'}`}>🇩🇪 DE</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
