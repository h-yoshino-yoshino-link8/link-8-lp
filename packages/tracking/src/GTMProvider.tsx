"use client";

import Script from "next/script";
import { createContext, useContext, useCallback } from "react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

type TrackingContextType = {
  lpName: string;
  trackEvent: (event: string, params?: Record<string, string>) => void;
};

const TrackingContext = createContext<TrackingContextType | null>(null);

export function GTMProvider({
  gtmId,
  lpName,
  children,
}: {
  gtmId?: string;
  lpName: string;
  children: React.ReactNode;
}) {
  const trackEvent = useCallback(
    (event: string, params?: Record<string, string>) => {
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event,
          lp_source: lpName,
          ...params,
        });
      }
    },
    [lpName]
  );

  return (
    <TrackingContext.Provider value={{ lpName, trackEvent }}>
      {gtmId && (
        <>
          <Script
            id="gtm"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}
      {children}
    </TrackingContext.Provider>
  );
}

export function useTracking() {
  const ctx = useContext(TrackingContext);
  if (!ctx) throw new Error("useTracking must be used within GTMProvider");
  return ctx;
}
