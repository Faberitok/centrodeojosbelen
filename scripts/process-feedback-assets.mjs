import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const media = path.join(root, 'public', 'media')
const logosDir = path.join(root, 'public', 'obras-sociales')

await mkdir(media, { recursive: true })
await mkdir(logosDir, { recursive: true })

async function toWebp(input, output, width) {
  await sharp(path.join(root, input))
    .rotate()
    .resize({ width, height: width, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 84, effort: 5 })
    .toFile(path.join(media, output))
}

await toWebp('public/staff/gonza (2).jpeg', 'staff-gonzalo.webp', 900)
await toWebp('public/staff/carla.jpeg', 'staff-carla.webp', 900)
await toWebp('public/institucional/institucional (2).jpeg', 'consultorio.webp', 1600)
await toWebp('public/institucional/institucional (27).jpeg', 'sala-espera.webp', 1600)
await toWebp('public/institucional/institucional (8).jpeg', 'pasillo-centro.webp', 1600)

await toWebp('public/institucional/institucional (12).jpeg', 'atencion-bebes-ninos.webp', 1200)
await toWebp('public/institucional/institucional (16).jpeg', 'atencion-adultos.webp', 1200)
await toWebp('public/institucional/institucional (13).jpeg', 'atencion-adultos-mayores.webp', 1200)

const logoSources = [
  ['osep', ['https://logo.clearbit.com/osep.gob.ar', 'https://www.google.com/s2/favicons?domain=osep.gob.ar&sz=256']],
  ['red-seguro-medico', ['https://logo.clearbit.com/reddeseguromedico.com', 'https://www.google.com/s2/favicons?domain=reddeseguromedico.com&sz=256']],
  ['osde', ['https://logo.clearbit.com/osde.com.ar', 'https://www.google.com/s2/favicons?domain=osde.com.ar&sz=256']],
  ['swiss-medical', ['https://logo.clearbit.com/swissmedical.com.ar', 'https://www.google.com/s2/favicons?domain=swissmedical.com.ar&sz=256']],
  ['nobis', ['https://logo.clearbit.com/nobis.com.ar', 'https://www.google.com/s2/favicons?domain=nobis.com.ar&sz=256']],
  ['sancor-salud', ['https://logo.clearbit.com/sancorsalud.com.ar', 'https://www.google.com/s2/favicons?domain=sancorsalud.com.ar&sz=256']],
  ['medicus', ['https://logo.clearbit.com/medicus.com.ar', 'https://www.google.com/s2/favicons?domain=medicus.com.ar&sz=256']],
]

for (const [id, urls] of logoSources) {
  let saved = false
  for (const url of urls) {
    try {
      const response = await fetch(url)
      if (!response.ok) continue
      const bytes = Buffer.from(await response.arrayBuffer())
      await sharp(bytes)
        .resize({ width: 320, height: 160, fit: 'inside', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .png()
        .toFile(path.join(logosDir, `${id}.png`))
      saved = true
      break
    } catch (error) {
      console.warn(`No se pudo descargar ${id} desde ${url}:`, error.message)
    }
  }
  if (!saved) console.warn(`Sin logo para ${id}`)
}

console.log('Assets processed')
