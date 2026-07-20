"use client";

import { AlertCircle, ArrowLeft, CheckCircle2, MessageCircle, X } from "lucide-react";
import { type ChangeEvent, type FormEvent, type InputHTMLAttributes, type RefObject, useEffect, useRef, useState } from "react";
import { whatsappLink } from "@/data/site";
import { Reveal } from "./Reveal";

const services = ["Diseño visual", "Desarrollo web", "Branding", "TikTok Live", "Inteligencia artificial", "Productos digitales", "Otro"];
const budgets = ["Menos de $100.000 COP", "$100.000 a $300.000 COP", "$300.000 a $700.000 COP", "$700.000 a $1.500.000 COP", "Más de $1.500.000 COP"];
const today = new Date().toISOString().slice(0, 10);

type Values = { name: string; email: string; phone: string; project: string; service: string; budget: string; date: string; description: string; plan: string; website: string };
type Errors = Partial<Record<keyof Values, string>>;

const emptyValues: Values = { name: "", email: "", phone: "", project: "", service: "", budget: "", date: "", description: "", plan: "", website: "" };

export function ContactForm() {
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [reviewing, setReviewing] = useState(false);
  const [hasOpenedWhatsApp, setHasOpenedWhatsApp] = useState(false);
  const reviewHeading = useRef<HTMLHeadingElement>(null);
  const whatsappTriggered = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan");
    const service = params.get("service");
    if (!plan || !service || !services.includes(service)) return;
    setValues((current) => ({ ...current, plan, service, project: current.project || plan }));
    window.history.replaceState(null, "", "#contacto");
  }, []);

  useEffect(() => {
    if (reviewing) reviewHeading.current?.focus();
  }, [reviewing]);

  const change = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const validate = () => {
    const next: Errors = {};
    const phoneDigits = values.phone.replace(/\D/g, "");
    if (!values.name.trim()) next.name = "Escribe tu nombre para continuar.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "Ingresa un correo válido.";
    if (phoneDigits.length < 7 || phoneDigits.length > 15) next.phone = "Ingresa un WhatsApp válido, con indicativo si aplica.";
    if (values.website && !isValidUrl(values.website)) next.website = "Ingresa una URL válida, por ejemplo https://tusitio.com.";
    if (!values.project.trim()) next.project = "Cuéntanos el nombre de tu proyecto.";
    if (!values.service) next.service = "Selecciona el servicio que necesitas.";
    if (!values.budget) next.budget = "Selecciona un presupuesto estimado.";
    if (!values.date) next.date = "Selecciona una fecha esperada.";
    else if (values.date < today) next.date = "Selecciona una fecha actual o futura.";
    if (values.description.trim().length < 12) next.description = "Describe tu proyecto en al menos 12 caracteres.";
    return next;
  };

  const review = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    const firstInvalid = Object.keys(next)[0] as keyof Values | undefined;
    if (firstInvalid) {
      requestAnimationFrame(() => document.getElementById(`contact-${firstInvalid}`)?.focus());
      return;
    }
    setReviewing(true);
  };

  const edit = () => {
    whatsappTriggered.current = false;
    setHasOpenedWhatsApp(false);
    setReviewing(false);
    requestAnimationFrame(() => document.getElementById("contact-name")?.focus());
  };

  const removePlan = () => setValues((current) => ({ ...current, plan: "" }));

  const sendToWhatsApp = () => {
    if (whatsappTriggered.current) return;
    whatsappTriggered.current = true;
    const message = `Hola Creator Forge, quiero solicitar una cotización.\n\n*Nombre:* ${values.name}\n*Correo:* ${values.email}\n*WhatsApp:* ${values.phone}\n*Proyecto:* ${values.project}\n*Plan inicial:* ${values.plan || "No seleccionado"}\n*Servicio:* ${values.service}\n*Presupuesto:* ${values.budget}\n*Fecha esperada:* ${values.date}\n*Descripción:* ${values.description}`;
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setHasOpenedWhatsApp(true);
  };

  const errorCount = Object.keys(errors).length;

  return <section className="section contact" id="contacto"><div className="container contact-grid"><Reveal><p className="eyebrow"><span />CONTACTO / COTIZACIÓN</p><h2>Las mejores ideas no empiezan con un <em>presupuesto.</em></h2><p className="contact-intro">Empiezan con una conversación. Cuéntanos tu proyecto y construyamos juntos una solución que realmente aporte valor.</p><div className="contact-notes"><span>Respuesta por WhatsApp</span><span>Proyectos a medida</span><span>Sin compromiso</span></div></Reveal><Reveal delay={0.1}>{reviewing ? <Review values={values} onEdit={edit} onContinue={sendToWhatsApp} hasOpenedWhatsApp={hasOpenedWhatsApp} headingRef={reviewHeading} /> : <form className="contact-form" onSubmit={review} noValidate><div className="form-steps" aria-label="Pasos del formulario"><span>1. Tus datos</span><i aria-hidden="true">→</i><span>2. El proyecto</span><i aria-hidden="true">→</i><span>3. Enviar</span></div>{errorCount > 0 && <p className="form-error" role="alert"><AlertCircle size={16} /> Revisa {errorCount === 1 ? "el campo marcado" : "los campos marcados"} para continuar.</p>}{values.plan && <div className="selected-plan" role="status">Cotizando: <strong>{values.plan}</strong><button type="button" onClick={removePlan}><X aria-hidden="true" />Quitar plan</button></div>}<Fieldset legend="Tus datos"><Field label="Nombre" name="name" value={values.name} onChange={change} error={errors.name} autoComplete="name" /><Field label="Correo" name="email" type="email" value={values.email} onChange={change} error={errors.email} autoComplete="email" inputMode="email" /><Field label="WhatsApp" name="phone" type="tel" value={values.phone} onChange={change} error={errors.phone} autoComplete="tel" inputMode="tel" /><Field label="Sitio web o red social — opcional" name="website" type="url" value={values.website} onChange={change} error={errors.website} autoComplete="url" inputMode="url" placeholder="https://tusitio.com" /></Fieldset><Fieldset legend="El proyecto"><Field label="Nombre del proyecto" name="project" value={values.project} onChange={change} error={errors.project} /><Select label="Tipo de servicio" name="service" value={values.service} onChange={change} options={services} error={errors.service} /><Select label="Presupuesto estimado" name="budget" value={values.budget} onChange={change} options={budgets} error={errors.budget} /><Field label="Fecha esperada" name="date" type="date" value={values.date} onChange={change} error={errors.date} min={today} /><Description value={values.description} onChange={change} error={errors.description} /></Fieldset><button className="button form-submit" type="submit">Revisar cotización <MessageCircle /></button></form>}</Reveal></div></section>;
}

function Review({ values, onEdit, onContinue, hasOpenedWhatsApp, headingRef }: { values: Values; onEdit: () => void; onContinue: () => void; hasOpenedWhatsApp: boolean; headingRef: RefObject<HTMLHeadingElement | null> }) {
  return <div className="contact-form contact-review" aria-live="polite"><p className="eyebrow"><span />RESUMEN DE COTIZACIÓN</p><h3 ref={headingRef} tabIndex={-1}>Todo listo para revisar.</h3><dl><div><dt>Nombre</dt><dd>{values.name}</dd></div><div><dt>Correo</dt><dd>{values.email}</dd></div><div><dt>WhatsApp</dt><dd>{values.phone}</dd></div><div><dt>Proyecto</dt><dd>{values.project}</dd></div><div><dt>Servicio</dt><dd>{values.service}</dd></div><div><dt>Plan</dt><dd>{values.plan || "Cotización personalizada"}</dd></div><div><dt>Presupuesto</dt><dd>{values.budget}</dd></div><div><dt>Fecha</dt><dd>{values.date}</dd></div><div className="review-description"><dt>Descripción</dt><dd>{values.description}</dd></div></dl><div className="review-actions"><button className="button button-ghost" type="button" onClick={onEdit}><ArrowLeft />Editar información</button><button className="button" type="button" onClick={onContinue} disabled={hasOpenedWhatsApp}>{hasOpenedWhatsApp ? "WhatsApp preparado" : <><MessageCircle />Continuar a WhatsApp</>}</button></div>{hasOpenedWhatsApp && <p className="form-success" role="status"><CheckCircle2 /> Se preparó el mensaje para WhatsApp.</p>}</div>;
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return <fieldset className="form-fieldset"><legend>{legend}</legend><div className="form-grid">{children}</div></fieldset>;
}

function Field({ label, name, value, onChange, error, type = "text", autoComplete, className = "", tabIndex, inputMode, min, ariaHidden = false, placeholder }: { label: string; name: keyof Values; value: string; onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void; error?: string; type?: string; autoComplete?: string; className?: string; tabIndex?: number; inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"]; min?: string; ariaHidden?: boolean; placeholder?: string }) {
  const id = `contact-${name}`;
  return <label className={`form-field ${className}`} htmlFor={id} aria-hidden={ariaHidden || undefined}><span>{label}</span><input id={id} name={name} type={type} value={value} onChange={onChange} autoComplete={autoComplete} tabIndex={tabIndex} inputMode={inputMode} min={min} placeholder={placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} />{error && <em id={`${id}-error`} className="field-error"><AlertCircle size={14} />{error}</em>}</label>;
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function Select({ label, name, value, onChange, options, error }: { label: string; name: keyof Values; value: string; onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void; options: string[]; error?: string }) {
  const id = `contact-${name}`;
  return <label className="form-field" htmlFor={id}><span>{label}</span><select id={id} name={name} value={value} onChange={onChange} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined}><option value="">Selecciona una opción</option>{options.map((option) => <option key={option}>{option}</option>)}</select>{error && <em id={`${id}-error`} className="field-error"><AlertCircle size={14} />{error}</em>}</label>;
}

function Description({ value, onChange, error }: { value: string; onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void; error?: string }) {
  const id = "contact-description";
  return <label className="form-field full" htmlFor={id}><span>Cuéntanos sobre la idea</span><textarea id={id} name="description" value={value} onChange={onChange} maxLength={600} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : "contact-description-count"} />{error && <em id={`${id}-error`} className="field-error"><AlertCircle size={14} />{error}</em>}<small id="contact-description-count" className="character-count">{value.length}/600</small></label>;
}
