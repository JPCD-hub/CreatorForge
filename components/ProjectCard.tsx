"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { projects } from "@/data/projects";

type Project = (typeof projects)[number];

export function ProjectCard({ project }: { project: Project }) {
  const reduced = useReducedMotion();
  return <motion.article className="project-card" whileHover={reduced ? {} : { y: -7 }} transition={{ duration: 0.25 }}><div className={`project-visual visual-${project.type}`} aria-label={`Representación visual de ${project.title}`} role="img"><span className="project-number">{project.number}</span><Mockup type={project.type} /></div><div className="project-info"><div className="project-meta"><span>{project.categories}</span><span>2026</span></div><h3>{project.title}</h3><p>{project.description}</p><a href={project.href} target="_blank" rel="noreferrer">{project.action} <ArrowUpRight size={17} /></a></div></motion.article>;
}

function Mockup({ type }: { type: Project["type"] }) {
  if (type === "funk") return <div className="mockup-funk"><p>MOTHER<br /><i>FUNKYS</i></p><div className="funk-disc" /><small>LIVE / SOUL / GROOVE</small></div>;
  if (type === "art") return <div className="mockup-art"><p>VIVE<br /><i>EL ARTE</i></p><div className="art-sun" /><div className="art-strip">CULTURA EN MOVIMIENTO</div></div>;
  return <div className="mockup-system"><div className="system-top"><span>VIVE EL ARTE</span><i /></div><strong>Tu comunidad<br />se mueve contigo.</strong><div className="system-bars"><i /><i /><i /></div><small>12,480 PUNTOS</small></div>;
}
