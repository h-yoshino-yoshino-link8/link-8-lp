import { company } from "@link8/data";

export function Footer({ hpUrl }: { hpUrl?: string }) {
  const url = hpUrl || company.hpUrl;
  return (
    <footer className="bg-link-dark text-white/60 py-8 px-4">
      <div className="max-w-md mx-auto text-center space-y-3">
        <p className="text-white font-bold text-sm">{company.name}</p>
        <p className="text-xs">TEL: {company.phone}</p>
        <div className="flex justify-center gap-3 text-xs">
          {company.badges.map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
        <div className="pt-3 border-t border-white/10">
          <a
            href={url}
            className="text-white/50 hover:text-white/80 text-xs underline underline-offset-4 transition-colors"
          >
            {company.name} 公式サイト
          </a>
        </div>
      </div>
    </footer>
  );
}
