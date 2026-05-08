'use client';
import { useState } from 'react';

const QUESTIONS: Record<string, {
  id: string; text: string;
  options: { icon: string; title: string; sub: string; val: string }[];
}[]> = {
  uk: [
    { id: 'goal', text: 'Яка твоя головна мета в крипто?', options: [
      { icon: '📈', title: 'Активна торгівля', sub: 'Щодня торгую, слідкую за ринком', val: 'trader' },
      { icon: '🏦', title: 'Довгострокові інвестиції', sub: 'Купую і тримаю роками', val: 'hodler' },
      { icon: '🔰', title: 'Тільки починаю', sub: 'Хочу розібратись з нуля', val: 'newbie' },
      { icon: '🌐', title: 'Web3 і DeFi', sub: 'NFT, стейкінг, децентралізовані фінанси', val: 'defi' },
    ]},
    { id: 'experience', text: 'Який у тебе досвід з криптовалютами?', options: [
      { icon: '🟢', title: 'Починаю з нуля', sub: 'Ще жодної угоди не робив', val: 'zero' },
      { icon: '🟡', title: 'Є базовий досвід', sub: 'Купував/продавав кілька разів', val: 'basic' },
      { icon: '🟠', title: 'Досвідчений', sub: 'Регулярно торгую, знаю технічний аналіз', val: 'advanced' },
      { icon: '🔴', title: 'Профі', sub: 'Futures, маржинальна торгівля, боти', val: 'pro' },
    ]},
    { id: 'budget', text: 'Скільки плануєш інвестувати спочатку?', options: [
      { icon: '💵', title: 'До $500', sub: 'Починаю обережно', val: 'small' },
      { icon: '💴', title: '$500 – $5,000', sub: 'Середній стартовий капітал', val: 'medium' },
      { icon: '💶', title: '$5,000 – $50,000', sub: 'Серйозні інвестиції', val: 'large' },
      { icon: '💷', title: 'Більше $50,000', sub: 'Великий капітал', val: 'whale' },
    ]},
    { id: 'priority', text: 'Що для тебе найважливіше в біржі?', options: [
      { icon: '🔒', title: 'Безпека і надійність', sub: 'Захист коштів понад усе', val: 'security' },
      { icon: '💸', title: 'Низькі комісії', sub: 'Хочу платити мінімум', val: 'fees' },
      { icon: '🎯', title: 'Зручність і простота', sub: 'Легкий інтерфейс', val: 'ux' },
      { icon: '🚀', title: 'Більше монет', sub: 'Максимум пар і інструментів', val: 'variety' },
    ]},
    { id: 'region', text: 'З якої ти країни?', options: [
      { icon: '🇺🇦', title: 'Україна', sub: 'UA ринок, гривня', val: 'ua' },
      { icon: '🇵🇱', title: 'Польща', sub: 'PL ринок, злотий', val: 'pl' },
      { icon: '🇩🇪', title: 'Німеччина / ЄС', sub: 'Євро, регульований ринок', val: 'eu' },
      { icon: '🌍', title: 'Інша країна', sub: 'Решта світу', val: 'other' },
    ]},
  ],
  en: [
    { id: 'goal', text: 'What is your main goal in crypto?', options: [
      { icon: '📈', title: 'Active trading', sub: 'I trade daily, follow the market', val: 'trader' },
      { icon: '🏦', title: 'Long-term investment', sub: 'Buy and hold for years', val: 'hodler' },
      { icon: '🔰', title: 'Just starting out', sub: 'Want to learn from scratch', val: 'newbie' },
      { icon: '🌐', title: 'Web3 & DeFi', sub: 'NFT, staking, decentralized finance', val: 'defi' },
    ]},
    { id: 'experience', text: 'What is your crypto experience?', options: [
      { icon: '🟢', title: 'Complete beginner', sub: 'Never made a trade', val: 'zero' },
      { icon: '🟡', title: 'Basic experience', sub: 'Bought/sold a few times', val: 'basic' },
      { icon: '🟠', title: 'Experienced', sub: 'Trade regularly, know technical analysis', val: 'advanced' },
      { icon: '🔴', title: 'Professional', sub: 'Futures, margin trading, bots', val: 'pro' },
    ]},
    { id: 'budget', text: 'How much do you plan to invest initially?', options: [
      { icon: '💵', title: 'Up to $500', sub: 'Starting carefully', val: 'small' },
      { icon: '💴', title: '$500 – $5,000', sub: 'Medium starting capital', val: 'medium' },
      { icon: '💶', title: '$5,000 – $50,000', sub: 'Serious investment', val: 'large' },
      { icon: '💷', title: 'Over $50,000', sub: 'Large capital', val: 'whale' },
    ]},
    { id: 'priority', text: 'What matters most to you in an exchange?', options: [
      { icon: '🔒', title: 'Security & reliability', sub: 'Fund protection above all', val: 'security' },
      { icon: '💸', title: 'Low fees', sub: 'Pay minimum per trade', val: 'fees' },
      { icon: '🎯', title: 'Ease of use', sub: 'Simple interface', val: 'ux' },
      { icon: '🚀', title: 'More coins & features', sub: 'Maximum pairs and tools', val: 'variety' },
    ]},
    { id: 'region', text: 'Which country are you from?', options: [
      { icon: '🇺🇦', title: 'Ukraine', sub: 'UA market, hryvnia', val: 'ua' },
      { icon: '🇵🇱', title: 'Poland', sub: 'PL market, zloty', val: 'pl' },
      { icon: '🇩🇪', title: 'Germany / EU', sub: 'Euro, regulated market', val: 'eu' },
      { icon: '🌍', title: 'Other country', sub: 'Rest of the world', val: 'other' },
    ]},
  ],
  pl: [
    { id: 'goal', text: 'Jaki jest Twój główny cel w krypto?', options: [
      { icon: '📈', title: 'Aktywny trading', sub: 'Handluję codziennie', val: 'trader' },
      { icon: '🏦', title: 'Długoterminowe inwestycje', sub: 'Kupuję i trzymam latami', val: 'hodler' },
      { icon: '🔰', title: 'Dopiero zaczynam', sub: 'Chcę nauczyć się od podstaw', val: 'newbie' },
      { icon: '🌐', title: 'Web3 i DeFi', sub: 'NFT, staking, zdecentralizowane finanse', val: 'defi' },
    ]},
    { id: 'experience', text: 'Jakie masz doświadczenie z krypto?', options: [
      { icon: '🟢', title: 'Kompletny początkujący', sub: 'Nigdy nie handlowałem', val: 'zero' },
      { icon: '🟡', title: 'Podstawowe doświadczenie', sub: 'Kupowałem/sprzedawałem kilka razy', val: 'basic' },
      { icon: '🟠', title: 'Doświadczony', sub: 'Regularnie handluję', val: 'advanced' },
      { icon: '🔴', title: 'Profesjonalista', sub: 'Futures, handel z depozytem, boty', val: 'pro' },
    ]},
    { id: 'budget', text: 'Ile planujesz zainwestować na początku?', options: [
      { icon: '💵', title: 'Do $500', sub: 'Zaczynam ostrożnie', val: 'small' },
      { icon: '💴', title: '$500 – $5,000', sub: 'Średni kapitał startowy', val: 'medium' },
      { icon: '💶', title: '$5,000 – $50,000', sub: 'Poważna inwestycja', val: 'large' },
      { icon: '💷', title: 'Ponad $50,000', sub: 'Duży kapitał', val: 'whale' },
    ]},
    { id: 'priority', text: 'Co jest dla Ciebie najważniejsze w giełdzie?', options: [
      { icon: '🔒', title: 'Bezpieczeństwo', sub: 'Ochrona środków przede wszystkim', val: 'security' },
      { icon: '💸', title: 'Niskie prowizje', sub: 'Płacę minimum za transakcje', val: 'fees' },
      { icon: '🎯', title: 'Łatwość obsługi', sub: 'Prosty interfejs', val: 'ux' },
      { icon: '🚀', title: 'Więcej monet', sub: 'Maksimum par i narzędzi', val: 'variety' },
    ]},
    { id: 'region', text: 'Z jakiego jesteś kraju?', options: [
      { icon: '🇺🇦', title: 'Ukraina', sub: 'Rynek UA, hrywna', val: 'ua' },
      { icon: '🇵🇱', title: 'Polska', sub: 'Rynek PL, złoty', val: 'pl' },
      { icon: '🇩🇪', title: 'Niemcy / UE', sub: 'Euro, regulowany rynek', val: 'eu' },
      { icon: '🌍', title: 'Inny kraj', sub: 'Reszta świata', val: 'other' },
    ]},
  ],
  de: [
    { id: 'goal', text: 'Was ist dein Hauptziel in Krypto?', options: [
      { icon: '📈', title: 'Aktives Trading', sub: 'Ich handle täglich', val: 'trader' },
      { icon: '🏦', title: 'Langfristige Investition', sub: 'Kaufen und jahrelang halten', val: 'hodler' },
      { icon: '🔰', title: 'Ich fange an', sub: 'Von Grund auf lernen', val: 'newbie' },
      { icon: '🌐', title: 'Web3 & DeFi', sub: 'NFT, Staking, dezentrale Finanzen', val: 'defi' },
    ]},
    { id: 'experience', text: 'Wie viel Erfahrung hast du mit Krypto?', options: [
      { icon: '🟢', title: 'Kompletter Anfänger', sub: 'Noch nie gehandelt', val: 'zero' },
      { icon: '🟡', title: 'Grundkenntnisse', sub: 'Einige Male gekauft/verkauft', val: 'basic' },
      { icon: '🟠', title: 'Erfahren', sub: 'Handle regelmäßig', val: 'advanced' },
      { icon: '🔴', title: 'Profi', sub: 'Futures, Margin-Trading, Bots', val: 'pro' },
    ]},
    { id: 'budget', text: 'Wie viel planst du anfangs zu investieren?', options: [
      { icon: '💵', title: 'Bis $500', sub: 'Vorsichtig anfangen', val: 'small' },
      { icon: '💴', title: '$500 – $5.000', sub: 'Mittleres Startkapital', val: 'medium' },
      { icon: '💶', title: '$5.000 – $50.000', sub: 'Ernsthafte Investition', val: 'large' },
      { icon: '💷', title: 'Über $50.000', sub: 'Großes Kapital', val: 'whale' },
    ]},
    { id: 'priority', text: 'Was ist dir bei einer Börse am wichtigsten?', options: [
      { icon: '🔒', title: 'Sicherheit', sub: 'Schutz der Gelder über alles', val: 'security' },
      { icon: '💸', title: 'Niedrige Gebühren', sub: 'Minimum pro Trade zahlen', val: 'fees' },
      { icon: '🎯', title: 'Benutzerfreundlichkeit', sub: 'Einfache Oberfläche', val: 'ux' },
      { icon: '🚀', title: 'Mehr Coins', sub: 'Maximum an Paaren und Tools', val: 'variety' },
    ]},
    { id: 'region', text: 'Aus welchem Land kommst du?', options: [
      { icon: '🇺🇦', title: 'Ukraine', sub: 'UA-Markt, Hrywnja', val: 'ua' },
      { icon: '🇵🇱', title: 'Polen', sub: 'PL-Markt, Zloty', val: 'pl' },
      { icon: '🇩🇪', title: 'Deutschland / EU', sub: 'Euro, regulierter Markt', val: 'eu' },
      { icon: '🌍', title: 'Anderes Land', sub: 'Rest der Welt', val: 'other' },
    ]},
  ],
};

const EXCHANGES_DATA: Record<string, Record<string, {
  name: string; desc: string; features: string[]; url: string;
}>> = {
  uk: {
    whitebit: { name: 'WhiteBIT', desc: 'Найкращий вибір для українського ринку. Проста реєстрація, підтримка гривні.', features: ['Підтримка UAH', 'Низькі комісії', 'Простий інтерфейс', 'UA підтримка'], url: 'https://whitebit.com/referral/54626c3b-5240-4d39-9784-8e3eda5736de' },
    binance: { name: 'Binance', desc: 'Найбільша біржа світу з максимальною кількістю торгових пар.', features: ['350+ монет', 'Futures', 'Binance Earn', 'Мобільний додаток'], url: 'https://www.binance.com/register?ref=GRO_28502_BIO0R' },
    bybit: { name: 'Bybit', desc: 'Ідеальна платформа для активних трейдерів з просунутими деривативами.', features: ['Деривативи', 'Copy trading', 'Боти', 'Висока ліквідність'], url: 'https://www.bybit.com' },
    okx: { name: 'OKX', desc: 'Сучасна платформа з потужними Web3 інструментами і DeFi.', features: ['Web3 гаманець', 'DEX', 'NFT', 'Стейкінг'], url: 'https://www.okx.com' },
  },
  en: {
    whitebit: { name: 'WhiteBIT', desc: 'Great choice for Eastern European market. Simple registration, high reliability.', features: ['Low fees', 'Simple interface', 'Staking', 'Fast verification'], url: 'https://whitebit.com/referral/54626c3b-5240-4d39-9784-8e3eda5736de' },
    binance: { name: 'Binance', desc: "World's largest exchange with maximum trading pairs and low fees.", features: ['350+ coins', 'Futures', 'Binance Earn', 'Mobile app'], url: 'https://www.binance.com/register?ref=GRO_28502_BIO0R' },
    bybit: { name: 'Bybit', desc: 'Perfect platform for active traders with advanced derivatives and bonuses.', features: ['Derivatives', 'Copy trading', 'Bots', 'High liquidity'], url: 'https://www.bybit.com' },
    okx: { name: 'OKX', desc: 'Modern platform with powerful Web3 tools, built-in DEX and DeFi.', features: ['Web3 wallet', 'DEX', 'NFT marketplace', 'Staking'], url: 'https://www.okx.com' },
  },
  pl: {
    whitebit: { name: 'WhiteBIT', desc: 'Świetny wybór dla rynku wschodnioeuropejskiego. Prosta rejestracja, wysoka niezawodność.', features: ['Niskie prowizje', 'Prosty interfejs', 'Staking', 'Szybka weryfikacja'], url: 'https://whitebit.com/referral/54626c3b-5240-4d39-9784-8e3eda5736de' },
    binance: { name: 'Binance', desc: 'Największa giełda na świecie z maksymalną liczbą par handlowych.', features: ['350+ monet', 'Futures', 'Binance Earn', 'Aplikacja mobilna'], url: 'https://www.binance.com/register?ref=GRO_28502_BIO0R' },
    bybit: { name: 'Bybit', desc: 'Idealna platforma dla aktywnych traderów z zaawansowanymi derywatami.', features: ['Derywaty', 'Copy trading', 'Boty', 'Wysoka płynność'], url: 'https://www.bybit.com' },
    okx: { name: 'OKX', desc: 'Nowoczesna platforma z narzędziami Web3, wbudowanym DEX i DeFi.', features: ['Portfel Web3', 'DEX', 'NFT', 'Staking'], url: 'https://www.okx.com' },
  },
  de: {
    whitebit: { name: 'WhiteBIT', desc: 'Gute Wahl für den osteuropäischen Markt. Einfache Registrierung, hohe Zuverlässigkeit.', features: ['Niedrige Gebühren', 'Einfache Oberfläche', 'Staking', 'Schnelle Verifizierung'], url: 'https://whitebit.com/referral/54626c3b-5240-4d39-9784-8e3eda5736de' },
    binance: { name: 'Binance', desc: 'Weltgrößte Börse mit maximaler Anzahl an Handelspaaren und niedrigen Gebühren.', features: ['350+ Coins', 'Futures', 'Binance Earn', 'Mobile App'], url: 'https://www.binance.com/register?ref=GRO_28502_BIO0R' },
    bybit: { name: 'Bybit', desc: 'Perfekte Plattform für aktive Trader mit fortgeschrittenen Derivaten.', features: ['Derivate', 'Copy Trading', 'Bots', 'Hohe Liquidität'], url: 'https://www.bybit.com' },
    okx: { name: 'OKX', desc: 'Moderne Plattform mit Web3-Tools, integriertem DEX und DeFi.', features: ['Web3-Wallet', 'DEX', 'NFT', 'Staking'], url: 'https://www.okx.com' },
  },
};

const UI: Record<string, {
  yourExchange: string; matchLabel: string; registerBtn: string;
  alsoSuitable: string; retake: string; next: string; getResult: string; question: string; of: string;
}> = {
  uk: { yourExchange: 'Твоя біржа', matchLabel: 'Відповідність профілю', registerBtn: 'Зареєструватись на', alsoSuitable: 'Також підходять:', retake: 'Пройти квіз знову', next: 'Далі →', getResult: 'Отримати рекомендацію →', question: 'Питання', of: 'з' },
  en: { yourExchange: 'Your exchange', matchLabel: 'Profile match', registerBtn: 'Register on', alsoSuitable: 'Also suitable:', retake: 'Retake the quiz', next: 'Next →', getResult: 'Get recommendation →', question: 'Question', of: 'of' },
  pl: { yourExchange: 'Twoja giełda', matchLabel: 'Dopasowanie profilu', registerBtn: 'Zarejestruj się na', alsoSuitable: 'Również odpowiednie:', retake: 'Przejdź quiz ponownie', next: 'Dalej →', getResult: 'Uzyskaj rekomendację →', question: 'Pytanie', of: 'z' },
  de: { yourExchange: 'Deine Börse', matchLabel: 'Profilübereinstimmung', registerBtn: 'Registrieren bei', alsoSuitable: 'Auch geeignet:', retake: 'Quiz wiederholen', next: 'Weiter →', getResult: 'Empfehlung erhalten →', question: 'Frage', of: 'von' },
};

function recommend(answers: Record<string, string>) {
  const scores: Record<string, number> = { whitebit: 0, binance: 0, bybit: 0, okx: 0 };
  if (answers.region === 'ua') { scores.whitebit += 40; }
  if (answers.region === 'pl') { scores.whitebit += 20; scores.binance += 15; }
  if (answers.region === 'eu') { scores.binance += 20; scores.okx += 15; }
  if (answers.goal === 'newbie' || answers.experience === 'zero') { scores.whitebit += 25; scores.binance += 10; }
  if (answers.goal === 'trader' || answers.experience === 'pro') { scores.binance += 25; scores.bybit += 30; }
  if (answers.goal === 'defi') { scores.okx += 35; scores.binance += 15; }
  if (answers.goal === 'hodler') { scores.binance += 20; scores.whitebit += 15; }
  if (answers.priority === 'security') { scores.whitebit += 20; scores.binance += 15; }
  if (answers.priority === 'fees') { scores.binance += 20; scores.whitebit += 15; }
  if (answers.priority === 'ux') { scores.whitebit += 25; scores.bybit += 10; }
  if (answers.priority === 'variety') { scores.binance += 25; scores.okx += 20; }
  if (answers.budget === 'small') { scores.whitebit += 15; scores.binance += 10; }
  if (answers.budget === 'whale') { scores.binance += 20; scores.bybit += 15; }
  if (answers.experience === 'advanced' || answers.experience === 'pro') { scores.bybit += 20; }
  return Object.entries(scores).sort((a, b) => b[1] - a[1]);
}

export default function ExchangeQuiz({ locale = 'uk' }: { locale?: string }) {
  const lang = (locale in QUESTIONS) ? locale : 'uk';
  const questions = QUESTIONS[lang];
  const exchanges = EXCHANGES_DATA[lang];
  const ui = UI[lang];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const q = questions[current];
  const progress = (current / questions.length) * 100;

  const handleNext = () => {
    if (!selected) return;
    const newAnswers = { ...answers, [q.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);
    if (current + 1 >= questions.length) setDone(true);
    else setCurrent(current + 1);
  };

  const restart = () => { setCurrent(0); setAnswers({}); setSelected(null); setDone(false); };

  if (done) {
    const ranked = recommend(answers);
    const topId = ranked[0][0];
    const ex = exchanges[topId];
    const matchPct = Math.min(98, Math.round(60 + (ranked[0][1] / 120) * 35));
    const alts = ranked.slice(1, 3).map(([id]) => exchanges[id]);

    return (
      <div className="max-w-xl mx-auto py-8 px-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-4">
          <span className="inline-block bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full mb-3">{ui.yourExchange}</span>
          <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">{ex.name}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{ex.desc}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {ex.features.map(f => <span key={f} className="bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs px-3 py-1 rounded-full">{f}</span>)}
          </div>
          <p className="text-sm text-gray-400 mb-1">{ui.matchLabel}: {matchPct}%</p>
          <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mb-5">
            <div className="h-1.5 bg-green-500 rounded-full" style={{ width: `${matchPct}%` }} />
          </div>
          <a href={ex.url} target="_blank" rel="noopener noreferrer"
            className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-xl transition-colors">
            {ui.registerBtn} {ex.name} →
          </a>
        </div>
        <p className="text-sm text-gray-400 mb-3">{ui.alsoSuitable}</p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {alts.map(a => (
            <a key={a.name} href={a.url} target="_blank" rel="noopener noreferrer"
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-orange-400 transition-colors">
              <p className="font-medium text-sm text-gray-900 dark:text-white mb-1">{a.name}</p>
              <p className="text-xs text-gray-400">{a.desc.substring(0, 60)}...</p>
            </a>
          ))}
        </div>
        <button onClick={restart}
          className="w-full border border-gray-200 dark:border-gray-700 text-gray-400 rounded-xl py-3 text-sm hover:border-gray-300 transition-colors">
          {ui.retake}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <div className="h-1 bg-gray-100 dark:bg-gray-800 rounded-full mb-8">
        <div className="h-1 bg-orange-500 rounded-full transition-all duration-400" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
        {ui.question} {current + 1} {ui.of} {questions.length}
      </p>
      <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-6">{q.text}</h2>
      <div className="flex flex-col gap-3 mb-6">
        {q.options.map(o => (
          <button key={o.val} onClick={() => setSelected(o.val)}
            className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
              selected === o.val
                ? 'border-orange-500 border-2 bg-orange-50 dark:bg-orange-950'
                : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 bg-white dark:bg-gray-900'
            }`}>
            <span className="text-2xl w-8 text-center">{o.icon}</span>
            <div>
              <p className="font-medium text-sm text-gray-900 dark:text-white">{o.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{o.sub}</p>
            </div>
          </button>
        ))}
      </div>
      <button onClick={handleNext} disabled={!selected}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-colors">
        {current + 1 === questions.length ? ui.getResult : ui.next}
      </button>
    </div>
  );
}