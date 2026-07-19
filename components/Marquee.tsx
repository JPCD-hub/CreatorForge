const items = ["DISEÑO VISUAL", "DESARROLLO WEB", "BRANDING", "INTELIGENCIA ARTIFICIAL", "TIKTOK LIVE", "PRODUCTOS DIGITALES", "EVENTOS", "AUTOMATIZACIÓN"];

export function Marquee() {
  return <div className="marquee" aria-label="Áreas de Creator Forge"><div className="marquee-track">{[...items, ...items].map((item, index) => <span key={`${item}-${index}`}>{item}<b>✦</b></span>)}</div></div>;
}
