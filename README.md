# Creator Forge

Sitio web de Creator Forge, un estudio creativo y tecnológico que combina diseño visual, desarrollo web, branding, inteligencia artificial y productos digitales para artistas, creadores, eventos y negocios.

Está construido con Next.js, TypeScript, Tailwind CSS y Framer Motion. No depende de imágenes pesadas ni servicios externos para sus composiciones visuales.

## Requisitos

- Node.js 20 o superior
- npm 10 o superior

## Instalación y ejecución

```bash
npm install
npm run dev
```

Abre `http://localhost:3000` en el navegador.

Para comprobar la versión de producción:

```bash
npm run lint
npm run build
```

El proyecto está configurado con `output: "export"`, por lo que `npm run build` genera una versión estática en `out/`.

## Personalización rápida

### WhatsApp

El número se define una sola vez en `data/site.ts`:

```ts
export const WHATSAPP_NUMBER = "573057376481";
```

Reemplázalo por el número que recibirá las cotizaciones en formato internacional, sin `+`, espacios ni guiones. El formulario construye el mensaje y abre WhatsApp automáticamente.

### Redes y correo

Edita el objeto `SOCIAL_LINKS` en `data/site.ts`:

```ts
export const SOCIAL_LINKS = {
  instagram: "#",
  tiktok: "#",
  github: "https://github.com/jpcd-hub",
  whatsapp: "...",
  email: "mailto:correo@ejemplo.com",
};
```

### Proyectos, servicios y precios

- Proyectos: `data/projects.ts`
- Servicios: `data/services.ts`
- Planes iniciales: `data/pricing.ts`

Los componentes consumen esos datos, de modo que se pueden ampliar sin modificar la estructura de las secciones.

## Despliegue

### Vercel

1. Sube el repositorio a GitHub.
2. Importa el repositorio en [Vercel](https://vercel.com/new).
3. Vercel detectará Next.js y ejecutará el build automáticamente.

### Sitio estático

Después de ejecutar `npm run build`, publica el contenido de `out/` en GitHub Pages, Netlify, Cloudflare Pages u otro hosting estático. Si se usa GitHub Pages en un repositorio bajo una ruta base, configura `basePath` y `assetPrefix` en `next.config.ts` según el nombre del repositorio.

## Estructura

```text
app/          Rutas, metadata, sitemap, robots y estilos globales
components/   Secciones y componentes de interfaz reutilizables
data/         Contenido editable y constantes de contacto
public/       Logo temporal y favicon SVG
```

El diseño incluye secciones para proyectos, capacidades, proceso, estadísticas, presentación, planes, cotización y CTA. Está preparado para responder desde 320 px hasta pantallas amplias y respeta la preferencia de movimiento reducido.

## Creator Forge OS — Roadmap

### Fase 2

- Casos de estudio individuales.
- Blog.
- SEO avanzado.
- CMS.
- Analytics.
- Formulario conectado a correo.

### Fase 3

- Panel administrativo.
- CRM de clientes.
- Cotizaciones.
- Contratos.
- Facturación.
- Agenda.
- Área de clientes.

### Fase 4

- Productos digitales.
- Pagos.
- Suscripciones.
- Automatizaciones.
- Creator Forge OS.

La actual separación entre contenido (`data/`) y presentación (`components/`) permite incorporar estas fases sin reemplazar la interfaz pública.
