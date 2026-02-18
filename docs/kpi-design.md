# 原状回復LP KPI/KGI 計測設計書

> 最終更新: 2026-02-19

## KGI（最終目標）

| KGI | 定義 | 計測方法 | 目標値 |
|-----|------|---------|--------|
| **月間CV数** | フォーム送信 + 電話タップの合計 | GA4 `form_submit` + `tel_click` | 月30件（Phase 1目標） |

## KPI（中間指標）

### Tier 1: 経営判断（週次確認）

| KPI | 定義 | GA4イベント/指標 | 目標値 |
|-----|------|-----------------|--------|
| CVR | CV数 / セッション数 | `form_submit` + `tel_click` / sessions | 3-5% |
| フォームCVR | フォーム送信 / セッション数 | `form_submit` / sessions | 2-3% |
| 電話CVR | 電話タップ / セッション数 | `tel_click` / sessions | 1-2% |
| CPA | 広告費 / CV数 | Google Ads連携 | 5,000円以下 |

### Tier 2: LP改善（隔週確認）

| KPI | 定義 | GA4イベント/指標 | 改善基準 |
|-----|------|-----------------|---------|
| 直帰率 | 1ページで離脱 | GA4自動 | 60%以下 |
| 平均滞在時間 | セッション時間 | GA4自動 | 90秒以上 |
| フォーム開始率 | form_start / sessions | `form_start` | 10%以上 |
| フォーム完了率 | form_submit / form_start | `form_submit` / `form_start` | 50%以上 |
| CTA到達率 | Slide 7到達 / sessions | `slide_view` (slide=7) | 30%以上 |
| スライド平均到達 | 最深到達スライド | `slide_view` 集計 | 4以上 |

### Tier 3: 長期分析（月次確認）

| KPI | 定義 | 分析方法 |
|-----|------|---------|
| デバイス別CVR | PC vs モバイルのCV率差 | GA4セグメント |
| A/Bバリアント別CVR | swipe vs scroll | `ab_variant` ディメンション |
| 流入元別CVR | organic / paid / direct / referral | GA4チャネルグループ |
| 曜日別CV | 曜日ごとのCV数推移 | GA4日時分析 |
| リピート率 | 再訪問ユーザーのCV率 | GA4新規/リピート |

---

## コンバージョンファネル

```
STEP 1: LP訪問（セッション開始）
  ↓ 計測: GA4 page_view（自動）
STEP 2: スライド閲覧
  ↓ 計測: slide_view（スライド番号）
STEP 3: CTA到達（Slide 7）
  ↓ 計測: slide_view (slide=7)
STEP 4A: フォーム入力開始
  ↓ 計測: form_start
STEP 5A: フォーム送信成功
  ↓ 計測: form_submit ★ CV
STEP 4B: 電話タップ
  ↓ 計測: tel_click ★ CV
```

### ファネル離脱ポイントの分析

| 離脱ポイント | 確認方法 | 改善アクション |
|-------------|---------|--------------|
| Slide 1→2 | slide_view(1) vs slide_view(2) | Hero改善（コピー、ビジュアル） |
| Slide 6→7 | slide_view(6) vs slide_view(7) | 中間CTA追加、希少性訴求 |
| CTA到達→フォーム開始 | slide_view(7) vs form_start | フォームUI改善、入力障壁低減 |
| フォーム開始→送信 | form_start vs form_submit | フィールド数削減、エラー表示改善 |

---

## GA4イベント一覧（実装済み）

| イベント名 | トリガー | パラメータ | キーイベント |
|-----------|---------|-----------|------------|
| `slide_view` | スライド表示時 | `slide`: 番号, `ab_variant` | - |
| `cta_click` | CTAクリック時 | `label`, `page`, `ab_variant` | - |
| `tel_click` | 電話タップ時 | `placement`, `ab_variant` | ★ CV |
| `form_start` | フォーム入力開始 | `channel`, `ab_variant` | - |
| `form_submit` | フォーム送信成功 | `channel`, `ab_variant` | ★ CV |
| `ab_variant_assigned` | 初回訪問時 | `ab_variant`, `is_new_user` | - |

### GA4でキーイベント登録が必要

1. GA4管理画面 → イベント → キーイベントとしてマーク
2. `form_submit` を キーイベントに設定
3. `tel_click` を キーイベントに設定

---

## A/Bテスト運用ルール

### 現在のテスト
- **Variant A（swipe）**: 横スワイプ（Swiper）
- **Variant B（scroll）**: 縦スクロール
- **振り分け**: 50/50 Cookie保存（30日間）
- **デバッグ**: `?variant=swipe` or `?variant=scroll`

### 統計的判定ルール
- **信頼水準**: 95%（p < 0.05）
- **最小サンプルサイズ**: 各バリアント200セッション以上
- **テスト期間**: 最低2週間、最大4週間
- **判定ツール**: GA4 Explorations でCVR比較 → 手動χ2検定
- **判定基準**: CVR差が5%未満なら「有意差なし」→デフォルト（swipe）採用

### テスト終了後のアクション
1. 勝者バリアントを全ユーザーに適用
2. ab-test.tsのデフォルト値を変更
3. 次のテスト項目（Hero見出し等）を計画

---

## データ保管・レポーティング

### GA4設定（要確認）
- [ ] データ保持期間を **14ヶ月** に変更（デフォルト2ヶ月は短すぎ）
  - GA4管理 → データ設定 → データ保持 → 14か月
- [ ] `form_submit` と `tel_click` をキーイベントに登録
- [ ] Google Search Console連携

### Clarity運用
- **データ保持**: 30日間（自動削除）
- **月次作業**: 月末にヒートマップのスクリーンショットを保存
- **保存先**: `docs/clarity-reports/YYYY-MM/` にエクスポート

### レポートサイクル

| 頻度 | 確認項目 | 担当 |
|------|---------|------|
| **毎日** | CV数（フォーム+電話）| Formsparkメール通知で自動 |
| **毎週** | Tier 1 KPI（CVR, CPA） | GA4ダッシュボード確認 |
| **隔週** | Tier 2 KPI + Clarity | ヒートマップ + ファネル分析 |
| **月次** | 全KPI + A/Bテスト判定 + 改善計画 | 月次レポート作成 |

---

## 次のアクション

### 今すぐ（GA4管理画面で設定）
1. GA4でデータ保持期間を14ヶ月に変更
2. `form_submit` をキーイベントに登録
3. `tel_click` をキーイベントに登録

### 今週中
4. Looker Studioダッシュボード構築（Tier 1 KPIの自動可視化）
5. Formsparkメール通知設定（CV発生時に即時通知）

### 今月中
6. スクロール深度計測の追加（GA4 Enhanced Measurement or GTM）
7. UTMパラメータ命名規則の策定（広告運用開始前に必須）
