import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import pool from '@/app/lib/db';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const COIN_MAP: Record<string, string> = {
  bitcoin: 'bitcoin', btc: 'bitcoin',
  ethereum: 'ethereum', eth: 'ethereum',
  solana: 'solana', sol: 'solana',
  ripple: 'ripple', xrp: 'ripple',
  cardano: 'cardano', ada: 'cardano',
  dogecoin: 'dogecoin', doge: 'dogecoin',
};

function detectExchangeMention(message: string): string | null {
  const lower = message.toLowerCase();
  if (lower.includes('binance')) return 'binance';
  if (lower.includes('bybit')) return 'bybit';
  if (lower.includes('whitebit')) return 'whitebit';
  if (lower.includes('okx')) return 'okx';
  if (lower.includes('біржу') || lower.includes('exchange') || lower.includes('börse') || lower.includes('giełd')) return 'general';
  return null;
}

const LANG_CONFIG: Record<string, {
  language: string;
  levelInstructions: Record<string, string>;
  errorMsg: string;
  ctaTriggers: string[];
}> = {
  uk: {
    language: 'українською',
    levelInstructions: {
      beginner: 'Користувач — НОВАЧОК. Пояснюй просто, без жаргону. Підбадьорюй.',
      intermediate: 'Користувач має базові знання. Можна використовувати терміни (DeFi, стейкінг).',
      advanced: 'Користувач досвідчений трейдер. Говори як рівний з рівним.',
      unknown: 'Рівень невідомий — адаптуйся по ходу розмови.',
    },
    errorMsg: '🤖 Вибачте, сталася помилка. Спробуйте ще раз!',
    ctaTriggers: ['біржу', 'біржа', 'зареєстр'],
  },
  en: {
    language: 'English',
    levelInstructions: {
      beginner: 'User is a BEGINNER. Explain simply, avoid jargon. Be encouraging.',
      intermediate: 'User has basic knowledge. You can use terms (DeFi, staking, liquidity).',
      advanced: 'User is an experienced trader. Talk as equals.',
      unknown: 'Level unknown — adapt as the conversation goes.',
    },
    errorMsg: '🤖 Sorry, an error occurred. Please try again!',
    ctaTriggers: ['exchange', 'register', 'sign up', 'start trading'],
  },
  pl: {
    language: 'polsku',
    levelInstructions: {
      beginner: 'Użytkownik jest POCZĄTKUJĄCYM. Tłumacz prosto, bez żargonu. Zachęcaj.',
      intermediate: 'Użytkownik ma podstawową wiedzę. Można używać terminów (DeFi, staking).',
      advanced: 'Użytkownik to doświadczony trader. Rozmawiaj jak równy z równym.',
      unknown: 'Poziom nieznany — dostosowuj się w trakcie rozmowy.',
    },
    errorMsg: '🤖 Przepraszamy, wystąpił błąd. Spróbuj ponownie!',
    ctaTriggers: ['giełd', 'zarejestr', 'handel'],
  },
  de: {
    language: 'Deutsch',
    levelInstructions: {
      beginner: 'Der Nutzer ist ANFÄNGER. Erkläre einfach, ohne Fachbegriffe. Ermutige ihn.',
      intermediate: 'Nutzer hat Grundkenntnisse. Begriffe wie DeFi, Staking sind OK.',
      advanced: 'Erfahrener Trader. Sprich auf Augenhöhe.',
      unknown: 'Level unbekannt — passe dich im Gespräch an.',
    },
    errorMsg: '🤖 Entschuldigung, ein Fehler ist aufgetreten. Bitte versuche es erneut!',
    ctaTriggers: ['börse', 'registrier', 'handel', 'exchange'],
  },
};

export async function POST(request: Request) {
  try {
    const { message, history = [], userLevel = 'unknown', locale = 'uk' } = await request.json();

    const lang = LANG_CONFIG[locale] || LANG_CONFIG['uk'];

    if (!message) {
      return NextResponse.json({ reply: 'Будь ласка, введіть питання.' });
    }

    let newsContext = '';
    try {
      const newsResult = await pool.query(`
        SELECT title, summary, sentiment, recommendation
        FROM ai_news
        ORDER BY created_at DESC
        LIMIT 8
      `);
      if (newsResult.rows.length > 0) {
        newsContext = '\n\nLATEST CRYPTO NEWS:\n';
        newsResult.rows.forEach((n, i) => {
          newsContext += `${i + 1}. [${n.sentiment?.toUpperCase()}] ${n.title}\n`;
          newsContext += `   ${n.summary?.slice(0, 120)}...\n`;
          newsContext += `   → ${n.recommendation}\n\n`;
        });
      }
    } catch (dbError) {
      console.error('DB Error:', dbError);
    }

    const levelInstruction = lang.levelInstructions[userLevel] || lang.levelInstructions['unknown'];

    const claudeHistory = history
      .slice(-10)
      .map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));

    claudeHistory.push({ role: 'user', content: message });

    const systemPrompt = `You are CryptoBot, an expert AI crypto consultant on CryptoNavigator (cryptotop.chat).
IMPORTANT: Always respond in ${lang.language}. Never switch languages.

USER LEVEL: ${levelInstruction}

RESPONSE STYLE:
- Respond ONLY in ${lang.language}
- Structure: short summary → details → practical advice
- Use emojis organically
- Length: 4-7 sentences for simple questions, up to 10 for complex ones
- Be confident but honest about risks

EXCHANGES — RECOMMEND NATURALLY:
When asked about exchanges or registration, end your response with:
"[EXCHANGE_CTA:binance]" — if recommending Binance
"[EXCHANGE_CTA:whitebit]" — if recommending WhiteBIT
"[EXCHANGE_CTA:both]" — if recommending both

WHEN TO RECOMMEND:
- Questions about choosing an exchange → [EXCHANGE_CTA:binance]
- Questions about starting in crypto → [EXCHANGE_CTA:binance]
- Questions about Ukrainian exchanges → [EXCHANGE_CTA:whitebit]
- Questions about safety/reliability → [EXCHANGE_CTA:binance]

IMPORTANT: No specific buy/sell advice. Always DYOR.
${newsContext}`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      system: systemPrompt,
      messages: claudeHistory,
    });

    let reply = response.content[0].type === 'text'
      ? response.content[0].text
      : lang.errorMsg;

    let ctaData = null;

    if (reply.includes('[EXCHANGE_CTA:binance]')) {
      reply = reply.replace('[EXCHANGE_CTA:binance]', '');
      ctaData = { type: 'binance' };
    } else if (reply.includes('[EXCHANGE_CTA:whitebit]')) {
      reply = reply.replace('[EXCHANGE_CTA:whitebit]', '');
      ctaData = { type: 'whitebit' };
    } else if (reply.includes('[EXCHANGE_CTA:both]')) {
      reply = reply.replace('[EXCHANGE_CTA:both]', '');
      ctaData = { type: 'both' };
    }

    return NextResponse.json({ reply: reply.trim(), cta: ctaData });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({
      reply: '🤖 Sorry, an error occurred. Please try again!'
    });
  }
}