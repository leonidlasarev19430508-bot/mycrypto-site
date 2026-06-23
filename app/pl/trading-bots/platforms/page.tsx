import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gdzie uruchomić bota: przegląd platform 2025 | CryptoNavigator',
  description: 'Przegląd platform: Binance, Bybit, 3Commas, Pionex i inne.',
  alternates: { canonical: 'https://cryptotop.chat/pl/trading-bots/platforms' },
};

export default function PlatformsPagePl() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Gdzie uruchomić bota: przegląd platform 2025</h1>
      <p className="text-gray-700 mb-4">Przegląd najpopularniejszych platform do uruchamiania botów i ich kluczowych cech.</p>
      <table className="w-full text-left border-collapse mb-6">
        <thead>
          <tr className="text-sm text-gray-600">
            <th className="pb-2">Platforma</th>
            <th className="pb-2">Typ</th>
            <th className="pb-2">Uwagi</th>
          </tr>
        </thead>
        <tbody>
          <tr className="align-top border-t"><td className="py-2">Binance</td><td className="py-2">Wbudowane boty</td><td className="py-2">Niskie opłaty — <a href="https://www.binance.com/en/register?ref=Q5HR1JVW" rel="sponsored noopener noreferrer" className="text-orange-600">ref</a></td></tr>
          <tr className="align-top border-t"><td className="py-2">Bybit</td><td className="py-2">Wbudowane + API</td><td className="py-2">Dobra płynność — <a href="https://www.bybit.com/register?ref=CRYPTONAV" rel="sponsored noopener noreferrer" className="text-orange-600">ref</a></td></tr>
          <tr className="align-top border-t"><td className="py-2">3Commas</td><td className="py-2">Usługa zewnętrzna</td><td className="py-2">Wiele strategii, subskrypcja</td></tr>
          <tr className="align-top border-t"><td className="py-2">Pionex</td><td className="py-2">Wbudowane</td><td className="py-2">Proste ustawienie</td></tr>
          <tr className="align-top border-t"><td className="py-2">OKX</td><td className="py-2">Wbudowane</td><td className="py-2"><a href="https://www.okx.com/join/CRYPTONAV" rel="sponsored noopener noreferrer" className="text-orange-600">ref</a></td></tr>
          <tr className="align-top border-t"><td className="py-2">KuCoin</td><td className="py-2">Wbudowane</td><td className="py-2"><a href="https://www.kucoin.com/rf/CXEPY4S5" rel="sponsored noopener noreferrer" className="text-orange-600">ref</a></td></tr>
        </tbody>
      </table>
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <Link href="/pl/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Wypróbuj symulator →</Link>
      </div>
    </main>
  );
}
