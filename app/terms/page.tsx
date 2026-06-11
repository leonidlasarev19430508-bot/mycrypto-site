import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use — CryptoNavigator',
  description: 'Terms of Use for CryptoNavigator (cryptotop.chat)',
  alternates: { canonical: 'https://cryptotop.chat/terms' },
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-black mb-2">Terms of Use</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: June 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">1. Acceptance of Terms</h2>
        <p>By accessing and using CryptoNavigator at <a href="https://cryptotop.chat" className="text-orange-500 hover:underline">cryptotop.chat</a>, you agree to be bound by these Terms of Use. If you do not agree, please do not use our website.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">2. Educational Purpose Only</h2>
        <p className="mb-2">CryptoNavigator is an <strong>educational platform</strong>. All content, including news analysis, market data, trading recommendations (buy/sell/hold), and simulator features, is provided for <strong>informational and educational purposes only</strong>.</p>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-3">
          <p className="font-bold text-orange-800">⚠️ IMPORTANT DISCLAIMER</p>
          <p className="text-orange-700 mt-1">Nothing on this website constitutes financial, investment, legal, or tax advice. Do not make financial decisions based solely on information from this site. Always consult a qualified financial advisor before investing.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">3. Trading Simulator</h2>
        <p>The CryptoNavigator trading simulator uses virtual (fake) money only. It is designed for educational purposes to help users understand how cryptocurrency trading works without financial risk. Any profits or losses in the simulator do not represent real financial outcomes.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">4. Affiliate Relationships</h2>
        <p>CryptoNavigator participates in affiliate programs with cryptocurrency exchanges including Binance, Bybit, OKX, and KuCoin. We may earn a commission when you register or trade through our affiliate links. This does not affect the price you pay. Our editorial content is not influenced by affiliate relationships.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">5. AI-Generated Content</h2>
        <p>News analyses and summaries on this platform are generated using artificial intelligence (Anthropic Claude). While we strive for accuracy, AI-generated content may contain errors or inaccuracies. Always verify important information from original sources before making decisions.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">6. Intellectual Property</h2>
        <p>All original content, design, and code on CryptoNavigator is our intellectual property. News summaries are AI-generated analyses based on publicly available information, with links to original sources. If you believe any content infringes your copyright, contact us at info@cryptotop.chat.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">7. Limitation of Liability</h2>
        <p>CryptoNavigator shall not be liable for any financial losses, damages, or negative outcomes resulting from use of our platform or reliance on our content. Cryptocurrency trading involves significant risk of loss. You use this platform at your own risk.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">8. Third-Party Links</h2>
        <p>Our website contains links to third-party websites including cryptocurrency exchanges. We are not responsible for the content, security, or practices of these external sites. Visit them at your own risk.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">9. Prohibited Uses</h2>
        <p className="mb-2">You agree not to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Use the platform for any unlawful purpose</li>
          <li>Attempt to reverse-engineer or copy our software</li>
          <li>Use automated scrapers or bots to extract content</li>
          <li>Misrepresent our content or use it in a misleading way</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">10. Changes to Terms</h2>
        <p>We reserve the right to modify these Terms at any time. Continued use of the platform after changes constitutes acceptance of the new Terms.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">11. Contact</h2>
        <p>For questions about these Terms: <strong>info@cryptotop.chat</strong></p>
      </section>
    </main>
  );
}
