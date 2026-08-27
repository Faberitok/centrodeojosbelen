# Plan de transformación — FaberIT landing → Centro de Ojos Belén

**Base:** clon del repo de www.faberit.com.ar (Next.js 16.2.6 / React 19 / Tailwind v4 / App Router)
**Destino:** landing institucional one-page de un centro oftalmológico, en https://www.centrodeojosbelen.com.ar
**Fuentes:** `Docu/Centro de Ojos Belen - Kick-off Landing Page.docx` + `Brandboard - Centro de Ojos Belén.pdf`

---

## 0. Diagnóstico de la base

Lo que **se reutiliza tal cual** (arquitectura sana, solo cambia contenido y color):

| Archivo | Uso en el nuevo sitio |
|---|---|
| `app/layout.tsx` | shell, fuentes, metadata — se reescribe el contenido, se mantiene la estructura |
| `app/page.tsx` | composición one-page — cambia el orden de secciones |
| `components/shared/SectionWrapper.tsx` | contenedor 1140px — sin cambios |
| `components/shared/Button.tsx` | variantes solid/outline/ghost — solo cambian tokens |
| `components/shared/WhatsAppButton.tsx` | flotante + inline — **clave**, es la puerta al chatbot |
| `components/shared/ContactForm.tsx` | formulario — se ajustan campos y se saca `company` |
| `components/layout/Navbar.tsx` / `Footer.tsx` | mismo patrón, otro contenido |
| `components/sections/Services.tsx` | grid de tarjetas con panel expandible → **Servicios y Especialidades** |
| `components/sections/Solutions.tsx` | chips con tooltip → base para **Obras Sociales** |
| `components/sections/MaintenanceGate.tsx` + `lib/maintenance/*` | útil para tener el sitio cerrado hasta la aprobación del cliente |
| `lib/security/maintenanceRateLimit.ts` | patrón de rate-limit en memoria, se reusa para el form |
| `app/robots.ts` / `app/sitemap.ts` | sin cambios de lógica |
| `app/api/inbound/route.ts` | forwarding de correo entrante vía Resend (ver §5) |

Lo que **se elimina**:

- **Persistencia:** `lib/db/contact.ts`, `db/` completo, `docker-compose.yml`, targets `db-*` del `Makefile`, deps `@supabase/supabase-js`, `pg`, `@types/pg`, y las vars `DATABASE_URL` / `SUPABASE_*`.
- **Secciones sin lugar en el kick-off:** `Testimonials.tsx`, `ClientLogos.tsx`, `FooterCTA.tsx` (esta última ya era código muerto: no está importada en `app/page.tsx`).
- **Todo rastro de FaberIT:** `app/layout.tsx` (metadata), `content/landing.ts` (copy completo), `.specify/memory/constitution.md`, `docu/*.md`, `public/images/faberit_og.webp`, `public/images/logo.png`, `public/favicon.png`, `app/icon.png`.
- **Imágenes de referencia:** las 6 `.webp` de servicios pesan **72 MB en total** (una sola, `soluciones-ia.webp`, pesa 28 MB). Se borran todas; los reemplazos entran optimizados a ≤ 300 KB.

Lo que **se repurposea** (decisión abierta, ver §9):

- `components/sections/Process.tsx` (4 pasos numerados) → **"Preparación para estudios"**. El kick-off §5 menciona "preparaciones" como contenido que alimenta al chatbot, pero no lo lista como sección del sitio. Queda opcional.
- `components/sections/Differentiator.tsx` (bloque + lista de beneficios) → base de **Sobre el Centro**.

---

## 1. Identidad visual

### Colores (del brandboard)

Dos colores institucionales: `#219FC0` (cyan) y `#202055` (azul noche).

El sistema actual usa una única rampa `--color-brand-50…900` de grises azulados. Se reemplaza por **dos rampas**, en `app/globals.css` (bloque `@theme` de Tailwind v4 — este proyecto no tiene `tailwind.config.ts`):

```css
@theme {
  /* Azul noche — ancla #202055 en 900 */
  --color-brand-50:  #F5F6FA;
  --color-brand-100: #EEEBF8;
  --color-brand-200: #D9D5E7;
  --color-brand-300: #C0BBD4;
  --color-brand-400: #A39DBC;
  --color-brand-500: #867FA4;
  --color-brand-600: #6F6892;
  --color-brand-700: #5A5481;
  --color-brand-800: #464171;
  --color-brand-900: #202055;  /* ← color de marca */
  --color-brand-950: #14143A;

  /* Cyan — ancla #219FC0 en 500 */
  --color-accent-50:  #E2FAFF;
  --color-accent-100: #D3F1FE;
  --color-accent-200: #B2DEEF;
  --color-accent-300: #88C7DE;
  --color-accent-400: #4DACCA;
  --color-accent-500: #219FC0;  /* ← color de marca */
  --color-accent-600: #007895;
  --color-accent-700: #00637F;
  --color-accent-800: #005069;
  --color-accent-900: #003D54;
  --color-accent-950: #002B40;
}
```

Los pasos intermedios se derivan interpolando en espacio **Lab** con caída de
croma hacia los extremos: así el barrido queda perceptualmente parejo y los
tonos claros no se van al lavanda, que es lo que pasa si se interpola en HSL.

**Restricción de contraste — importante.** El cyan puro `#219FC0` da **3.10:1** contra blanco. No cumple WCAG AA (4.5:1) ni como texto sobre blanco ni como fondo de botón con texto blanco. Reglas de uso:

- **CTA primario** ("Sacar turno"): fondo `brand-900` + texto blanco → **15.01:1**.
- **CTA secundario / links**: `accent-600` (`#007895`) → **5.10:1** contra blanco. Cumple AA.
- **`accent-500` puro**: solo para superficies grandes, gráficos, íconos decorativos, bordes y estados hover. Nunca como fondo de texto chico.
- Sobre fondo `brand-900`, el `accent-300/400` sí funciona como texto de acento.

Esto importa especialmente en un sitio de salud visual, donde parte del público tiene baja visión.

### Tipografía

El brandboard define **Museo Sans 900** (títulos) y **Fair Prosper** (script, la palabra "Belén" del isologo). Ninguna de las dos está en Google Fonts — son comerciales.

Dos caminos, en orden de preferencia:

1. **Si el centro tiene la licencia web** de Museo Sans: pasame los `.woff2` y los cargo con `next/font/local` (self-hosted, cero layout shift, sin request a terceros).
2. **Si no**: sustituto libre. Recomiendo **Figtree** (`next/font/google`) — geométrica-humanista, el pariente libre más cercano a Museo Sans; en weight 800/900 sostiene bien los títulos. Alternativa: Montserrat, más ancha y más genérica.

**Fair Prosper no se carga como webfont.** El único lugar donde aparece es dentro del isologo, que es un asset. Meter un script de ~40 KB para una palabra que ya viene dibujada es costo puro.

Escala tipográfica (ajuste sobre la actual, subiendo el cuerpo — público mayor):

- H1: 44–52px / 800 · H2: 32–36px / 700 · H3: 20–24px / 700
- Cuerpo: **17px** / 400 / line-height 1.65 (la base actual usa 15px, corto para este público)
- Mínimo absoluto de texto legible: 15px. Nada de 12–13px salvo labels de formulario.

---

## 2. Estructura del sitio

One-page con scroll suave, según kick-off §2. `app/page.tsx` queda:

| # | Sección | Ancla | Componente | Origen |
|---|---|---|---|---|
| 1 | Inicio | `#inicio` | `Hero.tsx` | reescritura de `Hero.tsx` |
| 2 | Servicios y Especialidades | `#servicios` | `Services.tsx` | reuso |
| 3 | Sobre el Centro | `#nosotros` | `About.tsx` (incluye el equipo) | reescritura de `Differentiator.tsx` |
| 4 | Obras Sociales | `#obras-sociales` | `HealthPlans.tsx` | adaptación de `Solutions.tsx` |
| 5 | Sedes y Horarios | `#sedes` | `Locations.tsx` | **nuevo** |
| 6 | Preguntas frecuentes | `#preguntas` | `Faq.tsx` | **nuevo** |
| 7 | Contacto | `#contacto` | `Contact.tsx` + `ContactForm.tsx` | nuevo + reuso |
| 8 | Pie de página | — | `Footer.tsx` | reuso |

> La sección de preguntas frecuentes no estaba en el kick-off. Se suma porque
> resuelve las objeciones que frenan a un paciente antes de pedir turno, porque
> aporta el JSON-LD de `FAQPage` que Google despliega en los resultados, y
> porque es el contenido de "preparaciones" que el kick-off §5 menciona como
> base de conocimiento del chatbot.

Notas por sección:

**1 · Hero.** Imagen del centro + mensaje institucional breve + dos CTAs: *"Sacar un turno"* (→ WhatsApp/chatbot) y *"Ver servicios"*. El `Hero.tsx` actual usa `min-h-screen` con overlay degradado; se baja a `min-h-[85vh]` para que se vea que hay contenido abajo, y el overlay pasa a `brand-900`. En mobile los CTAs se apilan a ancho completo (≥48px de alto táctil).

**2 · Servicios.** Tarjeta con ícono (o foto, cuando el centro las provea) + título + descripción breve, y el detalle en un `<details>` nativo. Se descartó el panel expandible del componente original: eran 403 líneas de estado y refs para lograr algo que el navegador ya hace, accesible por teclado y funcionando sin JavaScript — que en un sitio de salud importa, porque el contenido queda disponible aunque falle el bundle. La grilla se adapta sola a la cantidad de servicios.

**3 · Sobre el Centro.** Bloque institucional (trayectoria, enfoque) + tarjetas de diferencial + grilla de equipo profesional con foto, nombre, especialidad y matrícula. Publicar matrícula es estándar en salud y suma confianza; se define con el centro qué datos se publican. Sin foto, la tarjeta muestra el isotipo del centro en lugar de un avatar genérico.

**4 · Obras Sociales.** Es la consulta más frecuente del rubro, así que va con buscador. Los chips de `Solutions.tsx` se convierten en grilla alfabética con filtro por texto en cliente (sin dependencias nuevas). Cada obra social puede llevar una nota de condiciones ("requiere orden", "solo consultas"). Debajo, aviso de que las coberturas pueden cambiar y CTA a WhatsApp para confirmar.

**5 · Sedes y Horarios.** Nuevo. Por sede: dirección completa, teléfono, días y horarios en tabla legible, y mapa. Para el mapa uso un `<iframe>` de Google Maps con `loading="lazy"` (sin API key, sin costo) más un botón *"Cómo llegar"* que abre la app de mapas nativa del dispositivo. Si hay más de una sede, tabs o acordeón.

**6 · Contacto.** Formulario (§4) + datos directos: teléfonos con `tel:`, correo con `mailto:`, y botón WhatsApp inline.

**7 · Footer.** Navegación resumida, contacto, sedes, redes. La lógica de íconos de redes en `Footer.tsx` está hardcodeada con `s.label === 'LinkedIn'`; se refactoriza a un mapa `icon → SVG` para poder sumar Facebook/Instagram sin tocar el JSX.

**WhatsApp flotante:** visible en todo el recorrido (kick-off §1). Ya funciona así vía `layout.tsx`. Falta verificar que no tape el footer en mobile y que `NEXT_PUBLIC_WHATSAPP_MESSAGE` sea el saludo que espera el chatbot.

---

## 3. Contenido

`content/landing.ts` se reescribe completo como **`content/site.ts`**, manteniendo la regla de la constitución del repo: *cero copy hardcodeado en el JSX*.

Estructura de exports:

```
site          → nombre, dominio, descripción corta
nav           → links + CTA
hero          → título, subtítulo, CTAs, imagen
services[]    → { id, slug, title, description, details[], image }
about         → intro institucional + valores
team[]        → { name, role, specialty, license?, photo? }
healthPlans[] → { name, logo?, note? }
locations[]   → { name, address, city, phones[], hours[], mapsEmbedUrl, mapsDirectionsUrl }
contact       → heading, subtext, email, phones[], whatsapp
footer        → links, social[], legal
```

Todo tipado con `interface` + `as const` donde corresponda, para que el día que el contenido se mueva a un CMS el cambio quede localizado.

**Contenido de referencia.** El kick-off §4 acuerda arrancar con textos e imágenes placeholder. Lo escribo con copy oftalmológico plausible, marcado con un comentario `// PLACEHOLDER — reemplazar con contenido definitivo del centro` en cada bloque, para que la etapa final de reemplazo sea un grep.

---

## 4. Sin base de datos

Confirmado: los mensajes **no se persisten**. Consecuencias a cubrir:

1. **`app/api/contact/route.ts` se reescribe.** Hoy hace `insertContactMessage()` y después dispara el mail en fire-and-forget (`route.ts:50-77`). Sin DB ese patrón es peligroso: si Resend falla, el mensaje **se pierde en silencio** y el usuario ve "enviado". El envío pasa a ser `await`-eado, y si falla se devuelve 500 con un mensaje accionable que ofrece WhatsApp como alternativa.
2. **Anti-spam sin DB.** Sin persistencia no hay historial, así que la defensa es en tres capas baratas:
   - *honeypot*: campo oculto que los bots completan y los humanos no;
   - *time-trap*: descartar envíos con menos de ~3 segundos desde el render;
   - *rate-limit en memoria* por IP, reusando el patrón de `lib/security/maintenanceRateLimit.ts`.

   Salvedad honesta: en Vercel el rate-limit en memoria es por instancia y se pierde en cada cold start. Es mitigación, no barrera. Si aparece spam real, el paso siguiente es Cloudflare Turnstile (gratis, sin cookies) — no lo agrego ahora por no sumar dependencias sin necesidad.
3. **Datos de salud.** El formulario **no** debe pedir ni invitar a escribir información clínica. Va un `<p>` bajo el textarea: *"No incluyas información médica en este formulario"*, y una nota de privacidad breve (los datos se usan solo para responder la consulta y no se almacenan). Relevante por Ley 25.326.
4. **Campos** (kick-off §2.6): nombre, correo, teléfono, mensaje. Se elimina `company` de `lib/validators/contact.ts`, del form y del template de correo. `phone` pasa a requerido — en salud es el canal real de respuesta.

---

## 5. Correo y dominio

- **Dominio:** `centrodeojosbelen.com.ar` (ya comprado) → Vercel. `NEXT_PUBLIC_SITE_URL=https://www.centrodeojosbelen.com.ar`, con redirect de apex a www (o al revés — hay que elegir una y ser consistente en canonical + sitemap + robots).
- **Casilla institucional:** `contacto@centrodeojosbelen.com.ar`.
  > En el brief figura como `contacto@centrosdeojosbelen.com.ar` (con "s"). Asumo que es tipeo y que va sin la "s", igual que el dominio.
- **Envío (Resend):** verificar el dominio en Resend (SPF + DKIM + DMARC). `RESEND_FROM_EMAIL=web@centrodeojosbelen.com.ar` (remitente técnico, distinto de la casilla que lee el centro), `CONTACT_EMAIL_TO=contacto@centrodeojosbelen.com.ar`.
- **Recepción:** decisión pendiente, dos caminos:
  - **(a) Casilla real** (Zoho Mail gratis / Google Workspace pago): el centro entra y responde desde `contacto@`. Es lo que un consultorio espera.
  - **(b) Resend Inbound** (`app/api/inbound/route.ts`, ya implementado): reenvía a un Gmail existente. Más simple y sin costo, pero es forwarding — responder desde esa dirección requiere configurar SMTP en Gmail.

  Recomiendo **(a) Zoho Mail** por el plan gratuito con dominio propio. Los MX de la casilla y los de Resend Inbound **compiten entre sí**: hay que elegir uno.

---

## 6. Variables de entorno

`.env.example` queda:

```
# App
NEXT_PUBLIC_SITE_URL=https://www.centrodeojosbelen.com.ar

# WhatsApp → chatbot del centro
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hola, quisiera hacer una consulta.

# Correo (Resend)
RESEND_API_KEY=
RESEND_FROM_EMAIL=web@centrodeojosbelen.com.ar
CONTACT_EMAIL_TO=contacto@centrodeojosbelen.com.ar
INBOUND_FORWARD_TO=

# Modo mantenimiento (sitio cerrado hasta aprobación del cliente)
MAINTENANCE_MODE_ENABLED=false
MAINTENANCE_PASSWORD_HASH=
MAINTENANCE_COOKIE_SECRET=
MAINTENANCE_COOKIE_NAME=maintenance_auth
MAINTENANCE_COOKIE_TTL_SECONDS=28800
MAINTENANCE_MAX_ATTEMPTS=5
MAINTENANCE_ATTEMPT_WINDOW_SECONDS=900
MAINTENANCE_LOCKOUT_SECONDS=900
```

Se van: `DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

---

## 7. SEO, performance y analítica

Todo esto está en el kick-off §3 como compromiso acordado:

- **Metadata** (`app/layout.tsx`): title tipo `Centro de Ojos Belén — Oftalmología en {ciudad}`, description con las especialidades reales, `locale: es_AR`, canonical, OG + Twitter con imagen 1200×630.
- **JSON-LD `MedicalClinic`**: el mayor diferencial de SEO local para un consultorio. Por sede: `address`, `geo`, `telephone`, `openingHoursSpecification`, `medicalSpecialty: Ophthalmologic`. Se inyecta como `<script type="application/ld+json">` desde los datos de `content/site.ts` — una sola fuente para el sitio, el schema y el chatbot (kick-off §5: "fuente única de información").
- **Performance**: imágenes con `next/image` y `sizes` correctos, `priority` solo en el hero, el resto lazy. Presupuesto: **≤ 300 KB por imagen**, hero ≤ 400 KB. Objetivo LCP < 2.5s en 4G, que es la conexión real del paciente que busca "oftalmólogo cerca".
- **Analítica**: `@vercel/analytics` — una línea en el layout, sin cookies, sin banner de consentimiento. Si el centro quiere GA4 después, se suma. Empezar con Vercel evita el cookie banner, que en una landing de 7 secciones es fricción pura.
- **Accesibilidad**: contraste AA (§1), navegación por teclado, `prefers-reduced-motion` respetado en las animaciones de `Services.tsx`, `alt` real en todas las imágenes, targets táctiles ≥ 44px.
- **HTTPS**: automático en Vercel.

---

## 8. Fases de ejecución

| Fase | Qué | Estado |
|---|---|---|
| **0 · Limpieza** | Purga de FaberIT (env, config, copy, docs, assets). Baja de Supabase/pg/Docker/`db/`. Borrado de secciones e imágenes no usadas. | ✅ **Hecho** — sin rastros en código, config ni assets; build y lint OK. Las únicas menciones que quedan son en `docu/`, donde FaberIT es el proveedor, no la marca del sitio. |
| **1 · Identidad** | Paleta derivada de los dos colores del branding, Figtree, logo en Navbar/Footer, `app/icon.png` + `apple-icon.png`, OG image, metadata. | ✅ **Hecho** |
| **2 · Contenido** | `content/site.ts` tipado, con copy e imágenes de referencia marcadas como placeholder. | ✅ **Hecho** |
| **3 · Secciones** | Hero, Servicios, Sobre el Centro + Equipo, Obras Sociales, Sedes + mapa, Contacto, Footer, página en construcción. | ✅ **Hecho** |
| **4 · Formulario** | Campos nuevos, validación cliente+servidor, envío por Resend sin DB, honeypot + time-trap + rate-limit, avisos de privacidad y de datos de salud. | ✅ **Hecho** — probadas las 4 rutas de error |
| **5 · SEO / perf / a11y** | JSON-LD `MedicalClinic`, sitemap, robots, Vercel Analytics, `sizes` en todas las imágenes, escala tipográfica a 17px. | ✅ **Hecho** — falta correr Lighthouse contra producción |
| **6 · Deploy** | Vercel, dominio, DNS, verificación de Resend, casilla institucional, modo mantenimiento activo hasta el OK. | ⏳ **Pendiente** — ver `01-configuracion-de-cuentas.md` |
| **7 · Contenido definitivo** | Reemplazo de placeholders por textos, fotos y datos reales del centro (kick-off §4). | ⏳ **Pendiente** — bloqueado por el material del cliente |

Las fases 0–5 no dependen de que el cliente entregue material: arrancan con contenido de referencia, que es exactamente lo acordado en el kick-off §4.

---

## 9. Decisiones

**Tomadas:**

| Decisión | Resolución |
|---|---|
| Correo | **Resend + Gmail**. Resend Inbound recibe en el dominio y reenvía al Gmail del centro; Gmail responde desde `contacto@` vía SMTP de Resend. Mismo esquema que FaberIT. |
| Tipografía | **Figtree** como sustituto de Museo Sans. Si aparece la licencia web, se cambia a `next/font/local` sin tocar el resto (la variable CSS no cambia). |
| Analítica | **Vercel Analytics**. Sin cookies, sin banner de consentimiento. GA4 queda para más adelante si el centro lo pide. |
| Paleta | Barrido de tonalidades derivado en espacio Lab a partir de los dos colores del brandboard. |

**Pendientes:**

1. **Ciudad y provincia del centro** — hoy figura San Fernando del Valle de Catamarca como placeholder en `content/site.ts`.
2. **Cantidad de sedes** — con más de una hay que decidir entre tarjetas apiladas (lo que hay hoy) o tabs.
3. **Sección "Preparación para estudios"** — no está en las 7 secciones del kick-off. ¿Se suma?
4. **Equipo profesional** — ¿se publican fotos y matrículas, o solo nombres y especialidades?

---

## 10. Material que necesito del centro

**Marca: ✅ recibida.** Los PNG están en `public/` (isologo color y versión fondo,
isotipo en ambas, avatares e íconos circulares). De ahí se generaron `app/icon.png`,
`app/apple-icon.png` y la imagen OG.

Sigue siendo deseable, aunque no bloquea: el **isologo y el isotipo en SVG**. Los
PNG actuales son de ~1180px de ancho y se ven bien, pero un SVG rinde mejor en
pantallas de alta densidad y pesa menos.

- **Museo Sans / Fair Prosper**: los `.woff2` + licencia web, si los tienen.

**Contenido** (kick-off §6 — se puede entregar por partes, no bloquea el arranque):

- Textos institucionales (presentación del centro, enfoque, trayectoria).
- Listado de servicios / estudios / cirugías con descripción breve de cada uno.
- Equipo profesional: nombres, especialidades, matrículas, fotos.
- Listado de obras sociales + condiciones particulares.
- Sedes: direcciones completas, teléfonos, días y horarios.
- Teléfonos, correo institucional y redes sociales.
- Fotos del consultorio, equipamiento y equipo, **con derechos de uso**.
- Número de WhatsApp que conecta con el chatbot.

---

## 11. Fuera de alcance (kick-off §8)

Identidad de marca, producción de contenidos (redacción profesional, fotografía, video), entrega del código fuente, mantenimiento mensual, campañas de publicidad, y secciones dinámicas (blog, turnos web propios, tienda, área de pacientes).
