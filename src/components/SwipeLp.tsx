"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { trackSlideView, trackCtaClick, trackTelClick } from "@/lib/tracking";

import "swiper/css";
import "swiper/css/pagination";

const PHONE = "03-6825-2464";
const PHONE_HREF = "tel:0368252464";
const HP_URL = "https://link-8-site.vercel.app";

// ============================================================
// Slide 1: ファーストビュー
// ============================================================
function SlideHero() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-link-navy via-[#1e3a5f] to-link-dark flex items-center justify-center overflow-hidden">
      {/* 背景パターン */}
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
        {/* ロゴ / 社名 */}
        <p className="text-white/60 text-sm tracking-[0.3em] mb-6 animate-fade-in-up">
          株式会社LinK
        </p>

        {/* メインコピー */}
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 animate-fade-in-up animate-delay-100">
          原状回復を、
          <br />
          <span className="text-link-gold">整える。</span>
        </h1>

        {/* サブコピー */}
        <p className="text-white/70 text-base sm:text-lg mb-8 animate-fade-in-up animate-delay-200">
          つなぐ、整える。
          <br />
          60社以上の専門家ネットワークで
          <br className="sm:hidden" />
          原状回復をまるごとサポート
        </p>

        {/* CTA */}
        <div className="flex flex-col gap-3 animate-fade-in-up animate-delay-300">
          <a
            href="#contact"
            onClick={() => trackCtaClick("hero_cta")}
            className="cta-pulse inline-block bg-link-orange hover:bg-accent-600 text-white font-bold text-lg py-4 px-8 rounded-full transition-colors"
          >
            無料で工事を相談する
          </a>
          <a
            href={PHONE_HREF}
            onClick={() => trackTelClick()}
            className="inline-block text-white/80 hover:text-white text-sm underline underline-offset-4"
          >
            お電話はこちら: {PHONE}
          </a>
        </div>

        {/* 信頼バッジ */}
        <div className="flex justify-center gap-4 mt-8 animate-fade-in-up animate-delay-400">
          {["建設業許可取得", "社会保険完備", "協力会社60社+"].map((badge) => (
            <span
              key={badge}
              className="bg-white/10 backdrop-blur-sm text-white/90 text-xs px-3 py-1.5 rounded-full border border-white/20"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* スクロールヒント */}
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
// Slide 2: 悩み（損失回避フレーム）
// ============================================================
function SlidePains() {
  const pains = [
    {
      icon: "📋",
      title: "見積もりが不透明",
      desc: "何にいくらかかっているか分からない。内訳を求めても出てこない。",
    },
    {
      icon: "💸",
      title: "中間マージンへの不安",
      desc: "何社も挟んで費用が膨らんでいないか？適正価格が分からない。",
    },
    {
      icon: "👁️",
      title: "進捗が見えない",
      desc: "今どこまで進んでいるのか。完了報告まで現場の状況が分からない。",
    },
  ];

  return (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-lg mx-auto text-center">
        <p className="text-link-orange font-bold text-sm tracking-wider mb-2">
          PROBLEM
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-link-dark mb-2">
          こんなお悩みありませんか？
        </h2>
        <p className="text-link-gray text-sm mb-8">
          管理会社様から多く寄せられる声です
        </p>

        <div className="space-y-4">
          {pains.map((pain, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 shadow-sm border border-red-100 text-left flex gap-4 items-start"
            >
              <span className="text-2xl flex-shrink-0">{pain.icon}</span>
              <div>
                <h3 className="font-bold text-link-dark text-base mb-1">
                  {pain.title}
                </h3>
                <p className="text-link-gray text-sm leading-relaxed">
                  {pain.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-link-dark font-bold text-lg">
          その不安、
          <span className="text-link-orange">LinK</span>
          が解消します
        </p>
      </div>
    </div>
  );
}

// ============================================================
// Slide 3: 選ばれる3つの理由
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
    <div className="w-full h-full bg-white flex items-center justify-center px-6">
      <div className="max-w-lg mx-auto text-center">
        <p className="text-link-navy font-bold text-sm tracking-wider mb-2">
          WHY LinK
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-link-dark mb-8">
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
// Slide 4: 施工事例 Before/After
// ============================================================
function SlideWorks() {
  const works = [
    { label: "1K マンション原状回復", before: "#94a3b8", after: "#3b82f6" },
    { label: "2LDK 水回りリフォーム", before: "#94a3b8", after: "#3b82f6" },
  ];

  return (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-lg mx-auto text-center">
        <p className="text-link-navy font-bold text-sm tracking-wider mb-2">
          WORKS
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-link-dark mb-8">
          施工事例
        </h2>

        <div className="space-y-6">
          {works.map((w, i) => (
            <div key={i}>
              <p className="text-sm font-bold text-link-dark mb-3">
                {w.label}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <div
                    className="aspect-[4/3] rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: w.before }}
                  >
                    Before
                  </div>
                  <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                    施工前
                  </span>
                </div>
                <div className="relative">
                  <div
                    className="aspect-[4/3] rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: w.after }}
                  >
                    After
                  </div>
                  <span className="absolute top-2 left-2 bg-link-orange text-white text-xs px-2 py-0.5 rounded">
                    施工後
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <a
          href={`${HP_URL}/works`}
          onClick={() => trackCtaClick("works_more")}
          className="inline-block mt-6 text-link-navy font-bold text-sm underline underline-offset-4 hover:text-link-orange transition-colors"
        >
          施工事例をもっと見る →
        </a>
      </div>
    </div>
  );
}

// ============================================================
// Slide 5: 代表紹介
// ============================================================
function SlideProfile() {
  return (
    <div className="w-full h-full bg-white flex items-center justify-center px-6">
      <div className="max-w-lg mx-auto text-center">
        <p className="text-link-navy font-bold text-sm tracking-wider mb-2">
          MESSAGE
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-link-dark mb-6">
          代表あいさつ
        </h2>

        {/* プレースホルダー写真 */}
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-link-navy to-link-dark mx-auto mb-4 flex items-center justify-center">
          <span className="text-white text-4xl font-bold">Y</span>
        </div>

        <h3 className="text-xl font-bold text-link-dark mb-1">吉野 博</h3>
        <p className="text-link-gray text-sm mb-4">
          株式会社LinK 代表取締役
        </p>

        <div className="bg-slate-50 rounded-xl p-5 text-left space-y-3">
          <p className="text-sm text-link-dark leading-relaxed">
            建設業界で<strong>11年</strong>
            。現場で感じた「不透明さ」をなくしたい。
            その一心でLinKを立ち上げました。
          </p>
          <p className="text-sm text-link-dark leading-relaxed">
            <strong>60社以上</strong>
            の専門家ネットワークを活かし、
            管理会社様が「原状回復を忘れられる状態」をつくることが私の使命です。
          </p>
          <p className="text-sm text-link-dark leading-relaxed font-bold">
            「建物に関わるすべての仕事を、まっとうにする。」
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <span className="bg-link-navy/5 text-link-navy text-xs px-3 py-1.5 rounded-full font-medium">
            業界歴11年
          </span>
          <span className="bg-link-navy/5 text-link-navy text-xs px-3 py-1.5 rounded-full font-medium">
            60社+ネットワーク
          </span>
          <span className="bg-link-navy/5 text-link-navy text-xs px-3 py-1.5 rounded-full font-medium">
            関東一都三県
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Slide 6: ご利用の流れ
// ============================================================
function SlideFlow() {
  const steps = [
    {
      num: 1,
      title: "無料相談",
      desc: "お電話・フォームで気軽にご相談",
      free: true,
    },
    {
      num: 2,
      title: "現場確認",
      desc: "担当者が現場を訪問・調査",
      free: true,
    },
    {
      num: 3,
      title: "見積提出",
      desc: "内訳付きの明瞭な見積書",
      free: true,
    },
    { num: 4, title: "工事開始", desc: "写真付きで進捗を随時報告", free: false },
    { num: 5, title: "完了報告", desc: "仕上がり確認・お引き渡し", free: false },
  ];

  return (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-lg mx-auto text-center">
        <p className="text-link-navy font-bold text-sm tracking-wider mb-2">
          FLOW
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-link-dark mb-2">
          ご利用の流れ
        </h2>
        <p className="text-link-orange font-bold text-sm mb-8">
          見積りまですべて無料
        </p>

        <div className="space-y-3">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-center gap-4 text-left">
              {/* ステップ番号 */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                  step.free
                    ? "bg-link-orange text-white"
                    : "bg-link-navy text-white"
                }`}
              >
                {step.num}
              </div>

              {/* コンテンツ */}
              <div className="flex-1 bg-white rounded-lg p-3 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-link-dark text-sm">
                    {step.title}
                  </h3>
                  {step.free && (
                    <span className="bg-link-orange/10 text-link-orange text-xs font-bold px-2 py-0.5 rounded">
                      無料
                    </span>
                  )}
                </div>
                <p className="text-link-gray text-xs mt-0.5">{step.desc}</p>
              </div>

              {/* コネクタライン */}
              {i < steps.length - 1 && (
                <div className="absolute left-[38px] mt-10 w-px h-3 bg-slate-200 hidden" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Slide 7: 最終CTA
// ============================================================
function SlideCta() {
  return (
    <div
      id="contact"
      className="w-full h-full bg-gradient-to-br from-link-navy via-[#1e3a5f] to-link-dark flex items-center justify-center px-6"
    >
      <div className="max-w-lg mx-auto text-center">
        <p className="text-link-gold font-bold text-sm tracking-wider mb-4">
          CONTACT
        </p>
        <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">
          まずは無料でご相談ください
        </h2>
        <p className="text-white/70 text-sm mb-8">
          見積りまで完全無料。お気軽にお問い合わせください。
        </p>

        {/* CTAボタン */}
        <div className="space-y-4">
          <a
            href={`${HP_URL}/contact/construction`}
            onClick={() => trackCtaClick("final_cta_form")}
            className="cta-pulse block bg-link-orange hover:bg-accent-600 text-white font-bold text-lg py-4 px-8 rounded-full transition-colors"
          >
            無料で工事を相談する
          </a>

          <a
            href={PHONE_HREF}
            onClick={() => trackTelClick()}
            className="block bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-full border border-white/20 transition-colors"
          >
            📞 お電話: {PHONE}
          </a>
        </div>

        {/* ゼロリスクバッジ */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {[
            "相談無料",
            "現場調査無料",
            "見積り無料",
            "キャンセル料なし",
          ].map((badge) => (
            <span
              key={badge}
              className="bg-link-gold/20 text-link-gold text-xs font-bold px-3 py-1.5 rounded-full border border-link-gold/30"
            >
              ✓ {badge}
            </span>
          ))}
        </div>

        {/* 希少性 */}
        <p className="text-white/50 text-xs mt-6">
          ※ 対応エリア: 関東一都三県 / 繁忙期は受付を制限する場合がございます
        </p>

        {/* HPリンク */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <a
            href={HP_URL}
            className="text-white/50 hover:text-white/80 text-xs underline underline-offset-4 transition-colors"
          >
            株式会社LinK 公式サイト →
          </a>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// メイン SwipeLp コンポーネント
// ============================================================
export default function SwipeLp() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleSlideChange = (swiper: SwiperType) => {
    trackSlideView(swiper.activeIndex);
  };

  const slides = [
    <SlideHero key="hero" />,
    <SlidePains key="pains" />,
    <SlideReasons key="reasons" />,
    <SlideWorks key="works" />,
    <SlideProfile key="profile" />,
    <SlideFlow key="flow" />,
    <SlideCta key="cta" />,
  ];

  // モバイル: 縦スワイプ
  if (isMobile) {
    return (
      <Swiper
        direction="vertical"
        modules={[Pagination, Mousewheel, Keyboard]}
        pagination={{ clickable: true }}
        mousewheel={true}
        keyboard={true}
        speed={600}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        className="swiper"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>{slide}</SwiperSlide>
        ))}
      </Swiper>
    );
  }

  // PC: 通常スクロール
  return (
    <div className="w-full">
      {slides.map((slide, i) => (
        <section
          key={i}
          className="min-h-screen flex items-center justify-center"
        >
          {slide}
        </section>
      ))}
    </div>
  );
}
