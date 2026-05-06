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
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
