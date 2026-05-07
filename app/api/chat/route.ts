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

function detectCoin(message: string): string {
  const lower = message.toLowerCase();
  for (const [key, value] of Object.entries(COIN_MAP)) {
    if (lower.includes(key)) return value;
  }
  return 'bitcoin';
}

function detectExchangeMention(message: string): string | null {
  const lower = message.toLowerCase();
  if (lower.includes('binance')) return 'binance';
  if (lower.includes('bybit')) return 'bybit';
  if (lower.includes('whitebit')) return 'whitebit';
  if (lower.includes('okx')) return 'okx';
  if (lower.includes('біржу') || lower.includes('біржа') || lower.includes('зареєстр')) return 'general';
  return null;
}

export async function POST(request: Request) {
  try {
    const { message, history = [], userLevel = 'unknown' } = await request.json();

    if (!message) {
      return NextResponse.json({ reply: 'Будь ласка, введіть питання.' });
    }

    // Новини з БД
    let newsContext = '';
    try {
      const newsResult = await pool.query(`
        SELECT title, summary, sentiment, recommendation
        FROM ai_news
        ORDER BY created_at DESC
        LIMIT 8
      `);
      if (newsResult.rows.length > 0) {
        newsContext = '\n\nОСТАННІ КРИПТО-НОВИНИ:\n';
        newsResult.rows.forEach((n, i) => {
          newsContext += `${i + 1}. [${n.sentiment?.toUpperCase()}] ${n.title}\n`;
          newsContext += `   ${n.summary?.slice(0, 120)}...\n`;
          newsContext += `   → ${n.recommendation}\n\n`;
        });
      }
    } catch (dbError) {
      console.error('DB Error:', dbError);
    }

    const levelInstructions: Record<string, string> = {
      beginner: `Користувач — НОВАЧОК. Пояснюй просто, без жаргону. Уникай технічних термінів або одразу пояснюй їх. Підбадьорюй. Рекомендуй починати з Binance як найнадійнішої біржі для початківців.`,
      intermediate: `Користувач має базові знання. Можна використовувати терміни (DeFi, стейкінг, ліквідність). Давай більш детальні порівняння.`,
      advanced: `Користувач досвідчений трейдер. Говори як рівний з рівним. Можна обговорювати арбітраж, похідні інструменти, ліквідність пулів.`,
      unknown: `Рівень невідомий — адаптуйся по ходу розмови. Якщо це перше повідомлення, запитай рівень досвіду.`,
    };

    const claudeHistory = history
      .slice(-10)
      .map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));

    claudeHistory.push({ role: 'user', content: message });

    const systemPrompt = `Ти — CryptoBot, експертний AI-консультант на сайті CryptoNavigator (cryptotop.chat).
Твоя мета: допомогти користувачу розібратись у крипті І природно направити до реєстрації на біржі.

РІВЕНЬ КОРИСТУВАЧА: ${levelInstructions[userLevel] || levelInstructions['unknown']}

СТИЛЬ ВІДПОВІДЕЙ:
- Відповідай ТІЛЬКИ українською
- Структуруй відповідь: коротка суть → деталі → практична порада
- Використовуй емодзі органічно (не кожне речення)
- Довжина: 4-7 речень для простих питань, до 10 для складних
- Будь впевненим але чесним щодо ризиків

БІРЖІ — РЕКОМЕНДУЙ ПРИРОДНО:
Коли питають про біржу або реєстрацію, завершуй відповідь так:
"[EXCHANGE_CTA:binance]" — якщо рекомендуєш Binance
"[EXCHANGE_CTA:whitebit]" — якщо рекомендуєш WhiteBIT (для UA без верифікації)
"[EXCHANGE_CTA:both]" — якщо рекомендуєш обидві

КОЛИ РЕКОМЕНДУВАТИ:
- Питання про вибір біржі → [EXCHANGE_CTA:binance]
- Питання про старт в крипті → [EXCHANGE_CTA:binance]  
- Питання про українські біржі → [EXCHANGE_CTA:whitebit]
- Питання про безпеку/надійність → [EXCHANGE_CTA:binance]

ВАЖЛИВО: Не давай конкретних порад "купуй/продавай". Завжди DYOR.
${newsContext}`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      system: systemPrompt,
      messages: claudeHistory,
    });

    let reply = response.content[0].type === 'text'
      ? response.content[0].text
      : 'Вибачте, не вдалося отримати відповідь.';

    // Визначаємо який CTA вставити
    const exchangeMentioned = detectExchangeMention(reply + message);
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
      reply: '🤖 Вибачте, сталася помилка. Спробуйте ще раз!'
    });
  }
}
