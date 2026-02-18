export interface ServiceData {
  slug: string;
  name: string;
  description: string;
}

export interface AreaData {
  slug: string;
  name: string;
  prefecture: string;
  description: string;
  features: string[];
  services: ServiceData[];
}

const defaultServices: ServiceData[] = [
  { slug: "restoration", name: "原状回復", description: "賃貸物件の原状回復工事" },
  { slug: "reform", name: "リフォーム", description: "賃貸物件のリフォーム工事" },
];

export const areas: AreaData[] = [
  {
    slug: "setagaya",
    name: "世田谷区",
    prefecture: "東京都",
    description: "世田谷区は都内最大の人口を擁し、ファミリー向け賃貸マンションが豊富なエリアです。退去時の原状回復需要が非常に高い地域です。",
    features: ["ファミリー向け賃貸が多い", "管理会社が集中", "退去シーズンの需要が高い"],
    services: defaultServices,
  },
  {
    slug: "shinjuku",
    name: "新宿区",
    prefecture: "東京都",
    description: "新宿区は都内最大級の賃貸市場を持ち、単身者向けからオフィスまで多様な物件タイプが存在するエリアです。",
    features: ["賃貸物件数都内トップクラス", "管理会社集中エリア", "多様な物件タイプ"],
    services: defaultServices,
  },
  {
    slug: "minato",
    name: "港区",
    prefecture: "東京都",
    description: "港区は高級賃貸マンション・外資系企業のオフィスが集中し、高品質な原状回復が求められるエリアです。",
    features: ["高級賃貸マンション多数", "外国人入居者が多い", "高品質仕上げの需要"],
    services: defaultServices,
  },
  {
    slug: "shibuya",
    name: "渋谷区",
    prefecture: "東京都",
    description: "渋谷区は賃貸マンション・オフィスビルが密集し、デザイン性の高い原状回復が求められるエリアです。",
    features: ["デザイナーズ物件が多い", "オフィスビル原状回復需要", "スピード対応の需要"],
    services: defaultServices,
  },
  {
    slug: "ota",
    name: "大田区",
    prefecture: "東京都",
    description: "大田区は都内有数の広さを持ち、蒲田・大森エリアを中心に単身・ファミリー向け賃貸が多いエリアです。",
    features: ["広いエリアに物件が分散", "単身・ファミリー混在", "コストパフォーマンス重視"],
    services: defaultServices,
  },
  {
    slug: "itabashi",
    name: "板橋区",
    prefecture: "東京都",
    description: "板橋区は都心へのアクセスが良く、ファミリー向け賃貸マンションが多い住宅エリアです。",
    features: ["ファミリー層中心", "賃料がリーズナブル", "大型団地の修繕需要"],
    services: defaultServices,
  },
  {
    slug: "nerima",
    name: "練馬区",
    prefecture: "東京都",
    description: "練馬区は緑豊かな住宅地で、ファミリー向けの賃貸アパート・マンションが多いエリアです。",
    features: ["閑静な住宅街", "アパートが多い", "長期居住者の退去対応"],
    services: defaultServices,
  },
  {
    slug: "suginami",
    name: "杉並区",
    prefecture: "東京都",
    description: "杉並区は住宅地として人気が高く、単身者からファミリーまで幅広い賃貸需要があるエリアです。",
    features: ["人気の住宅エリア", "駅周辺に賃貸集中", "品質重視の管理会社が多い"],
    services: defaultServices,
  },
  {
    slug: "koto",
    name: "江東区",
    prefecture: "東京都",
    description: "江東区は湾岸エリアのタワーマンションから下町の賃貸まで、多様な物件が存在するエリアです。",
    features: ["タワーマンション需要", "再開発エリア", "新築・築浅物件が増加中"],
    services: defaultServices,
  },
  {
    slug: "nakano",
    name: "中野区",
    prefecture: "東京都",
    description: "中野区は新宿に近接し、単身者向けの賃貸マンション・アパートが多い人気のエリアです。",
    features: ["単身者向け物件が中心", "入退去の回転が速い", "コンパクトな原状回復が多い"],
    services: defaultServices,
  },
];
