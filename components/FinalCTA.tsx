import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/site";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  return <section className="final-cta"><div className="cta-glow" /><Reveal className="container cta-content"><p className="eyebrow"><span />CONTACTO DIRECTO</p><h2>Tu próxima idea puede <em>empezar aquí.</em></h2><p>También puedes escribirnos directamente por WhatsApp.</p><div className="hero-actions"><a className="button button-ghost" href={whatsappLink()} target="_blank" rel="noopener noreferrer"><MessageCircle /> Hablar por WhatsApp<span className="sr-only"> (abre en una pestaña nueva)</span></a></div></Reveal></section>;
}
