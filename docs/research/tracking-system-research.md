# LP トラッキングシステム調査レポート

> 調査日: 2026-02-18
> 調査担当: tracking-researcher
> 対象: 株式会社LinK LP群（原状回復・リフォーム B2B）

---

## エグゼクティブサマリー

1. **LinKのLP群には、GA4 + GTM + Microsoft Clarity の3層構成が最もコスパが高い**。GA4でコンバージョン計測、GTMでイベント管理、Clarityで無料ヒートマップ・セッション録画を実現する。
2. **UTMパラメータは5種（source/medium/campaign/content/term）を厳格な命名規則で統一管理**し、HP（link-and-value.com）とLP群間のクロスドメイントラッキングを構築する。
3. **電話タップ（Click to Call）のトラッキングはB2Bビジネスで最重要**。GTMで`tel:`リンクのクリックイベントをGA4キーイベントとして計測する。
4. **Vercel Analytics + Speed Insightsを補完的に活用**し、Core Web Vitalsの監視を行う。
5. **自前実装（Next.js）で、LP制作会社の月額3-10万円の分析レポートと同等以上の機能を実現可能**。

---

## 1. UTM/アトリビューション管理

### 現状のベストプラクティス

#### UTMパラメータ設計

| パラメータ | 用途 | LinK推奨値の例 |
|-----------|------|---------------|
| `utm_source` | 流入元 | `google`, `yahoo`, `facebook`, `instagram`, `line`, `referral_pm` |
| `utm_medium` | 流入メディア | `cpc`, `organic`, `social`, `email`, `qr`, `dm` |
| `utm_campaign` | キャンペーン名 | `gensou_lp_2026q1`, `reform_spring` |
| `utm_content` | コンテンツ識別 | `hero_cta`, `sidebar_banner`, `footer_link` |
| `utm_term` | キーワード（広告用） | `原状回復_東京`, `退去立会い_費用` |

#### 命名規則（厳守）

- **全て小文字**（GA4はケースセンシティブ。`Facebook` と `facebook` は別扱いになる）
- **スペースはアンダースコア**に置換（`gensou kaifuku` → `gensou_kaifuku`）
- **日付フォーマット統一**: `YYYYMM`（例: `202602`）
- **内部リンクにUTMは絶対に付けない**（GA4のセッションが途切れ、アトリビューションデータが壊れる）

#### アトリビューションモデル

| モデル | 説明 | LinKでの活用シーン |
|--------|------|-------------------|
| **ファーストタッチ** | 最初の接触点を評価 | 「どの広告がリードを発見させたか」を知りたい時 |
| **ラストタッチ** | 最後の接触点を評価 | 「どのLPが最終CVに貢献したか」を知りたい時 |
| **データドリブン** | GA4のAI分析 | 十分なデータ蓄積後（月間CV 50件以上推奨） |

#### クロスドメイントラッキング（HP ↔ LP間）

- **同一GA4プロパティ**をHP（link-and-value.com）と全LP（サブドメインまたは別ドメイン）にインストール
- GA4管理画面 > データストリーム > タグ設定 > ドメインの設定で全ドメインを登録
- `_gl`パラメータが自動付与され、ユーザーのセッションが継続される
- **注意**: リンククリック経由のみ有効。フォーム送信やリダイレクトには追加実装が必要

### LinKへの推奨事項

1. **UTM命名規則ドキュメント**を作成し、全LP・広告で統一する
2. **ファーストタッチ + ラストタッチの両方**をCRMに記録（フォーム隠しフィールドで自動取得）
3. **月次UTM監査**を実施し、タイポや命名規則ドリフトを防ぐ

---

## 2. コンバージョン計測

### フォーム送信トラッキング

#### 実装方法

```
GTM設定:
- トリガー: フォーム送信（Form Submission）
- 条件: Form ID = "contact-form" or Page URL contains "/thanks"
- タグ: GA4 Event → event_name: "form_submit"
- パラメータ: form_type, page_location, utm_source（隠しフィールドから）
```

#### サンクスページ方式 vs イベント方式

| 方式 | メリット | デメリット |
|------|---------|-----------|
| サンクスページ | 設定が簡単、GA4で直接計測可能 | 直接URL入力で誤カウントの可能性 |
| イベント方式 | 正確、フォームバリデーション後のみ発火 | GTM設定がやや複雑 |

**推奨**: 両方併用。サンクスページ + イベント方式のダブルチェック

### 電話タップ（Click to Call）トラッキング

B2Bの原状回復・リフォーム業界では**電話問い合わせがCVの大部分**を占めるため、最重要。

#### GTM設定手順

1. **変数の有効化**: GTM > 変数 > 組み込み変数 > Click Classes, Click URL, Click Text を有効化
2. **トリガー作成**:
   - トリガータイプ: 「リンクのみ」のクリック
   - 条件: Click URL が `tel:` を含む
3. **GA4イベントタグ**:
   - イベント名: `phone_click`
   - パラメータ: `link_url` = `{{Click URL}}`, `page_location` = `{{Page URL}}`
4. **キーイベント設定**: GA4管理画面でphone_clickをキーイベント（旧コンバージョン）に設定

**注意**: GA4はクリックのみ計測。通話完了・通話時間は計測不可。高度な通話計測にはCallRail等の専用サービスが必要（月額$45〜）。

### CTAクリック計測

```
GTMタグ設計:
- event_name: "cta_click"
- パラメータ:
  - cta_text: {{Click Text}}（例:「無料見積もりはこちら」）
  - cta_position: data-cta-position属性値（例: "hero", "mid", "footer"）
  - page_section: data-section属性値
```

### マイクロコンバージョン

| イベント | 実装方法 | 価値 |
|---------|---------|------|
| **スクロール深度** | GTM組み込みトリガー（25%, 50%, 75%, 90%） | LPコンテンツの読了率把握 |
| **滞在時間** | GTMタイマートリガー（15秒, 30秒, 60秒, 180秒） | エンゲージメント品質の指標 |
| **セクション到達** | Intersection Observer API | 各セクションの到達率（ファネル分析） |
| **スライド/カルーセル操作** | カスタムイベント | 事例スライダーの閲覧状況 |
| **資料DLクリック** | GTMリンククリックトリガー | リード品質のシグナル |

---

## 3. ユーザー行動分析

### ヒートマップツール比較

| 機能 | Microsoft Clarity | Hotjar | Crazy Egg |
|------|------------------|--------|-----------|
| **料金** | **完全無料** | 無料プラン（35セッション/日）+ 有料 | 有料のみ（$29/月〜） |
| **セッション録画** | 無制限 | 無料プランで制限あり | あり |
| **クリックヒートマップ** | あり | あり | あり |
| **スクロールヒートマップ** | あり | あり | あり |
| **データ保持期間** | 30日 | 365日（全プラン） | 90日 |
| **怒りクリック検出** | あり（Dead clicks, Rage clicks） | あり（Rage heatmap） | なし |
| **GA4統合** | あり | あり | あり |
| **AI分析** | Copilot統合（AI要約） | AI for Surveys | なし |
| **サポート** | コミュニティのみ | 専任サポート | メールサポート |

#### LinKへの推奨

**Microsoft Clarity を主軸に採用**する理由:
- 完全無料で無制限のセッション録画・ヒートマップ
- Dead clicks / Rage clicks の自動検出でUX問題を素早く発見
- Copilot（AI）がセッション録画の要約を自動生成
- GA4とのネイティブ統合が可能
- Next.jsでの導入が容易（scriptタグ1つ）

**補足**: データ保持が30日のため、月次でレポートをエクスポートする運用ルールを設ける。

### セッション録画の活用パターン

1. **CV完了ユーザー**: フォーム到達までの行動パターンを分析
2. **離脱ユーザー**: どのセクションで離脱したかを特定
3. **Rage Click発生箇所**: クリックできると誤認される要素の改善
4. **モバイル vs PC**: デバイス別のUX問題を発見

### 離脱ポイント分析

- GA4のファネルレポートでページ遷移ごとの離脱率を可視化
- Clarityのスクロールヒートマップで「何%のユーザーがどこまで読んだか」を把握
- **重要指標**: 「ファーストビュー離脱率」「CTA直前離脱率」「フォーム離脱率」

---

## 4. ダッシュボード・レポート

### リアルタイムダッシュボード設計

#### 表示すべきKPI（優先順位順）

**Tier 1: 経営判断に直結**
| KPI | 定義 | 目標値目安 |
|-----|------|-----------|
| CV数 | フォーム送信 + 電話タップ合計 | LP別に設定 |
| CVR | CV数 / セッション数 | 3-5%（B2B LP） |
| CPA | 広告費 / CV数 | 業界・キャンペーンにより設定 |
| 流入元別CV | UTM sourceごとのCV内訳 | - |

**Tier 2: LP改善に必要**
| KPI | 定義 | 目標値目安 |
|-----|------|-----------|
| 直帰率 | 1ページで離脱した割合 | 40-60%（LP） |
| 平均滞在時間 | ページ滞在秒数 | 60秒以上 |
| スクロール深度 | 75%到達率 | 40%以上 |
| CTA CTR | CTAクリック / セッション | 5-10% |

**Tier 3: 長期トレンド分析**
| KPI | 定義 |
|-----|------|
| LP別パフォーマンス比較 | 全LP横断のCVR/CPA比較 |
| 曜日・時間帯別CV | 最適な広告配信タイミング |
| デバイス別CVR | モバイル/PC/タブレットの比較 |
| 地域別CV | エリアマーケティングの効果 |

### ダッシュボード実装オプション

| ツール | コスト | 特徴 |
|--------|-------|------|
| **Looker Studio（旧Data Studio）** | 無料 | GA4直接連携、カスタム自由度高い |
| **GA4カスタムレポート** | 無料 | 標準機能で基本KPIをカバー |
| **自前ダッシュボード（Next.js）** | 開発コスト | LinK専用UI、他システム統合可能 |
| Databox | $47/月〜 | 多数のデータソース統合 |

#### LinK推奨: Looker Studio + GA4

- 無料で高機能なダッシュボードを構築可能
- GA4のデータをリアルタイムに可視化
- 共有リンクで関係者（営業担当等）にも簡単に共有
- 自動レポート（PDF）のメール配信が可能（週次/月次）

### 自動レポート生成

```
GA4 → Looker Studio → 自動メール配信
  - 週次サマリー: CV数、CVR、流入元TOP5
  - 月次詳細: LP別比較、CPA推移、改善提案
```

---

## 5. A/Bテスト

### テスト対象と優先順位

| テスト対象 | 優先度 | 理由 |
|-----------|--------|------|
| **ヘッドライン（H1）** | 最高 | CVRへの影響が最大（20-30%の差が出ることも） |
| **CTAテキスト・色** | 高 | クリック率に直結 |
| **ヒーロー画像** | 高 | 第一印象を決定 |
| **フォームの長さ** | 中 | フィールド数とCV率のトレードオフ |
| **社会的証明の配置** | 中 | 実績・資格の見せ方 |
| **レイアウト構成** | 低 | テスト範囲が大きく、要因分析が困難 |

### 統計的有意差の判定

#### 基本ルール

- **信頼水準**: 95%（p値 < 0.05）
- **必要サンプルサイズ**: ベースラインCVR 3%、検出したい差 1%の場合 → 各バリアント約3,800セッション
- **テスト期間**: 最低2週間（曜日効果を排除）、最大4週間

#### 統計モデル

| モデル | 特徴 | 推奨ツール |
|--------|------|-----------|
| **頻度論（Frequentist）** | 古典的。p値で判定 | Google Optimize（終了）、VWO |
| **ベイズ推論（Bayesian）** | 確率で判定。早期停止が可能 | VWO SmartStats、Statsig |

#### LinK向け実装方法

**Phase 1（初期）**: Next.jsでシンプルなA/Bテストを自前実装
```
方法:
- Cookie/URL パラメータでバリアント振り分け
- GA4カスタムディメンションでバリアントを記録
- Looker Studioで比較レポート作成
- Evan's Awesome A/B Tools で有意差判定
```

**Phase 2（拡大期）**: 専用ツール導入
```
候補:
- VWO（$99/月〜）: ビジュアルエディタ + ベイズ統計
- Statsig（無料プランあり）: 開発者向け、API統合
- Vercel Edge Config: フィーチャーフラグとしてA/Bテスト
```

---

## 6. 技術実装

### Next.js + GA4 実装アーキテクチャ

```
┌─────────────────────────────────────────┐
│ Next.js App (App Router)                │
│                                         │
│  ┌──────────────┐  ┌────────────────┐   │
│  │ @next/third-  │  │ @vercel/       │   │
│  │ parties/google│  │ analytics      │   │
│  │ (GTM)         │  │ speed-insights │   │
│  └──────┬───────┘  └───────┬────────┘   │
│         │                  │            │
│  ┌──────▼──────────────────▼────────┐   │
│  │ Client-side Event Layer          │   │
│  │ (dataLayer.push, custom events)  │   │
│  └──────┬───────────────────────────┘   │
└─────────┼───────────────────────────────┘
          │
          ▼
┌─────────────────────┐
│ GTM Container       │
│ ┌─────────────────┐ │
│ │ GA4 Tag         │ │
│ │ Clarity Tag     │ │
│ │ Custom Event    │ │
│ │ Tags            │ │
│ └─────────────────┘ │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────────────┐
│ Data Destinations           │
│ - GA4 (Google Analytics 4)  │
│ - Microsoft Clarity         │
│ - Looker Studio (Reports)   │
│ - (将来) BigQuery           │
└─────────────────────────────┘
```

### 具体的な実装コード構成

#### 1. GTM導入（@next/third-parties推奨）

```typescript
// app/layout.tsx
import { GoogleTagManager } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
      <GoogleTagManager gtmId="GTM-XXXXXXX" />
    </html>
  )
}
```

**メリット**: Next.js公式推奨。GTMをハブにしてGA4・Clarity等すべてのタグを管理。直接GA4スニペットを入れる必要がない。

#### 2. Microsoft Clarity（GTM経由 or 直接）

GTM経由での設置が推奨（タグ管理の一元化）。GTMでClarityタグテンプレートを使用。

#### 3. Vercel Analytics / Speed Insights

```typescript
// app/layout.tsx に追加
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

**計測対象**: TTFB, FCP, LCP, FID, INP, CLS の6指標。Vercelダッシュボードで自動可視化。

#### 4. カスタムイベント送信ヘルパー

```typescript
// lib/tracking.ts
export function trackEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    })
  }
}

// 使用例
trackEvent('cta_click', {
  cta_text: '無料見積もりはこちら',
  cta_position: 'hero',
  page_path: '/lp/gensou-kaifuku',
})
```

### サーバーサイドトラッキング vs クライアントサイド

| 項目 | クライアントサイド | サーバーサイド |
|------|-------------------|---------------|
| **実装難易度** | 低（GTMで完結） | 中〜高（サーバーコンテナ必要） |
| **コスト** | 無料 | Cloud Run等で月$50-200 |
| **精度** | 広告ブロッカーで欠落あり | ブロッカーの影響を受けにくい |
| **Cookie規制対応** | 弱い | 強い（ファーストパーティCookieに変換） |
| **推奨フェーズ** | **Phase 1（今すぐ）** | Phase 3（トラフィック増加後） |

**LinK推奨**: まずクライアントサイド（GTM）で開始。月間1万PV超でサーバーサイド検討。

### Cookie規制への対応（日本/APPI）

#### 日本の現状（2026年）

- **ファーストパーティCookie**: 規制対象外（自社サイトで設定するCookie）
- **サードパーティCookie**: 第三者と共有する場合、同意取得が必要
- **電気通信事業法改正**: 自社で設定するファーストパーティCookieおよびサービス提供に必須の情報は規制対象外
- **2025-2026改正**: 重大違反に対する行政課徴金制度の導入

#### LinKへの対応

1. GA4はファーストパーティCookieを使用 → 基本的に同意不要
2. 念のため簡易なCookieバナーを設置（ユーザー信頼度向上）
3. Google広告等のサードパーティトラッキングには同意管理を実装
4. プライバシーポリシーにCookie使用目的を明記

---

## 7. LP制作会社の料金体系・機能比較

### ノーコードLP作成サービスの分析機能

| サービス | 分析機能 | A/Bテスト | ヒートマップ | 月額料金 |
|---------|---------|-----------|------------|---------|
| **ペライチ** | アクセス解析あり | 上位プランで可能 | 上位プランで可能 | 無料〜6,910円/月 |
| **STUDIO** | 基本的なアクセス解析 | なし | なし | 無料〜4,980円/月 |
| **Wix** | Wix Analytics内蔵 | なし（外部連携） | なし | 無料〜2,700円/月 |

### 専門LP制作会社の提供機能

| 料金帯 | 提供内容 | 分析・レポート |
|--------|---------|---------------|
| 10万円以下 | テンプレート制作 | GA4設置のみ |
| 30-60万円 | オリジナルデザイン | GA4 + 月次レポート |
| 60-100万円 | 戦略設計 + 制作 | GA4 + GTM + ヒートマップ + 月次レポート + 改善提案 |
| 100万円以上 | フルサポート | 上記 + A/Bテスト + CRO + 広告運用 |

**月額運用費**: 分析レポート + 改善提案で月額3-10万円が相場

### LinK自前実装 vs 外注比較

| 項目 | 外注（60万円帯） | 自前（Next.js） |
|------|-----------------|----------------|
| **初期費用** | 60-100万円/LP | 開発時間のみ（Claude Code活用） |
| **月額運用** | 3-10万円 | ツール費用のみ（ほぼ無料） |
| **分析レポート** | 月1回PDF | Looker Studioでリアルタイム |
| **A/Bテスト** | 追加費用 | 自由に実施可能 |
| **ヒートマップ** | Hotjar有料プラン | Clarity（無料・無制限） |
| **カスタマイズ** | 制約あり | 完全自由 |
| **10LP運用時の年間コスト** | 600万円初期 + 360-1,200万円/年 | ほぼ0円（Vercel Pro $20/月のみ） |

**結論**: LinKの規模（7-10LP）では自前実装が圧倒的にコスト効率が高い。

---

## 8. 推奨技術スタック

| レイヤー | ツール | 理由 |
|---------|--------|------|
| **フレームワーク** | Next.js 14+ (App Router) | 既存HPと統一、SSR/SSGでSEO最適化 |
| **ホスティング** | Vercel | 既存利用中、Analytics/Speed Insights統合 |
| **タグ管理** | Google Tag Manager (GTM) | タグの一元管理、非エンジニアでも設定変更可能 |
| **アクセス解析** | Google Analytics 4 (GA4) | 無料、業界標準、Looker Studio連携 |
| **ヒートマップ/録画** | Microsoft Clarity | 完全無料、無制限、AI要約機能 |
| **パフォーマンス監視** | Vercel Speed Insights | コンポーネント追加のみで自動計測 |
| **ダッシュボード** | Looker Studio | 無料、GA4ネイティブ連携、自動レポート |
| **A/Bテスト（初期）** | 自前実装 + GA4 | コスト0、学習にもなる |
| **A/Bテスト（拡大期）** | VWO or Statsig | 本格的な統計分析が必要になったら |
| **Cookie同意** | 自前実装（軽量バナー） | 日本のAPPIでは大半がファーストパーティで規制対象外 |

---

## 9. LinK向け要件定義

### 必須（Phase 1: ローンチ時）

- [ ] GA4プロパティ作成 + 全LPへの導入
- [ ] GTMコンテナ作成 + 全LPへの導入
- [ ] UTM命名規則の策定と運用ドキュメント作成
- [ ] フォーム送信のコンバージョン計測
- [ ] 電話タップ（Click to Call）のコンバージョン計測
- [ ] CTAクリックイベントの計測
- [ ] Microsoft Clarity の全LPへの導入
- [ ] Vercel Analytics / Speed Insights の導入
- [ ] HP ↔ LP間のクロスドメイントラッキング設定
- [ ] 基本ダッシュボード（Looker Studio）の構築

### 推奨（Phase 2: 運用開始後1-3ヶ月）

- [ ] マイクロコンバージョン計測（スクロール深度、滞在時間、セクション到達）
- [ ] A/Bテスト基盤の構築（ヘッドライン・CTA）
- [ ] 週次自動レポートの設定（Looker Studio → メール配信）
- [ ] UTM月次監査プロセスの確立
- [ ] LP別パフォーマンス比較ダッシュボード
- [ ] フォーム隠しフィールドによるUTMパラメータのCRM連携

### 将来（Phase 3: 6ヶ月以降）

- [ ] サーバーサイドGTM（Cloud Run）の導入
- [ ] BigQueryへのデータエクスポート（高度な分析用）
- [ ] 専用A/Bテストツール（VWO等）の導入
- [ ] マルチタッチアトリビューション分析
- [ ] 通話計測サービス（CallRail等）の導入
- [ ] 自前ダッシュボード（Next.js管理画面）の構築
- [ ] 機械学習によるCV予測モデル

---

## 参考資料・出典

- [UTM Parameter Best Practices 2026 - Cometly](https://www.cometly.com/post/best-practices-for-utm-parameter-tracking)
- [UTM Tracking Guide - Dub](https://dub.co/blog/utm-guide)
- [Next.js GA4 Implementation - Medium](https://medium.com/@aashari/google-analytics-ga4-implementation-guide-for-next-js-16-a7bbf267dbaa)
- [GTM Server-Side Tagging Guide - Analytics Mania](https://www.analyticsmania.com/post/introduction-to-google-tag-manager-server-side-tagging/)
- [Microsoft Clarity vs Hotjar - Heatmap.com](https://www.heatmap.com/blog/microsoft-clarity-vs-hotjar)
- [Cross-Domain Tracking GA4 - Analytics Mania](https://www.analyticsmania.com/post/cross-domain-tracking-in-google-analytics-4/)
- [Vercel Speed Insights - Vercel Docs](https://vercel.com/docs/speed-insights)
- [Vercel Web Analytics - Vercel Docs](https://vercel.com/docs/analytics)
- [Phone Click Tracking GA4 - Digitnetix](https://www.digitnetix.com/post/call-event-tracking-ga4)
- [A/B Testing Guide 2026 - LanderLab](https://landerlab.io/blog/a-b-testing-for-landing-pages/)
- [A/B Testing Tools - VWO](https://vwo.com/blog/ab-testing-tools/)
- [Landing Page KPIs - Landingi](https://landingi.com/conversion-optimization/kpi/)
- [LP制作会社比較 - LISKUL](https://liskul.com/lp-marketing-99045)
- [LP制作費用相場 - Web幹事](https://web-kanji.com/posts/landing-page-price)
- [Japan APPI Compliance - SecurePrivacy](https://secureprivacy.ai/blog/appi-japan-privacy-compliance)
- [Japan Cookie Regulations - Securiti](https://securiti.ai/blog/consent-cookies-under-japan-appi/)
- [Next.js Analytics Guide - Next.js Docs](https://nextjs.org/docs/app/guides/analytics)
- [@next/third-parties - Next.js Docs](https://nextjs.org/docs/messages/next-script-for-ga)
