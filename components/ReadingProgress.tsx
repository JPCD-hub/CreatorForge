"use client";

import { useEffect, useRef } from "react";

export function ReadingProgress() {
  const indicator = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      const progress = available > 0 ? Math.min(Math.max(window.scrollY / available, 0), 1) : 0;
      indicator.current?.style.setProperty("transform", `scaleX(${progress})`);
    };
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; update(); }); };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", requestUpdate); window.removeEventListener("resize", requestUpdate); };
  }, []);
  return <div className="reading-progress" aria-hidden="true"><i ref={indicator} /></div>;
}
