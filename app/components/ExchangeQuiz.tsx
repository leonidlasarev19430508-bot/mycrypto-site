'use client';

import { useState } from 'react';

const questions = [
  {
    id: 'goal',
    text: 'Яка твоя головна мета в крипто?',
    options: [
      { icon: '📈', title: 'Активна торгівля', sub: 'Щодня торгую, слідкую за ринком', val: 'trader' },
      { icon: '🏦', title: 'Довгострокові інвестиції', sub: 'Купую і тримаю роками', val: 'hodler' },
      { icon: '🔰', title: 'Тільки починаю', sub: 'Хочу розібратись з нуля', val: 'newbie' },
      { icon: '🌐', title: 'Web3 і DeFi', sub: 'NFT, стейкінг, децентралізовані фінанси', val: 'defi' },
    ],
  },
  {
    id: 'experience',
    text: 'Який у тебе досвід з криптовалютами?',
    options: [
      { icon: '🟢', title: 'Починаю з нуля', sub: 'Ще жодної угоди не робив', val: 'zero' },
      { icon: '🟡', title: 'Є базовий досвід', sub: 'Купував/продавав кілька разів', val: 'basic' },
      { icon: '🟠', title: 'Досвідчений', sub: 'Регулярно торгую, знаю технічний аналіз', val: 'advanced' },
      { icon: '🔴', title: 'Профі', sub: 'Futures, маржинальна торгівля, боти', val: 'pro' },
    ],
  },
  {
    id: 'budget',
    text: 'Скільки плануєш інвестувати спочатку?',
    options: [
      { icon: '💵', title: 'До $500', sub: 'Починаю обережно, невеликі суми', val: 'small' },
      { icon: '💴', title: '$500 – $5,000', sub: 'Середній стартовий капітал', val: 'medium' },
      { icon: '💶', title: '$5,000 – $50,000', sub: 'Серйозні інвестиції', val: 'large' },
      { icon: '💷', title: 'Більше $50,000', sub: 'Великий капітал, потрібна безпека', val: 'whale' },
    ],
  },
  {
    id: 'priority',
    text: 'Що для тебе найважливіше в біржі?',
    options: [
      { icon: '🔒', title: 'Безпека і надійність', sub: 'Захист коштів понад усе', val: 'security' },
      { icon: '💸', title: 'Низькі комісії', sub: 'Хочу платити мінімум за угоди', val: 'fees' },
      { icon: '🎯', title: 'Зручність і простота', sub: 'Легкий інтерфейс, зрозуміло все', val: 'ux' },
      { icon: '🚀', title: 'Більше монет і можливостей', sub: 'Максимум пар і інструментів', val: 'variety' },
    ],
  },
  {
    id: 'region',
    text: 'З якої ти країни?',
    options: [
      { icon: '🇺🇦', title: 'Україна', sub: 'UA ринок, гривня', val: 'ua' },
      { icon: '🇵🇱', title: 'Польща', sub: 'PL ринок, злотий', val: 'pl' },
      { icon: '🇩🇪', title: 'Німеччина / ЄС', sub: 'Євро, регульований ринок', val: 'eu' },
      { icon: '🌍', title: 'Інша країна', sub: 'Решта світу', val: 'other' },
    ],
  },
];

const exchanges: Record<string, {
  name: string; desc: string; features: string[]; url: string;
}> = {
  whitebit: {
    name: 'WhiteBIT',
    desc: 'Найкращий вибір для українського ринку. Проста реєстрація, підтримка гривні, висока надійність і активна UA спільнота.',
    features: ['Підтримка UAH', 'Низькі комісії', 'Простий інтерфейс', 'UA підтримка', 'Стейкінг'],
    url: process.env.NEXT_PUBLIC_AFFILIATE_WHITEBIT || 'https://whitebit.com',
  },
  binance: {
    name: 'Binance',
    desc: 'Найбільша біржа світу з максимальною кількістю торгових пар, низькими комісіями і потужними інструментами.',
    features: ['350+ монет', 'Futures торгівля', 'Spot і Margin', 'Binance Earn', 'Мобільний додаток'],
    url: process.env.NEXT_PUBLIC_AFFILIATE_BINANCE || 'https://binance.com',
  },
  bybit: {
    name: 'Bybit',
    desc: 'Ідеальна платформа для активних трейдерів з просунутими деривативами і щедрими бонусами для нових користувачів.',
    features: ['Деривативи', 'Copy trading', 'Боти', 'Висока ліквідність', 'Web3 гаманець'],
    url: process.env.NEXT_PUBLIC_AFFILIATE_BYBIT || 'https://bybit.com',
  },
  okx: {
    name: 'OKX',
    desc: 'Сучасна платформа з потужними Web3 інструментами, вбудованим DEX і широкими можливостями для DeFi та NFT.',
    features: ['Web3 гаманець', 'DEX агрегатор', 'NFT маркетплейс', 'Стейкінг', '100+ країн'],
    url: process.env.NEXT_PUBLIC_AFFILIATE_OKX || 'https://okx.com',
  },
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

export default function ExchangeQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const q = questions[current];
  const progress = (current / questions.length) * 100;

  const handleSelect = (val: string) => setSelected(val);

  const handleNext = () => {
    if (!selected) return;
    const newAnswers = { ...answers, [q.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);
    if (current + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrent(current + 1);
    }
  };

  const restart = () => {
    setCurrent(0); setAnswers({}); setSelected(null); setDone(false);
  };

  if (done) {
    const ranked = recommend(answers);
    const topId = ranked[0][0];
    const ex = exchanges[topId];
    const topScore = ranked[0][1];
    const matchPct = Math.min(98, Math.round(60 + (topScore / 120) * 35));
    const alts = ranked.slice(1, 3).map(([id]) => exchanges[id]);

    return (
      <div className="max-w-xl mx-auto py-8 px-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-4">
          <span className="inline-block bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
            Твоя біржа
          </span>
          <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">{ex.name}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{ex.desc}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {ex.features.map(f => (
              <span key={f} className="bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs px-3 py-1 rounded-full">{f}</span>
            ))}
          </div>
          <p className="text-sm text-gray-400 mb-1">Відповідність твоєму профілю: {matchPct}%</p>
          <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mb-5">
            <div className="h-1.5 bg-green-500 rounded-full" style={{ width: `${matchPct}%` }} />
          </div>
          <a
            href={ex.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-xl transition-colors"
          >
            Зареєструватись на {ex.name} →
          </a>
        </div>

        <p className="text-sm text-gray-400 mb-3">Також підходять:</p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {alts.map(a => (
            <a
              key={a.name}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-orange-400 transition-colors"
            >
              <p className="font-medium text-sm text-gray-900 dark:text-white mb-1">{a.name}</p>
              <p className="text-xs text-gray-400">{a.desc.substring(0, 60)}...</p>
            </a>
          ))}
        </div>

        <button
          onClick={restart}
          className="w-full border border-gray-200 dark:border-gray-700 text-gray-400 rounded-xl py-3 text-sm hover:border-gray-300 transition-colors"
        >
          Пройти квіз знову
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
        Питання {current + 1} з {questions.length}
      </p>
      <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-6">{q.text}</h2>

      <div className="flex flex-col gap-3 mb-6">
        {q.options.map(o => (
          <button
            key={o.val}
            onClick={() => handleSelect(o.val)}
            className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
              selected === o.val
                ? 'border-orange-500 border-2 bg-orange-50 dark:bg-orange-950'
                : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 bg-white dark:bg-gray-900'
            }`}
          >
            <span className="text-2xl w-8 text-center">{o.icon}</span>
            <div>
              <p className="font-medium text-sm text-gray-900 dark:text-white">{o.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{o.sub}</p>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={!selected}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-colors"
      >
        {current + 1 === questions.length ? 'Отримати рекомендацію →' : 'Далі →'}
      </button>
    </div>
  );
}
