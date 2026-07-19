import { Check } from "lucide-react";
import { Reveal } from "./Reveal";

const points = ["Diseño personalizado", "Tecnología aplicada", "Entregas ágiles", "Soluciones escalables", "Experiencia multidisciplinaria", "IA como herramienta creativa"];

export function Positioning() {
  return <section className="section positioning"><div className="container positioning-grid"><Reveal><p className="eyebrow"><span />NUESTRA MANERA</p><h2>No hacemos diseños genéricos.<br /><em>Construimos sistemas visuales</em> que ayudan a vender, conectar y crecer.</h2><ul className="positioning-list">{points.map((point) => <li key={point}><Check size={16} />{point}</li>)}</ul></Reveal><Reveal className="positioning-art" delay={0.1}><div className="art-frame"><div className="art-mark">CF</div><div className="art-measure m-one">01 / SYSTEM</div><div className="art-measure m-two">DESIGN 100%</div><div className="art-arc" /><div className="art-grid" /><span /><span /><span /></div></Reveal></div></section>;
}
