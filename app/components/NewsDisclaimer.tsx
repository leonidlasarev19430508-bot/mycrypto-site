'use client';
import { usePathname } from 'next/navigation';

export default function NewsDisclaimer() {
  const pathname = usePathname();
  const locale = pathname.startsWith('/en') ? 'en'
    : pathname.startsWith('/pl') ? 'pl'
    : pathname.startsWith('/de') ? 'de'
    : 'uk';

  const text = {
    uk: 'Аналіз генерується штучним інтелектом і не є фінансовою порадою. Рекомендації (купити/продати/тримати) носять виключно інформаційний характер.',
    en: 'Analysis is AI-generated and does not constitute financial advice. Buy/sell/hold recommendations are for informational purposes only.',
    pl: 'Analiza jest generowana przez AI i nie stanowi porady finansowej. Rekomendacje (kup/sprzedaj/trzymaj) mają charakter wyłącznie informacyjny.',
    de: 'Die Analyse wird von KI generiert und stellt keine Finanzberatung dar. Kauf-/Verkaufs-/Halteempfehlungen dienen nur zu Informationszwecken.',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mb-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 flex items-start gap-2">
        <span className="text-yellow-600 font-bold text-sm mt-0.5">⚠️</span>
        <p className="text-yellow-700 text-xs leading-relaxed">
          {text[locale as keyof typeof text] || text.uk}
        </p>
      </div>
    </div>
  );
}