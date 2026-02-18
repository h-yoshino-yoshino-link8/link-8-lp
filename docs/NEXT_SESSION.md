# 次のセッション引き継ぎ
以下をそのまま新しいターミナルに貼ってください:
---
cd ~/link-8-lp && claude
---
Claude起動後:
---
docs/NEXT_SESSION.md を読んで引き継ぎ。
---

## 状況（3行以内）
- インラインフォーム実装済み（Formspark直接POST、GA4 form_start/form_submit計測）
- OGP画像・favicon・JSON-LD・画像最適化をHPと整合済み
- KPI/KGI計測設計書作成済み（docs/kpi-design.md）
- 全てGitHub push済み。Vercelデプロイ上限リセット待ち（100/日）

## 次にやること（番号付き3項目以内）
1. Vercelデプロイ確認 + GA4でform_submit/tel_clickをキーイベント登録 + データ保持14ヶ月設定
2. 代表の顔写真投入（SlideProfile）+ Looker Studioダッシュボード構築
3. 行動経済学の残課題：社会的証明（導入社数、テスティモニアル）、価格アンカリング

## 技術メモ
- フォーム: SlideCta内インライン、Formspark ID=qvZdUnofr、送信先=submit-form.com
- 計測: form_start（入力開始）/ form_submit（送信成功）/ tel_click（電話タップ）
- KPI設計: docs/kpi-design.md（ファネル定義、A/Bテスト判定ルール、レポートサイクル）
- Vercel: team_29etv6tTR4yTAhcjy4ETHQeP / prj_K6t8qIZVro3JvkiTzj3XcD6et2Sw
- 主要ファイル: apps/restoration/src/components/SwipeLp.tsx
