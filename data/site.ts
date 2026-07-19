export const WHATSAPP_NUMBER = "573057376481";

export const SOCIAL_LINKS = {
  instagram: "#",
  tiktok: "#",
  github: "https://github.com/jpcd-hub",
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
  email: "mailto:correo@ejemplo.com",
};

export const whatsappLink = (message = "Hola Creator Forge, quiero iniciar un proyecto.") => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
