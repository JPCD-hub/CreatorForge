"use client";

import { motion } from "framer-motion";

const stats = [{ value: 3, suffix: "+", label: "Proyectos digitales" }, { value: 5, suffix: "", label: "Áreas creativas" }, { value: 100, suffix: "%", label: "Diseño personalizado" }, { value: 24, suffix: "/7", label: "Ideas en construcción" }];

export function Stats() {
  return <section className="stats"><div className="container stats-grid">{stats.map((stat) => <motion.div key={stat.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}><strong>{stat.value}{stat.suffix}</strong><p>{stat.label}</p></motion.div>)}</div></section>;
}
