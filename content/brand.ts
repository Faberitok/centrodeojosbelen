// content/brand.ts
// Nombre y archivos de la marca.
//
// Vive separado de content/site.ts a propósito: lo importan componentes de
// cliente. Si estuviera dentro de site.ts, el empaquetador mandaría al
// navegador TODO el contenido del sitio —servicios, obras sociales, sedes y
// teléfonos— junto con la ruta de un logo. Eso importa sobre todo en la página
// en construcción, donde el resto del sitio todavía no debería ser visible.

export const siteName = 'Centro de Ojos Belén'

export const brand = {
  // Isologo horizontal, versión color — para fondos claros
  logoLight: '/centrodeojosbelen.png',
  // Isologo horizontal, versión blanca — para fondos oscuros.
  // Generado a partir de centrodeojosbelenfondo.png despejando el navy de
  // fondo: los PNG originales traen el alfa opaco al 100% y recortan un
  // rectángulo sobre cualquier fondo que no sea exactamente #202055.
  logoDark: '/centrodeojosbelen-blanco.png',
  // Isotipo suelto (el ojo)
  isotypeLight: '/centrodeojosbelen-iso.png',
  isotypeDark: '/centrodeojosbelen-iso-blanco.png',
} as const
