"use client";

import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { AlertCircle, ArrowLeft, ArrowUpRight, CheckCircle2, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/site";
import { Reveal } from "./Reveal";

const services = ["Diseño visual", "Página web", "Branding", "TikTok Live", "Inteligencia artificial", "Producto digital", "Otro"];
const budgets = ["Menos de $100.000 COP", "$100.000 a $300.000 COP", "$300.000 a $700.000 COP", "$700.000 a $1.500.000 COP", "Más de $1.500.000 COP"];

type Values = { name: string; email: string; phone: string; project: string; service: string; budget: string; date: string; description: string; plan: string; website: string };
type Errors = Partial<Record<keyof Values, string>>;

const emptyValues: Values = { name: "", email: "", phone: "", project: "", service: "", budget: "", date: "", description: "", plan: "", website: "" };

export function ContactForm() {
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [reviewing, setReviewing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan");
    const service = params.get("service");
    if (!plan || !service || !services.includes(service)) return;
    setValues((current) => ({ ...current, plan, service, project: current.project || plan }));
    window.history.replaceState(null, "", "#contacto");
  }, []);

  const change = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setSuccess(false);
  };

  const validate = () => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Escribe tu nombre para continuar.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "Ingresa un correo válido.";
    if (!values.phone.trim()) next.phone = "Ingresa un número de WhatsApp.";
    if (!values.project.trim()) next.project = "Cuéntanos el nombre de tu proyecto.";
    if (!values.service) next.service = "Selecciona el servicio que necesitas.";
    if (!values.budget) next.budget = "Selecciona un presupuesto estimado.";
    if (!values.date) next.date = "Selecciona una fecha esperada.";
    if (values.description.trim().length < 12) next.description = "Describe tu proyecto en al menos 12 caracteres.";
    return next;
  };

  const review = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (values.website) return;
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;
    setReviewing(true);
  };

  const sendToWhatsApp = () => {
    if (isSending) return;
    setIsSending(true);
    const message = `Hola Creator Forge, quiero solicitar una cotización.\n\n*Nombre:* ${values.name}\n*Correo:* ${values.email}\n*WhatsApp:* ${values.phone}\n*Proyecto:* ${values.project}\n*Plan inicial:* ${values.plan || "No seleccionado"}\n*Servicio:* ${values.service}\n*Presupuesto:* ${values.budget}\n*Fecha esperada:* ${values.date}\n*Descripción:* ${values.description}`;
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setSuccess(true);
  };

  return <section className="section contact" id="contacto"><div className="container contact-grid"><Reveal><p className="eyebrow"><span />CONTACTO / COTIZACIÓN</p><h2>Cuéntanos qué quieres <em>construir</em></h2><p className="contact-intro">Cuanto más nos cuentes, mejor podremos entender la idea y preparar el próximo paso.</p><div className="contact-notes"><span>Respuesta por WhatsApp</span><span>Proyectos a medida</span><span>Sin compromiso</span></div></Reveal><Reveal delay={0.1}>{reviewing ? <Review values={values} onEdit={() => setReviewing(false)} onContinue={sendToWhatsApp} isSending={isSending} success={success} /> : <form className="contact-form" onSubmit={review} noValidate><div className="form-steps" aria-label="Pasos del formulario"><span>1. Tus datos</span><i>→</i><span>2. El proyecto</span><i>→</i><span>3. Enviar</span></div>{values.plan && <p className="selected-plan" role="status">Cotizando: <strong>{values.plan}</strong></p>}<Fieldset legend="Tus datos"><Field label="Nombre" name="name" value={values.name} onChange={change} error={errors.name} autoComplete="name" /><Field label="Correo" name="email" type="email" value={values.email} onChange={change} error={errors.email} autoComplete="email" /><Field label="WhatsApp" name="phone" type="tel" value={values.phone} onChange={change} error={errors.phone} autoComplete="tel" /><Field label="Sitio web" name="website" value={values.website} onChange={change} className="honeypot" tabIndex={-1} autoComplete="off" /></Fieldset><Fieldset legend="El proyecto"><Field label="Nombre del proyecto" name="project" value={values.project} onChange={change} error={errors.project} /><Select label="Tipo de servicio" name="service" value={values.service} onChange={change} options={services} error={errors.service} /><Select label="Presupuesto estimado" name="budget" value={values.budget} onChange={change} options={budgets} error={errors.budget} /><Field label="Fecha esperada" name="date" type="date" value={values.date} onChange={change} error={errors.date} /><label className="form-field full"><span>Descripción del proyecto</span><textarea name="description" rows={5} maxLength={600} value={values.description} onChange={change} aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? "description-error" : undefined} placeholder="Cuéntanos qué tienes en mente, qué necesitas y para quién es." /><small className="character-count">{values.description.length}/600</small>{errors.description && <em id="description-error" className="field-error"><AlertCircle size={14} />{errors.description}</em>}</label></Fieldset><button className="button form-submit" type="submit">Revisar cotización <ArrowUpRight size={17} /></button></form>}</Reveal></div></section>;
}

function Review({ values, onEdit, onContinue, isSending, success }: { values: Values; onEdit: () => void; onContinue: () => void; isSending: boolean; success: boolean }) {
  return <div className="contact-form contact-review" aria-live="polite"><p className="eyebrow"><span />RESUMEN DE COTIZACIÓN</p><h3>Todo listo para revisar.</h3><dl><div><dt>Nombre</dt><dd>{values.name}</dd></div><div><dt>Proyecto</dt><dd>{values.project}</dd></div><div><dt>Servicio</dt><dd>{values.service}</dd></div><div><dt>Plan</dt><dd>{values.plan || "Cotización personalizada"}</dd></div><div><dt>Presupuesto</dt><dd>{values.budget}</dd></div><div><dt>Fecha</dt><dd>{values.date}</dd></div><div className="review-description"><dt>Descripción</dt><dd>{values.description}</dd></div></dl><div className="review-actions"><button className="button button-ghost" type="button" onClick={onEdit} disabled={isSending}><ArrowLeft size={17} />Editar información</button><button className="button" type="button" onClick={onContinue} disabled={isSending}>{isSending ? "WhatsApp abierto" : <><MessageCircle size={17} />Continuar a WhatsApp</>}</button></div>{success && <p className="form-success" role="status"><CheckCircle2 size={17} /> Se abrió WhatsApp con el resumen de tu proyecto.</p>}</div>;
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return <fieldset className="form-fieldset"><legend>{legend}</legend><div className="form-grid">{children}</div></fieldset>;
}

function Field({ label, name, value, onChange, error, type = "text", autoComplete, className = "", tabIndex }: { label: string; name: keyof Values; value: string; onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void; error?: string; type?: string; autoComplete?: string; className?: string; tabIndex?: number }) {
  const id = `contact-${name}`;
  return <label className={`form-field ${className}`} htmlFor={id}><span>{label}</span><input id={id} name={name} type={type} value={value} onChange={onChange} autoComplete={autoComplete} tabIndex={tabIndex} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} />{error && <em id={`${id}-error`} className="field-error"><AlertCircle size={14} />{error}</em>}</label>;
}

function Select({ label, name, value, onChange, options, error }: { label: string; name: keyof Values; value: string; onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void; options: string[]; error?: string }) {
  const id = `contact-${name}`;
  return <label className="form-field" htmlFor={id}><span>{label}</span><select id={id} name={name} value={value} onChange={onChange} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined}><option value="">Selecciona una opción</option>{options.map((option) => <option key={option}>{option}</option>)}</select>{error && <em id={`${id}-error`} className="field-error"><AlertCircle size={14} />{error}</em>}</label>;
}
