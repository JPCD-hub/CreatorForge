"use client";

import { useState } from "react";

const items = ["DISEÑO VISUAL", "DESARROLLO WEB", "BRANDING", "INTELIGENCIA ARTIFICIAL", "TIKTOK LIVE", "PRODUCTOS DIGITALES", "EVENTOS", "AUTOMATIZACIÓN"];

export function Marquee() {
  const [paused, setPaused] = useState(false);
  return <div className={`marquee ${paused ? "is-paused" : ""}`}><p className="sr-only">Áreas de Creator Forge: {items.join(", ")}.</p><div className="marquee-track" aria-hidden="true">{[...items, ...items].map((item, index) => <span key={`${item}-${index}`}>{item}<b>✦</b></span>)}</div><button className="marquee-toggle" type="button" aria-label={paused ? "Reanudar cinta de servicios" : "Pausar cinta de servicios"} onClick={() => setPaused(!paused)}>{paused ? "Reanudar movimiento" : "Pausar movimiento"}</button></div>;
}
