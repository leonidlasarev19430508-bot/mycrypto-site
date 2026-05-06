import Link from 'next/link';
import ChatWidget from '../components/ChatWidget';

export default function DELayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="bg-black text-white p-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <Link href="/de" className="font-bold text-xl hover:text-gray-300">
            CryptoNavigator 🇩🇪
          </Link>
          <nav className="flex flex-wrap gap-6">
            <Link href="/de" className="hover:text-gray-300">Startseite</Link>
            <Link href="/markets" className="hover:text-gray-300">Märkte</Link>
            <Link href="/news" className="hover:text-gray-300">AI Nachrichten</Link>
            <Link href="/" className="hover:text-gray-300 text-gray-400 text-sm">🇺🇦 UA</Link>
            <Link href="/pl" className="hover:text-gray-300 text-gray-400 text-sm">🇵🇱 PL</Link>
          </nav>
        </div>
      </header>
      <main className="min-h-screen">
        {children}
      </main>
      <footer className="bg-gray-100 text-gray-600 text-center py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <p>© 2026 CryptoNavigator. KI-gestützte Krypto-Einblicke.</p>
          <p className="text-sm mt-1 text-gray-400">Investieren birgt Risiken. Führe immer eigene Recherchen durch (DYOR).</p>
        </div>
      </footer>
      <ChatWidget />
    </>
  );
}
