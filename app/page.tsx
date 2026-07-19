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
  return <main><Navbar /><Hero /><Marquee /><Projects /><Services /><Positioning /><Process /><Stats /><About /><Pricing /><ContactForm /><FinalCTA /><Footer /><WhatsAppFloat /></main>;
}
