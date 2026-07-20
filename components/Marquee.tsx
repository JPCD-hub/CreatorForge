"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const items = ["DISEÑO VISUAL", "DESARROLLO WEB", "BRANDING", "INTELIGENCIA ARTIFICIAL", "TIKTOK LIVE", "PRODUCTOS DIGITALES", "EVENTOS", "AUTOMATIZACIÓN"];
const pauseEvent = "creatorforge:motionpause";
const pauseKey = "creatorforge:motion-paused";

export function Marquee() {
  const reduced = Boolean(useReducedMotion());
  const marquee = useRef<HTMLDivElement>(null);
  const [manualPaused, setManualPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const paused = reduced || manualPaused || !inView || !pageVisible;

  useEffect(() => {
    if (!reduced) setManualPaused(sessionStorage.getItem(pauseKey) === "true");
  }, [reduced]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.01 });
    if (marquee.current) observer.observe(marquee.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    const globallyPaused = reduced || manualPaused;
    document.documentElement.dataset.motionPaused = globallyPaused ? "true" : "false";
    window.dispatchEvent(new CustomEvent(pauseEvent, { detail: globallyPaused }));
    if (!reduced) sessionStorage.setItem(pauseKey, String(manualPaused));
  }, [manualPaused, reduced]);

  const toggle = () => {
    if (!reduced) setManualPaused((current) => !current);
  };

  return <div ref={marquee} className={`marquee ${paused ? "is-paused" : ""}`} role="region" aria-label="Capacidades y áreas de trabajo de Creator Forge"><div className="marquee-track" aria-hidden="true">{[...items, ...items].map((item, index) => <span key={`${item}-${index}`}>{item}<b>✦</b></span>)}</div><button className="marquee-toggle" type="button" aria-pressed={manualPaused} aria-label={reduced ? "El movimiento se redujo según tus preferencias" : manualPaused ? "Reanudar movimiento" : "Pausar movimiento"} disabled={reduced} onClick={toggle}>{manualPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}<span>{reduced ? "Movimiento reducido" : manualPaused ? "Reanudar movimiento" : "Pausar movimiento"}</span></button></div>;
}
