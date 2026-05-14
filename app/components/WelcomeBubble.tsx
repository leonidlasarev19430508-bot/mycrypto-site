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
      // ✅ Виклик через сервер — API ключ захищений
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map(m => ({ role: m.role, content: m.content })),
          userLevel: 'unknown',
          locale: 'uk',
        }),
      });
      const data = await res.json();
      const reply = data.reply || 'Вибачте, сталась помилка.';
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
      {/* Floating button — великий аватар */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          width: '76px', height: '76px', borderRadius: '50%',
          background: 'transparent', border: 'none', padding: 0,
          cursor: 'pointer', transition: 'transform 0.2s',
          filter: 'drop-shadow(0 6px 20px rgba(245,158,11,0.55))',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        aria-label="AI Навігатор"
      >
        {open ? (
          <div style={{
            width: '76px', height: '76px', borderRadius: '50%',
            background: 'rgba(245,158,11,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '30px', color: 'white', fontWeight: 'bold',
            border: '3px solid #f59e0b',
            boxShadow: '0 0 0 4px rgba(245,158,11,0.2)',
          }}>✕</div>
        ) : (
          <div style={{ position: 'relative', width: '76px', height: '76px' }}>
            <Image
              src="/robot-avatar.png"
              alt="AI Навігатор"
              width={76}
              height={76}
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #f59e0b',
                boxShadow: '0 0 0 3px rgba(245,158,11,0.25)',
              }}
            />
            {/* Онлайн індикатор на кнопці */}
            <span style={{
              position: 'absolute', bottom: '4px', right: '4px',
              width: '14px', height: '14px', borderRadius: '50%',
              background: '#22c55e', border: '2px solid white',
            }}/>
          </div>
        )}
      </button>

      {/* Pulse ring */}
      {!open && (
        <span style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9998,
          width: '76px', height: '76px', borderRadius: '50%',
          background: 'rgba(245,158,11,0.2)',
          animation: 'pulseRing 2s infinite', pointerEvents: 'none',
        }} />
      )}

      {/* Chat window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: '116px', right: '24px', zIndex: 9999,
          width: '380px', maxHeight: '540px',
          display: 'flex', flexDirection: 'column',
          background: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '28px',
          boxShadow: '0 12px 48px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)',
          border: '1.5px solid rgba(255,255,255,0.6)',
          outline: '1px solid rgba(245,158,11,0.25)',
          overflow: 'hidden',
          animation: 'fadeSlideUp 0.3s ease',
        }}>

          {/* Header */}
          <div style={{
            background: 'rgba(20, 24, 40, 0.82)',
            backdropFilter: 'blur(12px)',
            padding: '16px 20px',
            display: 'flex', alignItems: 'center', gap: '14px',
            flexShrink: 0,
            borderBottom: '1px solid rgba(245,158,11,0.3)',
          }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '50%',
              overflow: 'hidden', flexShrink: 0,
              border: '2.5px solid rgba(245,158,11,0.7)',
              boxShadow: '0 0 12px rgba(245,158,11,0.3)',
            }}>
              <Image src="/robot-avatar.png" alt="AI" width={52} height={52}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: '#fff', fontWeight: 700, fontSize: '15px', margin: '0 0 2px 0' }}>
                CryptoNavigator AI
              </p>
              <p style={{ color: '#fbbf24', fontSize: '12px', margin: 0, display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 4px #22c55e' }}></span>
                Ваш особистий крипто-гід
              </p>
            </div>
            <button onClick={handleDismiss}
              style={{ color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', lineHeight: 1, padding: '4px' }}>×</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '290px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: '8px' }}>
                {msg.role === 'assistant' && (
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1.5px solid rgba(245,158,11,0.4)' }}>
                    <Image src="/robot-avatar.png" alt="" width={30} height={30}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </div>
                )}
                <div style={{
                  maxWidth: '80%', padding: '11px 14px',
                  borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                    : 'rgba(255,255,255,0.82)',
                  backdropFilter: 'blur(8px)',
                  color: msg.role === 'user' ? '#fff' : '#1e293b',
                  fontSize: '13.5px', lineHeight: '1.55', whiteSpace: 'pre-wrap',
                  boxShadow: msg.role === 'user'
                    ? '0 3px 12px rgba(245,158,11,0.35)'
                    : '0 2px 8px rgba(0,0,0,0.07)',
                  border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.7)' : 'none',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', overflow: 'hidden', border: '1.5px solid rgba(245,158,11,0.4)' }}>
                  <Image src="/robot-avatar.png" alt="" width={30} height={30}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                </div>
                <div style={{ background: 'rgba(255,255,255,0.82)', padding: '11px 16px', borderRadius: '20px 20px 20px 4px', display: 'flex', gap: '5px', border: '1px solid rgba(255,255,255,0.7)' }}>
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
            <div style={{ padding: '0 16px 12px', display: 'flex', flexWrap: 'wrap', gap: '8px', flexShrink: 0 }}>
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => sendMessage(s)}
                  style={{
                    fontSize: '12px',
                    background: 'rgba(255,255,255,0.7)',
                    color: '#b45309',
                    border: '1px solid rgba(245,158,11,0.35)',
                    borderRadius: '20px', padding: '6px 12px',
                    cursor: 'pointer', backdropFilter: 'blur(4px)',
                    transition: 'all 0.2s',
                    fontWeight: 500,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,158,11,0.18)'; e.currentTarget.style.borderColor = 'rgba(245,158,11,0.6)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(245,158,11,0.35)'; }}
                >{s}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '12px 16px',
            borderTop: '1px solid rgba(255,255,255,0.5)',
            background: 'rgba(255,255,255,0.4)',
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
                background: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(245,158,11,0.3)',
                borderRadius: '24px', padding: '10px 16px',
                outline: 'none', color: '#1e293b',
              }}
            />
            <button onClick={() => sendMessage(input)} disabled={!input.trim() || loading}
              style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: input.trim() && !loading ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'rgba(229,231,235,0.6)',
                border: 'none', color: input.trim() && !loading ? '#fff' : '#9ca3af',
                fontSize: '16px', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'all 0.2s',
                boxShadow: input.trim() && !loading ? '0 3px 10px rgba(245,158,11,0.4)' : 'none',
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
          0%   { transform: scale(1);   opacity: 0.5; }
          70%  { transform: scale(1.7); opacity: 0; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
}
