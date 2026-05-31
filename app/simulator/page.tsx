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

interface Position {
  id: string;
  coin: string;
  symbol: string;
  type: 'buy' | 'sell';
  usdAmount: number;
  coinAmount: number;
  entryPrice: number;
  openedAt: string;
}

interface HistoryItem extends Position {
  exitPrice: number;
  pnl: number;
  closedAt: string;
}

function TradingViewWidget({ tvSymbol }: { tvSymbol: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: tvSymbol,
      interval: '15',
      timezone: 'Europe/Kiev',
      theme: 'light',
      style: '1',
      locale: 'uk',
      toolbar_bg: '#f8f9fa',
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      container_id: 'tv_chart',
    });

    containerRef.current.appendChild(script);
  }, [tvSymbol]);

  return (
    <div ref={containerRef} className="tradingview-widget-container w-full h-full" id="tv_chart" />
  );
}

export default function SimulatorPage() {
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
    try {
      localStorage.setItem('cryptonav_sim_v2', JSON.stringify({ balance: bal, positions: pos, history: hist }));
    } catch {}
  }, []);

  const fetchPrices = useCallback(async () => {
    try {
      const ids = COINS.map(c => c.id).join(',');
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
      const data = await res.json();
      setPrevPrices(prev => ({ ...prev }));
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
    if (amountType === 'usd') return val;
    return val * (prices[selectedCoin.symbol] || 0);
  };

  const openPosition = (type: 'buy' | 'sell') => {
    const usdAmount = calcUsdAmount();
    if (!usdAmount || usdAmount <= 0) return showMsg('Введіть суму угоди', 'error');
    if (usdAmount > balance) return showMsg(`Недостатньо балансу. Доступно: $${balance.toFixed(0)}`, 'error');
    const price = prices[selectedCoin.symbol];
    if (!price) return showMsg('Ціна недоступна', 'error');

    const pos: Position = {
      id: Date.now().toString(),
      coin: selectedCoin.name,
      symbol: selectedCoin.symbol,
      type,
      usdAmount,
      coinAmount: usdAmount / price,
      entryPrice: price,
      openedAt: new Date().toLocaleTimeString('uk-UA'),
    };

    const newBalance = balance - usdAmount;
    const newPositions = [...positions, pos];
    setBalance(newBalance);
    setPositions(newPositions);
    save(newBalance, newPositions, history);
    setAmount('');
    showMsg(`✅ ${type === 'buy' ? '📈 Купили' : '📉 Продали'} ${pos.coinAmount.toFixed(6)} ${selectedCoin.symbol} за $${usdAmount.toFixed(0)}`, 'success');
  };

  const closePosition = (pos: Position) => {
    const currentPrice = prices[pos.symbol];
    if (!currentPrice) return showMsg('Ціна недоступна', 'error');

    const pnl = pos.type === 'buy'
      ? pos.usdAmount * (currentPrice - pos.entryPrice) / pos.entryPrice
      : pos.usdAmount * (pos.entryPrice - currentPrice) / pos.entryPrice;

    const returned = pos.usdAmount + pnl;
    const hist: HistoryItem = { ...pos, exitPrice: currentPrice, pnl, closedAt: new Date().toLocaleTimeString('uk-UA') };

    const newBalance = balance + returned;
    const newPositions = positions.filter(p => p.id !== pos.id);
    const newHistory = [hist, ...history].slice(0, 30);
    setBalance(newBalance);
    setPositions(newPositions);
    setHistory(newHistory);
    save(newBalance, newPositions, newHistory);
    showMsg(`${pnl >= 0 ? '🎉 Прибуток' : '📉 Збиток'}: ${pnl >= 0 ? '+' : ''}$${pnl.toFixed(2)}`, pnl >= 0 ? 'success' : 'error');
  };

  const getPnl = (pos: Position) => {
    const current = prices[pos.symbol];
    if (!current) return 0;
    return pos.type === 'buy'
      ? pos.usdAmount * (current - pos.entryPrice) / pos.entryPrice
      : pos.usdAmount * (pos.entryPrice - current) / pos.entryPrice;
  };

  const getPnlPercent = (pos: Position) => {
    const pnl = getPnl(pos);
    return (pnl / pos.usdAmount) * 100;
  };

  const totalPnl = positions.reduce((sum, p) => sum + getPnl(p), 0);
  const currentPrice = prices[selectedCoin.symbol] || 0;
  const prevPrice = prevPrices[selectedCoin.symbol] || 0;
  const priceUp = currentPrice >= prevPrice;

  const usdEquivalent = amountType === 'coin' ? calcUsdAmount() : null;

  const reset = () => {
    if (!confirm('Скинути рахунок до $10,000? Всі позиції буде закрито.')) return;
    setBalance(INITIAL_BALANCE);
    setPositions([]);
    setHistory([]);
    save(INITIAL_BALANCE, [], []);
    showMsg('🔄 Рахунок скинуто до $10,000', 'info');
  };

  const totalPortfolio = balance + positions.reduce((sum, p) => sum + p.usdAmount + getPnl(p), 0);
  const totalReturn = ((totalPortfolio - INITIAL_BALANCE) / INITIAL_BALANCE) * 100;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900">
              🎮 CryptoNavigator Simulator
            </h1>
            <p className="text-gray-500 text-sm mt-1">Крипто-Тренажер — торгуй на реальних цінах без ризику</p>
          </div>
          <button onClick={reset} className="text-xs text-gray-400 hover:text-red-500 underline transition">
            🔄 Скинути рахунок
          </button>
        </div>
      </div>

      {/* How it works */}
      <div className="mb-4 border border-gray-200 rounded-xl overflow-hidden">
        <button
          onClick={() => setHowOpen(!howOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition text-left"
        >
          <span className="font-semibold text-gray-600 text-sm">❓ Як користуватись симулятором?</span>
          <span className="text-gray-400">{howOpen ? '▲' : '▼'}</span>
        </button>
        {howOpen && (
          <div className="px-4 py-4 bg-white grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { n: '1', icon: '📊', t: 'Дивіться на графік', d: 'Графік показує реальну ціну монети у вигляді японських свічок. Зелена свічка — ціна росте. Червона — падає.' },
              { n: '2', icon: '🔍', t: 'Аналізуйте тренд', d: 'Якщо свічки ростуть вгору — тренд бичачий (ціна росте). Якщо вниз — ведмежий. Це ваш сигнал.' },
              { n: '3', icon: '💰', t: 'Відкрийте угоду', d: 'Думаєте ціна зросте? Натисніть "Купити". Думаєте впаде? — "Продати". Введіть суму і підтвердіть.' },
              { n: '4', icon: '🎯', t: 'Закрийте в плюс', d: 'Слідкуйте за P&L (прибуток/збиток). Коли бачите бажаний прибуток — натисніть "Закрити".' },
            ].map(item => (
              <div key={item.n} className="flex gap-2">
                <div className="shrink-0 w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-xs">{item.n}</div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{item.icon} {item.t}</p>
                  <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-4 px-4 py-3 rounded-xl text-center font-semibold text-sm ${
          message.type === 'success' ? 'bg-green-500 text-white' :
          message.type === 'error' ? 'bg-red-500 text-white' :
          'bg-gray-900 text-white'
        }`}>
          {message.text}
        </div>
      )}

      {/* Portfolio stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
          <p className="text-xs text-gray-400">Вільний баланс</p>
          <p className="text-lg font-black text-gray-900">${balance.toFixed(0)}</p>
          <p className="text-xs text-gray-400">USDT</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
          <p className="text-xs text-gray-400">Портфель загалом</p>
          <p className="text-lg font-black text-gray-900">${totalPortfolio.toFixed(0)}</p>
          <p className={`text-xs font-bold ${totalReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(2)}%
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
          <p className="text-xs text-gray-400">Відкриті позиції</p>
          <p className="text-lg font-black text-gray-900">{positions.length}</p>
          <p className="text-xs text-gray-400">угод</p>
        </div>
        <div className={`rounded-xl p-3 shadow-sm border ${totalPnl >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <p className="text-xs text-gray-400">Плаваючий P&L</p>
          <p className={`text-lg font-black ${totalPnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalPnl >= 0 ? '+' : ''}${totalPnl.toFixed(2)}
          </p>
          <p className="text-xs text-gray-400">нереалізований</p>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Chart - 2/3 width */}
        <div className="lg:col-span-2">

          {/* Coin selector with prices */}
          <div className="flex gap-2 mb-3 flex-wrap">
            {COINS.map(coin => {
              const p = prices[coin.symbol];
              const pp = prevPrices[coin.symbol];
              const up = p && pp ? p >= pp : true;
              return (
                <button
                  key={coin.id}
                  onClick={() => setSelectedCoin(coin)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition ${
                    selectedCoin.id === coin.id
                      ? 'bg-gray-900 text-white'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <span>{coin.symbol}</span>
                  {p && (
                    <span className={`text-xs font-normal ${selectedCoin.id === coin.id ? 'text-gray-300' : up ? 'text-green-500' : 'text-red-500'}`}>
                      ${p > 1000 ? (p / 1000).toFixed(1) + 'K' : p.toFixed(2)}
                    </span>
                  )}
                </button>
              );
            })}
            {loading && <span className="text-xs text-gray-400 self-center">Завантаження цін...</span>}
          </div>

          {/* TradingView Chart */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden" style={{ height: '420px' }}>
            <TradingViewWidget tvSymbol={selectedCoin.tvSymbol} />
          </div>
        </div>

        {/* Trading panel - 1/3 width */}
        <div className="space-y-4">

          {/* Current price display */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-500">{selectedCoin.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${priceUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {priceUp ? '▲' : '▼'} LIVE
              </span>
            </div>
            <div className={`text-3xl font-black ${priceUp ? 'text-green-600' : 'text-red-600'}`}>
              {loading ? '...' : currentPrice ? `$${currentPrice.toLocaleString()}` : 'Н/Д'}
            </div>
          </div>

          {/* Trading form */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="font-black text-gray-900 mb-3 text-sm">Відкрити угоду</h3>

            {/* Amount type toggle */}
            <div className="flex gap-1 mb-3 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setAmountType('usd')}
                className={`flex-1 py-1.5 rounded-md text-xs font-bold transition ${amountType === 'usd' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
              >
                В доларах ($)
              </button>
              <button
                onClick={() => setAmountType('coin')}
                className={`flex-1 py-1.5 rounded-md text-xs font-bold transition ${amountType === 'coin' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
              >
                В монетах
              </button>
            </div>

            {/* Amount input */}
            <div className="mb-2">
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder={amountType === 'usd' ? 'Сума в USD...' : `Кількість ${selectedCoin.symbol}...`}
                className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {usdEquivalent !== null && usdEquivalent > 0 && (
                <p className="text-xs text-gray-400 mt-1">≈ ${usdEquivalent.toFixed(2)}</p>
              )}
            </div>

            {/* Quick amounts */}
            <div className="flex gap-1 mb-3">
              {(amountType === 'usd' ? [100, 500, 1000, 2000] : [0.001, 0.01, 0.1]).map(v => (
                <button key={v} onClick={() => setAmount(String(v))}
                  className="flex-1 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-bold text-gray-600 transition">
                  {amountType === 'usd' ? `$${v}` : v}
                </button>
              ))}
            </div>

            {/* Available balance hint */}
            <p className="text-xs text-gray-400 mb-3">
              Доступно: <span className="font-bold text-gray-700">${balance.toFixed(0)}</span>
            </p>

            {/* Buy/Sell buttons */}
            <div className="space-y-2">
              <button
                onClick={() => openPosition('buy')}
                disabled={!currentPrice}
                className="w-full py-3.5 bg-green-500 hover:bg-green-600 disabled:opacity-40 text-white font-black rounded-xl transition text-sm"
              >
                📈 Купити / Long
                <span className="block text-xs font-normal opacity-80">Ставка на зростання ціни</span>
              </button>
              <button
                onClick={() => openPosition('sell')}
                disabled={!currentPrice}
                className="w-full py-3.5 bg-red-500 hover:bg-red-600 disabled:opacity-40 text-white font-black rounded-xl transition text-sm"
              >
                📉 Продати / Short
                <span className="block text-xs font-normal opacity-80">Ставка на падіння ціни</span>
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700 space-y-1">
            <p className="font-bold">💡 Підказка:</p>
            <p><span className="font-bold">Long (Купити)</span> — заробляєш коли ціна РОСТЕ</p>
            <p><span className="font-bold">Short (Продати)</span> — заробляєш коли ціна ПАДАЄ</p>
            <p><span className="font-bold">P&L</span> — прибуток або збиток позиції</p>
          </div>
        </div>
      </div>

      {/* Positions & History */}
      <div className="mt-4 bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setTab('positions')}
            className={`flex-1 py-3 font-bold text-sm transition ${tab === 'positions' ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-500' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            📂 Відкриті позиції ({positions.length})
          </button>
          <button
            onClick={() => setTab('history')}
            className={`flex-1 py-3 font-bold text-sm transition ${tab === 'history' ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-500' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            📋 Історія угод ({history.length})
          </button>
        </div>

        <div className="p-4">
          {tab === 'positions' && (
            positions.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-4xl mb-2">📊</p>
                <p className="text-gray-500 font-semibold">Немає відкритих позицій</p>
                <p className="text-gray-400 text-sm mt-1">Подивіться на графік і відкрийте першу угоду!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {positions.map(pos => {
                  const pnl = getPnl(pos);
                  const pct = getPnlPercent(pos);
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
                            <div>
                              <p className="text-gray-400">Розмір</p>
                              <p className="font-bold">${pos.usdAmount.toFixed(0)}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Ціна входу</p>
                              <p className="font-bold">${pos.entryPrice.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Поточна</p>
                              <p className="font-bold">${currentP?.toLocaleString() ?? '...'}</p>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4 text-right">
                          <p className={`text-xl font-black ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
                          </p>
                          <p className={`text-sm font-bold ${pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {pct >= 0 ? '+' : ''}{pct.toFixed(2)}%
                          </p>
                          <button
                            onClick={() => closePosition(pos)}
                            className="mt-2 px-4 py-2 bg-gray-900 hover:bg-gray-700 text-white text-xs font-black rounded-lg transition block w-full"
                          >
                            Закрити
                          </button>
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
                <p className="text-gray-500 font-semibold">Історія порожня</p>
                <p className="text-gray-400 text-sm mt-1">Закрийте першу позицію щоб побачити результат</p>
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
                        <span className="text-xs text-gray-400">{h.closedAt}</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        ${h.usdAmount.toFixed(0)} · {h.entryPrice.toLocaleString()} → {h.exitPrice.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`font-black text-sm ${h.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {h.pnl >= 0 ? '+' : ''}${h.pnl.toFixed(2)}
                      </p>
                      <p className={`text-xs ${h.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {((h.pnl / h.usdAmount) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-4">
        * Реальні ціни CoinGecko. Всі угоди віртуальні — реальні гроші не задіяні. Графік: TradingView.
      </p>
    </div>
  );
}
