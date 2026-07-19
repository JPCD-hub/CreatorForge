"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Hero() {
  const reduced = useReducedMotion();
  const item = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } };
  return <section className="hero" id="inicio"><div className="hero-grid" /><div className="container hero-content"><motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : 0.12 } } }}><motion.p variants={item} className="eyebrow hero-eyebrow"><span />DISEÑO · WEB · BRANDING · IA</motion.p><motion.h1 variants={item}>Forjamos ideas<br />en <em>experiencias</em> digitales.</motion.h1><motion.p variants={item} className="hero-copy">Diseñamos marcas, páginas web y productos digitales para artistas, creadores, eventos y negocios que quieren destacar.</motion.p><motion.div variants={item} className="hero-actions"><a className="button" href="#proyectos">Ver proyectos <span>↘</span></a><a className="button button-ghost" href="#contacto">Iniciar un proyecto <span>↗</span></a></motion.div></motion.div><ForgeVisual /></div></section>;
}

function ForgeVisual() {
  const reduced = useReducedMotion();
  return <motion.div className="forge-visual" aria-hidden="true" initial={reduced ? false : { opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.25 }}><div className="forge-orbit orbit-one" /><div className="forge-orbit orbit-two" /><motion.div className="forge-core" animate={reduced ? {} : { rotate: 360 }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }}><div /><div /><div /><div /></motion.div><div className="forge-line line-a" /><div className="forge-line line-b" /><div className="forge-code">&lt;CREATE /&gt;<br />{`{ FORGE }`}</div><span className="spark spark-a" /><span className="spark spark-b" /><span className="spark spark-c" /></motion.div>;
}
