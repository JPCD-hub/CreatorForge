"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const pauseEvent = "creatorforge:motionpause";
const pauseKey = "creatorforge:motion-paused";

export function Hero() {
  const reduced = Boolean(useReducedMotion());
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const depthX = useSpring(pointerX, { stiffness: 55, damping: 24, mass: 0.7 });
  const depthY = useSpring(pointerY, { stiffness: 55, damping: 24, mass: 0.7 });
  const [canHover, setCanHover] = useState(false);
  const [paused, setPaused] = useState(false);
  const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const update = (event?: Event) => setPaused(event instanceof CustomEvent ? Boolean(event.detail) : sessionStorage.getItem(pauseKey) === "true");
    update();
    window.addEventListener(pauseEvent, update);
    return () => window.removeEventListener(pauseEvent, update);
  }, []);

  const move = (event: React.MouseEvent<HTMLElement>) => {
    pointerX.set((event.clientX / window.innerWidth - 0.5) * 6);
    pointerY.set((event.clientY / window.innerHeight - 0.5) * 6);
  };
  const resetDepth = () => { pointerX.set(0); pointerY.set(0); };
  const pointerEnabled = canHover && !reduced && !paused;

  return <section className="hero" id="inicio" onMouseMove={pointerEnabled ? move : undefined} onMouseLeave={pointerEnabled ? resetDepth : undefined}><div className="hero-grid" /><div className="container hero-content"><motion.div initial={false} animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : 0.1 } } }}><motion.p variants={item} className="eyebrow hero-eyebrow"><span />DISEÑO · WEB · BRANDING · IA</motion.p><motion.h1 variants={item}>Forjamos ideas<br />en <em>experiencias</em> digitales.</motion.h1><motion.p variants={item} className="hero-copy">Diseñamos marcas, páginas web y productos digitales para artistas, creadores, eventos y negocios que quieren destacar.</motion.p><motion.div variants={item} className="hero-capabilities"><span>Estrategia</span><i /> <span>Diseño</span><i /> <span>Desarrollo</span><i /> <span>Lanzamiento</span></motion.div><motion.div variants={item} className="hero-actions"><a className="button" href="#proyectos">Ver proyectos <ArrowDownRight /></a><a className="button button-ghost" href="#contacto">Iniciar un proyecto <ArrowUpRight /></a></motion.div><motion.p variants={item} className="hero-location">Estudio creativo independiente · Colombia</motion.p></motion.div><ForgeVisual depthX={depthX} depthY={depthY} paused={paused} /></div></section>;
}

function ForgeVisual({ depthX, depthY, paused }: { depthX: MotionValue<number>; depthY: MotionValue<number>; paused: boolean }) {
  const reduced = Boolean(useReducedMotion());
  const visual = useRef<HTMLDivElement>(null);
  const inView = useInView(visual, { amount: 0.05 });
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  const animateCore = !reduced && !paused && inView && pageVisible;
  return <motion.div ref={visual} className="forge-visual" aria-hidden="true" style={{ x: depthX, y: depthY }} initial={reduced ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reduced ? 0 : 0.45, delay: 0.2 }}><svg className="forge-monogram" viewBox="0 0 420 420"><path d="M320 95 205 210l115 115H190L75 210 190 95h130Z" /><path d="m190 95-115 115 115 115h77l-115-115 115-115h-77Z" /><path className="forge-contour" d="M210 54 366 210 210 366 54 210Z" /></svg><div className="forge-orbit orbit-one" /><div className="forge-orbit orbit-two" /><motion.div className="forge-core" animate={animateCore ? { rotate: 360 } : {}} transition={{ repeat: Infinity, duration: 24, ease: "linear" }}><div /><div /><div /><div /></motion.div><div className="forge-line line-a" /><div className="forge-line line-b" /><div className="forge-code">&lt;CREATE /&gt;<br />{`{ FORGE }`}</div><span className="spark spark-a" /><span className="spark spark-b" /><span className="spark spark-c" /><span className="spark spark-d" /></motion.div>;
}
