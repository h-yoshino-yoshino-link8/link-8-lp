// A/Bテスト: モバイルLP表示形式
// Variant A: "swipe" = 横スワイプ（Swiper）
// Variant B: "scroll" = 縦スクロール（通常スクロール）

export type ABVariant = "swipe" | "scroll";

const COOKIE_NAME = "lp_ab_variant";
const COOKIE_DAYS = 30;

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

export function getVariant(): ABVariant {
  const existing = getCookie(COOKIE_NAME);
  if (existing === "swipe" || existing === "scroll") return existing;

  // 50/50ランダム振り分け
  const variant: ABVariant = Math.random() < 0.5 ? "swipe" : "scroll";
  setCookie(COOKIE_NAME, variant, COOKIE_DAYS);
  return variant;
}

// URLパラメータで強制指定（デバッグ用: ?variant=swipe or ?variant=scroll）
export function getVariantWithOverride(): ABVariant {
  if (typeof window === "undefined") return "swipe";

  const params = new URLSearchParams(window.location.search);
  const override = params.get("variant");
  if (override === "swipe" || override === "scroll") {
    setCookie(COOKIE_NAME, override, COOKIE_DAYS);
    return override;
  }

  return getVariant();
}
