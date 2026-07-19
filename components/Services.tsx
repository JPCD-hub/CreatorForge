"use client";

import { motion, useReducedMotion } from "framer-motion";
import { services } from "@/data/services";
import { SectionHeading } from "./SectionHeading";

export function Services() {
  const reduced = useReducedMotion();
  return <section className="section services" id="servicios"><div className="container"><SectionHeading eyebrow="CAPACIDADES" title="Lo que forjamos" text="Cada disciplina suma a una experiencia coherente, útil y difícil de ignorar." /><div className="services-grid">{services.map(({ icon: Icon, ...service }) => <motion.article className="service-card" tabIndex={0} key={service.number} whileHover={reduced ? {} : { y: -4 }}><div className="service-top"><span>{service.number}</span><Icon size={22} strokeWidth={1.5} /></div><h3>{service.title}</h3><p>{service.description}</p><p className="service-example">{service.example}</p><div className="service-arrow">↗</div></motion.article>)}</div></div></section>;
}
