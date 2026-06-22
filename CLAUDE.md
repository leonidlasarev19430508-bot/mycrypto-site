# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

Production is managed with PM2 (`ecosystem.config.js`) on port 3000.

## Architecture

**Stack**: Next.js 15 App Router · React 19 · TypeScript · Tailwind CSS 4 · PostgreSQL (Neon serverless)

This is a crypto exchange comparison and AI advisory platform targeting Ukrainian users, with full i18n for EN, PL, DE. Ukrainian is the default locale (no prefix); other locales live under `/en/`, `/pl/`, `/de/`.

### Key directories

```
app/
├── api/               # All backend API routes
├── components/        # Shared React components (mostly client-side, many loaded with ssr: false)
├── i18n/              # Translation JSON files (uk.json, en.json, pl.json, de.json)
├── lib/
│   ├── db.ts          # PostgreSQL pool (Neon, requires DATABASE_URL)
│   └── i18n.ts        # Translation utilities
├── [locale]/          # en/pl/de locale wrappers (parallel routing)
└── */page.tsx         # Page routes (coins, news, blog, assistant, markets, simulator, etc.)
```

### Data sources and API routes

| Route | Source | Cache |
|---|---|---|
| `/api/coins` | CoinGecko top 100 | 1h revalidate |
| `/api/coin-price` | CoinGecko quotes | 60s revalidate |
| `/api/coin-history/[id]` | CoinGecko historical | 24h revalidate |
| `/api/news` | PostgreSQL `ai_news` table | live |
| `/api/blog` | PostgreSQL `blog_articles` table | live |
| `/api/whale-alerts` | N8N webhook (`N8N_WEBHOOK_BASE`) | 30s cache |
| `/api/trading-counter` | N8N webhook | 60s cache |
| `/api/chat` | Anthropic Claude (claude-sonnet-4-6) | streaming |
| `/api/cron/newsletter` | Claude + DB news → Resend email | cron-triggered |
| `/api/subscribe` | PostgreSQL `subscribers` table | live |

N8N webhooks fail gracefully (return empty array), so the app works without N8N running.

### Database schema

```sql
subscribers (email, is_active, created_at)
ai_news (id, coin_slug, coin_name, title, summary, summary_en, summary_pl, summary_de,
         sentiment, recommendation, source_url, source_name, published_at, created_at)
```

### AI integration (Anthropic Claude)

- **Chat** (`/api/chat`): Uses `claude-sonnet-4-6`, multilingual system prompt, adapts tone to user level (beginner/intermediate/advanced), injects latest 5 news items as context. Emits `[EXCHANGE_CTA:slug]` markers that the client converts into CTA buttons.
- **Newsletter** (`/api/cron/newsletter`): Protected by `Authorization: Bearer CRON_SECRET`. Generates a digest, sends via Resend to all active subscribers.

### Localization pattern

Components detect locale via `usePathname()` (checks `/en/`, `/pl/`, `/de/` prefix, defaults to Ukrainian). Translations load from `/app/i18n/*.json`. Dynamic routes use `await params` (Next.js 15 async params).

### Trading simulator

`/app/simulator/` uses `lightweight-charts` v5. Key API: `addSeries()` (not `addCandlestickSeries()`). CoinGecko supports only `4h` and `1d` intervals — `1h` returns flat candles and must not be used. Initial visible range is limited to 30 candles for readability.

## Required environment variables

```
ANTHROPIC_API_KEY          # Claude API
DATABASE_URL               # postgresql://... (Neon, requires sslmode=require)
RESEND_API_KEY             # Newsletter emails
CRON_SECRET                # Bearer token for /api/cron/newsletter
N8N_WEBHOOK_BASE           # e.g. http://n8n_app:5678/webhook
NEXT_PUBLIC_AFFILIATE_*    # Exchange referral links (safe to expose)
```

`COINGECKO_API_KEY` is optional; free tier works without it.
