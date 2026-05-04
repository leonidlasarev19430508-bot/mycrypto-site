import Link from 'next/link';
import ChatWidget from './components/ChatWidget';
import "./globals.css";

export const metadata = {
  title: "Crypto Navigator",
  description: "Find the best crypto exchanges",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-black text-white p-4">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
            <Link href="/" className="font-bold text-xl hover:text-gray-300">
              CryptoNavigator
            </Link>

            <nav className="flex flex-wrap gap-6">
              <Link href="/" className="hover:text-gray-300">Home</Link>
              <Link href="/markets" className="hover:text-gray-300">Markets</Link>
              <Link href="/news" className="hover:text-gray-300">AI News</Link>
              <Link href="/assistant" className="hover:text-gray-300">AI Assistant</Link>
            </nav>
          </div>
        </header>

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="bg-gray-100 text-gray-600 text-center py-6 mt-12">
          <div className="max-w-6xl mx-auto px-4">
            <p>© 2026 CryptoNavigator. AI-powered crypto insights.</p>
          </div>
        </footer>

        {/* Додаємо чат-віджет */}
        <ChatWidget />
      </body>
    </html>
  );
}