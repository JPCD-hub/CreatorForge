import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Creator Forge - Diseño, desarrollo web y productos digitales";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#0b0b0b", color: "#ffffff", padding: "74px", fontFamily: "Arial, sans-serif" }}><div style={{ position: "absolute", width: "760px", height: "760px", right: "-210px", top: "-80px", border: "1px solid rgba(255,106,0,.55)", transform: "rotate(45deg)" }} /><div style={{ position: "absolute", width: "430px", height: "430px", right: "100px", bottom: "-170px", border: "1px solid rgba(255,106,0,.7)", borderRadius: "50%" }} /><div style={{ position: "absolute", width: "260px", height: "260px", right: "190px", bottom: "-85px", border: "1px solid rgba(255,255,255,.16)", borderRadius: "50%" }} /><div style={{ display: "flex", flexDirection: "column", zIndex: 1 }}><div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "22px", fontWeight: 700, letterSpacing: "-1px" }}><span style={{ color: "#ff6a00", fontSize: "34px", lineHeight: 1 }}>‹‹</span><span>Creator <span style={{ color: "#ff6a00" }}>Forge</span></span></div><div style={{ display: "flex", width: "38px", height: "2px", marginTop: "74px", background: "#ff6a00" }} /><div style={{ display: "flex", maxWidth: "720px", marginTop: "26px", fontSize: "82px", fontWeight: 700, lineHeight: 0.93, letterSpacing: "-6px" }}>Forjamos ideas en experiencias digitales.</div><div style={{ display: "flex", maxWidth: "590px", marginTop: "34px", color: "#bdbdbd", fontSize: "25px", lineHeight: 1.45 }}>Diseño, desarrollo web y productos digitales para artistas, creadores, eventos y negocios.</div></div></div>, size);
}
