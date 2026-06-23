import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DCA-Strategie — Stressfrei kaufen | CryptoNavigator',
  description: 'DCA erklärt: regelmäßige Käufe, Vorteile und Grenzen.',
  alternates: { canonical: 'https://cryptotop.chat/de/trading-bots/dca' },
};

export default function DcaPageDe() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">DCA-Strategie: wie man Kryptowährungen stressfrei kauft</h1>
      <p className="text-gray-700 mb-4">Stell dir zwei Investoren vor. Der erste wartet auf den "richtigen Moment" — analysiert Charts, liest Nachrichten, versucht am tiefsten Punkt zu kaufen. Der zweite kauft einfach jeden Montag $100 Bitcoin — unabhängig vom Preis, unabhängig von den Nachrichten.</p>
      <p className="text-gray-700 mb-4">Statistisch gesehen zeigt der zweite Investor oft bessere Ergebnisse. Nicht weil er klüger ist. Sondern weil er das gefährlichste Element des Handels eliminiert hat — emotionale Entscheidungen. Das ist DCA — Dollar-Cost Averaging, oder Kostenglättung.</p>

      <div className="space-y-4 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Wie es funktioniert</h2>
          <p className="text-gray-700">Die Essenz der Strategie: Du kaufst einen festen Betrag eines Vermögenswertes in regelmäßigen Abständen. Täglich, wöchentlich oder monatlich — unabhängig vom aktuellen Preis. Wenn der Preis hoch ist — bekommst du für denselben Betrag weniger Münzen. Wenn der Preis niedrig ist — bekommst du mehr Münzen. Das Ergebnis: dein durchschnittlicher Einstiegspreis gleicht sich automatisch aus.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <p className="font-semibold mb-2">Beispiel mit Zahlen</p>
          <p className="text-gray-700 leading-7">Du kaufst $200 BTC pro Woche für 5 Wochen:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1 text-gray-700">
            <li>Woche 1: Preis $60,000 → du bekommst 0,00333 BTC</li>
            <li>Woche 2: Preis $50,000 → du bekommst 0,00400 BTC</li>
            <li>Woche 3: Preis $45,000 → du bekommst 0,00444 BTC</li>
            <li>Woche 4: Preis $52,000 → du bekommst 0,00385 BTC</li>
            <li>Woche 5: Preis $58,000 → du bekommst 0,00345 BTC</li>
          </ul>
          <p className="text-gray-700 mt-3">Insgesamt ausgegeben: $1.000. Insgesamt erhalten: 0,01907 BTC. Durchschnittlicher Einstiegspreis: ~$52.440.</p>
          <p className="text-gray-700 mt-2">Hätte man alles in Woche 1 auf einmal gekauft — wäre der Durchschnitt $60.000 gewesen. DCA gab dir einen besseren Durchschnittspreis ohne "Markt-Timing-Raten".</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <svg viewBox="0 0 600 260" className="w-full h-auto" aria-label="DCA-Chart-Diagramm">
            <defs>
              <linearGradient id="priceGradientDe" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path d="M40 200 C120 170 180 190 240 150 C300 110 360 140 420 120 C480 100 540 130 560 90" fill="none" stroke="#3b82f6" strokeWidth="4" />
            <circle cx="70" cy="190" r="8" fill="#fb923c" />
            <circle cx="190" cy="180" r="8" fill="#fb923c" />
            <circle cx="310" cy="145" r="8" fill="#fb923c" />
            <circle cx="430" cy="125" r="8" fill="#fb923c" />
            <circle cx="540" cy="95" r="8" fill="#fb923c" />
            <line x1="40" y1="170" x2="560" y2="170" stroke="#16a34a" strokeWidth="3" strokeDasharray="8 6" />
            <text x="560" y="62" fill="#1f2937" fontSize="14" textAnchor="end">Preis</text>
            <text x="560" y="82" fill="#1f2937" fontSize="14" textAnchor="end">Deine Käufe</text>
            <text x="560" y="102" fill="#1f2937" fontSize="14" textAnchor="end">Durchschnittspreis</text>
            <path d="M40 170 H560" stroke="#16a34a" strokeWidth="3" />
          </svg>
        </div>
      </div>

      <div className="space-y-6 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Vorteile</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Psychologischer Komfort — keine Sorge um den "richtigen Moment"</li>
            <li>Schutz vor Timing-Fehlern — selbst erfahrene Trader liegen bei Einstiegspunkten falsch</li>
            <li>Disziplin statt Emotion — der Bot kauft nach Plan, auch wenn alle um dich herum panikieren</li>
            <li>Einfachheit — keine Notwendigkeit, jeden Tag Charts zu analysieren</li>
            <li>Für beschäftigte Menschen — 10 Minuten zum Einrichten und die Strategie läuft Monate</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Einschränkungen und Risiken</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>In einem starken Bullenmarkt kann DCA einen Einzelkauf unterperformen</li>
            <li>Schützt nicht vor längerem Bärenmarkt</li>
            <li>Erfordert Zeit — DCA ist eine Langzeitstrategie</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Für wen geeignet</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Langzeitinvestoren (1-3+ Jahre)</li>
            <li>Personen mit regelmäßigem Einkommen, die akkumulieren möchten</li>
            <li>Diejenigen, die nicht jeden Tag analysieren möchten</li>
            <li>Anfänger, die gerade anfangen</li>
          </ul>
        </div>
      </div>

      <p className="mb-4">Binance und Bybit haben kostenlose eingebaute DCA-Bots. Einfach den Betrag, Vermögenswert und die Kaufhäufigkeit angeben.</p>
      <p className="mb-4">Plattformen: <a href="https://www.binance.com/en/register?ref=Q5HR1JVW" rel="sponsored noopener noreferrer" className="text-orange-600">Binance</a>, <a href="https://www.bybit.com/register?ref=CRYPTONAV" rel="sponsored noopener noreferrer" className="text-orange-600">Bybit</a>.</p>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <p className="font-bold text-orange-800 mb-2">Trainiere DCA im Simulator</p>
        <Link href="/de/simulator" className="inline-block bg-orange-500 text-white px-4 py-2 rounded">Simulator öffnen →</Link>
      </div>
    </main>
  );
}
