import type { Metadata } from "next";
import "@link8/ui/globals.css";

export const metadata: Metadata = {
  title: "エリア対応一覧｜原状回復・リフォーム｜株式会社LinK",
  description:
    "東京都内各区に対応。原状回復・リフォームのご相談は株式会社LinKへ。内訳付き見積・中間搾取なし・写真付き進捗報告。",
  openGraph: {
    title: "エリア対応一覧｜株式会社LinK",
    description:
      "東京都内各区の原状回復・リフォーム対応。60社以上の専門家ネットワークでサポート。",
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
