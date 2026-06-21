import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const EXCHANGES: Record<string, {
  name: string; logo: string; color: string; accentColor: string;
  founded: string; founder: string; headquarters: string; employees: string;
  coins: string; volume: string; users: string; fee: string; affiliate: string;
  description: string; history: { year: string; event: string }[];
  pros: string[]; cons: string[];
  features: { icon: string; title: string; description: string }[];
  bonus: string; bonusDetails: string;
}> = {
  binance: {
    name: 'Binance', logo: '🟡', color: '#F0B90B', accentColor: '#F0B90B',
    founded: '2017', founder: 'Changpeng Zhao (CZ)', headquarters: 'Kajmany',
    employees: '8,000+', coins: '350+', volume: '$15B+/dzien', users: '170M+', fee: '0.1%',
    affiliate: 'https://www.binance.com/register?ref=Q5HR1JVW',
    description: 'Binance to największa giełda kryptowalut na świecie pod względem wolumenu obrotu. Założona w 2017 roku przez Changpeng Zhao, w rekordowym czasie stała się dominującą platformą w branży krypto.',
    history: [
      { year: '2017', event: 'Założenie Binance. W ciągu 6 miesięcy stała się największą giełdą pod względem wolumenu.' },
      { year: '2018', event: 'Uruchomienie Binance Chain i tokenu BNB. Otwarcie biur na całym świecie.' },
      { year: '2019', event: 'Uruchomienie Binance US i Binance DEX — zdecentralizowanej giełdy.' },
      { year: '2020', event: 'Uruchomienie Binance Smart Chain (BSC). Ponad 500 projektów na platformie.' },
      { year: '2021', event: 'Rekordowy wolumen obrotu — $76B w jeden dzień. 90M+ użytkowników.' },
      { year: '2023', event: 'CZ odszedł ze stanowiska, nowym CEO został Richard Teng.' },
      { year: '2024', event: '170M+ użytkowników. Największa giełda świata we wszystkich wskaźnikach.' },
    ],
    pros: ['Najniższe prowizje na rynku', 'Najwyższa płynność', '350+ par handlowych', 'Obsługa po polsku', 'Staking do 20%', 'Własny blockchain BNB Chain'],
    cons: ['Skomplikowany interfejs dla początkujących', 'Problemy regulacyjne w niektórych krajach'],
    features: [
      { icon: '💹', title: 'Handel spotowy', description: 'Handel 350+ kryptowalutami z prowizją 0.1%' },
      { icon: '📈', title: 'Futures', description: 'Handel z dźwignią do 125x na BTC i ETH' },
      { icon: '🏦', title: 'Staking', description: 'Zarabiaj do 20% rocznie na swoich aktywach' },
      { icon: '🎨', title: 'NFT Marketplace', description: 'Kupuj i sprzedawaj NFT bez prowizji' },
      { icon: '💳', title: 'Karta Binance', description: 'Karta krypto do codziennych zakupów' },
      { icon: '🔐', title: 'Zimne przechowywanie', description: '90% środków w zabezpieczonym cold wallet' },
    ],
    bonus: 'Do $600 USDT',
    bonusDetails: 'Bonus za rejestrację + weryfikację KYC + pierwszy depozyt od $50',
  },
  mexc: {
    name: 'MEXC', logo: '🔷', color: '#2196F3', accentColor: '#00BCD4',
    founded: '2018', founder: 'Zespół doświadczonych traderów', headquarters: 'Seszele',
    employees: '1,000+', coins: '1500+', volume: '$2B+/dzien', users: '10M+', fee: '0%',
    affiliate: 'https://promote.mexc.com/r/q2p1TSAUnh',
    description: 'MEXC to popularna giełda kryptowalut z obsługą UAH i ukraińskim interfejsem. Znana z największego wyboru altcoinów i zerowej prowizji na handel spotowy.',
    history: [
      { year: '2018', event: 'Założenie MEXC Global. Fokus na listowaniu nowych tokenów.' },
      { year: '2019', event: 'Uruchomienie handlu derywatami i handlu na marży.' },
      { year: '2020', event: 'Ponad 200 par handlowych. Ekspansja na rynki azjatyckie.' },
      { year: '2021', event: 'Uruchomienie obsługi UAH. Ponad 1000 par handlowych.' },
      { year: '2022', event: 'Zerowa prowizja na handel spotowy dla wszystkich użytkowników.' },
      { year: '2024', event: '10M+ użytkowników. 1500+ monet. Lider pod względem liczby listowań.' },
    ],
    pros: ['Zerowa prowizja spot', 'Obsługa UAH', '1500+ monet', 'Ukraiński interfejs', 'Szybkie listowanie nowych tokenów'],
    cons: ['Niższa płynność niż Binance', 'Mniej znana w Europie'],
    features: [
      { icon: '🇺🇦', title: 'Obsługa ukraińska', description: 'Pełny ukraiński interfejs i obsługa UAH' },
      { icon: '0️⃣', title: 'Zerowa prowizja', description: '0% prowizja na wszystkie transakcje spot' },
      { icon: '🪙', title: '1500+ monet', description: 'Największy wybór altcoinów wśród wszystkich giełd' },
      { icon: '⚡', title: 'Szybkie listowanie', description: 'Nowe tokeny pojawiają się pierwsze na MEXC' },
      { icon: '📱', title: 'Aplikacja mobilna', description: 'Wygodna aplikacja na iOS i Android' },
      { icon: '🎯', title: 'Launchpad', description: 'Wczesny dostęp do nowych projektów' },
    ],
    bonus: 'Do $1,000 USDT',
    bonusDetails: 'Bonus za rejestrację i pierwszy depozyt',
  },
  bybit: {
    name: 'Bybit', logo: '🔵', color: '#2F80ED', accentColor: '#56CCF2',
    founded: '2018', founder: 'Ben Zhou', headquarters: 'Dubaj, ZEA',
    employees: '2,500+', coins: '300+', volume: '$8B+/dzien', users: '30M+', fee: '0.1%',
    affiliate: 'https://www.bybit.com/register?ref=CRYPTONAV',
    description: 'Bybit to wiodąca giełda kryptowalut dla aktywnych traderów. Założona w 2018 roku, specjalizuje się w derywatach i handlu z dźwignią do 100x.',
    history: [
      { year: '2018', event: 'Założenie Bybit. Fokus na derywatach i handlu z dźwignią.' },
      { year: '2019', event: 'Uruchomienie kontraktów USDT-marginalnych. Szybki wzrost.' },
      { year: '2020', event: 'Ponad 1M zarejestrowanych użytkowników. Uruchomienie opcji.' },
      { year: '2021', event: 'Uruchomienie handlu spotowego. 10M+ użytkowników.' },
      { year: '2022', event: 'Przeprowadzka do Dubaju. Uzyskanie licencji VARA.' },
      { year: '2023', event: 'Uruchomienie Copy Tradingu i portfela Web3.' },
      { year: '2024', event: '30M+ użytkowników. Top-3 giełda pod względem wolumenu derywatów.' },
    ],
    pros: ['Dźwignia do 100x', 'Copy trading', 'Wysoka płynność', 'Wsparcie 24/7', 'Duże bonusy dla nowych użytkowników', 'Regulowana giełda (VARA)'],
    cons: ['Trudna dla początkujących', 'Fokus na derywatach'],
    features: [
      { icon: '📊', title: 'Derywaty', description: 'Futures i opcje z dźwignią do 100x' },
      { icon: '🤝', title: 'Copy Trading', description: 'Automatycznie kopiuj transakcje najlepszych traderów' },
      { icon: '🏆', title: 'Turnieje handlowe', description: 'Regularne zawody z pulą nagród $1M+' },
      { icon: '💎', title: 'Launchpad', description: 'Ekskluzywny dostęp do nowych projektów' },
      { icon: '🌐', title: 'Portfel Web3', description: 'Wbudowany niestrzeżony portfel Web3' },
      { icon: '📱', title: 'Aplikacja mobilna', description: 'W pełni funkcjonalna aplikacja do handlu' },
    ],
    bonus: 'Do $30,000 USDT',
    bonusDetails: 'Pakiet powitalnych bonusów dla nowych traderów',
  },
  kucoin: {
    name: 'KuCoin', logo: '🟢', color: '#23AF91', accentColor: '#00C896',
    founded: '2017', founder: 'Michael Gan i Johnny Lyu', headquarters: 'Seszele',
    employees: '1,500+', coins: '700+', volume: '$1B+/dzien', users: '27M+', fee: '0.1%',
    affiliate: 'https://www.kucoin.com/r/rf/CXEPY4S5',
    description: 'KuCoin to Giełda Ludzi z najszerszym wyborem monet wśród topowych platform. Założona w 2017 roku, znana z wczesnego listowania obiecujących projektów.',
    history: [
      { year: '2017', event: 'Założenie KuCoin. Pozycjonowanie jako Giełda Ludzi.' },
      { year: '2018', event: 'Uruchomienie tokenu KCS i programu podziału zysku.' },
      { year: '2019', event: 'Ponad 200 par handlowych. Uruchomienie handlu na marży.' },
      { year: '2020', event: 'Incydent hakowania na $280M — wszystkie środki zwrócone.' },
      { year: '2021', event: 'Pozyskanie $150M inwestycji. Wycena $10B.' },
      { year: '2022', event: 'Uruchomienie KuCoin Win i rynku NFT.' },
      { year: '2024', event: '27M+ użytkowników. 700+ monet. Lider pod względem różnorodności aktywów.' },
    ],
    pros: ['700+ monet', 'Wczesne listowanie nowych tokenów', 'Staking i lending', 'Integracja Web3', 'Korzyści z tokenu KCS'],
    cons: ['Niższa płynność na niektórych parach', 'Incydent hakowania w przeszłości'],
    features: [
      { icon: '🪙', title: '700+ monet', description: 'Największy wybór wśród topowych giełd' },
      { icon: '🌱', title: 'Spotlight', description: 'Wczesny dostęp do nowych obiecujących projektów' },
      { icon: '💰', title: 'Earning', description: 'Staking, lending i yield farming' },
      { icon: '🤖', title: 'Trading Bot', description: 'Wbudowane boty handlowe do automatyzacji' },
      { icon: '🎯', title: 'KCS Holder', description: 'Posiadacze KCS otrzymują część zysku giełdy' },
      { icon: '🌐', title: 'Portfel Web3', description: 'Multi-chain portfel Web3 dla DeFi' },
    ],
    bonus: 'Do $500 USDT',
    bonusDetails: 'Bonus za rejestrację i pierwszy depozyt od $50',
  },
  okx: {
    name: 'OKX', logo: '⚫', color: '#000000', accentColor: '#3772FF',
    founded: '2017', founder: 'Star Xu', headquarters: 'Seszele',
    employees: '3,000+', coins: '300+', volume: '$5B+/dzien', users: '50M+', fee: '0.08%',
    affiliate: 'https://www.okx.com/join/CRYPTONAV',
    description: 'OKX to jedna z największych giełd kryptowalut na świecie. Wyróżnia się najniższymi prowizjami na rynku, własnym portfelem Web3 i rozwiniętym ekosystemem DeFi.',
    history: [
      { year: '2017', event: 'Założenie OKEx (później przemianowane na OKX).' },
      { year: '2018', event: 'Uruchomienie handlu derywatami. Wejście do top-3 giełd.' },
      { year: '2020', event: 'Tymczasowe zawieszenie wypłat — przywrócone po miesiącu.' },
      { year: '2021', event: 'Rebranding z OKEx na OKX. Fokus na Web3.' },
      { year: '2022', event: 'Uruchomienie portfela OKX Web3 i rynku NFT.' },
      { year: '2023', event: 'Partnerstwo z Manchester City. 50M+ użytkowników.' },
      { year: '2024', event: 'Najniższe prowizje 0.08%. Lider ekosystemu Web3.' },
    ],
    pros: ['Najniższe prowizje 0.08%', 'Najlepszy portfel Web3', 'Staking do 20%', 'Rynek NFT', 'Integracja DeFi', 'Wysoka płynność'],
    cons: ['Skomplikowany interfejs', 'Mniej znana w Polsce'],
    features: [
      { icon: '💸', title: 'Prowizje 0.08%', description: 'Najniższe prowizje wśród topowych giełd' },
      { icon: '🌐', title: 'Portfel Web3', description: 'Najlepszy multi-chain portfel Web3 na rynku' },
      { icon: '🎨', title: 'Rynek NFT', description: 'Agregator NFT ze wszystkich rynków' },
      { icon: '📈', title: 'Derywaty', description: 'Handel derywatami z dźwignią do 100x' },
      { icon: '🏦', title: 'Earn', description: 'Staking i DeFi do 20% rocznie' },
      { icon: '⛓️', title: 'OKX Chain', description: 'Własny blockchain dla aplikacji DeFi' },
    ],
    bonus: 'Mystery Box do $10,000',
    bonusDetails: 'Mystery Box z szansą wygrania do $10,000 USDT',
  },
};

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ex = EXCHANGES[slug];
  if (!ex) return { title: 'Giełda nie znaleziona' };
  return {
    title: `${ex.name} — Recenzja Giełdy 2026 | CryptoNavigator`,
    description: ex.description.slice(0, 160),
    alternates: { canonical: `https://cryptotop.chat/pl/exchange/${slug}` },
  };
}

export function generateStaticParams() {
  return Object.keys(EXCHANGES).map(slug => ({ slug }));
}

export default async function ExchangePLPage({ params }: PageProps) {
  const { slug } = await params;
  const ex = EXCHANGES[slug];
  if (!ex) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="rounded-3xl p-8 mb-10 text-white relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${ex.color}dd, ${ex.accentColor}99)` }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{ex.logo}</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-black">{ex.name}</h1>
              <p className="opacity-80 mt-1">Założona {ex.founded} &bull; {ex.headquarters}</p>
            </div>
          </div>
          <p className="text-lg opacity-90 max-w-2xl leading-relaxed">{ex.description}</p>
          <a href={ex.affiliate} target="_blank" rel="sponsored noopener noreferrer"
            className="inline-block mt-6 bg-white text-gray-900 font-black px-8 py-3 rounded-2xl hover:scale-105 transition-transform text-sm">
            Zarejestruj się na {ex.name} →
          </a>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Rok założenia', value: ex.founded, icon: '📅' },
          { label: 'Użytkownicy', value: ex.users, icon: '👥' },
          { label: 'Monety', value: ex.coins, icon: '🪙' },
          { label: 'Dzienny wolumen', value: ex.volume, icon: '📊' },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-black text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 mb-10 text-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide opacity-80 mb-1">Bonus rejestracyjny</p>
          <p className="text-3xl font-black">{ex.bonus}</p>
          <p className="text-orange-100 text-sm mt-1">{ex.bonusDetails}</p>
        </div>
        <a href={ex.affiliate} target="_blank" rel="sponsored noopener noreferrer"
          className="shrink-0 bg-white text-orange-600 font-black px-6 py-3 rounded-xl hover:bg-orange-50 transition text-sm whitespace-nowrap">
          Odbierz bonus →
        </a>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-black text-gray-900 mb-6">Kluczowe funkcje</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ex.features.map(f => (
            <div key={f.title} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{f.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900">{f.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{f.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <h3 className="font-black text-gray-900 mb-4">Zalety</h3>
          <ul className="space-y-2">
            {ex.pros.map(p => (
              <li key={p} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-500 font-bold">+</span> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <h3 className="font-black text-gray-900 mb-4">Wady</h3>
          <ul className="space-y-2">
            {ex.cons.map(c => (
              <li key={c} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-red-400 font-bold">-</span> {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-black text-gray-900 mb-6">Historia {ex.name}</h2>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-orange-200" />
          <div className="space-y-6">
            {ex.history.map((item, i) => (
              <div key={i} className="flex gap-6 relative">
                <div className="shrink-0 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-xs z-10">
                  {item.year}
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-4 flex-1 shadow-sm">
                  <p className="text-sm text-gray-700">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-10 shadow-sm">
        <h2 className="text-xl font-black text-gray-900 mb-4">Informacje ogólne</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { label: 'Założyciel', value: ex.founder },
            { label: 'Rok założenia', value: ex.founded },
            { label: 'Siedziba', value: ex.headquarters },
            { label: 'Liczba pracowników', value: ex.employees },
            { label: 'Opłata spot', value: ex.fee },
            { label: 'Liczba monet', value: ex.coins },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-400">{label}</span>
              <span className="text-sm font-bold text-gray-900">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center bg-gray-900 rounded-3xl p-10 text-white">
        <p className="text-3xl font-black mb-2">Gotowy zacząć?</p>
        <p className="text-gray-400 mb-6">Zarejestruj się na {ex.name} i otrzymaj bonus {ex.bonus}</p>
        <a href={ex.affiliate} target="_blank" rel="sponsored noopener noreferrer"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-black px-10 py-4 rounded-2xl transition text-lg">
          Zarejestruj się na {ex.name} →
        </a>
        <p className="text-xs text-gray-500 mt-4">Rejestracja jest bezpłatna. Nie jest poradą finansową.</p>
      </div>
    </div>
  );
}
