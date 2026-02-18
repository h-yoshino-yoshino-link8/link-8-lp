import type { Metadata } from "next";
import Script from "next/script";
import "@link8/ui/globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export const metadata: Metadata = {
  title: "原状回復を、整える。｜株式会社LinK",
  description:
    "内訳付き見積・中間搾取なし・写真付き進捗報告。60社以上の専門家ネットワークで、賃貸管理会社の原状回復を丸ごとサポート。まずは無料相談。",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "原状回復を、整える。｜株式会社LinK",
    description:
      "内訳付き見積・中間搾取なし・写真付き進捗報告。60社以上の専門家ネットワークで原状回復をまるごとサポート。",
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "株式会社LinK｜原状回復を、整える。",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "原状回復を、整える。｜株式会社LinK",
    description:
      "内訳付き見積・中間搾取なし・写真付き進捗報告。60社以上の専門家ネットワークで原状回復をまるごとサポート。",
    images: ["/og-image.svg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeImprovementBusiness",
  name: "株式会社LinK",
  alternateName: "LinK Inc.",
  url: "https://link-8.jp",
  telephone: "03-6825-2464",
  email: "info@link-8.jp",
  address: {
    "@type": "PostalAddress",
    postalCode: "134-0081",
    addressRegion: "東京都",
    addressLocality: "江戸川区",
    streetAddress: "北葛西1丁目2番22号",
    addressCountry: "JP",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.6684,
    longitude: 139.8658,
  },
  openingHours: "Mo-Sa 09:00-18:00",
  areaServed: [
    { "@type": "State", name: "東京都" },
    { "@type": "State", name: "千葉県" },
    { "@type": "State", name: "埼玉県" },
    { "@type": "State", name: "神奈川県" },
  ],
  description:
    "原状回復を、整える。60社以上の専門家と管理会社をつなぎ、任せきれる原状回復を届ける。",
  founder: { "@type": "Person", name: "吉野 博" },
  foundingDate: "2023-06",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 2 },
  slogan: "つなぐ、整える。",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        {CLARITY_ID && (
          <Script id="clarity-init" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${CLARITY_ID}");`}
          </Script>
        )}
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
