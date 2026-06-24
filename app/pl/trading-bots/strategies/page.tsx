import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Strategie handlowe: analiza i rzeczywistość | CryptoNavigator',
  description: 'Przegląd strategii i ostrzeżenia dotyczące automatyzacji.',
  alternates: { canonical: 'https://cryptotop.chat/pl/trading-bots/strategies' },
};

export default function StrategiesPagePl() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Strategie handlowe: analiza, ostrzeżenia, rzeczywistość</h1>
      <p className="text-gray-700 mb-4">Szczera odpowiedź na pytanie "którą strategię wpisać do bota": nie istnieje strategia, która zawsze działa. Są strategie, które działają dobrze pod pewnymi warunkami — i zawodzą w innych.</p>

      <div className="space-y-6 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Strategie bazowe</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li><strong>DCA</strong> — regularne zakupy stałej sumy. Dla kogo: inwestorzy długoterminowi. Kiedy działa: gdy masz wystarczająco długi horyzont. Ostrzeżenie: nie chroni przed długoterminowym rynkiem niedźwiedzia.</li>
            <li><strong>HODLing</strong> — kup i trzymaj. Ważny fakt: większość handlarzy detalicznych, którzy aktywnie handlują, pokazuje gorsze wyniki niż ci, którzy po prostu kupili BTC i trzymają.</li>
            <li><strong>Trend Following</strong> — handel z trendem. Problemy: trudno znaleźć początek trendu, łatwo wpaść na fałszywy sygnał, zawodzi na rynku bocznym.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Strategie techniczne</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li><strong>MA Crossover</strong> — przecięcie średnich ruchomych. Kupuj gdy krótka MA przecina długą od dołu. Problemy: opóźnione sygnały, wiele fałszywych transakcji na rynku bocznym.</li>
            <li><strong>RSI Oversold/Overbought</strong> — kupuj przy RSI &lt; 30, sprzedawaj przy RSI &gt; 70. Problemy: w silnym trendzie RSI długo w ekstremach, 30/70 to arbitralnie.</li>
            <li><strong>Breakout Trading</strong> — handel na przełamaniach poziomów. Problemy: większość przełamań to błędy, wymaga precyzyjnego określenia poziomów.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Główne ostrzeżenia</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Backtest ≠ wyniki rzeczywiste. Każdą strategię można dopasować do przeszłości.</li>
            <li>Żadna strategia nie działa zawsze.</li>
            <li>Zarządzanie ryzykiem jest ważniejsze niż sama strategia.</li>
            <li>Wydarzenia makro unieważniają analizę techniczną.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Jak testować bezpiecznie</h2>
          <ol className="list-decimal pl-5 text-gray-700 space-y-1">
            <li>Teoria — zrozumiej logikę strategii</li>
            <li>Symulator — testuj bez prawdziwych pieniędzy</li>
            <li>Mikro-test — minimalna suma na rzeczywistym rynku</li>
            <li>Skalowanie — dopiero po potwierdzeniu</li>
          </ol>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <p className="font-bold text-orange-800 mb-2">Przypomnienie</p>
        <p className="text-orange-700 mb-4">Rzeczywisty rynek dodaje emocji i nieprzewidywalności. Symulator pokazuje logikę, ale nie zastępuje kontroli.</p>
        <Link href="/pl/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Spróbuj symulatora →</Link>
      </div>
    </main>
  );
}
