'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

// 3 варіанти аватара — перемикай щоб обрати кращий
const AVATARS = [
  { src: '/avatar-robot.png',   label: '🤖 Робот'   },
  { src: '/avatar-bitcoin.png', label: '₿ Bitcoin'  },
  { src: '/avatar-human.jpg',   label: '😊 Людина'  },
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
              src={avatar.src}
              alt="AI Навігатор"
              width={76} height={76}
              style={{ borderRadius: '50%', objectFit: 'cover', border: '3px solid #f59e0b', boxShadow: '0 0 0 3px rgba(245,158,11,0.25)' }}
            />
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
          width: '360px',
          display: 'flex', flexDirection: 'column',
          background: 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          borderRadius: '28px',
          boxShadow: '0 16px 56px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.9)',
          border: '1.5px solid rgba(255,255,255,0.7)',
          outline: '1px solid rgba(245,158,11,0.2)',
          overflow: 'visible',
          animation: 'fadeSlideUp 0.3s ease',
        }}>

          {/* Великий аватар зверху — виходить за межі вікна */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            paddingTop: '0', marginTop: '-60px', flexShrink: 0,
          }}>
            <div style={{
              width: '120px', height: '120px', borderRadius: '50%',
              overflow: 'hidden',
              border: '4px solid rgba(245,158,11,0.8)',
              boxShadow: '0 8px 32px rgba(245,158,11,0.4), 0 0 0 6px rgba(255,255,255,0.6)',
              background: 'white',
            }}>
              <Image
                src={avatar.src}
                alt="AI Навігатор"
                width={120} height={120}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>

            {/* Назва і статус */}
            <div style={{ textAlign: 'center', padding: '10px 16px 0' }}>
              <p style={{ margin: '0 0 3px', fontWeight: 700, fontSize: '16px', color: '#1e293b' }}>
                CryptoNavigator AI
              </p>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 4px #22c55e' }}/>
                Ваш особистий крипто-гід
              </p>
            </div>

            {/* Перемикач аватарів */}
            <div style={{ display: 'flex', gap: '6px', padding: '10px 16px 4px', justifyContent: 'center' }}>
              {AVATARS.map((av, i) => (
                <button
                  key={i}
                  onClick={() => setAvatarIndex(i)}
                  title={av.label}
                  style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    overflow: 'hidden', cursor: 'pointer', padding: 0,
                    border: i === avatarIndex ? '2.5px solid #f59e0b' : '2px solid rgba(0,0,0,0.1)',
                    boxShadow: i === avatarIndex ? '0 0 0 2px rgba(245,158,11,0.3)' : 'none',
                    transition: 'all 0.2s',
                    background: 'white',
                  }}
                >
                  <Image src={av.src} alt={av.label} width={32} height={32}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                </button>
              ))}
              <span style={{ fontSize: '11px', color: '#94a3b8', alignSelf: 'center', marginLeft: '4px' }}>
                обери аватар
              </span>
            </div>

            {/* Кнопка закрити */}
            <button
              onClick={handleDismiss}
              style={{
                position: 'absolute', top: '70px', right: '12px',
                color: 'rgba(100,116,139,0.7)', background: 'rgba(255,255,255,0.8)',
                border: '1px solid rgba(0,0,0,0.08)', borderRadius: '50%',
                width: '28px', height: '28px', fontSize: '16px',
                cursor: 'pointer', lineHeight: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >×</button>
          </div>

          {/* Розділювач */}
          <div style={{ height: '1px', background: 'rgba(245,158,11,0.15)', margin: '8px 16px 0' }} />

          {/* Messages */}
          <div style={{
            overflowY: 'auto', padding: '12px 16px',
            display: 'flex', flexDirection: 'column', gap: '10px',
            maxHeight: '240px', minHeight: '80px',
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: '7px' }}>
                {msg.role === 'assistant' && (
                  <div style={{ width: '26px', height: '26px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1.5px solid rgba(245,158,11,0.4)' }}>
                    <Image src={avatar.src} alt="" width={26} height={26}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </div>
                )}
                <div style={{
                  maxWidth: '80%', padding: '10px 13px',
                  borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                    : 'rgba(255,255,255,0.88)',
                  backdropFilter: 'blur(8px)',
                  color: msg.role === 'user' ? '#fff' : '#1e293b',
                  fontSize: '13px', lineHeight: '1.55', whiteSpace: 'pre-wrap',
                  boxShadow: msg.role === 'user' ? '0 3px 10px rgba(245,158,11,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
                  border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.8)' : 'none',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', overflow: 'hidden', border: '1.5px solid rgba(245,158,11,0.4)' }}>
                  <Image src={avatar.src} alt="" width={26} height={26}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                </div>
                <div style={{ background: 'rgba(255,255,255,0.88)', padding: '10px 14px', borderRadius: '18px 18px 18px 4px', display: 'flex', gap: '4px' }}>
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
            <div style={{ padding: '0 16px 10px', display: 'flex', flexWrap: 'wrap', gap: '7px', flexShrink: 0 }}>
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => sendMessage(s)}
                  style={{
                    fontSize: '11.5px',
                    background: 'rgba(255,255,255,0.75)',
                    color: '#b45309',
                    border: '1px solid rgba(245,158,11,0.35)',
                    borderRadius: '20px', padding: '6px 11px',
                    cursor: 'pointer', backdropFilter: 'blur(4px)',
                    transition: 'all 0.2s', fontWeight: 500,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,158,11,0.15)'; e.currentTarget.style.borderColor = 'rgba(245,158,11,0.6)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.75)'; e.currentTarget.style.borderColor = 'rgba(245,158,11,0.35)'; }}
                >{s}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 14px 14px',
            borderTop: '1px solid rgba(255,255,255,0.5)',
            background: 'rgba(255,255,255,0.35)',
            backdropFilter: 'blur(8px)',
            flexShrink: 0,
            borderRadius: '0 0 28px 28px',
          }}>
            <input
              type="text" value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Запитайте що-небудь..."
              disabled={loading}
              style={{
                flex: 1, fontSize: '13px',
                background: 'rgba(255,255,255,0.75)',
                border: '1px solid rgba(245,158,11,0.3)',
                borderRadius: '22px', padding: '9px 15px',
                outline: 'none', color: '#1e293b',
              }}
            />
            <button onClick={() => sendMessage(input)} disabled={!input.trim() || loading}
              style={{
                width: '38px', height: '38px', borderRadius: '50%',
                background: input.trim() && !loading ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'rgba(229,231,235,0.6)',
                border: 'none', color: input.trim() && !loading ? '#fff' : '#9ca3af',
                fontSize: '15px', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
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
