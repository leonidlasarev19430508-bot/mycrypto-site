import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zrzeczenie odpowiedzialności — CryptoNavigator',
  description: 'Zrzeczenie odpowiedzialności CryptoNavigator (cryptotop.chat)',
  alternates: { canonical: 'https://cryptotop.chat/pl/disclaimer' },
};

export default function DisclaimerPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-black mb-2">Zrzeczenie odpowiedzialności</h1>
      <p className="text-sm text-gray-400 mb-8">Ostatnia aktualizacja: czerwiec 2026</p>

      <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6 mb-10">
        <p className="font-black text-red-800 text-lg mb-2">⚠️ TO NIE JEST PORADA FINANSOWA</p>
        <p className="text-red-700">Wszystkie treści na CryptoNavigator są przeznaczone wyłącznie do <strong>celów edukacyjnych i informacyjnych</strong>. Nic na tej stronie nie stanowi porady finansowej, inwestycyjnej, handlowej, prawnej ani podatkowej.</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Ryzyko inwestycyjne</h2>
        <p>Rynki kryptowalut są bardzo zmienne. Ceny mogą gwałtownie rosnąć lub spadać w krótkim czasie. Możesz stracić część lub całość zainwestowanych środków. Wyniki z przeszłości nie gwarantują przyszłych rezultatów.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Analiza generowana przez AI</h2>
        <p>Streszczenia wiadomości, analiza nastrojów rynku oraz sygnały kupna/sprzedaży/trzymaj wyświetlane na platformie są generowane przez sztuczną inteligencję. To <strong>zautomatyzowane oceny algorytmiczne</strong>, a nie profesjonalna porada finansowa. Mogą być niedokładne, niekompletne lub przestarzałe.</p>
      </section>

      <section className="mb-8" id="affiliate">
        <h2 className="text-xl font-bold mb-3">Linki afiliacyjne</h2>
        <p>CryptoNavigator zawiera linki afiliacyjne do giełd kryptowalut. Możemy otrzymać prowizję, jeśli zarejestrujesz się lub handlujesz za pośrednictwem naszych linków. To sposób finansowania platformy. Nasza analiza i rekomendacje <strong>nie są wpływane</strong> przez relacje afiliacyjne.</p>
        <p className="mt-2">Giełdy afiliacyjne: Binance, Bybit, OKX, KuCoin.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Brak gwarancji dokładności</h2>
        <p>Chociaż staramy się dostarczać dokładne i aktualne informacje, nie udzielamy żadnych gwarancji dotyczących kompletności, dokładności, wiarygodności ani dostępności jakichkolwiek informacji na platformie.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Twoja odpowiedzialność</h2>
        <p>Wszystkie decyzje finansowe podejmujesz wyłącznie na własną odpowiedzialność. Zdecydowanie zalecamy skonsultowanie się z wykwalifikowanym doradcą finansowym przed podjęciem jakichkolwiek decyzji inwestycyjnych.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">Kontakt</h2>
        <p>Pytania dotyczące tego zrzeczenia: <strong>info@cryptotop.chat</strong></p>
      </section>
    </main>
  );
}
