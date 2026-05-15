'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

const AVATARS = [
  { src: '/avatar-robot.png',   label: '🤖' },
  { src: '/avatar-bitcoin.png', label: '₿'  },
  { src: '/avatar-human.png',   label: '😊' },
];

const SUGGESTIONS = [
  '🪙 Що таке Bitcoin?',
  '📈 Як купити крипту?',
  '🏦 Яку біржу обрати?',
  '💰 З якої суми почати?',
];

export default function WelcomeBubble() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '👋 Вітаю у CryptoNavigator!\n\nЯ ваш особистий AI-гід у світі криптовалют. Допоможу розібратись з біржами, поясню терміни та відповім на будь-які питання.\n\nЗ чого почнемо?',
    },
  ]);
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

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
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

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          width: '72px', height: '72px', borderRadius: '50%',
          background: 'transparent', border: 'none', padding: 0,
          cursor: 'pointer', transition: 'transform 0.2s',
          filter: 'drop-shadow(0 4px 16px rgba(245,158,11,0.5))',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        aria-label="AI Навігатор"
      >
        {open ? (
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            background: 'rgba(245,158,11,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', color: 'white', fontWeight: 'bold',
          }}>✕</div>
        ) : (
          <div style={{ position: 'relative', width: '72px', height: '72px' }}>
            <Image
              src={avatar.src}
              alt="AI Навігатор"
              width={72} height={72}
              style={{ width: '72px', height: '72px', objectFit: 'cover', borderRadius: '50%' }}
            />
            <span style={{
              position: 'absolute', bottom: '3px', right: '3px',
              width: '13px', height: '13px', borderRadius: '50%',
              background: '#22c55e', border: '2px solid white',
            }}/>
          </div>
        )}
      </button>

      {/* Pulse ring */}
      {!open && (
        <span style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9998,
          width: '72px', height: '72px', borderRadius: '50%',
          background: 'rgba(245,158,11,0.18)',
          animation: 'pulseRing 2s infinite', pointerEvents: 'none',
        }} />
      )}

      {/* Chat window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: '112px', right: '24px', zIndex: 9999,
          width: '360px',
          display: 'flex', flexDirection: 'column',
          background: 'rgba(255,255,255,0.78)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          borderRadius: '32px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.13), inset 0 1px 0 rgba(255,255,255,0.9)',
          border: '1.5px solid rgba(255,255,255,0.7)',
          overflow: 'visible',
          animation: 'fadeSlideUp 0.3s ease',
        }}>

          {/* Аватар — виходить за верхній край, без обрізання */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            marginTop: '-100px',
            position: 'relative',
          }}>
            {/* Аватар — квадратне зображення показуємо як є, без border-radius */}
            <Image
              src={avatar.src}
              alt="AI Навігатор"
              width={200} height={200}
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.15))',
              }}
            />

            {/* Перемикач аватарів */}
            <div style={{
              display: 'flex', gap: '8px',
              marginTop: '-4px',
              alignItems: 'center',
            }}>
              {AVATARS.map((av, i) => (
                <button
                  key={i}
                  onClick={() => setAvatarIndex(i)}
                  style={{
                    width: '30px', height: '30px', borderRadius: '50%',
                    overflow: 'hidden', cursor: 'pointer', padding: 0,
                    border: i === avatarIndex
                      ? '2.5px solid #f59e0b'
                      : '2px solid rgba(0,0,0,0.1)',
                    opacity: i === avatarIndex ? 1 : 0.55,
                    transition: 'all 0.2s',
                    background: 'white',
                  }}
                >
                  <Image src={av.src} alt={av.label} width={30} height={30}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                </button>
              ))}
              <span style={{ fontSize: '10.5px', color: '#94a3b8', marginLeft: '2px' }}>
                обери аватар
              </span>
            </div>

            {/* Назва і статус */}
            <div style={{ textAlign: 'center', padding: '8px 20px 0' }}>
              <p style={{ margin: '0 0 3px', fontWeight: 700, fontSize: '15px', color: '#1e293b' }}>
                CryptoNavigator AI
              </p>
              <p style={{ margin: 0, fontSize: '11.5px', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}/>
                Ваш особистий крипто-гід
              </p>
            </div>

            {/* Кнопка закрити */}
            <button onClick={handleDismiss} style={{
              position: 'absolute', top: '108px', right: '12px',
              width: '26px', height: '26px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(0,0,0,0.08)',
              color: '#94a3b8', fontSize: '16px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>×</button>
          </div>

          {/* Розділювач */}
          <div style={{ height: '1px', background: 'rgba(245,158,11,0.15)', margin: '10px 16px 0' }} />

          {/* Messages */}
          <div style={{
            overflowY: 'auto', padding: '12px 14px',
            display: 'flex', flexDirection: 'column', gap: '10px',
            maxHeight: '200px',
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                alignItems: 'flex-end', gap: '6px',
              }}>
                {msg.role === 'assistant' && (
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                    <Image src={avatar.src} alt="" width={24} height={24}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </div>
                )}
                <div style={{
                  maxWidth: '80%', padding: '9px 12px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                    : 'rgba(255,255,255,0.92)',
                  color: msg.role === 'user' ? '#fff' : '#1e293b',
                  fontSize: '13px', lineHeight: '1.55', whiteSpace: 'pre-wrap',
                  boxShadow: msg.role === 'user'
                    ? '0 3px 10px rgba(245,158,11,0.3)'
                    : '0 2px 6px rgba(0,0,0,0.06)',
                  border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.8)' : 'none',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', overflow: 'hidden' }}>
                  <Image src={avatar.src} alt="" width={24} height={24}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                </div>
                <div style={{ background: 'rgba(255,255,255,0.92)', padding: '9px 13px', borderRadius: '16px 16px 16px 4px', display: 'flex', gap: '4px' }}>
                  {[0, 150, 300].map(delay => (
                    <span key={delay} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block', animation: `bounce 1s ${delay}ms infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div style={{ padding: '0 14px 10px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => sendMessage(s)}
                  style={{
                    fontSize: '11.5px',
                    background: 'rgba(255,255,255,0.85)',
                    color: '#b45309',
                    border: '1px solid rgba(245,158,11,0.3)',
                    borderRadius: '20px', padding: '5px 11px',
                    cursor: 'pointer', transition: 'all 0.2s', fontWeight: 500,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,158,11,0.15)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; }}
                >{s}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            padding: '10px 14px 14px',
            borderTop: '1px solid rgba(255,255,255,0.5)',
            background: 'rgba(255,255,255,0.3)',
            backdropFilter: 'blur(8px)',
            borderRadius: '0 0 32px 32px',
          }}>
            <input
              type="text" value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Запитайте що-небудь..."
              disabled={loading}
              style={{
                flex: 1, fontSize: '13px',
                background: 'rgba(255,255,255,0.8)',
                border: '1px solid rgba(245,158,11,0.25)',
                borderRadius: '22px', padding: '9px 14px',
                outline: 'none', color: '#1e293b',
              }}
            />
            <button onClick={() => sendMessage(input)} disabled={!input.trim() || loading}
              style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: input.trim() && !loading ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'rgba(229,231,235,0.6)',
                border: 'none', color: input.trim() && !loading ? '#fff' : '#9ca3af',
                fontSize: '14px', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'all 0.2s',
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
