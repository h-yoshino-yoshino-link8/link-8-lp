import type { Metadata } from "next";
import "@link8/ui/globals.css";

export const metadata: Metadata = {
  title: "大規模修繕をワンストップで｜無料建物診断｜株式会社LinK",
  description:
    "外壁塗装・防水・設備更新・共用部改修をワンストップで対応。内訳付き見積と工程管理の可視化で、大規模修繕の不安を解消します。まずは無料の建物診断から。",
  openGraph: {
    title: "大規模修繕をワンストップで｜無料建物診断｜株式会社LinK",
    description:
      "複数工種のワンストップ対応・内訳付き見積・工程管理の可視化。大規模修繕の不安を解消。",
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
