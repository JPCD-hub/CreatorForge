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

Abre `http://localhost:3000` en el navegador. Esta dirección solo se usa durante el desarrollo local; el sitio publicado no depende de ella.

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

### Capturas de proyectos

Las tarjetas de proyectos muestran capturas WebP en mockups de navegador y, para el sistema de fidelización, también en un mockup móvil. Los archivos están en `public/projects/`:

- `motherfunkys-desktop.webp`
- `vive-el-arte-desktop.webp`
- `fidelizacion-desktop.webp`
- `fidelizacion-mobile.webp`

Para actualizarlas, reemplaza cada archivo manteniendo el mismo nombre y formato WebP. Si una captura no se puede cargar, la tarjeta conserva un placeholder visual integrado como respaldo.

### Lista de valores editables

- `data/site.ts`: número de WhatsApp, enlaces sociales y correo.
- `data/projects.ts`: proyectos destacados y sus enlaces externos.
- `data/services.ts`: catálogo de servicios.
- `data/pricing.ts`: planes, precios y elementos incluidos.
- `app/layout.tsx`: dominio canónico y metadata SEO. Actualiza `metadataBase` cuando se asigne el dominio final en Vercel.

## Subir cambios a GitHub

El repositorio remoto ya está configurado como `https://github.com/JPCD-hub/CreatorForge`. Para publicar cambios posteriores:

```bash
git status
git add .
git commit -m "chore: prepara despliegue en Vercel"
git push origin main
```

## Despliegue

### Vercel

El proyecto no necesita variables de entorno ni un servidor propio para su versión actual. Está configurado con `output: "export"`, por lo que Vercel publicará el resultado estático generado en `out/`.

1. Confirma que `npm run build` termina correctamente en local.
2. Sube la rama `main` a GitHub.
3. Importa `JPCD-hub/CreatorForge` desde [Vercel](https://vercel.com/new).
4. Conserva el framework detectado, `Next.js`, y los comandos predeterminados: `npm install` y `npm run build`.
5. Pulsa **Deploy**. Cada `git push` posterior a `main` generará un despliegue de producción.

También se puede publicar desde la CLI de Vercel:

```bash
npm install -g vercel
vercel
vercel --prod
```

No es necesario configurar variables de entorno en Vercel actualmente. Cuando se añadan servicios externos o un backend, sus secretos deben crearse en el panel de Vercel y nunca incluirse en Git.

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
