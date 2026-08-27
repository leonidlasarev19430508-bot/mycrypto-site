'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Логування помилки (опціонально)
    console.error('Помилка рендерингу:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-lg">
        {/* Емодзі та заголовок */}
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Щось пішло не так</h1>
        
        {/* Опис помилки */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-left">
          <p className="text-red-800 font-medium mb-2">Деталі помилки:</p>
          <p className="text-red-700 text-sm">
            {error.message || 'Невідома помилка під час завантаження сторінки'}
          </p>
          {error.digest && (
            <p className="text-xs text-red-500 mt-2">Код помилки: {error.digest}</p>
          )}
        </div>
        
        <p className="text-gray-600 mb-8">
          Можливо, це тимчасова проблема з сервером або нестача даних. 
          Спробуйте оновити сторінку або повернутися на головну.
        </p>
        
        {/* Кнопки дій */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-sm hover:shadow-md"
          >
            Спробувати ще раз
          </button>
          
          <a
            href="/"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-bold rounded-xl transition-all shadow-sm hover:shadow-md text-center"
          >
            На головну
          </a>
        </div>
        
        {/* Додаткова інформація */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Якщо помилка повторюється:</p>
          <ul className="text-xs text-gray-500 text-left max-w-sm mx-auto space-y-1">
            <li>• Перевірте інтернет-з'єднання</li>
            <li>• Очистіть кеш браузера</li>
            <li>• Зверніться до служби підтримки</li>
          </ul>
        </div>
      </div>
    </div>
  );
}