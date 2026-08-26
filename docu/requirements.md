# Requirements

## Contexto del Producto
Se va a construir una landing page para vender servicios de desarrollo de software, automatizaciones, soluciones con IA, infraestructura y consultoría. La página debe transmitir una sensación cercana, confiable y moderna, con una estética inspirada en la referencia AxiomaIT: hero fuerte, secciones claras, prueba social, foco comercial y CTA persistente.

## Objetivo de Negocio
- Generar contactos comerciales calificados.
- Facilitar el envío de mensajes por formulario a un correo configurado.
- Ofrecer contacto directo por WhatsApp.
- Mostrar capacidad técnica y claridad de proceso.
- Dar una base sólida para crecer sin cambiar toda la estructura.

## Público Objetivo
- Emprendedores.
- Pymes.
- Empresas que necesitan software a medida.
- Equipos que quieren automatizar procesos.
- Negocios que requieren soporte técnico, infraestructura o consultoría.

## Look and Feel Deseado
- Base visual minimalista, limpia y moderna.
- Mucho espacio en blanco y jerarquía tipográfica marcada.
- Inspiración en la referencia axiomait.com: hero contundente con foto de fondo full-screen, secciones bien separadas, cards con imagen + título + descripción, bloques de confianza y CTA claros.
- Evitar estética corporativa tradicional o genérica.
- Usar la paleta definida abajo como sistema principal de color.

### Referencia de diseño: axiomait.com (scraping real)
Patrones extraídos del HTML/CSS del sitio de referencia:
- **Tipografía**: Montserrat en todo el sitio (self-hosted woff2). H1 en 52px/900, subtítulo en 21px/700, cuerpo en 15px/400.
- **Container**: max-width 1140px centrado.
- **Hero**: background-image full-screen con foto webp (2 versiones: desktop/mobile). Texto blanco sobre fondo oscuro. Stats bar inline debajo de los CTAs.
- **Servicios**: e-grid (CSS Grid), cada card tiene foto landscape (800×500px) + H2 + texto descriptivo. Animación fadeInUp al hacer scroll.
- **Testimonios**: Swiper slider horizontal con foto de cliente + cita + nombre + empresa.
- **Logos de clientes**: grid horizontal con logos de empresas.
- **Nav**: sticky, horizontal en desktop, burger en mobile, con dropdown de Servicios.
- **WhatsApp**: botón flotante fijo en esquina inferior derecha (equivalente al plugin JoinChat en WP).
- **Footer**: multicolumna con grupos de links + datos de contacto. Encima del footer, bloque de cierre con H1 bold + CTA button.
- **Animaciones**: CSS transitions en hover, fadeInUp en scroll para cards. Liviano, sin bloquear la experiencia.

## Paleta de Color
- 50: #EDEFF3
- 100: #DEE2E9
- 200: #C0C7D4
- 300: #A1ABC0
- 400: #8390AB
- 500: #657596
- 600: #515E77
- 700: #3C4659
- 800: #282E3A
- 900: #13161C

Uso sugerido:
- Fondos claros: 50, 100 y 200.
- Texto principal: 800 y 900.
- Texto secundario y bordes: 300, 400 y 500.
- Acento de CTA y estados activos: 600 o 700 según contraste.

## Secciones Funcionales

### 0. Navegación (sticky header)
- Logo a la izquierda.
- Links de navegación en el centro o derecha: Servicios, Cómo trabajamos, Contacto.
- Botón CTA visible (Contanos tu idea) en el extremo derecho.
- En mobile: burger menu con panel lateral o dropdown.
- Sticky: se mantiene visible al hacer scroll.

### 1. Hero
- Fondo full-screen con fotografía (formato webp, 2 versiones: desktop y mobile).
- Texto blanco sobre fondo oscuro o semi-transparente.
- Título principal (H1) grande y en bold: máximo 2 líneas.
- Subtítulo que explique la propuesta de valor.
- Dos CTAs: botón primario sólido + botón outline.
- **Stats bar**: fila de 4 métricas de confianza debajo de los CTAs, dentro del mismo bloque hero. Texto blanco, sin fondo diferenciado. Ejemplo: ISO 9001 · +X Proyectos · +X Años · Zona geográfica.
- **[ASSET PENDIENTE]**: foto de fondo del hero. Usar placeholder de color sólido hasta tener la foto real.

### 2. Servicios
- Grid de cards. En desktop: 2 o 3 columnas. En mobile: 1 columna.
- Cada card tiene: imagen landscape (800×500px o placeholder) + título + descripción corta.
- Animación sutil de entrada al hacer scroll (fadeInUp).
- Hover con sombra o elevación suave.
- **[ASSET PENDIENTE]**: imágenes de cada servicio. Usar placeholder con color y texto hasta tener las fotos.

### 3. Diferencial
- Bloque de confianza y cercanía.
- Texto que explique por qué el equipo no trabaja como una consultora tradicional.
- Lista clara de beneficios con ícono o marcador visual.

### 4. Proceso
- Secuencia simple de 4 pasos.
- El primer paso debe destacarse como reunión inicial sin costo.
- El flujo debe hacer fácil entender qué pasa después del primer contacto.

### 5. Soluciones Posibles
- Nube de etiquetas o pills con ideas de soluciones que se pueden construir.
- No usar cards pesadas para esta sección.
- Debe leerse rápido y dar amplitud de oferta sin abrumar.

### 6. Testimonios
- Slider horizontal con 2-4 testimonios.
- Cada testimonio: cita + nombre + empresa/rol.
- No requerido en la versión inicial si no hay testimonios reales. Dejar la sección preparada como placeholder.

### 7. Logos de Clientes
- Grid o fila de logos de empresas con las que se trabajó.
- Fondo neutro, logos en gris o a color según disponibilidad.
- **[ASSET PENDIENTE]**: logos de clientes.

### 8. Cierre Final (Footer CTA)
- Bloque de alto impacto visual, fondo oscuro o del color de acento.
- Frase fuerte sobre no necesitar tener la solución pensada.
- Texto de soporte + botón grande de contacto o WhatsApp.

### 9. Footer
- Multicolumna: grupos de links por categoría + datos de contacto.
- Links: Servicios, Redes sociales, correo, teléfono.
- Copyright.

## Requisitos de Copy
- El texto debe seguir una lógica de problema, solución y acción.
- Tono claro, humano y profesional.
- Frases cortas y escaneables.
- CTA concretos, orientados a acción.
- Debe quedar alineado con la narrativa de la referencia, pero sin copiar texto literal.

## Requisitos de Contacto
### Formulario de mensaje
- Debe permitir enviar un mensaje a un correo configurado por variable de entorno.
- Debe incluir validación básica de campos.
- Debe mostrar confirmación de éxito y estado de error.
- Debe ser usable desde desktop y móvil.

### WhatsApp
- Botón flotante fijo en esquina inferior derecha, visible en toda la página (equivalente al JoinChat plugin del sitio de referencia).
- También puede aparecer como botón secundario en el bloque de cierre final.
- El número debe ser configurable por variable de entorno, en formato internacional (ej. 5491112345678).
- Al hacer clic abre `https://wa.me/{numero}` en nueva pestaña.

## Requisitos de Contenido y Assets
- Si no existe una imagen de fondo o hero, dejar un bloque placeholder claro indicando dónde colocarla.
- Si falta fotografía o banner, la página debe seguir funcionando con un reemplazo visual simple.
- Cualquier asset no resuelto debe quedar documentado como pendiente de carga.

## Requisitos Técnicos de Producto
- Debe poder correr localmente para pruebas.
- Debe prepararse para hosteo en Vercel.
- El front debe construirse con Tailwind CSS.
- Debe usar Supabase con PostgreSQL como base de datos.
- Debe ser fácil de configurar por variables de entorno.
- Debe contemplar SEO básico y metadata correcta.
- Debe mantener buen rendimiento y accesibilidad.

## Criterios de Aceptación
- La landing se ve bien en móvil y escritorio.
- El formulario envía mensajes al correo configurado.
- El botón de WhatsApp abre el chat correcto.
- La propuesta de valor se entiende en pocos segundos.
- La estética se siente sobria, moderna y diferenciada.
- La documentación deja claro qué falta cuando no haya assets o datos finales.
