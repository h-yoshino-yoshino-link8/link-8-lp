"use client";

import { SwiperLP } from "@link8/ui";
import { company } from "@link8/data";
import {
  trackSlideView,
  trackCtaClick,
  trackTelClick,
  trackFormSubmit,
} from "@link8/tracking";
import { useState, useCallback } from "react";

const PHONE = company.phone;
const PHONE_HREF = company.phoneHref;
const FORMSPARK_ID = "qvZdUnofr";

// ============================================================
// Slide 1: 衝撃 — 「その屋根、20kgに耐えられますか？」
// 損失回避フレーム（CVR +30%）
// ============================================================
function SlideHero() {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-red-700 via-red-800 to-red-950 flex items-center justify-center overflow-hidden">
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
      <div className="absolute top-0 left-0 w-full bg-black/40 py-2.5 flex items-center justify-center gap-2">
        <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse" />
        <span className="text-yellow-400 text-xs font-black tracking-wider">
          スレート屋根の工場オーナー様へ
        </span>
        <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
        {/* メインコピー */}
        <h1 className="text-white text-3xl sm:text-4xl font-black leading-[1.3] mb-4 drop-shadow-lg">
          その屋根、
          <br />
          <span className="text-4xl sm:text-5xl">20kg</span>に
          <br />
          耐えられますか？
        </h1>

        <p className="text-white/80 text-base sm:text-lg font-medium mb-3 leading-relaxed">
          従来パネル1枚20kg。
          <br />
          スレート屋根には、<strong className="text-yellow-300">重すぎる。</strong>
        </p>

        <p className="text-white/60 text-sm mb-8 leading-relaxed">
          太陽光を載せたいのに「屋根がもたない」と
          <br />
          断られた経験はありませんか。
        </p>

        {/* 重量比較 — 巨大数字 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-5 border-2 border-red-400/50">
            <p className="text-red-300 text-5xl sm:text-6xl font-black leading-none">
              20<span className="text-3xl sm:text-4xl">kg</span>
            </p>
            <p className="text-white/60 text-sm mt-2 font-bold">従来パネル</p>
            <div className="mt-3 bg-red-500/30 rounded-full py-1 px-3 inline-block">
              <span className="text-red-300 text-xs font-black">設置不可</span>
            </div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-5 border-2 border-emerald-400/50">
            <p className="text-emerald-300 text-5xl sm:text-6xl font-black leading-none">
              3.7<span className="text-3xl sm:text-4xl">kg</span>
            </p>
            <p className="text-white/60 text-sm mt-2 font-bold">ペラペラ太陽光</p>
            <div className="mt-3 bg-emerald-500/30 rounded-full py-1 px-3 inline-block">
              <span className="text-emerald-300 text-xs font-black">設置OK</span>
            </div>
          </div>
        </div>

        <p className="text-white/50 text-xs">
          ※従来結晶シリコンパネル平均重量との比較
        </p>

        {/* スクロールヒント */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <svg
            className="w-8 h-8 text-white/40 mx-auto animate-bounce"
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
// Slide 2: 解決策 — 「3mm。曲がる太陽光パネル。」
// 巨大数字（理解速度2.3倍）
// ============================================================
function SlideSolution() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center overflow-hidden px-4">
      {/* 背景のグロー */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]" />

      <div className="relative z-10 w-full max-w-md mx-auto text-center">
        <p className="text-emerald-400 font-black text-xs tracking-[0.3em] mb-2">
          TSP社製 ペラペラ太陽光
        </p>

        {/* メイン数字ドーン */}
        <div className="mb-2">
          <span className="text-emerald-400 text-8xl sm:text-9xl font-black leading-none">
            3.7
          </span>
          <span className="text-emerald-400/60 text-4xl sm:text-5xl font-black">
            kg
          </span>
        </div>
        <h2 className="text-white text-xl sm:text-2xl font-bold mb-1">
          3mm。曲がる太陽光パネル。
        </h2>
        <p className="text-white/50 text-sm mb-8 leading-relaxed">
          軽いだけじゃない。性能も、保証も、業界トップクラス。
        </p>

        {/* スペック4つ */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { value: "3mm", label: "厚さ", sub: "下敷き2枚分" },
            { value: "23.5%", label: "変換効率", sub: "N型TOPConセル" },
            { value: "60m/s", label: "耐風速", sub: "大型台風クラス" },
            { value: "25年", label: "出力保証", sub: "リニア保証" },
          ].map((spec) => (
            <div
              key={spec.label}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
            >
              <p className="text-white text-2xl sm:text-3xl font-black">
                {spec.value}
              </p>
              <p className="text-white/70 text-xs font-bold mt-1">
                {spec.label}
              </p>
              <p className="text-white/40 text-[10px] mt-0.5">{spec.sub}</p>
            </div>
          ))}
        </div>

        {/* タグ */}
        <div className="flex flex-wrap justify-center gap-2">
          {["スレート屋根OK", "塩害対応（50m+）", "曲面120°対応"].map((tag) => (
            <span
              key={tag}
              className="bg-emerald-500/20 text-emerald-400 text-xs font-black px-3 py-1.5 rounded-full border border-emerald-500/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Slide 3: 独自ポジション — 「太陽光だけの会社じゃない。」
// ============================================================
function SlideStrength() {
  return (
    <div className="w-full h-full bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-6">
          <p className="text-emerald-600 font-black text-xs tracking-[0.3em] mb-2">
            WHY LinK
          </p>
          <h2 className="text-slate-900 text-2xl sm:text-3xl font-black leading-tight">
            太陽光だけの
            <br />
            会社じゃない。
          </h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            建設業許可を持つ、唯一の太陽光代理店。
          </p>
        </div>

        {/* 3つの強み — カラーブロック */}
        <div className="space-y-3">
          {/* 強み1: メイン — 大きく */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between mb-2">
              <p className="text-emerald-200 text-xs font-black tracking-wider">
                01 — ONLY LinK
              </p>
              <span className="bg-white/20 text-white text-[10px] font-black px-2.5 py-1 rounded-full">
                建設業許可 取得済
              </span>
            </div>
            <h3 className="text-xl font-black mb-1">
              耐震補強 + 太陽光
            </h3>
            <p className="text-emerald-100/80 text-sm leading-relaxed">
              屋根の補強工事から太陽光設置まで、
              <br />
              ワンストップで施工。
            </p>
            <p className="text-emerald-200/60 text-xs mt-2 font-bold">
              「屋根が弱いから無理」とは、言わない。
            </p>
          </div>

          {/* 強み2, 3: 横並び */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900 rounded-2xl p-4 text-white">
              <p className="text-slate-400 text-[10px] font-black tracking-wider mb-1">
                02
              </p>
              <h3 className="text-sm font-black mb-1">建物の知識</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                原状回復11年。
                <br />
                屋根・構造の診断力。
              </p>
            </div>
            <div className="bg-slate-900 rounded-2xl p-4 text-white">
              <p className="text-slate-400 text-[10px] font-black tracking-wider mb-1">
                03
              </p>
              <h3 className="text-sm font-black mb-1">全国施工網</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                27社のEPCネットワーク。
                <br />
                累計3万件超の実績。
              </p>
              <p className="text-slate-500 text-[10px] mt-1">
                ※EPC＝設計・調達・施工
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Slide 4: コストメリット — 「電気代、半分にした工場がある。」
// 損失回避フレーム（CVR +30%）
// ============================================================
function SlideCost() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 flex items-center justify-center overflow-hidden px-4">
      {/* 背景グロー */}
      <div className="absolute top-20 right-10 w-60 h-60 bg-amber-500/5 rounded-full blur-[80px]" />

      <div className="relative z-10 w-full max-w-md mx-auto text-center">
        <p className="text-amber-400 font-black text-xs tracking-[0.3em] mb-3">
          COST MERIT
        </p>

        {/* メインコピー */}
        <h2 className="text-white text-xl sm:text-2xl font-black mb-1 leading-tight">
          電気代、半分にした工場がある。
        </h2>

        {/* メイン数字 */}
        <div className="mb-6">
          <span className="text-amber-400 text-7xl sm:text-8xl font-black leading-none">
            50
          </span>
          <span className="text-amber-400/60 text-3xl sm:text-4xl font-black">
            %
          </span>
          <span className="text-white text-2xl sm:text-3xl font-black ml-2">
            削減
          </span>
        </div>

        {/* 導入実例カード */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 mb-5 text-left">
          <p className="text-amber-400 text-xs font-black tracking-wider mb-4">
            実際の導入企業データ
          </p>
          <div className="space-y-3">
            {[
              { label: "業種", value: "食品加工工場" },
              { label: "設備容量", value: "240kW" },
              {
                label: "年間削減額",
                value: "700万円",
                highlight: true,
              },
              { label: "投資回収", value: "4.5年", highlight: true },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center"
              >
                <span className="text-white/50 text-sm">{item.label}</span>
                <span
                  className={`font-black text-lg ${
                    item.highlight ? "text-amber-400" : "text-white"
                  }`}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 追加メリット3つ */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { title: "初期費用0円", desc: "PPA対応" },
            { title: "即時償却", desc: "税制優遇" },
            { title: "2026年〜", desc: "目標策定義務化" },
          ].map((b) => (
            <div
              key={b.title}
              className="bg-white/5 rounded-xl p-3 border border-white/10"
            >
              <p className="text-white text-xs font-black">{b.title}</p>
              <p className="text-white/40 text-[10px] mt-1">{b.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-white/30 text-[10px] mt-4">
          ※削減額は設置規模・電力使用量により変動します
        </p>
      </div>
    </div>
  );
}

// ============================================================
// Slide 5: 導入フロー — 「まずは『いくら浮くか』だけ、聞いてみる。」
// ============================================================
function SlideFlow() {
  const steps = [
    {
      num: "01",
      title: "無料Zoom相談",
      desc: "電気代の明細をお見せいただくだけ。訪問不要、オンラインで完結。",
      badge: "オンライン完結",
    },
    {
      num: "02",
      title: "削減試算＋現地調査",
      desc: "屋根の状態を確認し、年間の削減見込み額をお出しする。",
      badge: "試算まで無料",
    },
    {
      num: "03",
      title: "設計・施工",
      desc: "ご納得いただけたら着工。補助金申請もLinKがすべて代行。",
      badge: null,
    },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <p className="text-emerald-600 font-black text-xs tracking-[0.3em] mb-2">
            FLOW
          </p>
          <h2 className="text-slate-900 text-xl sm:text-2xl font-black leading-tight">
            まずは「いくら浮くか」だけ、
            <br />
            聞いてみる。
          </h2>
          <p className="text-emerald-600 font-bold text-sm mt-2">
            試算まで完全無料。契約の義務も、一切なし。
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-start gap-4">
              {/* 番号 + 線 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-sm flex-shrink-0">
                  {step.num}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-0.5 h-8 bg-slate-200 mt-1" />
                )}
              </div>
              {/* コンテンツ */}
              <div className="flex-1 bg-white rounded-2xl p-4 shadow-lg shadow-slate-100 border border-slate-100 -mt-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-black text-slate-900 text-base">
                    {step.title}
                  </h3>
                  {step.badge && (
                    <span className="bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full">
                      {step.badge}
                    </span>
                  )}
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
          <p className="text-slate-900 text-sm font-bold">
            ここまで、お金はかからない。
          </p>
          <p className="text-slate-500 text-xs mt-1">
            試算の結果を見て「やめます」でも、まったく問題なし。
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Slide 6: CTA — 「無料で削減試算を受ける」
// フォーム3フィールド（最高CVR）
// ============================================================
function SlideCta() {
  const [formState, setFormState] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    phone: "",
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setFormState("sending");
      trackCtaClick("solar_form_submit");

      try {
        const res = await fetch(`https://submit-form.com/${FORMSPARK_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            _subject: "【太陽光LP】無料削減試算のお申し込み",
            会社名: formData.company,
            お名前: formData.name,
            電話番号: formData.phone,
            問い合わせ種別: "ペラペラ太陽光 無料削減試算",
            source: "lp-solar",
          }),
        });
        if (res.ok) {
          setFormState("sent");
          trackFormSubmit("solar");
        } else {
          setFormState("error");
        }
      } catch {
        setFormState("error");
      }
    },
    [formData]
  );

  if (formState === "sent") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-white text-3xl font-black mb-4">
            ありがとうございます
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-8">
            2営業日以内に、LinKの担当からご連絡いたします。
            <br />
            削減試算の結果をお届けします。
          </p>
          <a
            href={PHONE_HREF}
            onClick={() => trackTelClick()}
            className="inline-block bg-white/10 hover:bg-white/20 text-white font-black text-lg py-4 px-8 rounded-full border border-white/20 transition-colors"
          >
            お急ぎの方: {PHONE}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      id="contact"
      className="w-full h-full bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 flex items-center justify-center px-4 overflow-y-auto"
    >
      <div className="w-full max-w-md mx-auto text-center py-8">
        <p className="text-emerald-400 font-black text-xs tracking-[0.3em] mb-4">
          FREE CONSULTATION
        </p>
        <h2 className="text-white text-2xl sm:text-3xl font-black mb-2 leading-tight">
          無料で削減試算を受ける
        </h2>
        <p className="text-white/50 text-sm mb-6 leading-relaxed">
          電気代の明細1枚で、年間いくら浮くかがわかる。
        </p>

        {/* マイクロコピー */}
        <p className="text-emerald-400/70 text-xs mb-4 font-bold">
          入力はたった3項目。30秒で完了
        </p>

        {/* フォーム */}
        <form onSubmit={handleSubmit} className="space-y-3 mb-4">
          <input
            type="text"
            placeholder="会社名"
            required
            value={formData.company}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, company: e.target.value }))
            }
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 text-base focus:outline-none focus:border-emerald-400 transition-colors"
          />
          <input
            type="text"
            placeholder="ご担当者名"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 text-base focus:outline-none focus:border-emerald-400 transition-colors"
          />
          <input
            type="tel"
            placeholder="電話番号"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 text-base focus:outline-none focus:border-emerald-400 transition-colors"
          />
          <button
            type="submit"
            disabled={formState === "sending"}
            className="cta-pulse w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-black text-lg py-4 rounded-full transition-colors shadow-lg shadow-emerald-500/30"
          >
            {formState === "sending"
              ? "送信中..."
              : "無料で削減試算を受ける"}
          </button>
        </form>

        {/* 安心コピー */}
        <p className="text-white/30 text-xs mb-5">
          ※営業電話はしません。試算結果のご案内のみです
        </p>

        {formState === "error" && (
          <p className="text-red-400 text-sm mb-4 font-bold">
            送信に失敗しました。お電話でご連絡ください。
          </p>
        )}

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/30 text-xs">今すぐ話したい方はお電話で</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <a
          href={PHONE_HREF}
          onClick={() => trackTelClick()}
          className="block bg-white/10 hover:bg-white/20 text-white font-black text-lg py-4 px-8 rounded-full border border-white/20 transition-colors"
        >
          {PHONE}
        </a>

        {/* ゼロリスクバッジ */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {["相談無料", "試算無料", "義務なし"].map((badge) => (
            <span
              key={badge}
              className="bg-emerald-500/20 text-emerald-400 text-xs font-black px-3 py-1.5 rounded-full border border-emerald-500/30"
            >
              ✓ {badge}
            </span>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10">
          <p className="text-white/30 text-xs">
            {company.name}｜建設業許可取得｜{company.industry} {company.experience}
          </p>
          <a
            href={company.hpUrl}
            className="text-white/30 hover:text-white/50 text-xs underline underline-offset-4 transition-colors"
          >
            公式サイト →
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
    <SlideSolution key="solution" />,
    <SlideStrength key="strength" />,
    <SlideCost key="cost" />,
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
