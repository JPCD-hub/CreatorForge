import { ArrowUpRight, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/site";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  return <section className="final-cta"><div className="cta-glow" /><Reveal className="container cta-content"><p className="eyebrow"><span />EL SIGUIENTE PROYECTO</p><h2>¿Tienes una idea?<br /><em>Vamos a forjarla.</em></h2><p>Cuéntanos qué quieres construir y te ayudaremos a convertirlo en una experiencia visual y digital.</p><div className="hero-actions"><a className="button" href="#contacto">Iniciar proyecto <ArrowUpRight /></a><a className="button button-ghost" href={whatsappLink()} target="_blank" rel="noopener noreferrer"><MessageCircle /> Hablar por WhatsApp<span className="sr-only"> (abre en una pestaña nueva)</span></a></div></Reveal></section>;
}
