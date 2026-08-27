# Configuración de cuentas y servicios

Guía operativa para poner el sitio en producción. El orden importa: cada paso
depende del anterior.

| Servicio | Para qué | Costo |
|---|---|---|
| Don Web | Registro del dominio `centrodeojosbelen.com.ar` y administración de DNS | Ya pago (renovación anual) |
| Vercel | Hosting y HTTPS del sitio | Plan Hobby gratuito |
| Resend | Envío del formulario y recepción del correo del dominio | Plan gratuito (3.000 mails/mes) |
| Gmail | Casilla desde la que el centro lee y responde | Gratis |
| Google Search Console | Indexación y monitoreo de búsquedas | Gratis |
| Google Business Profile | Ficha del centro en Maps y en la búsqueda local | Gratis |

> **Regla que ordena todo lo demás:** un dominio tiene **un solo juego de
> registros MX**. Si el correo entrante lo maneja Resend, no se pueden agregar
> los MX de Google Workspace. La configuración de acá abajo usa Resend para
> recibir y reenviar a un Gmail común, que es el esquema que ya usás en FaberIT.

---

## Orden de ejecución

```
1. Don Web ──→ 2. Vercel ──→ 3. Resend ──→ 4. Gmail ──→ 5. Google (SEO)
   (DNS)         (sitio)       (correo)      (lectura)     (visibilidad)
```

---

## 1 · Don Web — dominio y DNS

El dominio ya está comprado. Lo que falta es apuntar los DNS.

1. Entrar a [donweb.com](https://donweb.com) → **Panel de clientes** → **Dominios** →
   `centrodeojosbelen.com.ar` → **Administrar DNS** (o **Zona DNS**).
2. Vas a volver acá tres veces: para los registros de Vercel (paso 2) y para los
   de envío y recepción de Resend (paso 3).

**Dos caminos posibles:**

- **(A) Dejar el DNS en Don Web** y cargar a mano los registros de Vercel y
  Resend. Es el camino recomendado: mantenés todo en un solo panel y no
  dependés de una migración de nameservers.
- **(B) Delegar los nameservers a Vercel.** Vercel administra la zona completa.
  Simplifica lo del sitio, pero después los registros de Resend hay que cargarlos
  en Vercel en lugar de Don Web. Solo conviene si no querés tocar Don Web nunca más.

**Este documento asume el camino (A).**

> ⚠️ Los cambios de DNS tardan en propagarse: normalmente minutos, hasta 24–48 hs
> en el peor caso. Si algo "no anda" recién configurado, esperá antes de tocar.
> Para verificar: `nslookup -type=TXT centrodeojosbelen.com.ar`

---

## 2 · Vercel — publicar el sitio

### 2.1 Importar el proyecto

1. Entrar a [vercel.com](https://vercel.com) con la cuenta de FaberIT.
2. **Add New… → Project → Import Git Repository** → elegir
   `Faberitok/centrodeojosbelen`.
3. Vercel detecta Next.js solo. **No cambiar** Build Command ni Output Directory.
4. **Root Directory**: si el repo tiene el proyecto en una subcarpeta, apuntar a
   `centrodeojosbelen`. Si el `package.json` está en la raíz, dejarlo vacío.

### 2.2 Variables de entorno

En **Settings → Environment Variables**. Cargar en los tres entornos
(Production, Preview, Development) salvo donde se indique:

| Variable | Valor | Notas |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.centrodeojosbelen.com.ar` | Sin barra final |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `549383…` | Internacional, **sin** `+` ni espacios |
| `NEXT_PUBLIC_WHATSAPP_MESSAGE` | `Hola, quisiera hacer una consulta.` | Debe coincidir con el saludo que espera el chatbot |
| `RESEND_API_KEY` | `re_…` | Se genera en el paso 3.3 |
| `RESEND_FROM_EMAIL` | `web@centrodeojosbelen.com.ar` | Remitente técnico, distinto de la casilla que se lee |
| `CONTACT_EMAIL_TO` | `contacto@centrodeojosbelen.com.ar` | Destino del formulario |
| `INBOUND_FORWARD_TO` | El Gmail del centro | Destino del reenvío |
| `MAINTENANCE_MODE_ENABLED` | `true` hasta la aprobación, después `false` | Cargarla en **los tres entornos**: si Preview queda en `false`, las URLs de preview muestran la landing completa y son públicas |
| `MAINTENANCE_USER` | Usuario de acceso del equipo | Texto plano, no es un secreto |
| `MAINTENANCE_PASSWORD_HASH` | `sha256:…` | Ver 2.4 |
| `MAINTENANCE_COOKIE_SECRET` | Cadena aleatoria larga | Ver 2.4 |

> Las variables `NEXT_PUBLIC_*` quedan **visibles en el HTML público**. Nunca
> poner ahí una API key. `RESEND_API_KEY` no lleva ese prefijo justamente por eso.

> Cambiar una variable **no** actualiza el sitio: hay que hacer **Redeploy**
> desde **Deployments → … → Redeploy**.

### 2.3 Conectar el dominio

1. **Settings → Domains → Add** → escribir `www.centrodeojosbelen.com.ar`.
2. Agregar también `centrodeojosbelen.com.ar` (sin www) y configurarlo como
   **Redirect a www**. Elegir una sola versión como principal y redirigir la otra:
   tener las dos activas divide el SEO y rompe el canonical.
3. Vercel muestra los registros exactos a cargar. Copiarlos **tal cual** en la
   zona DNS de Don Web (paso 1). Tienen esta forma:

   | Tipo | Nombre | Valor |
   |---|---|---|
   | `A` | `@` | La IP que muestre Vercel |
   | `CNAME` | `www` | El destino que muestre Vercel (`*.vercel-dns.com`) |

   > No copiar valores de tutoriales viejos: Vercel los cambia. Usar siempre los
   > que muestra el panel en ese momento.

4. Cuando Vercel marque el dominio como **Valid Configuration**, el certificado
   HTTPS se emite solo. No hay que comprar ni configurar nada más.

### 2.4 Generar los secretos de mantenimiento

El acceso del equipo es con **usuario y contraseña**. El usuario va en texto
plano en `MAINTENANCE_USER`; la contraseña, hasheada.

Desde una terminal, con Node instalado:

```bash
node -e "console.log('sha256:' + require('crypto').createHash('sha256').update('LA-CONTRASEÑA-QUE-ELIJAS').digest('hex'))"
```

Eso devuelve el valor de `MAINTENANCE_PASSWORD_HASH`. Y para el secreto de la cookie:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

> Usar `MAINTENANCE_PASSWORD_HASH` y **no** `MAINTENANCE_PASSWORD`: así la
> contraseña en claro nunca queda guardada en el panel de Vercel.

> Las credenciales locales ya están cargadas en `.env.local`, que está en
> `.gitignore` y no se commitea. Para producción hay que cargarlas a mano en
> Vercel: el `.env.local` no viaja con el repo.

### 2.5 Analítica

`@vercel/analytics` ya está integrado en el código. Solo hay que activarlo:
**Project → Analytics → Enable**. No requiere banner de cookies porque no usa
cookies ni identifica visitantes.

---

## 3 · Resend — correo

Resend cumple dos funciones distintas, y cada una tiene sus propios registros DNS:

- **Enviar** (`/api/contact`): las consultas del formulario llegan a la casilla del centro.
- **Recibir** (`/api/inbound`): el correo que alguien manda a `contacto@centrodeojosbelen.com.ar`
  se reenvía al Gmail del centro.

### 3.1 Crear la cuenta y verificar el dominio

1. Crear cuenta en [resend.com](https://resend.com).
2. **Domains → Add Domain** → `centrodeojosbelen.com.ar`.
3. Resend muestra un conjunto de registros DNS. Cargarlos en Don Web. Son de estos tipos:

   | Tipo | Para qué |
   |---|---|
   | `TXT` (SPF) | Autoriza a Resend a enviar en nombre del dominio |
   | `TXT` o `CNAME` (DKIM) | Firma criptográfica de cada mail |
   | `MX` | Correo de retorno (rebotes) del subdominio de envío |

4. Volver a Resend y tocar **Verify**. Puede tardar unos minutos.

### 3.2 DMARC (recomendado)

Sin DMARC, Gmail y Outlook son más propensos a mandar los mails a spam. Agregar
en Don Web:

| Tipo | Nombre | Valor |
|---|---|---|
| `TXT` | `_dmarc` | `v=DMARC1; p=none; rua=mailto:contacto@centrodeojosbelen.com.ar` |

`p=none` solo monitorea, no bloquea nada. Es el modo correcto para empezar.

### 3.3 API key

**API Keys → Create API Key** → permiso **Sending access** → copiar el valor
`re_…`. **Se muestra una sola vez.** Cargarla en Vercel como `RESEND_API_KEY`
(paso 2.2) y hacer Redeploy.

### 3.4 Correo entrante (Inbound)

Esto es lo que hace que `contacto@centrodeojosbelen.com.ar` funcione como casilla real.

1. En Resend, ir a la sección de **Inbound** y habilitarla para el dominio.
2. Resend indica un registro **MX** para cargar en Don Web.

   > ⚠️ **Acá está el conflicto:** este MX es el que hace que el correo entrante
   > vaya a Resend. Si más adelante el centro quiere Google Workspace o Zoho,
   > hay que **quitar este MX** y poner los de ese proveedor. No pueden convivir.

3. Configurar el **webhook** apuntando a:

   ```
   https://www.centrodeojosbelen.com.ar/api/inbound
   ```

   con el evento `email.received`.

4. Verificar que en Vercel estén cargadas `INBOUND_FORWARD_TO` (el Gmail) y
   `RESEND_FROM_EMAIL`.

### 3.5 Prueba

Mandar un mail desde cualquier cuenta a `contacto@centrodeojosbelen.com.ar` y
confirmar que llega al Gmail. Después, completar el formulario del sitio y
confirmar que esa consulta también llega.

---

## 4 · Gmail — leer y responder desde `contacto@`

Con Resend Inbound, el correo **llega** al Gmail. Falta que las respuestas
**salgan** con la dirección del centro y no con el Gmail personal.

Se resuelve con "Enviar como" y el SMTP de Resend:

1. En Gmail: **Configuración → Ver toda la configuración → Cuentas e importación**.
2. En **Enviar como**, tocar **Agregar otra dirección de correo electrónico**.
3. Completar:
   - **Nombre**: `Centro de Ojos Belén`
   - **Dirección**: `contacto@centrodeojosbelen.com.ar`
   - Desmarcar **Tratar como un alias**.
4. En la pantalla de SMTP:
   - **Servidor SMTP**: `smtp.resend.com`
   - **Puerto**: `465` (SSL) o `587` (TLS)
   - **Usuario**: `resend`
   - **Contraseña**: la API key de Resend (`re_…`)
5. Gmail manda un código de verificación a esa dirección. Como el Inbound ya está
   configurado, el código llega al mismo Gmail. Pegarlo y confirmar.
6. Opcional pero recomendado: en **Al responder a un mensaje**, elegir
   **Responder desde la misma dirección a la que se envió el mensaje**. Así, al
   contestar una consulta, sale automáticamente desde `contacto@`.

> El formulario del sitio ya manda con `Reply-To` apuntando al paciente: al
> responder desde Gmail, el destinatario se completa solo.

---

## 5 · Google — que el centro aparezca en las búsquedas

Esto no es opcional para un consultorio: la mayoría del tráfico va a llegar de
búsquedas del tipo "oftalmólogo en \<ciudad\>".

### 5.1 Search Console

1. Entrar a [search.google.com/search-console](https://search.google.com/search-console).
2. Agregar una propiedad de tipo **Prefijo de URL**: `https://www.centrodeojosbelen.com.ar`.
3. Verificar con el método de **registro DNS TXT** (se carga en Don Web).
4. En **Sitemaps**, enviar: `https://www.centrodeojosbelen.com.ar/sitemap.xml`

> Hacer esto **después** de poner `MAINTENANCE_MODE_ENABLED=false`. Mientras el
> modo mantenimiento está activo, el sitio se declara `noindex` a propósito y
> Google no lo va a indexar.

### 5.2 Google Business Profile

La ficha de Google (la que aparece a la derecha en la búsqueda y en Maps) es lo
que más mueve la aguja en búsqueda local, y es independiente del sitio.

1. Crear o reclamar la ficha en [business.google.com](https://business.google.com).
2. Categoría: **Oftalmólogo** / **Clínica oftalmológica**.
3. Cargar **exactamente los mismos** dirección, teléfono y horarios que el sitio.
   Google cruza esos datos con el JSON-LD de la página: si no coinciden, pierde
   confianza en ambos.
4. Enlazar el sitio: `https://www.centrodeojosbelen.com.ar`.

---

## 6 · Checklist de salida

Antes de anunciar el sitio:

- [ ] `www.centrodeojosbelen.com.ar` abre con candado (HTTPS) y sin advertencias
- [ ] El dominio sin `www` redirige al dominio con `www`
- [ ] Las variables de entorno están cargadas en **Production** y se hizo Redeploy
- [ ] El formulario envía y la consulta llega a la casilla del centro
- [ ] El `Reply-To` funciona: al responder, el destinatario es el paciente
- [ ] Un mail enviado a `contacto@` llega al Gmail
- [ ] Responder desde Gmail sale como `contacto@centrodeojosbelen.com.ar`
- [ ] El botón de WhatsApp abre el chat con el número y el saludo correctos
- [ ] `MAINTENANCE_MODE_ENABLED=false`
- [ ] `https://www.centrodeojosbelen.com.ar/robots.txt` dice `Allow: /`
- [ ] El sitemap está enviado en Search Console
- [ ] Analytics está activo en Vercel
- [ ] La ficha de Google Business tiene los mismos datos que el sitio
- [ ] No quedan `PLACEHOLDER` en `content/site.ts`

---

## 7 · Qué hacer si algo falla

| Síntoma | Causa más probable |
|---|---|
| El dominio no valida en Vercel | Los registros DNS todavía no propagaron, o quedó un `A`/`CNAME` viejo de Don Web sin borrar |
| El formulario devuelve error 500 | Falta `RESEND_API_KEY` o `CONTACT_EMAIL_TO` en Vercel, o el dominio no está verificado en Resend |
| Los mails caen en spam | Falta SPF, DKIM o DMARC; o `RESEND_FROM_EMAIL` usa un dominio distinto al verificado |
| No llega nada a `contacto@` | El MX de Inbound no está cargado, o el webhook apunta a una URL vieja |
| Gmail no deja agregar "Enviar como" | La API key de Resend está mal pegada, o el código de verificación no llegó porque el Inbound todavía no funciona |
| El sitio muestra la página en construcción | `MAINTENANCE_MODE_ENABLED=true` en Vercel — cambiarlo y hacer Redeploy |
| Cambié una variable y no pasa nada | Falta el **Redeploy**: las variables se leen en build time |
