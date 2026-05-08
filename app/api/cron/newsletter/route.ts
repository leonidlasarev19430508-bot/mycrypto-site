import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { Resend } from 'resend';
import pool from '@/app/lib/db';

export async function GET(request: Request) {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const resend = new Resend(process.env.RESEND_API_KEY);

  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const newsResult = await pool.query(`
      SELECT title, summary, sentiment, recommendation
      FROM ai_news ORDER BY created_at DESC LIMIT 5
    `);

    const subsResult = await pool.query(`
      SELECT email FROM subscribers WHERE is_active = true
    `);

    if (subsResult.rows.length === 0) {
      return NextResponse.json({ message: 'No subscribers' });
    }

    const newsText = newsResult.rows.map((n, i) =>
      `${i+1}. [${n.sentiment?.toUpperCase()}] ${n.title}\n${n.summary}\nПорада: ${n.recommendation}`
    ).join('\n\n');

    const aiResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: `На основі цих крипто-новин напиши короткий дайджест для email розсилки українською мовою. Формат: вступ про ринок, 3-5 ключових інсайтів, заклик до дії. Тон дружній експерт.\n\nНОВИНИ:\n${newsText}`
      }]
    });

    const digest = aiResponse.content[0].type === 'text' ? aiResponse.content[0].text : '';
    const today = new Date().toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });

    const htmlEmail = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:20px;">
  <div style="background:linear-gradient(135deg,#1e40af,#3b82f6);border-radius:16px 16px 0 0;padding:32px 24px;text-align:center;">
    <h1 style="color:white;margin:0;font-size:24px;">🚀 CryptoNavigator</h1>
    <p style="color:#bfdbfe;margin:8px 0 0;font-size:14px;">Крипто-дайджест • ${today}</p>
  </div>
  <div style="background:white;padding:32px 24px;">
    <div style="color:#374151;line-height:1.7;font-size:15px;white-space:pre-line;">${digest}</div>
  </div>
  <div style="background:#eff6ff;padding:24px;text-align:center;border-left:4px solid #3b82f6;">
    <p style="color:#1e40af;font-weight:bold;margin:0 0 16px;">Готовий діяти?</p>
    <a href="https://www.binance.com/register?ref=GRO_28502_BIO0R" style="background:#f97316;color:white;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;margin:4px;">Binance →</a>
    <a href="https://whitebit.com/referral/54626c3b-5240-4d39-9784-8e3eda5736de" style="background:#2563eb;color:white;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;margin:4px;">WhiteBIT →</a>
  </div>
  <div style="background:#f9fafb;border-radius:0 0 16px 16px;padding:20px 24px;text-align:center;">
    <p style="color:#9ca3af;font-size:12px;margin:0;">© 2026 CryptoNavigator • <a href="https://cryptotop.chat" style="color:#6b7280;">cryptotop.chat</a></p>
  </div>
</div>
</body></html>`;

    let sent = 0;
    for (const { email } of subsResult.rows) {
      try {
        await resend.emails.send({
          from: 'CryptoNavigator <onboarding@resend.dev>',
          to: email,
          subject: `📈 Крипто-дайджест ${today}`,
          html: htmlEmail,
        });
        sent++;
      } catch (e) {
        console.error(`Failed to send to ${email}:`, e);
      }
    }

    return NextResponse.json({ success: true, sent, total: subsResult.rows.length });

  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}