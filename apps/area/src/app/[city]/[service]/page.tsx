import { Metadata } from "next";
import { notFound } from "next/navigation";
import { areas, company } from "@link8/data";
import AreaLPTemplate from "@/components/AreaLPTemplate";

interface PageProps {
  params: { city: string; service: string };
}

export function generateStaticParams() {
  const params: { city: string; service: string }[] = [];
  for (const area of areas) {
    for (const svc of area.services) {
      params.push({ city: area.slug, service: svc.slug });
    }
  }
  return params;
}

export function generateMetadata({ params }: PageProps): Metadata {
  const area = areas.find((a) => a.slug === params.city);
  const service = area?.services.find((s) => s.slug === params.service);

  if (!area || !service) {
    return { title: "ページが見つかりません" };
  }

  const title = `${area.prefecture}${area.name}の${service.name}｜${company.name}`;
  const description = `${area.name}の${service.name}なら${company.name}。内訳付き見積・中間搾取なし・写真付き進捗報告。${company.network}の専門家ネットワークで${area.name}エリアの${service.name}をまるごとサポート。`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "ja_JP",
    },
  };
}

export default function AreaServicePage({ params }: PageProps) {
  const area = areas.find((a) => a.slug === params.city);
  const service = area?.services.find((s) => s.slug === params.service);

  if (!area || !service) {
    notFound();
  }

  return <AreaLPTemplate area={area} service={service} />;
}
