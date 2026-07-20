import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/site";

export function WhatsAppFloat() {
  return <a className="whatsapp-float" href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Hablar con Creator Forge por WhatsApp, abre en una pestaña nueva"><MessageCircle size={21} /></a>;
}
