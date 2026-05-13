'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WelcomeBubble() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const lastDismissed = sessionStorage.getItem('welcomeBubbleDismissed');
    if (lastDismissed) { setDismissed(true); return; }
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem('welcomeBubbleDismissed', 'true');
  };

  if (dismissed) return null;

  return (
    <>
      {/* Floating avatar button */}
      <button
        onClick={() => setVisible(v => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl overflow-hidden border-2 border-blue-500 hover:scale-110 transition-transform bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-2xl"
        aria-label="AI Асистент"
      >
        🤖
      </button>

      {/* Bubble message */}
      {visible && (
        <div className="fixed bottom-24 right-6 z-50 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
          style={{ animation: 'fadeSlideUp 0.3s ease' }}>

          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-lg flex-shrink-0">
              🤖
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900 dark:text-white">CryptoNavigator AI</p>
              <span className="flex items-center gap-1 text-xs text-green-500">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                Онлайн
              </span>
            </div>
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl leading-none"
              aria-label="Закрити"
            >
              ×
            </button>
          </div>

          {/* Message */}
          <div className="p-4">
            <div className="bg-blue-50 dark:bg-gray-700 rounded-xl rounded-tl-none p-3 text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
              👋 Доброго дня! Я AI-асистент CryptoNavigator.<br /><br />
              Допоможу розібратись у криптовалютах, поясню терміни та відповім на будь-які питання про крипторинок.
            </div>
          </div>

          {/* CTA */}
          <div className="px-4 pb-4">
            <Link
              href="/assistant"
              onClick={handleDismiss}
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-colors"
            >
              💬 Запитати AI-асистента
            </Link>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
