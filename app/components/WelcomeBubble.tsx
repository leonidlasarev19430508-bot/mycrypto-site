'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

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
      {/* Floating button з аватаром */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          position: 'fixed', bottom: '28px', right: '28px', zIndex: 9999,
          width: '68px', height: '68px', borderRadius: '50%',
          background: 'transparent',
          border: 'none', padding: 0,
          cursor: 'pointer',
          transition: 'transform 0.2s',
          filter: 'drop-shadow(0 4px 16px rgba(245,158,11,0.5))',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        aria-label="AI Навігатор"
      >
        {open ? (
          <div style={{
            width: '68px', height: '68px', borderRadius: '50%',
            background: 'rgba(245,158,11,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', border: '3px solid #f59e0b',
          }}>✕</div>
        ) : (
          <Image
            src="/robot-avatar.png"
            alt="AI Навігатор"
            width={68}
            height={68}
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
        )}
      </button>

      {/* Pulse ring */}
      {!open && (
        <span style={{
          position: 'fixed', bottom: '28px', right: '28px', zIndex: 9998,
          width: '68px', height: '68px', borderRadius: '50%',
          background: 'rgba(245,158,11,0.25)',
          animation: 'pulseRing 2s infinite', pointerEvents: 'none',
        }} />
      )}

      {/* Chat window — напівпрозора планшетка */}
      {open && (
        <div style={{
          position: 'fixed', bottom: '112px', right: '28px', zIndex: 9999,
          width: '360px', maxHeight: '520px',
          display: 'flex', flexDirection: 'column',
          /* Напівпрозорий glassmorphism ефект */
          background: 'rgba(255, 255, 255, 0.82)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '24px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(245,158,11,0.3)',
          border: '1.5px solid rgba(245,158,11,0.4)',
          overflow: 'hidden',
          animation: 'fadeSlideUp 0.3s ease',
        }}>

          {/* Header напівпрозорий */}
          <div style={{
            background: 'rgba(26, 26, 46, 0.88)',
            backdropFilter: 'blur(10px)',
            padding: '14px 18px',
            display: 'flex', alignItems: 'center', gap: '12px',
            flexShrink: 0,
            borderBottom: '1.5px solid rgba(245,158,11,0.4)',
          }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid rgba(245,158,11,0.6)' }}>
              <Image src="/robot-avatar.png" alt="AI" width={44} height={44} style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: '#fff', fontWeight: 600, fontSize: '14px', margin: 0 }}>
                CryptoNavigator AI
              </p>
              <p style={{ color: '#f59e0b', fontSize: '11px', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
                Ваш особистий крипто-гід
              </p>
            </div>
            <button onClick={handleDismiss} style={{ color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', lineHeight: 1 }}>×</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: '8px' }}>
                {msg.role === 'assistant' && (
                  <div style={{ width: '26px', height: '26px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                    <Image src="/robot-avatar.png" alt="" width={26} height={26} style={{ objectFit: 'cover' }} />
                  </div>
                )}
                <div style={{
                  maxWidth: '78%', padding: '10px 13px',
                  borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                    : 'rgba(255,255,255,0.75)',
                  backdropFilter: msg.role === 'assistant' ? 'blur(8px)' : undefined,
                  color: msg.role === 'user' ? '#fff' : '#1f2937',
                  fontSize: '13.5px', lineHeight: '1.5', whiteSpace: 'pre-wrap',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  border: msg.role === 'assistant' ? '1px solid rgba(245,158,11,0.2)' : 'none',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', overflow: 'hidden' }}>
                  <Image src="/robot-avatar.png" alt="" width={26} height={26} style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ background: 'rgba(255,255,255,0.75)', padding: '10px 14px', borderRadius: '18px 18px 18px 4px', display: 'flex', gap: '4px', border: '1px solid rgba(245,158,11,0.2)' }}>
                  {[0, 150, 300].map(delay => (
                    <span key={delay} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block', animation: `bounce 1s ${delay}ms infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div style={{ padding: '0 14px 10px', display: 'flex', flexWrap: 'wrap', gap: '7px', flexShrink: 0 }}>
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => sendMessage(s)}
                  style={{
                    fontSize: '12px',
                    background: 'rgba(255,255,255,0.7)',
                    color: '#d97706',
                    border: '1px solid rgba(245,158,11,0.4)',
                    borderRadius: '20px', padding: '5px 11px',
                    cursor: 'pointer', backdropFilter: 'blur(4px)',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(245,158,11,0.15)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.7)')}
                >{s}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 14px',
            borderTop: '1px solid rgba(245,158,11,0.2)',
            background: 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(8px)',
            flexShrink: 0,
          }}>
            <input
              type="text" value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Запитайте що-небудь..."
              disabled={loading}
              style={{
                flex: 1, fontSize: '13.5px',
                background: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(245,158,11,0.3)',
                borderRadius: '24px', padding: '9px 15px',
                outline: 'none', color: '#1f2937',
                backdropFilter: 'blur(4px)',
              }}
            />
            <button onClick={() => sendMessage(input)} disabled={!input.trim() || loading}
              style={{
                width: '38px', height: '38px', borderRadius: '50%',
                background: input.trim() && !loading ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'rgba(229,231,235,0.8)',
                border: 'none', color: '#fff', fontSize: '15px',
                cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'background 0.2s',
              }}
            >➤</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: 0.6; }
          70%  { transform: scale(1.65); opacity: 0; }
          100% { transform: scale(1.65); opacity: 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
}
