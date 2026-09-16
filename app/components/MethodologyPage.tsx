import Link from 'next/link';

interface Criterion {
  title: string;
  weight: string;
  desc: string;
}

interface Content {
  title: string;
  subtitle: string;
  intro: string;
  criteriaTitle: string;
  criteria: Criterion[];
  howCalculated: string;
  independence: string;
  limitation: string;
  back: string;
}

const CONTENT: Record<string, Content> = {
  uk: {
    title: 'Методологія оцінювання бірж',
    subtitle: 'Як ми формуємо рейтинги та оцінки',
    intro: 'CryptoNavigator порівнює криптовалютні біржі за п’ятьма критеріями. Кожна біржа отримує оцінку від 1 до 5 зірок, що відображається в картках і таблицях порівняння.',
    criteriaTitle: 'Критерії та вага',
    criteria: [
      { title: 'Комісії та витрати', weight: '25%', desc: 'Спотові та ф’ючерсні комісії, комісії за виведення та доступні знижки.' },
      { title: 'Безпека та репутація', weight: '25%', desc: 'Історія безпеки, резервні фонди та регуляторний статус.' },
      { title: 'Ліквідність та обсяги', weight: '20%', desc: 'Добовий обсяг торгів і глибина книги заявок.' },
      { title: 'Вибір монет і продукти', weight: '15%', desc: 'Кількість активів, стейкінг, Web3 та інші продукти.' },
      { title: 'Зручність і підтримка', weight: '15%', desc: 'Інтерфейс, мобільний додаток і якість служби підтримки.' },
    ],
    howCalculated: 'Оцінка визначається редакційно на основі публічно доступних даних про біржі та зважується за вказаними вище критеріями.',
    independence: 'Наші рейтинги не залежать від партнерських відносин. Партнерські комісії не впливають на позиції бірж у рейтингу.',
    limitation: 'Оцінки є редакційною думкою, зокрема сформованою за допомогою штучного інтелекту, і не є фінансовою порадою чи гарантією якості. Перед використанням будь-якої платформи проведіть власне дослідження.',
    back: '← На головну',
  },
  en: {
    title: 'Exchange Rating Methodology',
    subtitle: 'How we build our ratings and rankings',
    intro: 'CryptoNavigator compares crypto exchanges across five criteria. Each exchange receives a 1–5 star rating shown on our cards and comparison tables.',
    criteriaTitle: 'Criteria & weights',
    criteria: [
      { title: 'Fees & costs', weight: '25%', desc: 'Spot and futures fees, withdrawal fees and available discounts.' },
      { title: 'Security & track record', weight: '25%', desc: 'Security history, reserve funds and regulatory status.' },
      { title: 'Liquidity & volume', weight: '20%', desc: 'Daily trading volume and order-book depth.' },
      { title: 'Coin selection & products', weight: '15%', desc: 'Number of assets, staking, Web3 and other products.' },
      { title: 'Ease of use & support', weight: '15%', desc: 'Interface, mobile app and support quality.' },
    ],
    howCalculated: 'Ratings are determined editorially from publicly available exchange data and weighted by the criteria above.',
    independence: 'Our ratings are independent of affiliate relationships. Affiliate commissions do not affect where an exchange ranks.',
    limitation: 'Ratings are editorial opinion, in part AI-assisted, and are not financial advice or a guarantee of quality. Do your own research before using any platform.',
    back: '← Back to Home',
  },
  pl: {
    title: 'Metodyka oceny giełd',
    subtitle: 'Jak budujemy nasze oceny i rankingi',
    intro: 'CryptoNavigator porównuje giełdy kryptowalut według pięciu kryteriów. Każda giełda otrzymuje ocenę od 1 do 5 gwiazdek widoczną na naszych kartach i w tabelach porównawczych.',
    criteriaTitle: 'Kryteria i wagi',
    criteria: [
      { title: 'Opłaty i koszty', weight: '25%', desc: 'Opłaty spot i futures, opłaty za wypłatę oraz dostępne zniżki.' },
      { title: 'Bezpieczeństwo i reputacja', weight: '25%', desc: 'Historia bezpieczeństwa, fundusze rezerwowe i status regulacyjny.' },
      { title: 'Płynność i wolumen', weight: '20%', desc: 'Dzienny wolumen obrotu i głębokość księgi zleceń.' },
      { title: 'Wybór monet i produkty', weight: '15%', desc: 'Liczba aktywów, staking, Web3 i inne produkty.' },
      { title: 'Łatwość obsługi i wsparcie', weight: '15%', desc: 'Interfejs, aplikacja mobilna i jakość wsparcia.' },
    ],
    howCalculated: 'Oceny są ustalane redakcyjnie na podstawie publicznie dostępnych danych o giełdach i ważone według powyższych kryteriów.',
    independence: 'Nasze oceny są niezależne od relacji afiliacyjnych. Prowizje afiliacyjne nie wpływają na pozycję giełdy w rankingu.',
    limitation: 'Oceny są opinią redakcyjną, częściowo wspomaganą przez sztuczną inteligencję, i nie stanowią porady finansowej ani gwarancji jakości. Przeprowadź własne badania przed skorzystaniem z jakiejkolwiek platformy.',
    back: '← Powrót do strony głównej',
  },
  de: {
    title: 'Methodik der Börsenbewertung',
    subtitle: 'Wie wir unsere Bewertungen und Rankings erstellen',
    intro: 'CryptoNavigator vergleicht Kryptobörsen anhand von fünf Kriterien. Jede Börse erhält eine Bewertung von 1–5 Sternen, die auf unseren Karten und Vergleichstabellen angezeigt wird.',
    criteriaTitle: 'Kriterien & Gewichtung',
    criteria: [
      { title: 'Gebühren & Kosten', weight: '25%', desc: 'Spot- und Futures-Gebühren, Auszahlungsgebühren und verfügbare Rabatte.' },
      { title: 'Sicherheit & Historie', weight: '25%', desc: 'Sicherheitsbilanz, Reservefonds und regulatorischer Status.' },
      { title: 'Liquidität & Volumen', weight: '20%', desc: 'Tägliches Handelsvolumen und Orderbuch-Tiefe.' },
      { title: 'Münzauswahl & Produkte', weight: '15%', desc: 'Anzahl der Assets, Staking, Web3 und weitere Produkte.' },
      { title: 'Bedienbarkeit & Support', weight: '15%', desc: 'Oberfläche, mobile App und Support-Qualität.' },
    ],
    howCalculated: 'Bewertungen werden redaktionell auf Basis öffentlich zugänglicher Börsendaten ermittelt und nach den obigen Kriterien gewichtet.',
    independence: 'Unsere Bewertungen sind unabhängig von Affiliate-Beziehungen. Affiliate-Provisionen beeinflussen nicht die Platzierung einer Börse.',
    limitation: 'Bewertungen sind eine redaktionelle Meinung, teilweise KI-unterstützt, und stellen keine Finanzberatung oder Qualitätsgarantie dar. Recherchiere selbst, bevor du eine Plattform nutzt.',
    back: '← Zurück zur Startseite',
  },
};

export default function MethodologyPage({ locale = 'uk' }: { locale?: string }) {
  const c = CONTENT[locale] || CONTENT.uk;
  const homeHref = locale === 'uk' ? '/' : `/${locale}`;

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <Link href={homeHref} className="text-blue-600 hover:underline text-sm mb-6 inline-block">
        {c.back}
      </Link>
      <h1 className="text-4xl font-bold text-gray-900 mb-3">{c.title}</h1>
      <p className="text-gray-500 mb-8">{c.subtitle}</p>

      <p className="text-gray-700 leading-relaxed mb-8">{c.intro}</p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">{c.criteriaTitle}</h2>
      <div className="space-y-3 mb-8">
        {c.criteria.map((crit) => (
          <div key={crit.title} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-4">
            <span className="shrink-0 bg-orange-100 text-orange-700 font-bold text-sm px-3 py-1 rounded-full">
              {crit.weight}
            </span>
            <div>
              <p className="font-semibold text-gray-900">{crit.title}</p>
              <p className="text-gray-600 text-sm mt-1">{crit.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 mb-8">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
          <p className="text-gray-800 leading-relaxed">{c.howCalculated}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <p className="text-gray-800 leading-relaxed">{c.independence}</p>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
        <p className="text-gray-600 text-sm leading-relaxed">{c.limitation}</p>
      </div>
    </main>
  );
}