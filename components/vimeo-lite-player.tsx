"use client";

import { useMemo, useRef, useState } from "react";

const VIMEO_VIDEO_ID = "1199033004";

export function VimeoLitePlayer() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoSrc = useMemo(() => {
    const params = new URLSearchParams({
      api: "1",
      badge: "0",
      byline: "0",
      controls: "0",
      dnt: "1",
      portrait: "0",
      title: "0",
      transparent: "0",
    });

    return `https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?${params.toString()}`;
  }, []);

  const sendVimeoCommand = (method: "play" | "pause") => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ method }),
      "https://player.vimeo.com",
    );
    setIsPlaying(method === "play");
  };

  return (
    <div className="mx-auto mt-10 w-full max-w-[390px] rounded-[2.25rem] border border-white/80 bg-white p-3 shadow-[var(--shadow-strong)]">
      <div className="group relative aspect-[238/426] w-full overflow-hidden rounded-[1.75rem] bg-[var(--brand-navy)]">
        <iframe
          ref={iframeRef}
          src={videoSrc}
          title="Marketing Uplift consultation next steps video"
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
        />

        {!isPlaying ? (
          <button
            type="button"
            onClick={() => sendVimeoCommand("play")}
            className="absolute inset-0 flex items-center justify-center bg-[rgba(18,48,77,0.2)] text-white transition hover:bg-[rgba(18,48,77,0.1)]"
            aria-label="Play video"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-green))] pl-1 shadow-[0_22px_50px_rgba(46,165,242,0.34)] transition-transform duration-200 hover:scale-105 sm:h-24 sm:w-24">
              <span className="h-0 w-0 border-y-[14px] border-l-[22px] border-y-transparent border-l-white sm:border-y-[17px] sm:border-l-[27px]" />
            </span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => sendVimeoCommand("pause")}
            className="absolute inset-0 flex items-center justify-center bg-transparent opacity-0 transition duration-200 group-hover:bg-[rgba(18,48,77,0.16)] group-hover:opacity-100"
            aria-label="Pause video"
          >
            <span className="flex h-20 w-20 items-center justify-center gap-2 rounded-full bg-white/95 shadow-[0_22px_50px_rgba(18,48,77,0.22)] transition-transform duration-200 hover:scale-105 sm:h-24 sm:w-24">
              <span className="h-8 w-2.5 rounded-full bg-[var(--brand-navy)] sm:h-10 sm:w-3" />
              <span className="h-8 w-2.5 rounded-full bg-[var(--brand-navy)] sm:h-10 sm:w-3" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
