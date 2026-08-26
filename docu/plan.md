# Technical Plan

## Stack Propuesto
- Next.js 15 con App Router.
- TypeScript.
- Tailwind CSS v4 para el sistema de estilos del front.
- Supabase para PostgreSQL y persistencia de mensajes.
- Vercel para deploy.
- Variables de entorno para correo de destino, WhatsApp y credenciales.

## Sistema de Diseño (basado en scraping de axiomait.com)

### Tipografía
El sitio de referencia usa Montserrat. Se elige **Plus Jakarta Sans** como alternativa: mismo espíritu geométrico y sans-serif moderno, pero con rasgos más refinados y distintos que la diferencian claramente.
- Fuente principal: `Plus Jakarta Sans` via `next/font/google`.
- H1: 52px / weight 800 / line-height 64px.
- H2: 24px / weight 700.
- Subtítulos: 21px / weight 600.
- Cuerpo: 15px / weight 400 / line-height 24px.
- Acento/CTA label: weight 500.

Disponible en Google Fonts con pesos 300–800. Se carga con `next/font/google` para optimización automática de subsets y zero layout shift.

### Tokens de Color en Tailwind
Extender el tema en `tailwind.config.ts` con la paleta slate del proyecto:
```ts
colors: {
  brand: {
    50:  '#EDEFF3',
    100: '#DEE2E9',
    200: '#C0C7D4',
    300: '#A1ABC0',
    400: '#8390AB',
    500: '#657596',
    600: '#515E77',
    700: '#3C4659',
    800: '#282E3A',
    900: '#13161C',
  }
}
```
Uso por escala:
- Fondos claros: `brand-50`, `brand-100`.
- Texto principal: `brand-900`, `brand-800`.
- Texto secundario / bordes: `brand-400`, `brand-300`.
- CTA primario (botón sólido): `brand-700` o `brand-800` con texto blanco.
- CTA outline: borde `brand-600`, fondo transparente.

### Layout
- Container: `max-w-[1140px] mx-auto px-6` (replicando el 1140px del sitio de referencia).
- Grids: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.
- Secciones: padding vertical generoso (`py-20` a `py-32`).

### Animaciones
- Animación de entrada en scroll para cards de servicios: CSS `@keyframes fadeInUp` activado por `IntersectionObserver` o clase Tailwind con `animation-delay`.
- Hover en cards: `transition-shadow duration-200 hover:shadow-lg`.
- No usar librerías pesadas de animación. CSS-first.
- Las animaciones son progressive enhancement: la página debe funcionar sin ellas.

## Objetivo Técnico
Construir una landing que se pueda desarrollar, probar y desplegar sin depender del entorno productivo. La implementación debe ser simple, modular y preparada para cambios de copy, assets o proveedor de correo.

## Arquitectura
### Frontend
Página principal en una sola experiencia de landing. Estructura de componentes:

```
app/
  page.tsx               → página principal (Server Component)
  layout.tsx             → metadata, fonts, globals
components/
  layout/
    Navbar.tsx           → sticky, responsive, dropdown mobile
    Footer.tsx           → multicolumna
  sections/
    Hero.tsx             → hero full-screen con foto + stats bar
    Services.tsx         → grid de cards con imagen + título + descripción
    Differentiator.tsx   → bloque de diferencial con lista de beneficios
    Process.tsx          → 4 pasos numerados
    Solutions.tsx        → pills de soluciones posibles
    Testimonials.tsx     → slider de testimonios
    ClientLogos.tsx      → logos de clientes en grid
    FooterCTA.tsx        → bloque de cierre con frase + botón
  shared/
    ContactForm.tsx      → formulario de contacto (Client Component)
    WhatsAppButton.tsx   → botón flotante fijo + variante inline
    Button.tsx           → botón reutilizable (solid / outline / ghost)
    SectionWrapper.tsx   → contenedor de sección con max-width y padding
public/
  images/
    hero-desktop.webp    → [ASSET PENDIENTE]
    hero-mobile.webp     → [ASSET PENDIENTE]
    services/            → imágenes de cada servicio [ASSET PENDIENTE]
    clients/             → logos de clientes [ASSET PENDIENTE]
```

- Server Components por defecto. Solo `ContactForm.tsx` y `WhatsAppButton.tsx` son Client Components.
- Tailwind CSS como capa principal de implementación visual, apoyada por los tokens de color definidos en el config.

### Backend
- Route Handler para procesar el formulario.
- Validación de payload en servidor.
- Persistencia del mensaje en PostgreSQL.
- Envío de correo al destinatario configurado.
- Respuesta clara para éxito y error.

### Datos
Tabla sugerida: `contact_messages`
- `id`
- `name`
- `email`
- `company` o `phone` si se decide incluirlo
- `message`
- `source`
- `status`
- `created_at`
- `metadata` opcional para contexto de origen

## Flujo de Contacto
1. El usuario completa el formulario.
2. El frontend valida datos mínimos.
3. Se envía un POST al endpoint de contacto.
4. El backend valida nuevamente, guarda en la base y dispara el correo.
5. Se retorna estado final para mostrar confirmación.

## Integración de Correo
- Definir un adaptador de envío para evitar acoplar la landing a un proveedor único.
- Usar un correo destino configurable por entorno.
- Mantener la posibilidad de cambiar el proveedor sin reescribir el formulario.
- Si hace falta una prueba local sin proveedor real, dejar una estrategia de desarrollo que registre el mensaje o use un entorno de test.

## WhatsApp
- `WhatsAppButton.tsx` como Client Component con dos variantes: `floating` (fijo en esquina inferior derecha) e `inline` (dentro de secciones).
- El número se lee de `process.env.NEXT_PUBLIC_WHATSAPP_NUMBER` (formato internacional sin `+`, ej. `5491112345678`).
- Link generado: `https://wa.me/${NEXT_PUBLIC_WHATSAPP_NUMBER}`.
- Abrir en nueva pestaña (`target="_blank" rel="noopener noreferrer"`).
- El botón floating se monta en `layout.tsx` para que esté presente en toda la página.

## Local Development
- Poder ejecutar la app en local con `npm run dev` o el script equivalente.
- Configurar `.env.local` con credenciales de Supabase y parámetros de contacto.
- Si se necesita paridad completa con base local, usar Supabase local o un proyecto de desarrollo separado.
- Incluir datos mínimos de prueba si la landing los necesita.

## Deploy
- Vercel para build y hosting.
- Variables de entorno cargadas en Vercel para producción.
- Supabase como base administrada.
- Verificar que la ruta de contacto funcione en producción y no solo en local.

## Best Practices de Implementación
- Preferir Server Components por defecto y pasar a client solo donde haga falta interacción.
- Mantener el formulario como client component aislado.
- Usar `next/font` para tipografía si se elige una fuente externa o local.
- Usar `next/image` para cualquier imagen real.
- Definir metadata y Open Graph desde el inicio.
- Evitar dependencias innecesarias.
- No meter lógica de negocio en componentes visuales.
- Mantener el código listo para cambios de copy sin tocar estructura.

## Assets y Contenido

### Imágenes (patrón extraído del sitio de referencia)
El sitio de referencia usa fotografías reales en formato `.webp` para:
- Hero: 2 versiones — `hero-desktop.webp` (full-screen) y `hero-mobile.webp` (600px min-height, encuadre diferente).
- Services: imágenes landscape 800×500px, una por servicio.

Mientras no estén disponibles:
- Hero: placeholder con fondo `brand-900` + gradiente diagonal suave.
- Services: placeholder con `aspect-ratio: 800/500`, fondo `brand-200`, texto centrado indicando el servicio.
- Todos los placeholders usan `next/image` con `width`/`height` fijos para evitar layout shift.

### Copy
- Los textos de sección están definidos en `req.md`. No hardcodearlos dispersos en componentes; centralizar en un archivo `content/landing.ts` para facilitar cambios.

### Variables de Entorno requeridas
```
NEXT_PUBLIC_WHATSAPP_NUMBER=   # número sin +, ej. 5491112345678
CONTACT_EMAIL_TO=              # correo destino del formulario
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=     # solo en servidor
EMAIL_PROVIDER_API_KEY=        # proveedor de correo a confirmar
```

## Decisiones Abiertas
| # | Decisión | Impacto | Estado |
|---|----------|---------|--------|
| 1 | Proveedor de correo (Resend, SendGrid, nodemailer+SMTP) | Ruta `/api/contact` y variable de entorno | Pendiente |
| 2 | Campos del formulario (nombre, email, mensaje + ¿teléfono/empresa?) | Schema de tabla `contact_messages` | Pendiente |
| 3 | Supabase local vs remoto en desarrollo | Setup de `.env.local` | Pendiente |
| 4 | Foto del hero (cliente la provee vs stock gratuito) | Placeholder hasta resolución | Pendiente |
| 5 | Fotos de servicios (cliente vs stock gratuito tipo Unsplash) | Placeholders hasta resolución | Pendiente |
| 6 | Testimonios reales disponibles | Sección se renderiza o se oculta | Pendiente |
| 7 | Logos de clientes disponibles | Sección se renderiza o se oculta | Pendiente |

## Entregable Esperado
Una landing lista para producción, con buena experiencia local, contacto por mail, contacto por WhatsApp, y una base técnica simple para iterar sobre copy, diseño y tracking sin rearmar la arquitectura.
