"use client";

import { Check } from "lucide-react";
import { pricing } from "@/data/pricing";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Pricing() {
  const selectPlan = (title: string, service: string) => window.dispatchEvent(new CustomEvent("creator-forge-plan", { detail: { title, service } }));
  return <section className="section pricing"><div className="container"><SectionHeading eyebrow="PUNTO DE PARTIDA" title="Planes iniciales" text="Los precios pueden variar según el alcance y la complejidad." /><div className="pricing-grid">{pricing.map((plan, index) => <Reveal key={plan.title} delay={index * 0.04}><article className={`price-card ${plan.featured ? "featured" : ""}`}>{plan.featured && <span className="featured-label">RECOMENDADO PARA EMPEZAR</span>}<h3>{plan.title}</h3><strong>{plan.price}</strong><ul>{plan.items.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul><a href="#contacto" className="text-link" onClick={() => selectPlan(plan.title, plan.service)}>Quiero este plan <span>↗</span></a></article></Reveal>)}</div></div></section>;
}
