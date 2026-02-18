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
- Phase 2実写真導入済み（commit 7175624）。GitHub push済みだがVercelデプロイ上限で未反映（自動リセット待ち）
- 施工事例Slide: プラウドタワー木場公園のBefore/After写真4枚をnext/imageで実装
- A/Bテスト + GA4/Clarity計測は稼働中

## 次にやること（番号付き3項目以内）
1. Vercelデプロイ確認（上限リセット後に自動デプロイされるはず。されなければ空コミットpush）
2. 代表（吉野さん）の顔写真をSlideProfileに投入（現在プレースホルダー"Y"）
3. 行動経済学監査の残課題：社会的証明（導入社数、テスティモニアル）、価格アンカリング

## 技術メモ
- 写真: `apps/restoration/public/images/` に4枚（case1-before/after, case2-before/after）
- A/Bテスト: `src/lib/ab-test.ts` / `src/lib/tracking.ts`
- Swiper横スワイプ: `cssMode={true}` + インラインstyle
- 計測: GA4=G-D18R3SMJXJ / Clarity=vj4uxf6p3g / Formspark=qvZdUnofr
- Vercel: team_29etv6tTR4yTAhcjy4ETHQeP / prj_K6t8qIZVro3JvkiTzj3XcD6et2Sw
- Hobbyプラン: 100デプロイ/日上限。前回セッションで大量消費→リセット待ち
- 主要ファイル: `apps/restoration/src/components/SwipeLp.tsx`
