'use client';
import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Привіт! Я ваш AI-крипто-консультант. Запитайте про будь-яку монету, і я зроблю аналіз на основі свіжих новин.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
          history: messages.slice(-10)
        })
      });

      const data = await response.json();
      const assistantMessage = { role: 'assistant' as const, content: data.reply };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Вибачте, сталася помилка. Спробуйте пізніше.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">🤖 Crypto AI Assistant</h1>
        <p className="text-gray-600 mt-2">Ваш персональний консультант з криптовалют. Запитайте про будь-яку монету — я проаналізую новини та дам рекомендацію.</p>
      </div>

      {/* Область повідомлень */}
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
                🤔 думаю...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Поле вводу */}
        <div className="border-t p-4 flex gap-2 bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Наприклад: Що думаєш про Bitcoin? Які новини по Ethereum?"
            className="flex-1 border rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading}
            className="bg-blue-600 text-white rounded-full px-6 py-3 hover:bg-blue-700 disabled:opacity-50 transition"
          >
            Надіслати
          </button>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        <p>💡 Порада: запитайте про Bitcoin, Ethereum, Solana або іншу монету. AI проаналізує свіжі новини та дасть рекомендацію.</p>
      </div>
    </div>
  );
}