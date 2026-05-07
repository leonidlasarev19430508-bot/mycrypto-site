import uk from '../i18n/uk.json';
import pl from '../i18n/pl.json';
import de from '../i18n/de.json';
import en from '../i18n/en.json';

export type Locale = 'uk' | 'pl' | 'de' | 'en';

const translations = { uk, pl, de, en };

export type Translation = typeof uk;

export function getTranslation(locale: Locale): Translation {
  return translations[locale] || translations.uk;
}

export function useTranslation(locale: Locale): Translation {
  return getTranslation(locale);
}

export const LOCALES: Locale[] = ['uk', 'pl', 'de', 'en'];

export const LOCALE_FLAGS: Record<Locale, string> = {
  uk: '🇺🇦',
  pl: '🇵🇱',
  de: '🇩🇪',
  en: '🇬🇧',
};

export const LOCALE_NAMES: Record<Locale, string> = {
  uk: 'UA',
  pl: 'PL',
  de: 'DE',
  en: 'EN',
};

export const LOCALE_HREFS: Record<Locale, string> = {
  uk: '/',
  pl: '/pl',
  de: '/de',
  en: '/en',
};
