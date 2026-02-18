# LinK LP群エコシステム マスタープラン v1.0

> 作成日: 2026-02-18
> ステータス: レビュー待ち（吉野代表承認前）
> 統合元: tracking-system-research.md / architecture-design.md / content-strategy.md

---

## エグゼクティブサマリー

株式会社LinKの事業成長を加速するため、**7種類のLP + エリア量産LP + 統合トラッキングシステム**を構築する。LP制作会社に外注すれば年間600万円超のコストがかかるところを、Next.js + 無料ツール群で自前構築し、**コスト90%以上削減**しながら同等以上の分析・改善能力を獲得する。

### 3つの柱

| 柱 | 内容 | 期待効果 |
|---|------|---------|
| **LP群の構築** | 7種類のLP + 30エリアLP = 最大37ページ | 月間リード50件以上 |
| **トラッキングシステム** | GA4 + GTM + Clarity + Looker Studio | LP制作会社と同等の分析力を無料で |
| **量産基盤** | Turborepoモノレポ + SSG量産 | 新LP追加1-2日、エリアLPはデータ追加のみ |

### 全体KPI目標（6ヶ月後）

| 指標 | 目標値 |
|------|--------|
| 全LP合計 月間セッション | 5,000+ |
| 全LP合計 月間リード数 | 50件以上 |
| 原状回復LP CVR | 3.0%以上 |
| 月間広告予算 | 62.5万円 |
| LP制作外注比での年間コスト削減 | 約1,000万円 |

---

## 1. LP一覧と優先順位

| # | LP名 | URL | ターゲット | CV定義 | 優先度 |
|---|------|-----|-----------|--------|--------|
| LP1 | 原状回復 | /lp/restoration | 管理会社の原状回復担当 | 無料相談/電話 | ★★★ |
| LP5 | 導入事例 | /lp/casestudy | 比較検討中の管理会社 | 無料相談/事例PDF | ★★★ |
| LP7 | エリア特化 | /lp/area/{city} | 「○○区 原状回復」検索者 | 無料相談/電話 | ★★★ |
| LP2 | 求人 | /lp/recruit | 施工管理者/職人/事務 | 応募フォーム | ★★☆ |
| LP3 | 協力会社募集 | /lp/partner | 専門工事会社 | パートナー登録 | ★★☆ |
| LP6 | 大規模修繕 | /lp/renovation | 管理会社/オーナー | 無料建物診断 | ★★☆ |
| LP4 | 太陽光 | /lp/solar | 管理会社/オーナー | 無料屋根診断 | ★☆☆ |

### 各LPのヘッドライン（「整える」で統一）

- LP1: **原状回復を、整える。**
- LP2: **建設業界を、整える側へ。**
- LP3: **共に成長する、パートナーへ。**
- LP4: **屋根が、収益を生む。**
- LP5: **他社はこう使っています。**
- LP6: **建物の未来を、整える。**
- LP7: **{エリア名}の原状回復を、整える。**

---

## 2. 技術アーキテクチャ

### モノレポ構成（Turborepo + pnpm）

```
link-8-lp/
├── apps/
│   ├── restoration/    ← 原状回復LP（既存移行）
│   ├── recruit/        ← 求人LP
│   ├── partner/        ← 協力会社募集LP
│   ├── solar/          ← 太陽光LP
│   ├── casestudy/      ← 導入事例LP
│   ├── renovation/     ← 大規模修繕LP
│   └── area/           ← エリア特化LP（量産型）
│
├── packages/
│   ├── ui/             ← 共通UIコンポーネント（12種）
│   ├── tracking/       ← GA4/GTM統合モジュール
│   ├── config/         ← Tailwind preset + ESLint + TSConfig
│   └── data/           ← 会社情報・エリアデータ・サービス定義
│
├── turbo.json
└── pnpm-workspace.yaml
```

### ドメイン戦略: サブディレクトリ方式

```
link-8.jp/              ← 公式HP（既存link-8-site）
link-8.jp/lp/restoration ← 原状回復LP
link-8.jp/lp/recruit     ← 求人LP
link-8.jp/lp/area/shibuya ← エリア特化LP
...
```

**理由**: SEOドメインパワー集約、クロスドメイントラッキング不要、SSL/DNS追加設定不要

**実装方法**: link-8-site側の `next.config.mjs` でMulti-Zones rewrites → 各LPアプリにルーティング

### 共通UIコンポーネント（packages/ui）

Header / Footer / CTASection / CTAButton / ContactForm / SwiperHero / TestimonialCard / BeforeAfter / FlowStep / FAQAccordion / SEOHead / PhoneButton

### エリアLP量産（SSG）

- `generateStaticParams` でビルド時に全エリアページを静的生成
- エリアデータJSONに1行追加 → 自動でLP生成
- Phase1: 東京主要10区 → Phase2: 残り13区 → Phase3: 神奈川・埼玉・千葉10市

---

## 3. トラッキングシステム

### 技術スタック（全て無料）

| レイヤー | ツール | 役割 |
|---------|--------|------|
| タグ管理 | **GTM** | 全タグを一元管理。非エンジニアでも設定変更可能 |
| アクセス解析 | **GA4** | セッション・CV・ファネル分析 |
| ヒートマップ | **Microsoft Clarity** | 無制限の録画・ヒートマップ・AIサマリー |
| ダッシュボード | **Looker Studio** | GA4直結のリアルタイムダッシュボード |
| パフォーマンス | **Vercel Speed Insights** | Core Web Vitals自動計測 |

### 計測するイベント

| イベント | 方法 | 重要度 |
|---------|------|--------|
| フォーム送信 | GTM + サンクスページ | 最重要 |
| 電話タップ | GTM (tel:リンク検知) | 最重要 |
| CTAクリック | GTM (data属性) | 高 |
| スクロール深度 | GTM組み込み (25/50/75/100%) | 中 |
| セクション到達 | Intersection Observer | 中 |
| 滞在時間 | GTMタイマー | 低 |

### UTM命名規則（厳守）

```
utm_source:   google / yahoo / facebook / instagram / line / referral_pm
utm_medium:   cpc / organic / social / email / qr / dm
utm_campaign: {lp名}_{エリア}_{YYYYMM} (例: restoration_tokyo_202603)
utm_content:  {広告バリアント} (例: ad_variant_a)
utm_term:     検索キーワード
```

**ルール**: 全て小文字、スペースはアンダースコア、内部リンクにUTMは絶対不可

### ダッシュボード（Looker Studio）

**Tier 1（経営判断）**: CV数 / CVR / CPA / 流入元別CV
**Tier 2（LP改善）**: 直帰率 / 平均滞在時間 / スクロール深度 / CTA CTR
**Tier 3（長期分析）**: LP別比較 / 曜日・時間帯別 / デバイス別 / 地域別

自動レポート: 週次サマリー + 月次詳細をメール配信

---

## 4. 広告運用戦略

### 月間予算配分

| LP | 月間予算 | 比率 | チャネル |
|----|---------|------|---------|
| LP1: 原状回復 | ¥250,000 | 40% | Google検索 + Meta |
| LP5: 導入事例 | ¥120,000 | 19% | Google検索 + リマーケティング |
| LP7: エリア特化 | ¥80,000 | 13% | Google検索（地域KW） |
| LP6: 大規模修繕 | ¥80,000 | 13% | Google検索 |
| LP2: 求人 | ¥60,000 | 10% | Google検索 + Indeed |
| LP3: 協力会社 | ¥20,000 | 3% | Google検索 |
| LP4: 太陽光 | ¥15,000 | 2% | Google検索（テスト） |
| **合計** | **¥625,000** | **100%** | |

### リターゲティング導線

| 訪問LP → 未CV | リターゲティング先 | 期間 |
|---------------|-------------------|------|
| LP1（原状回復） | LP5（導入事例） | 7日以内 |
| LP5（導入事例） | LP1（原状回復）CTA最適化版 | 14日以内 |
| LP7（エリア特化） | LP1（原状回復） | 7日以内 |

---

## 5. 実装フェーズ（6ヶ月計画）

### Phase 0: モノレポ基盤構築（Week 1）

- [ ] Turborepo + pnpm workspace初期化
- [ ] packages/ui, tracking, config, data の空パッケージ作成
- [ ] Tailwind preset（LinKブランドカラー）作成
- [ ] GTMProvider + useTracking hook作成
- [ ] turbo.json, pnpm-workspace.yaml設定

**成果物**: ビルドが通るモノレポ基盤

### Phase 1: 既存LP移行 + トラッキング基盤（Week 2-3）

- [ ] 既存 restoration LP を apps/restoration に移行
- [ ] 共通コンポーネント抽出 → packages/ui
- [ ] GA4プロパティ作成 + GTMコンテナ作成
- [ ] フォーム送信 + 電話タップのCV計測設定
- [ ] Microsoft Clarity導入
- [ ] Vercel Analytics + Speed Insights導入
- [ ] UTM命名規則ドキュメント策定
- [ ] 基本Looker Studioダッシュボード構築

**成果物**: 既存LPがモノレポ内で動作 + トラッキング完備

### Phase 2: ルーティング + エリアLP基盤（Week 4-5）

- [ ] link-8-site に Multi-Zones rewrites追加
- [ ] basePath設定 + 本番ドメイン疎通テスト
- [ ] エリアLPテンプレート設計
- [ ] generateStaticParams + SSG実装
- [ ] 東京主要10区のエリアデータ投入
- [ ] エリアLP SEO設定（構造化データ、サイトマップ）

**成果物**: link-8.jp/lp/restoration が動作 + 10エリアLP公開

### Phase 3: 高優先度LP構築（Week 6-9）

- [ ] LP5: 導入事例LP
- [ ] LP2: 求人LP
- [ ] LP3: 協力会社募集LP
- [ ] LP7: 残り13区のエリアデータ追加（Phase 2エリア）

**成果物**: 合計4LP + 23エリアLP公開

### Phase 4: 中優先度LP + 広告本格運用（Week 10-16）

- [ ] LP6: 大規模修繕LP
- [ ] LP4: 太陽光LP
- [ ] LP7: 神奈川・埼玉・千葉10市追加（Phase 3エリア）
- [ ] Google広告アカウント設定 + 配信開始
- [ ] リマーケティング設定

**成果物**: 全7LP + 30エリアLP完成 + 広告運用開始

### Phase 5: 最適化・高度化（Week 17-24）

- [ ] A/Bテスト基盤構築（ヘッドライン・CTA）
- [ ] マイクロコンバージョン計測（セクション到達率）
- [ ] 週次自動レポート配信設定
- [ ] LP別パフォーマンス比較ダッシュボード
- [ ] フォームhiddenフィールドによるUTM→CRM連携
- [ ] クロスLP導線の最適化

**成果物**: データドリブンなLP改善サイクル確立

---

## 6. コスト比較

### 外注した場合（LP制作会社）

| 項目 | コスト |
|------|--------|
| LP制作（7LP × 60万円） | 420万円 |
| エリアLP制作（30ページ） | 150万円 |
| 月額運用費（分析+改善） | 月10万円 = 年120万円 |
| 広告運用代行費（20%マージン） | 月12.5万円 = 年150万円 |
| **初年度合計** | **約840万円** |
| **2年目以降/年** | **約270万円** |

### 自前構築した場合

| 項目 | コスト |
|------|--------|
| LP制作（Claude Code活用） | 0円（開発時間のみ） |
| Vercel Pro | 月$20 = 年約3.6万円 |
| GA4 + GTM + Clarity + Looker Studio | 全て無料 |
| 広告費（自社運用） | 月62.5万円 = 年750万円 |
| **初年度合計（広告費込み）** | **約754万円** |
| **初年度合計（広告費除く）** | **約4万円** |

### 差額

**制作・運用コストの削減: 年間約560万円（広告費除く比較）**

---

## 7. フォーム・通知フロー

### Formspark + Slack通知

```
[フォーム送信]
    │
    ├──→ [Formspark] ──→ [メール通知] → info@link-8.jp
    │                    件名: 【{LP名}】新規お問い合わせ
    │
    └──→ [Webhook] ──→ [n8n] ──→ [Slack #inquiries]
                                    LP名 / エリア / 会社名 / 電話 / メール
```

### LP別フォームID

| LP | Formspark ID | 通知先 |
|----|-------------|--------|
| 原状回復 | FORM_RESTORATION | info@link-8.jp |
| 求人 | FORM_RECRUIT | recruit@link-8.jp |
| 協力会社 | FORM_PARTNER | partner@link-8.jp |
| 太陽光 | FORM_SOLAR | info@link-8.jp |
| 導入事例 | FORM_CASESTUDY | info@link-8.jp |
| 大規模修繕 | FORM_RENOVATION | info@link-8.jp |
| エリアLP | FORM_AREA（共通） | info@link-8.jp |

---

## 8. 品質管理チェックリスト

### SSOT（Single Source of Truth）準拠

- [ ] 会社情報は全てマスターデータから参照
- [ ] 「従業員40名」「自社施工」等の禁止表現なし
- [ ] 「協力会社60社以上」の表記統一
- [ ] 電話番号: 03-6825-2464 で統一

### SEO

- [ ] 全LPにtitle / description / OGP設定
- [ ] 構造化データ（LocalBusiness / Service / FAQ / JobPosting）
- [ ] サイトマップ自動生成
- [ ] canonical URL設定
- [ ] エリアLPの独自コンテンツ30%以上

### トラッキング

- [ ] GTMコンテナ全LPに設置
- [ ] フォーム送信CVイベント計測
- [ ] 電話タップCVイベント計測
- [ ] Clarityスクリプト全LPに設置
- [ ] UTMパラメータが命名規則に準拠

---

## 9. リスクと対策

| リスク | 影響度 | 対策 |
|-------|-------|------|
| モノレポ移行でビルド不安定 | 高 | 段階的移行。既存LPバックアップ確保 |
| エリアLP量産でGoogle品質低下 | 中 | 独自コンテンツ30%以上、地域固有データ充実 |
| 広告費対効果が合わない | 中 | テスト期間は少額で検証、CPA上限設定 |
| Formspark従量課金超過 | 低 | 月間送信数監視、超過前アラート |

---

## 10. 次のアクション

### 吉野代表の承認後、即座に開始するもの

1. **Phase 0 実行**: Turborepoモノレポ基盤構築（1-2日）
2. **GA4/GTMアカウント作成**: Googleアカウントで設定
3. **Formspark追加フォーム作成**: LP別にフォームID取得

### 代表への確認事項

- [ ] 月間広告予算62.5万円の承認
- [ ] link-8.jp ドメインでのサブディレクトリ運用の承認
- [ ] 求人LP・協力会社LPの掲載内容（給与条件等）の確認
- [ ] 導入事例LPに掲載する顧客名（仮名 or 実名）の方針
- [ ] 太陽光事業の詳細情報（対応範囲・価格帯等）

---

> **このマスタープランは生きたドキュメントです。各フェーズ完了時に実績値で更新します。**
