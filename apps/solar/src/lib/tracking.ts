// GA4 イベント送信ユーティリティ（A/Bテスト対応・ソーラーLP専用）
import type { ABVariant } from "./ab-test";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

type EventParams = Record<string, string | number | boolean>;

let _currentVariant: ABVariant | null = null;

export function setTrackingVariant(variant: ABVariant) {
  _currentVariant = variant;
}

export function sendEvent(eventName: string, params?: EventParams) {
  if (typeof window === "undefined") return;

  const enriched: EventParams = {
    ...params,
    ...(_currentVariant ? { ab_variant: _currentVariant } : {}),
  };

  if (window.gtag) {
    window.gtag("event", eventName, enriched);
  }

  if (window.dataLayer) {
    window.dataLayer.push({ event: eventName, ...enriched });
  }
}

export function trackSlideView(slideIndex: number) {
  sendEvent("slide_view", { slide: slideIndex + 1 });
}

export function trackCtaClick(label: string) {
  sendEvent("cta_click", { label, page: "lp_solar" });
}

export function trackTelClick() {
  sendEvent("tel_click", { placement: "lp_solar" });
}

export function trackFormStart() {
  sendEvent("form_start", { channel: "lp_solar" });
}

export function trackFormSubmit() {
  sendEvent("form_submit", { channel: "lp_solar" });
}

export function trackFormAbandon() {
  sendEvent("form_abandon", { channel: "lp_solar" });
}

export function trackScrollDepth(percent: number) {
  sendEvent("scroll_depth", { percent, page: "lp_solar" });
}

export function trackSectionView(section: string) {
  sendEvent("section_view", { section, page: "lp_solar" });
}

export function trackVariantAssigned(variant: ABVariant, isNew: boolean) {
  sendEvent("ab_variant_assigned", {
    ab_variant: variant,
    is_new_user: isNew,
  });
}
