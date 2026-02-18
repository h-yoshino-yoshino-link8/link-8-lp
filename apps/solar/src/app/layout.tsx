import type { Metadata } from "next";
import "@link8/ui/globals.css";

export const metadata: Metadata = {
  title: "賃貸物件の太陽光パネル設置｜無料屋根診断｜株式会社LinK",
  description:
    "賃貸物件オーナー・管理会社向け太陽光パネル設置。初期費用回収シミュレーション・ワンストップ対応・入居者満足度向上。まずは無料の屋根診断から。",
  openGraph: {
    title: "賃貸物件の太陽光パネル設置｜無料屋根診断｜株式会社LinK",
    description:
      "太陽光パネル設置で屋根を収益化。診断から設置、アフターサポートまでワンストップ。",
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
