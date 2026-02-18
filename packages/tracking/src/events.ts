type EventParams = Record<string, string | number | boolean>;

export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({ event: eventName, ...params });
  }
}

export function trackSlideView(slideIndex: number) {
  trackEvent("slide_view", { slide: slideIndex + 1 });
}

export function trackCtaClick(label: string) {
  trackEvent("cta_click", { label });
}

export function trackTelClick() {
  trackEvent("phone_click", { link_url: "tel:0368252464" });
}

export function trackFormSubmit(lpSource: string) {
  trackEvent("form_submit", { form_type: "contact", lp_source: lpSource });
}
