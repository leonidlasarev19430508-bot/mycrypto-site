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
      <h1 className="text-3xl font-black mb-4">Gdzie uruchomić bota handlowego: przegląd platform 2025</h1>
      <p className="text-gray-700 mb-4">Wybór platformy to ważna decyzja. Od tego zależy bezpieczeństwo funduszy, wygoda ustawienia i koszt.</p>
      <p className="text-gray-700 mb-6">Dwa podejścia:</p>
      <div className="space-y-4 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Wbudowane boty giełdy</h2>
          <p className="text-gray-700">Plusy: za darmo, nie trzeba API, fundusze na giełdzie, proste ustawienie. Minusy: ograniczone strategie.</p>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Usługi trzecie</h2>
          <p className="text-gray-700">Plusy: więcej strategii, wsparcie dla wielu giełd. Minusy: płatna subskrypcja, wymagany klucz API, bardziej skomplikowane ustawienie.</p>
        </div>
      </div>

      <table className="w-full text-left border-collapse mb-6">
        <thead>
          <tr className="text-sm text-gray-600">
            <th className="pb-2">Platforma</th>
            <th className="pb-2">Typ</th>
            <th className="pb-2">Notatka</th>
          </tr>
        </thead>
        <tbody>
          <tr className="align-top border-t"><td className="py-2">Binance</td><td className="py-2">DCA i Grid</td><td className="py-2">Za darmo — <a href="https://www.binance.com/en/register?ref=Q5HR1JVW" rel="sponsored noopener noreferrer" className="text-orange-600">ref</a></td></tr>
          <tr className="align-top border-t"><td className="py-2">Bybit</td><td className="py-2">DCA, Grid, Martingale</td><td className="py-2">Wygodny interfejs — <a href="https://www.bybit.com/register?ref=CRYPTONAV" rel="sponsored noopener noreferrer" className="text-orange-600">ref</a></td></tr>
          <tr className="align-top border-t"><td className="py-2">OKX</td><td className="py-2">Grid, DCA, Arbitrage</td><td className="py-2"><a href="https://www.okx.com/join/CRYPTONAV" rel="sponsored noopener noreferrer" className="text-orange-600">ref</a></td></tr>
          <tr className="align-top border-t"><td className="py-2">KuCoin</td><td className="py-2">DCA i Grid</td><td className="py-2"><a href="https://www.kucoin.com/rf/CXEPY4S5" rel="sponsored noopener noreferrer" className="text-orange-600">ref</a></td></tr>
          <tr className="align-top border-t"><td className="py-2">3Commas</td><td className="py-2">Usługa zewnętrzna</td><td className="py-2">20+ giełd, subskrypcja</td></tr>
          <tr className="align-top border-t"><td className="py-2">Pionex</td><td className="py-2">Wbudowane boty</td><td className="py-2">16 botów za darmo</td></tr>
        </tbody>
      </table>

      <div className="space-y-4 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Dla początkujących</h2>
          <p className="text-gray-700">Binance lub Bybit — za darmo, bez API, prosty interfejs.</p>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Dla średniozaawansowanych</h2>
          <p className="text-gray-700">Pionex lub 3Commas — więcej strategii, ale mogą być koszty subskrypcji.</p>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Dla zaawansowanych</h2>
          <p className="text-gray-700">TradingView Pine Script lub Python + CCXT.</p>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <p className="font-bold text-orange-800 mb-2">Ważne</p>
        <p className="text-orange-700">Nigdy nie udostępniaj klucza API z prawami wypłaty.</p>
      </div>
    </main>
  );
}
