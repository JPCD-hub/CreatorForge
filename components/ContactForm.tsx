"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { whatsappLink } from "@/data/site";
import { Reveal } from "./Reveal";

const services = ["Diseño visual", "Página web", "Branding", "TikTok Live", "Inteligencia artificial", "Producto digital", "Otro"];
const budgets = ["Menos de $100.000 COP", "$100.000 a $300.000 COP", "$300.000 a $700.000 COP", "$700.000 a $1.500.000 COP", "Más de $1.500.000 COP"];

export function ContactForm() {
  const [success, setSuccess] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const data = new FormData(form);
    const message = `Hola Creator Forge, quiero solicitar una cotización.\n\n*Nombre:* ${data.get("name")}\n*Correo:* ${data.get("email")}\n*WhatsApp:* ${data.get("phone")}\n*Proyecto:* ${data.get("project")}\n*Servicio:* ${data.get("service")}\n*Presupuesto:* ${data.get("budget")}\n*Fecha esperada:* ${data.get("date")}\n*Descripción:* ${data.get("description")}`;
    setSuccess(true);
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  };
  return <section className="section contact" id="contacto"><div className="container contact-grid"><Reveal><p className="eyebrow"><span />CONTACTO / COTIZACIÓN</p><h2>Cuéntanos qué quieres <em>construir</em></h2><p className="contact-intro">Cuanto más nos cuentes, mejor podremos entender la idea y preparar el próximo paso.</p><div className="contact-notes"><span>Respuesta por WhatsApp</span><span>Proyectos a medida</span><span>Sin compromiso</span></div></Reveal><Reveal delay={0.1}><form className="contact-form" onSubmit={handleSubmit}><div className="form-grid"><Field label="Nombre" name="name" required /><Field label="Correo" name="email" type="email" required /><Field label="WhatsApp" name="phone" type="tel" required /><Field label="Nombre del proyecto" name="project" required /><Select label="Tipo de servicio" name="service" options={services} /><Select label="Presupuesto estimado" name="budget" options={budgets} /><Field label="Fecha esperada" name="date" type="date" required /></div><label className="form-field full"><span>Descripción del proyecto</span><textarea name="description" rows={4} required placeholder="Cuéntanos qué tienes en mente, qué necesitas y para quién es." /></label><button className="button form-submit" type="submit">Enviar y abrir WhatsApp <ArrowUpRight size={17} /></button>{success && <p className="form-success" role="status"><CheckCircle2 size={17} /> Tu mensaje está listo. Se abrió WhatsApp en una nueva pestaña.</p>}</form></Reveal></div></section>;
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return <label className="form-field"><span>{label}</span><input name={name} type={type} required={required} /></label>;
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return <label className="form-field"><span>{label}</span><select name={name} required defaultValue=""><option value="" disabled>Selecciona una opción</option>{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}
