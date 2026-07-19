"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { projects } from "@/data/projects";

type Project = (typeof projects)[number];

export function ProjectCard({ project }: { project: Project }) {
  const reduced = useReducedMotion();
  return <motion.article className="project-card" whileHover={reduced ? {} : { y: -7 }} transition={{ duration: 0.25 }}><div className={`project-visual visual-${project.type}`} aria-label={`Representación visual de ${project.title}`} role="img"><span className="project-number">{project.number}</span><Mockup type={project.type} /></div><div className="project-info"><div className="project-meta"><span>{project.categories}</span><span>2026</span></div><h3>{project.title}</h3><p>{project.description}</p><a href={project.href} target="_blank" rel="noopener noreferrer">{project.action} <ArrowUpRight size={17} /></a></div></motion.article>;
}

function Mockup({ type }: { type: Project["type"] }) {
  if (type === "funk") return <BrowserMockup src="/projects/motherfunkys-desktop.webp" label="Captura del sitio MotherFunkys" fallback="MOTHER FUNKYS" />;
  if (type === "art") return <BrowserMockup src="/projects/vive-el-arte-desktop.webp" label="Captura del sitio Vive el Arte" fallback="VIVE EL ARTE" />;
  return <><div className="system-mockups"><BrowserMockup src="/projects/fidelizacion-desktop.webp" label="Captura de escritorio del sistema de fidelización" fallback="BOLETA DIGITAL" /><PhoneMockup src="/projects/fidelizacion-mobile.webp" /></div><div className="system-capabilities" aria-label="Capacidades del sistema"><span>Registro de asistentes</span><span>Control mediante QR</span><span>Boleta digital</span><span>Administración de eventos</span></div></>;
}

function BrowserMockup({ src, label, fallback }: { src: string; label: string; fallback: string }) {
  return <div className="browser-mockup"><div className="browser-chrome"><span /><span /><span /><i /></div><div className="browser-screen"><Image src={src} alt={label} fill sizes="(max-width: 760px) 85vw, 360px" onError={(event) => { event.currentTarget.style.display = "none"; }} /><div className="project-image-fallback"><span>CREATOR FORGE / ARCHIVO</span><strong>{fallback}</strong></div></div></div>;
}

function PhoneMockup({ src }: { src: string }) {
  return <div className="phone-mockup"><i /><div><Image src={src} alt="Captura móvil del sistema de fidelización" fill sizes="120px" onError={(event) => { event.currentTarget.style.display = "none"; }} /></div></div>;
}
