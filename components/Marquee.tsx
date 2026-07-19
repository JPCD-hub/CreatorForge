"use client";

import { useState } from "react";

const items = ["DISEÑO VISUAL", "DESARROLLO WEB", "BRANDING", "INTELIGENCIA ARTIFICIAL", "TIKTOK LIVE", "PRODUCTOS DIGITALES", "EVENTOS", "AUTOMATIZACIÓN"];

export function Marquee() {
  const [paused, setPaused] = useState(false);
  return <div className={`marquee ${paused ? "is-paused" : ""}`} aria-label="Áreas de Creator Forge"><div className="marquee-track">{[...items, ...items].map((item, index) => <span key={`${item}-${index}`}>{item}<b>✦</b></span>)}</div><button className="marquee-toggle" type="button" onClick={() => setPaused(!paused)}>{paused ? "Reanudar movimiento" : "Pausar movimiento"}</button></div>;
}
