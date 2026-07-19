"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [{ value: 3, suffix: "+", label: "Proyectos digitales" }, { value: 5, suffix: "", label: "Áreas creativas" }, { value: 100, suffix: "%", label: "Diseño personalizado" }, { value: 24, suffix: "/7", label: "Ideas en construcción" }];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  useEffect(() => { if (!inView) return; if (reduced) { setCount(value); return; } const controls = animate(0, value, { duration: 1.25, ease: "easeOut", onUpdate: (latest) => setCount(Math.round(latest)) }); return () => controls.stop(); }, [inView, reduced, value]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export function Stats() {
  return <section className="stats"><div className="container stats-grid">{stats.map((stat) => <motion.div key={stat.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}><strong><Counter value={stat.value} suffix={stat.suffix} /></strong><p>{stat.label}</p></motion.div>)}</div></section>;
}
