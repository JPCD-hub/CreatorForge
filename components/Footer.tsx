import { Github, Instagram, Mail, MessageCircle, Music2 } from "lucide-react";
import { SOCIAL_LINKS } from "@/data/site";
import { Logo } from "./Logo";

const navigation = ["Inicio", "Proyectos", "Servicios", "Proceso", "Nosotros", "Contacto"];
const services = ["Diseño visual", "Desarrollo web", "Branding", "Inteligencia artificial", "TikTok Live", "Productos digitales"];

export function Footer() {
  const year = new Date().getFullYear();
  return <footer className="footer"><div className="container footer-grid"><div className="footer-brand"><Logo /><p>Forjamos tu imagen digital.</p><div className="socials"><Social href={SOCIAL_LINKS.instagram} label="Instagram"><Instagram size={17} /></Social><Social href={SOCIAL_LINKS.tiktok} label="TikTok"><Music2 size={17} /></Social><Social href={SOCIAL_LINKS.github} label="GitHub"><Github size={17} /></Social><Social href={SOCIAL_LINKS.whatsapp} label="WhatsApp"><MessageCircle size={17} /></Social><Social href={SOCIAL_LINKS.email} label="Correo"><Mail size={17} /></Social></div></div><div><h3>Navegación</h3>{navigation.map((item) => <a href={`#${item.toLowerCase().replace(" ", "-") === "inicio" ? "inicio" : item.toLowerCase().replace(" ", "-")}`} key={item}>{item}</a>)}</div><div><h3>Servicios</h3>{services.map((item) => <a href="#servicios" key={item}>{item}</a>)}</div><div className="footer-quote"><span>¿LISTO PARA CREAR?</span><a href="#contacto">Hablemos <b>↗</b></a></div></div><div className="container footer-bottom"><span>© {year} Creator Forge. Todos los derechos reservados.</span><span>HECHO PARA IDEAS QUE QUIEREN DESTACAR</span></div></footer>;
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={label}>{children}</a>;
}
