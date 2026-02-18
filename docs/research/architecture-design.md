# LP群エコシステム アーキテクチャ設計書

> 作成日: 2026-02-18
> 対象: 株式会社LinK LP群（7+LP + トラッキングシステム）

---

## エグゼクティブサマリー

株式会社LinKの7+LPを効率的に構築・運用するために、**Turborepoモノレポ + サブディレクトリ方式**を推奨する。

- **モノレポ**: 共通コンポーネント・デザインシステムを1箇所で管理し、全LPで共有
- **サブディレクトリ**: `link-8.jp/lp/xxx` 形式でSEOドメインパワーを集約
- **エリアLP量産**: `generateStaticParams` でビルド時に静的生成（SSG）
- **トラッキング**: GA4 + GTM統合 → BigQuery → Looker Studioダッシュボード
- **フォーム**: Formspark（既存）+ hidden fieldでLP元自動判別 + Slack通知

この設計により、新LP追加は**テンプレート複製+データ投入で1-2日**、エリアLPは**JSONデータ追加で数分**で量産可能になる。

---

## 1. 推奨アーキテクチャ概要

```
link-8-lp/ (Turborepo モノレポ)
│
├── apps/
│   ├── gateway/            ← メインルーター（Vercelデプロイ先）
│   │   ├── vercel.json     ← rewrites設定で各appにルーティング
│   │   └── next.config.mjs
│   │
│   ├── restoration/        ← 原状回復LP（既存link-8-lp移行）
│   │   └── basePath: /lp/restoration
│   │
│   ├── recruit/            ← 求人LP
│   │   └── basePath: /lp/recruit
│   │
│   ├── partner/            ← 協力会社募集LP
│   │   └── basePath: /lp/partner
│   │
│   ├── solar/              ← 太陽光LP
│   │   └── basePath: /lp/solar
│   │
│   ├── casestudy/          ← 導入事例LP
│   │   └── basePath: /lp/casestudy
│   │
│   ├── renovation/         ← 大規模修繕LP
│   │   └── basePath: /lp/renovation
│   │
│   └── area/               ← エリア特化LP（量産型）
│       ├── basePath: /lp/area
│       └── [city]/[service]/ ← 動的ルート
│
├── packages/
│   ├── ui/                 ← 共通UIコンポーネント
│   │   ├── Button, CTA, Header, Footer
│   │   ├── SwiperHero, TestimonialCard
│   │   └── ContactForm (Formspark統合)
│   │
│   ├── tracking/           ← トラッキング共通モジュール
│   │   ├── GTMProvider
│   │   ├── useTracking hook
│   │   └── UTM自動付与ユーティリティ
│   │
│   ├── config/             ← 共通設定
│   │   ├── tailwind.config（デザイントークン）
│   │   ├── eslint-config
│   │   └── tsconfig
│   │
│   └── data/               ← 共通データ
│       ├── areas.json      ← エリアデータ（区名、特性等）
│       ├── services.json   ← サービス定義
│       └── company.json    ← 会社情報マスター
│
├── turbo.json
├── package.json
└── pnpm-workspace.yaml
```

### データフロー図

```
[ユーザー] → link-8.jp/lp/xxx
                    │
                    ▼
        [Vercel Edge Network]
                    │
          ┌────────┴────────┐
          │   Gateway App   │  ← rewrites で各appにプロキシ
          └────────┬────────┘
                   │
    ┌──────┬──────┼──────┬──────┬──────┐
    ▼      ▼      ▼      ▼      ▼      ▼
 restoration recruit partner solar ... area/[city]
    │      │      │      │      │      │
    └──────┴──────┴──────┴──────┴──────┘
                   │
          ┌────────┴────────┐
          │  packages/ui    │  ← 共通CTA・フォーム
          │  packages/track │  ← GTM/GA4イベント
          └────────┬────────┘
                   │
    ┌──────────────┼──────────────┐
    ▼              ▼              ▼
 [Formspark]    [GA4/GTM]    [Slack通知]
    │              │
    ▼              ▼
 [メール通知]   [BigQuery]
                   │
                   ▼
            [Looker Studio]
            ダッシュボード
```

---

## 2. リポジトリ戦略

### 推奨: Turborepo モノレポ（pnpm workspaces）

### 理由

| 観点 | モノレポ | マルチリポ | 判定 |
|------|---------|-----------|------|
| 共通コンポーネント共有 | workspace参照で即時反映 | npm公開 or git submodule（手間大） | モノレポ |
| デザイン一貫性 | 1箇所のTailwind config | 各リポで個別管理（乖離リスク） | モノレポ |
| デプロイ | Vercelが自動検知・差分ビルド | 個別管理 | モノレポ |
| エリアLP量産 | 同一リポ内でデータ追加のみ | 量産しにくい | モノレポ |
| CI/CDキャッシュ | Turborepo Remote Cacheで高速 | 個別 | モノレポ |
| 学習コスト | やや高い（初期設定） | 低い | マルチリポ |
| チーム規模 | 1-3人なら十分 | 10人超ならマルチリポ検討 | LinKはモノレポ |

### ディレクトリ構造詳細

```
link-8-lp/
├── apps/
│   ├── gateway/
│   │   ├── package.json        { "name": "@link8/gateway" }
│   │   ├── vercel.json         ← rewritesルール
│   │   └── next.config.mjs
│   │
│   ├── restoration/
│   │   ├── package.json        { "name": "@link8/lp-restoration" }
│   │   ├── next.config.mjs     ← basePath: "/lp/restoration"
│   │   └── src/
│   │       └── app/
│   │           ├── page.tsx    ← LPメインページ
│   │           └── layout.tsx
│   │
│   ├── area/
│   │   ├── package.json        { "name": "@link8/lp-area" }
│   │   ├── next.config.mjs     ← basePath: "/lp/area"
│   │   └── src/
│   │       └── app/
│   │           └── [city]/
│   │               └── [service]/
│   │                   └── page.tsx  ← generateStaticParamsで量産
│   │
│   └── ... (他のLP)
│
├── packages/
│   ├── ui/
│   │   ├── package.json        { "name": "@link8/ui" }
│   │   ├── src/
│   │   │   ├── Button.tsx
│   │   │   ├── CTASection.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   ├── SwiperHero.tsx
│   │   │   └── index.ts       ← barrel export
│   │   └── tsconfig.json
│   │
│   ├── tracking/
│   │   ├── package.json        { "name": "@link8/tracking" }
│   │   └── src/
│   │       ├── GTMProvider.tsx
│   │       ├── useTracking.ts
│   │       ├── utm.ts
│   │       └── events.ts      ← イベント定義
│   │
│   ├── config/
│   │   ├── tailwind/
│   │   │   └── index.ts       ← 共通Tailwind preset
│   │   ├── eslint/
│   │   │   └── index.js
│   │   └── tsconfig/
│   │       ├── base.json
│   │       └── nextjs.json
│   │
│   └── data/
│       ├── package.json        { "name": "@link8/data" }
│       └── src/
│           ├── areas.ts        ← エリアマスターデータ
│           ├── services.ts
│           └── company.ts
│
├── turbo.json
├── package.json                ← ルート（workspace設定）
├── pnpm-workspace.yaml
└── .github/
    └── workflows/
        └── ci.yml
```

### pnpm-workspace.yaml

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

### ルート package.json

```json
{
  "name": "link-8-lp",
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "dev:restoration": "turbo dev --filter=@link8/lp-restoration",
    "dev:area": "turbo dev --filter=@link8/lp-area"
  },
  "devDependencies": {
    "turbo": "^2"
  },
  "packageManager": "pnpm@9.15.0"
}
```

### turbo.json

```json
{
  "$schema": "https://turborepo.com/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    }
  }
}
```

---

## 3. ドメイン戦略

### 推奨: サブディレクトリ方式

```
link-8.jp/              ← 公式HP（link-8-site）
link-8.jp/lp/restoration ← 原状回復LP
link-8.jp/lp/recruit     ← 求人LP
link-8.jp/lp/partner     ← 協力会社募集LP
link-8.jp/lp/solar       ← 太陽光LP
link-8.jp/lp/casestudy   ← 導入事例LP
link-8.jp/lp/renovation  ← 大規模修繕LP
link-8.jp/lp/area/shibuya-ku/restoration  ← エリア特化LP
link-8.jp/lp/area/shinjuku-ku/restoration ← エリア特化LP
```

### SEO観点でサブディレクトリが有利な理由

| 観点 | サブディレクトリ | サブドメイン |
|------|---------------|------------|
| ドメインオーソリティ | **集約される**（全LP→link-8.jpに貢献） | 分散する（別サイト扱い） |
| バックリンク効果 | 全LPのリンクが**1ドメインに蓄積** | 個別に蓄積（非効率） |
| Search Consoleの管理 | **1プロパティ**で管理 | LP毎にプロパティ追加 |
| クロスドメイントラッキング | **不要**（同一ドメイン） | 設定必要（複雑） |
| SSL/DNS設定 | **追加不要** | サブドメイン毎に設定 |
| インデックス速度 | **速い**（既存ドメインの信頼性を利用） | 新規ドメイン扱いで遅い |

### Vercel実装方法

**Gateway App（vercel.json）による rewrites**:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/lp/restoration/:path*",
      "destination": "https://link8-lp-restoration.vercel.app/lp/restoration/:path*"
    },
    {
      "source": "/lp/recruit/:path*",
      "destination": "https://link8-lp-recruit.vercel.app/lp/recruit/:path*"
    },
    {
      "source": "/lp/area/:path*",
      "destination": "https://link8-lp-area.vercel.app/lp/area/:path*"
    }
  ]
}
```

**代替案: Next.js Multi-Zones（推奨度: 高）**

公式HPのlink-8-site側の `next.config.mjs` でMulti-Zonesを設定する方法も有力:

```js
// link-8-site/next.config.mjs
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/lp/restoration/:path*',
        destination: 'https://link8-lp-restoration.vercel.app/lp/restoration/:path*',
      },
      // ... 各LP
    ];
  },
};
```

この場合、公式HP（link-8-site）がGateway役を兼ねるため、別途Gateway Appは不要になる。**こちらをメイン推奨**とする。

---

## 4. 共通コンポーネント設計

### packages/ui コンポーネント一覧

| コンポーネント | 用途 | カスタマイズポイント |
|-------------|------|-----------------|
| `<Header />` | LP共通ヘッダー | ロゴ、ナビ項目、背景色 |
| `<Footer />` | LP共通フッター | リンク一覧、会社情報 |
| `<CTASection />` | 行動喚起セクション | テキスト、ボタン色、電話番号 |
| `<CTAButton />` | CTAボタン | テキスト、色、リンク先 |
| `<ContactForm />` | Formspark連携フォーム | フィールド定義、フォームID |
| `<SwiperHero />` | Swiperヒーロースライダー | スライド画像、テキスト |
| `<TestimonialCard />` | お客様の声カード | 写真、名前、テキスト |
| `<BeforeAfter />` | ビフォーアフター | 2枚の画像 |
| `<FlowStep />` | ステップフロー | ステップ数、テキスト |
| `<FAQAccordion />` | FAQ折りたたみ | 質問・回答リスト |
| `<SEOHead />` | SEOメタデータ | title, description, OGP |
| `<PhoneButton />` | 電話発信ボタン（モバイル） | 電話番号 |

### デザインシステム（Tailwind Preset）

```ts
// packages/config/tailwind/index.ts
import type { Config } from 'tailwindcss';

export const link8Preset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        // LinKブランドカラー
        primary: {
          50:  '#f0f7ff',
          100: '#e0efff',
          500: '#3b82f6',  // メインブルー
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a5f',
        },
        accent: {
          500: '#f59e0b',  // アクセントオレンジ
          600: '#d97706',
        },
        cta: {
          DEFAULT: '#ef4444', // CTA赤
          hover:   '#dc2626',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
        heading: ['"Noto Sans JP"', 'sans-serif'],
      },
      fontSize: {
        'hero':    ['3rem',    { lineHeight: '1.2' }],
        'section': ['2rem',    { lineHeight: '1.3' }],
        'sub':     ['1.25rem', { lineHeight: '1.5' }],
      },
      borderRadius: {
        'cta': '9999px', // 丸いCTAボタン
      },
      boxShadow: {
        'cta': '0 4px 14px 0 rgba(239, 68, 68, 0.39)',
      },
    },
  },
};
```

### 各LPでの使用例

```tsx
// apps/restoration/src/app/page.tsx
import { Header, CTASection, ContactForm, Footer } from '@link8/ui';
import { GTMProvider } from '@link8/tracking';

export default function RestorationLP() {
  return (
    <GTMProvider containerId="GTM-XXXXXXX" lpName="restoration">
      <Header variant="lp" />
      {/* LP固有コンテンツ */}
      <CTASection
        title="まずは無料相談"
        phone="03-XXXX-XXXX"
        buttonText="お見積りはこちら"
      />
      <ContactForm
        formsparkId="FORM_ID_RESTORATION"
        lpSource="restoration"
      />
      <Footer />
    </GTMProvider>
  );
}
```

---

## 5. トラッキングアーキテクチャ

### 全体データフロー

```
[ユーザーアクション]
       │
       ▼
[GTM (dataLayer.push)]
       │
       ├──→ [GA4] ──→ [BigQuery Export] ──→ [Looker Studio]
       │
       ├──→ [Google Ads] (広告CV連携)
       │
       └──→ [Meta Pixel] (将来的)

[Formspark送信]
       │
       ├──→ [Webhook] ──→ [n8nまたはZapier]
       │                       │
       │                       ├──→ [Slack通知]
       │                       └──→ [スプレッドシート記録]
       │
       └──→ [メール通知]
```

### GTM設計

**コンテナ構成**: 1つのGTMコンテナを全LPで共有

| タグ | トリガー | 用途 |
|------|---------|------|
| GA4 Config | All Pages | 基本計測 |
| GA4 Event: form_submit | フォーム送信成功 | CV計測 |
| GA4 Event: cta_click | CTA要素クリック | エンゲージメント |
| GA4 Event: phone_tap | 電話ボタンタップ | 電話CV |
| GA4 Event: scroll_depth | スクロール25/50/75/100% | 読了率 |
| Google Ads CV | フォーム送信/電話タップ | 広告最適化 |

### UTMパラメータ設計

```
https://link-8.jp/lp/restoration?
  utm_source=google
  &utm_medium=cpc
  &utm_campaign=restoration_tokyo_2026q1
  &utm_content=ad_variant_a
  &utm_term=原状回復+東京
  &lp_source=restoration       ← カスタムパラメータ
  &lp_area=shibuya             ← エリアLP用
```

### packages/tracking 実装

```tsx
// packages/tracking/src/GTMProvider.tsx
'use client';
import Script from 'next/script';
import { createContext, useContext } from 'react';

type TrackingContextType = {
  lpName: string;
  trackEvent: (event: string, params?: Record<string, string>) => void;
};

const TrackingContext = createContext<TrackingContextType | null>(null);

export function GTMProvider({
  containerId,
  lpName,
  children,
}: {
  containerId: string;
  lpName: string;
  children: React.ReactNode;
}) {
  const trackEvent = (event: string, params?: Record<string, string>) => {
    window.dataLayer?.push({
      event,
      lp_source: lpName,
      ...params,
    });
  };

  return (
    <TrackingContext.Provider value={{ lpName, trackEvent }}>
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${containerId}');`,
        }}
      />
      {children}
    </TrackingContext.Provider>
  );
}

export const useTracking = () => {
  const ctx = useContext(TrackingContext);
  if (!ctx) throw new Error('useTracking must be used within GTMProvider');
  return ctx;
};
```

### BigQuery + Looker Studio

| 段階 | 内容 | コスト |
|------|------|-------|
| Phase 1 | GA4標準レポート + Looker StudioでGA4直接接続 | 無料 |
| Phase 2 | GA4 → BigQuery Export有効化 + カスタムSQL分析 | BigQuery無料枠内 |
| Phase 3 | Looker StudioでBigQuery接続 + カスタムダッシュボード | 無料 |

**Phase 1で十分運用可能。LP数が増えてから段階的にPhase 2-3へ移行。**

### ダッシュボード要件

```
LP パフォーマンスダッシュボード
├── 全体サマリー
│   ├── 総PV / ユニークユーザー数
│   ├── 総CV数（フォーム送信 + 電話タップ）
│   └── LP別CVR比較
│
├── LP別詳細
│   ├── 流入経路（organic / cpc / direct / referral）
│   ├── デバイス別（mobile / desktop）
│   ├── CVファネル（閲覧 → スクロール → CTA表示 → クリック → 送信）
│   └── 離脱ポイント
│
└── エリアLP分析
    ├── エリア別PV/CV
    ├── 高CVRエリアランキング
    └── 広告費対効果（CPAベース）
```

---

## 6. フォーム・通知システム

### 推奨: Formspark継続（+ hidden fieldによるLP識別）

**Formspark選択理由**:
- 既に導入済み（学習コストゼロ）
- フォーム毎にIDを分離可能
- Webhook + Slack連携対応
- サーバーレスで運用負荷なし

### LP識別の仕組み

```tsx
// packages/ui/src/ContactForm.tsx
export function ContactForm({
  formsparkId,
  lpSource,
  lpArea,
}: {
  formsparkId: string;
  lpSource: string;
  lpArea?: string;
}) {
  return (
    <form action={`https://submit-form.com/${formsparkId}`} method="POST">
      {/* LP元を自動判別するhiddenフィールド */}
      <input type="hidden" name="_lp_source" value={lpSource} />
      {lpArea && <input type="hidden" name="_lp_area" value={lpArea} />}
      <input type="hidden" name="_redirect" value="https://link-8.jp/lp/thanks" />

      {/* ユーザー入力フィールド */}
      <input name="company" placeholder="会社名" required />
      <input name="name" placeholder="お名前" required />
      <input name="email" type="email" placeholder="メールアドレス" required />
      <input name="phone" placeholder="電話番号" />
      <textarea name="message" placeholder="お問い合わせ内容" />

      <button type="submit">送信する</button>
    </form>
  );
}
```

### Formspark → Slack通知フロー

```
[フォーム送信]
    │
    ▼
[Formspark]
    │
    ├──→ [メール通知] → info@link-8.jp
    │     件名: 【{_lp_source}】新規お問い合わせ
    │
    └──→ [Webhook] → n8n (自前) or Zapier
              │
              ▼
         [Slack通知]
         #inquiries チャンネル
         ┌─────────────────────────────┐
         │ 新規お問い合わせ             │
         │ LP: 原状回復LP              │
         │ エリア: 渋谷区              │
         │ 会社: ○○不動産              │
         │ 名前: 山田太郎              │
         │ TEL: 03-xxxx-xxxx          │
         │ メール: xxx@example.com     │
         └─────────────────────────────┘
```

### Formspark ID管理

| LP | Formspark ID | メール通知先 |
|----|-------------|------------|
| 原状回復 | `FORM_RESTORATION` | info@link-8.jp |
| 求人 | `FORM_RECRUIT` | recruit@link-8.jp |
| 協力会社 | `FORM_PARTNER` | partner@link-8.jp |
| 太陽光 | `FORM_SOLAR` | info@link-8.jp |
| 導入事例 | `FORM_CASESTUDY` | info@link-8.jp |
| 大規模修繕 | `FORM_RENOVATION` | info@link-8.jp |
| エリアLP | `FORM_AREA` (共通) | info@link-8.jp |

---

## 7. エリア特化LP量産設計

### 概要

エリア特化LPは「○○区 原状回復」等のSEO/広告キーワードに対応するページを**テンプレート+データで大量生成**する。

### アーキテクチャ: generateStaticParams + SSG

```tsx
// apps/area/src/app/[city]/[service]/page.tsx
import { areas } from '@link8/data';
import { AreaLPTemplate } from './AreaLPTemplate';

// ビルド時に全エリアページを静的生成
export function generateStaticParams() {
  const params: { city: string; service: string }[] = [];

  for (const area of areas) {
    for (const service of area.services) {
      params.push({
        city: area.slug,        // "shibuya-ku"
        service: service.slug,  // "restoration"
      });
    }
  }

  return params;
}

// SEOメタデータも自動生成
export function generateMetadata({
  params,
}: {
  params: { city: string; service: string };
}) {
  const area = areas.find((a) => a.slug === params.city);
  const service = area?.services.find((s) => s.slug === params.service);

  return {
    title: `${area?.name}の${service?.name}なら株式会社LinK｜link-8.jp`,
    description: `${area?.name}で${service?.name}をお探しなら株式会社LinKにお任せください。${area?.description}`,
    openGraph: {
      title: `${area?.name}の${service?.name}｜株式会社LinK`,
      description: `${area?.name}エリア対応。迅速・丁寧な${service?.name}サービス。`,
    },
  };
}

export default function AreaServicePage({
  params,
}: {
  params: { city: string; service: string };
}) {
  const area = areas.find((a) => a.slug === params.city);
  const service = area?.services.find((s) => s.slug === params.service);

  return <AreaLPTemplate area={area} service={service} />;
}
```

### エリアデータ構造

```ts
// packages/data/src/areas.ts
export interface AreaData {
  slug: string;          // URL用スラッグ
  name: string;          // 表示名
  prefecture: string;    // 都道府県
  description: string;   // エリア説明文
  population?: number;   // 人口（参考）
  propertyCount?: string; // 賃貸物件数目安
  features: string[];    // エリア特性
  services: ServiceData[];
}

export interface ServiceData {
  slug: string;
  name: string;
  description: string;
  priceRange?: string;
}

export const areas: AreaData[] = [
  {
    slug: 'shibuya-ku',
    name: '渋谷区',
    prefecture: '東京都',
    description: '渋谷区は賃貸マンション・オフィスビルが密集するエリアです。',
    population: 243000,
    propertyCount: '約15,000戸',
    features: ['高級賃貸マンション多数', 'オフィスビル原状回復需要高', '外国人入居者多い'],
    services: [
      {
        slug: 'restoration',
        name: '原状回復',
        description: '渋谷区の賃貸物件の原状回復工事',
        priceRange: '5万円〜',
      },
      {
        slug: 'reform',
        name: 'リフォーム',
        description: '渋谷区の賃貸物件のリフォーム',
        priceRange: '30万円〜',
      },
    ],
  },
  {
    slug: 'shinjuku-ku',
    name: '新宿区',
    prefecture: '東京都',
    description: '新宿区は都内最大級の賃貸市場を持つエリアです。',
    population: 349000,
    propertyCount: '約20,000戸',
    features: ['賃貸物件数都内トップクラス', '管理会社集中エリア', '多様な物件タイプ'],
    services: [
      {
        slug: 'restoration',
        name: '原状回復',
        description: '新宿区の賃貸物件の原状回復工事',
        priceRange: '5万円〜',
      },
    ],
  },
  // ... 東京23区 + 主要エリアで50-100ページ
];
```

### 量産効率

| 操作 | 所要時間 | 生成ページ数 |
|------|---------|------------|
| エリアデータ1件追加 | 5分 | サービス数分（2-3ページ） |
| 東京23区一括追加 | 1時間 | 46-69ページ |
| ビルド（Vercel） | 2-3分 | 全ページ再生成 |
| 新サービス追加 | 10分 | 全エリア分自動生成 |

### SEO施策

- **構造化データ**: LocalBusiness schema自動挿入
- **サイトマップ**: `generateStaticParams` のデータから自動生成
- **内部リンク**: エリアLP間の相互リンク自動構築
- **canonical URL**: 重複回避のためcanonical設定

---

## 8. デプロイ・運用

### Vercelプロジェクト構成

| Vercelプロジェクト | リポ内パス | ドメイン | Root Directory |
|-------------------|----------|---------|---------------|
| link-8-site | 別リポ（既存） | link-8.jp | / |
| link8-lp-restoration | apps/restoration | (内部) | apps/restoration |
| link8-lp-recruit | apps/recruit | (内部) | apps/recruit |
| link8-lp-partner | apps/partner | (内部) | apps/partner |
| link8-lp-solar | apps/solar | (内部) | apps/solar |
| link8-lp-casestudy | apps/casestudy | (内部) | apps/casestudy |
| link8-lp-renovation | apps/renovation | (内部) | apps/renovation |
| link8-lp-area | apps/area | (内部) | apps/area |

各LPアプリはVercel上で独立プロジェクトとしてデプロイされ、link-8-site側のrewritesで `link-8.jp/lp/xxx` にマッピングされる。

### 環境変数管理

```
# 全プロジェクト共通（Vercel環境変数）
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://link-8.jp
FORMSPARK_WEBHOOK_URL=https://hooks.slack.com/...

# LP個別
NEXT_PUBLIC_LP_NAME=restoration
NEXT_PUBLIC_FORMSPARK_ID=xxxx
```

### CI/CD

Turborepo + Vercelの自動検知により、基本的にGitHub Actionsは不要。

- **push to main** → Vercelが変更のあったアプリのみ自動ビルド・デプロイ
- **PR作成** → 各アプリのプレビューデプロイ自動生成
- **Turborepo Remote Cache** → ビルド高速化

必要に応じて追加するCI:

```yaml
# .github/workflows/ci.yml
name: CI
on: [pull_request]
jobs:
  lint-and-type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm turbo lint
      - run: pnpm turbo build  # 型チェック含む
```

---

## 技術スタック一覧

| カテゴリ | 技術 | 理由 |
|---------|------|------|
| フレームワーク | Next.js 14 (App Router) | 既存と統一、SSG/ISR対応、Vercel最適化 |
| モノレポ | Turborepo + pnpm | Vercel公式推奨、Remote Cache、差分ビルド |
| スタイリング | Tailwind CSS 3.4 | 既存と統一、ユーティリティファースト |
| スライダー | Swiper.js 12 | 既存と統一、モバイル対応 |
| フォーム | Formspark | 既存継続、Webhook対応、サーバーレス |
| アナリティクス | GA4 + GTM | 業界標準、BigQuery連携、無料 |
| ヒートマップ | Microsoft Clarity | 既存継続、無料、GTM経由 |
| ダッシュボード | Looker Studio | GA4直結、無料、共有容易 |
| データ集約 | BigQuery（Phase 2） | GA4自動エクスポート、SQL分析 |
| 通知 | Slack (Webhook) | 既存ワークフロー、リアルタイム |
| ワークフロー | n8n（自前） | Formspark Webhook受信→Slack/記録 |
| ホスティング | Vercel | 既存、自動デプロイ、プレビュー |
| バージョン管理 | GitHub | 既存、Vercel連携済み |
| DNS | Vercel DNS | 既存、link-8.jp管理 |
| TypeScript | 5.x | 型安全、共通パッケージの型共有 |

---

## 実装優先順位

| Phase | やること | 期間目安 | 依存関係 |
|-------|---------|---------|---------|
| **Phase 0** | モノレポ基盤構築 | 1-2日 | なし |
| | Turborepo + pnpm workspace初期化 | | |
| | packages/ui, tracking, config, data 空パッケージ作成 | | |
| | turbo.json, pnpm-workspace.yaml 設定 | | |
| **Phase 1** | 既存LP移行 + 共通化 | 2-3日 | Phase 0 |
| | 既存 restoration LP を apps/restoration に移行 | | |
| | 共通コンポーネント抽出 → packages/ui | | |
| | Tailwind preset作成 → packages/config | | |
| | GTMProvider作成 → packages/tracking | | |
| **Phase 2** | ルーティング設定 | 1日 | Phase 1 |
| | link-8-site に rewrites 追加 | | |
| | basePath設定・動作確認 | | |
| | 本番ドメインでの疎通テスト | | |
| **Phase 3** | 高優先度LP構築 | 各LP 2-3日 | Phase 1 |
| | 求人LP（recruit） | | |
| | 協力会社LP（partner） | | |
| | 太陽光LP（solar） | | |
| **Phase 4** | エリアLP量産基盤 | 2-3日 | Phase 1 |
| | area アプリ作成 | | |
| | generateStaticParams + テンプレート | | |
| | エリアデータ投入（東京23区） | | |
| | SEO設定（構造化データ、サイトマップ） | | |
| **Phase 5** | 中優先度LP構築 | 各LP 2-3日 | Phase 1 |
| | 導入事例LP（casestudy） | | |
| | 大規模修繕LP（renovation） | | |
| **Phase 6** | トラッキング高度化 | 2-3日 | Phase 3以降 |
| | BigQuery Export設定 | | |
| | Looker Studioダッシュボード構築 | | |
| | UTMパラメータ体系整備 | | |

### MVP（最小実行可能版）

**Phase 0 + Phase 1 + Phase 2 で「モノレポ基盤+既存LP移行+ルーティング」が完成。**
ここまでで約1週間。以降は各LPを並行して構築可能。

---

## リスクと対策

| リスク | 影響度 | 対策 |
|-------|-------|------|
| モノレポ移行でビルド不安定 | 高 | 既存LPは移行前にバックアップ。段階的移行 |
| Vercel rewritesのレイテンシ | 中 | Multi-Zones方式で最適化。Vercel Edge Network が吸収 |
| エリアLP量産でビルド時間増大 | 中 | ISR活用で初回ビルド後はオンデマンド再生成 |
| Formspark従量課金 | 低 | 月間送信数を監視。超過前にアラート設定 |
| デザイン一貫性の乖離 | 中 | Tailwind preset + Storybookで視覚的に確認 |

---

## 付録: 技術判断の根拠

### なぜTurborepoか（vs Nx, Lerna）
- Vercelが開発・公式推奨
- Remote Cacheが標準搭載
- Vercelデプロイとのネイティブ統合
- 設定がシンプル（Nxより学習コスト低）

### なぜpnpmか（vs npm, yarn）
- ディスク効率（ハードリンク）
- workspace機能が堅牢
- Turborepoとの相性が公式で最も検証済み
- phantom dependencyの防止

### なぜサブディレクトリか（vs サブドメイン）
- SEOドメインオーソリティの集約（最重要）
- クロスドメイントラッキング不要
- SSL/DNS追加設定不要
- Googleの公式見解: 「サブディレクトリを推奨」（2024年John Mueller発言）
