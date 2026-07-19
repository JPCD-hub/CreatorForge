"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { ReadingProgress } from "./ReadingProgress";

const links = [["Inicio", "#inicio"], ["Proyectos", "#proyectos"], ["Servicios", "#servicios"], ["Proceso", "#proceso"], ["Nosotros", "#nosotros"], ["Planes", "#planes"], ["Contacto", "#contacto"]] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#inicio");
  const reduced = useReducedMotion();
  const close = () => setOpen(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]; if (visible) setActive(`#${visible.target.id}`); }, { rootMargin: "-28% 0px -58%", threshold: [0.05, 0.3] });
    links.forEach(([, href]) => { const section = document.querySelector(href); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);
  return <header className="nav-wrap"><ReadingProgress /><nav className="navbar" aria-label="Navegación principal"><Logo /><div className="nav-links">{links.map(([name, href]) => <a href={href} key={href} className={active === href ? "active" : undefined}>{name}</a>)}</div><a className="button button-small nav-cta" href="#contacto">Iniciar proyecto <span>↗</span></a><button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Cerrar menú" : "Abrir menú"}>{open ? <X /> : <Menu />}</button><AnimatePresence>{open && <motion.div id="mobile-menu" className="mobile-menu" initial={reduced ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>{links.map(([name, href]) => <a href={href} key={href} className={active === href ? "active" : undefined} onClick={close}>{name}</a>)}<a className="button" href="#contacto" onClick={close}>Iniciar proyecto <span>↗</span></a></motion.div>}</AnimatePresence></nav></header>;
}
