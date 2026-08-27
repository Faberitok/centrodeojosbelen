# Centro de Ojos Belén — Landing institucional

Landing page institucional de una sola página para el Centro de Ojos Belén.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Resend · Vercel

Sin base de datos: las consultas del formulario se envían por correo y no se
persisten en ningún lado.

---

## Puesta en marcha

```bash
npm install
cp .env.example .env.local
npm run dev
```

El sitio queda en http://localhost:3000. Con `make` disponible, `make setup`
hace los dos primeros pasos.

Para que el formulario envíe de verdad en local hace falta `RESEND_API_KEY` y
`CONTACT_EMAIL_TO` en `.env.local`. Sin eso, la ruta devuelve 500 con un mensaje
que ofrece WhatsApp como alternativa — que es el comportamiento correcto en
producción, no un error de configuración local.

---

## Estructura

```
app/
  layout.tsx          metadata, viewport, tipografía, JSON-LD, analytics
  page.tsx            composición de la landing
  globals.css         paleta institucional y base tipográfica
  error.tsx           error boundary de la ruta
  not-found.tsx       404 con la identidad del centro
  icon.png            favicon (generado desde el isotipo)
  apple-icon.png      ícono de iOS
  opengraph-image.jpg imagen de OG y Twitter (convención de archivo)
  manifest.ts         web app manifest
  actions/
    contact.ts        Server Action del formulario → correo (sin persistencia)
  api/
    inbound/          webhook de Resend: reenvío del correo entrante
    maintenance/      desbloqueo de la página en construcción
components/
  layout/             Navbar, Footer
  sections/           Hero, Services, About, HealthPlans, Locations, Faq, Contact, MaintenanceGate
  shared/             Button, ContactForm, SectionWrapper, ServiceIcon, WhatsAppButton
content/
  site.ts             ← TODO el contenido del sitio vive acá
  brand.ts            nombre y archivos del logo (seguro para el cliente)
  maintenance.ts      textos de la página en construcción
lib/
  email/              adaptador de correo (Resend)
  maintenance/        autenticación de la página en construcción
  security/           rate limit en memoria del formulario
  seo/                JSON-LD MedicalClinic
  validators/         esquemas Zod
  whatsapp.ts         armado del enlace al chatbot
public/               logos, isotipos e imágenes
docu/                 plan del proyecto y guía de configuración de cuentas
```

---

## Reglas del proyecto

**El contenido no se hardcodea.** Todo texto, dirección, horario, obra social y
teléfono sale de [`content/site.ts`](content/site.ts). Si hay que cambiar una
palabra en el sitio, se cambia ahí y en ningún otro lado.

**Los placeholders están marcados.** El sitio arranca con contenido de
referencia, acordado con el cliente en el kick-off. Para encontrar lo que falta
reemplazar:

```bash
grep -rn "PLACEHOLDER" content/
```

**El cyan no va sobre blanco en texto chico.** `#219FC0` (accent-500) da 3.10:1
contra blanco y no cumple WCAG AA. Para texto y botones usar `accent-600`
(5.10:1) o `brand-900` (15.01:1). El detalle está comentado en
[`app/globals.css`](app/globals.css).

**Todo funciona sin JavaScript.** El formulario es una Server Action, no un
`fetch` a un endpoint: se envía igual con JS deshabilitado. Los desplegables de
servicios y de preguntas frecuentes son `<details>` nativos. Las animaciones son
progressive enhancement y respetan `prefers-reduced-motion`.

**El formulario va por Server Action, no por route handler.** Los `route.ts` del
proyecto quedan para lo que de verdad los necesita: el webhook de Resend y el
desbloqueo del modo mantenimiento.

**Un módulo `'use server'` solo puede exportar funciones async.** Por eso el
tipo `ContactState` y su valor inicial viven en `lib/validators/contact.ts` y no
junto a la action.

**Los componentes de cliente no importan de `content/site.ts`.** Todo lo que
importa un componente de cliente se empaqueta y se descarga en el navegador. Si
la página en construcción importara de `site.ts`, mandaría al visitante los
servicios, las obras sociales, las sedes y los teléfonos —justo lo que todavía
no debería ver—. Por eso existen [`content/brand.ts`](content/brand.ts) y
[`content/maintenance.ts`](content/maintenance.ts): módulos chicos y sin
contenido institucional. Para comprobarlo, buscar los datos del sitio dentro de
los chunks que sirve la página:

```bash
grep -rl "OSDE" .next/static/chunks/
```

---

## Página en construcción

Con `MAINTENANCE_MODE_ENABLED=true`, todo visitante ve la página en construcción
con el logo del centro, y el sitio se declara `noindex`. El equipo entra con la
contraseña desde el desplegable "Acceso para el equipo".

Generar el hash de la contraseña:

```bash
node -e "console.log('sha256:' + require('crypto').createHash('sha256').update('TU-CONTRASEÑA').digest('hex'))"
```

---

## Documentación

- [`docu/00-plan-transformacion.md`](docu/00-plan-transformacion.md) — plan del proyecto, decisiones y fases
- [`docu/01-configuracion-de-cuentas.md`](docu/01-configuracion-de-cuentas.md) — Don Web, Vercel, Resend, Gmail y Google, paso a paso

---

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción (correr `build` antes) |
| `npm run lint` | ESLint |

---

## Skills del repositorio

`.github/skills/` contiene las guías que sigue este código:

- **`next-best-practices`** — se aplica completa: convenciones de archivo, límites RSC, metadata, `next/image`, `next/font`, route handlers vs Server Actions.
- **`frontend-design`** — se aplica la parte de evitar estética genérica. **No** se aplica su recomendación de elegir una dirección estética extrema: el público del centro incluye adultos mayores y personas con baja visión, donde legibilidad y confianza pesan más que impacto visual.
- **`landing-page-copywriter`** — se aplica el enfoque en beneficios, el lenguaje en segunda persona y el manejo de objeciones vía FAQ. **No** se aplican urgencia, escasez, garantías ni "risk reversal": en publicidad sanitaria no corresponde prometer resultados.
