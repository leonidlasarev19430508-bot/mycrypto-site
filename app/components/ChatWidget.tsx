'use client';
import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_QUESTIONS = [
  '🔥 Яку біржу обрати?',
  '📈 Прогноз Bitcoin?',
  '💡 Що таке стейкінг?',
  '🛡️ Як безпечно зберігати крипту?',
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '👋 Привіт! Я **CryptoBot** — ваш AI-консультант з криптовалют.\n\nМожу допомогти:\n• Вибрати біржу\n• Пояснити новини\n• Відповісти на питання про крипту\n\nЗапитайте що завгодно! 👇'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    setShowQuick(false);
    const userMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          history: messages.slice(-8),
        }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '😔 Вибачте, сталася помилка. Спробуйте ще раз.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (content: string) => {
    return content
      .split('\n')
      .map((line, i) => <p key={i} className={line === '' ? 'mt-1' : ''}>{line}</p>);
  };

  return (
    <>
      {/* Кнопка відкриття */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-105"
        style={{ padding: isOpen ? '14px' : '12px 20px 12px 16px' }}
      >
        {isOpen ? (
          <span className="text-xl">✕</span>
        ) : (
          <>
            <span className="text-2xl">🤖</span>
            <span className="font-semibold text-sm">CryptoBot</span>
          </>
        )}
      </button>

      {/* Вікно чату */}
      {isOpen && (
        <div className="fixed bottom-24 right-5 w-96 h-[560px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-100 overflow-hidden">

          {/* Заголовок */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">🤖</div>
            <div>
              <div className="font-bold">CryptoBot</div>
              <div className="text-xs text-blue-200 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
                AI на основі Claude
              </div>
            </div>
          </div>

          {/* Повідомлення */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-1">🤖</div>
                )}
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-sm'
                    : 'bg-white text-gray-800 shadow-sm rounded-tl-sm'
                }`}>
                  {formatMessage(msg.content)}
                </div>
              </div>
            ))}

            {/* Швидкі питання */}
            {showQuick && messages.length === 1 && (
              <div className="space-y-2 mt-2">
                <p className="text-xs text-gray-400 text-center">Швидкі питання:</p>
                {QUICK_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="w-full text-left text-sm bg-white border border-blue-100 text-blue-700 px-3 py-2 rounded-xl hover:bg-blue-50 transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Індикатор завантаження */}
            {isLoading && (
              <div className="flex justify-start gap-2">
                <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-sm flex-shrink-0">🤖</div>
                <div className="bg-white shadow-sm p-3 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Поле вводу */}
          <div className="border-t bg-white p-3 flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Запитайте про крипту..."
              className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700 disabled:opacity-40 transition flex-shrink-0"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
