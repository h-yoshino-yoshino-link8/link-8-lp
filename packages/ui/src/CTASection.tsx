"use client";

import { CTAButton } from "./CTAButton";
import { PhoneButton } from "./PhoneButton";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  ctaText: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  phone?: string;
  phoneHref?: string;
  onPhoneClick?: () => void;
  badges?: string[];
  microCopy?: string;
  dark?: boolean;
}

export function CTASection({
  title = "まずは無料でご相談ください",
  subtitle = "見積りまで完全無料。お気軽にお問い合わせください。",
  ctaText,
  ctaHref = "#contact",
  onCtaClick,
  phone,
  phoneHref,
  onPhoneClick,
  badges = ["相談無料", "現場調査無料", "見積り無料", "キャンセル料なし"],
  dark = true,
}: CTASectionProps) {
  const bg = dark
    ? "bg-gradient-to-br from-link-navy via-[#1e3a5f] to-link-dark"
    : "bg-white";
  const textColor = dark ? "text-white" : "text-link-dark";

  return (
    <div id="contact" className={`w-full h-full ${bg} flex items-center justify-center px-4`}>
      <div className="w-full max-w-md mx-auto text-center">
        <p className={`${dark ? "text-link-gold" : "text-link-orange"} font-bold text-sm tracking-wider mb-3`}>
          CONTACT
        </p>
        <h2 className={`${textColor} text-2xl sm:text-3xl font-bold mb-3`}>
          {title}
        </h2>
        <p className={`${dark ? "text-white/70" : "text-link-gray"} text-sm mb-8`}>
          {subtitle}
        </p>

        <div className="space-y-4">
          <CTAButton text={ctaText} href={ctaHref} onClick={onCtaClick} pulse />
          {phone && phoneHref && (
            <PhoneButton phone={phone} phoneHref={phoneHref} onClick={onPhoneClick} dark={dark} />
          )}
        </div>

        {badges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {badges.map((badge) => (
              <span
                key={badge}
                className={`${dark ? "bg-link-gold/20 text-link-gold border-link-gold/30" : "bg-link-orange/10 text-link-orange border-link-orange/30"} text-xs font-bold px-3 py-1.5 rounded-full border`}
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
