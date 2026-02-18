"use client";

import { SwiperLP } from "@link8/ui";
import { company, PHONE, PHONE_HREF, HP_URL } from "@link8/data";
import { trackSlideView, trackCtaClick, trackTelClick } from "@link8/tracking";

const FORM_URL = `${HP_URL}/contact/recruit`;

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
          {company.name} 採用情報
        </p>

        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 animate-fade-in-up animate-delay-100">
          建設業界を、
          <br />
          <span className="text-link-gold">整える側へ。</span>
        </h1>

        <p className="text-white/70 text-base sm:text-lg mb-8 animate-fade-in-up animate-delay-200">
          少数精鋭 × {company.network}のネットワーク
          <br />
          業界を変える仲間を募集
        </p>

        <div className="flex flex-col gap-3 animate-fade-in-up animate-delay-300">
          <a
            href={FORM_URL}
            onClick={() => trackCtaClick("hero_recruit_cta")}
            className="cta-pulse inline-block bg-link-orange hover:bg-accent-600 text-white font-bold text-lg py-4 px-8 rounded-full transition-colors"
          >
            募集職種を見る
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
          {["少数精鋭チーム", `協力会社${company.network}`, "DX推進中"].map(
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
// Slide 2: ビジョン - 代表の原体験
// ============================================================
function SlideVision() {
  return (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto text-center">
        <p className="text-link-orange font-bold text-sm tracking-wider mb-1">
          VISION
        </p>
        <h2 className="text-2xl font-bold text-link-dark mb-4">
          なぜ LinK をつくったのか
        </h2>

        {/* 代表アイコン */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-link-navy to-link-dark mx-auto mb-3 flex items-center justify-center">
          <span className="text-white text-2xl font-bold">Y</span>
        </div>
        <p className="text-link-dark font-bold text-sm mb-1">
          代表 {company.representative}
        </p>
        <p className="text-link-gray text-xs mb-4">{company.experience}</p>

        <div className="bg-white rounded-xl p-5 text-left space-y-3 shadow-sm border border-slate-100">
          <p className="text-sm text-link-dark leading-relaxed">
            建設業界で11年。見積もりの不透明さ、多重下請け構造、情報の断絶。
            現場で感じた<strong>「おかしい」</strong>を放置できなくなりました。
          </p>
          <p className="text-sm text-link-dark leading-relaxed">
            {company.network}
            の専門家と直接つながるネットワークを構築し、
            <strong>中間搾取のない、透明な業界</strong>をつくる。
            これがLinKの存在理由です。
          </p>
          <p className="text-sm text-link-dark leading-relaxed font-bold text-link-navy">
            「{company.purpose}」
          </p>
        </div>

        <p className="mt-4 text-link-gray text-xs">
          この想いに共感してくれる仲間を探しています
        </p>
      </div>
    </div>
  );
}

// ============================================================
// Slide 3: 働く環境
// ============================================================
function SlideEnvironment() {
  const features = [
    {
      num: "01",
      title: "裁量が大きい少数精鋭",
      desc: "大企業の歯車ではなく、一人ひとりが会社の柱。自分のアイデアがダイレクトに事業に反映されます。",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      num: "02",
      title: `${company.network}の多様な現場`,
      desc: "原状回復からリフォームまで、多種多様な現場を経験。スキルの幅が圧倒的に広がります。",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
    },
    {
      num: "03",
      title: "DX推進で業界を変える",
      desc: "写真付き進捗報告、デジタル見積。最新のテクノロジーで「当たり前」を変える挑戦ができます。",
      color: "bg-amber-50 border-amber-200",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <div className="w-full h-full bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto text-center">
        <p className="text-link-navy font-bold text-sm tracking-wider mb-1">
          ENVIRONMENT
        </p>
        <h2 className="text-2xl font-bold text-link-dark mb-5">
          LinK の<span className="text-link-orange">働く環境</span>
        </h2>

        <div className="space-y-4">
          {features.map((f) => (
            <div
              key={f.num}
              className={`rounded-xl p-5 border ${f.color} text-left`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`${f.iconColor} font-black text-2xl leading-none`}
                >
                  {f.num}
                </span>
                <h3 className="font-bold text-link-dark text-lg">{f.title}</h3>
              </div>
              <p className="text-link-gray text-sm leading-relaxed pl-10">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Slide 4: 募集職種
// ============================================================
function SlidePositions() {
  const positions = [
    {
      title: "施工管理",
      tags: ["正社員", "経験者優遇"],
      desc: "原状回復・リフォーム現場の施工管理。協力会社との調整、工程管理、品質チェックを担当。",
      highlights: ["直行直帰OK", "エリア: 関東一都三県"],
    },
    {
      title: "現場職人",
      tags: ["正社員 / 業務委託", "経験不問"],
      desc: "クロス・床・塗装・設備など各種施工。未経験でも先輩職人がイチから指導します。",
      highlights: ["資格取得支援あり", "多能工も歓迎"],
    },
    {
      title: "事務スタッフ",
      tags: ["正社員 / パート", "未経験OK"],
      desc: "見積書作成、電話対応、書類整理、データ入力。業界知識はなくても大丈夫です。",
      highlights: ["残業ほぼなし", "DXツール活用"],
    },
  ];

  return (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto text-center">
        <p className="text-link-navy font-bold text-sm tracking-wider mb-1">
          POSITIONS
        </p>
        <h2 className="text-2xl font-bold text-link-dark mb-5">募集職種</h2>

        <div className="space-y-4">
          {positions.map((pos) => (
            <div
              key={pos.title}
              className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 text-left"
            >
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-link-dark text-lg">
                  {pos.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {pos.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-link-navy/5 text-link-navy text-xs px-2 py-0.5 rounded font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-link-gray text-sm leading-relaxed mb-2">
                {pos.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {pos.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-link-orange text-xs font-bold"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Slide 5: 社員の声
// ============================================================
function SlideVoices() {
  const voices = [
    {
      name: "施工管理 Aさん",
      years: "入社2年目",
      comment:
        "前職は大手ゼネコンの下請け。ここでは自分で判断できる範囲が広く、成長を実感できます。代表との距離が近いのも魅力。",
    },
    {
      name: "現場職人 Bさん",
      years: "入社3年目",
      comment:
        "未経験から入って、今ではクロスも床も一人で仕上げられるように。色んな現場を経験できるのが楽しい。",
    },
    {
      name: "事務 Cさん",
      years: "入社1年目",
      comment:
        "建設業界は初めてでしたが、DXツールのおかげで覚えやすかった。残業もほぼなく、プライベートも充実しています。",
    },
  ];

  return (
    <div className="w-full h-full bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto text-center">
        <p className="text-link-navy font-bold text-sm tracking-wider mb-1">
          VOICES
        </p>
        <h2 className="text-2xl font-bold text-link-dark mb-5">社員の声</h2>

        <div className="space-y-4">
          {voices.map((v) => (
            <div
              key={v.name}
              className="bg-slate-50 rounded-xl p-5 text-left border border-slate-100"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-link-navy/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-link-navy font-bold text-sm">
                    {v.name.slice(-2, -1)}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-link-dark text-sm">{v.name}</p>
                  <p className="text-link-gray text-xs">{v.years}</p>
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
// Slide 6: CTA - 応募フォーム
// ============================================================
function SlideCta() {
  return (
    <div
      id="contact"
      className="w-full h-full bg-gradient-to-br from-link-navy via-[#1e3a5f] to-link-dark flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md mx-auto text-center">
        <p className="text-link-gold font-bold text-sm tracking-wider mb-3">
          ENTRY
        </p>
        <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">
          一緒に業界を変えませんか
        </h2>
        <p className="text-white/70 text-sm mb-8">
          まずはカジュアルにお話しましょう。お気軽にご連絡ください。
        </p>

        <div className="space-y-4">
          <a
            href={FORM_URL}
            onClick={() => trackCtaClick("final_recruit_form")}
            className="cta-pulse block bg-link-orange hover:bg-accent-600 text-white font-bold text-lg py-4 px-8 rounded-full transition-colors"
          >
            応募・エントリーする
          </a>

          <a
            href={PHONE_HREF}
            onClick={() => trackTelClick()}
            className="block bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-full border border-white/20 transition-colors"
          >
            カジュアル面談を申し込む
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
          {["未経験歓迎", "カジュアル面談OK", "服装自由"].map((badge) => (
            <span
              key={badge}
              className="bg-link-gold/20 text-link-gold text-xs font-bold px-3 py-1.5 rounded-full border border-link-gold/30"
            >
              {badge}
            </span>
          ))}
        </div>

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
// メイン RecruitLP コンポーネント
// ============================================================
export default function RecruitLP() {
  const slides = [
    <SlideHero key="hero" />,
    <SlideVision key="vision" />,
    <SlideEnvironment key="environment" />,
    <SlidePositions key="positions" />,
    <SlideVoices key="voices" />,
    <SlideCta key="cta" />,
  ];

  return (
    <SwiperLP
      slides={slides}
      onSlideChange={(index) => trackSlideView(index)}
    />
  );
}
