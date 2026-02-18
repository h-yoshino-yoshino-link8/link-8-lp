"use client";

import Link from "next/link";
import { SwiperLP } from "@link8/ui";
import { trackSlideView, trackCtaClick, trackTelClick } from "@link8/tracking";
import { company, areas, type AreaData, type ServiceData } from "@link8/data";

interface AreaLPTemplateProps {
  area: AreaData;
  service: ServiceData;
}

// ============================================================
// Slide 1: First View
// ============================================================
function SlideHero({ area, service }: AreaLPTemplateProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-link-navy via-[#1e3a5f] to-link-dark flex items-center justify-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
        <p className="text-white/60 text-sm tracking-[0.3em] mb-6 animate-fade-in-up">
          {company.name}
        </p>

        {/* Area badge */}
        <span className="inline-block bg-link-gold/20 text-link-gold text-sm font-bold px-4 py-1.5 rounded-full border border-link-gold/30 mb-4 animate-fade-in-up">
          {area.prefecture}
          {area.name}エリア対応
        </span>

        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 animate-fade-in-up animate-delay-100">
          {area.name}の{service.name}を、
          <br />
          <span className="text-link-gold">整える。</span>
        </h1>

        <p className="text-white/70 text-base sm:text-lg mb-8 animate-fade-in-up animate-delay-200">
          つなぐ、整える。
          <br />
          {company.network}の専門家ネットワークで
          <br className="sm:hidden" />
          {service.name}をまるごとサポート
        </p>

        {/* CTA */}
        <div className="flex flex-col gap-3 animate-fade-in-up animate-delay-300">
          <a
            href={`${company.hpUrl}/contact/construction`}
            onClick={() => trackCtaClick("area_hero_cta")}
            className="cta-pulse inline-block bg-link-orange hover:bg-accent-600 text-white font-bold text-lg py-4 px-8 rounded-full transition-colors"
          >
            無料で工事を相談する
          </a>
          <a
            href={company.phoneHref}
            onClick={() => trackTelClick()}
            className="inline-block text-white/80 hover:text-white text-sm underline underline-offset-4"
          >
            お電話はこちら: {company.phone}
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex justify-center gap-4 mt-8 animate-fade-in-up animate-delay-400">
          {company.badges.map((badge) => (
            <span
              key={badge}
              className="bg-white/10 backdrop-blur-sm text-white/90 text-xs px-3 py-1.5 rounded-full border border-white/20"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-hint">
          <svg
            className="w-6 h-6 text-white/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Slide 2: Area Features
// ============================================================
function SlideAreaFeatures({ area, service }: AreaLPTemplateProps) {
  return (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto text-center">
        <p className="text-link-orange font-bold text-sm tracking-wider mb-1">
          AREA
        </p>
        <h2 className="text-2xl font-bold text-link-dark mb-1">
          {area.name}の{service.name}事情
        </h2>
        <p className="text-link-gray text-sm mb-5">
          地域特性を理解した対応をお約束します
        </p>

        {/* Area description */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 text-left mb-4">
          <p className="text-link-dark text-sm leading-relaxed">
            {area.description}
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3">
          {area.features.map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 text-left flex gap-3 items-center"
            >
              <span className="w-8 h-8 bg-link-navy/10 text-link-navy rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                {i + 1}
              </span>
              <p className="text-link-dark text-sm font-medium">{feature}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-link-dark font-bold text-base">
          {area.name}の{service.name}は
          <span className="text-link-orange"> LinK </span>
          にお任せください
        </p>
      </div>
    </div>
  );
}

// ============================================================
// Slide 3: LinK Strengths
// ============================================================
function SlideStrengths() {
  const strengths = [
    {
      icon: "🤝",
      title: `協力会社${company.network}`,
      desc: "豊富な専門家ネットワークで、あらゆる工事に迅速対応。最適な職人をアサインします。",
      color: "bg-blue-50 border-blue-200",
    },
    {
      icon: "⚡",
      title: "即日対応可能",
      desc: "急な退去や緊急工事にも対応。スピーディーな現場調査と見積提出を実現します。",
      color: "bg-green-50 border-green-200",
    },
    {
      icon: "📸",
      title: "写真付き進捗報告",
      desc: "工事の各工程を写真で記録・共有。現場に行かなくても状況をリアルタイムで把握できます。",
      color: "bg-amber-50 border-amber-200",
    },
  ];

  return (
    <div className="w-full h-full bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto text-center">
        <p className="text-link-navy font-bold text-sm tracking-wider mb-1">
          STRENGTH
        </p>
        <h2 className="text-2xl font-bold text-link-dark mb-5">
          LinKの
          <span className="text-link-orange">対応力</span>
        </h2>

        <div className="space-y-4">
          {strengths.map((s, i) => (
            <div
              key={i}
              className={`rounded-xl p-5 border ${s.color} text-left`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{s.icon}</span>
                <h3 className="font-bold text-link-dark text-lg">{s.title}</h3>
              </div>
              <p className="text-link-gray text-sm leading-relaxed pl-10">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Slide 4: Why LinK
// ============================================================
function SlideReasons() {
  const reasons = [
    {
      num: "01",
      title: "内訳付き見積",
      desc: "材料費・人件費・諸経費をすべて明記。何にいくらかかるか一目で分かる見積書をお出しします。",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      num: "02",
      title: "中間搾取なし",
      desc: "専門工事会社と直接つなぐネットワーク。余計な中間マージンがないから適正価格を実現。",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
    },
    {
      num: "03",
      title: "写真付き進捗報告",
      desc: "工事の各工程を写真で記録・共有。現場に行かなくてもリアルタイムで状況を把握できます。",
      color: "bg-amber-50 border-amber-200",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto text-center">
        <p className="text-link-navy font-bold text-sm tracking-wider mb-1">
          WHY LinK
        </p>
        <h2 className="text-2xl font-bold text-link-dark mb-5">
          選ばれる
          <span className="text-link-orange">3</span>
          つの理由
        </h2>

        <div className="space-y-4">
          {reasons.map((r) => (
            <div
              key={r.num}
              className={`rounded-xl p-5 border ${r.color} text-left`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`${r.iconColor} font-black text-2xl leading-none`}
                >
                  {r.num}
                </span>
                <h3 className="font-bold text-link-dark text-lg">{r.title}</h3>
              </div>
              <p className="text-link-gray text-sm leading-relaxed pl-10">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Slide 5: CTA + Nearby Areas
// ============================================================
function SlideCta({ area, service }: AreaLPTemplateProps) {
  const nearbyAreas = areas.filter((a) => a.slug !== area.slug).slice(0, 4);

  return (
    <div
      id="contact"
      className="w-full h-full bg-gradient-to-br from-link-navy via-[#1e3a5f] to-link-dark flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md mx-auto text-center">
        <p className="text-link-gold font-bold text-sm tracking-wider mb-3">
          CONTACT
        </p>
        <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">
          {area.name}の{service.name}を
          <br />
          無料で相談する
        </h2>
        <p className="text-white/70 text-sm mb-6">
          見積りまで完全無料。お気軽にお問い合わせください。
        </p>

        {/* CTA buttons */}
        <div className="space-y-4 mb-8">
          <a
            href={`${company.hpUrl}/contact/construction`}
            onClick={() => trackCtaClick("area_final_cta_form")}
            className="cta-pulse block bg-link-orange hover:bg-accent-600 text-white font-bold text-lg py-4 px-8 rounded-full transition-colors"
          >
            無料で工事を相談する
          </a>
          <a
            href={company.phoneHref}
            onClick={() => trackTelClick()}
            className="block bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-full border border-white/20 transition-colors"
          >
            お電話: {company.phone}
          </a>
        </div>

        {/* Zero-risk badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {["相談無料", "現場調査無料", "見積り無料", "キャンセル料なし"].map(
            (badge) => (
              <span
                key={badge}
                className="bg-link-gold/20 text-link-gold text-xs font-bold px-3 py-1.5 rounded-full border border-link-gold/30"
              >
                {badge}
              </span>
            )
          )}
        </div>

        {/* Nearby areas */}
        <div className="border-t border-white/10 pt-6">
          <p className="text-white/50 text-xs mb-3">近隣エリアも対応中</p>
          <div className="flex flex-wrap justify-center gap-2">
            {nearbyAreas.map((a) => (
              <Link
                key={a.slug}
                href={`/${a.slug}/${service.slug}`}
                className="bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs px-3 py-1.5 rounded-full border border-white/10 transition-colors"
              >
                {a.name}
              </Link>
            ))}
          </div>
        </div>

        {/* HP link */}
        <div className="mt-6">
          <a
            href={company.hpUrl}
            className="text-white/50 hover:text-white/80 text-xs underline underline-offset-4 transition-colors"
          >
            {company.name} 公式サイト
          </a>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Main AreaLPTemplate
// ============================================================
export default function AreaLPTemplate({ area, service }: AreaLPTemplateProps) {
  const handleSlideChange = (index: number) => {
    trackSlideView(index);
  };

  const slides = [
    <SlideHero key="hero" area={area} service={service} />,
    <SlideAreaFeatures key="area-features" area={area} service={service} />,
    <SlideStrengths key="strengths" />,
    <SlideReasons key="reasons" />,
    <SlideCta key="cta" area={area} service={service} />,
  ];

  return <SwiperLP slides={slides} onSlideChange={handleSlideChange} />;
}
