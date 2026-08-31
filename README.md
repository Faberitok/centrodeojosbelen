# Centro de Ojos Belén — Sitio institucional

Sitio institucional con una portada integral y páginas específicas para cataratas,
glaucoma, queratocono y retinopatía diabética.

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
  [slug]/page.tsx     páginas informativas específicas
  globals.css         paleta institucional y base tipográfica
  error.tsx           error boundary de la ruta
  not-found.tsx       404 con la identidad del centro
  icon.png            favicon (generado desde el isotipo)
  apple-icon.png      ícono de iOS
  opengraph-image.tsx imagen dinámica de OG y Twitter
  manifest.ts         web app manifest
  actions/
    contact.ts        Server Action del formulario → correo (sin persistencia)
  api/
    inbound/          webhook de Resend: reenvío del correo entrante
    maintenance/      desbloqueo de la página en construcción
components/
  layout/             Navbar, Footer
  sections/           bloques institucionales, servicios, estudios, tecnología y contacto
  shared/             primitivos, formulario, carrusel y WhatsApp
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
public/media/         selección de imágenes optimizadas y con nombres web-safe
docu/                 plan del proyecto y guía de configuración de cuentas
```

---

## Reglas del proyecto

**El contenido no se hardcodea.** Todo texto, dirección, horario, obra social y
teléfono sale de [`content/site.ts`](content/site.ts). Si hay que cambiar una
palabra en el sitio, se cambia ahí y en ningún otro lado.

**No se publican datos no confirmados.** Las coberturas, redes, horarios y correo
institucional se incorporan únicamente cuando el centro los valide. Mientras tanto,
la interfaz ofrece WhatsApp como canal confirmado.

**El cyan principal no va sobre blanco en texto chico.** `#219FC0` (accent-500)
no cumple WCAG AA para texto normal. Para texto usar `accent-700` o `brand-900`;
el cyan de marca se reserva para superficies, detalles y texto grande. El sistema está en
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
