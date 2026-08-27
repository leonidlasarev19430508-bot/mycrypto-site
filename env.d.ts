declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SITE_URL: string;
    NEXT_PUBLIC_AFFILIATE_BINANCE: string;
    NEXT_PUBLIC_AFFILIATE_BYBIT: string;
    NEXT_PUBLIC_AFFILIATE_OKX: string;
    NEXT_PUBLIC_AFFILIATE_WHITEBIT: string;
    NEXT_PUBLIC_ROUTER_WEBHOOK: string;
    N8N_WEBHOOK_BASE: string;
    DATABASE_URL: string;
    FORCE_REBUILD: string;
    COINGECKO_API_KEY?: string;
  }
}