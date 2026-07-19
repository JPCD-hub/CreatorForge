import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return <section className="section about" id="nosotros"><div className="container"><SectionHeading eyebrow="EL TALLER" title="La idea detrás de Creator Forge" /><div className="about-grid"><Reveal><div className="about-copy"><p>Creator Forge nace de la combinación entre diseño, música, eventos, tecnología e inteligencia artificial.</p><p>Creator Forge es un estudio creativo independiente dirigido por Qfinho, enfocado en diseño, desarrollo web y productos digitales para artistas, eventos, creadores y negocios.</p><p>Creamos soluciones digitales para personas y proyectos que necesitan algo más que una pieza visual: necesitan una identidad, una experiencia y una herramienta que les ayude a crecer.</p><p>Trabajamos con artistas, creadores, negocios y eventos para transformar ideas en productos visuales y digitales.</p></div></Reveal><Reveal delay={0.1}><div className="about-card"><small>CREATOR FORGE / PRINCIPIO 01</small><h3>Creatividad <i>+</i><br />tecnología <i>+</i><br /><em>estrategia</em></h3><ArrowUpRight size={27} /></div></Reveal></div></div></section>;
}
