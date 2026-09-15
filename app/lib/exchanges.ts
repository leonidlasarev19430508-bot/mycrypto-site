/**
 * Single source of truth for the exchange roster.
 *
 * Every component (homepage cards, comparison table, quiz, bonuses,
 * exchange detail pages, JSON-LD) must read from here so the list of
 * exchanges, their order, ratings and affiliate links stay consistent
 * across all locales and pages.
 *
 * Translatable copy (description/features/badge) lives in the i18n JSON
 * `offers` arrays and is joined onto these records by `id`.
 */

export type ExchangeId = 'binance' | 'bybit' | 'okx' | 'kucoin';

export interface Exchange {
  id: ExchangeId;
  name: string;
  /** Emoji/badge glyph used as a logo in cards and tables. */
  logo: string;
  /** True if this exchange is the highlighted "top" pick. */
  spotlight: boolean;
  /** Aggregated rating 0–5. */
  rating: number;
  spotFee: string;
  futuresFee: string;
  withdrawalFee: string;
  coins: string;
  bonus: string;
}

const AFFILIATE_FALLBACK: Record<ExchangeId, string> = {
  binance: 'https://www.binance.com/',
  bybit: 'https://www.bybit.com/',
  okx: 'https://www.okx.com/',
  kucoin: 'https://www.kucoin.com/',
};

/**
 * Resolve an affiliate/referral link for an exchange.
 *
 * Falls back to the exchange homepage when no referral link is configured.
 * Set NEXT_PUBLIC_AFFILIATE_BINANCE / _BYBIT / _OKX / _KUCOIN in production
 * to actually earn from referrals — without these the site sends traffic for free.
 *
 * NOTE: env access must be static (`process.env.NEXT_PUBLIC_...`) so Next.js
 * inlines the value at build time; a dynamic `process.env[key]` would silently
 * fall back forever.
 */
export function getAffiliateLink(id: ExchangeId): string {
  switch (id) {
    case 'binance':
      return process.env.NEXT_PUBLIC_AFFILIATE_BINANCE || AFFILIATE_FALLBACK.binance;
    case 'bybit':
      return process.env.NEXT_PUBLIC_AFFILIATE_BYBIT || AFFILIATE_FALLBACK.bybit;
    case 'okx':
      return process.env.NEXT_PUBLIC_AFFILIATE_OKX || AFFILIATE_FALLBACK.okx;
    case 'kucoin':
      return process.env.NEXT_PUBLIC_AFFILIATE_KUCOIN || AFFILIATE_FALLBACK.kucoin;
    default:
      return AFFILIATE_FALLBACK[id];
  }
}

export const EXCHANGES: Exchange[] = [
  {
    id: 'binance',
    name: 'Binance',
    logo: '🏆',
    spotlight: true,
    rating: 4.8,
    spotFee: '0.10%',
    futuresFee: '0.02% / 0.05%',
    withdrawalFee: '$0.5+',
    coins: '350+',
    bonus: '$600',
  },
  {
    id: 'bybit',
    name: 'Bybit',
    logo: '⚡',
    spotlight: false,
    rating: 4.6,
    spotFee: '0.10%',
    futuresFee: '0.02% / 0.055%',
    withdrawalFee: '$1+',
    coins: '300+',
    bonus: '$30,000',
  },
  {
    id: 'okx',
    name: 'OKX',
    logo: '🌐',
    spotlight: false,
    rating: 4.5,
    spotFee: '0.08%',
    futuresFee: '0.02% / 0.05%',
    withdrawalFee: '$0.5+',
    coins: '300+',
    bonus: 'Mystery Box',
  },
  {
    id: 'kucoin',
    name: 'KuCoin',
    logo: '🟢',
    spotlight: false,
    rating: 4.4,
    spotFee: '0.10%',
    futuresFee: '0.02% / 0.06%',
    withdrawalFee: '$1+',
    coins: '700+',
    bonus: '$500',
  },
];

export function getExchangeById(id: string): Exchange | undefined {
  return EXCHANGES.find((ex) => ex.id === id);
}

export function getAffiliateLinkForId(id: string): string {
  return getAffiliateLink((id as ExchangeId) || 'binance');
}