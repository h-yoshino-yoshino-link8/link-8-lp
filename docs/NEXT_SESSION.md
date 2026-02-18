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
- 原状回復LP Phase 1完了 + A/Bテスト + GA4/Clarity計測 全て稼働中
- GA4（G-D18R3SMJXJ）+ Clarity（vj4uxf6p3g）Vercel env設定済み・デプロイ済み
- A/Bテスト: 横スワイプ(swipe) vs 縦スクロール(scroll)、50/50 Cookie振り分け

## 次にやること（番号付き3項目以内）
1. GA4でA/Bテスト結果を確認（数日後データ蓄積してから）
2. Phase 2（写真素材投入）— Before/After実写真、代表顔写真、顧客テスティモニアル
3. 他6 LPの本格実装（recruit, partner等は雛形のまま）

## 技術メモ
- A/Bテスト: `src/lib/ab-test.ts`（Cookie振り分け）、`src/lib/tracking.ts`（GA4イベント）
- デバッグURL: `?variant=swipe` or `?variant=scroll` でバリアント強制指定
- Swiper横スワイプ: `cssMode={true}` + インラインstyle（CSS !important競合を回避した解法）
- 計測: GA4=G-D18R3SMJXJ / Clarity=vj4uxf6p3g / Formspark=qvZdUnofr
- Vercel: team_29etv6tTR4yTAhcjy4ETHQeP / prj_K6t8qIZVro3JvkiTzj3XcD6et2Sw
- ビルド: `pnpm build --filter=@link8/lp-restoration`
- 主要ファイル: `apps/restoration/src/components/SwipeLp.tsx`（メインLPコンポーネント）
