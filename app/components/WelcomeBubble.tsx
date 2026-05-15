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

// Стиль бульбашки — без border, бо він задається окремо де потрібно
const bubbleBackground = 'radial-gradient(circle, #ffffff 55%, #e3f2fd 100%)';
const bubbleShadow = '0 8px 28px rgba(0,0,0,0.12)';

export default function WelcomeBubble() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
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
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const chatHeight = 480;
  const avatarOverhang = 90;
  const bottomOffset = 112;
  const totalHeight = chatHeight + avatarOverhang;
  const adjustedBottom = windowHeight > 0 && totalHeight + bottomOffset > windowHeight
    ? windowHeight - totalHeight - 16
    : bottomOffset;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          width: '72px', height: '72px', borderRadius: '50%',
          background: bubbleBackground,
          border: '2px solid rgba(255,255,255,0.75)',
          boxShadow: bubbleShadow,
          padding: 0, cursor: 'pointer', transition: 'transform 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        aria-label="AI Навігатор"
      >
        {open ? (
          <span style={{ fontSize: '24px', color: '#64748b' }}>✕</span>
        ) : (
          <div style={{ position: 'relative', width: '72px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image src={avatar.src} alt="AI Навігатор" width={60} height={60}
              style={{ objectFit: 'contain' }} />
            <span style={{
              position: 'absolute', bottom: '4px', right: '4px',
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
          background: 'rgba(245,158,11,0.15)',
          animation: 'pulseRing 2s infinite', pointerEvents: 'none',
        }} />
      )}

      {/* Chat window */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: `${adjustedBottom}px`,
          right: '24px',
          zIndex: 9998,
          width: '360px',
          height: `${chatHeight}px`,
          display: 'flex', flexDirection: 'column',
          background: 'rgba(255,255,255,0.82)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          borderRadius: '32px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.13), inset 0 1px 0 rgba(255,255,255,0.9)',
          border: '1.5px solid rgba(255,255,255,0.7)',
          overflow: 'hidden',
          animation: 'fadeSlideUp 0.3s ease',
        }}>

          {/* Простір під аватар */}
          <div style={{ height: `${avatarOverhang + 10}px`, flexShrink: 0 }} />

          {/* Перемикач аватарів + назва */}
          <div style={{ textAlign: 'center', padding: '0 20px 8px', flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '8px' }}>
              {AVATARS.map((av, i) => (
                <button key={i} onClick={() => setAvatarIndex(i)}
                  style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    cursor: 'pointer', padding: '2px',
                    background: bubbleBackground,
                    border: i === avatarIndex ? '2px solid #f59e0b' : '2px solid rgba(0,0,0,0.1)',
                    opacity: i === avatarIndex ? 1 : 0.5,
                    transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                  <Image src={av.src} alt={av.label} width={22} height={22}
                    style={{ objectFit: 'contain' }} />
                </button>
              ))}
              <span style={{ fontSize: '10px', color: '#94a3b8', alignSelf: 'center' }}>обери</span>
            </div>
            <p style={{ margin: '0 0 2px', fontWeight: 700, fontSize: '15px', color: '#1e293b' }}>
              CryptoNavigator AI
            </p>
            <p style={{ margin: 0, fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}/>
              Ваш особистий крипто-гід
            </p>
          </div>

          <div style={{ height: '1px', background: 'rgba(245,158,11,0.15)', margin: '0 16px' }} />

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: '6px' }}>
                {msg.role === 'assistant' && (
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: bubbleBackground,
                    border: '1.5px solid rgba(255,255,255,0.75)',
                  }}>
                    <Image src={avatar.src} alt="" width={18} height={18} style={{ objectFit: 'contain' }} />
                  </div>
                )}
                <div style={{
                  maxWidth: '80%', padding: '9px 12px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'rgba(255,255,255,0.95)',
                  color: msg.role === 'user' ? '#fff' : '#1e293b',
                  fontSize: '13px', lineHeight: '1.55', whiteSpace: 'pre-wrap',
                  boxShadow: msg.role === 'user' ? '0 3px 10px rgba(245,158,11,0.3)' : '0 2px 6px rgba(0,0,0,0.06)',
                  border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.8)' : 'none',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: bubbleBackground,
                  border: '1.5px solid rgba(255,255,255,0.75)',
                }}>
                  <Image src={avatar.src} alt="" width={18} height={18} style={{ objectFit: 'contain' }} />
                </div>
                <div style={{ background: 'rgba(255,255,255,0.95)', padding: '9px 13px', borderRadius: '16px 16px 16px 4px', display: 'flex', gap: '4px' }}>
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
            <div style={{ padding: '0 14px 8px', display: 'flex', flexWrap: 'wrap', gap: '6px', flexShrink: 0 }}>
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => sendMessage(s)}
                  style={{
                    fontSize: '11.5px', background: 'rgba(255,255,255,0.85)', color: '#b45309',
                    border: '1px solid rgba(245,158,11,0.3)', borderRadius: '20px', padding: '5px 11px',
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
            display: 'flex', alignItems: 'center', gap: '7px', padding: '8px 14px 12px',
            borderTop: '1px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.3)',
            backdropFilter: 'blur(8px)', flexShrink: 0,
          }}>
            <input type="text" value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Запитайте що-небудь..."
              disabled={loading}
              style={{
                flex: 1, fontSize: '13px', background: 'rgba(255,255,255,0.8)',
                border: '1px solid rgba(245,158,11,0.25)', borderRadius: '22px', padding: '9px 14px',
                outline: 'none', color: '#1e293b',
              }}
            />
            <button onClick={() => sendMessage(input)} disabled={!input.trim() || loading}
              style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: input.trim() && !loading ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'rgba(229,231,235,0.6)',
                border: 'none', color: input.trim() && !loading ? '#fff' : '#9ca3af',
                fontSize: '14px', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}
            >➤</button>
          </div>
        </div>
      )}

      {/* Аватар — окремий елемент поверх вікна */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: `${adjustedBottom + chatHeight - avatarOverhang}px`,
          right: '24px',
          zIndex: 9999,
          width: '360px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          pointerEvents: 'none',
        }}>
          <button onClick={handleDismiss}
            style={{
              position: 'absolute', top: '4px', right: '8px',
              width: '26px', height: '26px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid rgba(0,0,0,0.08)',
              color: '#94a3b8', fontSize: '16px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'all', zIndex: 10000,
            }}>×</button>

          <div style={{
            width: '180px', height: '180px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: bubbleBackground,
            border: '2px solid rgba(255,255,255,0.75)',
            boxShadow: bubbleShadow,
          }}>
            <Image src={avatar.src} alt="AI Навігатор" width={164} height={164}
              style={{ objectFit: 'contain', width: '164px', height: '164px' }} />
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
