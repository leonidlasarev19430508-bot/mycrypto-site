import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grid-Bots — Gewinn aus Volatilität | CryptoNavigator',
  description: 'Funktionsweise von Grid-Bots, Anwendungsfälle und Risiken.',
  alternates: { canonical: 'https://cryptotop.chat/de/trading-bots/grid' },
};

export default function GridPageDe() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">Grid-Bot: Gewinn aus Volatilität — und seine Grenzen</h1>
      <p className="text-gray-700 mb-4">Der Kryptomarkt bewegt sich selten in einer Linie. Selbst in einem starken Trend schwankt der Preis ständig — hoch und runter, hoch und runter. Der Grid-Bot wurde entworfen, um genau von diesen Schwankungen zu profitieren.</p>

      <div className="space-y-6 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Wie es funktioniert</h2>
          <p className="text-gray-700">Ein Grid-Bot platziert eine Reihe von Kauf- und Verkaufsaufträgen in regelmäßigen Abständen innerhalb eines definierten Preisbereichs. Er profitiert von Schwankungen — kauft billiger, verkauft teurer und wiederholt den Zyklus.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <p className="font-semibold mb-2">Beispiel</p>
          <p className="text-gray-700">BTC handelt bei etwa $60.000. Einrichtung:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1 text-gray-700">
            <li>Bereich: $55.000 bis $65.000</li>
            <li>Anzahl der Ebenen: 10</li>
            <li>Kapital: $1.000</li>
          </ul>
          <p className="text-gray-700 mt-3">Der Bot platziert Aufträge alle $1.000. Jedes Mal wenn der Preis eine Ebene kreuzt — ein Trade und kleiner Gewinn. Der Zyklus wiederholt sich, solange der Preis im Bereich bleibt.</p>
        </div>

        <div className="mb-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <svg viewBox="0 0 600 260" className="w-full h-auto" aria-label="Grid-Bot-Diagramm">
              <defs>
                <linearGradient id="gridBgDe" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fef3c7" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="600" height="260" fill="url(#gridBgDe)" />
              <g stroke="#9ca3af" strokeWidth="1">
                <line x1="60" y1="40" x2="540" y2="40" />
                <line x1="60" y1="90" x2="540" y2="90" />
                <line x1="60" y1="140" x2="540" y2="140" />
                <line x1="60" y1="190" x2="540" y2="190" />
                <line x1="60" y1="240" x2="540" y2="240" />
              </g>
              <text x="60" y="32" fill="#111827" fontSize="13" fontWeight="600">Oberer Limit</text>
              <text x="60" y="248" fill="#111827" fontSize="13" fontWeight="600">Unterer Limit</text>
              <text x="310" y="180" fill="#111827" fontSize="13" fontWeight="600">Aktueller Preis</text>
              <circle cx="310" cy="180" r="7" fill="#f43f5e" />
              <path d="M80 230 L120 170 L180 190 L240 150 L300 160 L360 120 L420 140 L480 100 L520 130" fill="none" stroke="#2563eb" strokeWidth="3" />
              <g fill="#16a34a">
                <text x="74" y="254" fontSize="12">Kaufen</text>
                <circle cx="80" cy="230" r="5" />
                <text x="234" y="174" fontSize="12">Kaufen</text>
                <circle cx="240" cy="150" r="5" />
              </g>
              <g fill="#ef4444">
                <text x="178" y="184" fontSize="12">Verkaufen</text>
                <circle cx="180" cy="190" r="5" />
                <text x="410" y="124" fontSize="12">Verkaufen</text>
                <circle cx="420" cy="140" r="5" />
              </g>
            </svg>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Funktioniert gut wenn</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Seitenmarkt mit mäßiger Volatilität</li>
            <li>Vermögenswert handelt in klarem Bereich</li>
            <li>Niedrige Borsengebühren</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Wenn es fehlschlägt</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Starker Abwärtstrend — Bot kauft im gesamten Bereich und hält Verluste</li>
            <li>Starker Aufwärtstrend — Bot verkäuft zu früh und verpasst weitere Gewinne</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Sicherheitsregeln</h2>
          <ol className="list-decimal pl-5 text-gray-700 space-y-1">
            <li>Weise niemals dein gesamtes Kapital einem Grid-Bot zu</li>
            <li>Stelle immer einen unteren Stop-Loss ein</li>
            <li>Wähle Vermögenswerte mit ausreichender Liquidität</li>
            <li>Überprüfe regelmäßig, ob der Preis im Bereich ist</li>
            <li>Sei bereit, den Bot zu stoppen, wenn sich die Bedingungen ändern</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
