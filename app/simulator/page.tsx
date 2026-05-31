'use client';
import { useState, useEffect, useCallback } from 'react';

const COINS = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', emoji: '₿' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', emoji: 'Ξ' },
  { id: 'solana', symbol: 'SOL', name: 'Solana', emoji: '◎' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB', emoji: '⬡' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP', emoji: '✕' },
];

const INITIAL_BALANCE = 10000;

interface Position {
  id: string;
  coin: string;
  symbol: string;
  type: 'buy' | 'sell';
  amount: number;
  entryPrice: number;
  openedAt: string;
}

interface HistoryItem {
  id: string;
  coin: string;
  symbol: string;
  type: 'buy' | 'sell';
  amount: number;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  closedAt: string;
}

export default function SimulatorPage() {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [positions, setPositions] = useState<Position[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedCoin, setSelectedCoin] = useState(COINS[0]);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [howOpen, setHowOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [tab, setTab] = useState<'positions' | 'history'>('positions');

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cryptonav_simulator');
    if (saved) {
      const data = JSON.parse(saved);
      setBalance(data.balance ?? INITIAL_BALANCE);
      setPositions(data.positions ?? []);
      setHistory(data.history ?? []);
    }
  }, []);

  // Save to localStorage
  const save = useCallback((bal: number, pos: Position[], hist: HistoryItem[]) => {
    localStorage.setItem('cryptonav_simulator', JSON.stringify({ balance: bal, positions: pos, history: hist }));
  }, []);

  // Fetch prices
  const fetchPrices = useCallback(async () => {
    try {
      const ids = COINS.map(c => c.id).join(',');
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
      const data = await res.json();
      const newPrices: Record<string, number> = {};
      COINS.forEach(c => { if (data[c.id]) newPrices[c.symbol] = data[c.id].usd; });
      setPrices(newPrices);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 15000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const openPosition = (type: 'buy' | 'sell') => {
    const usdAmount = parseFloat(amount);
    if (!usdAmount || usdAmount <= 0) return showMessage('Введіть суму угоди');
    if (usdAmount > balance) return showMessage('Недостатньо балансу');
    const price = prices[selectedCoin.symbol];
    if (!price) return showMessage('Ціна недоступна');

    const pos: Position = {
      id: Date.now().toString(),
      coin: selectedCoin.name,
      symbol: selectedCoin.symbol,
      type,
      amount: usdAmount,
      entryPrice: price,
      openedAt: new Date().toLocaleTimeString('uk-UA'),
    };

    const newBalance = balance - usdAmount;
    const newPositions = [...positions, pos];
    setBalance(newBalance);
    setPositions(newPositions);
    save(newBalance, newPositions, history);
    setAmount('');
    showMessage(`✅ ${type === 'buy' ? 'Куплено' : 'Продано'} ${selectedCoin.symbol} на $${usdAmount}`);
  };

  const closePosition = (pos: Position) => {
    const currentPrice = prices[pos.symbol];
    if (!currentPrice) return;

    const pnl = pos.type === 'buy'
      ? pos.amount * (currentPrice - pos.entryPrice) / pos.entryPrice
      : pos.amount * (pos.entryPrice - currentPrice) / pos.entryPrice;

    const returned = pos.amount + pnl;
    const hist: HistoryItem = {
      id: pos.id,
      coin: pos.coin,
      symbol: pos.symbol,
      type: pos.type,
      amount: pos.amount,
      entryPrice: pos.entryPrice,
      exitPrice: currentPrice,
      pnl,
      closedAt: new Date().toLocaleTimeString('uk-UA'),
    };

    const newBalance = balance + returned;
    const newPositions = positions.filter(p => p.id !== pos.id);
    const newHistory = [hist, ...history].slice(0, 20);
    setBalance(newBalance);
    setPositions(newPositions);
    setHistory(newHistory);
    save(newBalance, newPositions, newHistory);
    showMessage(`${pnl >= 0 ? '🎉' : '📉'} Закрито: ${pnl >= 0 ? '+' : ''}$${pnl.toFixed(2)}`);
  };

  const getPnl = (pos: Position) => {
    const current = prices[pos.symbol];
    if (!current) return 0;
    return pos.type === 'buy'
      ? pos.amount * (current - pos.entryPrice) / pos.entryPrice
      : pos.amount * (pos.entryPrice - current) / pos.entryPrice;
  };

  const totalPnl = positions.reduce((sum, p) => sum + getPnl(p), 0);

  const reset = () => {
    if (!confirm('Скинути рахунок до $10,000?')) return;
    setBalance(INITIAL_BALANCE);
    setPositions([]);
    setHistory([]);
    save(INITIAL_BALANCE, [], []);
    showMessage('🔄 Рахунок скинуто до $10,000');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
          🎮 CryptoNavigator Simulator
        </h1>
        <p className="text-gray-500 text-lg">Крипто-Тренажер — торгуй без ризику на реальних цінах</p>
      </div>

      {/* How it works accordion */}
      <div className="mb-6 border border-gray-200 rounded-2xl overflow-hidden">
        <button
          onClick={() => setHowOpen(!howOpen)}
          className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition text-left"
        >
          <span className="font-semibold text-gray-700">❓ Як це працює?</span>
          <span className="text-gray-400 text-xl">{howOpen ? '▲' : '▼'}</span>
        </button>
        {howOpen && (
          <div className="px-5 py-4 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { step: '1', icon: '💰', title: 'Віртуальний баланс', desc: 'Ми вже нарахували вам $10,000 USDT. Справжні гроші не потрібні.' },
                { step: '2', icon: '📊', title: 'Відкрийте позицію', desc: 'Виберіть монету, введіть суму. Купити = ставка на зростання. Продати = на падіння.' },
                { step: '3', icon: '🎯', title: 'Фіксуйте результат', desc: 'Слідкуйте за P&L у реальному часі та закривайте позицію коли захочете.' },
              ].map(item => (
                <div key={item.step} className="flex gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-sm">{item.step}</div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{item.icon} {item.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Message */}
      {message && (
        <div className="mb-4 px-4 py-3 bg-gray-900 text-white rounded-xl text-center font-semibold text-sm">
          {message}
        </div>
      )}

      {/* Balance cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm">
          <p className="text-xs text-gray-400 mb-1">Баланс</p>
          <p className="text-xl font-black text-gray-900">${balance.toFixed(0)}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm">
          <p className="text-xs text-gray-400 mb-1">Відкриті позиції</p>
          <p className="text-xl font-black text-gray-900">{positions.length}</p>
        </div>
        <div className={`rounded-2xl p-4 text-center shadow-sm border ${totalPnl >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <p className="text-xs text-gray-400 mb-1">Нереалізований P&L</p>
          <p className={`text-xl font-black ${totalPnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalPnl >= 0 ? '+' : ''}${totalPnl.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Trading panel */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="font-black text-gray-900 mb-4">Нова угода</h2>

        {/* Coin selector */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {COINS.map(coin => (
            <button
              key={coin.id}
              onClick={() => setSelectedCoin(coin)}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition ${selectedCoin.id === coin.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {coin.symbol}
              {prices[coin.symbol] && (
                <span className="ml-1 font-normal text-xs opacity-80">
                  ${prices[coin.symbol] > 1000 ? (prices[coin.symbol] / 1000).toFixed(1) + 'K' : prices[coin.symbol].toFixed(2)}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Current price */}
        <div className="bg-gray-50 rounded-xl p-3 mb-4 flex items-center justify-between">
          <span className="text-gray-500 text-sm">Поточна ціна {selectedCoin.symbol}</span>
          <span className="font-black text-gray-900">
            {loading ? '...' : prices[selectedCoin.symbol] ? `$${prices[selectedCoin.symbol].toLocaleString()}` : 'Н/Д'}
          </span>
        </div>

        {/* Amount input */}
        <div className="mb-4">
          <label className="text-sm text-gray-500 mb-1 block">Сума угоди (USDT)</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Введіть суму..."
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <div className="flex gap-1">
              {[100, 500, 1000].map(v => (
                <button key={v} onClick={() => setAmount(String(v))}
                  className="px-3 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-bold text-gray-600 transition">
                  ${v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Buy/Sell buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => openPosition('buy')}
            disabled={!prices[selectedCoin.symbol]}
            className="py-4 bg-green-500 hover:bg-green-600 disabled:opacity-40 text-white font-black rounded-xl transition text-lg"
          >
            📈 Купити (Вгору)
          </button>
          <button
            onClick={() => openPosition('sell')}
            disabled={!prices[selectedCoin.symbol]}
            className="py-4 bg-red-500 hover:bg-red-600 disabled:opacity-40 text-white font-black rounded-xl transition text-lg"
          >
            📉 Продати (Вниз)
          </button>
        </div>
      </div>

      {/* Positions & History tabs */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setTab('positions')}
            className={`flex-1 py-3 font-bold text-sm transition ${tab === 'positions' ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-500' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Відкриті позиції ({positions.length})
          </button>
          <button
            onClick={() => setTab('history')}
            className={`flex-1 py-3 font-bold text-sm transition ${tab === 'history' ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-500' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Історія угод ({history.length})
          </button>
        </div>

        {tab === 'positions' && (
          <div className="p-4">
            {positions.length === 0 ? (
              <p className="text-center text-gray-400 py-8">Немає відкритих позицій. Відкрийте першу угоду!</p>
            ) : (
              <div className="space-y-3">
                {positions.map(pos => {
                  const pnl = getPnl(pos);
                  const currentPrice = prices[pos.symbol];
                  return (
                    <div key={pos.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${pos.type === 'buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {pos.type === 'buy' ? '📈 КУПИВ' : '📉 ПРОДАВ'}
                          </span>
                          <span className="font-bold text-gray-900">{pos.symbol}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          ${pos.amount} · Вхід: ${pos.entryPrice.toLocaleString()} · Зараз: ${currentPrice?.toLocaleString() ?? '...'}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className={`font-black text-sm ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
                          </p>
                          <p className={`text-xs ${pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {pnl >= 0 ? '+' : ''}{((pnl / pos.amount) * 100).toFixed(1)}%
                          </p>
                        </div>
                        <button
                          onClick={() => closePosition(pos)}
                          className="px-3 py-2 bg-gray-900 hover:bg-gray-700 text-white text-xs font-bold rounded-lg transition"
                        >
                          Закрити
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {tab === 'history' && (
          <div className="p-4">
            {history.length === 0 ? (
              <p className="text-center text-gray-400 py-8">Історія порожня. Закрийте першу угоду!</p>
            ) : (
              <div className="space-y-2">
                {history.map(h => (
                  <div key={h.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${h.type === 'buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {h.type === 'buy' ? '📈' : '📉'} {h.symbol}
                        </span>
                        <span className="text-xs text-gray-400">{h.closedAt}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        ${h.amount} · {h.entryPrice.toLocaleString()} → {h.exitPrice.toLocaleString()}
                      </p>
                    </div>
                    <p className={`font-black text-sm ${h.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {h.pnl >= 0 ? '+' : ''}${h.pnl.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reset button */}
      <div className="text-center">
        <button onClick={reset} className="text-sm text-gray-400 hover:text-gray-600 underline transition">
          🔄 Скинути рахунок до $10,000
        </button>
      </div>

      <p className="text-center text-xs text-gray-400 mt-4">
        * Симулятор використовує реальні ціни CoinGecko. Всі угоди віртуальні — реальні гроші не задіяні.
      </p>
    </div>
  );
}
