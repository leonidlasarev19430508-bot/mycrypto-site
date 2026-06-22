import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nutzungsbedingungen — CryptoNavigator',
  description: 'Nutzungsbedingungen für CryptoNavigator (cryptotop.chat)',
  alternates: { canonical: 'https://cryptotop.chat/de/terms' },
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-black mb-2">Nutzungsbedingungen</h1>
      <p className="text-sm text-gray-400 mb-8">Zuletzt aktualisiert: Juni 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">1. Annahme der Bedingungen</h2>
        <p>Durch die Nutzung von CryptoNavigator unter <a href="https://cryptotop.chat" className="text-orange-500 hover:underline">cryptotop.chat</a> stimmen Sie diesen Nutzungsbedingungen zu. Wenn Sie nicht zustimmen, verwenden Sie unsere Website bitte nicht.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">2. Nur zu Bildungszwecken</h2>
        <p className="mb-2">CryptoNavigator ist eine <strong>Bildungsplattform</strong>. Alle Inhalte, einschließlich Nachrichtenanalysen, Marktdaten, Empfehlungen (kaufen/verkaufen/halten) und Simulatorfunktionen, werden ausschließlich zu Informations- und Bildungszwecken bereitgestellt.</p>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-3">
          <p className="font-bold text-orange-800">⚠️ WICHTIGER HINWEIS</p>
          <p className="text-orange-700 mt-1">Nichts auf dieser Seite stellt Finanz-, Anlage-, Rechts- oder Steuerberatung dar. Verlassen Sie sich bei finanziellen Entscheidungen nicht allein auf Informationen von dieser Website. Konsultieren Sie immer einen qualifizierten Finanzberater vor einer Investition.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">3. Handelssimulator</h2>
        <p>Der CryptoNavigator-Handelssimulator verwendet nur virtuelle (nicht reale) Mittel. Er ist für Bildungszwecke konzipiert — um Benutzern zu helfen, die Prinzipien des Kryptohandels ohne finanzielles Risiko zu verstehen. Gewinne oder Verluste im Simulator spiegeln keine realen finanziellen Ergebnisse wider.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">4. Affiliate-Beziehungen</h2>
        <p>CryptoNavigator nimmt an Affiliate-Programmen von Kryptowährungsbörsen teil, darunter Binance, Bybit, OKX und KuCoin. Wir können eine Provision erhalten, wenn Sie sich über unsere Affiliate-Links registrieren oder handeln. Dies hat keinen Einfluss auf den Preis, den Sie zahlen. Unsere redaktionellen Inhalte sind unabhängig von Affiliate-Beziehungen.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">5. KI-generierte Inhalte</h2>
        <p>Nachrichtenanalysen und Zusammenfassungen auf dieser Plattform werden von künstlicher Intelligenz (Anthropic Claude) generiert. Obwohl wir uns um Genauigkeit bemühen, können KI-Inhalte Fehler oder Ungenauigkeiten enthalten. Überprüfen Sie wichtige Informationen immer anhand primärer Quellen, bevor Sie Entscheidungen treffen.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">6. Geistiges Eigentum</h2>
        <p>Alle originalen Inhalte, das Design und der Code von CryptoNavigator sind unser geistiges Eigentum. Nachrichten-Zusammenfassungen sind KI-generierte Analysen, die auf öffentlich zugänglichen Informationen basieren und auf primäre Quellen verweisen. Wenn Sie der Meinung sind, dass Inhalte Ihre Urheberrechte verletzen, kontaktieren Sie uns unter info@cryptotop.chat.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">7. Haftungsbeschränkung</h2>
        <p>CryptoNavigator haftet nicht für finanzielle Verluste, Schäden oder negative Folgen, die aus der Nutzung unserer Plattform oder dem Vertrauen auf unsere Inhalte resultieren. Der Handel mit Kryptowährungen ist mit einem erheblichen Verlustrisiko verbunden. Sie nutzen die Plattform auf eigenes Risiko.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">8. Externe Links</h2>
        <p>Unsere Website enthält Links zu Drittanbieter-Ressourcen, einschließlich Kryptowährungsbörsen. Wir übernehmen keine Verantwortung für den Inhalt, die Sicherheit oder die Praktiken dieser externen Websites. Besuchen Sie sie auf eigenes Risiko.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">9. Verbotene Nutzung</h2>
        <p className="mb-2">Sie stimmen zu, nicht:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>die Plattform für illegale Zwecke zu nutzen</li>
          <li>zu versuchen, unsere Software rückzuentwickeln oder zu kopieren</li>
          <li>automatisierte Scraper oder Bots zum Sammeln von Inhalten zu verwenden</li>
          <li>unsere Inhalte falsch darzustellen oder irreführend zu verwenden</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">10. Änderungen der Bedingungen</h2>
        <p>Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern. Die fortgesetzte Nutzung der Plattform nach Änderungen bedeutet die Annahme der neuen Bedingungen.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">11. Kontakt</h2>
        <p>Fragen zu diesen Bedingungen: <strong>info@cryptotop.chat</strong></p>
      </section>
    </main>
  );
}
