export function getAffiliateLink(exchange: 'binance' | 'bybit' | 'okx' | 'mexc' | 'kucoin' | 'whitebit'): string {
  const links = {
    binance: process.env.NEXT_PUBLIC_AFFILIATE_BINANCE || 'https://www.binance.com/',
    bybit: process.env.NEXT_PUBLIC_AFFILIATE_BYBIT || 'https://www.bybit.com/',
    okx: process.env.NEXT_PUBLIC_AFFILIATE_OKX || 'https://www.okx.com/',
    mexc: process.env.NEXT_PUBLIC_AFFILIATE_MEXC || 'https://www.mexc.com/',
    kucoin: process.env.NEXT_PUBLIC_AFFILIATE_KUCOIN || 'https://www.kucoin.com/',
    whitebit: process.env.NEXT_PUBLIC_AFFILIATE_WHITEBIT || 'https://whitebit.com/',
  };
  return links[exchange];
}