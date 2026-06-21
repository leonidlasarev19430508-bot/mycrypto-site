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
    founded: '2017', founder: 'Changpeng Zhao (CZ)', headquarters: 'Kaimaninseln',
    employees: '8,000+', coins: '350+', volume: '$15B+/Tag', users: '170M+', fee: '0.1%',
    affiliate: 'https://www.binance.com/register?ref=Q5HR1JVW',
    description: 'Binance ist die weltweit größte Kryptobörse nach Handelsvolumen. Gegründet 2017 von Changpeng Zhao, wurde sie in Rekordzeit zur dominierenden Plattform der Kryptobranche.',
    history: [
      { year: '2017', event: 'Gründung von Binance. Innerhalb von 6 Monaten wurde sie zur größten Börse nach Volumen.' },
      { year: '2018', event: 'Start der Binance Chain und des BNB-Tokens. Eröffnung von Büros weltweit.' },
      { year: '2019', event: 'Start von Binance US und Binance DEX — dezentralisierte Börse.' },
      { year: '2020', event: 'Start der Binance Smart Chain (BSC). Über 500 Projekte auf der Plattform.' },
      { year: '2021', event: 'Rekordhandelsvolumen — $76B an einem Tag. 90M+ Nutzer.' },
      { year: '2023', event: 'CZ trat zurück, Richard Teng wurde neuer CEO.' },
      { year: '2024', event: '170M+ Nutzer. Die weltweit größte Börse nach allen Kennzahlen.' },
    ],
    pros: ['Niedrigste Gebühren auf dem Markt', 'Höchste Liquidität', '350+ Handelspaare', 'Deutscher Support', 'Staking bis 20%', 'Eigene BNB Chain Blockchain'],
    cons: ['Komplexe Oberfläche für Anfänger', 'Regulatorische Probleme in einigen Ländern'],
    features: [
      { icon: '💹', title: 'Spot-Handel', description: 'Handel mit 350+ Kryptowährungen zu 0.1% Gebühren' },
      { icon: '📈', title: 'Futures', description: 'Handel mit bis zu 125x Hebel auf BTC und ETH' },
      { icon: '🏦', title: 'Staking', description: 'Verdiene bis zu 20% jährlich auf deine Assets' },
      { icon: '🎨', title: 'NFT-Marktplatz', description: 'Kaufe und verkaufe NFTs ohne Gebühren' },
      { icon: '💳', title: 'Binance Card', description: 'Krypto-Karte für den täglichen Einkauf' },
      { icon: '🔐', title: 'Cold Storage', description: '90% der Gelder in sicherer Cold Wallet' },
    ],
    bonus: 'Bis zu $600 USDT',
    bonusDetails: 'Bonus für Registrierung + KYC-Verifizierung + erste Einzahlung ab $50',
  },
  mexc: {
    name: 'MEXC', logo: '🔷', color: '#2196F3', accentColor: '#00BCD4',
    founded: '2018', founder: 'Team erfahrener Trader', headquarters: 'Seychellen',
    employees: '1,000+', coins: '1500+', volume: '$2B+/Tag', users: '10M+', fee: '0%',
    affiliate: 'https://promote.mexc.com/r/q2p1TSAUnh',
    description: 'MEXC ist eine beliebte Kryptobörse mit UAH-Unterstützung und ukrainischer Oberfläche. Bekannt für die größte Auswahl an Altcoins und null Provision beim Spot-Handel.',
    history: [
      { year: '2018', event: 'Gründung von MEXC Global. Fokus auf das Listing neuer Token.' },
      { year: '2019', event: 'Start des Derivate- und Margin-Handels.' },
      { year: '2020', event: 'Über 200 Handelspaare. Expansion in asiatische Märkte.' },
      { year: '2021', event: 'Start der UAH-Unterstützung. Über 1000 Handelspaare.' },
      { year: '2022', event: 'Null Provision beim Spot-Handel für alle Nutzer.' },
      { year: '2024', event: '10M+ Nutzer. 1500+ Coins. Marktführer bei der Anzahl der Listings.' },
    ],
    pros: ['Null Spot-Provision', 'UAH-Unterstützung', '1500+ Coins', 'Ukrainische Oberfläche', 'Schnelles Listing neuer Token'],
    cons: ['Geringere Liquidität als Binance', 'Weniger bekannt in Europa'],
    features: [
      { icon: '🇺🇦', title: 'Ukrainischer Support', description: 'Vollständige ukrainische Oberfläche und UAH-Support' },
      { icon: '0️⃣', title: 'Null Provision', description: '0% Provision auf alle Spot-Trades' },
      { icon: '🪙', title: '1500+ Coins', description: 'Größte Auswahl an Altcoins unter allen Börsen' },
      { icon: '⚡', title: 'Schnelles Listing', description: 'Neue Token erscheinen zuerst auf MEXC' },
      { icon: '📱', title: 'Mobile App', description: 'Praktische App für iOS und Android' },
      { icon: '🎯', title: 'Launchpad', description: 'Frühzeitiger Zugang zu neuen Projekten' },
    ],
    bonus: 'Bis zu $1,000 USDT',
    bonusDetails: 'Bonus für Registrierung und erste Einzahlung',
  },
  bybit: {
    name: 'Bybit', logo: '🔵', color: '#2F80ED', accentColor: '#56CCF2',
    founded: '2018', founder: 'Ben Zhou', headquarters: 'Dubai, VAE',
    employees: '2,500+', coins: '300+', volume: '$8B+/Tag', users: '30M+', fee: '0.1%',
    affiliate: 'https://www.bybit.com/register?ref=CRYPTONAV',
    description: 'Bybit ist eine führende Kryptobörse für aktive Trader. Gegründet 2018, spezialisiert auf Derivate und Handel mit bis zu 100x Hebel.',
    history: [
      { year: '2018', event: 'Gründung von Bybit. Fokus auf Derivate und Hebelhandel.' },
      { year: '2019', event: 'Start der USDT-Marginalkontrakte. Schnelles Wachstum.' },
      { year: '2020', event: 'Über 1M registrierte Nutzer. Start der Optionen.' },
      { year: '2021', event: 'Start des Spot-Handels. 10M+ Nutzer.' },
      { year: '2022', event: 'Umzug nach Dubai. Erhalt der VARA-Lizenz.' },
      { year: '2023', event: 'Start von Copy Trading und Web3-Wallet.' },
      { year: '2024', event: '30M+ Nutzer. Top-3-Börse nach Derivatevolumen.' },
    ],
    pros: ['Hebel bis 100x', 'Copy Trading', 'Hohe Liquidität', '24/7 Support', 'Große Boni für neue Nutzer', 'Regulierte Börse (VARA)'],
    cons: ['Schwierig für Anfänger', 'Fokus auf Derivate'],
    features: [
      { icon: '📊', title: 'Derivate', description: 'Futures und Optionen mit bis zu 100x Hebel' },
      { icon: '🤝', title: 'Copy Trading', description: 'Kopiere automatisch Trades der besten Trader' },
      { icon: '🏆', title: 'Handelsturniere', description: 'Regelmäßige Wettbewerbe mit Preispools von $1M+' },
      { icon: '💎', title: 'Launchpad', description: 'Exklusiver Zugang zu neuen Projekten' },
      { icon: '🌐', title: 'Web3-Wallet', description: 'Eingebaute nicht-verwahrte Web3-Wallet' },
      { icon: '📱', title: 'Mobile App', description: 'Vollständige Trading-App' },
    ],
    bonus: 'Bis zu $30,000 USDT',
    bonusDetails: 'Willkommensbonus-Paket für neue Trader',
  },
  kucoin: {
    name: 'KuCoin', logo: '🟢', color: '#23AF91', accentColor: '#00C896',
    founded: '2017', founder: 'Michael Gan und Johnny Lyu', headquarters: 'Seychellen',
    employees: '1,500+', coins: '700+', volume: '$1B+/Tag', users: '27M+', fee: '0.1%',
    affiliate: 'https://www.kucoin.com/r/rf/CXEPY4S5',
    description: 'KuCoin ist die Volksbörse mit der größten Coin-Auswahl unter den Top-Plattformen. Gegründet 2017, bekannt für frühzeitiges Listing vielversprechender Projekte.',
    history: [
      { year: '2017', event: 'Gründung von KuCoin. Positionierung als Volksbörse.' },
      { year: '2018', event: 'Start des KCS-Tokens und Gewinnbeteiligungsprogramms.' },
      { year: '2019', event: 'Über 200 Handelspaare. Start des Margin-Handels.' },
      { year: '2020', event: 'Hack-Vorfall über $280M — alle Gelder wurden erstattet.' },
      { year: '2021', event: 'Einwerbung von $150M Investitionen. Bewertung $10B.' },
      { year: '2022', event: 'Start von KuCoin Win und NFT-Marktplatz.' },
      { year: '2024', event: '27M+ Nutzer. 700+ Coins. Marktführer bei Asset-Vielfalt.' },
    ],
    pros: ['700+ Coins', 'Frühzeitiges Listing neuer Token', 'Staking und Lending', 'Web3-Integration', 'KCS-Token-Vorteile'],
    cons: ['Geringere Liquidität bei einigen Paaren', 'Hack-Vorfall in der Vergangenheit'],
    features: [
      { icon: '🪙', title: '700+ Coins', description: 'Größte Auswahl unter den Top-Börsen' },
      { icon: '🌱', title: 'Spotlight', description: 'Frühzeitiger Zugang zu neuen vielversprechenden Projekten' },
      { icon: '💰', title: 'Earning', description: 'Staking, Lending und Yield Farming' },
      { icon: '🤖', title: 'Trading Bot', description: 'Eingebaute Trading-Bots zur Automatisierung' },
      { icon: '🎯', title: 'KCS Holder', description: 'KCS-Inhaber erhalten Anteil am Börsengewinn' },
      { icon: '🌐', title: 'Web3-Wallet', description: 'Multi-Chain Web3-Wallet für DeFi' },
    ],
    bonus: 'Bis zu $500 USDT',
    bonusDetails: 'Bonus für Registrierung und erste Einzahlung ab $50',
  },
  okx: {
    name: 'OKX', logo: '⚫', color: '#000000', accentColor: '#3772FF',
    founded: '2017', founder: 'Star Xu', headquarters: 'Seychellen',
    employees: '3,000+', coins: '300+', volume: '$5B+/Tag', users: '50M+', fee: '0.08%',
    affiliate: 'https://www.okx.com/join/CRYPTONAV',
    description: 'OKX ist eine der größten Kryptobörsen der Welt. Zeichnet sich durch die niedrigsten Gebühren auf dem Markt, eine eigene Web3-Wallet und ein entwickeltes DeFi-Ökosystem aus.',
    history: [
      { year: '2017', event: 'Gründung von OKEx (später in OKX umbenannt).' },
      { year: '2018', event: 'Start des Derivatehandels. Eintritt in die Top-3-Börsen.' },
      { year: '2020', event: 'Vorübergehende Aussetzung der Auszahlungen — nach einem Monat wiederhergestellt.' },
      { year: '2021', event: 'Rebranding von OKEx zu OKX. Fokus auf Web3.' },
      { year: '2022', event: 'Start der OKX Web3-Wallet und des NFT-Marktplatzes.' },
      { year: '2023', event: 'Partnerschaft mit Manchester City. 50M+ Nutzer.' },
      { year: '2024', event: 'Niedrigste Gebühren 0.08%. Web3-Ökosystem-Marktführer.' },
    ],
    pros: ['Niedrigste Gebühren 0.08%', 'Beste Web3-Wallet', 'Staking bis 20%', 'NFT-Marktplatz', 'DeFi-Integration', 'Hohe Liquidität'],
    cons: ['Komplexe Oberfläche', 'Weniger bekannt in Deutschland'],
    features: [
      { icon: '💸', title: 'Gebühren 0.08%', description: 'Niedrigste Gebühren unter den Top-Börsen' },
      { icon: '🌐', title: 'Web3-Wallet', description: 'Beste Multi-Chain Web3-Wallet auf dem Markt' },
      { icon: '🎨', title: 'NFT-Marktplatz', description: 'NFT-Aggregator aus allen Marktplätzen' },
      { icon: '📈', title: 'Derivate', description: 'Derivatehandel mit bis zu 100x Hebel' },
      { icon: '🏦', title: 'Earn', description: 'Staking und DeFi bis zu 20% jährlich' },
      { icon: '⛓️', title: 'OKX Chain', description: 'Eigene Blockchain für DeFi-Anwendungen' },
    ],
    bonus: 'Mystery Box bis zu $10,000',
    bonusDetails: 'Mystery Box mit Chance auf bis zu $10,000 USDT zu gewinnen',
  },
};

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ex = EXCHANGES[slug];
  if (!ex) return { title: 'Börse nicht gefunden' };
  return {
    title: `${ex.name} — Börsen-Bewertung 2026 | CryptoNavigator`,
    description: ex.description.slice(0, 160),
    alternates: { canonical: `https://cryptotop.chat/de/exchange/${slug}` },
  };
}

export function generateStaticParams() {
  return Object.keys(EXCHANGES).map(slug => ({ slug }));
}

export default async function ExchangeDEPage({ params }: PageProps) {
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
              <p className="opacity-80 mt-1">Gegründet {ex.founded} &bull; {ex.headquarters}</p>
            </div>
          </div>
          <p className="text-lg opacity-90 max-w-2xl leading-relaxed">{ex.description}</p>
          <a href={ex.affiliate} target="_blank" rel="sponsored noopener noreferrer"
            className="inline-block mt-6 bg-white text-gray-900 font-black px-8 py-3 rounded-2xl hover:scale-105 transition-transform text-sm">
            Bei {ex.name} registrieren →
          </a>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Gegründet', value: ex.founded, icon: '📅' },
          { label: 'Nutzer', value: ex.users, icon: '👥' },
          { label: 'Coins', value: ex.coins, icon: '🪙' },
          { label: 'Tagesvolumen', value: ex.volume, icon: '📊' },
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
          <p className="text-xs font-bold uppercase tracking-wide opacity-80 mb-1">Registrierungsbonus</p>
          <p className="text-3xl font-black">{ex.bonus}</p>
          <p className="text-orange-100 text-sm mt-1">{ex.bonusDetails}</p>
        </div>
        <a href={ex.affiliate} target="_blank" rel="sponsored noopener noreferrer"
          className="shrink-0 bg-white text-orange-600 font-black px-6 py-3 rounded-xl hover:bg-orange-50 transition text-sm whitespace-nowrap">
          Bonus erhalten →
        </a>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-black text-gray-900 mb-6">Hauptfunktionen</h2>
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
          <h3 className="font-black text-gray-900 mb-4">Vorteile</h3>
          <ul className="space-y-2">
            {ex.pros.map(p => (
              <li key={p} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-500 font-bold">+</span> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <h3 className="font-black text-gray-900 mb-4">Nachteile</h3>
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
        <h2 className="text-2xl font-black text-gray-900 mb-6">Geschichte von {ex.name}</h2>
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
        <h2 className="text-xl font-black text-gray-900 mb-4">Allgemeine Informationen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { label: 'Gründer', value: ex.founder },
            { label: 'Gegründet', value: ex.founded },
            { label: 'Hauptsitz', value: ex.headquarters },
            { label: 'Mitarbeiterzahl', value: ex.employees },
            { label: 'Spot-Gebühr', value: ex.fee },
            { label: 'Anzahl der Coins', value: ex.coins },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-400">{label}</span>
              <span className="text-sm font-bold text-gray-900">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center bg-gray-900 rounded-3xl p-10 text-white">
        <p className="text-3xl font-black mb-2">Bereit anzufangen?</p>
        <p className="text-gray-400 mb-6">Registriere dich bei {ex.name} und erhalte {ex.bonus} Bonus</p>
        <a href={ex.affiliate} target="_blank" rel="sponsored noopener noreferrer"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-black px-10 py-4 rounded-2xl transition text-lg">
          Bei {ex.name} registrieren →
        </a>
        <p className="text-xs text-gray-500 mt-4">Registrierung ist kostenlos. Keine Finanzberatung.</p>
      </div>
    </div>
  );
}
