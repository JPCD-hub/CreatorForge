"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import type { projects } from "@/data/projects";
import { useEffect, useRef, useState } from "react";

type Project = (typeof projects)[number];

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const triggerButton = useRef<HTMLButtonElement>(null);
  const modal = useRef<HTMLElement>(null);
  useEffect(() => { if (!open) return; const previousOverflow = document.body.style.overflow; const trigger = triggerButton.current; document.body.style.overflow = "hidden"; const handleKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); return; } if (event.key !== "Tab" || !modal.current) return; const focusable = Array.from(modal.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")); const first = focusable[0]; const last = focusable[focusable.length - 1]; if (!first || !last) return; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } }; document.addEventListener("keydown", handleKey); closeButton.current?.focus(); return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", handleKey); trigger?.focus(); }; }, [open]);
  const blocks = [["RETO", project.challenge], ["SOLUCIÓN", project.solution], ["ENTREGABLES", project.deliverables]] as const;
  return <><motion.article className={`project-card project-card-${index % 2 ? "reverse" : "standard"}`} whileHover={reduced ? {} : { y: -4 }} transition={{ duration: 0.25 }}><div className={`project-visual visual-${project.type}`} aria-label={`Captura de ${project.title}`} role="img"><span className="project-number">{project.number}</span><ProjectVisual project={project} /></div><div className="project-info"><div className="project-meta"><span>{project.categories}</span><span>2026</span></div><h3>{project.title}</h3><p className="project-summary">{project.description}</p><div className="case-blocks">{blocks.map(([title, text]) => <div key={title}><b>{title}</b><p>{text}</p></div>)}</div><div className="project-actions"><a href={project.href} target="_blank" rel="noopener noreferrer">Ver proyecto <ArrowUpRight size={17} /></a><button ref={triggerButton} type="button" onClick={() => setOpen(true)}>Ver detalles <span>↗</span></button></div></div></motion.article>{open && <div className="case-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}><section ref={modal} className="case-modal" role="dialog" aria-modal="true" aria-labelledby={`case-title-${project.number}`}><button ref={closeButton} className="case-modal-close" type="button" onClick={() => setOpen(false)} aria-label="Cerrar detalles"><X size={20} /></button><span className="case-modal-number">CASO {project.number} / 2026</span><h2 id={`case-title-${project.number}`}>{project.title}</h2><p className="case-modal-categories">{project.categories}</p><div className="case-modal-grid">{blocks.map(([title, text]) => <div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div><a className="button" href={project.href} target="_blank" rel="noopener noreferrer">Ver proyecto <ArrowUpRight size={17} /></a></section></div>}</>;
}

function ProjectVisual({ project }: { project: Project }) {
  if (project.type !== "system") return <BrowserMockup src={project.image} label={`Captura del sitio ${project.title}`} fallback={project.title.toUpperCase()} />;
  return <><div className="system-mockups"><BrowserMockup src={project.image} label="Captura de escritorio del sistema de fidelización" fallback="BOLETA DIGITAL" /><PhoneMockup src={project.mobileImage} /></div><div className="system-capabilities" aria-label="Capacidades del sistema"><span>Registro de asistentes</span><span>Control mediante QR</span><span>Boleta digital</span><span>Administración de eventos</span></div></>;
}

function BrowserMockup({ src, label, fallback }: { src: string; label: string; fallback: string }) {
  return <div className="browser-mockup"><div className="browser-chrome"><span /><span /><span /><i /></div><div className="browser-screen"><Image src={src} alt={label} width={1280} height={720} sizes="(max-width: 760px) 85vw, 48vw" onError={(event) => { event.currentTarget.style.display = "none"; }} /><div className="project-image-fallback"><span>CREATOR FORGE / ARCHIVO</span><strong>{fallback}</strong></div></div></div>;
}

function PhoneMockup({ src }: { src: string | undefined }) {
  if (!src) return null;
  return <div className="phone-mockup"><i /><div><Image src={src} alt="Captura móvil del sistema de fidelización" width={390} height={844} sizes="120px" onError={(event) => { event.currentTarget.style.display = "none"; }} /></div></div>;
}
