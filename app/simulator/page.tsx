'use client';
import { useState, useEffect, useCallback, useRef } from 'react';

const COINS = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', tvSymbol: 'BINANCE:BTCUSDT' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', tvSymbol: 'BINANCE:ETHUSDT' },
  { id: 'solana', symbol: 'SOL', name: 'Solana', tvSymbol: 'BINANCE:SOLUSDT' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB', tvSymbol: 'BINANCE:BNBUSDT' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP', tvSymbol: 'BINANCE:XRPUSDT' },
];

const INITIAL_BALANCE = 10000;

const T = {
  uk: {
    subtitle: 'Крипто-Тренажер — торгуй на реальних цінах без ризику',
    reset: '🔄 Скинути рахунок',
    resetConfirm: 'Скинути рахунок до $10,000? Всі позиції буде закрито.',
    resetDone: '🔄 Рахунок скинуто до $10,000',
    howTitle: '❓ Як користуватись симулятором?',
    howSteps: [
      { n: '1', icon: '📊', t: 'Дивіться на графік', d: 'Кожна "свічка" — це 15 хвилин торгів. 🟢 Зелена = ціна зросла. 🔴 Червона = ціна впала. Дивіться в який бік рухаються свічки.' },
      { n: '2', icon: '🔍', t: 'Прийміть рішення', d: 'Свічки ростуть вгору? → Натисніть "Купити". Свічки падають вниз? → Натисніть "Продати". Гроші віртуальні!' },
      { n: '3', icon: '💰', t: 'Відкрийте угоду', d: 'Введіть суму (наприклад $100) і натисніть "Купити" або "Продати". Внизу побачите свою позицію.' },
      { n: '4', icon: '📈', t: 'Слідкуйте за P&L', d: 'P&L — прибуток або збиток. Зелений = плюс, червоний = мінус. Побачили прибуток — натисніть "Закрити".' },
    ],
    freeBalance: 'Вільний баланс',
    portfolio: 'Портфель загалом',
    openPos: 'Відкриті позиції',
    floatPnl: 'Плаваючий P&L',
    unrealized: 'нереалізований',
    trades: 'угод',
    loading: 'Завантаження цін...',
    openTrade: 'Відкрити угоду',
    inDollars: 'В доларах ($)',
    inCoins: 'В монетах',
    amountUsd: 'Сума в USD...',
    available: 'Доступно',
    buyBtn: '📈 Купити / Long',
    buyHint: 'Ставка на зростання ціни',
    sellBtn: '📉 Продати / Short',
    sellHint: 'Ставка на падіння ціни',
    hint: '💡 Підказка:',
    hintLong: 'Long (Купити) — заробляєш коли ціна РОСТЕ',
    hintShort: 'Short (Продати) — заробляєш коли ціна ПАДАЄ',
    hintPnl: 'P&L — прибуток або збиток позиції',
    posTab: '📂 Відкриті позиції',
    histTab: '📋 Історія угод',
    noPosTitle: 'Немає відкритих позицій',
    noPosHint: 'Подивіться на графік і відкрийте першу угоду!',
    noHistTitle: 'Історія порожня',
    noHistHint: 'Закрийте першу позицію щоб побачити результат',
    size: 'Розмір', entry: 'Ціна входу', current: 'Поточна',
    close: 'Закрити',
    footer: '* Реальні ціни CoinGecko. Всі угоди віртуальні. Графік: TradingView.',
    errAmount: 'Введіть суму угоди',
    errBalance: 'Недостатньо балансу. Доступно',
    errPrice: 'Ціна недоступна',
    bought: 'Купили',
    sold: 'Продали',
    profit: 'Прибуток',
    loss: 'Збиток',
    na: 'Н/Д',
  },
  en: {
    subtitle: 'Crypto Trainer — trade on real prices without risk',
    reset: '🔄 Reset account',
    resetConfirm: 'Reset account to $10,000? All positions will be closed.',
    resetDone: '🔄 Account reset to $10,000',
    howTitle: '❓ How to use the simulator?',
    howSteps: [
      { n: '1', icon: '📊', t: 'Watch the chart', d: 'Each "candle" is 15 minutes of trading. 🟢 Green = price rose. 🔴 Red = price fell. Watch which direction candles are moving.' },
      { n: '2', icon: '🔍', t: 'Make a decision', d: 'Candles going up? → Click "Buy". Candles going down? → Click "Sell". Money is virtual!' },
      { n: '3', icon: '💰', t: 'Open a trade', d: 'Enter an amount (e.g. $100) and click "Buy" or "Sell". You will see your position below.' },
      { n: '4', icon: '📈', t: 'Track your P&L', d: 'P&L = profit or loss. Green = profit, red = loss. When you see desired profit — click "Close".' },
    ],
    freeBalance: 'Free balance',
    portfolio: 'Total portfolio',
    openPos: 'Open positions',
    floatPnl: 'Floating P&L',
    unrealized: 'unrealized',
    trades: 'trades',
    loading: 'Loading prices...',
    openTrade: 'Open trade',
    inDollars: 'In dollars ($)',
    inCoins: 'In coins',
    amountUsd: 'Amount in USD...',
    available: 'Available',
    buyBtn: '📈 Buy / Long',
    buyHint: 'Bet on price increase',
    sellBtn: '📉 Sell / Short',
    sellHint: 'Bet on price decrease',
    hint: '💡 Hint:',
    hintLong: 'Long (Buy) — profit when price RISES',
    hintShort: 'Short (Sell) — profit when price FALLS',
    hintPnl: 'P&L — profit or loss of position',
    posTab: '📂 Open positions',
    histTab: '📋 Trade history',
    noPosTitle: 'No open positions',
    noPosHint: 'Look at the chart and open your first trade!',
    noHistTitle: 'History is empty',
    noHistHint: 'Close your first position to see the result',
    size: 'Size', entry: 'Entry price', current: 'Current',
    close: 'Close',
    footer: '* Real CoinGecko prices. All trades are virtual. Chart: TradingView.',
    errAmount: 'Enter trade amount',
    errBalance: 'Insufficient balance. Available',
    errPrice: 'Price unavailable',
    bought: 'Bought',
    sold: 'Sold',
    profit: 'Profit',
    loss: 'Loss',
    na: 'N/A',
  },
  pl: {
    subtitle: 'Krypto-Trener — handluj na prawdziwych cenach bez ryzyka',
    reset: '🔄 Zresetuj konto',
    resetConfirm: 'Zresetować konto do $10,000? Wszystkie pozycje zostaną zamknięte.',
    resetDone: '🔄 Konto zresetowane do $10,000',
    howTitle: '❓ Jak korzystać z symulatora?',
    howSteps: [
      { n: '1', icon: '📊', t: 'Obserwuj wykres', d: 'Każda "świeca" to 15 minut handlu. 🟢 Zielona = cena wzrosła. 🔴 Czerwona = cena spadła. Obserwuj kierunek świec.' },
      { n: '2', icon: '🔍', t: 'Podejmij decyzję', d: 'Świece rosną? → Kliknij "Kup". Świece spadają? → Kliknij "Sprzedaj". Pieniądze są wirtualne!' },
      { n: '3', icon: '💰', t: 'Otwórz transakcję', d: 'Wpisz kwotę (np. $100) i kliknij "Kup" lub "Sprzedaj". Zobaczysz swoją pozycję poniżej.' },
      { n: '4', icon: '📈', t: 'Śledź P&L', d: 'P&L = zysk lub strata. Zielony = plus, czerwony = minus. Widzisz zysk — kliknij "Zamknij".' },
    ],
    freeBalance: 'Wolne saldo',
    portfolio: 'Portfolio razem',
    openPos: 'Otwarte pozycje',
    floatPnl: 'Zmienny P&L',
    unrealized: 'niezrealizowany',
    trades: 'transakcji',
    loading: 'Wczytywanie cen...',
    openTrade: 'Otwórz transakcję',
    inDollars: 'W dolarach ($)',
    inCoins: 'W monetach',
    amountUsd: 'Kwota w USD...',
    available: 'Dostępne',
    buyBtn: '📈 Kup / Long',
    buyHint: 'Zakład na wzrost ceny',
    sellBtn: '📉 Sprzedaj / Short',
    sellHint: 'Zakład na spadek ceny',
    hint: '💡 Wskazówka:',
    hintLong: 'Long (Kup) — zarabiasz gdy cena ROŚNIE',
    hintShort: 'Short (Sprzedaj) — zarabiasz gdy cena SPADA',
    hintPnl: 'P&L — zysk lub strata pozycji',
    posTab: '📂 Otwarte pozycje',
    histTab: '📋 Historia transakcji',
    noPosTitle: 'Brak otwartych pozycji',
    noPosHint: 'Patrz na wykres i otwórz pierwszą transakcję!',
    noHistTitle: 'Historia jest pusta',
    noHistHint: 'Zamknij pierwszą pozycję, aby zobaczyć wynik',
    size: 'Rozmiar', entry: 'Cena wejścia', current: 'Aktualna',
    close: 'Zamknij',
    footer: '* Prawdziwe ceny CoinGecko. Wszystkie transakcje wirtualne. Wykres: TradingView.',
    errAmount: 'Wprowadź kwotę transakcji',
    errBalance: 'Niewystarczające saldo. Dostępne',
    errPrice: 'Cena niedostępna',
    bought: 'Kupiono',
    sold: 'Sprzedano',
    profit: 'Zysk',
    loss: 'Strata',
    na: 'N/D',
  },
  de: {
    subtitle: 'Krypto-Trainer — handle zu echten Preisen ohne Risiko',
    reset: '🔄 Konto zurücksetzen',
    resetConfirm: 'Konto auf $10,000 zurücksetzen? Alle Positionen werden geschlossen.',
    resetDone: '🔄 Konto auf $10,000 zurückgesetzt',
    howTitle: '❓ Wie benutzt man den Simulator?',
    howSteps: [
      { n: '1', icon: '📊', t: 'Schaue auf den Chart', d: 'Jede "Kerze" sind 15 Minuten Handel. 🟢 Grün = Preis stieg. 🔴 Rot = Preis fiel. Beobachte die Richtung der Kerzen.' },
      { n: '2', icon: '🔍', t: 'Triff eine Entscheidung', d: 'Kerzen steigen? → Klicke "Kaufen". Kerzen fallen? → Klicke "Verkaufen". Das Geld ist virtuell!' },
      { n: '3', icon: '💰', t: 'Eröffne einen Trade', d: 'Gib einen Betrag ein (z.B. $100) und klicke "Kaufen" oder "Verkaufen". Du siehst deine Position unten.' },
      { n: '4', icon: '📈', t: 'Verfolge P&L', d: 'P&L = Gewinn oder Verlust. Grün = Plus, Rot = Minus. Siehst du den gewünschten Gewinn — klicke "Schließen".' },
    ],
    freeBalance: 'Freies Guthaben',
    portfolio: 'Portfolio gesamt',
    openPos: 'Offene Positionen',
    floatPnl: 'Schwebendes P&L',
    unrealized: 'nicht realisiert',
    trades: 'Trades',
    loading: 'Preise werden geladen...',
    openTrade: 'Trade eröffnen',
    inDollars: 'In Dollar ($)',
    inCoins: 'In Coins',
    amountUsd: 'Betrag in USD...',
    available: 'Verfügbar',
    buyBtn: '📈 Kaufen / Long',
    buyHint: 'Wette auf Preisanstieg',
    sellBtn: '📉 Verkaufen / Short',
    sellHint: 'Wette auf Preisrückgang',
    hint: '💡 Hinweis:',
    hintLong: 'Long (Kaufen) — Gewinn wenn Preis STEIGT',
    hintShort: 'Short (Verkaufen) — Gewinn wenn Preis FÄLLT',
    hintPnl: 'P&L — Gewinn oder Verlust der Position',
    posTab: '📂 Offene Positionen',
    histTab: '📋 Trade-Historie',
    noPosTitle: 'Keine offenen Positionen',
    noPosHint: 'Schau auf den Chart und eröffne deinen ersten Trade!',
    noHistTitle: 'Historie ist leer',
    noHistHint: 'Schließe die erste Position, um das Ergebnis zu sehen',
    size: 'Größe', entry: 'Einstiegspreis', current: 'Aktuell',
    close: 'Schließen',
    footer: '* Echte CoinGecko-Preise. Alle Trades virtuell. Chart: TradingView.',
    errAmount: 'Trade-Betrag eingeben',
    errBalance: 'Unzureichendes Guthaben. Verfügbar',
    errPrice: 'Preis nicht verfügbar',
    bought: 'Gekauft',
    sold: 'Verkauft',
    profit: 'Gewinn',
    loss: 'Verlust',
    na: 'N/V',
  },
};

type Locale = 'uk' | 'en' | 'pl' | 'de';

interface Position {
  id: string; coin: string; symbol: string; type: 'buy' | 'sell';
  usdAmount: number; coinAmount: number; entryPrice: number; openedAt: string;
}
interface HistoryItem extends Position { exitPrice: number; pnl: number; closedAt: string; }

function TradingViewWidget({ tvSymbol, locale }: { tvSymbol: string; locale: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true, symbol: tvSymbol, interval: '15',
      timezone: 'Europe/Kyiv', theme: 'light', style: '1',
      locale: locale === 'uk' ? 'uk' : locale === 'de' ? 'de_DE' : locale === 'pl' ? 'pl_PL' : 'en',
      toolbar_bg: '#f8f9fa', enable_publishing: false,
      hide_top_toolbar: false, hide_legend: false, save_image: false, refresh_rate: 15,
    });
    containerRef.current.appendChild(script);
  }, [tvSymbol, locale]);
  return <div ref={containerRef} className="tradingview-widget-container w-full h-full" />;
}

export function SimulatorComponent({ locale = 'uk' }: { locale?: Locale }) {
  const t = T[locale] || T.uk;
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [prevPrices, setPrevPrices] = useState<Record<string, number>>({});
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [positions, setPositions] = useState<Position[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedCoin, setSelectedCoin] = useState(COINS[0]);
  const [amount, setAmount] = useState('');
  const [amountType, setAmountType] = useState<'usd' | 'coin'>('usd');
  const [loading, setLoading] = useState(true);
  const [howOpen, setHowOpen] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [tab, setTab] = useState<'positions' | 'history'>('positions');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cryptonav_sim_v2');
      if (saved) {
        const data = JSON.parse(saved);
        setBalance(data.balance ?? INITIAL_BALANCE);
        setPositions(data.positions ?? []);
        setHistory(data.history ?? []);
      }
    } catch {}
  }, []);

  const save = useCallback((bal: number, pos: Position[], hist: HistoryItem[]) => {
    try { localStorage.setItem('cryptonav_sim_v2', JSON.stringify({ balance: bal, positions: pos, history: hist })); } catch {}
  }, []);

  const fetchPrices = useCallback(async () => {
    try {
      const ids = COINS.map(c => c.id).join(',');
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
      const data = await res.json();
      const newPrices: Record<string, number> = {};
      COINS.forEach(c => { if (data[c.id]) newPrices[c.symbol] = data[c.id].usd; });
      setPrices(p => { setPrevPrices(p); return newPrices; });
      setLoading(false);
    } catch { setLoading(false); }
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  const showMsg = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3500);
  };

  const calcUsdAmount = () => {
    const val = parseFloat(amount);
    if (!val || val <= 0) return 0;
    return amountType === 'usd' ? val : val * (prices[selectedCoin.symbol] || 0);
  };

  const openPosition = (type: 'buy' | 'sell') => {
    const usdAmount = calcUsdAmount();
    if (!usdAmount || usdAmount <= 0) return showMsg(t.errAmount, 'error');
    if (usdAmount > balance) return showMsg(`${t.errBalance}: $${balance.toFixed(0)}`, 'error');
    const price = prices[selectedCoin.symbol];
    if (!price) return showMsg(t.errPrice, 'error');
    const pos: Position = {
      id: Date.now().toString(), coin: selectedCoin.name, symbol: selectedCoin.symbol,
      type, usdAmount, coinAmount: usdAmount / price, entryPrice: price,
      openedAt: new Date().toLocaleTimeString(),
    };
    const newBalance = balance - usdAmount;
    const newPositions = [...positions, pos];
    setBalance(newBalance); setPositions(newPositions);
    save(newBalance, newPositions, history); setAmount('');
    showMsg(`✅ ${type === 'buy' ? t.bought : t.sold} ${pos.coinAmount.toFixed(6)} ${selectedCoin.symbol} $${usdAmount.toFixed(0)}`, 'success');
  };

  const closePosition = (pos: Position) => {
    const currentPrice = prices[pos.symbol];
    if (!currentPrice) return showMsg(t.errPrice, 'error');
    const pnl = pos.type === 'buy'
      ? pos.usdAmount * (currentPrice - pos.entryPrice) / pos.entryPrice
      : pos.usdAmount * (pos.entryPrice - currentPrice) / pos.entryPrice;
    const hist: HistoryItem = { ...pos, exitPrice: currentPrice, pnl, closedAt: new Date().toLocaleTimeString() };
    const newBalance = balance + pos.usdAmount + pnl;
    const newPositions = positions.filter(p => p.id !== pos.id);
    const newHistory = [hist, ...history].slice(0, 30);
    setBalance(newBalance); setPositions(newPositions); setHistory(newHistory);
    save(newBalance, newPositions, newHistory);
    showMsg(`${pnl >= 0 ? `🎉 ${t.profit}` : `📉 ${t.loss}`}: ${pnl >= 0 ? '+' : ''}$${pnl.toFixed(2)}`, pnl >= 0 ? 'success' : 'error');
  };

  const getPnl = (pos: Position) => {
    const current = prices[pos.symbol];
    if (!current) return 0;
    return pos.type === 'buy'
      ? pos.usdAmount * (current - pos.entryPrice) / pos.entryPrice
      : pos.usdAmount * (pos.entryPrice - current) / pos.entryPrice;
  };

  const totalPnl = positions.reduce((sum, p) => sum + getPnl(p), 0);
  const currentPrice = prices[selectedCoin.symbol] || 0;
  const prevPrice = prevPrices[selectedCoin.symbol] || 0;
  const priceUp = currentPrice >= prevPrice;
  const usdEquivalent = amountType === 'coin' ? calcUsdAmount() : null;
  const totalPortfolio = balance + positions.reduce((sum, p) => sum + p.usdAmount + getPnl(p), 0);
  const totalReturn = ((totalPortfolio - INITIAL_BALANCE) / INITIAL_BALANCE) * 100;

  const reset = () => {
    if (!confirm(t.resetConfirm)) return;
    setBalance(INITIAL_BALANCE); setPositions([]); setHistory([]);
    save(INITIAL_BALANCE, [], []); showMsg(t.resetDone, 'info');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900">🎮 CryptoNavigator Simulator</h1>
            <p className="text-gray-500 text-sm mt-1">{t.subtitle}</p>
          </div>
          <button onClick={reset} className="text-sm text-gray-700 hover:text-red-500 underline transition font-semibold">{t.reset}</button>
        </div>
      </div>

      <div className="mb-4 border border-gray-200 rounded-xl overflow-hidden">
        <button onClick={() => setHowOpen(!howOpen)} className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition text-left">
          <span className="font-semibold text-gray-800 text-sm">{t.howTitle}</span>
          <span className="text-gray-400">{howOpen ? '▲' : '▼'}</span>
        </button>
        {howOpen && (
          <div className="px-4 py-4 bg-white grid grid-cols-1 md:grid-cols-4 gap-4">
            {t.howSteps.map(item => (
              <div key={item.n} className="flex gap-2">
                <div className="shrink-0 w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-xs">{item.n}</div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{item.icon} {item.t}</p>
                  <p className="text-gray-900 text-sm mt-0.5 leading-relaxed font-bold">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {message && (
        <div className={`mb-4 px-4 py-3 rounded-xl text-center font-semibold text-sm ${message.type === 'success' ? 'bg-green-500 text-white' : message.type === 'error' ? 'bg-red-500 text-white' : 'bg-gray-900 text-white'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
          <p className="text-xs font-semibold text-gray-600">{t.freeBalance}</p>
          <p className="text-lg font-black text-gray-900">${balance.toFixed(0)}</p>
          <p className="text-xs text-gray-700 font-semibold">USDT</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
          <p className="text-xs font-semibold text-gray-600">{t.portfolio}</p>
          <p className="text-lg font-black text-gray-900">${totalPortfolio.toFixed(0)}</p>
          <p className={`text-xs font-bold ${totalReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>{totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(2)}%</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
          <p className="text-xs font-semibold text-gray-600">{t.openPos}</p>
          <p className="text-lg font-black text-gray-900">{positions.length}</p>
          <p className="text-xs text-gray-700 font-semibold">{t.trades}</p>
        </div>
        <div className={`rounded-xl p-3 shadow-sm border ${totalPnl >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <p className="text-xs font-semibold text-gray-600">{t.floatPnl}</p>
          <p className={`text-lg font-black ${totalPnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>{totalPnl >= 0 ? '+' : ''}${totalPnl.toFixed(2)}</p>
          <p className="text-xs text-gray-700 font-semibold">{t.unrealized}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="flex gap-2 mb-3 flex-wrap">
            {COINS.map(coin => {
              const p = prices[coin.symbol];
              const pp = prevPrices[coin.symbol];
              const up = p && pp ? p >= pp : true;
              return (
                <button key={coin.id} onClick={() => setSelectedCoin(coin)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl font-black transition ${selectedCoin.id === coin.id ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-400'}`}>
                  <span className="text-lg font-black">{coin.symbol}</span>
                  {p && <span className={`text-base font-black ${selectedCoin.id === coin.id ? "text-gray-200" : up ? "text-green-700" : "text-red-700"}`}>${p > 1000 ? (p / 1000).toFixed(1) + 'K' : p.toFixed(2)}</span>}
                </button>
              );
            })}
            {loading && <span className="text-xs text-gray-400 self-center">{t.loading}</span>}
          </div>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden" style={{ height: '420px' }}>
            <TradingViewWidget key={selectedCoin.tvSymbol} tvSymbol={selectedCoin.tvSymbol} locale={locale} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-500">{selectedCoin.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${priceUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{priceUp ? '▲' : '▼'} LIVE</span>
            </div>
            <div className={`text-3xl font-black ${priceUp ? 'text-green-600' : 'text-red-600'}`}>
              {loading ? '...' : currentPrice ? `$${currentPrice.toLocaleString()}` : t.na}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="font-black text-gray-900 mb-3 text-sm">{t.openTrade}</h3>
            <div className="flex gap-1 mb-3 bg-gray-100 p-1 rounded-lg">
              <button onClick={() => setAmountType('usd')} className={`flex-1 py-1.5 rounded-md text-xs font-bold transition ${amountType === 'usd' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}>{t.inDollars}</button>
              <button onClick={() => setAmountType('coin')} className={`flex-1 py-1.5 rounded-md text-xs font-bold transition ${amountType === 'coin' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}>{t.inCoins}</button>
            </div>
            <div className="mb-3">
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
                placeholder={amountType === 'usd' ? t.amountUsd : `${selectedCoin.symbol}...`}
                className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              {usdEquivalent !== null && usdEquivalent > 0 && <p className="text-xs text-gray-500 mt-1">≈ ${usdEquivalent.toFixed(2)}</p>}
            </div>
            <div className="flex gap-1 mb-4">
              {(amountType === 'usd' ? [100, 500, 1000, 2000] : [0.001, 0.01, 0.1]).map(v => (
                <button key={v} onClick={() => setAmount(String(v))} className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-bold text-gray-700 transition">
                  {amountType === 'usd' ? `$${v}` : v}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-600 font-semibold mb-3">{t.available}: <span className="font-black text-gray-900">${balance.toFixed(0)}</span></p>
            <div className="space-y-2">
              <button onClick={() => openPosition('buy')} disabled={!currentPrice} className="w-full py-4 bg-green-500 hover:bg-green-600 disabled:opacity-40 text-white font-black rounded-xl transition text-base">
                {t.buyBtn}
              </button>
              <button onClick={() => openPosition('sell')} disabled={!currentPrice} className="w-full py-4 bg-red-500 hover:bg-red-600 disabled:opacity-40 text-white font-black rounded-xl transition text-base">
                {t.sellBtn}
              </button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-sm text-blue-950 space-y-1.5 font-semibold">
            <p className="font-bold">{t.hint}</p>
            <p>{t.hintLong}</p>
            <p>{t.hintShort}</p>
            <p>{t.hintPnl}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="flex border-b border-gray-100">
          <button onClick={() => setTab('positions')} className={`flex-1 py-3 font-bold text-sm transition ${tab === 'positions' ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-500' : 'text-gray-500 hover:bg-gray-50'}`}>
            {t.posTab} ({positions.length})
          </button>
          <button onClick={() => setTab('history')} className={`flex-1 py-3 font-bold text-sm transition ${tab === 'history' ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-500' : 'text-gray-500 hover:bg-gray-50'}`}>
            {t.histTab} ({history.length})
          </button>
        </div>
        <div className="p-4">
          {tab === 'positions' && (
            positions.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-4xl mb-2">📊</p>
                <p className="text-gray-500 font-semibold">{t.noPosTitle}</p>
                <p className="text-gray-400 text-sm mt-1">{t.noPosHint}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {positions.map(pos => {
                  const pnl = getPnl(pos);
                  const pct = (pnl / pos.usdAmount) * 100;
                  const currentP = prices[pos.symbol];
                  return (
                    <div key={pos.id} className={`p-4 rounded-xl border ${pnl >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs font-black px-2 py-0.5 rounded-full ${pos.type === 'buy' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                              {pos.type === 'buy' ? '📈 LONG' : '📉 SHORT'}
                            </span>
                            <span className="font-black text-gray-900">{pos.symbol}</span>
                            <span className="text-xs text-gray-400">{pos.openedAt}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div><p className="text-gray-600 font-semibold">{t.size}</p><p className="font-bold text-gray-900">${pos.usdAmount.toFixed(0)}</p></div>
                            <div><p className="text-gray-600 font-semibold">{t.entry}</p><p className="font-bold text-gray-900">${pos.entryPrice.toLocaleString()}</p></div>
                            <div><p className="text-gray-600 font-semibold">{t.current}</p><p className="font-bold text-gray-900">${currentP?.toLocaleString() ?? '...'}</p></div>
                          </div>
                        </div>
                        <div className="ml-4 text-right">
                          <p className={`text-xl font-black ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>{pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}</p>
                          <p className={`text-sm font-bold ${pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>{pct >= 0 ? '+' : ''}{pct.toFixed(2)}%</p>
                          <button onClick={() => closePosition(pos)} className="mt-2 px-4 py-2 bg-gray-900 hover:bg-gray-700 text-white text-xs font-black rounded-lg transition block w-full">{t.close}</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          )}
          {tab === 'history' && (
            history.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-4xl mb-2">📋</p>
                <p className="text-gray-500 font-semibold">{t.noHistTitle}</p>
                <p className="text-gray-400 text-sm mt-1">{t.noHistHint}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {history.map(h => (
                  <div key={h.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-black px-2 py-0.5 rounded-full ${h.type === 'buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {h.type === 'buy' ? '📈 LONG' : '📉 SHORT'} {h.symbol}
                        </span>
                        <span className="text-xs text-gray-500">{h.closedAt}</span>
                      </div>
                      <p className="text-xs text-gray-600 font-medium">${h.usdAmount.toFixed(0)} · {h.entryPrice.toLocaleString()} → {h.exitPrice.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-black text-sm ${h.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>{h.pnl >= 0 ? '+' : ''}${h.pnl.toFixed(2)}</p>
                      <p className={`text-xs font-semibold ${h.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>{((h.pnl / h.usdAmount) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
      <p className="text-center text-sm text-gray-700 font-semibold mt-4">{t.footer}</p>
    </div>
  );
}

export default function SimulatorPage() {
  return <SimulatorComponent locale="uk" />;
}
