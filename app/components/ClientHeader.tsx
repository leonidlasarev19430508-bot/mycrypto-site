'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { getTranslation, type Locale } from '../lib/i18n';

const LOCALE_LABELS: Record<Locale, string> = {
  uk: '🇺🇦 UA',
  pl: '🇵🇱 PL',
  de: '🇩🇪 DE',
  en: '🇬🇧 EN',
};

const LOCALES: Locale[] = ['uk', 'pl', 'de', 'en'];

// Сторінки, для яких реально існують локалізовані версії під /en, /de, /pl.
// Усе, чого тут немає (монети, окремі статті блогу, юридичні сторінки тощо),
// при перемиканні мови веде на головну сторінку обраної локалі, а не на биту адресу.
const LOCALIZABLE_PAGES = new Set([
  '',
  'coins',
  'bonuses',
  'markets',
  'news',
  'assistant',
  'blog',
  'faq',
  'about',
  'learn',
  'simulator',
]);

function getLocalizedPath(locale: Locale, page: string): string {
  const prefix = locale === 'uk' ? '' : `/${locale}`;
  return page === '' ? (prefix || '/') : `${prefix}/${page}`;
}

function getCurrentPage(pathname: string, locale: Locale): string {
  const prefix = locale === 'uk' ? '' : `/${locale}`;
  const page = prefix ? pathname.replace(prefix, '') : pathname;
  return page.replace(/^\//, '') || '';
}

// Безпечний шлях для перемикача мов: якщо поточна сторінка не має
// локалізованої версії — ведемо на головну цієї локалі замість 404.
function getSafeSwitchPath(locale: Locale, currentPage: string): string {
  const segments = currentPage.split('/').filter(Boolean);
  const baseSegment = segments[0] || '';

  // Окрема стаття блогу (blog/<id>): зберігаємо статтю, перемикаємо лише мову
  if (baseSegment === 'blog' && segments.length >= 2) {
    const articleId = segments[1];
    return locale === 'uk' ? `/blog/${articleId}` : `/blog/${articleId}?lang=${locale}`;
  }

  if (LOCALIZABLE_PAGES.has(baseSegment)) {
    return getLocalizedPath(locale, currentPage);
  }
  return getLocalizedPath(locale, '');
}

function ClientHeaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [menuOpen, setMenuOpen] = useState(false);

  const langParam = searchParams.get('lang');
  const isArticlePage = /^\/blog\/[^/]+$/.test(pathname);

  const locale: Locale = isArticlePage && (langParam === 'en' || langParam === 'pl' || langParam === 'de')
    ? langParam
    : pathname.startsWith('/pl') ? 'pl'
    : pathname.startsWith('/de') ? 'de'
    : pathname.startsWith('/en') ? 'en'
    : 'uk';

  const t = getTranslation(locale);
  const homeHref = getLocalizedPath(locale, '');
  const currentPage = getCurrentPage(pathname, locale);

  const labels = {
    about: { uk: 'Про нас', en: 'About', pl: 'O nas', de: 'Über uns' },
    learn: { uk: 'Навчання', en: 'Learn', pl: 'Nauka', de: 'Lernen' },
    coins: { uk: 'Монети', en: 'Coins', pl: 'Monety', de: 'Münzen' },
    bonuses: { uk: '🎁 Бонуси', en: '🎁 Bonuses', pl: '🎁 Bonusy', de: '🎁 Boni' },
    blog: { uk: '📰 Блог', en: '📰 Blog', pl: '📰 Blog', de: '📰 Blog' },
  };

  const navLinks = [
    { href: homeHref, label: t.nav.home },
    { href: getLocalizedPath(locale, 'coins'), label: labels.coins[locale] },
    { href: getLocalizedPath(locale, 'bonuses'), label: labels.bonuses[locale], highlight: true },
    { href: getLocalizedPath(locale, 'markets'), label: t.nav.markets },
    { href: getLocalizedPath(locale, 'assistant'), label: t.nav.assistant },
    { href: getLocalizedPath(locale, 'blog'), label: labels.blog[locale] },
    { href: getLocalizedPath(locale, 'faq'), label: 'FAQ' },
    { href: getLocalizedPath(locale, 'about'), label: labels.about[locale] },
    { href: getLocalizedPath(locale, 'learn'), label: labels.learn[locale] },
    { href: getLocalizedPath(locale, 'simulator'), label: { uk: '🎮 Симулятор', en: '🎮 Simulator', pl: '🎮 Symulator', de: '🎮 Simulator' }[locale] },
   ];

  return (
    <header className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href={homeHref} className="font-bold text-xl hover:text-gray-300 flex-shrink-0">
          CryptoNavigator
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4 flex-wrap">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              className={`text-sm hover:text-gray-300 whitespace-nowrap ${
                link.highlight ? 'text-orange-400 font-semibold' : ''
              }`}>
              {link.label}
            </Link>
          ))}
          {/* Language switcher */}
          <div className="flex gap-1 ml-2 border-l border-gray-600 pl-3">
            {LOCALES.map(l => (
              <Link key={l} href={getSafeSwitchPath(l, currentPage)}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  locale === l ? 'text-white font-bold bg-gray-700' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}>
                {LOCALE_LABELS[l]}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile: lang + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Language switcher mobile */}
          <div className="flex gap-1">
            {LOCALES.map(l => (
              <Link key={l} href={getSafeSwitchPath(l, currentPage)}
                className={`text-xs px-1.5 py-1 rounded transition-colors ${
                  locale === l ? 'text-white font-bold bg-gray-700' : 'text-gray-400 hover:text-white'
                }`}>
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          {/* Hamburger */}
          <button onClick={() => setMenuOpen(v => !v)}
            className="p-2 rounded hover:bg-gray-800 transition"
            aria-label="Menu">
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu — FIXED: md:hidden замість lg:hidden */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 py-3">
          <nav className="grid grid-cols-2 gap-2">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm py-2 px-3 rounded-lg hover:bg-gray-800 transition ${
                  link.highlight ? 'text-orange-400 font-semibold' : 'text-gray-300'
                }`}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

// Suspense-обгортка: useSearchParams() у Next.js 16 вимагає Suspense-межі,
// інакше білд падає на сторінках, що попередньо рендеряться статично.
export default function ClientHeader() {
  return (
    <Suspense fallback={null}>
      <ClientHeaderInner />
    </Suspense>
  );
}
