// GA4 イベント送信ユーティリティ（A/Bテスト対応）
import type { ABVariant } from "./ab-test";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

type EventParams = Record<string, string | number | boolean>;

// 現在のA/Bバリアントを全イベントに自動付与
let _currentVariant: ABVariant | null = null;

export function setTrackingVariant(variant: ABVariant) {
  _currentVariant = variant;
}

export function sendEvent(eventName: string, params?: EventParams) {
  if (typeof window === "undefined") return;

  const enriched: EventParams = {
    ...params,
    ..._currentVariant ? { ab_variant: _currentVariant } : {},
  };

  // gtag（GA4直接）
  if (window.gtag) {
    window.gtag("event", eventName, enriched);
  }

  // dataLayer（GTM経由）
  if (window.dataLayer) {
    window.dataLayer.push({ event: eventName, ...enriched });
  }
}

export function trackSlideView(slideIndex: number) {
  sendEvent("slide_view", { slide: slideIndex + 1 });
}

export function trackCtaClick(label: string) {
  sendEvent("cta_click", { label, page: "lp" });
}

export function trackTelClick() {
  sendEvent("tel_click", { placement: "lp" });
}

export function trackFormSubmit() {
  sendEvent("form_submit", { channel: "lp_construction" });
}

// A/Bテスト: バリアント割り当てイベント（セッション開始時に1回）
export function trackVariantAssigned(variant: ABVariant, isNew: boolean) {
  sendEvent("ab_variant_assigned", {
    ab_variant: variant,
    is_new_user: isNew,
  });
}
