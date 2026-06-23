import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grid-бот: заробіток на волатильності | CryptoNavigator',
  description: 'Grid-боти автоматично виставляють ордери в сітці — як це працює, коли працює і які ризики.',
  alternates: { canonical: 'https://cryptotop.chat/trading-bots/grid' },
};

export default function GridPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Grid-бот: заробіток на волатильності — і його межі</h1>
      <p className="text-gray-700 mb-4">Grid-боти ставлять серію ордерів вище і нижче поточної ціни. Гарні на бокових ринках з волатильністю, але вразливі при різких трендових рухах.</p>
      <h2 className="font-semibold mt-4 mb-2">Коли працює</h2>
      <p className="mb-4">Коли ціна коливається у межах діапазону — бот збирає дрібні прибутки.</p>
      <h2 className="font-semibold mt-4 mb-2">Ризики</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>Різкий трендовий рух може залишити відкриті збиткові позиції</li>
        <li>Комісії та проскальзування знижують ефективність</li>
      </ul>
    </main>
  );
}
