import { Reveal } from "./Reveal";

export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <Reveal className="section-heading"><p className="eyebrow"><span />{eyebrow}</p><h2>{title}</h2>{text && <p className="section-text">{text}</p>}</Reveal>;
}
