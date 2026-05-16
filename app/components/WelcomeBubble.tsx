'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

const AVATARS = [
  { src: '/avatar-robot-v2.png',   label: '🤖' },
  { src: '/avatar-bitcoin-v2.png', label: '₿'  },
  { src: '/avatar-human-v2.png',   label: '😊' },
];

const SUGGESTIONS = [
  '🪙 Що таке Bitcoin?',
  '📈 Як купити крипту?',
  '🏦 Яку біржу обрати?',
  '💰 З якої суми почати?',
];

const GREETING = 'Привіт! Я ваш особистий крипто-консультант.\nЯк я можу допомогти вам сьогодні?';

export default function WelcomeBubble() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const avatar = AVATARS[avatarIndex];

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

  const handleBack = () => {
    setStarted(false);
    setMessages([]);
    setInput('');
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setStarted(true);
    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
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

  const avatarImgStyle = {
    objectFit: 'cover' as const,
    transform: 'scale(1.15)',
    display: 'block',
  };

  const cardHeight = 494;
  const avatarSize = 170;
  const avatarBottom = 112 + cardHeight - 20;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          width: '80px', height: '80px', borderRadius: '50%',
          background: 'transparent', border: 'none', padding: 0,
          cursor: 'pointer', transition: 'transform 0.2s', overflow: 'hidden',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        aria-label="AI Навігатор"
      >
        {open ? (
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'rgba(245,158,11,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', color: 'white', fontWeight: 'bold',
          }}>✕</div>
        ) : (
          <div style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden' }}>
            <Image src={avatar.src} alt="AI Навігатор" width={80} height={80}
              style={{ ...avatarImgStyle, width: '80px', height: '80px' }} />
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
          width: '80px', height: '80px', borderRadius: '50%',
          background: 'rgba(245,158,11,0.15)',
          animation: 'pulseRing 2s infinite', pointerEvents: 'none',
        }} />
      )}

      {/* Аватар */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: `${avatarBottom}px`,
          right: '24px',
          zIndex: 99999,
          width: '360px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'none',
        }}>
          <button onClick={handleDismiss} style={{
            position: 'absolute', top: '8px', right: '8px',
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.95)',
            border: '1px solid rgba(0,0,0,0.1)',
            color: '#94a3b8', fontSize: '16px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'all',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}>×</button>

          <div style={{
            width: `${avatarSize}px`, height: `${avatarSize}px`,
            borderRadius: '50%', overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          }}>
            <Image src={avatar.src} alt="AI Навігатор" width={avatarSize} height={avatarSize}
              style={{ ...avatarImgStyle, width: `${avatarSize}px`, height: `${avatarSize}px` }} />
          </div>
        </div>
      )}

      {/* Chat window */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: '112px',
          right: '24px',
          zIndex: 9998,
          width: '360px',
          height: `${cardHeight}px`,
          display: 'flex', flexDirection: 'column',
          background: 'rgba(255,255,255,0.78)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '28px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
          border: '1px solid rgba(255,255,255,0.8)',
          overflow: 'hidden',
          animation: 'fadeSlideUp 0.3s ease',
        }}>

          {/* Шапка — paddingTop збільшено щоб перемикачі не налізали на аватар */}
          <div style={{
            paddingTop: '28px',
            paddingBottom: '10px',
            textAlign: 'center',
            flexShrink: 0,
            boxShadow: 'inset 0 6px 20px rgba(0,0,0,0.06)',
            background: 'rgba(248,249,250,0.7)',
            borderBottom: '1px solid rgba(0,0,0,0.05)',
            position: 'relative',
          }}>
            {/* Кнопка Назад — тільки в режимі чату */}
            {started && (
              <button onClick={handleBack} style={{
                position: 'absolute', left: '12px', top: '32px',
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#6b7280', fontSize: '13px', fontWeight: 500,
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '4px 8px', borderRadius: '12px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
              >
                ← Назад
              </button>
            )}

            {/* Перемикач аватарів */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '6px' }}>
              {AVATARS.map((av, i) => (
                <button key={i} onClick={() => setAvatarIndex(i)}
                  style={{
                    width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden',
                    border: i === avatarIndex ? '2.5px solid #f59e0b' : '2px solid rgba(0,0,0,0.1)',
                    opacity: i === avatarIndex ? 1 : 0.4,
                    transition: 'all 0.2s', cursor: 'pointer', padding: 0, background: 'none',
                  }}>
                  <Image src={av.src} alt={av.label} width={28} height={28}
                    style={{ ...avatarImgStyle, width: '28px', height: '28px' }} />
                </button>
              ))}
            </div>
            <p style={{ margin: '0 0 3px', fontWeight: 700, fontSize: '16px', color: '#1a1a2e' }}>
              CryptoNavigator AI
            </p>
            <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}/>
              Онлайн
            </span>
          </div>

          {/* Привітання */}
          {!started && (
            <div style={{ padding: '18px 20px 10px', flexShrink: 0, textAlign: 'center' }}>
              <p style={{
                margin: 0, fontSize: '16px', fontWeight: 600,
                color: '#1e293b', lineHeight: '1.65', whiteSpace: 'pre-line',
              }}>
                {GREETING}
              </p>
            </div>
          )}

          {/* Suggestions */}
          {!started && (
            <div style={{ padding: '8px 14px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', flexShrink: 0 }}>
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => sendMessage(s)}
                  style={{
                    fontSize: '13px', background: 'rgba(255,255,255,0.85)', color: '#374151',
                    border: '1px solid rgba(0,0,0,0.08)', borderRadius: '20px', padding: '9px 10px',
                    cursor: 'pointer', transition: 'all 0.2s', fontWeight: 500, textAlign: 'center',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(254,243,199,0.95)'; e.currentTarget.style.borderColor = '#f59e0b'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; }}
                >{s}</button>
              ))}
            </div>
          )}

          {/* Messages */}
          {started && (
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: '6px' }}>
                  {msg.role === 'assistant' && (
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                      <Image src={avatar.src} alt="" width={24} height={24}
                        style={{ ...avatarImgStyle, width: '24px', height: '24px' }} />
                    </div>
                  )}
                  <div style={{
                    maxWidth: '80%', padding: '9px 13px',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: msg.role === 'user' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'rgba(241,245,249,0.95)',
                    color: msg.role === 'user' ? '#fff' : '#1e293b',
                    fontSize: '13px', lineHeight: '1.55', whiteSpace: 'pre-wrap',
                    boxShadow: msg.role === 'user' ? '0 3px 10px rgba(245,158,11,0.25)' : 'none',
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                    <Image src={avatar.src} alt="" width={24} height={24}
                      style={{ ...avatarImgStyle, width: '24px', height: '24px' }} />
                  </div>
                  <div style={{ background: 'rgba(241,245,249,0.95)', padding: '9px 13px', borderRadius: '16px 16px 16px 4px', display: 'flex', gap: '4px' }}>
                    {[0, 150, 300].map(delay => (
                      <span key={delay} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block', animation: `bounce 1s ${delay}ms infinite` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {!started && <div style={{ flex: 1 }} />}

          {/* Input */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 14px 16px',
            borderTop: '1px solid rgba(0,0,0,0.05)',
            background: 'rgba(255,255,255,0.5)',
            flexShrink: 0,
          }}>
            <input type="text" value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Запитайте що-небудь..."
              disabled={loading}
              style={{
                flex: 1, fontSize: '14px',
                background: 'rgba(255,255,255,0.9)',
                border: '1px solid rgba(0,0,0,0.1)', borderRadius: '24px', padding: '10px 16px',
                outline: 'none', color: '#1e293b',
              }}
            />
            <button onClick={() => sendMessage(input)} disabled={!input.trim() || loading}
              style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: input.trim() && !loading ? 'linear-gradient(135deg, #f59e0b, #d97706)' : '#e5e7eb',
                border: 'none', color: input.trim() && !loading ? '#fff' : '#9ca3af',
                fontSize: '16px', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                boxShadow: input.trim() && !loading ? '0 3px 10px rgba(245,158,11,0.35)' : 'none',
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
