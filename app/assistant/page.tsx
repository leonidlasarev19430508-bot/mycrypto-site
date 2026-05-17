'use client';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const UI = {
  uk: {
    title: '🤖 Crypto AI Assistant',
    subtitle: 'Ваш персональний консультант з криптовалют. Запитайте про будь-яку монету — я проаналізую новини та дам рекомендацію.',
    greeting: 'Привіт! Я ваш AI-крипто-консультант. Запитайте про будь-яку монету, і я зроблю аналіз на основі свіжих новин.',
    placeholder: 'Наприклад: Що думаєш про Bitcoin? Які новини по Ethereum?',
    send: 'Надіслати',
    thinking: '🤔 думаю...',
    error: 'Вибачте, сталася помилка. Спробуйте пізніше.',
    tip: '💡 Порада: запитайте про Bitcoin, Ethereum, Solana або іншу монету. AI проаналізує свіжі новини та дасть рекомендацію.',
  },
  en: {
    title: '🤖 Crypto AI Assistant',
    subtitle: 'Your personal crypto consultant. Ask about any coin — I\'ll analyze the news and give a recommendation.',
    greeting: 'Hi! I\'m your AI crypto consultant. Ask me about any coin and I\'ll analyze the latest news.',
    placeholder: 'E.g.: What do you think about Bitcoin? Any news on Ethereum?',
    send: 'Send',
    thinking: '🤔 thinking...',
    error: 'Sorry, an error occurred. Please try again later.',
    tip: '💡 Tip: ask about Bitcoin, Ethereum, Solana or any other coin. AI will analyze fresh news and give a recommendation.',
  },
  pl: {
    title: '🤖 Crypto AI Assistant',
    subtitle: 'Twój osobisty konsultant krypto. Zapytaj o dowolną monetę — przeanalizuję newsy i dam rekomendację.',
    greeting: 'Cześć! Jestem Twoim konsultantem AI ds. kryptowalut. Zapytaj o dowolną monetę, a przeanalizuję najnowsze wiadomości.',
    placeholder: 'Np.: Co myślisz o Bitcoin? Jakie nowości o Ethereum?',
    send: 'Wyślij',
    thinking: '🤔 myślę...',
    error: 'Przepraszamy, wystąpił błąd. Spróbuj ponownie później.',
    tip: '💡 Wskazówka: zapytaj o Bitcoin, Ethereum, Solana lub inną monetę. AI przeanalizuje świeże wiadomości i da rekomendację.',
  },
  de: {
    title: '🤖 Crypto AI Assistant',
    subtitle: 'Dein persönlicher Krypto-Berater. Frag nach einer Münze — ich analysiere die News und gebe eine Empfehlung.',
    greeting: 'Hallo! Ich bin dein KI-Krypto-Berater. Frag mich nach einer Münze und ich analysiere die neuesten Nachrichten.',
    placeholder: 'Z.B.: Was denkst du über Bitcoin? Neuigkeiten zu Ethereum?',
    send: 'Senden',
    thinking: '🤔 denke nach...',
    error: 'Entschuldigung, ein Fehler ist aufgetreten. Bitte versuche es später erneut.',
    tip: '💡 Tipp: Frag nach Bitcoin, Ethereum, Solana oder einer anderen Münze. KI analysiert aktuelle Nachrichten und gibt eine Empfehlung.',
  },
};

export default function AssistantPage() {
  const pathname = usePathname();
  const locale = pathname.startsWith('/en') ? 'en'
    : pathname.startsWith('/pl') ? 'pl'
    : pathname.startsWith('/de') ? 'de'
    : 'uk';
  const t = UI[locale as keyof typeof UI] || UI.uk;

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: t.greeting }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages.slice(-10),
          locale,
        })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: t.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t.title}</h1>
        <p className="text-gray-600 mt-2">{t.subtitle}</p>
      </div>

      <div className="bg-white rounded-xl border shadow-sm h-[500px] flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg whitespace-pre-wrap ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 p-3 rounded-lg">
                {t.thinking}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t p-4 flex gap-2 bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={t.placeholder}
            className="flex-1 border rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading}
            className="bg-blue-600 text-white rounded-full px-6 py-3 hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {t.send}
          </button>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        <p>{t.tip}</p>
      </div>
    </div>
  );
}
