import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const media = path.join(root, 'public', 'media')

const images = [
  ['public/institucional/institucional (32).jpeg', 'hero-centro.webp'],
  ['public/institucional/institucional (12).jpeg', 'atencion-bebes-ninos.webp'],
  ['public/institucional/institucional (16).jpeg', 'atencion-adultos.webp'],
  ['public/institucional/institucional (13).jpeg', 'atencion-adultos-mayores.webp'],
  ['public/institucional/institucional (7).jpeg', 'dr-gonzalo-castro.webp'],
  ['public/institucional/institucional (30).jpeg', 'evaluacion-cataratas.webp'],
  ['public/institucional/institucional (6).jpeg', 'retina-control.webp'],
  ['public/institucional/institucional (8).jpeg', 'centro-interior.webp'],
  ['public/institucional/institucional (2).jpeg', 'consultorio.webp'],
  ['public/institucional/institucional (27).jpeg', 'sala-espera.webp'],
  ['public/institucional/institucional (8).jpeg', 'pasillo-centro.webp'],
  [
    'public/servicios/OCT- marca Optoviue iscan/WhatsApp Image 2026-08-27 at 4.51.31 PM (1).jpeg',
    'oct-optovue-iscan.webp',
  ],
  [
    'public/servicios/OCT- marca Optoviue iscan/WhatsApp Image 2026-08-27 at 4.51.31 PM.jpeg',
    'oct-estudio.webp',
  ],
  [
    'public/servicios/Topografo corneal - marca Tomey Tms-4/WhatsApp Image 2026-08-27 at 4.52.02 PM.jpeg',
    'topografo-tomey-tms4.webp',
  ],
  [
    'public/servicios/Topografo corneal - marca Tomey Tms-4/WhatsApp Image 2026-08-27 at 4.52.03 PM.jpeg',
    'topografia-corneal.webp',
  ],
  [
    'public/servicios/Paquimetro corneal/WhatsApp Image 2026-08-27 at 4.52.48 PM.jpeg',
    'paquimetria-estudio.webp',
  ],
  [
    'public/servicios/Paquimetro corneal/WhatsApp Image 2026-08-27 at 4.52.48 PM (1).jpeg',
    'paquimetro-corneal.webp',
  ],
  ['public/servicios/Regla biometrica MEDA.jpeg', 'biometria-meda.webp'],
  ['public/servicios/Tonometro de rebore icare 100.jpeg', 'tonometro-icare-100.webp'],
  [
    'public/servicios/Auterofractometro/WhatsApp Image 2026-08-27 at 4.53.36 PM.jpeg',
    'autorrefractometria-estudio.webp',
  ],
  [
    'public/servicios/Auterofractometro/WhatsApp Image 2026-08-27 at 4.53.36 PM (1).jpeg',
    'autorrefractometro.webp',
  ],
  [
    'public/servicios/Autorefractometro portatil Retinomax screen/WhatsApp Image 2026-08-27 at 4.54.00 PM.jpeg',
    'retinomax-portatil.webp',
  ],
  [
    'public/servicios/Oftalmoscopia binocular indirecto Keeler/WhatsApp Image 2026-08-27 at 5.04.17 PM.jpeg',
    'oftalmoscopio-keeler.webp',
  ],
  ['public/servicios/Yag laser Appasamy 307.jpeg', 'yag-laser-appasamy.webp'],
]

for (const [input, output] of images) {
  await sharp(path.join(root, input))
    .rotate()
    .webp({ quality: 92, effort: 6, smartSubsample: true })
    .toFile(path.join(media, output))
}

await sharp(path.join(root, 'public/staff/gonza (2).jpeg'))
  .rotate()
  .resize({ width: 900, height: 1200, fit: 'cover', position: 'top' })
  .webp({ quality: 92, effort: 6, smartSubsample: true })
  .toFile(path.join(media, 'staff-gonzalo.webp'))

await sharp(path.join(root, 'public/staff/carla.jpeg'))
  .rotate()
  .resize({ width: 900, height: 1200, fit: 'cover', position: 'top' })
  .webp({ quality: 92, effort: 6, smartSubsample: true })
  .toFile(path.join(media, 'staff-carla.webp'))

console.log(`Optimized ${images.length + 2} images at high quality`)
