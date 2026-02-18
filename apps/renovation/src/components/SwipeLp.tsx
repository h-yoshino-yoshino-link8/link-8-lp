"use client";

import { SwiperLP } from "@link8/ui";
import { company } from "@link8/data";
import { trackSlideView, trackCtaClick, trackTelClick } from "@link8/tracking";

const PHONE = company.phone;
const PHONE_HREF = company.phoneHref;
const HP_URL = company.hpUrl;

// ============================================================
// Slide 1: ファーストビュー - 大規模修繕のLinKアプローチ
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
          RENOVATION
        </p>

        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 animate-fade-in-up animate-delay-100">
          建物の未来を、
          <br />
          <span className="text-link-gold">整える。</span>
        </h1>

        <p className="text-white/70 text-base sm:text-lg mb-6 animate-fade-in-up animate-delay-200">
          60社以上の専門家ネットワークで
          <br />
          大規模修繕もワンストップ
        </p>

        <div className="flex justify-center gap-4 mb-6 animate-fade-in-up animate-delay-300">
          {["複数工種対応", "内訳付き見積", "工程可視化"].map((badge) => (
            <span
              key={badge}
              className="bg-white/10 backdrop-blur-sm text-white/90 text-xs px-3 py-1.5 rounded-full border border-white/20"
            >
              {badge}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3 animate-fade-in-up animate-delay-400">
          <a
            href="#contact"
            onClick={() => trackCtaClick("renovation_hero_cta")}
            className="cta-pulse inline-block bg-link-navy hover:bg-primary-600 text-white font-bold text-lg py-4 px-8 rounded-full transition-colors border-2 border-link-gold/40"
          >
            無料の建物診断を申し込む
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
// Slide 2: 課題提起
// ============================================================
function SlideProblems() {
  const problems = [
    {
      icon: "&#x1F4B0;",
      title: "費用の不透明さ",
      desc: "大規模修繕の見積もりが一式表記で、何にいくらかかるか分からない。適正価格なのか判断できない。",
    },
    {
      icon: "&#x1F50D;",
      title: "業者選びの不安",
      desc: "専門性の異なる複数工事を一社にまとめるべきか、分離発注すべきか。判断基準がない。",
    },
    {
      icon: "&#x1F4C5;",
      title: "長期計画の難しさ",
      desc: "いつ・何を・いくらで修繕すべきか。建物の状態を正確に把握できず、計画が立てられない。",
    },
  ];

  return (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto text-center">
        <p className="text-link-orange font-bold text-sm tracking-wider mb-1">
          PROBLEM
        </p>
        <h2 className="text-2xl font-bold text-link-dark mb-1">
          大規模修繕、こんな不安はありませんか？
        </h2>
        <p className="text-link-gray text-sm mb-5">
          マンション管理で多く寄せられる声です
        </p>

        <div className="space-y-4">
          {problems.map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 shadow-sm border border-red-100 text-left flex gap-4 items-start"
            >
              <span className="text-2xl flex-shrink-0" dangerouslySetInnerHTML={{ __html: p.icon }} />
              <div>
                <h3 className="font-bold text-link-dark text-base mb-1">
                  {p.title}
                </h3>
                <p className="text-link-gray text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-link-dark font-bold text-lg">
          その不安、<span className="text-link-navy">LinK</span>が解消します
        </p>
      </div>
    </div>
  );
}

// ============================================================
// Slide 3: LinKの強み
// ============================================================
function SlideStrengths() {
  const strengths = [
    {
      num: "01",
      title: "複数工種のワンストップ",
      desc: "外壁・防水・設備・内装を一括で管理。60社以上の専門家ネットワークで最適な職人をアサイン。",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      num: "02",
      title: "内訳付き見積",
      desc: "工事項目ごとに材料費・人件費・諸経費を明記。何にいくらかかるか一目で分かる見積書をお出しします。",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
    },
    {
      num: "03",
      title: "工程管理の可視化",
      desc: "工事の各工程を写真で記録・共有。現場に行かなくても進捗をリアルタイムで把握できます。",
      color: "bg-amber-50 border-amber-200",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <div className="w-full h-full bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto text-center">
        <p className="text-link-navy font-bold text-sm tracking-wider mb-1">
          WHY LinK
        </p>
        <h2 className="text-2xl font-bold text-link-dark mb-5">
          LinKの<span className="text-link-navy">3</span>つの強み
        </h2>

        <div className="space-y-4">
          {strengths.map((s) => (
            <div
              key={s.num}
              className={`rounded-xl p-5 border ${s.color} text-left`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className={`${s.iconColor} font-black text-2xl leading-none`}>
                  {s.num}
                </span>
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
// Slide 4: 対応工事
// ============================================================
function SlideServices() {
  const services = [
    {
      title: "外壁塗装",
      desc: "ひび割れ補修・高圧洗浄・塗装。建物の美観と防水性を回復。",
      icon: "&#x1F3E2;",
    },
    {
      title: "防水工事",
      desc: "屋上・バルコニー・廊下の防水。漏水を防ぎ建物の寿命を延長。",
      icon: "&#x1F4A7;",
    },
    {
      title: "設備更新",
      desc: "給排水管・電気設備・エレベーター。老朽化設備のリニューアル。",
      icon: "&#x2699;",
    },
    {
      title: "共用部改修",
      desc: "エントランス・廊下・階段の美装。入居者満足度と物件価値の向上。",
      icon: "&#x1F6AA;",
    },
    {
      title: "耐震補強",
      desc: "耐震診断に基づく補強工事。建物の安全性と資産価値を守る。",
      icon: "&#x1F3D7;",
    },
  ];

  return (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-5">
          <p className="text-link-navy font-bold text-sm tracking-wider mb-1">
            SERVICES
          </p>
          <h2 className="text-2xl font-bold text-link-dark">対応工事</h2>
        </div>

        <div className="space-y-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex gap-3 items-start"
            >
              <span className="text-2xl flex-shrink-0" dangerouslySetInnerHTML={{ __html: s.icon }} />
              <div>
                <h3 className="font-bold text-link-dark text-sm">{s.title}</h3>
                <p className="text-link-gray text-xs leading-relaxed mt-0.5">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Slide 5: 施工実績
// ============================================================
function SlideWorks() {
  const works = [
    {
      title: "A マンション 外壁塗装+防水",
      specs: "RC造5階建 / 築25年 / 20戸",
      cost: "概算: 1,200万円",
      period: "工期: 2ヶ月",
      gradient: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%)",
    },
    {
      title: "B マンション 大規模修繕",
      specs: "RC造8階建 / 築30年 / 48戸",
      cost: "概算: 3,500万円",
      period: "工期: 4ヶ月",
      gradient: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 50%, #38bdf8 100%)",
    },
    {
      title: "C アパート 設備更新+共用部改修",
      specs: "鉄骨造3階建 / 築20年 / 12戸",
      cost: "概算: 600万円",
      period: "工期: 1ヶ月",
      gradient: "linear-gradient(135deg, #047857 0%, #10b981 50%, #34d399 100%)",
    },
  ];

  return (
    <div className="w-full h-full bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-5">
          <p className="text-link-navy font-bold text-sm tracking-wider mb-1">
            WORKS
          </p>
          <h2 className="text-2xl font-bold text-link-dark">施工実績</h2>
        </div>

        <div className="space-y-4">
          {works.map((w) => (
            <div key={w.title} className="rounded-xl overflow-hidden border border-slate-100 shadow-sm">
              <div
                className="h-24 flex items-center justify-center text-white/80 text-sm font-bold"
                style={{ backgroundImage: w.gradient }}
              >
                施工写真
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-bold text-link-dark text-sm mb-1">{w.title}</h3>
                <p className="text-link-gray text-xs mb-2">{w.specs}</p>
                <div className="flex gap-3">
                  <span className="bg-link-navy/5 text-link-navy text-xs px-2 py-1 rounded font-medium">
                    {w.cost}
                  </span>
                  <span className="bg-link-navy/5 text-link-navy text-xs px-2 py-1 rounded font-medium">
                    {w.period}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Slide 6: CTA - 無料建物診断申込
// ============================================================
function SlideCta() {
  return (
    <div
      id="contact"
      className="w-full h-full bg-gradient-to-br from-link-navy via-[#1e3a5f] to-link-dark flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md mx-auto text-center">
        <p className="text-link-gold font-bold text-sm tracking-wider mb-3">
          FREE DIAGNOSIS
        </p>
        <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">
          まずは無料の建物診断から
        </h2>
        <p className="text-white/70 text-sm mb-8">
          建物の状態を把握し、最適な修繕計画をご提案します。
          <br />
          診断は完全無料。修繕の義務はありません。
        </p>

        <div className="space-y-4">
          <a
            href={`${HP_URL}/contact/construction`}
            onClick={() => trackCtaClick("renovation_final_cta")}
            className="cta-pulse block bg-link-navy hover:bg-primary-600 text-white font-bold text-lg py-4 px-8 rounded-full transition-colors border-2 border-link-gold/40"
          >
            無料の建物診断を申し込む
          </a>

          <a
            href={PHONE_HREF}
            onClick={() => trackTelClick()}
            className="block bg-link-orange hover:bg-accent-600 text-white font-bold py-3 px-8 rounded-full transition-colors"
          >
            お電話: {PHONE}
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {["診断無料", "見積り無料", "修繕義務なし", "関東一都三県対応"].map(
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
          ※ 対応エリア: 関東一都三県 / 繁忙期は受付を制限する場合がございます
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
    <SlideProblems key="problems" />,
    <SlideStrengths key="strengths" />,
    <SlideServices key="services" />,
    <SlideWorks key="works" />,
    <SlideCta key="cta" />,
  ];

  return (
    <SwiperLP
      slides={slides}
      onSlideChange={(index) => trackSlideView(index)}
    />
  );
}
