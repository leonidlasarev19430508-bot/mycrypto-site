export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* Анімований спінер у стилі проєкту */}
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mb-6"></div>
        
        <h1 className="text-xl font-bold text-gray-900 mb-2">Завантаження...</h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Обробка запиту. Зачекайте, будь ласка.
        </p>
        
        {/* Прогресбар (опціонально) */}
        <div className="mt-6 w-48 mx-auto bg-gray-200 rounded-full h-2 overflow-hidden">
          <div className="bg-orange-500 h-full w-1/3 animate-pulse rounded-full"></div>
        </div>
        
        {/* Підказка */}
        <p className="text-xs text-gray-400 mt-4">
          Це може зайняти декілька секунд
        </p>
      </div>
    </div>
  );
}