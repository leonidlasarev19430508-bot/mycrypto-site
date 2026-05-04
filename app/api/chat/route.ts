import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json({ reply: 'Будь ласка, введіть питання.' });
    }

    // Визначаємо, про яку монету питають
    let coin = 'bitcoin';
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('ethereum') || lowerMessage.includes('eth')) coin = 'ethereum';
    else if (lowerMessage.includes('solana') || lowerMessage.includes('sol')) coin = 'solana';
    else if (lowerMessage.includes('ripple') || lowerMessage.includes('xrp')) coin = 'ripple';
    else if (lowerMessage.includes('cardano') || lowerMessage.includes('ada')) coin = 'cardano';
    else if (lowerMessage.includes('dogecoin') || lowerMessage.includes('doge')) coin = 'dogecoin';
    else if (lowerMessage.includes('bitcoin') || lowerMessage.includes('btc')) coin = 'bitcoin';

    let news = [];
    try {
      // Отримуємо останні новини по монеті з БД
      const newsResult = await pool.query(`
        SELECT title, summary, sentiment, recommendation 
        FROM ai_news 
        WHERE coin_slug = $1 
        ORDER BY created_at DESC 
        LIMIT 5
      `, [coin]);
      news = newsResult.rows;
    } catch (dbError) {
      console.error('DB Error:', dbError);
      // Якщо БД недоступна, використовуємо тестові дані
      news = [];
    }

    // Формуємо відповідь
    let reply = `📊 **Аналіз по ${coin.toUpperCase()}**\n\n`;

    if (news.length > 0) {
      reply += `📰 **Останні новини:**\n`;
      for (const n of news) {
        const sentimentEmoji = n.sentiment === 'positive' ? '📈' : n.sentiment === 'negative' ? '📉' : '⚖️';
        reply += `${sentimentEmoji} ${n.title}\n`;
        reply += `   ${n.summary?.slice(0, 100)}...\n\n`;
      }
      
      const positiveCount = news.filter(n => n.sentiment === 'positive').length;
      const negativeCount = news.filter(n => n.sentiment === 'negative').length;
      
      if (positiveCount > negativeCount) {
        reply += `📈 **Загальний настрій:** ПОЗИТИВНИЙ\n`;
        reply += `💡 **Рекомендація:** Розглянути покупку.`;
      } else if (negativeCount > positiveCount) {
        reply += `📉 **Загальний настрій:** НЕГАТИВНИЙ\n`;
        reply += `💡 **Рекомендація:** Утриматися від покупки або розглянути продаж.`;
      } else {
        reply += `⚖️ **Загальний настрій:** НЕЙТРАЛЬНИЙ\n`;
        reply += `💡 **Рекомендація:** Тримати, спостерігати за ринком.`;
      }
    } else {
      reply += `ℹ️ Наразі немає свіжих новин по ${coin.toUpperCase()} у базі даних.\n\n`;
      reply += `💡 **Порада:** Зайдіть на сторінку новин, щоб побачити останні оновлення.`;
      reply += `\n\nА поки що, ось що я знаю про ${coin.toUpperCase()}:\n`;
      reply += `- Це одна з найпопулярніших криптовалют\n`;
      reply += `- Слідкуйте за новинами для прийняття рішень\n`;
      reply += `- Завжди робіть власне дослідження перед інвестиціями`;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    // Повертаємо дружню відповідь замість помилки
    return NextResponse.json({ 
      reply: '🤖 Привіт! Я ваш AI-консультант. Зараз я навчаюся, але ви можете запитати про Bitcoin, Ethereum або інші монети. Спробуйте щось на кшталт: "Що думаєш про Bitcoin?" або "Які новини по Ethereum?"' 
    });
  }
}