import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="text-center max-w-2xl">
        {/* Велике емодзі та код помилки */}
        <div className="text-8xl mb-4">🔍</div>
        <div className="text-6xl font-black text-gray-900 mb-2">404</div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Сторінку не знайдено</h1>
        
        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
          На жаль, сторінка, яку ви шукаєте, не існує або була переміщена.
          Перевірте URL або поверніться на головну сторінку.
        </p>
        
        {/* Картка з підказками */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Можливо, ви шукаєте:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Link href="/" className="p-3 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl text-orange-700 font-medium transition">
              🏠 Головна сторінка
            </Link>
            <Link href="/coins" className="p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-blue-700 font-medium transition">
              📊 Топ криптовалют
            </Link>
            <Link href="/blog" className="p-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl text-green-700 font-medium transition">
              📰 Крипто блог
            </Link>
            <Link href="/assistant" className="p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl text-purple-700 font-medium transition">
              🤖 AI Асистент
            </Link>
          </div>
        </div>
        
        {/* Основна кнопка повернення */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl text-lg"
        >
          <span>←</span>
          Повернутися на головну
        </Link>
        
        {/* Додаткова інформація */}
        <div className="mt-10 pt-6 border-t border-gray-300">
          <p className="text-sm text-gray-500">
            Якщо ви впевнені, що ця сторінка має існувати, зв'яжіться зі службою підтримки.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Помилка 404 • CryptoNavigator
          </p>
        </div>
      </div>
    </div>
  );
}