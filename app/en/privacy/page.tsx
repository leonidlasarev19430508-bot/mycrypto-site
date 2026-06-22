import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — CryptoNavigator',
  description: 'Privacy policy for CryptoNavigator (cryptotop.chat)',
  alternates: { canonical: 'https://cryptotop.chat/en/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-black mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: June 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">1. Who we are</h2>
        <p>CryptoNavigator (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the website <a href="https://cryptotop.chat" className="text-orange-500 hover:underline">cryptotop.chat</a> — an educational cryptocurrency platform offering market analysis, a trading simulator and news aggregation.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">2. What information we collect</h2>
        <p className="mb-2">We collect the following types of information:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Usage data:</strong> visited pages, time on site, browser and device type — via Google Analytics (anonymized).</li>
          <li><strong>Email address:</strong> only if you subscribe to the newsletter. We use Resend to deliver emails.</li>
          <li><strong>Simulator data:</strong> the trading simulator stores data locally in your browser (localStorage). We do not collect or transfer this data.</li>
          <li><strong>Cookies:</strong> used for analytics and basic functionality. See section 5 for details.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">3. How we use information</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>To provide and improve our services</li>
          <li>To send newsletters (only with your consent)</li>
          <li>To analyze traffic and user behavior</li>
          <li>To comply with legal obligations</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">4. Third-party services</h2>
        <p className="mb-2">We use the following third-party services:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Google Analytics</strong> — traffic analytics</li>
          <li><strong>CoinGecko / Binance API</strong> — real-time cryptocurrency price data</li>
          <li><strong>TradingView</strong> — embedded charts</li>
          <li><strong>Resend</strong> — email delivery</li>
          <li><strong>Anthropic Claude API</strong> — AI news analysis</li>
        </ul>
        <p className="mt-2">Each service has its own privacy policy. We recommend reviewing them directly.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">5. Cookies</h2>
        <p>We use cookies for:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Google Analytics tracking (anonymized IP)</li>
          <li>language preference storage</li>
          <li>basic session management</li>
        </ul>
        <p className="mt-2">You may disable cookies in your browser settings. Some features may not work correctly without cookies.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">6. Affiliate links</h2>
        <p>CryptoNavigator includes affiliate links to cryptocurrency exchanges (Binance, Bybit, OKX, KuCoin). If you register through these links, we may earn a commission at no additional cost to you. We recommend only platforms we believe are useful for our users.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">7. Data retention</h2>
        <p>Analytical data is retained for up to 26 months. Newsletter email addresses are kept until unsubscribe. You may request deletion of your data at any time.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">8. Your rights (GDPR)</h2>
        <p className="mb-2">If you are located in the European Union, you have the right to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing</li>
          <li>Port your data</li>
        </ul>
        <p className="mt-2">To exercise these rights, contact us at: <strong>info@cryptotop.chat</strong></p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">9. Children&apos;s privacy</h2>
        <p>Our services are not intended for individuals under 18 years old. We do not knowingly collect personal data from minors.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">10. Changes to this policy</h2>
        <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">11. Contact</h2>
        <p>For privacy questions: <strong>info@cryptotop.chat</strong></p>
      </section>
    </main>
  );
}
