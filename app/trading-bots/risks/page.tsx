import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '5 ризиків торгових ботів | CryptoNavigator',
  description: "П'ять ризиків торгових ботів: curve fitting, комісії, безпека API, макро, хибне відчуття безпеки.",
  alternates: { canonical: 'https://cryptotop.chat/trading-bots/risks' },
};

export default function RisksPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">5 ризиків торгових ботів про які мовчать маркетологи</h1>
      <p className="text-gray-700 mb-4">Тут ми розбираємо головні ризики: curve fitting (перетренування), комісії, безпека API-ключів, сліпота до макроподій та хибне відчуття безпеки.</p>
      <ul className="list-disc pl-5 space-y-2 mb-6">
        <li><strong>Curve fitting:</strong> оптимізація під історію, що не працює в майбутньому.</li>
        <li><strong>Комісії:</strong> часті ордери можуть з'їдати прибуток.</li>
        <li><strong>Безпека API:</strong> ключі на хостингу — ціль для зломів.</li>
        <li><strong>Сліпота до макроподій:</strong> боти не бачать новин та санкцій.</li>
        <li><strong>False sense of security:</strong> автоматизація не = прибуток.</li>
      </ul>

      <p className="text-gray-700 mb-6">Ніколи не довіряйте ботам 100% — використовуйте захисні стопи, обмеження позицій і моніторинг.</p>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <p className="font-bold text-orange-800 mb-2">Перевірте стратегію в симуляторі</p>
        <Link href="/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Відкрити симулятор →</Link>
      </div>
    </main>
  );
}
