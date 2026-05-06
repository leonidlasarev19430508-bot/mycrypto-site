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
  dai: 'dai',
};

function detectCoin(message: string): string {
  const lower = message.toLowerCase();
  for (const [key, value] of Object.entries(COIN_MAP)) {
    if (lower.includes(key)) return value;
  }
  return 'bitcoin';
}

export async function POST(request: Request) {
  try {
    const { message, history = [] } = await request.json();

    if (!message) {
      return NextResponse.json({ reply: 'Будь ласка, введіть питання.' });
    }

    // Отримуємо новини з БД
    const coin = detectCoin(message);
    let newsContext = '';

    try {
      const newsResult = await pool.query(`
        SELECT title, summary, sentiment, recommendation, source_name
        FROM ai_news
        ORDER BY created_at DESC
        LIMIT 10
      `);

      if (newsResult.rows.length > 0) {
        newsContext = '\n\nОСТАННІ НОВИНИ З БАЗИ ДАНИХ:\n';
        newsResult.rows.forEach((n, i) => {
          newsContext += `${i + 1}. [${n.sentiment?.toUpperCase()}] ${n.title}\n`;
          newsContext += `   ${n.summary?.slice(0, 150)}...\n`;
          newsContext += `   Рекомендація: ${n.recommendation}\n\n`;
        });
      }
    } catch (dbError) {
      console.error('DB Error:', dbError);
    }

    // Формуємо історію для Claude
    const claudeHistory = history
      .slice(-8)
      .map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));

    // Додаємо поточне повідомлення
    claudeHistory.push({ role: 'user', content: message });

    const systemPrompt = `Ти — CryptoBot, експертний AI-консультант з криптовалют на сайті CryptoNavigator.
Ти допомагаєш користувачам розібратися в крипторинку, вибрати біржу та прийняти зважені рішення.

ТВОЯ РОЛЬ:
- Аналізуй новини та давай практичні поради
- Пояснюй складне простими словами
- Будь чесним про ризики
- Якщо питають про біржу — порівнюй Binance, Bybit, WhiteBIT, OKX
- Відповідай УКРАЇНСЬКОЮ мовою
- Будь лаконічним (3-5 речень), але інформативним
- Використовуй емодзі де доречно

ДОСТУПНІ БІРЖІ (з реферальними посиланнями — згадуй їх природно):
- Binance: https://www.binance.com/register?ref=GRO_28502_BIO0R
- WhiteBIT: https://whitebit.com/referral/54626c3b-5240-4d39-9784-8e3eda5736de

ВАЖЛИВО: Не давай конкретних фінансових порад типу "купуй зараз". Завжди нагадуй про DYOR (Do Your Own Research).
${newsContext}`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      system: systemPrompt,
      messages: claudeHistory,
    });

    const reply = response.content[0].type === 'text'
      ? response.content[0].text
      : 'Вибачте, не вдалося отримати відповідь.';

    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json({
      reply: '🤖 Вибачте, сталася помилка. Спробуйте ще раз або запитайте щось інше!'
    });
  }
}
