import type { Metadata } from "next";
import "@link8/ui/globals.css";

export const metadata: Metadata = {
  title: "建設業界を、整える側へ。｜採用情報｜株式会社LinK",
  description:
    "少数精鋭×60社+ネットワークで建設業界を変える仲間を募集。施工管理・現場職人・事務スタッフ。裁量の大きい環境でDX推進に挑戦。",
  openGraph: {
    title: "建設業界を、整える側へ。｜採用情報｜株式会社LinK",
    description:
      "少数精鋭×60社+ネットワークで建設業界を変える仲間を募集。裁量の大きい環境でDX推進に挑戦。",
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
