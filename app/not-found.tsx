import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><div><p className="eyebrow"><span />ERROR 404</p><h1>Esta idea todavía<br />no ha sido <em>forjada.</em></h1><p>La página que buscas no existe o cambió de lugar.</p><div className="hero-actions"><Link className="button" href="/">Volver al inicio</Link><Link className="button button-ghost" href="/#proyectos">Ver proyectos</Link></div></div></main>;
}
