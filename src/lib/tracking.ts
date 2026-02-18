// GA4 イベント送信ユーティリティ
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

type EventParams = Record<string, string | number | boolean>;

export function sendEvent(eventName: string, params?: EventParams) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
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
