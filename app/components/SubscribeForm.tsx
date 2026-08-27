'use client';

import { useState } from 'react';
import t from '../i18n/uk.json';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (res.ok) { setStatus('success'); setEmail(''); }
    else setStatus('error');
  };

  return (
    <div className="mt-10 p-8 rounded-2xl text-center" style={{ backgroundColor: '#FDF6EC', border: '1px solid #F0E0C8' }}>
      <h3 className="text-xl font-bold mb-2">{t.subscribe.title}</h3>
      <p className="text-gray-600 mb-4 text-sm font-medium">{t.subscribe.subtitle}</p>
      <ul className="text-left text-sm text-gray-700 mb-4 space-y-1.5 max-w-xs mx-auto font-medium">
        {t.subscribe.alerts.map((alert, i) => (<li key={i}>{alert}</li>))}
      </ul>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={t.subscribe.placeholder}
          className="flex-1 border border-orange-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
          required
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 font-bold"
        >
          {status === 'sending' ? t.subscribe.sending : t.subscribe.button}
        </button>
      </form>
      {status === 'success' && <p className="text-green-600 mt-2 font-medium">{t.subscribe.success}</p>}
      {status === 'error' && <p className="text-red-600 mt-2 font-medium">{t.subscribe.error}</p>}
    </div>
  );
}