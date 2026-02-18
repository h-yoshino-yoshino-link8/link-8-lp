export interface LPConfig {
  slug: string;
  name: string;
  headline: string;
  subCopy: string;
  ctaText: string;
  ctaSubText?: string;
  basePath: string;
  formsparkId?: string;
}

export const lpConfig: Record<string, LPConfig> = {
  restoration: {
    slug: "restoration",
    name: "原状回復LP",
    headline: "原状回復を、整える。",
    subCopy: "60社以上の専門家ネットワークで、見積から施工まで丸ごとサポート。",
    ctaText: "まずは無料で相談する",
    ctaSubText: "見積りまで完全無料",
    basePath: "/lp/restoration",
  },
  recruit: {
    slug: "recruit",
    name: "求人LP",
    headline: "建設業界を、整える側へ。",
    subCopy: "設立3年。60社以上の専門家ネットワークで原状回復を変える。まだ少数精鋭だから、あなたの力が直接会社を動かす。",
    ctaText: "応募する",
    ctaSubText: "まずは話を聞いてみる",
    basePath: "/lp/recruit",
  },
  partner: {
    slug: "partner",
    name: "協力会社募集LP",
    headline: "共に成長する、パートナーへ。",
    subCopy: "60社以上の専門家が集うLinKネットワーク。安定した案件数と明瞭な支払い条件で、あなたの技術を活かせる場所。",
    ctaText: "パートナー登録する",
    ctaSubText: "まずは話を聞く",
    basePath: "/lp/partner",
  },
  solar: {
    slug: "solar",
    name: "太陽光LP",
    headline: "屋根が、収益を生む。",
    subCopy: "原状回復で培った60社以上のネットワークで、太陽光設置もワンストップ。",
    ctaText: "無料で屋根診断する",
    ctaSubText: "診断は完全無料。設置の義務はありません",
    basePath: "/lp/solar",
  },
  casestudy: {
    slug: "casestudy",
    name: "導入事例LP",
    headline: "他社はこう使っています。",
    subCopy: "導入企業の声と数値で見る、LinKの原状回復。まずは1件のお試し工事から。",
    ctaText: "まずは1件、試してみる",
    ctaSubText: "事例集PDFを無料でもらう",
    basePath: "/lp/casestudy",
  },
  renovation: {
    slug: "renovation",
    name: "大規模修繕LP",
    headline: "建物の未来を、整える。",
    subCopy: "60社以上の専門家ネットワークで、大規模修繕もワンストップ。",
    ctaText: "無料の建物診断を申し込む",
    ctaSubText: "まずは無料の建物診断から",
    basePath: "/lp/renovation",
  },
};
