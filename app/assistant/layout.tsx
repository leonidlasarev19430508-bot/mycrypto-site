import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AI Крипто Асистент — Персональний Консультант 24/7 | CryptoNavigator",
  description: "Безкоштовний AI-консультант з криптовалют на базі Claude від Anthropic. Отримай персональні рекомендації щодо бірж, інвестицій та торгівлі. Працює 24/7.",
  alternates: { canonical: "https://cryptotop.chat/assistant" },
};

export default function AssistantLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
