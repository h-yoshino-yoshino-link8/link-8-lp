"use client";

import { SwiperLP } from "@link8/ui";
import { company } from "@link8/data";
import { trackSlideView, trackCtaClick, trackTelClick } from "@link8/tracking";

const PHONE = company.phone;
const PHONE_HREF = company.phoneHref;
const HP_URL = company.hpUrl;

// ============================================================
// Slide 1: ファーストビュー - 太陽光パネル設置のメリット概要
// ============================================================
function SlideHero() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#0f172a] flex items-center justify-center overflow-hidden">
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

      {/* 太陽イメージ */}
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-yellow-300/20 to-yellow-500/10 blur-2xl" />

      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
        <p className="text-white/60 text-sm tracking-[0.3em] mb-4 animate-fade-in-up">
          SOLAR PANEL
        </p>

        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 animate-fade-in-up animate-delay-100">
          屋根が、
          <br />
          <span className="text-[#22c55e]">収益を生む。</span>
        </h1>

        <p className="text-white/70 text-base sm:text-lg mb-6 animate-fade-in-up animate-delay-200">
          賃貸物件の屋根を活用して
          <br />
          新たな収益源をつくりませんか？
        </p>

        <div className="grid grid-cols-3 gap-3 mb-6 animate-fade-in-up animate-delay-300">
          {[
            { value: "0円", label: "初期負担" },
            { value: "15年", label: "投資回収" },
            { value: "UP", label: "物件価値" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <p className="text-[#22c55e] text-2xl font-black">{stat.value}</p>
              <p className="text-white/60 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 animate-fade-in-up animate-delay-400">
          <a
            href="#contact"
            onClick={() => trackCtaClick("solar_hero_cta")}
            className="cta-pulse inline-block bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-lg py-4 px-8 rounded-full transition-colors"
          >
            無料で屋根診断する
          </a>
          <a
            href={PHONE_HREF}
            onClick={() => trackTelClick()}
            className="inline-block text-white/80 hover:text-white text-sm underline underline-offset-4"
          >
            お電話はこちら: {PHONE}
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-hint">
          <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Slide 2: メリット3つ
// ============================================================
function SlideBenefits() {
  const benefits = [
    {
      num: "01",
      title: "初期費用回収シミュレーション",
      desc: "設置費用と売電収入の回収計画を事前にシミュレーション。投資対効果を数字で確認してから判断できます。",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
    },
    {
      num: "02",
      title: "ワンストップ対応",
      desc: "屋根の診断・設計・施工・各種申請手続きまで、すべてLinKが一括対応。複数業者との調整は不要です。",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      num: "03",
      title: "入居者満足度の向上",
      desc: "共用部の電力コスト削減や、環境配慮型物件としてのブランディング。入居者への付加価値が生まれます。",
      color: "bg-amber-50 border-amber-200",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <div className="w-full h-full bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto text-center">
        <p className="text-[#22c55e] font-bold text-sm tracking-wider mb-1">
          MERIT
        </p>
        <h2 className="text-2xl font-bold text-link-dark mb-5">
          太陽光パネルの<span className="text-[#22c55e]">3</span>つのメリット
        </h2>

        <div className="space-y-4">
          {benefits.map((b) => (
            <div
              key={b.num}
              className={`rounded-xl p-5 border ${b.color} text-left`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className={`${b.iconColor} font-black text-2xl leading-none`}>
                  {b.num}
                </span>
                <h3 className="font-bold text-link-dark text-lg">{b.title}</h3>
              </div>
              <p className="text-link-gray text-sm leading-relaxed pl-10">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Slide 3: 導入フロー
// ============================================================
function SlideFlow() {
  const steps = [
    {
      num: 1,
      title: "無料屋根診断",
      desc: "屋根の形状・方角・日照条件を現地調査",
      free: true,
    },
    {
      num: 2,
      title: "設置提案",
      desc: "収支シミュレーション付きのご提案書",
      free: true,
    },
    {
      num: 3,
      title: "設置工事",
      desc: "各種申請手続き + パネル設置施工",
      free: false,
    },
    {
      num: 4,
      title: "アフターサポート",
      desc: "定期点検・発電量モニタリング",
      free: false,
    },
  ];

  return (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto text-center">
        <p className="text-[#22c55e] font-bold text-sm tracking-wider mb-1">
          FLOW
        </p>
        <h2 className="text-2xl font-bold text-link-dark mb-1">
          導入の流れ
        </h2>
        <p className="text-[#22c55e] font-bold text-sm mb-5">
          診断から提案まで完全無料
        </p>

        <div className="space-y-3">
          {steps.map((step) => (
            <div key={step.num} className="flex items-center gap-4 text-left">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                  step.free
                    ? "bg-[#22c55e] text-white"
                    : "bg-link-navy text-white"
                }`}
              >
                {step.num}
              </div>
              <div className="flex-1 bg-white rounded-lg p-3 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-link-dark text-sm">
                    {step.title}
                  </h3>
                  {step.free && (
                    <span className="bg-[#22c55e]/10 text-[#22c55e] text-xs font-bold px-2 py-0.5 rounded">
                      無料
                    </span>
                  )}
                </div>
                <p className="text-link-gray text-xs mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <p className="text-link-gray text-sm">
            設置後も定期的な点検とメンテナンスで
            <br />
            <strong className="text-link-dark">長期的な発電効率</strong>を維持します。
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Slide 4: CTA - 無料屋根診断申込
// ============================================================
function SlideCta() {
  return (
    <div
      id="contact"
      className="w-full h-full bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#0f172a] flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md mx-auto text-center">
        <p className="text-[#22c55e] font-bold text-sm tracking-wider mb-3">
          FREE DIAGNOSIS
        </p>
        <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">
          まずは無料の屋根診断から
        </h2>
        <p className="text-white/70 text-sm mb-8">
          お持ちの物件の屋根が太陽光に適しているか無料で診断します。
          <br />
          設置の義務はありません。
        </p>

        <div className="space-y-4">
          <a
            href={`${HP_URL}/contact/construction`}
            onClick={() => trackCtaClick("solar_final_cta")}
            className="cta-pulse block bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-lg py-4 px-8 rounded-full transition-colors"
          >
            無料で屋根診断する
          </a>

          <a
            href={PHONE_HREF}
            onClick={() => trackTelClick()}
            className="block bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-full border border-white/20 transition-colors"
          >
            お電話: {PHONE}
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {["屋根診断無料", "見積り無料", "設置義務なし", "関東一都三県対応"].map(
            (badge) => (
              <span
                key={badge}
                className="bg-[#22c55e]/20 text-[#22c55e] text-xs font-bold px-3 py-1.5 rounded-full border border-[#22c55e]/30"
              >
                {badge}
              </span>
            )
          )}
        </div>

        <p className="text-white/50 text-xs mt-6">
          ※ 対応エリア: 関東一都三県 / 屋根の形状・方角により設置不可の場合もあります
        </p>

        <div className="mt-6 pt-4 border-t border-white/10">
          <a
            href={HP_URL}
            className="text-white/50 hover:text-white/80 text-xs underline underline-offset-4 transition-colors"
          >
            {company.name} 公式サイト →
          </a>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// メインコンポーネント
// ============================================================
export default function SwipeLp() {
  const slides = [
    <SlideHero key="hero" />,
    <SlideBenefits key="benefits" />,
    <SlideFlow key="flow" />,
    <SlideCta key="cta" />,
  ];

  return (
    <SwiperLP
      slides={slides}
      onSlideChange={(index) => trackSlideView(index)}
    />
  );
}
