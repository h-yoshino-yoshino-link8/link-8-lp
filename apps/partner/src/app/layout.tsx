import type { Metadata } from "next";
import "@link8/ui/globals.css";

export const metadata: Metadata = {
  title: "協力会社募集｜共に成長するパートナーへ｜株式会社LinK",
  description:
    "60社以上のネットワークに参画しませんか。安定した案件数・翌月末払い・共に成長する仕組み。関東一都三県の原状回復・リフォーム工事パートナー募集。",
  openGraph: {
    title: "協力会社募集｜共に成長するパートナーへ｜株式会社LinK",
    description:
      "安定した案件数・翌月末払い・共に成長する仕組み。関東一都三県の原状回復・リフォーム工事パートナー募集。",
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
