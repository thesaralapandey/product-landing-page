"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const META_PIXEL_ID = "2039810936608961";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function MetaPixel() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || lastTrackedPath.current === pathname) {
      return;
    }

    let cancelled = false;
    let attempts = 0;

    const trackPageView = () => {
      if (cancelled || lastTrackedPath.current === pathname) {
        return;
      }

      if (window.fbq) {
        window.fbq("track", "PageView");
        lastTrackedPath.current = pathname;
        return;
      }

      attempts += 1;

      if (attempts < 20) {
        window.setTimeout(trackPageView, 250);
      }
    };

    trackPageView();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return (
    <>
      <Script id="facebook-meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');`}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
