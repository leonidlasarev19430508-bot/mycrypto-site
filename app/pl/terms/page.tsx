import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Warunki użytkowania — CryptoNavigator',
  description: 'Warunki użytkowania CryptoNavigator (cryptotop.chat)',
  alternates: { canonical: 'https://cryptotop.chat/pl/terms' },
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-black mb-2">Warunki użytkowania</h1>
      <p className="text-sm text-gray-400 mb-8">Ostatnia aktualizacja: czerwiec 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">1. Akceptacja warunków</h2>
        <p>Korzystając z CryptoNavigator na <a href="https://cryptotop.chat" className="text-orange-500 hover:underline">cryptotop.chat</a>, zgadzasz się na niniejsze Warunki użytkowania. Jeśli się nie zgadzasz, prosimy nie korzystać z naszej strony.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">2. Tylko cel edukacyjny</h2>
        <p className="mb-2">CryptoNavigator to <strong>platforma edukacyjna</strong>. Wszystkie treści, w tym analiza wiadomości, dane rynkowe, rekomendacje (kup/sprzedaj/trzymaj) oraz funkcje symulatora, są dostarczane wyłącznie w celach informacyjnych i edukacyjnych.</p>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-3">
          <p className="font-bold text-orange-800">⚠️ WAŻNE ZRZECZENIE</p>
          <p className="text-orange-700 mt-1">Nic na tej stronie nie stanowi porady finansowej, inwestycyjnej, prawnej ani podatkowej. Nie opieraj się wyłącznie na informacjach z tej witryny przy podejmowaniu decyzji finansowych. Zawsze skonsultuj się z wykwalifikowanym doradcą finansowym przed inwestycją.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">3. Symulator handlu</h2>
        <p>Symulator handlowy CryptoNavigator używa wyłącznie wirtualnych (niemających wartości rzeczywistej) środków. Został zaprojektowany w celach edukacyjnych — aby pomóc użytkownikom zrozumieć zasady handlu kryptowalutami bez ryzyka finansowego. Wszelkie zyski lub straty w symulatorze nie odzwierciedlają rzeczywistych wyników finansowych.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">4. Relacje afiliacyjne</h2>
        <p>CryptoNavigator uczestniczy w programach partnerskich giełd kryptowalut, w tym Binance, Bybit, OKX i KuCoin. Możemy otrzymać prowizję, gdy zarejestrujesz się lub handlujesz za pośrednictwem naszych linków afiliacyjnych. Nie wpływa to na cenę, którą płacisz. Nasze treści redakcyjne są niezależne od relacji afiliacyjnych.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">5. Treści generowane przez AI</h2>
        <p>Analizy wiadomości i streszczenia na tej platformie są generowane przez sztuczną inteligencję (Anthropic Claude). Chociaż staramy się zapewniać dokładność, treści AI mogą zawierać błędy lub nieścisłości. Zawsze weryfikuj ważne informacje z pierwotnych źródeł przed podjęciem decyzji.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">6. Własność intelektualna</h2>
        <p>Cała oryginalna zawartość, projekt i kod CryptoNavigator są naszą własnością intelektualną. Streszczenia wiadomości są analizami generowanymi przez AI na podstawie ogólnie dostępnych informacji z odwołaniami do źródeł. Jeśli uważasz, że jakiekolwiek treści naruszają Twoje prawa autorskie, skontaktuj się z nami: info@cryptotop.chat.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">7. Ograniczenie odpowiedzialności</h2>
        <p>CryptoNavigator nie ponosi odpowiedzialności za jakiekolwiek straty finansowe, szkody lub negatywne konsekwencje wynikające z korzystania z naszej platformy lub polegania na naszych treściach. Handel kryptowalutami wiąże się ze znacznym ryzykiem utraty. Korzystasz z platformy na własne ryzyko.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">8. Linki zewnętrzne</h2>
        <p>Nasza strona zawiera linki do zasobów zewnętrznych, w tym giełd kryptowalut. Nie ponosimy odpowiedzialności za treści, bezpieczeństwo ani praktyki tych zewnętrznych stron. Odwiedzasz je na własne ryzyko.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">9. Zabronione użycie</h2>
        <p className="mb-2">Zgadzasz się, że nie będziesz:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>wykorzystywać platformy w nielegalnych celach</li>
          <li>próbować dokonać inżynierii wstecznej lub kopiować nasze oprogramowanie</li>
          <li>używać zautomatyzowanych parserów lub botów do zbierania treści</li>
          <li>przekręcać naszych treści lub używać ich w wprowadzający w błąd sposób</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">10. Zmiany warunków</h2>
        <p>Zastrzegamy sobie prawo do zmiany tych Warunków w dowolnym momencie. Kontynuowanie korzystania z platformy po zmianach oznacza akceptację nowych Warunków.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">11. Kontakt</h2>
        <p>Pytania dotyczące tych Warunków: <strong>info@cryptotop.chat</strong></p>
      </section>
    </main>
  );
}
