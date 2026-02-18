import type { Metadata } from "next";
import "@link8/ui/globals.css";

export const metadata: Metadata = {
  title: "原状回復を、整える。｜株式会社LinK",
  description:
    "内訳付き見積・中間搾取なし・写真付き進捗報告。60社以上の専門家ネットワークで、賃貸管理会社の原状回復を丸ごとサポート。まずは無料相談。",
  openGraph: {
    title: "原状回復を、整える。｜株式会社LinK",
    description:
      "内訳付き見積・中間搾取なし・写真付き進捗報告。60社以上の専門家ネットワークで原状回復をまるごとサポート。",
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
