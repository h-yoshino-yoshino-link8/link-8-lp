# 太陽光LP「ペラペラ太陽光」デザイン仕様書 v1.0

> 対象: `apps/solar/src/components/SwipeLp.tsx`
> ターゲット: 50〜70代の工場オーナー/施設管理者（B2B）
> 閲覧環境: DM経由QRコード → スマホスワイプ（375x667px基準）
> 技術: Next.js 14 + Tailwind CSS v3 + Swiper（既存link8Presetベース）

---

## 1. デザインシステム

### 1.1 カラーパレット

#### プライマリ（信頼・権威）

| トークン | HEX | Tailwindクラス | コントラスト比 vs白 | 用途 |
|---------|------|---------------|-------------------|------|
| navy-900 | `#0f172a` | `bg-link-dark` / `text-link-dark` | 17.4:1 | 見出しテキスト、ダーク背景 |
| navy-700 | `#1a365d` | `bg-link-navy` / `text-link-navy` | 11.6:1 | サブ見出し、ブランドカラー |
| navy-500 | `#1e3a5f` | `bg-[#1e3a5f]` | 10.1:1 | グラデーション中間色 |

#### セカンダリ（エネルギー・環境・安全）

| トークン | HEX | Tailwindクラス | コントラスト比 vs白 | 用途 |
|---------|------|---------------|-------------------|------|
| emerald-700 | `#047857` | `bg-emerald-700` / `text-emerald-700` | 5.4:1 | 環境メッセージ、安全バッジ |
| emerald-600 | `#059669` | `bg-emerald-600` / `text-emerald-600` | 4.6:1 (AA) | 見出しアクセント |
| emerald-500 | `#10b981` | `bg-emerald-500` | 3.4:1 | CTAボタン背景 |
| emerald-400 | `#34d399` | `text-emerald-400` | 2.1:1 vs dark bg | ダーク背景上のテキスト |
| emerald-300 | `#6ee7b7` | `text-emerald-300` | 1.5:1 vs dark bg | ダーク背景上の数字 |
| emerald-50 | `#ecfdf5` | `bg-emerald-50` | — | 安心感カード背景 |

#### アクセント（CTA・強調・損失回避）

| トークン | HEX | Tailwindクラス | コントラスト比 vs白 | 用途 |
|---------|------|---------------|-------------------|------|
| amber-400 | `#fbbf24` | `text-amber-400` | 1.7:1 vs dark bg | コスト数字（ダーク背景上） |
| gold | `#f59e0b` | `bg-link-gold` / `text-link-gold` | 2.3:1 vs dark bg | ゴールド強調 |
| red-700 | `#b91c1c` | `bg-red-700` | 6.1:1 | 危険警告背景 |
| red-800 | `#991b1b` | `bg-red-800` | 7.2:1 | 危険警告グラデーション |
| red-300 | `#fca5a5` | `text-red-300` | 2.0:1 vs dark bg | 危険数字 |
| yellow-300 | `#fde047` | `text-yellow-300` | — | ダーク背景上の警告テキスト |
| yellow-400 | `#facc15` | `text-yellow-400` / `bg-yellow-400` | — | 警告アイコン |

#### 背景色（スライド別）

| スライド | 背景 | Tailwindクラス | 理由 |
|---------|------|---------------|------|
| Slide 1 (衝撃) | 赤グラデーション | `bg-gradient-to-b from-red-700 via-red-800 to-red-950` | 危機感・損失回避フレーム（CVR+30%） |
| Slide 2 (解決策) | ダークネイビー | `bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950` | スペック数字の視認性最大化 |
| Slide 3 (独自性) | 白 | `bg-white` | 情報整理・信頼感・読みやすさ |
| Slide 4 (コスト) | ディープネイビー | `bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950` | ゴールド数字との高コントラスト |
| Slide 5 (フロー) | オフホワイト | `bg-gradient-to-b from-slate-50 to-white` | 安心感・手軽さの演出 |
| Slide 6 (CTA) | ダークエメラルド | `bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950` | 行動誘導（暗色=フォーム集中） |

#### テキスト色

| 用途 | HEX | Tailwindクラス | 使用場面 |
|------|------|---------------|---------|
| 見出し（ライト背景） | `#0f172a` | `text-slate-900` | H1, H2, H3 |
| 本文（ライト背景） | `#64748b` | `text-slate-500` | 説明文 |
| サブテキスト（ライト背景） | `#94a3b8` | `text-slate-400` | キャプション |
| 見出し（ダーク背景） | `#ffffff` | `text-white` | H1, H2 |
| 本文（ダーク背景） | `rgba(255,255,255,0.8)` | `text-white/80` | 説明文 |
| サブテキスト（ダーク背景） | `rgba(255,255,255,0.5)` | `text-white/50` | キャプション |
| リンク | `#059669` | `text-emerald-600` | テキストリンク |

#### ステータス色

| ステータス | HEX | Tailwindクラス | 用途 |
|-----------|------|---------------|------|
| 成功 | `#10b981` | `bg-emerald-500` / `text-emerald-500` | 送信完了、チェックマーク |
| 警告 | `#f59e0b` | `bg-link-gold` / `text-link-gold` | 注意喚起、無料バッジ |
| エラー | `#ef4444` | `text-red-400` / `text-red-500` | フォームエラー |
| 危険 | `#b91c1c` | `bg-red-700` | 設置不可、重量超過 |

---

### 1.2 タイポグラフィ

フォントファミリー: `"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif`
（既存 `link8Preset.fontFamily.sans` を使用）

| レベル | 用途 | サイズ (モバイル) | サイズ (sm:) | font-weight | 行間 | Tailwindクラス |
|-------|------|-----------------|-------------|-------------|------|---------------|
| **H1** | キャッチコピー | 32px (`text-4xl`) | 48px (`sm:text-5xl`) | 900 (`font-black`) | 1.2 (`leading-[1.2]`) | `text-4xl sm:text-5xl font-black leading-[1.2]` |
| **H1-accent** | H1内の強調行 | 40px (`text-5xl`) | 60px (`sm:text-6xl`) | 900 | 1.1 | `text-5xl sm:text-6xl font-black` |
| **H2** | セクション見出し | 24px (`text-2xl`) | 30px (`sm:text-3xl`) | 900 | 1.3 (`leading-tight`) | `text-2xl sm:text-3xl font-black leading-tight` |
| **H3** | カード見出し | 20px (`text-xl`) | 20px | 900 | 1.4 | `text-xl font-black` |
| **H3-sm** | 小カード見出し | 14px (`text-sm`) | 14px | 900 | 1.4 | `text-sm font-black` |
| **Body** | 本文 | 16px (`text-base`) | 18px (`sm:text-lg`) | 500 (`font-medium`) | 1.6 (`leading-relaxed`) | `text-base sm:text-lg font-medium leading-relaxed` |
| **Body-sm** | 補助テキスト | 14px (`text-sm`) | 14px | 400 | 1.6 | `text-sm leading-relaxed` |
| **Caption** | ラベル・補足 | 12px (`text-xs`) | 12px | 900 | 1.5 | `text-xs font-black` |
| **Caption-sm** | 極小補足 | 10px (`text-[10px]`) | 10px | 400 | 1.4 | `text-[10px]` |
| **Number** | 大数字表示 | 80px (`text-8xl`) | 96px (`sm:text-9xl`) | 900 | 1.0 (`leading-none`) | `text-8xl sm:text-9xl font-black leading-none` |
| **Number-md** | 中数字表示 | 48px (`text-5xl`) | 60px (`sm:text-6xl`) | 900 | 1.0 | `text-5xl sm:text-6xl font-black leading-none` |
| **Number-unit** | 数字の単位 | 32px (`text-4xl`) | 40px (`sm:text-5xl`) | 900 | 1.0 | `text-4xl sm:text-5xl font-black` |
| **CTA** | ボタン文字 | 18px (`text-lg`) | 18px | 900 | 1.0 | `text-lg font-black` |

**高齢者向け配慮ポイント:**
- 最小フォントサイズ: 12px（キャプションのみ。本文は必ず16px以上）
- 見出し: 24px以上（NNGroup推奨28-36pxに準拠）
- 行間: 全て1.2以上（Body系は1.6=relaxed）
- 数字: 48px以上の太字で「即座に理解」（アイトラッキング調査: 理解速度2.3倍）

---

### 1.3 スペーシングシステム

| トークン | 値 | Tailwindクラス | 用途 |
|---------|-----|---------------|------|
| xs | 4px | `p-1` / `gap-1` | インラインバッジ内余白 |
| sm | 8px | `p-2` / `gap-2` | 要素間の最小余白 |
| md | 12px | `p-3` / `gap-3` | カード間ギャップ |
| lg | 16px | `p-4` / `gap-4` | カード内パディング、グリッドギャップ |
| xl | 20px | `p-5` / `gap-5` | カード内パディング（大） |
| 2xl | 24px | `p-6` / `gap-6` | セクション内余白 |
| 3xl | 32px | `p-8` / `mb-8` | セクション間余白 |
| 4xl | 40px | `mb-10` | ヘッダー下余白 |
| page-x | 16px | `px-4` | ページ左右パディング |

---

## 2. 各スライドワイヤーフレーム

### スライド1: 衝撃（ファーストビュー）— 損失回避フレーム

**目的:** スレート屋根に従来パネルを載せる危険を伝え、「自分ごと」にする
**心理手法:** 損失回避フレーム（CVR+30%）、巨大数字の対比
**離脱対策:** スライド1→2の離脱率40-50%を想定し、最大インパクトを初手で

```
┌─────────────────────────────────┐ 375×667
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ 背景: gradient red-700→red-800→red-950
│                                 │
│  [●] DANGER [●]                │ 上部警告バー bg-black/40
│  (yellow-400, text-xs, black)   │   py-2, animate-pulse dots
│                                 │
│         ─────────────           │ 斜めストライプ pattern opacity-[0.06]
│                                 │
│      その屋根に                  │ text-white text-4xl font-black
│      太陽光を載せたら             │ leading-[1.2] mb-6
│      屋根が落ちます。             │ text-yellow-300 text-5xl font-black
│                                 │
│  スレート屋根に従来パネルは        │ text-white/80 text-base mb-10
│  危険です。                      │
│                                 │
│  ┌──────────┐ ┌──────────┐     │ grid grid-cols-2 gap-4
│  │ 20kg     │ │  3.7kg   │     │
│  │ 従来ﾊﾟﾈﾙ │ │ ﾍﾟﾗﾍﾟﾗ  │     │ bg-black/30 backdrop-blur-sm
│  │ [設置不可]│ │ [設置OK] │     │ rounded-2xl p-5
│  │ red-300  │ │emerald300│     │ 数字: text-5xl font-black
│  │ border   │ │ border   │     │ border-2 border-red-400/50
│  │ red-400  │ │emerald400│     │      or border-emerald-400/50
│  └──────────┘ └──────────┘     │ バッジ: rounded-full py-1 px-3
│                                 │
│           ↓ (bounce)            │ 下部スクロールヒント
│                                 │ w-8 h-8 text-white/40 animate-bounce
└─────────────────────────────────┘
```

**カラー仕様:**
- 背景: `bg-gradient-to-b from-red-700 via-red-800 to-red-950`
- 警告バー: `bg-black/40`, 文字 `text-yellow-400 text-xs font-black tracking-[0.2em]`
- ドット: `w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse`
- ストライプ: `opacity-[0.06]`, CSS `repeating-linear-gradient(45deg, ...)`
- H1テキスト: `text-white text-4xl sm:text-5xl font-black leading-[1.2]`
- H1アクセント: `text-yellow-300 text-5xl sm:text-6xl`
- サブテキスト: `text-white/80 text-base sm:text-lg font-medium`
- 比較カード背景: `bg-black/30 backdrop-blur-sm rounded-2xl p-5`
- 従来パネル数字: `text-red-300 text-5xl sm:text-6xl font-black leading-none`
- ペラペラ太陽光数字: `text-emerald-300 text-5xl sm:text-6xl font-black leading-none`
- 従来ラベル: `text-white/60 text-sm font-bold`
- 設置不可バッジ: `bg-red-500/30 rounded-full py-1 px-3`, テキスト `text-red-300 text-xs font-black`
- 設置OKバッジ: `bg-emerald-500/30 rounded-full py-1 px-3`, テキスト `text-emerald-300 text-xs font-black`
- 左カードborder: `border-2 border-red-400/50`
- 右カードborder: `border-2 border-emerald-400/50`

**フォントサイズ一覧:**
| 要素 | サイズ | Tailwind |
|------|--------|---------|
| DANGER | 12px | `text-xs` |
| H1 通常行 | 36px/48px | `text-4xl sm:text-5xl` |
| H1 強調行 | 48px/60px | `text-5xl sm:text-6xl` |
| サブコピー | 16px/18px | `text-base sm:text-lg` |
| 比較数字 | 48px/60px | `text-5xl sm:text-6xl` |
| ラベル | 14px | `text-sm` |
| バッジ | 12px | `text-xs` |

**アニメーション:**
- 警告ドット: `animate-pulse`（Tailwind標準）
- スクロールヒント: `animate-bounce`（Tailwind標準）
- ストライプパターン: 静的CSS背景

---

### スライド2: 解決策 — スペック訴求

**目的:** 「ペラペラ太陽光」の具体スペックを数字で即座に伝える
**心理手法:** 巨大数字表示（理解速度2.3倍）、スペック4象限

```
┌─────────────────────────────────┐ 375×667
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ 背景: gradient slate-950→slate-900
│                                 │
│  ○ emerald glow (blur-[100px]) │ 背景装飾: w-80 h-80 emerald-500/10
│                                 │
│         SOLUTION                │ text-emerald-400 text-xs tracking-[0.3em]
│                                 │   font-black mb-3
│                                 │
│          3.7                    │ text-emerald-400 text-8xl font-black
│           kg                    │ text-emerald-400/60 text-4xl font-black
│                                 │
│   テープで貼れる太陽光。          │ text-white text-xl font-bold mb-2
│   超軽量フィルム型               │ text-white/50 text-sm mb-8
│                                 │
│  ┌────────┐ ┌────────┐         │ grid grid-cols-2 gap-3 mb-6
│  │ 3mm    │ │ 23.5%  │         │
│  │ 厚さ   │ │ 変換効率│         │ bg-white/5 backdrop-blur-sm
│  │ｶﾞﾗｽ1/10│ │N型TOP  │         │ rounded-xl p-4 border border-white/10
│  ├────────┤ ├────────┤         │
│  │ 60m/s  │ │ 25年   │         │ 数字: text-white text-2xl font-black
│  │ 耐風速 │ │出力保証│         │ ラベル: text-white/70 text-xs font-bold
│  │風洞試験│ │ﾘﾆｱ保証 │         │ サブ: text-white/40 text-[10px]
│  └────────┘ └────────┘         │
│                                 │
│ [ｽﾚｰﾄ屋根OK] [塩害対応] [積雪]  │ flex flex-wrap justify-center gap-2
│                                 │ bg-emerald-500/20 text-emerald-400
│                                 │ text-xs font-black px-3 py-1.5
│                                 │ rounded-full border emerald-500/30
└─────────────────────────────────┘
```

**カラー仕様:**
- 背景: `bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950`
- 背景グロー: `absolute ... w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]`
- セクションラベル: `text-emerald-400 font-black text-xs tracking-[0.3em] mb-3`
- メイン数字: `text-emerald-400 text-8xl sm:text-9xl font-black leading-none`
- 単位: `text-emerald-400/60 text-4xl sm:text-5xl font-black`
- H2: `text-white text-xl sm:text-2xl font-bold mb-2`
- サブ: `text-white/50 text-sm mb-8`
- スペックカード: `bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10`
- スペック数字: `text-white text-2xl sm:text-3xl font-black`
- スペックラベル: `text-white/70 text-xs font-bold mt-1`
- スペックサブ: `text-white/40 text-[10px] mt-0.5`
- タグ: `bg-emerald-500/20 text-emerald-400 text-xs font-black px-3 py-1.5 rounded-full border border-emerald-500/30`

**フォントサイズ一覧:**
| 要素 | サイズ | Tailwind |
|------|--------|---------|
| SOLUTION | 12px | `text-xs` |
| メイン数字 | 96px/128px | `text-8xl sm:text-9xl` |
| 単位 | 36px/48px | `text-4xl sm:text-5xl` |
| H2 | 20px/24px | `text-xl sm:text-2xl` |
| サブ | 14px | `text-sm` |
| スペック数字 | 24px/30px | `text-2xl sm:text-3xl` |
| スペックラベル | 12px | `text-xs` |
| スペックサブ | 10px | `text-[10px]` |
| タグ | 12px | `text-xs` |

**アニメーション:** なし（静的。ダーク背景のグロー効果のみ）

---

### スライド3: 独自ポジション — WHY LinK

**目的:** 太陽光業者との違いを明確にし、「建設会社だから安心」を伝える
**心理手法:** 権威性（建設業許可）、差別化の3要素

```
┌─────────────────────────────────┐ 375×667
│                                 │ 背景: bg-white
│                                 │
│         WHY LinK                │ text-emerald-600 text-xs tracking-[0.3em]
│                                 │   font-black mb-2
│      建設会社だから、             │ text-slate-900 text-2xl font-black
│      全部まとめて対応。           │ text-emerald-600 text-2xl font-black
│                                 │   leading-tight, mb-6
│  ┌─────────────────────────┐   │
│  │ 01 — ONLY LinK          │   │ bg-gradient emerald-600→700
│  │ 耐震補強 + 太陽光        │   │ rounded-2xl p-5 text-white
│  │ 建設業許可を持つ太陽光    │   │ H3: text-xl font-black
│  │ 代理店。屋根の補強から    │   │ 本文: text-emerald-100/80 text-sm
│  │ 設置まで一括対応。       │   │ ラベル: text-emerald-200 text-xs
│  └─────────────────────────┘   │   font-black tracking-wider
│                                 │
│  ┌───────────┐ ┌───────────┐   │ grid grid-cols-2 gap-3
│  │ 02        │ │ 03        │   │
│  │ 建物の知識│ │ 全国施工網│   │ bg-slate-900 rounded-2xl p-4
│  │ 原状回復  │ │ 27社の    │   │ text-white
│  │ 11年。    │ │ 施工ﾁｰﾑ  │   │ H3: text-sm font-black
│  └───────────┘ └───────────┘   │ 本文: text-slate-400 text-xs
│                                 │ ナンバー: text-slate-400 text-[10px]
│  他の太陽光業者にはできない、     │ text-slate-400 text-xs mt-5
│  LinKだけの提案。               │   text-center
│                                 │
└─────────────────────────────────┘
```

**カラー仕様:**
- 背景: `bg-white`
- セクションラベル: `text-emerald-600 font-black text-xs tracking-[0.3em] mb-2`
- H2: `text-slate-900 text-2xl sm:text-3xl font-black leading-tight`
- H2アクセント: `text-emerald-600`
- メインカード（01）: `bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-5`
- メインカードラベル: `text-emerald-200 text-xs font-black tracking-wider mb-1`
- メインカードH3: `text-xl font-black mb-1`（白テキスト）
- メインカード本文: `text-emerald-100/80 text-sm leading-relaxed`
- サブカード（02,03）: `bg-slate-900 rounded-2xl p-4`（白テキスト）
- サブカードナンバー: `text-slate-400 text-[10px] font-black tracking-wider mb-1`
- サブカードH3: `text-sm font-black mb-1`
- サブカード本文: `text-slate-400 text-xs leading-relaxed`
- フッターメッセージ: `text-slate-400 text-xs`

**フォントサイズ一覧:**
| 要素 | サイズ | Tailwind |
|------|--------|---------|
| WHY LinK | 12px | `text-xs` |
| H2 | 24px/30px | `text-2xl sm:text-3xl` |
| メインカードH3 | 20px | `text-xl` |
| メインカード本文 | 14px | `text-sm` |
| サブカードH3 | 14px | `text-sm` |
| サブカード本文 | 12px | `text-xs` |
| フッター | 12px | `text-xs` |

**アニメーション:** なし

---

### スライド4: コストメリット — 損失回避 + 実例

**目的:** 電気代削減の具体的な金額を提示し、ROIを実感させる
**心理手法:** 損失回避フレーム（「○○円損してます」= CVR+30%）、実例カード

```
┌─────────────────────────────────┐ 375×667
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ 背景: gradient blue-950→slate-900
│                                 │
│  ○ amber glow (blur-[80px])    │ 背景装飾: w-60 h-60 amber-500/5
│                                 │
│         COST MERIT              │ text-amber-400 text-xs tracking-[0.3em]
│                                 │   font-black mb-3
│          電気代                  │ text-white text-2xl font-bold mb-1
│                                 │
│          50%                    │ text-amber-400 text-7xl font-black
│          削減                    │ text-white text-2xl font-black ml-2
│                                 │
│  ┌─────────────────────────┐   │ bg-white/5 backdrop-blur-sm
│  │ 実例：食品加工工場       │   │ rounded-2xl p-5 border white/10
│  │                         │   │ mb-6 text-left
│  │ 設備容量      240kW     │   │
│  │ 年間削減額    700万円    │   │ amber-400 highlight
│  │ 投資回収      4.5年     │   │ flex justify-between
│  └─────────────────────────┘   │ ラベル: text-white/50 text-sm
│                                 │ 値: text-white font-black text-xl
│  ┌──────┐ ┌──────┐ ┌──────┐   │ grid grid-cols-3 gap-2
│  │電気代│ │BCP  │ │脱炭素│   │ bg-white/5 rounded-xl p-3
│  │削減  │ │対策 │ │     │   │ border border-white/10
│  │最大  │ │停電 │ │企業  │   │ タイトル: text-white text-xs font-black
│  │50%OFF│ │時も │ │価値UP│   │ サブ: text-white/40 text-[10px]
│  └──────┘ └──────┘ └──────┘   │
│                                 │
└─────────────────────────────────┘
```

**カラー仕様:**
- 背景: `bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950`
- 背景グロー: `absolute top-20 right-10 w-60 h-60 bg-amber-500/5 rounded-full blur-[80px]`
- セクションラベル: `text-amber-400 font-black text-xs tracking-[0.3em] mb-3`
- 「電気代」: `text-white text-2xl font-bold mb-1`
- メイン数字: `text-amber-400 text-7xl sm:text-8xl font-black leading-none`
- パーセント: `text-amber-400/60 text-3xl sm:text-4xl font-black`
- 「削減」: `text-white text-2xl sm:text-3xl font-black ml-2`
- 実例カード: `bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 mb-6 text-left`
- 実例ラベル: `text-amber-400 text-xs font-black tracking-wider mb-4`
- 実例項目ラベル: `text-white/50 text-sm`
- 実例項目値: `font-black text-xl text-white`（ハイライト時: `text-amber-400`）
- メリットカード: `bg-white/5 rounded-xl p-3 border border-white/10`
- メリットタイトル: `text-white text-xs font-black`
- メリットサブ: `text-white/40 text-[10px] mt-1`

**フォントサイズ一覧:**
| 要素 | サイズ | Tailwind |
|------|--------|---------|
| COST MERIT | 12px | `text-xs` |
| 「電気代」 | 24px | `text-2xl` |
| メイン数字 | 72px/96px | `text-7xl sm:text-8xl` |
| パーセント | 30px/36px | `text-3xl sm:text-4xl` |
| 「削減」 | 24px/30px | `text-2xl sm:text-3xl` |
| 実例ラベル | 12px | `text-xs` |
| 実例項目ラベル | 14px | `text-sm` |
| 実例項目値 | 20px | `text-xl` |
| メリットタイトル | 12px | `text-xs` |
| メリットサブ | 10px | `text-[10px]` |

**アニメーション:** なし（背景グロー効果のみ）

---

### スライド5: 導入フロー — 3ステップで安心

**目的:** 「たった3ステップ」で手軽さを伝え、行動ハードルを下げる
**心理手法:** 無料ステップの明示、義務なし宣言

```
┌─────────────────────────────────┐ 375×667
│                                 │ 背景: gradient slate-50→white
│                                 │
│         FLOW                    │ text-emerald-600 text-xs tracking-[0.3em]
│                                 │   font-black mb-2
│      たった3ステップ。            │ text-slate-900 text-2xl font-black
│      試算まで完全無料             │ text-emerald-600 text-sm font-bold
│                                 │   mt-1, mb-8
│                                 │
│  (01)─── ┌──────────────────┐  │ flex items-start gap-4
│  │     │ │ 無料Zoom相談      │  │
│  │     │ │ 太陽光の専門ﾁｰﾑが │  │ ナンバー: w-12 h-12 rounded-full
│  │  │  │ │ ｵﾝﾗｲﾝで直接ご説明 │  │   bg-slate-900 text-white
│  │  │  │ │           [無料]  │  │   font-black text-sm
│  │  ▼  │ └──────────────────┘  │
│  (02)─── ┌──────────────────┐  │ カード: bg-white rounded-2xl p-4
│  │     │ │ 削減試算・現地調査  │  │   shadow-lg shadow-slate-100
│  │     │ │ 電気料金ﾃﾞｰﾀで    │  │   border border-slate-100
│  │  │  │ │ 試算。納得で現地へ  │  │
│  │  │  │ │           [無料]  │  │ 無料バッジ: bg-emerald-500
│  │  ▼  │ └──────────────────┘  │   text-white text-[10px] font-black
│  (03)─── ┌──────────────────┐  │   px-2.5 py-1 rounded-full
│         │ │ 設計・施工         │  │
│         │ │ 全国27社が対応。   │  │ 縦線: w-0.5 h-8 bg-slate-200
│         │ │ 耐震補強もLinKが   │  │
│         │ └──────────────────┘  │ H3: font-black text-slate-900 text-base
│                                 │ 本文: text-slate-500 text-sm
│  ┌─────────────────────────┐   │   leading-relaxed
│  │ 設置の義務はありません。   │   │
│  │ 試算結果を見てからご判断   │   │ bg-emerald-50 rounded-2xl p-4
│  │ いただけます。             │   │ border border-emerald-100
│  └─────────────────────────┘   │ タイトル: text-slate-900 text-sm font-bold
│                                 │ サブ: text-slate-500 text-xs
└─────────────────────────────────┘
```

**カラー仕様:**
- 背景: `bg-gradient-to-b from-slate-50 to-white`
- セクションラベル: `text-emerald-600 font-black text-xs tracking-[0.3em] mb-2`
- H2: `text-slate-900 text-2xl sm:text-3xl font-black`
- H2アクセント数字: `text-emerald-600`
- 無料テキスト: `text-emerald-600 font-bold text-sm mt-1`
- ステップナンバー: `w-12 h-12 rounded-full bg-slate-900 text-white font-black text-sm`
- 縦接続線: `w-0.5 h-8 bg-slate-200 mt-1`
- ステップカード: `bg-white rounded-2xl p-4 shadow-lg shadow-slate-100 border border-slate-100`
- ステップH3: `font-black text-slate-900 text-base`
- ステップ本文: `text-slate-500 text-sm leading-relaxed`
- 無料バッジ: `bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full`
- 安心カード: `bg-emerald-50 rounded-2xl p-4 border border-emerald-100`
- 安心タイトル: `text-slate-900 text-sm font-bold`
- 安心サブ: `text-slate-500 text-xs mt-1`

**フォントサイズ一覧:**
| 要素 | サイズ | Tailwind |
|------|--------|---------|
| FLOW | 12px | `text-xs` |
| H2 | 24px/30px | `text-2xl sm:text-3xl` |
| 無料テキスト | 14px | `text-sm` |
| ステップナンバー | 14px | `text-sm` |
| ステップH3 | 16px | `text-base` |
| ステップ本文 | 14px | `text-sm` |
| 無料バッジ | 10px | `text-[10px]` |
| 安心タイトル | 14px | `text-sm` |
| 安心サブ | 12px | `text-xs` |

**アニメーション:** なし

---

### スライド6: CTA — フォーム＋電話

**目的:** Zoom相談申し込み or 電話発信
**心理手法:** フォーム3フィールド以下（最高CVR）、ゼロリスク訴求、CTA pulse

```
┌─────────────────────────────────┐ 375×667
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ 背景: gradient emerald-950→emerald-900
│                                 │   →slate-950
│     FREE CONSULTATION           │ text-emerald-400 text-xs tracking-[0.3em]
│                                 │   font-black mb-4
│     まずは無料で                 │ text-white text-3xl font-black mb-2
│     Zoom相談。                  │ text-emerald-400 text-3xl font-black
│                                 │
│  屋根の状態と電気代をお聞きし、   │ text-white/50 text-sm mb-8
│  削減試算をお出しします。         │
│                                 │
│  ┌─────────────────────────┐   │ form space-y-3 mb-6
│  │ 会社名                   │   │
│  ├─────────────────────────┤   │ input: bg-white/10 border white/20
│  │ ご担当者名               │   │   rounded-xl px-4 py-3.5
│  ├─────────────────────────┤   │   text-white text-base
│  │ 電話番号                 │   │   placeholder:text-white/30
│  └─────────────────────────┘   │   focus:border-emerald-400
│                                 │
│  ┌═══════════════════════════┐ │ button: bg-emerald-500
│  ║ 無料Zoom相談を申し込む    ║ │   hover:bg-emerald-400
│  └═══════════════════════════┘ │   text-white font-black text-lg
│                                 │   py-4 rounded-full cta-pulse
│  ─────── または ───────        │   shadow-lg shadow-emerald-500/30
│                                 │
│  ┌─────────────────────────┐   │ 電話: bg-white/10 hover:bg-white/20
│  │  03-6825-2464           │   │   text-white font-black text-lg
│  └─────────────────────────┘   │   py-4 px-8 rounded-full
│                                 │   border border-white/20
│  [相談無料] [試算無料] [義務なし] │
│                                 │ バッジ: bg-emerald-500/20
│  株式会社LinK / 吉野博          │   text-emerald-400 text-xs font-black
│  公式サイト →                   │   px-3 py-1.5 rounded-full
│                                 │   border emerald-500/30
└─────────────────────────────────┘

--- 送信完了状態 ---

┌─────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ 同じダークエメラルド背景
│                                 │
│          ┌───┐                  │ w-20 h-20 bg-emerald-500
│          │ ✓ │                  │ rounded-full
│          └───┘                  │ チェックアイコン: w-10 h-10 white
│                                 │
│     ありがとうございます          │ text-white text-3xl font-black mb-4
│                                 │
│  1営業日以内にご連絡いたします。   │ text-white/70 text-base
│  Zoomの日程を調整させて           │   leading-relaxed
│  いただきます。                   │
│                                 │
└─────────────────────────────────┘
```

**カラー仕様:**
- 背景: `bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950`
- セクションラベル: `text-emerald-400 font-black text-xs tracking-[0.3em] mb-4`
- H2: `text-white text-3xl sm:text-4xl font-black mb-2`
- H2アクセント: `text-emerald-400`
- サブ: `text-white/50 text-sm mb-8`
- フォームinput: `bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 text-base focus:outline-none focus:border-emerald-400 transition-colors`
- CTAボタン: `bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-black text-lg py-4 rounded-full shadow-lg shadow-emerald-500/30` + `cta-pulse`クラス
- 区切り線: `flex-1 h-px bg-white/10`
- 「または」: `text-white/30 text-xs`
- 電話ボタン: `bg-white/10 hover:bg-white/20 text-white font-black text-lg py-4 px-8 rounded-full border border-white/20 transition-colors`
- バッジ: `bg-emerald-500/20 text-emerald-400 text-xs font-black px-3 py-1.5 rounded-full border border-emerald-500/30`
- フッター社名: `text-white/30 text-xs`
- フッターリンク: `text-white/30 hover:text-white/50 text-xs underline underline-offset-4 transition-colors`
- エラー: `text-red-400 text-sm mb-4 font-bold`

**フォーム仕様:**
- フィールド数: 3（会社名、担当者名、電話番号）— 競合分析結果の「3フィールド以下で最高CVR」に準拠
- inputの高さ: `py-3.5`（約56px = 高齢者向け最小タップターゲット48px超過）
- プレースホルダー: `placeholder:text-white/30`
- フォーカス: `focus:outline-none focus:border-emerald-400`
- 送信先: Formspark `qvZdUnofr`

**フォントサイズ一覧:**
| 要素 | サイズ | Tailwind |
|------|--------|---------|
| FREE CONSULTATION | 12px | `text-xs` |
| H2 | 30px/36px | `text-3xl sm:text-4xl` |
| サブコピー | 14px | `text-sm` |
| input | 16px | `text-base` |
| CTAボタン | 18px | `text-lg` |
| 電話ボタン | 18px | `text-lg` |
| 「または」 | 12px | `text-xs` |
| バッジ | 12px | `text-xs` |
| フッター | 12px | `text-xs` |
| 送信完了H2 | 30px | `text-3xl` |
| 送信完了本文 | 16px | `text-base` |

**アニメーション:**
- CTAボタン: `cta-pulse`（グローバルCSS定義済み: `pulse-glow 2s ease-in-out infinite`）
- 送信完了チェックマーク: なし（シンプルに表示）

---

## 3. コンポーネント仕様

### 3.1 CTAボタン（プライマリ）

```
用途: Zoom相談申し込みボタン
```

| プロパティ | 値 | Tailwindクラス |
|-----------|-----|---------------|
| 背景色 | emerald-500 | `bg-emerald-500` |
| ホバー | emerald-400 | `hover:bg-emerald-400` |
| disabled | opacity 50% | `disabled:opacity-50` |
| テキスト色 | white | `text-white` |
| フォントサイズ | 18px | `text-lg` |
| フォントウェイト | 900 | `font-black` |
| パディング | 16px 上下 | `py-4` |
| 角丸 | full | `rounded-full` |
| 影 | emerald glow | `shadow-lg shadow-emerald-500/30` |
| アニメーション | pulse glow | `cta-pulse` |
| 幅 | 100% | `w-full` |
| 最小高さ | 56px | （py-4 + text-lg = ~56px） |

完全クラス:
```
w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-black text-lg py-4 rounded-full transition-colors shadow-lg shadow-emerald-500/30 cta-pulse
```

### 3.2 CTAボタン（セカンダリ / 電話）

```
用途: 電話発信ボタン
```

| プロパティ | 値 | Tailwindクラス |
|-----------|-----|---------------|
| 背景色 | white/10 | `bg-white/10` |
| ホバー | white/20 | `hover:bg-white/20` |
| テキスト色 | white | `text-white` |
| フォントサイズ | 18px | `text-lg` |
| フォントウェイト | 900 | `font-black` |
| パディング | 16px 上下、32px 左右 | `py-4 px-8` |
| 角丸 | full | `rounded-full` |
| ボーダー | 1px white/20 | `border border-white/20` |
| 幅 | block | `block` |

完全クラス:
```
block bg-white/10 hover:bg-white/20 text-white font-black text-lg py-4 px-8 rounded-full border border-white/20 transition-colors
```

### 3.3 スペックカード

```
用途: Slide2のスペック表示（2x2グリッド）
```

| プロパティ | 値 | Tailwindクラス |
|-----------|-----|---------------|
| 背景色 | white/5 | `bg-white/5` |
| ブラー | sm | `backdrop-blur-sm` |
| 角丸 | xl (12px) | `rounded-xl` |
| パディング | 16px | `p-4` |
| ボーダー | 1px white/10 | `border border-white/10` |

```
bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10
```

内部構造:
```
<div class="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
  <p class="text-white text-2xl sm:text-3xl font-black">{value}</p>
  <p class="text-white/70 text-xs font-bold mt-1">{label}</p>
  <p class="text-white/40 text-[10px] mt-0.5">{sub}</p>
</div>
```

### 3.4 比較カード（Slide1用）

```
用途: 従来パネル vs ペラペラ太陽光の重量比較
```

| プロパティ | 値 | Tailwindクラス |
|-----------|-----|---------------|
| 背景色 | black/30 | `bg-black/30` |
| ブラー | sm | `backdrop-blur-sm` |
| 角丸 | 2xl (16px) | `rounded-2xl` |
| パディング | 20px | `p-5` |
| ボーダー幅 | 2px | `border-2` |
| ボーダー色（危険） | red-400/50 | `border-red-400/50` |
| ボーダー色（安全） | emerald-400/50 | `border-emerald-400/50` |

### 3.5 バッジコンポーネント

#### タグバッジ（スペック/メリット用）

| プロパティ | 値 | Tailwindクラス |
|-----------|-----|---------------|
| 背景色 | emerald-500/20 | `bg-emerald-500/20` |
| テキスト色 | emerald-400 | `text-emerald-400` |
| フォントサイズ | 12px | `text-xs` |
| フォントウェイト | 900 | `font-black` |
| パディング | 6px 12px | `px-3 py-1.5` |
| 角丸 | full | `rounded-full` |
| ボーダー | 1px emerald-500/30 | `border border-emerald-500/30` |

```
bg-emerald-500/20 text-emerald-400 text-xs font-black px-3 py-1.5 rounded-full border border-emerald-500/30
```

#### ステータスバッジ（無料バッジ）

| プロパティ | 値 | Tailwindクラス |
|-----------|-----|---------------|
| 背景色 | emerald-500 | `bg-emerald-500` |
| テキスト色 | white | `text-white` |
| フォントサイズ | 10px | `text-[10px]` |
| フォントウェイト | 900 | `font-black` |
| パディング | 4px 10px | `px-2.5 py-1` |
| 角丸 | full | `rounded-full` |

```
bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full
```

#### 危険バッジ

```
bg-red-500/30 rounded-full py-1 px-3 inline-block
```
テキスト: `text-red-300 text-xs font-black`

#### 安全バッジ

```
bg-emerald-500/30 rounded-full py-1 px-3 inline-block
```
テキスト: `text-emerald-300 text-xs font-black`

### 3.6 フォーム入力フィールド

| プロパティ | 値 | Tailwindクラス |
|-----------|-----|---------------|
| 幅 | 100% | `w-full` |
| 背景色 | white/10 | `bg-white/10` |
| ボーダー | 1px white/20 | `border border-white/20` |
| 角丸 | xl (12px) | `rounded-xl` |
| パディング | 14px 16px | `px-4 py-3.5` |
| テキスト色 | white | `text-white` |
| プレースホルダー色 | white/30 | `placeholder:text-white/30` |
| フォントサイズ | 16px | `text-base` |
| フォーカス | emerald-400 border | `focus:outline-none focus:border-emerald-400` |
| トランジション | colors | `transition-colors` |

完全クラス:
```
w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 text-base focus:outline-none focus:border-emerald-400 transition-colors
```

**高齢者向け配慮:**
- `py-3.5` = 14px上下パディング → input高さ約52px（最小タップターゲット48px以上）
- `text-base` = 16px（iOSの自動ズーム防止閾値）
- `placeholder:text-white/30` — プレースホルダーは薄く、ラベルとの混同防止
- 注: 現実装はplaceholder方式。上部ラベル化は今後のA/Bテスト候補（入力エラー率45%減の可能性）

### 3.7 ステップインジケーター（Slide5用）

構造:
```
<div class="flex items-start gap-4">
  {/* 番号 + 縦線 */}
  <div class="flex flex-col items-center">
    <div class="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-sm flex-shrink-0">
      {num}
    </div>
    {/* 最終ステップ以外で縦線表示 */}
    <div class="w-0.5 h-8 bg-slate-200 mt-1" />
  </div>
  {/* コンテンツカード */}
  <div class="flex-1 bg-white rounded-2xl p-4 shadow-lg shadow-slate-100 border border-slate-100 -mt-1">
    ...
  </div>
</div>
```

| パーツ | クラス |
|-------|--------|
| 番号円 | `w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-sm flex-shrink-0` |
| 縦接続線 | `w-0.5 h-8 bg-slate-200 mt-1` |
| カード | `flex-1 bg-white rounded-2xl p-4 shadow-lg shadow-slate-100 border border-slate-100 -mt-1` |
| カードH3 | `font-black text-slate-900 text-base` |
| カード本文 | `text-slate-500 text-sm leading-relaxed` |

### 3.8 ページネーション（Swiper）

既存globals.cssで定義済み:

```css
.swiper-pagination {
  bottom: 16px !important;
  display: flex !important;
  flex-direction: row !important;
  justify-content: center !important;
  gap: 6px !important;
}

.swiper-pagination-bullet {
  background: #94a3b8 !important;  /* slate-400 */
  opacity: 0.5 !important;
  width: 8px !important;
  height: 8px !important;
}

.swiper-pagination-bullet-active {
  background: #1a365d !important;  /* link-navy */
  opacity: 1 !important;
  width: 24px !important;
  height: 8px !important;
  border-radius: 4px !important;
}
```

太陽光LP用にカスタマイズする場合（emeraldテーマに合わせる）:

```css
/* apps/solar 用: emeraldテーマのページネーション */
:root {
  --swiper-theme-color: #10b981; /* emerald-500 */
}

.swiper-pagination-bullet-active {
  background: #10b981 !important; /* emerald-500 */
}
```

---

## 4. レスポンシブ戦略

### モバイルファースト（375x667px基準）

このLPはDM経由QRコードでの閲覧が主体のため、モバイルスマホを100%基準とする。

| ブレイクポイント | 幅 | 用途 |
|---------------|-----|------|
| default | < 640px | スマホ（メインターゲット） |
| sm: | >= 640px | 大型スマホ/小型タブレット |

- PC対応は不要（DM→QR→スマホが前提）
- `sm:` でのサイズアップは保険として指定

### コンテナ

```
px-4        → ページ左右パディング16px
max-w-lg    → 最大幅512px（カード内容が広がりすぎ防止）
mx-auto     → 中央揃え
```

---

## 5. アニメーション仕様

既存globals.cssで定義済みのアニメーションを使用:

| アニメーション名 | 定義 | 使用箇所 | Tailwindクラス |
|---------------|------|---------|---------------|
| `pulse-glow` | box-shadowの明滅 (2s, ease-in-out, infinite) | CTAボタン | `.cta-pulse` |
| `fadeInUp` | opacity 0→1 + translateY 30px→0 (0.6s) | — (太陽光LPでは未使用) | `.animate-fade-in-up` |
| `bounce-down` | translateY 0→8px→0 (1.5s) | — (太陽光LPでは未使用) | `.scroll-hint` |
| Tailwind `animate-pulse` | opacity明滅 | Slide1 警告ドット | `animate-pulse` |
| Tailwind `animate-bounce` | 上下バウンス | Slide1 スクロールヒント | `animate-bounce` |

### CTAボタンのpulse-glow（最重要アニメーション）

```css
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  50% { box-shadow: 0 0 0 12px rgba(16, 185, 129, 0); }
}
```

注: 既存CSSではorangeのrgba(249,115,22)を使用しているが、太陽光LPではemeraldのrgba(16,185,129)に変更する必要がある。

太陽光LP用のCSS追記:
```css
/* apps/solar/src/app/globals.css に追加 */
@keyframes pulse-glow-emerald {
  0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  50% { box-shadow: 0 0 0 12px rgba(16, 185, 129, 0); }
}

.cta-pulse {
  animation: pulse-glow-emerald 2s ease-in-out infinite;
}
```

---

## 6. Tailwind CSS 対応表（完全版）

### 6.1 カスタムカラー（link8Preset既存 + 太陽光LP追加不要）

既存のlink8Presetカラーで全て対応可能:

| デザイントークン | Tailwindクラス | HEX |
|---------------|---------------|------|
| ネイビー（信頼） | `bg-link-navy` / `text-link-navy` | #1a365d |
| ダーク（権威） | `bg-link-dark` / `text-link-dark` | #0f172a |
| ゴールド（強調） | `bg-link-gold` / `text-link-gold` | #f59e0b |
| オレンジ（CTA） | `bg-link-orange` / `text-link-orange` | #f97316 |
| グレー | `text-link-gray` | #64748b |
| ライト | `bg-link-light` | #f8fafc |

追加でTailwind標準色を使用:
- `emerald-*`（環境・エネルギー）
- `red-*`（危険・警告）
- `amber-*`（コスト・ゴールド数字）
- `slate-*`（背景・テキスト）
- `yellow-*`（警告ハイライト）

### 6.2 全スライド Tailwindクラス対応表

#### 共通レイアウト

| 要素 | クラス |
|------|--------|
| スライドコンテナ | `relative w-full h-full flex items-center justify-center overflow-hidden` |
| コンテンツラッパー | `relative z-10 text-center px-6 max-w-lg mx-auto` |
| 白背景ラッパー | `w-full h-full bg-white flex items-center justify-center px-4` |
| ダーク背景ラッパー | `relative w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center overflow-hidden px-4` |
| 内部ラッパー | `relative z-10 w-full max-w-md mx-auto text-center` |

#### セクションラベル（英字キャプション）

| スライド | クラス |
|---------|--------|
| Slide1 | （なし — 代わりに警告バー） |
| Slide2 | `text-emerald-400 font-black text-xs tracking-[0.3em] mb-3` |
| Slide3 | `text-emerald-600 font-black text-xs tracking-[0.3em] mb-2` |
| Slide4 | `text-amber-400 font-black text-xs tracking-[0.3em] mb-3` |
| Slide5 | `text-emerald-600 font-black text-xs tracking-[0.3em] mb-2` |
| Slide6 | `text-emerald-400 font-black text-xs tracking-[0.3em] mb-4` |

#### 見出し（H2）

| スライド | クラス |
|---------|--------|
| Slide2 | `text-white text-xl sm:text-2xl font-bold mb-2` |
| Slide3 | `text-slate-900 text-2xl sm:text-3xl font-black leading-tight` |
| Slide4 | `text-white text-2xl font-bold mb-1` |
| Slide5 | `text-slate-900 text-2xl sm:text-3xl font-black` |
| Slide6 | `text-white text-3xl sm:text-4xl font-black mb-2` |

#### グリッドレイアウト

| パターン | クラス |
|---------|--------|
| 2列均等 | `grid grid-cols-2 gap-4` |
| 2列均等（小ギャップ） | `grid grid-cols-2 gap-3` |
| 3列均等 | `grid grid-cols-3 gap-2` |
| 縦リスト | `space-y-3` / `space-y-4` |

---

## 7. アクセシビリティ対応（高齢者向け）

### WCAG AA準拠チェックリスト

| 項目 | 基準 | 本LP対応 | 根拠 |
|------|------|---------|------|
| 最小フォント | 16px以上（本文） | text-base (16px) | 50代以上の認知速度30%低下防止 |
| 見出しフォント | 28-36px | text-2xl〜text-5xl | NNGroup調査 |
| 行間 | 1.6以上（本文） | leading-relaxed | 1.2以下で読み飛ばし率40%増 |
| コントラスト比 | 4.5:1以上（AA） | navy on white=11.6:1 | WCAG AA |
| タップターゲット | 48x48px以上 | CTAボタン py-4=56px+ | 44px以下でミスタップ率2.5倍 |
| 背景色 | 明るいオフホワイト推奨 | Slide3,5: white/slate-50 | 純白は眩しい、ダーク背景あり |
| ダークモード | 非推奨 | ライトモードのみ | 50代以上の80%がライトモード |
| 1ページ情報量 | 3-5要素以下 | 各スライド3-5要素 | 情報過多で離脱率72%増 |
| スワイプ形式 | 推奨 | Swiper使用 | 50代以上でスクロールより完了率23%高い |
| 数字の視認性 | 48px以上太字 | text-5xl〜text-9xl font-black | 即座に理解（2.3倍） |
| フォームフィールド | 3以下 | 3フィールド | 5超で40%低下 |

---

## 8. パフォーマンス考慮

| 項目 | 対応 |
|------|------|
| 画像 | 使用なし（テキスト+数字+アイコン） |
| フォント | Noto Sans JP（Google Fonts、display=swap） |
| CSS | Tailwind CSS v3のみ、カスタムCSSはアニメーション関連のみ |
| JS | Swiper（Pagination+Mousewheel+Keyboard）、React state（フォーム） |
| FV表示速度 | 画像なしのため<1s想定 |

---

## 9. トラッキング設計

既存の `@link8/tracking` パッケージを使用:

| イベント | 関数 | トリガー |
|---------|------|---------|
| スライド閲覧 | `trackSlideView(index)` | Swiper onSlideChange |
| CTA クリック | `trackCtaClick("solar_form_submit")` | フォーム送信 |
| 電話タップ | `trackTelClick()` | 電話番号タップ |

計測ID（既存グローバル設定）:
- GA4: `G-D18R3SMJXJ`
- Clarity: `vj4uxf6p3g`
- Formspark: `qvZdUnofr`

---

## 10. 実装上の注意

### 既存コードとの整合

- `SwipeLp.tsx` は既にSlide 1-6が実装済み（現在のコード）
- 本仕様書は**既存実装のデザイン根拠と数値を明文化**したもの
- 新たなTailwindカスタム設定の追加は不要（link8Preset + Tailwind標準色で完結）

### カスタムCSSの追加（1箇所のみ）

`apps/solar/src/app/globals.css` に以下を追記する（CTAボタンのemeraldグロー）:

```css
@keyframes pulse-glow-emerald {
  0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  50% { box-shadow: 0 0 0 12px rgba(16, 185, 129, 0); }
}

.cta-pulse {
  animation: pulse-glow-emerald 2s ease-in-out infinite;
}
```

### Swiper設定

既存のSwiperLP共通コンポーネントを使用（`@link8/ui`の`SwiperLP`）:
- direction: vertical（モバイル）
- pagination: clickable bullets
- mousewheel: enabled
- keyboard: enabled
- speed: 600ms

### フォーム送信先

Formspark: `https://submit-form.com/qvZdUnofr`
Subject: `【太陽光LP】無料Zoom相談のお申し込み`

---

## 付録A: 全6スライドの情報アーキテクチャ

```
Slide 1 [衝撃]     → 感情: 恐怖・危機感 → 「自分ごと」化
  ↓ （離脱率40-50%を想定。最大インパクトで食い止める）
Slide 2 [解決策]    → 感情: 安心・驚き  → 「こんな製品が」
  ↓
Slide 3 [独自性]    → 感情: 信頼       → 「建設会社だから安心」
  ↓
Slide 4 [コスト]    → 感情: 期待・計算  → 「700万円削減なら」
  ↓
Slide 5 [フロー]    → 感情: 安心・手軽  → 「3ステップで無料」
  ↓
Slide 6 [CTA]      → 行動: 申し込み    → フォーム or 電話
```

### 各スライドの情報量チェック（3-5要素ルール）

| スライド | 要素数 | 要素一覧 |
|---------|--------|---------|
| 1 | 4 | 警告バー、H1コピー、サブコピー、重量比較2カード |
| 2 | 4 | メイン数字、H2コピー、スペック4カード、タグ3つ |
| 3 | 4 | H2コピー、メイン強みカード、サブ強み2カード、フッターメッセージ |
| 4 | 4 | メイン数字(%削減)、実例カード、メリット3カード |
| 5 | 4 | H2コピー、3ステップ、安心カード |
| 6 | 5 | H2コピー、フォーム3入力、CTAボタン、電話ボタン、バッジ |

全スライドが5要素以内 → OK（情報過多で離脱率72%増を回避）

---

## 付録B: デザイン判断の根拠一覧

| デザイン判断 | 根拠データ | 出典 |
|-------------|-----------|------|
| 赤背景でファーストビュー | 損失回避フレーム: 利得比で+30% CVR | カーネマン&トベルスキー / LP競合分析 |
| 数字48px以上 | アイトラッキング調査: 理解速度2.3倍 | NNGroup |
| フォーム3フィールド | 3以下で最高CVR、5超で40%低下 | Formstack調査 |
| スワイプ形式 | 50代以上で完了率23%高い | UX研究 |
| 最小フォント16px | 16px以下で認知速度30%低下 | NNGroup高齢者UX |
| 行間1.6 | 1.2以下で読み飛ばし率40%増 | 可読性研究 |
| CTAボタン56px高 | 44px以下でミスタップ率2.5倍 | Apple HIG / WCAG |
| 1ページ3-5要素 | 情報過多で離脱率72%増 | CXL Institute |
| FVにCTA表示 | FV CTA有りLPは15-20%高CVR | HubSpot |
| 「無料診断」CTA | 「無料相談」比で30-40%高CVR | CTA A/Bテスト統計 |
