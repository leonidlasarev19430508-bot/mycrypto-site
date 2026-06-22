import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polityka prywatności — CryptoNavigator',
  description: 'Polityka prywatności CryptoNavigator (cryptotop.chat)',
  alternates: { canonical: 'https://cryptotop.chat/pl/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-black mb-2">Polityka prywatności</h1>
      <p className="text-sm text-gray-400 mb-8">Ostatnia aktualizacja: czerwiec 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">1. Kim jesteśmy</h2>
        <p>CryptoNavigator (&ldquo;my&rdquo;, &ldquo;nas&rdquo;, &ldquo;nasz&rdquo;) prowadzi stronę <a href="https://cryptotop.chat" className="text-orange-500 hover:underline">cryptotop.chat</a> — edukacyjną platformę kryptowalutową oferującą analizę rynku, symulator handlu i agregację wiadomości.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">2. Jakie informacje zbieramy</h2>
        <p className="mb-2">Zbieramy następujące rodzaje informacji:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Dane użytkowania:</strong> odwiedzone strony, czas spędzony na stronie, typ przeglądarki i urządzenia — przez Google Analytics (anonimizowane).</li>
          <li><strong>Adres e-mail:</strong> tylko jeśli subskrybujesz newsletter. Do wysyłki używamy Resend.</li>
          <li><strong>Dane symulatora:</strong> symulator handlowy zapisuje dane lokalnie w Twojej przeglądarce (localStorage). Nie zbieramy ani nie przesyłamy tych danych.</li>
          <li><strong>Pliki cookie:</strong> używamy ich do analityki i podstawowej funkcjonalności. Szczegóły w sekcji 5.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">3. Jak wykorzystujemy informacje</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Aby świadczyć i ulepszać nasze usługi</li>
          <li>Aby wysyłać newslettery (tylko za Twoją zgodą)</li>
          <li>Aby analizować ruch i zachowanie użytkowników</li>
          <li>Aby spełniać zobowiązania prawne</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">4. Usługi zewnętrzne</h2>
        <p className="mb-2">Korzystamy z następujących usług zewnętrznych:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Google Analytics</strong> — analityka ruchu</li>
          <li><strong>CoinGecko / Binance API</strong> — dane o cenach kryptowalut w czasie rzeczywistym</li>
          <li><strong>TradingView</strong> — osadzone wykresy</li>
          <li><strong>Resend</strong> — wysyłka e-maili</li>
          <li><strong>Anthropic Claude API</strong> — analiza wiadomości AI</li>
        </ul>
        <p className="mt-2">Każda usługa ma własną politykę prywatności. Zalecamy zapoznanie się z nimi bezpośrednio.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">5. Pliki cookie</h2>
        <p>Używamy plików cookie do:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>śledzenia Google Analytics (anonimizowany adres IP)</li>
          <li>zapisywania preferencji językowych</li>
          <li>podstawowego zarządzania sesją</li>
        </ul>
        <p className="mt-2">Możesz wyłączyć pliki cookie w ustawieniach przeglądarki. Niektóre funkcje mogą działać nieprawidłowo bez cookie.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">6. Linki afiliacyjne</h2>
        <p>CryptoNavigator zawiera linki afiliacyjne do giełd kryptowalut (Binance, Bybit, OKX, KuCoin). Jeśli zarejestrujesz się za pośrednictwem tych linków, możemy otrzymać prowizję bez dodatkowych kosztów dla Ciebie. Polecamy tylko platformy, które naszym zdaniem są przydatne dla użytkowników.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">7. Przechowywanie danych</h2>
        <p>Dane analityczne przechowujemy do 26 miesięcy. Adresy e-mail subskrybentów przechowujemy do momentu rezygnacji z subskrypcji. Możesz w dowolnym momencie poprosić o usunięcie swoich danych.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">8. Twoje prawa (RODO)</h2>
        <p className="mb-2">Jeśli przebywasz w Unii Europejskiej, masz prawo do:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>uzyskania dostępu do swoich danych osobowych</li>
          <li>poprawienia nieprawidłowych danych</li>
          <li>zażądania usunięcia swoich danych</li>
          <li>sprzeciwu wobec przetwarzania danych</li>
          <li>przeniesienia swoich danych</li>
        </ul>
        <p className="mt-2">Aby skorzystać z tych praw, skontaktuj się z nami: <strong>info@cryptotop.chat</strong></p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">9. Prywatność dzieci</h2>
        <p>Nasze usługi nie są przeznaczone dla osób poniżej 18 roku życia. Świadomie nie zbieramy danych osobowych nieletnich.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">10. Zmiany w polityce</h2>
        <p>Możemy od czasu do czasu aktualizować tę Politykę prywatności. Zmiany będą publikowane na tej stronie z aktualną datą.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">11. Kontakt</h2>
        <p>W sprawach prywatności: <strong>info@cryptotop.chat</strong></p>
      </section>
    </main>
  );
}
