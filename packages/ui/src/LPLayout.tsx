import type { Metadata } from "next";

interface LPLayoutProps {
  children: React.ReactNode;
}

export function LPLayout({ children }: LPLayoutProps) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}

export function createLPMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "ja_JP",
      url: `https://link-8.jp${path}`,
    },
  };
}
