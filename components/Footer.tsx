import { Github, Instagram, Mail, MessageCircle, Music2 } from "lucide-react";
import { SOCIAL_LINKS } from "@/data/site";
import { Logo } from "./Logo";

const navigation = ["Inicio", "Proyectos", "Servicios", "Proceso", "Nosotros", "Contacto"];
const services = ["Diseño visual", "Desarrollo web", "Branding", "Inteligencia artificial", "TikTok Live", "Productos digitales"];

export function Footer() {
  const year = new Date().getFullYear();
  const socials = [{ href: SOCIAL_LINKS.instagram, label: "Instagram", icon: <Instagram size={17} /> }, { href: SOCIAL_LINKS.tiktok, label: "TikTok", icon: <Music2 size={17} /> }, { href: SOCIAL_LINKS.github, label: "GitHub", icon: <Github size={17} /> }, { href: SOCIAL_LINKS.whatsapp, label: "WhatsApp", icon: <MessageCircle size={17} /> }, { href: SOCIAL_LINKS.email, label: "Correo", icon: <Mail size={17} /> }].filter(({ href }) => href && href !== "#" && !href.includes("ejemplo.com"));
  return <footer className="footer"><div className="container footer-grid"><div className="footer-brand"><Logo /><p>Forjamos tu imagen digital.</p><div className="socials">{socials.map(({ href, label, icon }) => <Social href={href} label={label} key={label}>{icon}</Social>)}</div></div><div><h3>Navegación</h3>{navigation.map((item) => <a href={`#${item.toLowerCase().replace(" ", "-") === "inicio" ? "inicio" : item.toLowerCase().replace(" ", "-")}`} key={item}>{item}</a>)}</div><div><h3>Servicios</h3>{services.map((item) => <a href="#servicios" key={item}>{item}</a>)}</div><div className="footer-quote"><span>¿LISTO PARA CREAR?</span><a href="#contacto">Hablemos <b>↗</b></a></div></div><div className="container footer-bottom"><span>© {year} Creator Forge. Todos los derechos reservados.</span><span>Disponible para proyectos remotos y presenciales según ubicación.</span></div></footer>;
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={label}>{children}</a>;
}
