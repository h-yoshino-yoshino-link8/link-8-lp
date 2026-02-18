"use client";

import { SwiperLP } from "@link8/ui";
import { company } from "@link8/data";
import { trackSlideView, trackCtaClick, trackTelClick } from "@link8/tracking";

const PHONE = company.phone;
const PHONE_HREF = company.phoneHref;
const HP_URL = company.hpUrl;

// ============================================================
// Slide 1: ファーストビュー - 導入企業数+主要数値+CTA
// ============================================================
function SlideHero() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-link-navy via-[#1e3a5f] to-link-dark flex items-center justify-center overflow-hidden">
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
        <p className="text-white/60 text-sm tracking-[0.3em] mb-4 animate-fade-in-up">
          CASE STUDY
        </p>

        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 animate-fade-in-up animate-delay-100">
          他社はこう
          <br />
          <span className="text-link-orange">使っています。</span>
        </h1>

        <p className="text-white/70 text-base sm:text-lg mb-6 animate-fade-in-up animate-delay-200">
          導入企業の声と数値で見る
          <br />
          LinKの原状回復サービス
        </p>

        {/* 主要数値 */}
        <div className="grid grid-cols-3 gap-3 mb-6 animate-fade-in-up animate-delay-300">
          {[
            { value: "20%", label: "コスト削減" },
            { value: "3倍", label: "対応スピード" },
            { value: "98%", label: "満足度" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <p className="text-link-orange text-2xl font-black">{stat.value}</p>
              <p className="text-white/60 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 animate-fade-in-up animate-delay-400">
          <a
            href="#contact"
            onClick={() => trackCtaClick("casestudy_hero_cta")}
            className="cta-pulse inline-block bg-link-orange hover:bg-accent-600 text-white font-bold text-lg py-4 px-8 rounded-full transition-colors"
          >
            まずは1件、試してみる
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
// Slide 2: 事例1 - A管理会社様（管理戸数500戸）
// ============================================================
function SlideCase1() {
  return (
    <div className="w-full h-full bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto">
        <p className="text-link-orange font-bold text-sm tracking-wider mb-1 text-center">
          CASE 01
        </p>
        <h2 className="text-2xl font-bold text-link-dark mb-1 text-center">
          見積コスト<span className="text-link-orange">20%</span>削減
        </h2>
        <p className="text-link-gray text-sm mb-5 text-center">
          A管理会社様（管理戸数500戸）
        </p>

        <div className="bg-slate-50 rounded-xl p-5 mb-4">
          <h3 className="font-bold text-link-dark text-base mb-3">導入前の課題</h3>
          <ul className="space-y-2 text-sm text-link-gray">
            <li className="flex gap-2">
              <span className="text-red-400 flex-shrink-0">&#x2717;</span>
              <span>複数業者への相見積もりに毎回1週間以上</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400 flex-shrink-0">&#x2717;</span>
              <span>見積もりの内訳が不明瞭で比較が困難</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400 flex-shrink-0">&#x2717;</span>
              <span>担当者の業務負担が大きい</span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
          <h3 className="font-bold text-link-dark text-base mb-3">導入後の変化</h3>
          <ul className="space-y-2 text-sm text-link-dark">
            <li className="flex gap-2">
              <span className="text-link-orange flex-shrink-0 font-bold">&#x2713;</span>
              <span>内訳付き見積で<strong>比較・稟議がスムーズ</strong>に</span>
            </li>
            <li className="flex gap-2">
              <span className="text-link-orange flex-shrink-0 font-bold">&#x2713;</span>
              <span>見積回答が<strong>最短翌営業日</strong>に短縮</span>
            </li>
            <li className="flex gap-2">
              <span className="text-link-orange flex-shrink-0 font-bold">&#x2713;</span>
              <span>年間の原状回復費用が<strong>約20%削減</strong></span>
            </li>
          </ul>
        </div>

        <div className="mt-4 bg-link-navy/5 rounded-lg p-4">
          <p className="text-sm text-link-dark italic leading-relaxed">
            「内訳が明確だから上司への説明がしやすくなった。見積もり待ちのストレスが激減しました。」
          </p>
          <p className="text-xs text-link-gray mt-2 text-right">- A管理会社 担当者様</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Slide 3: 事例2 - B不動産管理様（管理戸数1,200戸）
// ============================================================
function SlideCase2() {
  return (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto">
        <p className="text-link-orange font-bold text-sm tracking-wider mb-1 text-center">
          CASE 02
        </p>
        <h2 className="text-2xl font-bold text-link-dark mb-1 text-center">
          現地訪問<span className="text-link-orange">50%</span>削減
        </h2>
        <p className="text-link-gray text-sm mb-5 text-center">
          B不動産管理様（管理戸数1,200戸）
        </p>

        <div className="bg-white rounded-xl p-5 mb-4">
          <h3 className="font-bold text-link-dark text-base mb-3">導入前の課題</h3>
          <ul className="space-y-2 text-sm text-link-gray">
            <li className="flex gap-2">
              <span className="text-red-400 flex-shrink-0">&#x2717;</span>
              <span>工事進捗を確認するために毎回現地訪問</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400 flex-shrink-0">&#x2717;</span>
              <span>完了報告まで現場の状況が分からない</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400 flex-shrink-0">&#x2717;</span>
              <span>1,200戸の管理で業務が回らない</span>
            </li>
          </ul>
        </div>

        <div className="bg-green-50 rounded-xl p-5 border border-green-100">
          <h3 className="font-bold text-link-dark text-base mb-3">導入後の変化</h3>
          <ul className="space-y-2 text-sm text-link-dark">
            <li className="flex gap-2">
              <span className="text-link-orange flex-shrink-0 font-bold">&#x2713;</span>
              <span>写真付き進捗報告で<strong>現地訪問50%削減</strong></span>
            </li>
            <li className="flex gap-2">
              <span className="text-link-orange flex-shrink-0 font-bold">&#x2713;</span>
              <span>オーナーへの<strong>報告資料がそのまま使える</strong></span>
            </li>
            <li className="flex gap-2">
              <span className="text-link-orange flex-shrink-0 font-bold">&#x2713;</span>
              <span>担当者の<strong>移動時間が月20時間削減</strong></span>
            </li>
          </ul>
        </div>

        <div className="mt-4 bg-link-navy/5 rounded-lg p-4">
          <p className="text-sm text-link-dark italic leading-relaxed">
            「写真報告のおかげで現場に行く回数が半分になった。その分、入居者対応に時間を使えるようになりました。」
          </p>
          <p className="text-xs text-link-gray mt-2 text-right">- B不動産管理 所長様</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Slide 4: 事例3 - C管理様（管理戸数300戸）
// ============================================================
function SlideCase3() {
  return (
    <div className="w-full h-full bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto">
        <p className="text-link-orange font-bold text-sm tracking-wider mb-1 text-center">
          CASE 03
        </p>
        <h2 className="text-2xl font-bold text-link-dark mb-1 text-center">
          入居率改善に<span className="text-link-orange">貢献</span>
        </h2>
        <p className="text-link-gray text-sm mb-5 text-center">
          C管理様（管理戸数300戸）
        </p>

        <div className="bg-slate-50 rounded-xl p-5 mb-4">
          <h3 className="font-bold text-link-dark text-base mb-3">導入前の課題</h3>
          <ul className="space-y-2 text-sm text-link-gray">
            <li className="flex gap-2">
              <span className="text-red-400 flex-shrink-0">&#x2717;</span>
              <span>退去から次の入居までの空室期間が長い</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400 flex-shrink-0">&#x2717;</span>
              <span>原状回復の品質にばらつきがある</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400 flex-shrink-0">&#x2717;</span>
              <span>オーナーからの不満が増えていた</span>
            </li>
          </ul>
        </div>

        <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
          <h3 className="font-bold text-link-dark text-base mb-3">導入後の変化</h3>
          <ul className="space-y-2 text-sm text-link-dark">
            <li className="flex gap-2">
              <span className="text-link-orange flex-shrink-0 font-bold">&#x2713;</span>
              <span>原状回復の<strong>工期が平均5日短縮</strong></span>
            </li>
            <li className="flex gap-2">
              <span className="text-link-orange flex-shrink-0 font-bold">&#x2713;</span>
              <span>仕上がり品質が安定し<strong>オーナー満足度向上</strong></span>
            </li>
            <li className="flex gap-2">
              <span className="text-link-orange flex-shrink-0 font-bold">&#x2713;</span>
              <span>空室期間短縮で<strong>入居率改善に貢献</strong></span>
            </li>
          </ul>
        </div>

        <div className="mt-4 bg-link-navy/5 rounded-lg p-4">
          <p className="text-sm text-link-dark italic leading-relaxed">
            「工事が早くなっただけでなく、仕上がりの品質も上がった。オーナーさんからの信頼が厚くなりました。」
          </p>
          <p className="text-xs text-link-gray mt-2 text-right">- C管理 代表様</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Slide 5: 数値まとめ
// ============================================================
function SlideSummary() {
  const stats = [
    {
      value: "20%",
      label: "平均コスト削減率",
      desc: "内訳付き見積と中間搾取なしで実現",
      color: "bg-blue-50 border-blue-200 text-blue-600",
    },
    {
      value: "3倍",
      label: "対応スピード",
      desc: "見積回答は最短翌営業日",
      color: "bg-green-50 border-green-200 text-green-600",
    },
    {
      value: "98%",
      label: "顧客満足度",
      desc: "導入企業へのアンケート結果",
      color: "bg-amber-50 border-amber-200 text-amber-600",
    },
  ];

  return (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto text-center">
        <p className="text-link-navy font-bold text-sm tracking-wider mb-1">
          RESULTS
        </p>
        <h2 className="text-2xl font-bold text-link-dark mb-5">
          導入企業の<span className="text-link-orange">成果</span>
        </h2>

        <div className="space-y-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-xl p-5 border ${stat.color} text-left`}
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl font-black">{stat.value}</span>
                <div>
                  <h3 className="font-bold text-link-dark text-base">
                    {stat.label}
                  </h3>
                  <p className="text-link-gray text-sm">{stat.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <p className="text-link-gray text-sm">
            ※ 上記数値は導入企業の平均的な改善実績です。
            <br />
            効果は導入企業様の状況により異なります。
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Slide 6: CTA
// ============================================================
function SlideCta() {
  return (
    <div
      id="contact"
      className="w-full h-full bg-gradient-to-br from-link-navy via-[#1e3a5f] to-link-dark flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md mx-auto text-center">
        <p className="text-link-gold font-bold text-sm tracking-wider mb-3">
          START
        </p>
        <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">
          まずは1件、試してみる
        </h2>
        <p className="text-white/70 text-sm mb-8">
          お試し工事で品質をご確認ください。もちろん見積りまで無料です。
        </p>

        <div className="space-y-4">
          <a
            href={`${HP_URL}/contact/construction`}
            onClick={() => trackCtaClick("casestudy_final_cta")}
            className="cta-pulse block bg-link-orange hover:bg-accent-600 text-white font-bold text-lg py-4 px-8 rounded-full transition-colors"
          >
            まずは1件、試してみる
          </a>

          <a
            href={`${HP_URL}/contact/construction`}
            onClick={() => trackCtaClick("casestudy_pdf_cta")}
            className="block bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-full border border-white/20 transition-colors"
          >
            事例集PDFを無料でもらう
          </a>

          <a
            href={PHONE_HREF}
            onClick={() => trackTelClick()}
            className="block text-white/80 hover:text-white text-sm underline underline-offset-4"
          >
            お電話: {PHONE}
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {["相談無料", "見積り無料", "お試し1件OK", "キャンセル料なし"].map(
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

        <p className="text-white/50 text-xs mt-6">
          ※ 対応エリア: 関東一都三県
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
    <SlideCase1 key="case1" />,
    <SlideCase2 key="case2" />,
    <SlideCase3 key="case3" />,
    <SlideSummary key="summary" />,
    <SlideCta key="cta" />,
  ];

  return (
    <SwiperLP
      slides={slides}
      onSlideChange={(index) => trackSlideView(index)}
    />
  );
}
