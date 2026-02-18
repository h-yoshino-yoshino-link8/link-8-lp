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
- Turborepoモノレポ完成。7 LPアプリ + 4共通パッケージ。全ビルド成功
- Vercelデプロイ済み（restoration LP）: https://link-8-lp-h-yoshino-link-8jps-projects.vercel.app
- Root Directory = `apps/restoration` に設定済み。GitHub push → 自動デプロイ

## 次にやること（番号付き3項目以内）
1. 他6 LPを個別Vercelプロジェクトとしてデプロイ（recruit, partner, casestudy, renovation, solar, area）
2. 実画像・実コンテンツ投入（プレースホルダー→実写真、施工事例実データ）
3. GA4 + GTM + Clarity のトラッキング設定（アカウント作成→GTM ID設定）

## 注意事項
- 現在の全LPはプレースホルダー画像/データ。実運用には実コンテンツが必要
- Vercel team: team_29etv6tTR4yTAhcjy4ETHQeP / project: prj_K6t8qIZVro3JvkiTzj3XcD6et2Sw
- pnpm-workspace.yaml に `packages/config/*` が必要（ネスト構造のため）
- MASTER_PLAN.md に6フェーズ計画の全体像あり
