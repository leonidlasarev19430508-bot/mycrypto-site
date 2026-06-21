import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const EXCHANGES: Record<string, {
  name: string;
  logo: string;
  color: string;
  accentColor: string;
  founded: string;
  founder: string;
  headquarters: string;
  employees: string;
  coins: string;
  volume: string;
  users: string;
  fee: string;
  affiliate: string;
  description: string;
  history: { year: string; event: string }[];
  pros: string[];
  cons: string[];
  features: { icon: string; title: string; description: string }[];
  bonus: string;
  bonusDetails: string;
}> = {
  binance: {
    name: 'Binance', logo: '🟡', color: '#F0B90B', accentColor: '#F0B90B',
    founded: '2017', founder: 'Changpeng Zhao (CZ)', headquarters: 'Cayman Islands',
    employees: '8,000+', coins: '350+', volume: '$15B+/day', users: '170M+', fee: '0.1%',
    affiliate: 'https://www.binance.com/register?ref=Q5HR1JVW',
    description: 'Binance is the world\'s largest crypto exchange by trading volume. Founded in 2017 by Changpeng Zhao, it became the dominant platform in the crypto industry in record time.',
    history: [
      { year: '2017', event: 'Binance founded. Within 6 months became the largest exchange by trading volume.' },
      { year: '2018', event: 'Launch of Binance Chain and BNB token. Opening offices worldwide.' },
      { year: '2019', event: 'Launch of Binance US and Binance DEX — decentralized exchange.' },
      { year: '2020', event: 'Launch of Binance Smart Chain (BSC). Over 500 projects on the platform.' },
      { year: '2021', event: 'Record trading volume — $76B in one day. 90M+ users.' },
      { year: '2023', event: 'CZ stepped down, Richard Teng became new CEO.' },
      { year: '2024', event: '170M+ users. The world\'s largest exchange by all metrics.' },
    ],
    pros: ['Lowest fees on the market', 'Highest liquidity', '350+ trading pairs', 'English support', 'Staking up to 20%', 'Own BNB Chain blockchain'],
    cons: ['Complex interface for beginners', 'Regulatory issues in some countries'],
    features: [
      { icon: '💹', title: 'Spot Trading', description: 'Trade 350+ cryptocurrencies with 0.1% fees' },
      { icon: '📈', title: 'Futures', description: 'Trade with up to 125x leverage on BTC and ETH' },
      { icon: '🏦', title: 'Staking', description: 'Earn up to 20% annually on your assets' },
      { icon: '🎨', title: 'NFT Marketplace', description: 'Buy and sell NFTs with no fees' },
      { icon: '💳', title: 'Binance Card', description: 'Crypto card for everyday purchases' },
      { icon: '🔐', title: 'Cold Storage', description: '90% of funds in secure cold wallet' },
    ],
    bonus: 'Up to $600 USDT',
    bonusDetails: 'Bonus for registration + KYC verification + first deposit from $50',
  },
  mexc: {
    name: 'MEXC', logo: '🔷', color: '#2196F3', accentColor: '#00BCD4',
    founded: '2018', founder: 'Team of experienced traders', headquarters: 'Seychelles',
    employees: '1,000+', coins: '1500+', volume: '$2B+/day', users: '10M+', fee: '0%',
    affiliate: 'https://promote.mexc.com/r/q2p1TSAUnh',
    description: 'MEXC is a popular crypto exchange with UAH support and Ukrainian interface. Known for the largest selection of altcoins and zero commission on spot trading.',
    history: [
      { year: '2018', event: 'MEXC Global founded. Focus on listing new tokens.' },
      { year: '2019', event: 'Launch of derivatives and margin trading.' },
      { year: '2020', event: 'Over 200 trading pairs. Expansion into Asian markets.' },
      { year: '2021', event: 'Launch of UAH support. Over 1000 trading pairs.' },
      { year: '2022', event: 'Zero commission on spot trading for all users.' },
      { year: '2024', event: '10M+ users. 1500+ coins. Leader in number of listings.' },
    ],
    pros: ['Zero spot commission', 'UAH support', '1500+ coins', 'Ukrainian interface', 'Fast listing of new tokens'],
    cons: ['Lower liquidity than Binance', 'Less known in Europe'],
    features: [
      { icon: '🇺🇦', title: 'Ukrainian Support', description: 'Full Ukrainian interface and UAH support' },
      { icon: '0️⃣', title: 'Zero Commission', description: '0% commission on all spot trades' },
      { icon: '🪙', title: '1500+ Coins', description: 'Largest selection of altcoins among all exchanges' },
      { icon: '⚡', title: 'Fast Listing', description: 'New tokens appear first on MEXC' },
      { icon: '📱', title: 'Mobile App', description: 'Convenient app for iOS and Android' },
      { icon: '🎯', title: 'Launchpad', description: 'Early access to new projects' },
    ],
    bonus: 'Up to $1,000 USDT',
    bonusDetails: 'Bonus for registration and first deposit',
  },
  bybit: {
    name: 'Bybit', logo: '🔵', color: '#2F80ED', accentColor: '#56CCF2',
    founded: '2018', founder: 'Ben Zhou', headquarters: 'Dubai, UAE',
    employees: '2,500+', coins: '300+', volume: '$8B+/day', users: '30M+', fee: '0.1%',
    affiliate: 'https://www.bybit.com/register?ref=CRYPTONAV',
    description: 'Bybit is a leading crypto exchange for active traders. Founded in 2018, it specializes in derivatives and trading with up to 100x leverage.',
    history: [
      { year: '2018', event: 'Bybit founded. Focus on derivatives and leveraged trading.' },
      { year: '2019', event: 'Launch of USDT-marginal contracts. Rapid growth.' },
      { year: '2020', event: 'Over 1M registered users. Launch of options.' },
      { year: '2021', event: 'Launch of spot trading. 10M+ users.' },
      { year: '2022', event: 'Relocated to Dubai. Obtained VARA license.' },
      { year: '2023', event: 'Launch of Copy Trading and Web3 wallet.' },
      { year: '2024', event: '30M+ users. Top-3 exchange by derivatives volume.' },
    ],
    pros: ['Up to 100x leverage', 'Copy trading', 'High liquidity', '24/7 support', 'Large bonuses for new users', 'Regulated exchange (VARA)'],
    cons: ['Difficult for beginners', 'Focus on derivatives'],
    features: [
      { icon: '📊', title: 'Derivatives', description: 'Futures and options with up to 100x leverage' },
      { icon: '🤝', title: 'Copy Trading', description: 'Automatically copy trades of top traders' },
      { icon: '🏆', title: 'Trading Tournaments', description: 'Regular competitions with $1M+ prize pools' },
      { icon: '💎', title: 'Launchpad', description: 'Exclusive access to new projects' },
      { icon: '🌐', title: 'Web3 Wallet', description: 'Built-in non-custodial Web3 wallet' },
      { icon: '📱', title: 'Mobile App', description: 'Full-featured trading app' },
    ],
    bonus: 'Up to $30,000 USDT',
    bonusDetails: 'Welcome bonus package for new traders',
  },
  kucoin: {
    name: 'KuCoin', logo: '🟢', color: '#23AF91', accentColor: '#00C896',
    founded: '2017', founder: 'Michael Gan and Johnny Lyu', headquarters: 'Seychelles',
    employees: '1,500+', coins: '700+', volume: '$1B+/day', users: '27M+', fee: '0.1%',
    affiliate: 'https://www.kucoin.com/r/rf/CXEPY4S5',
    description: 'KuCoin is the People\'s Exchange with the widest selection of coins among top platforms. Founded in 2017, known for early listing of promising projects and passive income opportunities.',
    history: [
      { year: '2017', event: 'KuCoin founded. Positioned as the People\'s Exchange.' },
      { year: '2018', event: 'Launch of KCS token and profit sharing program.' },
      { year: '2019', event: 'Over 200 trading pairs. Launch of margin trading.' },
      { year: '2020', event: 'Hack incident for $280M — all funds reimbursed.' },
      { year: '2021', event: 'Raised $150M in investment. Valuation $10B.' },
      { year: '2022', event: 'Launch of KuCoin Win and NFT marketplace.' },
      { year: '2024', event: '27M+ users. 700+ coins. Leader in asset diversity.' },
    ],
    pros: ['700+ coins', 'Early listing of new tokens', 'Staking and lending', 'Web3 integration', 'KCS token benefits'],
    cons: ['Lower liquidity on some pairs', 'Past hack incident'],
    features: [
      { icon: '🪙', title: '700+ Coins', description: 'Largest selection among top exchanges' },
      { icon: '🌱', title: 'Spotlight', description: 'Early access to new promising projects' },
      { icon: '💰', title: 'Earning', description: 'Staking, lending and yield farming' },
      { icon: '🤖', title: 'Trading Bot', description: 'Built-in trading bots for automation' },
      { icon: '🎯', title: 'KCS Holder', description: 'KCS holders receive a share of exchange profits' },
      { icon: '🌐', title: 'Web3 Wallet', description: 'Multi-chain Web3 wallet for DeFi' },
    ],
    bonus: 'Up to $500 USDT',
    bonusDetails: 'Bonus for registration and first deposit from $50',
  },
  okx: {
    name: 'OKX', logo: '⚫', color: '#000000', accentColor: '#3772FF',
    founded: '2017', founder: 'Star Xu', headquarters: 'Seychelles',
    employees: '3,000+', coins: '300+', volume: '$5B+/day', users: '50M+', fee: '0.08%',
    affiliate: 'https://www.okx.com/join/CRYPTONAV',
    description: 'OKX is one of the largest crypto exchanges in the world. Distinguished by the lowest fees on the market, its own Web3 wallet and a developed DeFi ecosystem.',
    history: [
      { year: '2017', event: 'OKEx founded (later renamed to OKX).' },
      { year: '2018', event: 'Launch of derivatives trading. Entry into top-3 exchanges.' },
      { year: '2020', event: 'Temporary suspension of withdrawals — restored after a month.' },
      { year: '2021', event: 'Rebranding from OKEx to OKX. Focus on Web3.' },
      { year: '2022', event: 'Launch of OKX Web3 wallet and NFT marketplace.' },
      { year: '2023', event: 'Partnership with Manchester City. 50M+ users.' },
      { year: '2024', event: 'Lowest fees 0.08%. Web3 ecosystem leader.' },
    ],
    pros: ['Lowest fees 0.08%', 'Best Web3 wallet', 'Staking up to 20%', 'NFT marketplace', 'DeFi integration', 'High liquidity'],
    cons: ['Complex interface', 'Less known in Ukraine'],
    features: [
      { icon: '💸', title: 'Fees 0.08%', description: 'Lowest fees among top exchanges' },
      { icon: '🌐', title: 'Web3 Wallet', description: 'Best multi-chain Web3 wallet on the market' },
      { icon: '🎨', title: 'NFT Marketplace', description: 'NFT aggregator from all marketplaces' },
      { icon: '📈', title: 'Derivatives', description: 'Derivatives trading with up to 100x leverage' },
      { icon: '🏦', title: 'Earn', description: 'Staking and DeFi up to 20% annually' },
      { icon: '⛓️', title: 'OKX Chain', description: 'Own blockchain for DeFi applications' },
    ],
    bonus: 'Mystery Box up to $10,000',
    bonusDetails: 'Mystery Box with a chance to win up to $10,000 USDT',
  },
};

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ex = EXCHANGES[slug];
  if (!ex) return { title: 'Exchange not found' };
  return {
    title: `${ex.name} — Exchange Review 2026 | CryptoNavigator`,
    description: ex.description.slice(0, 160),
    alternates: { canonical: `https://cryptotop.chat/en/exchange/${slug}` },
  };
}

export function generateStaticParams() {
  return Object.keys(EXCHANGES).map(slug => ({ slug }));
}

export default async function ExchangeENPage({ params }: PageProps) {
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
              <p className="opacity-80 mt-1">Founded {ex.founded} &bull; {ex.headquarters}</p>
            </div>
          </div>
          <p className="text-lg opacity-90 max-w-2xl leading-relaxed">{ex.description}</p>
          <a href={ex.affiliate} target="_blank" rel="sponsored noopener noreferrer"
            className="inline-block mt-6 bg-white text-gray-900 font-black px-8 py-3 rounded-2xl hover:scale-105 transition-transform text-sm">
            Register on {ex.name} →
          </a>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Founded', value: ex.founded, icon: '📅' },
          { label: 'Users', value: ex.users, icon: '👥' },
          { label: 'Coins', value: ex.coins, icon: '🪙' },
          { label: 'Daily volume', value: ex.volume, icon: '📊' },
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
          <p className="text-xs font-bold uppercase tracking-wide opacity-80 mb-1">Registration Bonus</p>
          <p className="text-3xl font-black">{ex.bonus}</p>
          <p className="text-orange-100 text-sm mt-1">{ex.bonusDetails}</p>
        </div>
        <a href={ex.affiliate} target="_blank" rel="sponsored noopener noreferrer"
          className="shrink-0 bg-white text-orange-600 font-black px-6 py-3 rounded-xl hover:bg-orange-50 transition text-sm whitespace-nowrap">
          Get Bonus →
        </a>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-black text-gray-900 mb-6">Key Features</h2>
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
          <h3 className="font-black text-gray-900 mb-4">Advantages</h3>
          <ul className="space-y-2">
            {ex.pros.map(p => (
              <li key={p} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-500 font-bold">+</span> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <h3 className="font-black text-gray-900 mb-4">Disadvantages</h3>
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
        <h2 className="text-2xl font-black text-gray-900 mb-6">History of {ex.name}</h2>
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
        <h2 className="text-xl font-black text-gray-900 mb-4">General Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { label: 'Founder', value: ex.founder },
            { label: 'Founded', value: ex.founded },
            { label: 'Headquarters', value: ex.headquarters },
            { label: 'Employees', value: ex.employees },
            { label: 'Spot fee', value: ex.fee },
            { label: 'Number of coins', value: ex.coins },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-400">{label}</span>
              <span className="text-sm font-bold text-gray-900">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center bg-gray-900 rounded-3xl p-10 text-white">
        <p className="text-3xl font-black mb-2">Ready to start?</p>
        <p className="text-gray-400 mb-6">Register on {ex.name} and get {ex.bonus} bonus</p>
        <a href={ex.affiliate} target="_blank" rel="sponsored noopener noreferrer"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-black px-10 py-4 rounded-2xl transition text-lg">
          Register on {ex.name} →
        </a>
        <p className="text-xs text-gray-500 mt-4">Registration is free. Not financial advice.</p>
      </div>
    </div>
  );
}
