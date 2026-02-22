"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import {
  trackSlideView,
  trackCtaClick,
  trackTelClick,
  trackFormStart,
  trackFormSubmit,
  trackFormAbandon,
  trackScrollDepth,
  trackSectionView,
  setTrackingVariant,
  trackVariantAssigned,
} from "@/lib/tracking";
import { getVariantWithOverride, type ABVariant } from "@/lib/ab-test";

import "swiper/css";
import "swiper/css/pagination";

const PHONE = "03-6825-2464";
const PHONE_HREF = "tel:0368252464";
const HP_URL = "https://link-8.jp";
const FORMSPARK_ID = "qvZdUnofr";

type SlideProps = {
  onCtaClick?: () => void;
  variant?: ABVariant | null;
};

// ============================================================
// Slide 1: 衝撃（Attention）— 損失回避フレーム
// ============================================================
function SlideHero({ onCtaClick, variant }: SlideProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-red-800 via-red-900 to-red-950 flex items-center justify-center overflow-hidden md:py-20 lg:py-28">
      {/* 斜めストライプ警告パターン */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, white 20px, white 22px)",
          }}
        />
      </div>

      {/* 上部ターゲットラベル */}
      <div className="absolute top-0 left-0 w-full bg-black/40 py-2.5 flex items-center justify-center gap-2 z-20">
        <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse" />
        <span className="text-yellow-400 text-xs md:text-sm font-black tracking-wider">
          スレート屋根の工場オーナー様へ
        </span>
        <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-lg md:max-w-3xl lg:max-w-4xl mx-auto pt-12">
        {/* メインコピー */}
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.3] mb-4 md:mb-6 drop-shadow-lg animate-fade-in-up">
          その屋根、
          <br />
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">20kg</span>に
          <br />
          耐えられますか？
        </h1>

        <p className="text-white/80 text-base sm:text-lg md:text-xl font-medium mb-3 leading-relaxed animate-fade-in-up animate-delay-100">
          従来パネル1枚20kg。
          <br />
          スレート屋根には、<strong className="text-yellow-300">重すぎる。</strong>
        </p>

        <p className="text-white/60 text-sm md:text-base mb-8 leading-relaxed animate-fade-in-up animate-delay-200">
          太陽光を載せたいのに「屋根がもたない」と
          <br />
          断られた経験はありませんか。
        </p>

        {/* 重量比較 — 巨大数字 */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 mb-6 animate-fade-in-up animate-delay-300 md:max-w-xl md:mx-auto">
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-5 md:p-6 border-2 border-red-400/50">
            <p className="text-red-300 text-5xl sm:text-6xl md:text-7xl font-black leading-none">
              20<span className="text-3xl sm:text-4xl md:text-5xl">kg</span>
            </p>
            <p className="text-white/60 text-sm md:text-base mt-2 font-bold">従来パネル</p>
            <div className="mt-3 bg-red-500/30 rounded-full py-1 px-3 inline-block">
              <span className="text-red-300 text-xs md:text-sm font-black">設置不可</span>
            </div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-5 md:p-6 border-2 border-emerald-400/50">
            <p className="text-emerald-300 text-5xl sm:text-6xl md:text-7xl font-black leading-none">
              3.7<span className="text-3xl sm:text-4xl md:text-5xl">kg</span>
            </p>
            <p className="text-white/60 text-sm md:text-base mt-2 font-bold">ペラペラ太陽光</p>
            <div className="mt-3 bg-emerald-500/30 rounded-full py-1 px-3 inline-block">
              <span className="text-emerald-300 text-xs md:text-sm font-black">設置OK</span>
            </div>
          </div>
        </div>

        <p className="text-white/50 text-xs md:text-sm animate-fade-in-up animate-delay-400">
          ※従来結晶シリコンパネル平均重量との比較
        </p>

        {/* 信頼バッジ */}
        <div className="flex justify-center gap-2 md:gap-3 mt-6 animate-fade-in-up animate-delay-400 flex-wrap">
          {["建設業許可取得", "屋根補強+太陽光", "全国対応"].map((badge) => (
            <span
              key={badge}
              className="bg-white/10 backdrop-blur-sm text-white/90 text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/20"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* スワイプヒント（モバイルのみ） */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-hint flex flex-col items-center gap-1 md:hidden">
          <span className="text-white/60 text-xs">
            {variant === "scroll" ? "スクロールして詳しく ↓" : "スワイプして詳しく →"}
          </span>
          <svg
            className={`w-6 h-6 text-white/70 ${variant === "scroll" ? "" : "rotate-[-90deg]"}`}
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
// Slide 2: 製品解説（Interest）— 巨大数字で圧倒
// ============================================================
function SlideSolution({ onCtaClick }: SlideProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center overflow-hidden px-4 md:px-8 md:py-20 lg:py-28">
      {/* 背景グロー */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]" />

      <div className="relative z-10 w-full max-w-md md:max-w-3xl lg:max-w-4xl mx-auto text-center">
        <p className="text-emerald-400 font-black text-xs md:text-sm tracking-[0.3em] mb-2 animate-fade-in-up">
          TSP社製 ペラペラ太陽光
        </p>

        {/* メイン数字ドーン */}
        <div className="mb-2 animate-fade-in-up animate-delay-100">
          <span className="text-emerald-400 text-8xl sm:text-9xl md:text-[10rem] font-black leading-none">
            3.7
          </span>
          <span className="text-emerald-400/60 text-4xl sm:text-5xl md:text-6xl font-black">
            kg
          </span>
        </div>
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 animate-fade-in-up animate-delay-100">
          3mm。曲がる太陽光パネル。
        </h2>
        <p className="text-white/50 text-sm md:text-base mb-8 leading-relaxed animate-fade-in-up animate-delay-200">
          軽いだけじゃない。性能も、保証も、業界トップクラス。
        </p>

        {/* スペック4つ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 animate-fade-in-up animate-delay-300">
          {[
            { value: "3mm", label: "厚さ", sub: "下敷き2枚分" },
            { value: "23.5%", label: "変換効率", sub: "N型TOPConセル" },
            { value: "60m/s", label: "耐風速", sub: "大型台風クラス" },
            { value: "25年", label: "出力保証", sub: "リニア保証" },
          ].map((spec) => (
            <div
              key={spec.label}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/10"
            >
              <p className="text-white text-2xl sm:text-3xl md:text-4xl font-black">
                {spec.value}
              </p>
              <p className="text-white/70 text-xs md:text-sm font-bold mt-1">
                {spec.label}
              </p>
              <p className="text-white/40 text-[10px] md:text-xs mt-0.5">{spec.sub}</p>
            </div>
          ))}
        </div>

        {/* タグ */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 animate-fade-in-up animate-delay-400">
          {["スレート屋根OK", "塩害対応（50m+）", "曲面120°対応"].map((tag) => (
            <span
              key={tag}
              className="bg-emerald-500/20 text-emerald-400 text-xs md:text-sm font-black px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-emerald-500/30"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 中間CTA */}
        <button
          onClick={() => {
            trackCtaClick("mid_cta_solution");
            onCtaClick?.();
          }}
          className="mt-6 md:mt-8 text-emerald-400 font-bold text-sm md:text-base underline underline-offset-4 cursor-pointer hover:text-emerald-300 transition-colors"
        >
          無料で削減試算を受ける →
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Slide 3: LinKの強み（Desire）— 独自ポジション
// ============================================================
function SlideStrength({ onCtaClick }: SlideProps) {
  return (
    <div className="w-full h-full bg-white flex items-center justify-center px-4 md:px-8 md:py-20 lg:py-28">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-6 md:mb-10">
          <p className="text-emerald-600 font-black text-xs md:text-sm tracking-[0.3em] mb-2 animate-fade-in-up">
            WHY LinK
          </p>
          <h2 className="text-slate-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight animate-fade-in-up animate-delay-100">
            太陽光だけの
            <br />
            会社じゃない。
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-2 leading-relaxed animate-fade-in-up animate-delay-200">
            建設業許可を持つ、唯一の太陽光代理店。
            <br className="hidden md:block" />
            だから屋根の「その先」まで。
          </p>
        </div>

        {/* 3つの強み */}
        <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
          {/* 強み1: メイン — 大きく */}
          <div className="md:col-span-3 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-5 md:p-8 text-white animate-fade-in-up animate-delay-200">
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <p className="text-emerald-200 text-xs md:text-sm font-black tracking-wider">
                01 — ONLY LinK
              </p>
              <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] md:text-xs font-black px-2.5 md:px-3 py-1 md:py-1.5 rounded-full border border-white/20">
                建設業許可 取得済
              </span>
            </div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black mb-1 md:mb-2">
              耐震補強 + 太陽光を、一括で対応
            </h3>
            <p className="text-emerald-100/80 text-sm md:text-base leading-relaxed">
              他社は「パネルを載せる」だけ。LinKは建設業許可を取得しているため、
              <br className="hidden md:block" />
              屋根の補強工事から太陽光設置まで、ワンストップで施工する。
            </p>
            <p className="text-emerald-200/60 text-xs md:text-sm mt-2 font-bold">
              「屋根が弱いから無理」とは、言わない。
            </p>
          </div>

          {/* 強み2, 3: 横並び */}
          <div className="bg-slate-900 rounded-2xl p-4 md:p-6 text-white md:col-span-1 animate-fade-in-up animate-delay-300">
            <div className="flex items-center justify-between mb-1 md:mb-2">
              <p className="text-slate-400 text-[10px] md:text-xs font-black tracking-wider">
                02
              </p>
              <span className="bg-white/10 backdrop-blur-sm text-white/70 text-[10px] md:text-xs font-black px-2 py-0.5 rounded-full border border-white/10">
                原状回復 11年
              </span>
            </div>
            <h3 className="text-sm md:text-base lg:text-lg font-black mb-1">建物を知り尽くした現場力</h3>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
              LinKの本業は原状回復・リフォーム。
              11年間、建物の内側を見続けてきた会社が、
              屋根の構造を診断し、最適な設置プランを設計する。
            </p>
          </div>
          <div className="bg-slate-900 rounded-2xl p-4 md:p-6 text-white md:col-span-1 animate-fade-in-up animate-delay-300">
            <div className="flex items-center justify-between mb-1 md:mb-2">
              <p className="text-slate-400 text-[10px] md:text-xs font-black tracking-wider">
                03
              </p>
              <span className="bg-white/10 backdrop-blur-sm text-white/70 text-[10px] md:text-xs font-black px-2 py-0.5 rounded-full border border-white/10">
                累計3万件
              </span>
            </div>
            <h3 className="text-sm md:text-base lg:text-lg font-black mb-1">全国27社のEPC施工網</h3>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
              設計（E）・調達（P）・施工（C）を全国27社と連携。
              北海道から沖縄まで、同じ品質で届ける体制がある。
            </p>
            <p className="text-slate-500 text-[10px] md:text-xs mt-1">
              ※EPC＝設計・調達・施工を一貫して行う体制
            </p>
          </div>

          {/* PC: 3列目 - 中間CTA */}
          <div className="hidden md:flex md:col-span-1 bg-emerald-50 rounded-2xl p-6 border border-emerald-100 items-center justify-center">
            <button
              onClick={() => {
                trackCtaClick("mid_cta_strength");
                onCtaClick?.();
              }}
              className="cta-pulse bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base py-4 px-8 rounded-full transition-colors"
            >
              無料で削減試算を受ける
            </button>
          </div>
        </div>

        {/* モバイル中間CTA */}
        <button
          onClick={() => {
            trackCtaClick("mid_cta_strength");
            onCtaClick?.();
          }}
          className="mt-5 text-emerald-600 font-bold text-sm underline underline-offset-4 cursor-pointer hover:text-emerald-500 transition-colors block mx-auto md:hidden"
        >
          無料で削減試算を受ける →
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Slide 4: コストメリット（Conviction）
// ============================================================
function SlideCost({ onCtaClick }: SlideProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 flex items-center justify-center overflow-hidden px-4 md:px-8 md:py-20 lg:py-28">
      {/* 背景グロー */}
      <div className="absolute top-20 right-10 w-60 h-60 bg-amber-500/5 rounded-full blur-[80px]" />

      <div className="relative z-10 w-full max-w-md md:max-w-3xl lg:max-w-4xl mx-auto text-center">
        <p className="text-amber-400 font-black text-xs md:text-sm tracking-[0.3em] mb-3 animate-fade-in-up">
          COST MERIT
        </p>

        {/* メインコピー */}
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-1 leading-tight animate-fade-in-up animate-delay-100">
          電気代、半分にした工場がある。
        </h2>

        {/* メイン数字 */}
        <div className="mb-6 md:mb-8 animate-fade-in-up animate-delay-100">
          <span className="text-amber-400 text-7xl sm:text-8xl md:text-9xl font-black leading-none">
            50
          </span>
          <span className="text-amber-400/60 text-3xl sm:text-4xl md:text-5xl font-black">
            %
          </span>
          <span className="text-white text-2xl sm:text-3xl md:text-4xl font-black ml-2">
            削減
          </span>
        </div>

        {/* PC: 2カラム / モバイル: 縦並び */}
        <div className="md:grid md:grid-cols-2 md:gap-6">
          {/* 導入実例カード */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-white/10 mb-5 md:mb-0 text-left animate-fade-in-up animate-delay-200">
            <p className="text-amber-400 text-xs md:text-sm font-black tracking-wider mb-4">
              実際の導入企業データ
            </p>
            <div className="space-y-3">
              {[
                { label: "業種", value: "食品加工工場" },
                { label: "設備容量", value: "240kW" },
                { label: "年間削減額", value: "700万円", highlight: true },
                { label: "投資回収", value: "4.5年", highlight: true },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center"
                >
                  <span className="text-white/50 text-sm md:text-base">{item.label}</span>
                  <span
                    className={`font-black text-lg md:text-xl ${
                      item.highlight ? "text-amber-400" : "text-white"
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 追加メリット */}
          <div className="space-y-3 animate-fade-in-up animate-delay-300">
            {[
              {
                title: "初期費用0円",
                desc: "PPA（初期費用0円で設置する仕組み）なら、パネル代・工事費ともに自己負担ゼロ。",
                badge: "PPA対応",
              },
              {
                title: "即時償却で節税",
                desc: "中小企業経営強化税制を使えば、設備投資の即時償却が可能。太陽光が節税ツールにもなる。",
                badge: "税制優遇",
              },
              {
                title: "2026年度〜義務化",
                desc: "全国約12,000事業所に太陽光導入目標の策定が義務化。「いつかやる」なら補助金がある今が得。",
                badge: "義務化開始",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/10 text-left"
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-white text-sm md:text-base font-black">{item.title}</h3>
                  <span className="bg-amber-400/20 text-amber-400 text-[10px] md:text-xs font-black px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                </div>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/30 text-[10px] md:text-xs mt-5">
          ※削減額は設置規模・電力使用量により変動します ※税制の適用には諸条件あり
        </p>

        {/* 中間CTA */}
        <button
          onClick={() => {
            trackCtaClick("mid_cta_cost");
            onCtaClick?.();
          }}
          className="mt-4 md:mt-6 text-amber-400 font-bold text-sm md:text-base underline underline-offset-4 cursor-pointer hover:text-amber-300 transition-colors"
        >
          うちの工場ならいくら浮く？ →
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Slide 5: 導入フロー（Action準備）
// ============================================================
function SlideFlow({ onCtaClick }: SlideProps) {
  const steps = [
    {
      num: "01",
      title: "無料Zoom相談",
      desc: "電気代の明細をお見せいただくだけ。訪問不要、オンラインで完結。",
      badge: "オンライン完結",
      free: true,
    },
    {
      num: "02",
      title: "削減試算＋現地調査",
      desc: "屋根の状態を確認し、年間の削減見込み額をお出しする。",
      badge: "試算まで無料",
      free: true,
    },
    {
      num: "03",
      title: "設計・施工",
      desc: "ご納得いただけたら着工。補助金申請もLinKがすべて代行。",
      badge: "補助金申請代行",
      free: false,
    },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 md:px-8 md:py-20 lg:py-28">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <p className="text-emerald-600 font-black text-xs md:text-sm tracking-[0.3em] mb-2 animate-fade-in-up">
            FLOW
          </p>
          <h2 className="text-slate-900 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black leading-tight animate-fade-in-up animate-delay-100">
            まずは「いくら浮くか」だけ、
            <br />
            聞いてみる。
          </h2>
          <p className="text-emerald-600 font-bold text-sm md:text-base mt-2 animate-fade-in-up animate-delay-200">
            試算まで完全無料。契約の義務も、一切なし。
          </p>
        </div>

        {/* モバイル: 縦リスト / PC: 3カラム */}
        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`flex items-start gap-4 md:flex-col md:items-center md:text-center animate-fade-in-up animate-delay-${(i + 2) * 100}`}
            >
              {/* 番号 + 線 */}
              <div className="flex flex-col items-center md:mb-3">
                <div
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-black text-sm md:text-lg flex-shrink-0 ${
                    step.free
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-900 text-white"
                  }`}
                >
                  {step.num}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-0.5 h-8 bg-slate-200 mt-1 md:hidden" />
                )}
              </div>
              {/* コンテンツ */}
              <div className="flex-1 bg-white rounded-2xl p-4 md:p-5 shadow-lg shadow-slate-100 border border-slate-100 -mt-1 md:mt-0 md:w-full">
                <div className="flex items-center justify-between mb-1 md:flex-col md:gap-2 md:mb-2">
                  <h3 className="font-black text-slate-900 text-base md:text-lg">
                    {step.title}
                  </h3>
                  <span
                    className={`text-[10px] md:text-xs font-black px-2.5 py-1 rounded-full ${
                      step.free
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {step.badge}
                  </span>
                </div>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 md:mt-10 text-center bg-emerald-50 rounded-2xl p-4 md:p-6 border border-emerald-100 animate-fade-in-up animate-delay-400">
          <p className="text-slate-900 text-sm md:text-base font-bold">
            ここまで、お金はかからない。
          </p>
          <p className="text-slate-500 text-xs md:text-sm mt-1">
            試算の結果を見て「やめます」でも、まったく問題なし。
          </p>
        </div>

        {/* 中間CTA */}
        <button
          onClick={() => {
            trackCtaClick("mid_cta_flow");
            onCtaClick?.();
          }}
          className="mt-5 md:mt-8 text-emerald-600 font-bold text-sm md:text-base underline underline-offset-4 cursor-pointer hover:text-emerald-500 transition-colors block mx-auto"
        >
          STEP 1の無料Zoom相談へ →
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Slide 6: CTA（Action）— フォーム3項目
// ============================================================
function SlideCta() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [formStarted, setFormStarted] = useState(false);
  const formStartedRef = useRef(false);

  const handleFocus = () => {
    if (!formStarted) {
      setFormStarted(true);
      formStartedRef.current = true;
      trackFormStart();
    }
  };

  // フォーム入力開始後にページ離脱→form_abandon
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (formStartedRef.current && status !== "success") {
        trackFormAbandon();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    trackCtaClick("final_cta_form");

    const form = e.currentTarget;
    const data = {
      会社名: (form.elements.namedItem("company") as HTMLInputElement).value,
      お名前: (form.elements.namedItem("name") as HTMLInputElement).value,
      電話番号: (form.elements.namedItem("phone") as HTMLInputElement).value,
      _subject: "【太陽光LP】無料削減試算のお申し込み",
      問い合わせ種別: "ペラペラ太陽光 無料削減試算",
      source: "lp-solar",
    };

    try {
      const res = await fetch(`https://submit-form.com/${FORMSPARK_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        trackFormSubmit();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        id="contact"
        className="w-full h-full bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 flex items-center justify-center px-4 md:px-8 md:py-20 lg:py-28"
      >
        <div className="w-full max-w-md md:max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-emerald-400 text-3xl md:text-4xl">✓</span>
          </div>
          <h2 className="text-white text-2xl md:text-4xl font-black mb-4">
            ありがとうございます
          </h2>
          <p className="text-white/70 text-sm md:text-lg mb-6">
            2営業日以内に、LinKの担当からご連絡いたします。
            <br />
            削減試算の結果をお届けします。
          </p>
          <a
            href={PHONE_HREF}
            onClick={() => trackTelClick()}
            className="inline-block bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-full border border-white/30 transition-colors"
          >
            お急ぎの方: {PHONE}
          </a>
          <div className="mt-8 pt-4 border-t border-white/10">
            <a
              href={HP_URL}
              className="text-white/50 hover:text-white/80 text-xs md:text-sm underline underline-offset-4 transition-colors"
            >
              株式会社LinK 公式サイト →
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="contact"
      className="w-full h-full bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 flex items-center justify-center px-4 md:px-8 md:py-20 lg:py-28"
    >
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <p className="text-emerald-400 font-black text-xs md:text-sm tracking-[0.3em] mb-3 animate-fade-in-up">
            FREE CONSULTATION
          </p>
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 md:mb-3 leading-tight animate-fade-in-up animate-delay-100">
            無料で削減試算を受ける
          </h2>
          <p className="text-white/50 text-sm md:text-lg animate-fade-in-up animate-delay-200">
            電気代の明細1枚で、年間いくら浮くかがわかる。
          </p>
        </div>

        {/* フォーム + 電話の2カラム（PC） */}
        <div className="md:grid md:grid-cols-5 md:gap-8 md:items-start">
          {/* インラインフォーム */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-3 bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-8 border border-white/20 animate-fade-in-up animate-delay-200"
          >
            <p className="text-emerald-400/70 text-xs md:text-sm mb-4 font-bold">
              入力はたった3項目。30秒で完了
            </p>
            <div className="space-y-3 md:space-y-4">
              <div>
                <label
                  htmlFor="contact-company"
                  className="block text-white/70 text-xs md:text-sm mb-1"
                >
                  会社名 <span className="text-red-400">*</span>
                </label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  required
                  onFocus={handleFocus}
                  placeholder="例：○○食品株式会社"
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 text-sm md:text-base"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-white/70 text-xs md:text-sm mb-1"
                >
                  ご担当者名 <span className="text-red-400">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  onFocus={handleFocus}
                  placeholder="例：鈴木太郎"
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 text-sm md:text-base"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-phone"
                  className="block text-white/70 text-xs md:text-sm mb-1"
                >
                  電話番号 <span className="text-red-400">*</span>
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  required
                  onFocus={handleFocus}
                  placeholder="例：03-1234-5678"
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 text-sm md:text-base"
                />
              </div>
            </div>

            {status === "error" && (
              <p className="text-red-400 text-xs md:text-sm mt-3">
                送信できませんでした。お手数ですが、お電話（{PHONE}）でもご相談いただけます。
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="cta-pulse w-full mt-5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black text-lg md:text-xl py-4 rounded-full transition-colors shadow-lg shadow-emerald-500/30"
            >
              {status === "submitting" ? "送信中..." : "無料で削減試算を受ける"}
            </button>

            <p className="text-white/30 text-[10px] md:text-xs mt-3 text-center">
              ※営業電話はしません。試算結果のご案内のみです
            </p>
          </form>

          {/* 電話 + 信頼バッジ（PC右カラム / モバイル下） */}
          <div className="md:col-span-2 mt-6 md:mt-0 space-y-5 animate-fade-in-up animate-delay-300">
            <a
              href={PHONE_HREF}
              onClick={() => trackTelClick()}
              className="block bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-4 px-6 rounded-2xl border border-white/30 transition-colors text-center"
            >
              <span className="text-xs text-white/60 block mb-1">
                今すぐ話したい方はお電話で
              </span>
              <span className="text-lg md:text-xl">{PHONE}</span>
              <span className="block text-xs font-normal text-white/60 mt-1">
                平日 9:00-18:00（株式会社LinK）
              </span>
            </a>

            {/* ゼロリスクバッジ */}
            <div className="flex flex-wrap justify-center gap-2">
              {["相談無料", "試算無料", "義務なし"].map((badge) => (
                <span
                  key={badge}
                  className="bg-emerald-400/20 text-emerald-400 text-[10px] md:text-xs font-bold px-2.5 py-1.5 rounded-full border border-emerald-400/30"
                >
                  ✓ {badge}
                </span>
              ))}
            </div>

            {/* マイクロコピー */}
            <p className="text-white/40 text-[10px] md:text-xs text-center">
              「まだ検討中」でも大丈夫。まずは数字だけ確認してみてください。
            </p>
          </div>
        </div>

        {/* HPリンク */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-white/30 text-xs md:text-sm">
            株式会社LinK｜建設業許可取得｜原状回復・リフォーム 11年
          </p>
          <a
            href={HP_URL}
            className="text-white/30 hover:text-white/50 text-xs md:text-sm underline underline-offset-4 transition-colors"
          >
            公式サイト →
          </a>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// モバイル縦スクロール版（A/Bテスト Variant B）
// ============================================================
function MobileScrollView({
  slides,
  onScroll,
}: {
  slides: React.ReactNode[];
  onScroll: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <div
      ref={scrollRef}
      className="w-full h-[100dvh] overflow-y-auto"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {slides.map((slide, i) => (
        <section
          key={i}
          data-slide-index={i}
          className={i === 0 ? "min-h-[100dvh]" : "min-h-[85dvh]"}
        >
          {slide}
        </section>
      ))}
    </div>
  );
}

// ============================================================
// メイン SwipeLp コンポーネント
// ============================================================
export default function SwipeLp() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [variant, setVariant] = useState<ABVariant | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);

    // A/Bバリアント割り当て
    const hadCookie = document.cookie.includes("solar_lp_ab_variant");
    const v = getVariantWithOverride();
    setVariant(v);
    setTrackingVariant(v);
    trackVariantAssigned(v, !hadCookie);

    return () => window.removeEventListener("resize", check);
  }, []);

  // PC版: スクロール深度計測（25/50/75/100%）
  const trackedDepths = useRef(new Set<number>());
  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((scrollTop / docHeight) * 100);
      for (const threshold of [25, 50, 75, 100]) {
        if (pct >= threshold && !trackedDepths.current.has(threshold)) {
          trackedDepths.current.add(threshold);
          trackScrollDepth(threshold);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // PC版: セクション到達計測（Intersection Observer）
  const trackedSections = useRef(new Set<string>());
  useEffect(() => {
    if (isMobile) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const name = entry.target.getAttribute("data-section") || "";
            if (name && !trackedSections.current.has(name)) {
              trackedSections.current.add(name);
              trackSectionView(name);
            }
          }
        });
      },
      { threshold: 0.3 }
    );
    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isMobile]);

  const handleSlideChange = (swiper: SwiperType) => {
    trackSlideView(swiper.activeIndex);
  };

  // 縦スクロールモバイル版: スクロール位置からスライド番号を推定してトラッキング
  const lastTrackedSlide = useRef(-1);
  const handleScrollTracking = useCallback(() => {
    if (typeof window === "undefined") return;
    const sections = document.querySelectorAll("[data-slide-index]");
    const viewportCenter = window.innerHeight / 2;
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < viewportCenter && rect.bottom > viewportCenter) {
        const idx = Number(section.getAttribute("data-slide-index"));
        if (idx !== lastTrackedSlide.current) {
          lastTrackedSlide.current = idx;
          trackSlideView(idx);
        }
      }
    });
  }, []);

  // CTA押下時: 最終スライドへ遷移
  const handleCtaClick = useCallback(() => {
    if (isMobile && variant === "swipe" && swiperRef.current) {
      swiperRef.current.slideTo(5); // 6スライド目（index 5）
    } else {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isMobile, variant]);

  const slides = [
    <SlideHero key="hero" onCtaClick={handleCtaClick} variant={variant} />,
    <SlideSolution key="solution" onCtaClick={handleCtaClick} />,
    <SlideStrength key="strength" onCtaClick={handleCtaClick} />,
    <SlideCost key="cost" onCtaClick={handleCtaClick} />,
    <SlideFlow key="flow" onCtaClick={handleCtaClick} />,
    <SlideCta key="cta" />,
  ];

  // モバイル + Variant A（swipe）: 横スワイプ
  if (isMobile && variant === "swipe") {
    return (
      <Swiper
        key="horizontal-swiper"
        modules={[Pagination, Keyboard]}
        direction="horizontal"
        cssMode={true}
        pagination={{ clickable: true, type: "bullets" }}
        keyboard={{ enabled: true }}
        slidesPerView={1}
        spaceBetween={0}
        style={{ width: "100%", height: "100dvh", overflow: "hidden" }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
      >
        {slides.map((slide, i) => (
          <SwiperSlide
            key={i}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  // モバイル + Variant B（scroll）: 縦スクロール
  if (isMobile && variant === "scroll") {
    return (
      <MobileScrollView slides={slides} onScroll={handleScrollTracking} />
    );
  }

  // PC: 通常スクロール（Heroのみフルビューポート、他はコンテンツベース）
  const sectionNames = ["hero", "solution", "strength", "cost", "flow", "contact"];
  return (
    <div className="w-full">
      {slides.map((slide, i) => (
        <section
          key={i}
          data-section={sectionNames[i]}
          className={i === 0 ? "h-screen" : ""}
        >
          {slide}
        </section>
      ))}
    </div>
  );
}
