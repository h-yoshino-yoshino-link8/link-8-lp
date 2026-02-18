import Link from "next/link";
import { areas, company } from "@link8/data";

export default function AreaIndexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-link-navy via-[#1e3a5f] to-link-dark">
      {/* Header */}
      <header className="pt-12 pb-8 px-4 text-center">
        <p className="text-white/60 text-sm tracking-[0.3em] mb-3">
          {company.name}
        </p>
        <h1 className="text-white text-3xl sm:text-4xl font-bold mb-3">
          対応エリア一覧
        </h1>
        <p className="text-white/70 text-base max-w-md mx-auto">
          東京都内の各区で原状回復・リフォームに対応しています。
          <br />
          エリアを選んで詳細をご覧ください。
        </p>
      </header>

      {/* Area Grid */}
      <main className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {areas.map((area) => (
            <div
              key={area.slug}
              className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-5 hover:bg-white/15 transition-colors"
            >
              <h2 className="text-white text-xl font-bold mb-2">
                {area.prefecture}
                {area.name}
              </h2>
              <p className="text-white/60 text-sm mb-4 line-clamp-2">
                {area.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {area.features.map((f) => (
                  <span
                    key={f}
                    className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded-full"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                {area.services.map((svc) => (
                  <Link
                    key={svc.slug}
                    href={`/${area.slug}/${svc.slug}`}
                    className="flex-1 text-center bg-link-orange hover:bg-accent-600 text-white text-sm font-bold py-2 px-3 rounded-lg transition-colors"
                  >
                    {svc.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <p className="text-white/50 text-sm mb-4">
            対応エリア外の方もお気軽にご相談ください（関東一都三県対応）
          </p>
          <a
            href={`${company.hpUrl}/contact/construction`}
            className="inline-block bg-link-orange hover:bg-accent-600 text-white font-bold text-lg py-4 px-8 rounded-full transition-colors"
          >
            無料で工事を相談する
          </a>
          <div className="mt-4">
            <a
              href={company.phoneHref}
              className="text-white/70 hover:text-white text-sm underline underline-offset-4"
            >
              お電話: {company.phone}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
