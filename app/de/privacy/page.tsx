import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzrichtlinie — CryptoNavigator',
  description: 'Datenschutzrichtlinie für CryptoNavigator (cryptotop.chat)',
  alternates: { canonical: 'https://cryptotop.chat/de/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-black mb-2">Datenschutzrichtlinie</h1>
      <p className="text-sm text-gray-400 mb-8">Zuletzt aktualisiert: Juni 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">1. Wer wir sind</h2>
        <p>CryptoNavigator (&ldquo;wir&rdquo;, &ldquo;uns&rdquo;, &ldquo;unser&rdquo;) betreibt die Website <a href="https://cryptotop.chat" className="text-orange-500 hover:underline">cryptotop.chat</a> — eine Bildungsplattform für Kryptowährungen mit Marktanalyse, Handelssimulator und Nachrichtenaggregation.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">2. Welche Informationen wir sammeln</h2>
        <p className="mb-2">Wir sammeln folgende Arten von Informationen:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Nutzungsdaten:</strong> besuchte Seiten, Verweildauer, Browser- und Gerätetyp — über Google Analytics (anonymisiert).</li>
          <li><strong>E-Mail-Adresse:</strong> nur wenn Sie den Newsletter abonnieren. Wir verwenden Resend zum Versand von E-Mails.</li>
          <li><strong>Simulator-Daten:</strong> Der Handelssimulator speichert Daten lokal in Ihrem Browser (localStorage). Wir sammeln oder übertragen diese Daten nicht.</li>
          <li><strong>Cookies:</strong> werden für Analyse- und Grundfunktionen verwendet. Details finden Sie in Abschnitt 5.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">3. Wie wir Informationen verwenden</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Zur Bereitstellung und Verbesserung unserer Dienste</li>
          <li>Zum Versand von Newslettern (nur mit Ihrer Zustimmung)</li>
          <li>Zur Analyse von Traffic und Nutzerverhalten</li>
          <li>Zur Erfüllung rechtlicher Verpflichtungen</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">4. Drittanbieter-Dienste</h2>
        <p className="mb-2">Wir nutzen die folgenden Drittanbieter-Dienste:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Google Analytics</strong> — Traffic-Analyse</li>
          <li><strong>CoinGecko / Binance API</strong> — Echtzeit-Kryptowährungspreise</li>
          <li><strong>TradingView</strong> — eingebettete Diagramme</li>
          <li><strong>Resend</strong> — E-Mail-Zustellung</li>
          <li><strong>Anthropic Claude API</strong> — KI-Nachrichtenanalyse</li>
        </ul>
        <p className="mt-2">Jeder Dienst hat seine eigene Datenschutzrichtlinie. Wir empfehlen, diese direkt zu prüfen.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">5. Cookies</h2>
        <p>Wir verwenden Cookies für:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Google Analytics-Tracking (anonymisierte IP)</li>
          <li>Speicherung der Spracheinstellungen</li>
          <li>Grundlegende Sitzungsverwaltung</li>
        </ul>
        <p className="mt-2">Sie können Cookies in Ihren Browsereinstellungen deaktivieren. Einige Funktionen funktionieren möglicherweise ohne Cookies nicht korrekt.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">6. Affiliate-Links</h2>
        <p>CryptoNavigator enthält Affiliate-Links zu Kryptowährungsbörsen (Binance, Bybit, OKX, KuCoin). Wenn Sie sich über diese Links registrieren, können wir eine Provision erhalten, ohne dass Ihnen zusätzliche Kosten entstehen. Wir empfehlen nur Plattformen, die wir für nützlich halten.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">7. Datenspeicherung</h2>
        <p>Analysedaten werden bis zu 26 Monate gespeichert. Newsletter-E-Mail-Adressen werden bis zum Abbestellen aufbewahrt. Sie können jederzeit die Löschung Ihrer Daten verlangen.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">8. Ihre Rechte (DSGVO)</h2>
        <p className="mb-2">Wenn Sie sich in der Europäischen Union befinden, haben Sie das Recht:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Auf Ihre personenbezogenen Daten zuzugreifen</li>
          <li>Unrichtige Daten zu korrigieren</li>
          <li>Die Löschung Ihrer Daten zu verlangen</li>
          <li>Widerspruch gegen die Verarbeitung einzulegen</li>
          <li>Ihre Daten zu übertragen</li>
        </ul>
        <p className="mt-2">Um diese Rechte auszuüben, kontaktieren Sie uns unter: <strong>info@cryptotop.chat</strong></p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">9. Datenschutz von Kindern</h2>
        <p>Unsere Dienste richten sich nicht an Personen unter 18 Jahren. Wir sammeln wissentlich keine personenbezogenen Daten von Minderjährigen.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">10. Änderungen dieser Richtlinie</h2>
        <p>Wir können diese Datenschutzrichtlinie von Zeit zu Zeit aktualisieren. Änderungen werden auf dieser Seite mit aktualisiertem Datum veröffentlicht.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">11. Kontakt</h2>
        <p>Bei Datenschutzfragen: <strong>info@cryptotop.chat</strong></p>
      </section>
    </main>
  );
}
