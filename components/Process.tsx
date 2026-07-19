import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const stages = [
  ["01", "Descubrimos", "Entendemos tu proyecto, tus necesidades, tu público y tus objetivos."],
  ["02", "Definimos", "Organizamos la dirección creativa, la estructura y el alcance."],
  ["03", "Diseñamos", "Construimos la identidad visual y la experiencia."],
  ["04", "Desarrollamos", "Convertimos el diseño en una solución digital funcional."],
  ["05", "Lanzamos", "Probamos, entregamos y acompañamos la publicación."],
];

export function Process() {
  return <section className="section process" id="proceso"><div className="container"><SectionHeading eyebrow="METODOLOGÍA" title="Cómo trabajamos" text="Un proceso claro para transformar buenas ideas en resultados tangibles." /><div className="process-line">{stages.map(([number, title, text], index) => <Reveal className="process-stage" delay={index * 0.06} key={number}><div className="process-index"><b>{number}</b><i /></div><h3>{title}</h3><p>{text}</p></Reveal>)}</div></div></section>;
}
