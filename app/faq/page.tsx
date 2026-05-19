import Link from 'next/link';

export const metadata = {
  title: "FAQ — Часті питання про криптовалюти 2026 | CryptoNavigator",
  description: "Відповіді на найпоширеніші питання про криптовалюти, біржі, безпеку та інвестиції. Що таке Bitcoin, як купити крипту, яку біржу обрати — простими словами.",
};

const FAQS = {
  uk: [
    { q: "Що таке криптовалюта?", a: "Криптовалюта — це цифрова валюта, яка використовує криптографію для захисту транзакцій. Найвідоміша — Bitcoin (BTC), створений у 2009 році. На відміну від звичайних грошей, криптовалюти децентралізовані — ними не керує жоден банк чи уряд." },
    { q: "З якої біржі краще почати новачку?", a: "Для початківців найкраще підходять Binance або WhiteBIT. Binance — найбільша біржа світу з великою кількістю навчальних матеріалів. WhiteBIT — українська біржа з простим інтерфейсом і підтримкою гривні. Пройди наш квіз підбору біржі для персональної рекомендації." },
    { q: "Скільки грошей потрібно для старту?", a: "Починати можна з будь-якої суми — навіть з $10-20. Більшість бірж не мають мінімального депозиту. Однак рекомендуємо починати з суми, яку не страшно втратити — крипторинок волатильний." },
    { q: "Чи безпечно зберігати крипту на біржі?", a: "Великі біржі (Binance, WhiteBIT) мають надійний захист, але для великих сум краще використовувати апаратний гаманець (Ledger, Trezor). Завжди вмикай двофакторну автентифікацію (2FA) на біржі." },
    { q: "Що таке Fear & Greed Index?", a: "Індекс страху та жадібності показує настрій крипторинку від 0 (екстремальний страх) до 100 (екстремальна жадібність). Коли індекс низький — ринок панікує і можуть бути хороші можливості для покупки. Коли високий — варто бути обережним." },
    { q: "Що таке стейкінг?", a: "Стейкінг — це заробіток на криптовалюті без активної торгівлі. Ти блокуєш свої монети на певний час і отримуєш відсотки (зазвичай 5-20% річних). Доступний на більшості великих бірж." },
    { q: "Чи потрібно платити податки з крипти?", a: "В Україні офіційно криптодоходи оподатковуються як інвестиційний прибуток (18% ПДФО + 1.5% військовий збір). Рекомендуємо консультуватися з податковим фахівцем для уточнення деталей." },
    { q: "Що таке DeFi?", a: "DeFi (децентралізовані фінанси) — це фінансові сервіси на блокчейні без посередників. Включає децентралізовані біржі (DEX), кредитування, стейкінг і yield farming. Більш ризиковано ніж централізовані біржі, але потенційно прибутковіше." },
    { q: "Як захистити свій акаунт на біржі?", a: "1) Увімкни 2FA (Google Authenticator). 2) Використовуй унікальний складний пароль. 3) Не переходь за підозрілими посиланнями. 4) Увімкни антифішинговий код. 5) Ніколи не давай нікому свій seed-фразу від гаманця." },
    { q: "Що таке Bitcoin Halving?", a: "Халвінг — це подія, коли нагорода майнерам за блок зменшується вдвічі. Відбувається приблизно кожні 4 роки. Після халвінгу пропозиція нових Bitcoin скорочується, що історично призводило до зростання ціни." },
  ],
  en: [
    { q: "What is cryptocurrency?", a: "Cryptocurrency is a digital currency that uses cryptography to secure transactions. The most well-known is Bitcoin (BTC), created in 2009. Unlike regular money, cryptocurrencies are decentralized — no bank or government controls them." },
    { q: "Which exchange is best for beginners?", a: "For beginners, Binance or WhiteBIT are the best options. Binance is the world's largest exchange with extensive educational materials. WhiteBIT offers a simple interface and easy verification. Take our exchange quiz for a personalized recommendation." },
    { q: "How much money do I need to start?", a: "You can start with any amount — even $10-20. Most exchanges have no minimum deposit. However, we recommend starting with an amount you can afford to lose, as the crypto market is highly volatile." },
    { q: "Is it safe to store crypto on an exchange?", a: "Large exchanges (Binance, WhiteBIT) have strong security, but for large amounts it's better to use a hardware wallet (Ledger, Trezor). Always enable two-factor authentication (2FA) on your exchange account." },
    { q: "What is the Fear & Greed Index?", a: "The Fear & Greed Index shows crypto market sentiment from 0 (extreme fear) to 100 (extreme greed). When the index is low, the market is panicking and there may be good buying opportunities. When high, it's wise to be cautious." },
    { q: "What is staking?", a: "Staking is earning from cryptocurrency without active trading. You lock your coins for a period of time and receive interest (usually 5-20% annually). Available on most major exchanges." },
    { q: "Do I need to pay taxes on crypto?", a: "Tax rules vary by country. In most jurisdictions, crypto gains are taxable as investment income. We recommend consulting a tax professional for specific advice in your country." },
    { q: "What is DeFi?", a: "DeFi (Decentralized Finance) refers to financial services on the blockchain without intermediaries. It includes decentralized exchanges (DEX), lending, staking, and yield farming. More risky than centralized exchanges but potentially more profitable." },
    { q: "How do I secure my exchange account?", a: "1) Enable 2FA (Google Authenticator). 2) Use a unique complex password. 3) Don't click suspicious links. 4) Enable anti-phishing codes. 5) Never share your wallet seed phrase with anyone." },
    { q: "What is Bitcoin Halving?", a: "Halving is an event where the miner reward per block is cut in half. It happens approximately every 4 years. After halving, the supply of new Bitcoin decreases, which historically has led to price increases." },
  ],
  pl: [
    { q: "Czym jest kryptowaluta?", a: "Kryptowaluta to waluta cyfrowa wykorzystująca kryptografię do zabezpieczania transakcji. Najbardziej znana to Bitcoin (BTC), stworzony w 2009 roku. W przeciwieństwie do zwykłych pieniędzy, kryptowaluty są zdecentralizowane — nie kontroluje ich żaden bank ani rząd." },
    { q: "Od której giełdy zacząć jako początkujący?", a: "Dla początkujących najlepsze są Binance lub WhiteBIT. Binance to największa giełda świata z bogatymi materiałami edukacyjnymi. WhiteBIT oferuje prosty interfejs i łatwą weryfikację. Przejdź nasz quiz, aby uzyskać spersonalizowaną rekomendację." },
    { q: "Ile pieniędzy potrzebuję na start?", a: "Możesz zacząć od dowolnej kwoty — nawet od 10-20 dolarów. Większość giełd nie ma minimalnego depozytu. Zalecamy jednak zaczynać od kwoty, którą możesz sobie pozwolić stracić, ponieważ rynek kryptowalut jest bardzo zmienny." },
    { q: "Czy bezpiecznie jest trzymać krypto na giełdzie?", a: "Duże giełdy (Binance, WhiteBIT) mają solidne zabezpieczenia, ale dla dużych kwot lepiej używać portfela sprzętowego (Ledger, Trezor). Zawsze włączaj uwierzytelnianie dwuskładnikowe (2FA)." },
    { q: "Czym jest Indeks Strachu i Chciwości?", a: "Indeks Strachu i Chciwości pokazuje nastroje rynku krypto od 0 (skrajny strach) do 100 (skrajna chciwość). Gdy indeks jest niski, rynek panikuje i mogą pojawić się dobre okazje do zakupu. Gdy jest wysoki, warto zachować ostrożność." },
    { q: "Czym jest staking?", a: "Staking to zarabianie na kryptowalucie bez aktywnego handlu. Blokujesz swoje monety na określony czas i otrzymujesz odsetki (zazwyczaj 5-20% rocznie). Dostępny na większości głównych giełd." },
    { q: "Czy muszę płacić podatki od kryptowalut?", a: "Przepisy podatkowe różnią się w zależności od kraju. W Polsce zyski z kryptowalut są opodatkowane jako przychód z kapitałów pieniężnych (19% podatku). Zalecamy konsultację z doradcą podatkowym." },
    { q: "Czym jest DeFi?", a: "DeFi (Zdecentralizowane Finanse) to usługi finansowe na blockchainie bez pośredników. Obejmuje zdecentralizowane giełdy (DEX), pożyczki, staking i yield farming. Bardziej ryzykowne niż scentralizowane giełdy, ale potencjalnie bardziej dochodowe." },
    { q: "Jak zabezpieczyć konto na giełdzie?", a: "1) Włącz 2FA (Google Authenticator). 2) Używaj unikalnego, złożonego hasła. 3) Nie klikaj podejrzanych linków. 4) Włącz kod antyphishingowy. 5) Nigdy nie udostępniaj nikomu frazy seed swojego portfela." },
    { q: "Czym jest Bitcoin Halving?", a: "Halving to wydarzenie, w którym nagroda dla górników za blok jest zmniejszana o połowę. Dzieje się to mniej więcej co 4 lata. Po halvingu podaż nowych Bitcoinów maleje, co historycznie prowadziło do wzrostu ceny." },
  ],
  de: [
    { q: "Was ist Kryptowährung?", a: "Kryptowährung ist eine digitale Währung, die Kryptographie zur Sicherung von Transaktionen verwendet. Die bekannteste ist Bitcoin (BTC), der 2009 erstellt wurde. Im Gegensatz zu normalem Geld sind Kryptowährungen dezentralisiert — keine Bank oder Regierung kontrolliert sie." },
    { q: "Welche Börse ist für Anfänger am besten?", a: "Für Anfänger sind Binance oder WhiteBIT die besten Optionen. Binance ist die weltgrößte Börse mit umfangreichen Lernmaterialien. WhiteBIT bietet eine einfache Oberfläche und einfache Verifizierung. Mache unseren Quiz für eine persönliche Empfehlung." },
    { q: "Wie viel Geld brauche ich für den Start?", a: "Du kannst mit jedem Betrag anfangen — sogar mit 10-20 Dollar. Die meisten Börsen haben keine Mindesteinlage. Wir empfehlen jedoch, mit einem Betrag zu beginnen, den du dir leisten kannst zu verlieren, da der Kryptomarkt sehr volatil ist." },
    { q: "Ist es sicher, Krypto an einer Börse aufzubewahren?", a: "Große Börsen (Binance, WhiteBIT) haben starke Sicherheit, aber für große Beträge ist es besser, ein Hardware-Wallet (Ledger, Trezor) zu verwenden. Aktiviere immer die Zwei-Faktor-Authentifizierung (2FA)." },
    { q: "Was ist der Fear & Greed Index?", a: "Der Fear & Greed Index zeigt die Marktstimmung von 0 (extreme Angst) bis 100 (extreme Gier). Wenn der Index niedrig ist, panikiert der Markt und es können gute Kaufgelegenheiten entstehen. Wenn er hoch ist, ist Vorsicht geboten." },
    { q: "Was ist Staking?", a: "Staking bedeutet, mit Kryptowährung zu verdienen, ohne aktiv zu handeln. Du sperrst deine Coins für einen Zeitraum und erhältst Zinsen (normalerweise 5-20% jährlich). Verfügbar auf den meisten großen Börsen." },
    { q: "Muss ich Steuern auf Krypto zahlen?", a: "In Deutschland sind Kryptogewinne nach einer Haltefrist von über einem Jahr steuerfrei. Bei kürzerer Haltedauer werden sie als sonstige Einkünfte besteuert. Wir empfehlen die Beratung durch einen Steuerberater." },
    { q: "Was ist DeFi?", a: "DeFi (Dezentralisierte Finanzen) bezeichnet Finanzdienstleistungen auf der Blockchain ohne Zwischenhändler. Dazu gehören dezentralisierte Börsen (DEX), Kreditvergabe, Staking und Yield Farming. Riskanter als zentralisierte Börsen, aber potenziell profitabler." },
    { q: "Wie sichere ich mein Börsenkonto?", a: "1) Aktiviere 2FA (Google Authenticator). 2) Verwende ein einzigartiges, komplexes Passwort. 3) Klicke keine verdächtigen Links. 4) Aktiviere Anti-Phishing-Codes. 5) Teile niemals deine Wallet-Seed-Phrase mit jemandem." },
    { q: "Was ist Bitcoin Halving?", a: "Halving ist ein Ereignis, bei dem die Belohnung für Miner pro Block halbiert wird. Es findet ungefähr alle 4 Jahre statt. Nach dem Halving sinkt das Angebot an neuen Bitcoins, was historisch zu Preisanstiegen geführt hat." },
  ],
};

const LOCALE_UI = {
  uk: { title: '❓ Часті питання', subtitle: 'Відповіді на найпоширеніші питання про крипту та біржі', backHome: '← На головну', quiz: '🎯 Пройти квіз підбору біржі' },
  en: { title: '❓ Frequently Asked Questions', subtitle: 'Answers to the most common questions about crypto and exchanges', backHome: '← Back to Home', quiz: '🎯 Take exchange quiz' },
  pl: { title: '❓ Często zadawane pytania', subtitle: 'Odpowiedzi na najczęściej zadawane pytania o krypto i giełdach', backHome: '← Powrót do strony głównej', quiz: '🎯 Przejdź quiz giełdowy' },
  de: { title: '❓ Häufig gestellte Fragen', subtitle: 'Antworten auf die häufigsten Fragen zu Krypto und Börsen', backHome: '← Zurück zur Startseite', quiz: '🎯 Börsen-Quiz starten' },
};

export default function FAQPage({ locale = 'uk' }: { locale?: string }) {
  const lang = (locale in FAQS) ? locale as keyof typeof FAQS : 'uk';
  const faqs = FAQS[lang];
  const ui = LOCALE_UI[lang];
  const homeHref = lang === 'uk' ? '/' : `/${lang}`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href={homeHref} className="text-blue-600 hover:underline text-sm mb-6 inline-block">{ui.backHome}</Link>
      <h1 className="text-4xl font-bold text-gray-900 mb-3">{ui.title}</h1>
      <p className="text-gray-500 mb-10">{ui.subtitle}</p>

      <div className="space-y-4">
        {faqs.map((item, i) => (
          <details key={i} className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
            <summary className="flex justify-between items-center p-5 cursor-pointer font-medium text-gray-900 hover:bg-gray-50 transition list-none">
              <span>{item.q}</span>
              <span className="text-gray-400 group-open:rotate-180 transition-transform text-xl">↓</span>
            </summary>
            <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
              {item.a}
            </div>
          </details>
        ))}
      </div>

      <div className="mt-10 p-6 bg-blue-50 rounded-2xl text-center">
        <p className="text-gray-700 mb-4 font-medium">Не знаєш яку біржу обрати?</p>
        <Link href={homeHref} className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition font-semibold">
          {ui.quiz}
        </Link>
      </div>
    </div>
  );
}