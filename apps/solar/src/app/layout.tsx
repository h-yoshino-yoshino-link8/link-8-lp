import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export const metadata: Metadata = {
  title: "スレート屋根でも太陽光｜超軽量3.7kgパネル｜株式会社LinK",
  description:
    "スレート屋根で太陽光を断られた工場オーナー様へ。1枚3.7kgの超軽量パネル「ペラペラ太陽光」なら設置可能。建設業許可を持つLinKが屋根補強から設置まで一括対応。電気代最大50%削減。無料Zoom相談受付中。",
  openGraph: {
    title: "スレート屋根でも太陽光｜超軽量3.7kgパネル｜株式会社LinK",
    description:
      "断られた屋根に、載る。従来の1/5の重さ、1枚3.7kgの超軽量太陽光パネル。建設業許可を持つLinKが屋根補強+太陽光を一括対応。",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
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
