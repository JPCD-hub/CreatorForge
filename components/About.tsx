import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return <section className="section about" id="nosotros"><div className="container"><SectionHeading eyebrow="EL TALLER" title="La idea detrás de Creator Forge" /><div className="about-grid"><Reveal><div className="about-copy"><p>Creator Forge es un estudio creativo independiente dirigido por Qfinho. Nace de la combinación entre diseño, música, eventos, tecnología e inteligencia artificial.</p><p>Trabajamos con artistas, creadores, eventos y negocios que necesitan algo más que una pieza visual: una identidad clara, una experiencia funcional y una herramienta que les ayude a avanzar.</p><p>Cada proyecto combina creatividad, estrategia y desarrollo de acuerdo con una necesidad real.</p></div></Reveal><Reveal delay={0.1}><div className="about-card"><small>CREATOR FORGE / PRINCIPIO 01</small><h3 aria-label="DISEÑO + CÓDIGO + CULTURA">DISEÑO <i>+</i><br />CÓDIGO <i>+</i><br /><em>CULTURA</em></h3><ArrowUpRight size={27} /></div></Reveal></div></div></section>;
}
