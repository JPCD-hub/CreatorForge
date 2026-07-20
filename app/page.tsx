import { About } from "@/components/About";
import { ContactForm } from "@/components/ContactForm";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Navbar } from "@/components/Navbar";
import { Positioning } from "@/components/Positioning";
import { Pricing } from "@/components/Pricing";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function Home() {
  const serviceSchema = { "@context": "https://schema.org", "@type": "ProfessionalService", name: "Creator Forge", description: "Estudio creativo independiente que desarrolla identidades, páginas web y productos digitales para artistas, eventos, creadores y negocios.", url: "https://creator-forge-six.vercel.app", areaServed: { "@type": "Country", name: "Colombia" }, sameAs: ["https://github.com/jpcd-hub"], hasOfferCatalog: { "@type": "OfferCatalog", name: "Servicios Creator Forge", itemListElement: ["Diseño visual", "Desarrollo web", "Branding", "Inteligencia artificial", "TikTok Live", "Productos digitales"].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })) } };
  return <><a className="skip-link" href="#contenido">Saltar al contenido</a><Navbar /><main id="contenido" tabIndex={-1}><Hero /><Marquee /><Projects /><Services /><Positioning /><Process /><Stats /><About /><Pricing /><ContactForm /><FinalCTA /></main><Footer /><WhatsAppFloat /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} /></>;
}
