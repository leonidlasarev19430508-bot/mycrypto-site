import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — CryptoNavigator',
  description: 'Privacy Policy for CryptoNavigator (cryptotop.chat)',
  alternates: { canonical: 'https://cryptotop.chat/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-black mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: June 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">1. Who We Are</h2>
        <p>CryptoNavigator ("we", "our", "us") operates the website <a href="https://cryptotop.chat" className="text-orange-500 hover:underline">cryptotop.chat</a> — an educational cryptocurrency platform providing market analysis, a trading simulator, and news aggregation.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">2. Information We Collect</h2>
        <p className="mb-2">We collect the following types of information:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Usage data:</strong> Pages visited, time on site, browser type, device type — collected via Google Analytics (anonymized).</li>
          <li><strong>Email address:</strong> Only if you subscribe to our newsletter. We use Resend to send emails.</li>
          <li><strong>Simulator data:</strong> The trading simulator stores data locally in your browser (localStorage). We do not collect or transmit this data.</li>
          <li><strong>Cookies:</strong> We use cookies for analytics and basic functionality. See section 5.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">3. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>To provide and improve our services</li>
          <li>To send newsletters (only with your consent)</li>
          <li>To analyze website traffic and user behavior</li>
          <li>To comply with legal obligations</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">4. Third-Party Services</h2>
        <p className="mb-2">We use the following third-party services:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Google Analytics</strong> — website analytics</li>
          <li><strong>CoinGecko / Binance API</strong> — real-time cryptocurrency price data</li>
          <li><strong>TradingView</strong> — embedded charting widgets</li>
          <li><strong>Resend</strong> — email delivery</li>
          <li><strong>Anthropic Claude API</strong> — AI-powered news analysis</li>
        </ul>
        <p className="mt-2">Each service has its own privacy policy. We encourage you to review them.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">5. Cookies</h2>
        <p>We use cookies for:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Google Analytics tracking (anonymized IP)</li>
          <li>Language preference storage</li>
          <li>Basic session management</li>
        </ul>
        <p className="mt-2">You can disable cookies in your browser settings. Some features may not function correctly without cookies.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">6. Affiliate Links</h2>
        <p>CryptoNavigator contains affiliate links to cryptocurrency exchanges (Binance, Bybit, OKX, KuCoin). If you register through these links, we may receive a commission at no extra cost to you. We only recommend platforms we believe provide value to our users.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">7. Data Retention</h2>
        <p>We retain analytics data for up to 26 months. Email subscriber data is retained until you unsubscribe. You may request deletion of your data at any time.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">8. Your Rights (GDPR)</h2>
        <p className="mb-2">If you are located in the European Union, you have the right to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Access your personal data</li>
          <li>Rectify inaccurate data</li>
          <li>Request erasure of your data</li>
          <li>Object to processing</li>
          <li>Data portability</li>
        </ul>
        <p className="mt-2">To exercise these rights, contact us at: <strong>info@cryptotop.chat</strong></p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">9. Children's Privacy</h2>
        <p>Our services are not directed at children under 18. We do not knowingly collect personal data from minors.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">10. Changes to This Policy</h2>
        <p>We may update this Privacy Policy periodically. Changes will be posted on this page with an updated date.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">11. Contact</h2>
        <p>For any privacy-related questions: <strong>info@cryptotop.chat</strong></p>
      </section>
    </main>
  );
}
