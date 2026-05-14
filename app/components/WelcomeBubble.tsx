'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

const SUGGESTIONS = [
  '🪙 Що таке Bitcoin?',
  '📈 Як купити крипту?',
  '🏦 Яку біржу обрати?',
  '💰 З якої суми почати?',
];

export default function WelcomeBubble() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '👋 Вітаю у CryptoNavigator!\n\nЯ ваш особистий AI-гід у світі криптовалют. Допоможу розібратись з біржами, поясню терміни та відповім на будь-які питання.\n\nЗ чого почнемо?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem('welcomeDismissed');
    if (wasDismissed) return;
    const t = setTimeout(() => setOpen(true), 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleDismiss = () => {
    setOpen(false);
    setDismissed(true);
    sessionStorage.setItem('welcomeDismissed', 'true');
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 400,
          system: 'Ти дружній AI-гід криптовалютного сайту CryptoNavigator. Відповідай коротко (2-4 речення), простою мовою українською. Допомагай новачкам розібратись у криптовалютах. Будь привітним. Не давай фінансових порад.',
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Вибачте, сталась помилка.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: '😔 Помилка зʼєднання.' }]);
    } finally {
      setLoading(false);
    }
  };

  if (dismissed) return null;

  return (
    <>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          position: 'fixed', bottom: '28px', right: '28px', zIndex: 9999,
          width: '64px', height: '64px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          border: '3px solid #fbbf24',
          boxShadow: '0 8px 32px rgba(245,158,11,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '28px', cursor: 'pointer', transition: 'transform 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        aria-label="AI Дворецький"
      >
        {open ? '✕' : '🎩'}
      </button>

      {!open && (
        <span style={{
          position: 'fixed', bottom: '28px', right: '28px', zIndex: 9998,
          width: '64px', height: '64px', borderRadius: '50%',
          background: 'rgba(245,158,11,0.3)',
          animation: 'pulseRing 2s infinite', pointerEvents: 'none',
        }} />
      )}

      {open && (
        <div style={{
          position: 'fixed', bottom: '108px', right: '28px', zIndex: 9999,
          width: '360px', maxHeight: '520px',
          display: 'flex', flexDirection: 'column',
          background: '#ffffff', borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          border: '2px solid #f59e0b', overflow: 'hidden',
          animation: 'fadeSlideUp 0.3s ease',
        }}>

          <div style={{
            background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
            padding: '16px 20px', display: 'flex', alignItems: 'center',
            gap: '12px', flexShrink: 0, borderBottom: '2px solid #f59e0b',
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '24px', border: '2px solid #fbbf24', flexShrink: 0,
            }}>🎩</div>
            <div style={{ flex: 1 }}>
              <p style={{ color: '#fff', fontWeight: 700, fontSize: '15px', margin: 0 }}>
                CryptoNavigator AI
              </p>
              <p style={{ color: '#f59e0b', fontSize: '12px', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
                Ваш особистий крипто-гід
              </p>
            </div>
            <button onClick={handleDismiss} style={{ color: '#9ca3af', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>×</button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '280px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                {msg.role === 'assistant' && (
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b, #d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', marginRight: '8px', flexShrink: 0, alignSelf: 'flex-end' }}>🎩</div>
                )}
                <div style={{
                  maxWidth: '78%', padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.role === 'user' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : '#f3f4f6',
                  color: msg.role === 'user' ? '#fff' : '#1f2937',
                  fontSize: '13.5px', lineHeight: '1.5', whiteSpace: 'pre-wrap',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b, #d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>🎩</div>
                <div style={{ background: '#f3f4f6', padding: '10px 14px', borderRadius: '18px 18px 18px 4px', display: 'flex', gap: '4px' }}>
                  {[0, 150, 300].map(delay => (
                    <span key={delay} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block', animation: `bounce 1s ${delay}ms infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 1 && (
            <div style={{ padding: '0 16px 12px', display: 'flex', flexWrap: 'wrap', gap: '8px', flexShrink: 0 }}>
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => sendMessage(s)}
                  style={{ fontSize: '12px', background: '#fffbeb', color: '#d97706', border: '1px solid #fcd34d', borderRadius: '20px', padding: '6px 12px', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#fef3c7')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#fffbeb')}
                >{s}</button>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', borderTop: '1px solid #e5e7eb', background: '#fafafa', flexShrink: 0 }}>
            <input
              type="text" value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Запитайте що-небудь..."
              disabled={loading}
              style={{ flex: 1, fontSize: '13.5px', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '24px', padding: '10px 16px', outline: 'none', color: '#1f2937' }}
            />
            <button onClick={() => sendMessage(input)} disabled={!input.trim() || loading}
              style={{ width: '40px', height: '40px', borderRadius: '50%', background: input.trim() && !loading ? 'linear-gradient(135deg, #f59e0b, #d97706)' : '#e5e7eb', border: 'none', color: '#fff', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
            >➤</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulseRing { 0% { transform:scale(1); opacity:0.6; } 70% { transform:scale(1.6); opacity:0; } 100% { transform:scale(1.6); opacity:0; } }
        @keyframes bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-5px); } }
      `}</style>
    </>
  );
}