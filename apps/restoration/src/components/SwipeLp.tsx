"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import {
  trackSlideView,
  trackCtaClick,
  trackTelClick,
  setTrackingVariant,
  trackVariantAssigned,
} from "@/lib/tracking";
import { getVariantWithOverride, type ABVariant } from "@/lib/ab-test";

import "swiper/css";
import "swiper/css/pagination";

const PHONE = "03-6825-2464";
const PHONE_HREF = "tel:0368252464";
const HP_URL = "https://link-8.jp";

type SlideProps = {
  onCtaClick?: () => void;
  variant?: ABVariant | null;
};

// ============================================================
// Slide 1: ファーストビュー
// ============================================================
function SlideHero({ onCtaClick, variant }: SlideProps) {
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

      <div className="relative z-10 text-center px-6 max-w-lg md:max-w-3xl lg:max-w-4xl mx-auto">
        {/* ロゴ / 社名 */}
        <p className="text-white/80 text-sm md:text-base tracking-[0.3em] mb-6 md:mb-8 animate-fade-in-up">
          株式会社LinK
        </p>

        {/* メインコピー */}
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6 animate-fade-in-up animate-delay-100">
          見積もりの不透明、
          <br />
          <span className="text-link-gold">終わりにする。</span>
        </h1>

        {/* サブコピー */}
        <p className="text-white/70 text-base sm:text-lg md:text-xl mb-8 md:mb-10 animate-fade-in-up animate-delay-200 md:max-w-2xl md:mx-auto">
          関東一都三県・60社超の専門家ネットワーク。
          <br />
          内訳明示の見積り、写真付き進捗報告で
          <br className="sm:hidden" />
          原状回復業務を「丸投げ」できる体制に。
        </p>

        {/* CTA */}
        <div className="flex flex-col md:flex-row md:justify-center gap-3 md:gap-4 animate-fade-in-up animate-delay-300">
          <button
            onClick={() => {
              trackCtaClick("hero_cta");
              onCtaClick?.();
            }}
            className="cta-pulse inline-block bg-link-orange hover:bg-accent-600 text-white font-bold text-lg md:text-xl py-4 px-8 md:px-12 rounded-full transition-colors"
          >
            まずは無料で見積り相談
          </button>
          <a
            href={PHONE_HREF}
            onClick={() => trackTelClick()}
            className="inline-block text-white/80 hover:text-white text-sm md:text-base underline underline-offset-4 md:self-center"
          >
            お電話はこちら: {PHONE}
          </a>
        </div>

        {/* 信頼バッジ */}
        <div className="flex justify-center gap-3 md:gap-4 mt-8 md:mt-10 animate-fade-in-up animate-delay-400 flex-wrap">
          {[
            "建設業許可取得",
            "見積り完全無料",
            "協力会社60社+",
            "関東一都三県対応",
          ].map((badge) => (
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
            {variant === "scroll" ? "スクロールして詳しく ↓" : "横にスワイプ →"}
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
// Slide 2: 悩み（損失回避フレーム）
// ============================================================
function SlidePains() {
  const pains = [
    {
      icon: "📋",
      title: "見積りがブラックボックス",
      desc: "総額だけの見積書。オーナーに「なぜこの金額？」と聞かれても説明できない。",
    },
    {
      icon: "💸",
      title: "中間マージン、何層分？",
      desc: "元請→下請→孫請...工事費の何割が実際の工事に使われているのか、誰も教えてくれない。",
    },
    {
      icon: "👁️",
      title: "現場が動いているのか分からない",
      desc: "「来週には終わります」の電話が3回目。入居者の引越し日は迫るのに、完了日が読めない。",
    },
  ];

  return (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center px-4 md:px-8 md:py-20 lg:py-28">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-4xl mx-auto text-center">
        <p className="text-link-orange font-bold text-sm md:text-base tracking-wider mb-1">
          PROBLEM
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-link-dark mb-1">
          「また原状回復か...」
          <br />
          <span className="text-xl md:text-2xl lg:text-3xl">そう思った瞬間、ありませんか？</span>
        </h2>
        <p className="text-link-gray text-sm md:text-base mb-5 md:mb-8">
          管理会社様が共通して抱える3つの課題
        </p>

        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
          {pains.map((pain, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 md:p-6 shadow-md border border-slate-100 border-l-4 border-l-red-400 text-left flex gap-4 items-start md:flex-col md:items-center md:text-center md:border-l-0 md:border-t-4 md:border-t-red-400"
            >
              <span className="text-2xl md:text-4xl flex-shrink-0">{pain.icon}</span>
              <div>
                <h3 className="font-bold text-link-dark text-base md:text-lg mb-1 md:mb-2">
                  {pain.title}
                </h3>
                <p className="text-link-gray text-sm md:text-base leading-relaxed">
                  {pain.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 md:mt-10 text-link-dark font-bold text-lg md:text-xl">
          この3つが全部解決したら、
          <br />
          <span className="text-link-orange">あなたの仕事はどう変わりますか？</span>
        </p>
      </div>
    </div>
  );
}

// ============================================================
// Slide 3: 選ばれる3つの理由
// ============================================================
function SlideReasons({ onCtaClick }: SlideProps) {
  const reasons = [
    {
      num: "01",
      title: "オーナーにそのまま見せられる見積書",
      desc: "材料費・人件費・諸経費を項目別に明記。オーナー説明用にそのまま使えるので、数字を組み替える手間がゼロに。",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      num: "02",
      title: "60社と直接だから、中間コストなし",
      desc: "クロス、設備、ハウスクリーニング...各分野の専門会社60社超と直接契約。中間会社を挟まない分、コストを削減。",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
    },
    {
      num: "03",
      title: "「今、現場どうなってます？」が、なくなる",
      desc: "工程ごとの写真付き報告をお送りします。完了予定日も明示するので、入居者・オーナーへの回答がその場で可能に。",
      color: "bg-amber-50 border-amber-200",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <div className="w-full h-full bg-white flex items-center justify-center px-4 md:px-8 md:py-20 lg:py-28">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-4xl mx-auto text-center">
        <p className="text-link-navy font-bold text-sm md:text-base tracking-wider mb-1">
          WHY LinK
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-link-dark mb-1">
          管理会社様に「丸投げ」と言われる、
        </h2>
        <p className="text-xl md:text-2xl font-bold text-link-orange mb-5 md:mb-8">
          3つの仕組み
        </p>

        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
          {reasons.map((r) => (
            <div
              key={r.num}
              className={`rounded-xl p-5 md:p-6 border ${r.color} text-left md:text-center`}
            >
              <div className="flex items-center gap-3 mb-2 md:flex-col md:items-center md:gap-2 md:mb-3">
                <span
                  className={`${r.iconColor} font-black text-2xl md:text-4xl leading-none`}
                >
                  {r.num}
                </span>
                <h3 className="font-bold text-link-dark text-base md:text-lg">
                  {r.title}
                </h3>
              </div>
              <p className="text-link-gray text-sm md:text-base leading-relaxed pl-10 md:pl-0">
                {r.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 中間CTA */}
        <button
          onClick={() => {
            trackCtaClick("mid_cta_reasons");
            onCtaClick?.();
          }}
          className="mt-5 md:mt-8 text-link-orange font-bold text-sm md:text-base underline underline-offset-4 cursor-pointer hover:text-accent-600 transition-colors"
        >
          無料で見積りを相談する →
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Slide 4: 施工事例 Before/After
// ============================================================
function SlideWorks({ onCtaClick }: SlideProps) {
  return (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center px-4 md:px-8 md:py-20 lg:py-28">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-4xl mx-auto">
        <div className="text-center mb-5 md:mb-8">
          <p className="text-link-navy font-bold text-sm md:text-base tracking-wider mb-1">
            WORKS
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-link-dark">
            ビフォー・アフターで見る、
            <br className="md:hidden" />
            LinKの仕事
          </h2>
        </div>

        {/* PC: 2事例を横並び / モバイル: 縦並び */}
        <div className="space-y-5 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
          {/* 事例1 */}
          <div>
            <p className="text-sm md:text-base font-bold text-link-dark mb-2 text-center">
              1K マンション原状回復（25m&sup2;）
              <span className="text-link-gray font-normal ml-1">/ 工期3日</span>
            </p>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              <div className="relative">
                <div
                  className="aspect-[3/4] md:aspect-[4/3] rounded-xl flex items-end justify-center text-white/60 font-bold text-lg pb-4"
                  style={{
                    backgroundColor: "#78716c",
                    backgroundImage:
                      "linear-gradient(135deg, #78716c 0%, #a8a29e 50%, #78716c 100%)",
                  }}
                >
                  Before
                </div>
                <span className="absolute top-2 left-2 bg-black/70 text-white text-xs font-bold px-2.5 py-1 rounded-md">
                  施工前
                </span>
              </div>
              <div className="relative">
                <div
                  className="aspect-[3/4] md:aspect-[4/3] rounded-xl flex items-end justify-center text-white/80 font-bold text-lg pb-4"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%)",
                  }}
                >
                  After
                </div>
                <span className="absolute top-2 left-2 bg-link-orange text-white text-xs font-bold px-2.5 py-1 rounded-md">
                  施工後
                </span>
              </div>
            </div>
          </div>

          {/* 事例2 */}
          <div>
            <p className="text-sm md:text-base font-bold text-link-dark mb-2 text-center">
              2LDK 水回りリフォーム（55m&sup2;）
              <span className="text-link-gray font-normal ml-1">/ 工期5日</span>
            </p>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              <div className="relative">
                <div
                  className="aspect-[3/4] md:aspect-[4/3] rounded-xl flex items-end justify-center text-white/60 font-bold text-lg pb-4"
                  style={{
                    backgroundColor: "#78716c",
                    backgroundImage:
                      "linear-gradient(135deg, #57534e 0%, #a8a29e 50%, #78716c 100%)",
                  }}
                >
                  Before
                </div>
                <span className="absolute top-2 left-2 bg-black/70 text-white text-xs font-bold px-2.5 py-1 rounded-md">
                  施工前
                </span>
              </div>
              <div className="relative">
                <div
                  className="aspect-[3/4] md:aspect-[4/3] rounded-xl flex items-end justify-center text-white/80 font-bold text-lg pb-4"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #0369a1 0%, #0ea5e9 50%, #38bdf8 100%)",
                  }}
                >
                  After
                </div>
                <span className="absolute top-2 left-2 bg-link-orange text-white text-xs font-bold px-2.5 py-1 rounded-md">
                  施工後
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-2 mt-5 md:mt-8">
          <a
            href={`${HP_URL}/works`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCtaClick("works_more")}
            className="inline-block text-link-navy font-bold text-sm md:text-base underline underline-offset-4 hover:text-link-orange transition-colors"
          >
            他の施工事例もチェック →
          </a>
          {/* 中間CTA */}
          <div>
            <button
              onClick={() => {
                trackCtaClick("mid_cta_works");
                onCtaClick?.();
              }}
              className="text-link-orange font-bold text-sm md:text-base underline underline-offset-4 cursor-pointer hover:text-accent-600 transition-colors"
            >
              無料で見積りを相談する →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Slide 5: 代表紹介
// ============================================================
function SlideProfile() {
  return (
    <div className="w-full h-full bg-white flex items-center justify-center px-4 md:px-8 md:py-20 lg:py-28">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-4xl mx-auto text-center">
        <p className="text-link-navy font-bold text-sm md:text-base tracking-wider mb-1">
          MESSAGE
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-link-dark mb-4 md:mb-8">
          なぜLinKを作ったのか
        </h2>

        {/* PC: 横並び2カラム / モバイル: 縦並び */}
        <div className="md:flex md:gap-10 md:items-start md:text-left">
          {/* 左: 写真 + 名前 */}
          <div className="flex-shrink-0 md:w-48">
            <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-link-navy to-link-dark mx-auto mb-3 flex items-center justify-center">
              <span className="text-white text-3xl md:text-5xl font-bold">Y</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-link-dark mb-0.5">吉野 博</h3>
            <p className="text-link-gray text-sm mb-3 md:mb-0">
              株式会社LinK 代表取締役
            </p>
          </div>

          {/* 右: メッセージ */}
          <div className="flex-1">
            <div className="bg-slate-50 rounded-xl p-5 md:p-8 text-left space-y-3 md:space-y-4">
              <p className="text-sm md:text-base text-link-dark leading-relaxed">
                建設業界で<strong className="text-link-navy">11年</strong>。
                下請け時代に何度も見た光景があります。
              </p>
              <p className="text-sm md:text-base text-link-dark leading-relaxed">
                「結局いくらかかったの？」とオーナーに詰められる管理会社の担当者。
                「来週には終わると言ったよね？」と入居者から電話を受ける担当者。
              </p>
              <p className="text-sm md:text-base text-link-dark leading-relaxed">
                原因はいつも同じ。情報が現場で止まっていること。
                その&ldquo;不透明さ&rdquo;をゼロにする会社を作ろう。
                <strong className="text-link-navy">60社</strong>の専門家と直接つながる仕組みを整えよう。
                その想いひとつで、LinKを立ち上げました。
              </p>
              <p className="text-sm md:text-base text-link-dark leading-relaxed font-bold border-t border-slate-200 pt-3">
                目指しているのは、管理会社様が
                <span className="text-link-orange">「原状回復を忘れられる状態」</span>。
                <br />
                建物に関わるすべての仕事を、まっとうにする。
              </p>
            </div>

            <div className="flex justify-center md:justify-start gap-3 mt-4 flex-wrap">
              <span className="bg-link-navy/5 text-link-navy text-xs md:text-sm px-3 md:px-4 py-1.5 rounded-full font-medium">
                業界歴11年
              </span>
              <span className="bg-link-navy/5 text-link-navy text-xs md:text-sm px-3 md:px-4 py-1.5 rounded-full font-medium">
                60社+ネットワーク
              </span>
              <span className="bg-link-navy/5 text-link-navy text-xs md:text-sm px-3 md:px-4 py-1.5 rounded-full font-medium">
                関東一都三県
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Slide 6: ご利用の流れ
// ============================================================
function SlideFlow({ onCtaClick }: SlideProps) {
  const steps = [
    {
      num: 1,
      title: "無料相談",
      desc: "電話・フォームで受付。物件情報をお伝えいただくだけでOK",
      time: "当日対応",
      free: true,
    },
    {
      num: 2,
      title: "現場確認",
      desc: "担当者が現場を訪問。30分程度で調査完了。立会い不要もOK",
      time: "翌営業日〜",
      free: true,
    },
    {
      num: 3,
      title: "見積提出",
      desc: "内訳付き見積書をPDFでお送り。オーナー提出用にそのまま使えます",
      time: "調査後1-2営業日",
      free: true,
    },
    {
      num: 4,
      title: "工事開始",
      desc: "各工程の写真を随時お送り。完了予定日を明示します",
      free: false,
    },
    {
      num: 5,
      title: "完了報告",
      desc: "写真付き完了報告書をお渡し。検査後のお引き渡し",
      free: false,
    },
  ];

  return (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center px-4 md:px-8 md:py-20 lg:py-28">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-4xl mx-auto text-center">
        <p className="text-link-navy font-bold text-sm md:text-base tracking-wider mb-1">
          FLOW
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-link-dark mb-1">
          お問い合わせから最短3日で見積り提出
        </h2>
        <p className="text-link-orange font-bold text-sm md:text-base mb-5 md:mb-8">
          ステップ3まで完全無料。費用が発生するのは工事決定後です。
        </p>

        {/* モバイル: 縦リスト / PC: 横5カラム */}
        <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-5 md:gap-4">
          {steps.map((step) => (
            <div key={step.num} className="flex items-center gap-4 text-left md:flex-col md:items-center md:text-center md:gap-3">
              {/* ステップ番号 */}
              <div
                className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-sm md:text-lg flex-shrink-0 ${
                  step.free
                    ? "bg-link-orange text-white"
                    : "bg-link-navy text-white"
                }`}
              >
                {step.num}
              </div>

              {/* コンテンツ */}
              <div className="flex-1 bg-white rounded-lg p-3 md:p-4 shadow-sm border border-slate-100 md:w-full">
                <div className="flex items-center justify-between md:flex-col md:gap-1">
                  <h3 className="font-bold text-link-dark text-sm md:text-base">
                    {step.title}
                  </h3>
                  <div className="flex items-center gap-1.5 md:flex-col">
                    {step.time && (
                      <span className="text-link-gray text-xs">
                        {step.time}
                      </span>
                    )}
                    {step.free && (
                      <span className="bg-link-orange/10 text-link-orange text-xs font-bold px-2 py-0.5 rounded">
                        無料
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-link-gray text-xs md:text-sm mt-0.5 md:mt-2">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 中間CTA */}
        <button
          onClick={() => {
            trackCtaClick("mid_cta_flow");
            onCtaClick?.();
          }}
          className="mt-5 md:mt-8 text-link-orange font-bold text-sm md:text-base underline underline-offset-4 cursor-pointer hover:text-accent-600 transition-colors"
        >
          まずはSTEP 1の無料相談から →
        </button>
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
      className="w-full h-full bg-gradient-to-br from-link-navy via-[#1e3a5f] to-link-dark flex items-center justify-center px-4 md:px-8 md:py-20 lg:py-28"
    >
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto text-center">
        <p className="text-link-gold font-bold text-sm md:text-base tracking-wider mb-3">
          CONTACT
        </p>
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-5">
          原状回復の発注先、
          <br />
          そろそろ変えませんか？
        </h2>
        <p className="text-white/70 text-sm md:text-lg mb-8 md:mb-10">
          お見積りは最短3日。もちろん完全無料です。
          <br />
          今の業者との比較検討だけでもお気軽にどうぞ。
        </p>

        {/* CTAボタン */}
        <div className="space-y-4 md:flex md:justify-center md:gap-4 md:space-y-0">
          <a
            href={`${HP_URL}/contact/construction`}
            onClick={() => trackCtaClick("final_cta_form")}
            className="cta-pulse block md:inline-block bg-link-orange hover:bg-accent-600 text-white font-bold text-lg md:text-xl py-4 px-8 md:px-12 rounded-full transition-colors"
          >
            無料で見積りを依頼する
          </a>

          <a
            href={PHONE_HREF}
            onClick={() => trackTelClick()}
            className="block md:inline-block bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-full border border-white/30 transition-colors"
          >
            電話で相談: {PHONE}
            <span className="block text-xs font-normal text-white/60 mt-0.5">
              平日 9:00-18:00 / 担当: 吉野
            </span>
          </a>
        </div>

        {/* ゼロリスクバッジ */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-8 md:mt-10">
          {[
            "相談無料",
            "現場調査無料",
            "見積り無料",
            "キャンセル料なし",
            "契約の縛りなし",
          ].map((badge) => (
            <span
              key={badge}
              className="bg-link-gold/20 text-link-gold text-xs md:text-sm font-bold px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-link-gold/30"
            >
              ✓ {badge}
            </span>
          ))}
        </div>

        {/* 安心メッセージ */}
        <p className="text-white/60 text-xs md:text-sm mt-4">
          ※ しつこい営業は一切しません
        </p>

        {/* 希少性 */}
        <p className="text-white/70 text-xs md:text-sm mt-2">
          ※ 関東一都三県限定 / 月間の受付枠に上限があるため、お早めにご相談ください
        </p>

        {/* HPリンク */}
        <div className="mt-6 pt-4 border-t border-white/10">
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

    // A/Bバリアント割り当て（Cookie保存、URLオーバーライド対応）
    const hadCookie = document.cookie.includes("lp_ab_variant");
    const v = getVariantWithOverride();
    setVariant(v);
    setTrackingVariant(v);
    trackVariantAssigned(v, !hadCookie);

    return () => window.removeEventListener("resize", check);
  }, []);

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

  // CTA押下時の遷移
  const handleCtaClick = useCallback(() => {
    if (isMobile && variant === "swipe" && swiperRef.current) {
      swiperRef.current.slideTo(6);
    } else {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isMobile, variant]);

  const slides = [
    <SlideHero key="hero" onCtaClick={handleCtaClick} variant={variant} />,
    <SlidePains key="pains" />,
    <SlideReasons key="reasons" onCtaClick={handleCtaClick} />,
    <SlideWorks key="works" onCtaClick={handleCtaClick} />,
    <SlideProfile key="profile" />,
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
  return (
    <div className="w-full">
      {slides.map((slide, i) => (
        <section
          key={i}
          className={i === 0 ? "h-screen" : ""}
        >
          {slide}
        </section>
      ))}
    </div>
  );
}
