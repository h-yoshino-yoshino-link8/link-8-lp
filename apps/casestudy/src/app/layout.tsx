import type { Metadata } from "next";
import "@link8/ui/globals.css";

export const metadata: Metadata = {
  title: "導入事例｜管理会社の原状回復が変わった理由｜株式会社LinK",
  description:
    "導入企業の声と数値で見る、LinKの原状回復サービス。コスト削減20%、対応スピード3倍。まずは1件のお試し工事から。",
  openGraph: {
    title: "導入事例｜管理会社の原状回復が変わった理由｜株式会社LinK",
    description:
      "導入企業の声と数値で見る、LinKの原状回復。コスト削減・対応スピード向上の実績。",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
