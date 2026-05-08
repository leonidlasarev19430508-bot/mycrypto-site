'use client';
import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  cta?: { type: 'binance' | 'whitebit' | 'both' } | null;
}

const UI_TEXT = {
  uk: {
    greeting: '👋 Привіт! Я **CryptoBot** — AI-консультант з криптовалют.\n\nЩоб давати точніші поради, скажи: який у тебе досвід з крипто?',
    levelLabel: 'AI-консультант • CryptoNavigator',
    levels: [
      { key: 'beginner', label: '🌱 Новачок', desc: 'Тільки починаю' },
      { key: 'intermediate', label: '📊 Середній', desc: 'Маю базові знання' },
      { key: 'advanced', label: '🚀 Досвідчений', desc: 'Торгую активно' },
    ],
    greetings: {
      beginner: '😊 Чудово! Поясню все просто і зрозуміло. З чого починаємо?',
      intermediate: '👍 Відмінно! Можемо говорити про деталі. Що тебе цікавить?',
      advanced: '🚀 Супер! Говоримо як рівні. Що обговорюємо?',
    },
    levelBadge: { beginner: '🌱 Новачок', intermediate: '📊 Середній', advanced: '🚀 Про' },
    popularLabel: 'Популярні питання:',
    placeholder: 'Запитайте про крипту...',
    errorMsg: '😔 Сталася помилка. Спробуйте ще раз.',
    quickQuestions: ['🔥 Яку біржу обрати новачку?', '📈 Як читати графік ціни?', '💡 Що таке стейкінг?', '🛡️ Як безпечно зберігати крипту?'],
    exchangeDesc: { binance: 'Найбільша біржа світу — ідеально для старту', whitebit: 'Українська біржа — без складної верифікації' },
    openBtn: 'Відкрити →',
  },
  en: {
    greeting: '👋 Hi! I\'m **CryptoBot** — your AI crypto consultant.\n\nTo give better advice, tell me: what\'s your crypto experience?',
    levelLabel: 'AI Consultant • CryptoNavigator',
    levels: [
      { key: 'beginner', label: '🌱 Beginner', desc: 'Just starting out' },
      { key: 'intermediate', label: '📊 Intermediate', desc: 'I know the basics' },
      { key: 'advanced', label: '🚀 Advanced', desc: 'Active trader' },
    ],
    greetings: {
      beginner: '😊 Great! I\'ll explain everything simply. Where do we start?',
      intermediate: '👍 Excellent! We can discuss details. What interests you?',
      advanced: '🚀 Awesome! Let\'s talk as equals. What are we discussing?',
    },
    levelBadge: { beginner: '🌱 Beginner', intermediate: '📊 Intermediate', advanced: '🚀 Pro' },
    popularLabel: 'Popular questions:',
    placeholder: 'Ask about crypto...',
    errorMsg: '😔 An error occurred. Please try again.',
    quickQuestions: ['🔥 Which exchange for beginners?', '📈 How to read price charts?', '💡 What is staking?', '🛡️ How to store crypto safely?'],
    exchangeDesc: { binance: 'World\'s largest exchange — perfect for beginners', whitebit: 'Easy verification — great for new users' },
    openBtn: 'Open →',
  },
  pl: {
    greeting: '👋 Cześć! Jestem **CryptoBot** — Twój AI-konsultant krypto.\n\nAby dawać trafniejsze porady, powiedz: jakie masz doświadczenie z krypto?',
    levelLabel: 'Konsultant AI • CryptoNavigator',
    levels: [
      { key: 'beginner', label: '🌱 Początkujący', desc: 'Dopiero zaczynam' },
      { key: 'intermediate', label: '📊 Średniozaawansowany', desc: 'Znam podstawy' },
      { key: 'advanced', label: '🚀 Zaawansowany', desc: 'Aktywnie handluję' },
    ],
    greetings: {
      beginner: '😊 Świetnie! Wyjaśnię wszystko prosto. Od czego zaczynamy?',
      intermediate: '👍 Doskonale! Możemy rozmawiać o szczegółach. Co Cię interesuje?',
      advanced: '🚀 Super! Rozmawiamy jak równy z równym. Co omawiamy?',
    },
    levelBadge: { beginner: '🌱 Początkujący', intermediate: '📊 Średni', advanced: '🚀 Pro' },
    popularLabel: 'Popularne pytania:',
    placeholder: 'Zapytaj o krypto...',
    errorMsg: '😔 Wystąpił błąd. Spróbuj ponownie.',
    quickQuestions: ['🔥 Którą giełdę wybrać dla początkujących?', '📈 Jak czytać wykres ceny?', '💡 Czym jest staking?', '🛡️ Jak bezpiecznie przechowywać krypto?'],
    exchangeDesc: { binance: 'Największa giełda świata — idealna na start', whitebit: 'Łatwa weryfikacja — świetna dla nowych użytkowników' },
    openBtn: 'Otwórz →',
  },
  de: {
    greeting: '👋 Hallo! Ich bin **CryptoBot** — dein KI-Krypto-Berater.\n\nUm bessere Ratschläge zu geben, sag mir: Wie viel Erfahrung hast du mit Krypto?',
    levelLabel: 'KI-Berater • CryptoNavigator',
    levels: [
      { key: 'beginner', label: '🌱 Anfänger', desc: 'Fange gerade an' },
      { key: 'intermediate', label: '📊 Mittelstufe', desc: 'Kenne die Grundlagen' },
      { key: 'advanced', label: '🚀 Fortgeschritten', desc: 'Aktiver Trader' },
    ],
    greetings: {
      beginner: '😊 Super! Ich erkläre alles einfach. Womit fangen wir an?',
      intermediate: '👍 Ausgezeichnet! Wir können Details besprechen. Was interessiert dich?',
      advanced: '🚀 Toll! Wir reden auf Augenhöhe. Was besprechen wir?',
    },
    levelBadge: { beginner: '🌱 Anfänger', intermediate: '📊 Mittel', advanced: '🚀 Pro' },
    popularLabel: 'Beliebte Fragen:',
    placeholder: 'Frag nach Krypto...',
    errorMsg: '😔 Ein Fehler ist aufgetreten. Bitte versuche es erneut.',
    quickQuestions: ['🔥 Welche Börse für Anfänger?', '📈 Wie liest man Preischarts?', '💡 Was ist Staking?', '🛡️ Wie bewahrt man Krypto sicher auf?'],
    exchangeDesc: { binance: 'Weltgrößte Börse — ideal für Einsteiger', whitebit: 'Einfache Verifizierung — gut für neue Nutzer' },
    openBtn: 'Öffnen →',
  },
};

function ExchangeCTA({ type, locale }: { type: 'binance' | 'whitebit' | 'both'; locale: string }) {
  const t = UI_TEXT[locale as keyof typeof UI_TEXT] || UI_TEXT.uk;
  const EXCHANGES = {
    binance: { name: 'Binance', desc: t.exchangeDesc.binance, color: 'from-yellow-400 to-orange-500', url: 'https://www.binance.com/register?ref=GRO_28502_BIO0R', emoji: '🟡' },
    whitebit: { name: 'WhiteBIT', desc: t.exchangeDesc.whitebit, color: 'from-blue-500 to-blue-700', url: 'https://whitebit.com/referral/54626c3b-5240-4d39-9784-8e3eda5736de', emoji: '🔵' },
  };
  const items = type === 'both' ? [EXCHANGES.binance, EXCHANGES.whitebit] : [EXCHANGES[type]];
  return (
    <div className="mt-2 space-y-2">
      {items.map((ex) => (
        <a key={ex.name} href={ex.url} target="_blank" rel="noopener noreferrer"
          className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r ${ex.color} text-white hover:opacity-90 transition-opacity`}>
          <span className="text-2xl">{ex.emoji}</span>
          <div className="flex-1">
            <div className="font-bold text-sm">{ex.name}</div>
            <div className="text-xs opacity-90">{ex.desc}</div>
          </div>
          <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-lg">{t.openBtn}</span>
        </a>
      ))}
    </div>
  );
}

export default function ChatWidget({ locale = 'uk' }: { locale?: string }) {
  const t = UI_TEXT[locale as keyof typeof UI_TEXT] || UI_TEXT.uk;
  const [isOpen, setIsOpen] = useState(false);
  const [userLevel, setUserLevel] = useState<'unknown' | 'beginner' | 'intermediate' | 'advanced'>('unknown');
  const [showLevelPicker, setShowLevelPicker] = useState(true);
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: t.greeting }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  useEffect(() => { if (isOpen) setTimeout(() => inputRef.current?.focus(), 100); }, [isOpen]);

  const selectLevel = (level: 'beginner' | 'intermediate' | 'advanced') => {
    setUserLevel(level);
    setShowLevelPicker(false);
    setMessages(prev => [...prev, { role: 'assistant', content: t.greetings[level] }]);
  };

  const sendMessage = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;
    setMessages(prev => [...prev, { role: 'user', content: messageText }]);
    setInput('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText, history: messages.slice(-10), userLevel, locale }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply, cta: data.cta || null }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: t.errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (content: string) => content.split('\n').map((line, i) => (
    <p key={i} className={line === '' ? 'mt-1' : 'mb-0.5'}>{line.replace(/\*\*(.*?)\*\*/g, '$1')}</p>
  ));

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-105"
        style={{ padding: isOpen ? '14px' : '12px 20px 12px 16px' }}>
        {isOpen ? <span className="text-xl">✕</span> : (<><span className="text-2xl">🤖</span><span className="font-semibold text-sm">CryptoBot</span></>)}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-5 w-96 h-[580px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">🤖</div>
            <div>
              <div className="font-bold">CryptoBot</div>
              <div className="text-xs text-blue-200 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block animate-pulse"></span>
                {t.levelLabel}
              </div>
            </div>
            {userLevel !== 'unknown' && (
              <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded-full">
                {t.levelBadge[userLevel as keyof typeof t.levelBadge]}
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-1">🤖</div>
                )}
                <div className="max-w-[82%]">
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-white text-gray-800 shadow-sm rounded-tl-sm'}`}>
                    {formatMessage(msg.content)}
                  </div>
                  {msg.cta && <ExchangeCTA type={msg.cta.type} locale={locale} />}
                </div>
              </div>
            ))}

            {showLevelPicker && messages.length === 1 && (
              <div className="space-y-2 mt-2">
                {t.levels.map((item) => (
                  <button key={item.key} onClick={() => selectLevel(item.key as 'beginner' | 'intermediate' | 'advanced')}
                    className="w-full text-left bg-white border-2 border-blue-100 hover:border-blue-400 text-gray-800 px-4 py-3 rounded-xl transition-all group">
                    <div className="font-semibold text-sm group-hover:text-blue-600">{item.label}</div>
                    <div className="text-xs text-gray-400">{item.desc}</div>
                  </button>
                ))}
              </div>
            )}

            {!showLevelPicker && messages.length === 2 && (
              <div className="space-y-1.5 mt-1">
                <p className="text-xs text-gray-400 text-center">{t.popularLabel}</p>
                {t.quickQuestions.map((q, i) => (
                  <button key={i} onClick={() => sendMessage(q)}
                    className="w-full text-left text-sm bg-white border border-blue-100 text-blue-700 px-3 py-2 rounded-xl hover:bg-blue-50 transition">
                    {q}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start gap-2">
                <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-sm flex-shrink-0">🤖</div>
                <div className="bg-white shadow-sm p-3 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1 items-center h-4">
                    {[0, 150, 300].map((delay) => (
                      <span key={delay} className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t bg-white p-3 flex gap-2">
            <input ref={inputRef} type="text" value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={t.placeholder}
              className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading} />
            <button onClick={() => sendMessage()} disabled={isLoading || !input.trim()}
              className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700 disabled:opacity-40 transition flex-shrink-0">
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}