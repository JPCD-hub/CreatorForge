"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";

const links = [["Inicio", "#inicio"], ["Proyectos", "#proyectos"], ["Servicios", "#servicios"], ["Proceso", "#proceso"], ["Nosotros", "#nosotros"], ["Contacto", "#contacto"]] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const close = () => setOpen(false);
  return <header className="nav-wrap"><nav className="navbar" aria-label="Navegación principal"><Logo /><div className="nav-links">{links.map(([name, href]) => <a href={href} key={href}>{name}</a>)}</div><a className="button button-small nav-cta" href="#contacto">Iniciar proyecto <span>↗</span></a><button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Cerrar menú" : "Abrir menú"}>{open ? <X /> : <Menu />}</button><AnimatePresence>{open && <motion.div id="mobile-menu" className="mobile-menu" initial={reduced ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>{links.map(([name, href]) => <a href={href} key={href} onClick={close}>{name}</a>)}<a className="button" href="#contacto" onClick={close}>Iniciar proyecto <span>↗</span></a></motion.div>}</AnimatePresence></nav></header>;
}
