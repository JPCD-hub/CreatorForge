import { Check } from "lucide-react";
import { Reveal } from "./Reveal";

const points = ["Diseño personalizado", "Tecnología aplicada", "Entregas ágiles", "Soluciones escalables", "Experiencia multidisciplinaria", "IA como herramienta creativa"];

export function Positioning() {
  return <section className="section positioning"><div className="container positioning-grid"><Reveal><p className="eyebrow"><span />NUESTRA MANERA</p><h2>No hacemos diseños genéricos.<br /><em>Construimos sistemas visuales</em> que ayudan a vender, conectar y crecer.</h2><ul className="positioning-list">{points.map((point) => <li key={point}><Check size={16} />{point}</li>)}</ul></Reveal><Reveal className="positioning-art" delay={0.1}><div className="art-frame art-system"><div className="art-grid" /><p className="art-measure m-one">01 / SISTEMA</p><p className="art-measure m-two">CF / 2026</p><div className="art-rail" aria-hidden="true"><i /><i /><i /></div><svg className="art-cf" viewBox="0 0 40 40" aria-hidden="true"><path d="M31 10 21 20l10 10H18L8 20l10-10h13Z" fill="currentColor" /><path d="m18 10-8 10 8 10h7l-8-10 8-10h-7Z" fill="#121212" /></svg><div className="art-module art-module-one"><b>01</b><span>ESTRATEGIA</span></div><div className="art-module art-module-two"><b>02</b><span>IDENTIDAD</span></div><div className="art-module art-module-three"><b>03</b><span>PRODUCTO</span></div><div className="art-orbit" aria-hidden="true"><i /><span /></div><p className="art-caption">DE LA IDEA AL<br />SISTEMA DIGITAL</p></div></Reveal></div></section>;
}
