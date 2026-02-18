"use client";

import { SwiperLP } from "@link8/ui";
import { company, PHONE, PHONE_HREF, HP_URL } from "@link8/data";
import { trackSlideView, trackCtaClick, trackTelClick } from "@link8/tracking";

const FORM_URL = `${HP_URL}/contact/partner`;

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
        <p className="text-white/60 text-sm tracking-[0.3em] mb-6 animate-fade-in-up">
          {company.name} パートナー募集
        </p>

        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 animate-fade-in-up animate-delay-100">
          共に成長する、
          <br />
          <span className="text-link-gold">パートナーへ。</span>
        </h1>

        <p className="text-white/70 text-base sm:text-lg mb-8 animate-fade-in-up animate-delay-200">
          {company.network}のネットワークに参画しませんか
          <br />
          安定した案件と透明な取引をお約束
        </p>

        <div className="flex flex-col gap-3 animate-fade-in-up animate-delay-300">
          <a
            href={FORM_URL}
            onClick={() => trackCtaClick("hero_partner_cta")}
            className="cta-pulse inline-block bg-link-navy hover:bg-primary-600 text-white font-bold text-lg py-4 px-8 rounded-full transition-colors border border-white/20"
          >
            パートナー登録する
          </a>
          <a
            href={PHONE_HREF}
            onClick={() => trackTelClick()}
            className="inline-block text-white/80 hover:text-white text-sm underline underline-offset-4"
          >
            お電話はこちら: {PHONE}
          </a>
        </div>

        <div className="flex justify-center gap-4 mt-8 animate-fade-in-up animate-delay-400">
          {[`現在${company.network}参画`, "翌月末払い", company.area].map(
            (badge) => (
              <span
                key={badge}
                className="bg-white/10 backdrop-blur-sm text-white/90 text-xs px-3 py-1.5 rounded-full border border-white/20"
              >
                {badge}
              </span>
            )
          )}
        </div>

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
// Slide 2: パートナーになるメリット
// ============================================================
function SlideMerits() {
  const merits = [
    {
      num: "01",
      title: "安定した案件数",
      desc: "賃貸管理会社との継続的な取引があるため、年間を通じて安定した案件をご紹介できます。繁閑の波を平準化。",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      num: "02",
      title: "支払い条件の明瞭さ",
      desc: "翌月末払いを徹底。工事完了後の支払い遅延はありません。明瞭な単価表で事前に合意します。",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
    },
    {
      num: "03",
      title: "共に成長する仕組み",
      desc: "案件フィードバック、品質勉強会、合同安全大会。技術向上とネットワーク拡大を一緒に実現します。",
      color: "bg-amber-50 border-amber-200",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <div className="w-full h-full bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto text-center">
        <p className="text-link-navy font-bold text-sm tracking-wider mb-1">
          MERITS
        </p>
        <h2 className="text-2xl font-bold text-link-dark mb-5">
          パートナーになる
          <span className="text-link-orange">メリット</span>
        </h2>

        <div className="space-y-4">
          {merits.map((m) => (
            <div
              key={m.num}
              className={`rounded-xl p-5 border ${m.color} text-left`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`${m.iconColor} font-black text-2xl leading-none`}
                >
                  {m.num}
                </span>
                <h3 className="font-bold text-link-dark text-lg">{m.title}</h3>
              </div>
              <p className="text-link-gray text-sm leading-relaxed pl-10">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Slide 3: パートナーの声
// ============================================================
function SlidePartnerVoices() {
  const voices = [
    {
      company: "内装工事会社 D社",
      area: "東京都",
      years: "パートナー歴3年",
      comment:
        "以前は元請けからの支払いが遅れることが多く資金繰りに苦労していました。LinKさんは翌月末に必ず払ってくれるので安心して仕事に集中できます。",
    },
    {
      company: "設備工事会社 E社",
      area: "神奈川県",
      years: "パートナー歴2年",
      comment:
        "案件の情報共有が丁寧で、現場に入る前に必要な情報が揃っている。段取りが良いので効率よく動けるのがありがたいです。",
    },
    {
      company: "塗装工事 F社",
      area: "埼玉県",
      years: "パートナー歴1年",
      comment:
        "他社と違って中間マージンの搾取がなく、適正な単価で仕事ができる。品質勉強会も刺激になっています。",
    },
  ];

  return (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto text-center">
        <p className="text-link-navy font-bold text-sm tracking-wider mb-1">
          PARTNER VOICES
        </p>
        <h2 className="text-2xl font-bold text-link-dark mb-5">
          パートナーの声
        </h2>

        <div className="space-y-4">
          {voices.map((v) => (
            <div
              key={v.company}
              className="bg-white rounded-xl p-5 text-left shadow-sm border border-slate-100"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-link-navy/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-link-navy font-bold text-sm">
                    {v.company.slice(-2, -1)}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-link-dark text-sm">
                    {v.company}
                  </p>
                  <p className="text-link-gray text-xs">
                    {v.area} / {v.years}
                  </p>
                </div>
              </div>
              <p className="text-link-gray text-sm leading-relaxed">
                「{v.comment}」
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Slide 4: 対応エリア・工種
// ============================================================
function SlideAreaServices() {
  const services = [
    "クロス工事",
    "床工事（CF・フローリング）",
    "塗装工事",
    "設備工事（水回り）",
    "電気工事",
    "ハウスクリーニング",
    "大工工事",
    "防水工事",
    "解体工事",
    "外構工事",
  ];

  const areas = ["東京都", "神奈川県", "埼玉県", "千葉県"];

  return (
    <div className="w-full h-full bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto text-center">
        <p className="text-link-navy font-bold text-sm tracking-wider mb-1">
          AREA & SERVICES
        </p>
        <h2 className="text-2xl font-bold text-link-dark mb-5">
          対応エリア・工種
        </h2>

        {/* エリア */}
        <div className="mb-6">
          <h3 className="font-bold text-link-dark text-sm mb-3">
            対応エリア: {company.area}
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {areas.map((area) => (
              <span
                key={area}
                className="bg-link-navy text-white text-sm font-bold px-4 py-2 rounded-full"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* 工種一覧 */}
        <div>
          <h3 className="font-bold text-link-dark text-sm mb-3">
            募集工種一覧
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {services.map((s) => (
              <div
                key={s}
                className="bg-slate-50 rounded-lg p-2.5 text-sm text-link-dark border border-slate-100 text-left"
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        <p className="text-link-gray text-xs mt-4">
          ※ 上記以外の工種もご相談ください
        </p>
      </div>
    </div>
  );
}

// ============================================================
// Slide 5: CTA - パートナー登録
// ============================================================
function SlideCta() {
  return (
    <div
      id="contact"
      className="w-full h-full bg-gradient-to-br from-link-navy via-[#1e3a5f] to-link-dark flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md mx-auto text-center">
        <p className="text-link-gold font-bold text-sm tracking-wider mb-3">
          PARTNER ENTRY
        </p>
        <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">
          パートナー登録はこちら
        </h2>
        <p className="text-white/70 text-sm mb-8">
          まずはお気軽にお話しください。工種・エリア・ご希望をお聞かせください。
        </p>

        <div className="space-y-4">
          <a
            href={FORM_URL}
            onClick={() => trackCtaClick("final_partner_form")}
            className="cta-pulse block bg-link-navy hover:bg-primary-600 text-white font-bold text-lg py-4 px-8 rounded-full transition-colors border border-link-gold/40"
            style={{
              animation: "pulse-glow-navy 2s ease-in-out infinite",
            }}
          >
            パートナー登録フォーム
          </a>

          <a
            href={PHONE_HREF}
            onClick={() => trackTelClick()}
            className="block bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-full border border-white/20 transition-colors"
          >
            まずは話を聞く
          </a>

          <a
            href={PHONE_HREF}
            onClick={() => trackTelClick()}
            className="block text-white/60 hover:text-white text-sm underline underline-offset-4"
          >
            お電話: {PHONE}
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {["翌月末払い保証", "適正単価", "継続案件あり"].map((badge) => (
            <span
              key={badge}
              className="bg-link-gold/20 text-link-gold text-xs font-bold px-3 py-1.5 rounded-full border border-link-gold/30"
            >
              {badge}
            </span>
          ))}
        </div>

        <p className="text-white/50 text-xs mt-6">
          ※ 対応エリア: {company.area}
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
// メイン PartnerLP コンポーネント
// ============================================================
export default function PartnerLP() {
  const slides = [
    <SlideHero key="hero" />,
    <SlideMerits key="merits" />,
    <SlidePartnerVoices key="voices" />,
    <SlideAreaServices key="area" />,
    <SlideCta key="cta" />,
  ];

  return (
    <SwiperLP
      slides={slides}
      onSlideChange={(index) => trackSlideView(index)}
    />
  );
}
