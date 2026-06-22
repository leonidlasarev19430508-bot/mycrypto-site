import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Haftungsausschluss — CryptoNavigator',
  description: 'Haftungsausschluss für CryptoNavigator (cryptotop.chat)',
  alternates: { canonical: 'https://cryptotop.chat/de/disclaimer' },
};

export default function DisclaimerPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-black mb-2">Haftungsausschluss</h1>
      <p className="text-sm text-gray-400 mb-8">Zuletzt aktualisiert: Juni 2026</p>

      <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6 mb-10">
        <p className="font-black text-red-800 text-lg mb-2">⚠️ KEINE FINANZBERATUNG</p>
        <p className="text-red-700">Alle Inhalte auf CryptoNavigator dienen ausschließlich <strong>Bildungs- und Informationszwecken</strong>. Nichts auf dieser Seite stellt Finanz-, Anlage-, Handels-, Rechts- oder Steuerberatung dar.</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Investitionsrisiken</h2>
        <p>Kryptowährungsmärkte sind hoch volatil. Preise können in kurzer Zeit stark steigen oder fallen. Sie können einen Teil oder Ihr gesamtes investiertes Kapital verlieren. Vergangene Ergebnisse sind kein Hinweis auf zukünftige Entwicklungen.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">KI-generierte Analyse</h2>
        <p>Nachrichtenübersichten, Marktstimmungsanalysen und Kauf-/Verkauf-/Halten-Signale auf der Plattform werden von künstlicher Intelligenz erzeugt. Dies sind <strong>automatisierte algorithmische Bewertungen</strong>, keine professionelle Finanzberatung. Sie können ungenau, unvollständig oder veraltet sein.</p>
      </section>

      <section className="mb-8" id="affiliate">
        <h2 className="text-xl font-bold mb-3">Affiliate-Links</h2>
        <p>CryptoNavigator enthält Affiliate-Links zu Kryptowährungsbörsen. Wir können eine Provision erhalten, wenn Sie sich über unsere Links registrieren oder handeln. So finanzieren wir die Plattform. Unsere Analysen und Empfehlungen werden <strong>nicht</strong> von Affiliate-Partnerschaften beeinflusst.</p>
        <p className="mt-2">Affiliate-Börsen: Binance, Bybit, OKX, KuCoin.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Keine Gewähr für Genauigkeit</h2>
        <p>Obwohl wir bestrebt sind, genaue und aktuelle Informationen bereitzustellen, übernehmen wir keine Gewähr für die Vollständigkeit, Richtigkeit, Zuverlässigkeit oder Verfügbarkeit der Informationen auf der Plattform.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Ihre Verantwortung</h2>
        <p>Finanzielle Entscheidungen treffen Sie auf eigenes Risiko. Wir empfehlen dringend, vor Investitionen einen qualifizierten Finanzberater zu konsultieren.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">Kontakt</h2>
        <p>Fragen zu diesem Haftungsausschluss: <strong>info@cryptotop.chat</strong></p>
      </section>
    </main>
  );
}
