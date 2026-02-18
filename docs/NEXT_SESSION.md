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
- 原状回復LP（restoration）Phase 1完了。コピー改善・PC版レスポンシブ・横スワイプ全実装済み
- A/Bテスト実装済み（横スワイプ vs 縦スクロール）。Cookie振り分け・GA4イベント自動付与済み
- デプロイ済み: `dpl_C2np2exKFzoijJnFT6rqwUeT3SBe`（READY）

## 次にやること（番号付き3項目以内）
1. GA4/GTM設定 — GTMProviderは実装済みだがGA4測定IDが未設定。IDを設定すればA/Bテストデータの計測開始可能
2. Phase 2（写真素材投入）— Before/After実写真、代表顔写真、顧客テスティモニアル
3. 他6 LPの本格実装（recruit, partner等は雛形のまま）

## 技術メモ
- A/Bテスト: `src/lib/ab-test.ts`（Cookie振り分け）、`src/lib/tracking.ts`（GA4イベント）
- デバッグURL: `?variant=swipe` or `?variant=scroll` でバリアント強制指定
- Swiper横スワイプ: `cssMode={true}` + インラインstyle（CSS !important競合を回避した解法）
- Vercel: team_29etv6tTR4yTAhcjy4ETHQeP / prj_K6t8qIZVro3JvkiTzj3XcD6et2Sw
- ビルド: `pnpm build --filter=@link8/lp-restoration`
- 主要ファイル: `apps/restoration/src/components/SwipeLp.tsx`（メインLPコンポーネント）
