"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { ReadingProgress } from "./ReadingProgress";

const links = [["Inicio", "#inicio"], ["Proyectos", "#proyectos"], ["Servicios", "#servicios"], ["Proceso", "#proceso"], ["Nosotros", "#nosotros"], ["Planes", "#planes"], ["Contacto", "#contacto"]] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#inicio");
  const reduced = useReducedMotion();
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]; if (visible) setActive(`#${visible.target.id}`); }, { rootMargin: "-28% 0px -58%", threshold: [0.05, 0.3] });
    links.forEach(([, href]) => { const section = document.querySelector(href); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const closeOnDesktop = () => { if (!media.matches) setOpen(false); };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const timeout = window.setTimeout(() => {
      const target = document.getElementById(id);
      const heading = target?.querySelector<HTMLElement>("h1, h2");
      const nav = document.querySelector<HTMLElement>(".navbar");
      if (!heading || !nav) return;
      const root = document.documentElement;
      const previousBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollBy({ top: heading.getBoundingClientRect().top - nav.getBoundingClientRect().bottom - 52 });
      root.style.scrollBehavior = previousBehavior;
    }, 1000);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const focusable = () => Array.from(menu.current?.querySelectorAll<HTMLElement>("a[href]") ?? []);
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); return; }
      if (event.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKeyDown); };
  }, [open]);

  return <header className="nav-wrap"><ReadingProgress /><nav className="navbar" aria-label="Navegación principal"><Logo /><div className="nav-links">{links.map(([name, href]) => <a href={href} key={href} className={active === href ? "active" : undefined}>{name}</a>)}</div><a className="button button-small nav-cta" href="#contacto">Iniciar proyecto <ArrowUpRight /></a><button ref={trigger} className="menu-button" type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Cerrar menú" : "Abrir menú"}>{open ? <X /> : <Menu />}</button><AnimatePresence>{open && <motion.div ref={menu} id="mobile-menu" className="mobile-menu" initial={reduced ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: reduced ? 0 : 0.18 }}>{links.map(([name, href]) => <a href={href} key={href} className={active === href ? "active" : undefined} onClick={close}>{name}</a>)}<a className="button" href="#contacto" onClick={close}>Iniciar proyecto <ArrowUpRight /></a></motion.div>}</AnimatePresence></nav></header>;
}
