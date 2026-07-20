"use client";

import { motion, useReducedMotion } from "framer-motion";

const stats = [{ value: 3, suffix: "+", label: "Proyectos digitales" }, { value: 6, suffix: "", label: "Áreas creativas" }, { value: 100, suffix: "%", label: "Diseño personalizado" }, { value: 1, suffix: "", label: "Estudio multidisciplinario", accessibleLabel: "1 Estudio multidisciplinario" }];

export function Stats() {
  const reduced = useReducedMotion();
  return <section className="stats"><div className="container stats-grid">{stats.map((stat) => <motion.div key={stat.label} initial={reduced ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : 0.3 }}><strong aria-label={stat.accessibleLabel}>{stat.value}{stat.suffix}</strong><p>{stat.label}</p></motion.div>)}</div></section>;
}
