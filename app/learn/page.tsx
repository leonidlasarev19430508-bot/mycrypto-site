import Link from 'next/link';
import ChatWidget from '../components/ChatWidget';

const CONTENT = {
  uk: {
    title: '📚 Крипто Лікбез',
    subtitle: 'Все що потрібно знати про криптовалюти — від основ до практики. Простими словами, без зайвого жаргону.',
    back: '← На головну',
    ctaTitle: 'Готовий почати торгівлю?',
    ctaDesc: 'Пройди квіз і знайди ідеальну біржу для себе',
    ctaBtn: '🎯 Пройти квіз →',
    faqBtn: '❓ FAQ',
    levels: { beginner: 'Початківець', intermediate: 'Середній', important: 'Важливо' },
    lessons: [
      {
        id: 'what-is-crypto', emoji: '🪙', title: 'Що таке криптовалюта?', level: 'Початківець', duration: '5 хв',
        color: 'from-blue-500 to-blue-600',
        content: [
          { type: 'text', text: 'Криптовалюта — це цифрові гроші, які існують тільки в інтернеті. На відміну від звичайних грошей, ними не керує жоден банк чи уряд.' },
          { type: 'highlight', text: '💡 Простий приклад: Уяви що у тебе є цифровий золотий злиток, який можна надіслати будь-кому у світі за лічені секунди без банку.' },
          { type: 'text', text: 'Bitcoin (BTC) — перша і найвідоміша криптовалюта, створена у 2009 році. Сьогодні існує понад 20,000 різних криптовалют.' },
          { type: 'list', title: 'Головні характеристики:', items: ['Децентралізація — немає єдиного контролера', 'Прозорість — всі транзакції публічні', 'Безпека — захищено криптографією', 'Глобальність — працює у будь-якій країні'] },
        ],
      },
      {
        id: 'what-is-blockchain', emoji: '⛓️', title: 'Що таке блокчейн?', level: 'Початківець', duration: '7 хв',
        color: 'from-purple-500 to-purple-600',
        content: [
          { type: 'text', text: 'Блокчейн — це публічна база даних, в якій зберігаються всі транзакції криптовалюти. Уяви величезну книгу обліку, копія якої є у мільйонів комп\'ютерів.' },
          { type: 'highlight', text: '💡 Аналогія: Блокчейн — як Google Docs для мільйонів людей. Жоден не може підробити запис, бо всі інші одразу це побачать.' },
          { type: 'list', title: 'Як це працює:', items: ['Транзакція створюється і надсилається в мережу', 'Тисячі комп\'ютерів перевіряють її', 'Підтверджена транзакція записується в "блок"', 'Блок додається до ланцюжка — це і є блокчейн'] },
        ],
      },
      {
        id: 'how-to-buy', emoji: '💳', title: 'Як купити першу крипту?', level: 'Початківець', duration: '10 хв',
        color: 'from-green-500 to-green-600',
        content: [
          { type: 'text', text: 'Купити криптовалюту сьогодні так само просто як купити щось в інтернет-магазині. Найпростіший спосіб — через криптовалютну біржу.' },
          { type: 'list', title: 'Крок за кроком:', items: ['Вибери біржу (Binance або WhiteBIT)', 'Зареєструйся і пройди верифікацію', 'Поповни рахунок карткою', 'Вибери криптовалюту і купи'] },
          { type: 'highlight', text: '⚠️ Порада: Починай з $20-50. Крипторинок волатильний — інвестуй тільки те, що готовий втратити.' },
        ],
      },
      {
        id: 'wallets', emoji: '👛', title: 'Що таке криптогаманець?', level: 'Початківець', duration: '8 хв',
        color: 'from-orange-500 to-orange-600',
        content: [
          { type: 'text', text: 'Криптогаманець — це не місце де зберігається крипта, а ключ доступу до неї. Як ключ від банківського сейфу.' },
          { type: 'list', title: 'Типи гаманців:', items: ['Гарячий гаманець (на біржі) — зручний, але менш безпечний', 'Програмний гаманець (MetaMask) — на комп\'ютері', 'Апаратний гаманець (Ledger) — найбезпечніший'] },
          { type: 'highlight', text: '🔑 Найважливіше: Seed-фраза (12-24 слова) — єдиний спосіб відновити доступ. Ніколи не діліться нею!' },
        ],
      },
      {
        id: 'btc-vs-eth', emoji: '⚔️', title: 'Bitcoin vs Ethereum', level: 'Середній', duration: '8 хв',
        color: 'from-yellow-500 to-orange-500',
        content: [
          { type: 'text', text: 'Bitcoin і Ethereum — дві найбільші криптовалюти, але з різними цілями.' },
          { type: 'list', title: 'Bitcoin (BTC):', items: ['"Цифрове золото" — засіб збереження вартості', 'Обмежена кількість: лише 21 мільйон BTC', 'Простий і надійний'] },
          { type: 'list', title: 'Ethereum (ETH):', items: ['Платформа для смарт-контрактів', 'Основа для DeFi, NFT, Web3', 'Більш технологічний'] },
          { type: 'highlight', text: '💡 BTC — цифрове золото для збереження. ETH — цифрова нафта для роботи додатків.' },
        ],
      },
      {
        id: 'defi', emoji: '🌐', title: 'Що таке DeFi?', level: 'Середній', duration: '10 хв',
        color: 'from-teal-500 to-teal-600',
        content: [
          { type: 'text', text: 'DeFi (Decentralized Finance) — це фінансові послуги без банків, що працюють на блокчейні.' },
          { type: 'list', title: 'Що можна робити в DeFi:', items: ['Позичати криптовалюту і отримувати відсотки', 'Брати кредит під заставу крипти', 'Торгувати на децентралізованих біржах', 'Заробляти на yield farming'] },
          { type: 'highlight', text: '⚠️ Ризики DeFi: смарт-контракти можуть містити баги, немає страхування. Починай з малих сум.' },
        ],
      },
      {
        id: 'staking', emoji: '💰', title: 'Стейкінг — пасивний дохід', level: 'Середній', duration: '7 хв',
        color: 'from-pink-500 to-pink-600',
        content: [
          { type: 'text', text: 'Стейкінг — це заробіток на криптовалюті без активної торгівлі. Ти "заморожуєш" монети і отримуєш відсотки.' },
          { type: 'highlight', text: '💡 Стейкінг — як банківський депозит, тільки з вищими відсотками (5-20% річних) і без банку.' },
          { type: 'list', title: 'Де стейкувати:', items: ['На біржі (Binance Earn, WhiteBIT) — найпростіше', 'В гаманці (MetaMask) — більше контролю', 'В DeFi протоколах — найвищі відсотки але ризики'] },
        ],
      },
      {
        id: 'security', emoji: '🔒', title: 'Безпека в крипті', level: 'Важливо', duration: '10 хв',
        color: 'from-red-500 to-red-600',
        content: [
          { type: 'text', text: 'Безпека — найважливіше в криптовалютах. Тут немає служби підтримки яка поверне вкрадені кошти.' },
          { type: 'list', title: 'Правила безпеки:', items: ['Ніколи не діліться seed-фразою', 'Використовуй 2FA (Google Authenticator)', 'Унікальний пароль для кожної біржі', 'Перевіряй URL — фішинг дуже поширений', 'Не клікай на підозрілі посилання', 'Великі суми — на апаратному гаманці'] },
          { type: 'highlight', text: '🚨 Найпоширеніші шахрайства: фейкові біржі, "подарунки" від знаменитостей, схеми Понці.' },
        ],
      },
    ],
  },
  en: {
    title: '📚 Crypto Education',
    subtitle: 'Everything you need to know about cryptocurrencies — from basics to practice. Simple words, no jargon.',
    back: '← Back to Home',
    ctaTitle: 'Ready to start trading?',
    ctaDesc: 'Take the quiz and find your ideal exchange',
    ctaBtn: '🎯 Take the quiz →',
    faqBtn: '❓ FAQ',
    levels: { beginner: 'Beginner', intermediate: 'Intermediate', important: 'Important' },
    lessons: [
      {
        id: 'what-is-crypto', emoji: '🪙', title: 'What is cryptocurrency?', level: 'Beginner', duration: '5 min',
        color: 'from-blue-500 to-blue-600',
        content: [
          { type: 'text', text: 'Cryptocurrency is digital money that exists only on the internet. Unlike regular money, no bank or government controls it.' },
          { type: 'highlight', text: '💡 Simple example: Imagine having a digital gold bar that you can send to anyone in the world in seconds without a bank.' },
          { type: 'text', text: 'Bitcoin (BTC) is the first and most famous cryptocurrency, created in 2009. Today there are over 20,000 different cryptocurrencies.' },
          { type: 'list', title: 'Key characteristics:', items: ['Decentralization — no single controller', 'Transparency — all transactions are public', 'Security — protected by cryptography', 'Global — works in any country'] },
        ],
      },
      {
        id: 'what-is-blockchain', emoji: '⛓️', title: 'What is blockchain?', level: 'Beginner', duration: '7 min',
        color: 'from-purple-500 to-purple-600',
        content: [
          { type: 'text', text: 'Blockchain is a public database storing all cryptocurrency transactions. Imagine a huge ledger with copies on millions of computers worldwide.' },
          { type: 'highlight', text: '💡 Analogy: Blockchain is like Google Docs for millions of people. No one can forge a record because everyone else would see it immediately.' },
          { type: 'list', title: 'How it works:', items: ['A transaction is created and sent to the network', 'Thousands of computers verify it', 'Confirmed transaction is written into a "block"', 'The block is added to the chain — that\'s the blockchain'] },
        ],
      },
      {
        id: 'how-to-buy', emoji: '💳', title: 'How to buy your first crypto?', level: 'Beginner', duration: '10 min',
        color: 'from-green-500 to-green-600',
        content: [
          { type: 'text', text: 'Buying cryptocurrency today is as simple as shopping online. The easiest way is through a crypto exchange.' },
          { type: 'list', title: 'Step by step:', items: ['Choose an exchange (Binance for beginners)', 'Register and complete verification', 'Fund your account with a card', 'Choose a cryptocurrency and buy'] },
          { type: 'highlight', text: '⚠️ Tip: Start with $20-50. The crypto market is volatile — only invest what you can afford to lose.' },
        ],
      },
      {
        id: 'wallets', emoji: '👛', title: 'What is a crypto wallet?', level: 'Beginner', duration: '8 min',
        color: 'from-orange-500 to-orange-600',
        content: [
          { type: 'text', text: 'A crypto wallet is not where crypto is stored (it\'s stored on the blockchain), but a key to access it. Like a key to a bank safe.' },
          { type: 'list', title: 'Types of wallets:', items: ['Hot wallet (on exchange) — convenient but less secure', 'Software wallet (MetaMask) — on your computer', 'Hardware wallet (Ledger) — most secure'] },
          { type: 'highlight', text: '🔑 Most important: Seed phrase (12-24 words) — the only way to recover access. Never share it with anyone!' },
        ],
      },
      {
        id: 'btc-vs-eth', emoji: '⚔️', title: 'Bitcoin vs Ethereum', level: 'Intermediate', duration: '8 min',
        color: 'from-yellow-500 to-orange-500',
        content: [
          { type: 'text', text: 'Bitcoin and Ethereum are the two largest cryptocurrencies, but with different purposes.' },
          { type: 'list', title: 'Bitcoin (BTC):', items: ['"Digital gold" — store of value', 'Limited supply: only 21 million BTC', 'Simple and reliable'] },
          { type: 'list', title: 'Ethereum (ETH):', items: ['Platform for smart contracts', 'Foundation for DeFi, NFT, Web3', 'More technological'] },
          { type: 'highlight', text: '💡 BTC — digital gold for saving. ETH — digital oil for running applications.' },
        ],
      },
      {
        id: 'defi', emoji: '🌐', title: 'What is DeFi?', level: 'Intermediate', duration: '10 min',
        color: 'from-teal-500 to-teal-600',
        content: [
          { type: 'text', text: 'DeFi (Decentralized Finance) is financial services without banks, running on the blockchain.' },
          { type: 'list', title: 'What you can do in DeFi:', items: ['Lend crypto and earn interest', 'Borrow against your crypto', 'Trade on decentralized exchanges', 'Earn through yield farming'] },
          { type: 'highlight', text: '⚠️ DeFi risks: smart contracts can have bugs, no insurance like banks. Start with small amounts.' },
        ],
      },
      {
        id: 'staking', emoji: '💰', title: 'Staking — passive income', level: 'Intermediate', duration: '7 min',
        color: 'from-pink-500 to-pink-600',
        content: [
          { type: 'text', text: 'Staking is earning from cryptocurrency without active trading. You "lock" your coins for a period and receive interest.' },
          { type: 'highlight', text: '💡 Staking is like a bank deposit but with higher rates (5-20% annually) and no bank.' },
          { type: 'list', title: 'Where to stake:', items: ['On exchange (Binance Earn) — easiest', 'In wallet (MetaMask) — more control', 'In DeFi protocols — highest rates but more risk'] },
        ],
      },
      {
        id: 'security', emoji: '🔒', title: 'Security in crypto', level: 'Important', duration: '10 min',
        color: 'from-red-500 to-red-600',
        content: [
          { type: 'text', text: 'Security is the most important thing in crypto. There\'s no support service that will return stolen funds.' },
          { type: 'list', title: 'Security rules:', items: ['Never share your seed phrase', 'Use 2FA (Google Authenticator)', 'Unique password for each exchange', 'Check URLs — phishing is very common', 'Don\'t click suspicious links', 'Large amounts — on hardware wallet'] },
          { type: 'highlight', text: '🚨 Most common scams: fake exchanges, celebrity "giveaways", Ponzi schemes.' },
        ],
      },
    ],
  },
  pl: {
    title: '📚 Edukacja Krypto',
    subtitle: 'Wszystko co musisz wiedzieć o kryptowalutach — od podstaw do praktyki. Prostymi słowami, bez żargonu.',
    back: '← Powrót do strony głównej',
    ctaTitle: 'Gotowy do handlu?',
    ctaDesc: 'Przejdź quiz i znajdź idealną giełdę',
    ctaBtn: '🎯 Przejdź quiz →',
    faqBtn: '❓ FAQ',
    levels: { beginner: 'Początkujący', intermediate: 'Średni', important: 'Ważne' },
    lessons: [
      {
        id: 'what-is-crypto', emoji: '🪙', title: 'Czym jest kryptowaluta?', level: 'Początkujący', duration: '5 min',
        color: 'from-blue-500 to-blue-600',
        content: [
          { type: 'text', text: 'Kryptowaluta to cyfrowe pieniądze istniejące tylko w internecie. W przeciwieństwie do zwykłych pieniędzy, nie kontroluje ich żaden bank ani rząd.' },
          { type: 'highlight', text: '💡 Prosty przykład: Wyobraź sobie cyfrową sztabkę złota, którą możesz wysłać komukolwiek na świecie w kilka sekund bez banku.' },
          { type: 'text', text: 'Bitcoin (BTC) to pierwsza i najbardziej znana kryptowaluta, stworzona w 2009 roku. Dziś istnieje ponad 20 000 różnych kryptowalut.' },
          { type: 'list', title: 'Główne cechy:', items: ['Decentralizacja — brak jednego kontrolera', 'Przejrzystość — wszystkie transakcje są publiczne', 'Bezpieczeństwo — chronione kryptografią', 'Globalność — działa w każdym kraju'] },
        ],
      },
      {
        id: 'what-is-blockchain', emoji: '⛓️', title: 'Czym jest blockchain?', level: 'Początkujący', duration: '7 min',
        color: 'from-purple-500 to-purple-600',
        content: [
          { type: 'text', text: 'Blockchain to publiczna baza danych przechowująca wszystkie transakcje kryptowalutowe. Wyobraź sobie ogromną księgę rachunkową z kopiami na milionach komputerów.' },
          { type: 'highlight', text: '💡 Analogia: Blockchain jak Google Docs dla milionów ludzi. Nikt nie może sfałszować wpisu, bo wszyscy inni natychmiast to zobaczą.' },
          { type: 'list', title: 'Jak to działa:', items: ['Transakcja jest tworzona i wysyłana do sieci', 'Tysiące komputerów ją weryfikują', 'Potwierdzona transakcja jest zapisywana w "bloku"', 'Blok jest dodawany do łańcucha — to jest blockchain'] },
        ],
      },
      {
        id: 'how-to-buy', emoji: '💳', title: 'Jak kupić pierwszą krypto?', level: 'Początkujący', duration: '10 min',
        color: 'from-green-500 to-green-600',
        content: [
          { type: 'text', text: 'Kupowanie kryptowaluty jest dziś tak proste jak zakupy online. Najłatwiejszy sposób to przez giełdę kryptowalut.' },
          { type: 'list', title: 'Krok po kroku:', items: ['Wybierz giełdę (Binance dla początkujących)', 'Zarejestruj się i przejdź weryfikację', 'Zasilij konto kartą', 'Wybierz kryptowalutę i kup'] },
          { type: 'highlight', text: '⚠️ Porada: Zacznij od $20-50. Rynek krypto jest zmienny — inwestuj tylko tyle, ile możesz stracić.' },
        ],
      },
      {
        id: 'wallets', emoji: '👛', title: 'Czym jest portfel krypto?', level: 'Początkujący', duration: '8 min',
        color: 'from-orange-500 to-orange-600',
        content: [
          { type: 'text', text: 'Portfel krypto to nie miejsce gdzie przechowywana jest krypto, ale klucz dostępu do niej. Jak klucz do bankowego sejfu.' },
          { type: 'list', title: 'Rodzaje portfeli:', items: ['Gorący portfel (na giełdzie) — wygodny, mniej bezpieczny', 'Portfel programowy (MetaMask) — na komputerze', 'Portfel sprzętowy (Ledger) — najbezpieczniejszy'] },
          { type: 'highlight', text: '🔑 Najważniejsze: Fraza seed (12-24 słowa) — jedyny sposób odzyskania dostępu. Nigdy jej nie udostępniaj!' },
        ],
      },
      {
        id: 'btc-vs-eth', emoji: '⚔️', title: 'Bitcoin vs Ethereum', level: 'Średni', duration: '8 min',
        color: 'from-yellow-500 to-orange-500',
        content: [
          { type: 'text', text: 'Bitcoin i Ethereum to dwie największe kryptowaluty, ale o różnych celach.' },
          { type: 'list', title: 'Bitcoin (BTC):', items: ['"Cyfrowe złoto" — środek przechowywania wartości', 'Ograniczona podaż: tylko 21 milionów BTC', 'Prosty i niezawodny'] },
          { type: 'list', title: 'Ethereum (ETH):', items: ['Platforma dla smart kontraktów', 'Podstawa DeFi, NFT, Web3', 'Bardziej technologiczny'] },
          { type: 'highlight', text: '💡 BTC — cyfrowe złoto do oszczędzania. ETH — cyfrowa ropa dla aplikacji.' },
        ],
      },
      {
        id: 'defi', emoji: '🌐', title: 'Czym jest DeFi?', level: 'Średni', duration: '10 min',
        color: 'from-teal-500 to-teal-600',
        content: [
          { type: 'text', text: 'DeFi (Zdecentralizowane Finanse) to usługi finansowe bez banków, działające na blockchainie.' },
          { type: 'list', title: 'Co możesz robić w DeFi:', items: ['Pożyczać krypto i zarabiać odsetki', 'Brać kredyty pod zastaw krypto', 'Handlować na zdecentralizowanych giełdach', 'Zarabiać na yield farming'] },
          { type: 'highlight', text: '⚠️ Ryzyka DeFi: smart kontrakty mogą mieć błędy, brak ubezpieczenia. Zacznij od małych kwot.' },
        ],
      },
      {
        id: 'staking', emoji: '💰', title: 'Staking — dochód pasywny', level: 'Średni', duration: '7 min',
        color: 'from-pink-500 to-pink-600',
        content: [
          { type: 'text', text: 'Staking to zarabianie na kryptowalutach bez aktywnego handlu. "Zamrażasz" monety na pewien czas i otrzymujesz odsetki.' },
          { type: 'highlight', text: '💡 Staking jak lokata bankowa, ale z wyższymi stopami (5-20% rocznie) i bez banku.' },
          { type: 'list', title: 'Gdzie stakować:', items: ['Na giełdzie (Binance Earn) — najłatwiej', 'W portfelu (MetaMask) — więcej kontroli', 'W protokołach DeFi — najwyższe stopy, ale ryzyko'] },
        ],
      },
      {
        id: 'security', emoji: '🔒', title: 'Bezpieczeństwo w krypto', level: 'Ważne', duration: '10 min',
        color: 'from-red-500 to-red-600',
        content: [
          { type: 'text', text: 'Bezpieczeństwo to najważniejsza rzecz w kryptowalutach. Nie ma tu obsługi klienta, która zwróci skradzione środki.' },
          { type: 'list', title: 'Zasady bezpieczeństwa:', items: ['Nigdy nie udostępniaj frazy seed', 'Używaj 2FA (Google Authenticator)', 'Unikalne hasło dla każdej giełdy', 'Sprawdzaj URL — phishing jest powszechny', 'Nie klikaj podejrzanych linków', 'Duże kwoty — na portfelu sprzętowym'] },
          { type: 'highlight', text: '🚨 Najczęstsze oszustwa: fałszywe giełdy, "prezenty" od celebrytów, schematy Ponziego.' },
        ],
      },
    ],
  },
  de: {
    title: '📚 Krypto Bildung',
    subtitle: 'Alles was du über Kryptowährungen wissen musst — von den Grundlagen bis zur Praxis. Einfache Worte, kein Fachjargon.',
    back: '← Zurück zur Startseite',
    ctaTitle: 'Bereit mit dem Handel zu beginnen?',
    ctaDesc: 'Mache das Quiz und finde deine ideale Börse',
    ctaBtn: '🎯 Quiz starten →',
    faqBtn: '❓ FAQ',
    levels: { beginner: 'Anfänger', intermediate: 'Mittelstufe', important: 'Wichtig' },
    lessons: [
      {
        id: 'what-is-crypto', emoji: '🪙', title: 'Was ist Kryptowährung?', level: 'Anfänger', duration: '5 Min',
        color: 'from-blue-500 to-blue-600',
        content: [
          { type: 'text', text: 'Kryptowährung ist digitales Geld, das nur im Internet existiert. Im Gegensatz zu normalem Geld wird es von keiner Bank oder Regierung kontrolliert.' },
          { type: 'highlight', text: '💡 Einfaches Beispiel: Stell dir einen digitalen Goldbarren vor, den du in Sekunden ohne Bank an jeden weltweit senden kannst.' },
          { type: 'text', text: 'Bitcoin (BTC) ist die erste und bekannteste Kryptowährung, die 2009 erstellt wurde. Heute gibt es über 20.000 verschiedene Kryptowährungen.' },
          { type: 'list', title: 'Hauptmerkmale:', items: ['Dezentralisierung — kein einzelner Kontrolleur', 'Transparenz — alle Transaktionen sind öffentlich', 'Sicherheit — durch Kryptographie geschützt', 'Global — funktioniert in jedem Land'] },
        ],
      },
      {
        id: 'what-is-blockchain', emoji: '⛓️', title: 'Was ist Blockchain?', level: 'Anfänger', duration: '7 Min',
        color: 'from-purple-500 to-purple-600',
        content: [
          { type: 'text', text: 'Blockchain ist eine öffentliche Datenbank, die alle Kryptowährungstransaktionen speichert. Stell dir ein riesiges Kontobuch vor, dessen Kopien auf Millionen von Computern weltweit vorhanden sind.' },
          { type: 'highlight', text: '💡 Analogie: Blockchain wie Google Docs für Millionen Menschen. Niemand kann einen Eintrag fälschen, weil alle anderen es sofort sehen würden.' },
          { type: 'list', title: 'Wie es funktioniert:', items: ['Eine Transaktion wird erstellt und ans Netzwerk gesendet', 'Tausende Computer überprüfen sie', 'Bestätigte Transaktion wird in einen "Block" geschrieben', 'Der Block wird zur Kette hinzugefügt — das ist die Blockchain'] },
        ],
      },
      {
        id: 'how-to-buy', emoji: '💳', title: 'Wie kauft man seine erste Krypto?', level: 'Anfänger', duration: '10 Min',
        color: 'from-green-500 to-green-600',
        content: [
          { type: 'text', text: 'Kryptowährung zu kaufen ist heute so einfach wie Online-Shopping. Der einfachste Weg ist über eine Kryptobörse.' },
          { type: 'list', title: 'Schritt für Schritt:', items: ['Wähle eine Börse (Binance für Anfänger)', 'Registriere dich und verifiziere dich', 'Lade dein Konto mit Karte auf', 'Wähle eine Kryptowährung und kaufe'] },
          { type: 'highlight', text: '⚠️ Tipp: Beginne mit $20-50. Der Kryptomarkt ist volatil — investiere nur was du dir leisten kannst zu verlieren.' },
        ],
      },
      {
        id: 'wallets', emoji: '👛', title: 'Was ist eine Krypto-Wallet?', level: 'Anfänger', duration: '8 Min',
        color: 'from-orange-500 to-orange-600',
        content: [
          { type: 'text', text: 'Eine Krypto-Wallet ist kein Ort wo Krypto gespeichert wird, sondern ein Zugriffsschlüssel. Wie ein Schlüssel zu einem Banktresor.' },
          { type: 'list', title: 'Arten von Wallets:', items: ['Hot Wallet (an der Börse) — bequem, weniger sicher', 'Software Wallet (MetaMask) — auf dem Computer', 'Hardware Wallet (Ledger) — am sichersten'] },
          { type: 'highlight', text: '🔑 Wichtigste: Seed-Phrase (12-24 Wörter) — einzige Möglichkeit den Zugang wiederherzustellen. Teile sie niemals!' },
        ],
      },
      {
        id: 'btc-vs-eth', emoji: '⚔️', title: 'Bitcoin vs Ethereum', level: 'Mittelstufe', duration: '8 Min',
        color: 'from-yellow-500 to-orange-500',
        content: [
          { type: 'text', text: 'Bitcoin und Ethereum sind die zwei größten Kryptowährungen, aber mit unterschiedlichen Zwecken.' },
          { type: 'list', title: 'Bitcoin (BTC):', items: ['"Digitales Gold" — Wertaufbewahrungsmittel', 'Begrenztes Angebot: nur 21 Millionen BTC', 'Einfach und zuverlässig'] },
          { type: 'list', title: 'Ethereum (ETH):', items: ['Plattform für Smart Contracts', 'Grundlage für DeFi, NFT, Web3', 'Technologischer'] },
          { type: 'highlight', text: '💡 BTC — digitales Gold zum Sparen. ETH — digitales Öl für Anwendungen.' },
        ],
      },
      {
        id: 'defi', emoji: '🌐', title: 'Was ist DeFi?', level: 'Mittelstufe', duration: '10 Min',
        color: 'from-teal-500 to-teal-600',
        content: [
          { type: 'text', text: 'DeFi (Dezentralisierte Finanzen) sind Finanzdienstleistungen ohne Banken, die auf der Blockchain laufen.' },
          { type: 'list', title: 'Was du in DeFi tun kannst:', items: ['Krypto verleihen und Zinsen verdienen', 'Kredite gegen Krypto aufnehmen', 'Auf dezentralisierten Börsen handeln', 'Durch Yield Farming verdienen'] },
          { type: 'highlight', text: '⚠️ DeFi-Risiken: Smart Contracts können Fehler haben, keine Versicherung wie bei Banken. Beginne mit kleinen Beträgen.' },
        ],
      },
      {
        id: 'staking', emoji: '💰', title: 'Staking — passives Einkommen', level: 'Mittelstufe', duration: '7 Min',
        color: 'from-pink-500 to-pink-600',
        content: [
          { type: 'text', text: 'Staking bedeutet mit Kryptowährung zu verdienen ohne aktiv zu handeln. Du "sperrst" deine Coins für eine Zeit und erhältst Zinsen.' },
          { type: 'highlight', text: '💡 Staking wie ein Bankdepot, aber mit höheren Zinsen (5-20% jährlich) und ohne Bank.' },
          { type: 'list', title: 'Wo staken:', items: ['An der Börse (Binance Earn) — am einfachsten', 'Im Wallet (MetaMask) — mehr Kontrolle', 'In DeFi-Protokollen — höchste Zinsen aber mehr Risiko'] },
        ],
      },
      {
        id: 'security', emoji: '🔒', title: 'Sicherheit in Krypto', level: 'Wichtig', duration: '10 Min',
        color: 'from-red-500 to-red-600',
        content: [
          { type: 'text', text: 'Sicherheit ist das Wichtigste bei Kryptowährungen. Es gibt keinen Support der gestohlene Gelder zurückbringt.' },
          { type: 'list', title: 'Sicherheitsregeln:', items: ['Teile niemals deine Seed-Phrase', 'Verwende 2FA (Google Authenticator)', 'Einzigartiges Passwort für jede Börse', 'Überprüfe URLs — Phishing ist verbreitet', 'Klicke keine verdächtigen Links', 'Große Beträge — auf Hardware Wallet'] },
          { type: 'highlight', text: '🚨 Häufigste Betrugsmaschen: gefälschte Börsen, Promi-"Geschenke", Ponzi-Schemata.' },
        ],
      },
    ],
  },
};

const LEVEL_COLORS: Record<string, string> = {
  'Початківець': 'bg-green-100 text-green-700',
  'Середній': 'bg-blue-100 text-blue-700',
  'Важливо': 'bg-red-100 text-red-700',
  'Beginner': 'bg-green-100 text-green-700',
  'Intermediate': 'bg-blue-100 text-blue-700',
  'Important': 'bg-red-100 text-red-700',
  'Początkujący': 'bg-green-100 text-green-700',
  'Średni': 'bg-blue-100 text-blue-700',
  'Ważne': 'bg-red-100 text-red-700',
  'Anfänger': 'bg-green-100 text-green-700',
  'Mittelstufe': 'bg-blue-100 text-blue-700',
  'Wichtig': 'bg-red-100 text-red-700',
};

type ContentBlock = { type: string; text?: string; title?: string; items?: string[] };

function LessonContent({ content }: { content: ContentBlock[] }) {
  return (
    <div className="space-y-4">
      {content.map((block, i) => {
        if (block.type === 'text') return (
          <p key={i} className="text-gray-700 leading-relaxed">{block.text}</p>
        );
        if (block.type === 'highlight') return (
          <div key={i} className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-xl">
            <p className="text-blue-800 leading-relaxed">{block.text}</p>
          </div>
        );
        if (block.type === 'list') return (
          <div key={i}>
            {block.title && <p className="font-semibold text-gray-900 mb-2">{block.title}</p>}
            <ul className="space-y-2">
              {block.items?.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
        return null;
      })}
    </div>
  );
}

export default function LearnPage({ locale = 'uk' }: { locale?: string }) {
  const lang = (locale in CONTENT) ? locale as keyof typeof CONTENT : 'uk';
  const c = CONTENT[lang];
  const homeHref = lang === 'uk' ? '/' : `/${lang}`;
  const faqHref = lang === 'uk' ? '/faq' : `/${lang}/faq`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link href={homeHref} className="text-blue-600 hover:underline text-sm mb-6 inline-block">{c.back}</Link>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{c.title}</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">{c.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {c.lessons.map(lesson => (
          <a key={lesson.id} href={`#${lesson.id}`}
            className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition hover:border-blue-300 group">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${lesson.color} flex items-center justify-center text-2xl mb-3`}>
              {lesson.emoji}
            </div>
            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition mb-2">{lesson.title}</h3>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LEVEL_COLORS[lesson.level] || 'bg-gray-100 text-gray-700'}`}>{lesson.level}</span>
              <span className="text-xs text-gray-400">⏱ {lesson.duration}</span>
            </div>
          </a>
        ))}
      </div>

      <div className="space-y-12">
        {c.lessons.map(lesson => (
          <div key={lesson.id} id={lesson.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden scroll-mt-6">
            <div className={`bg-gradient-to-r ${lesson.color} p-6`}>
              <div className="flex items-center gap-4">
                <span className="text-4xl">{lesson.emoji}</span>
                <div>
                  <h2 className="text-2xl font-bold text-white">{lesson.title}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-white/80 text-sm">{lesson.level}</span>
                    <span className="text-white/60 text-sm">•</span>
                    <span className="text-white/80 text-sm">⏱ {lesson.duration}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <LessonContent content={lesson.content as ContentBlock[]} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">{c.ctaTitle}</h2>
        <p className="text-blue-200 mb-6">{c.ctaDesc}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href={homeHref} className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition">
            {c.ctaBtn}
          </Link>
          <Link href={faqHref} className="bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-3 rounded-xl transition">
            {c.faqBtn}
          </Link>
        </div>
      </div>

      <ChatWidget locale={locale} />
    </div>
  );
}