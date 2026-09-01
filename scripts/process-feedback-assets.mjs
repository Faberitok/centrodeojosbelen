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

async function blurFaces(input, output, regions, width = 1200) {
  const source = sharp(path.join(root, input)).rotate()
  const resized = source.resize({
    width,
    height: width,
    fit: 'inside',
    withoutEnlargement: true,
  })
  const buffer = await resized.toBuffer()
  const { width: w, height: h } = await sharp(buffer).metadata()
  const overlays = []

  for (const region of regions) {
    const left = Math.max(0, Math.round(region.x * w))
    const top = Math.max(0, Math.round(region.y * h))
    const extractWidth = Math.min(w - left, Math.round(region.w * w))
    const extractHeight = Math.min(h - top, Math.round(region.h * h))
    if (extractWidth < 8 || extractHeight < 8) continue

    const blurred = await sharp(buffer)
      .extract({ left, top, width: extractWidth, height: extractHeight })
      .blur(32)
      .toBuffer()

    overlays.push({ input: blurred, left, top })
  }

  await sharp(buffer)
    .composite(overlays)
    .webp({ quality: 82, effort: 5 })
    .toFile(path.join(media, output))
}

await toWebp('public/staff/gonza (2).jpeg', 'staff-gonzalo.webp', 900)
await toWebp('public/staff/carla.jpeg', 'staff-carla.webp', 900)
await toWebp('public/institucional/institucional (2).jpeg', 'consultorio.webp', 1600)
await toWebp('public/institucional/institucional (27).jpeg', 'sala-espera.webp', 1600)
await toWebp('public/institucional/institucional (8).jpeg', 'pasillo-centro.webp', 1600)

await blurFaces(
  'public/institucional/institucional (12).jpeg',
  'atencion-bebes-ninos.webp',
  [
    { x: 0.22, y: 0.05, w: 0.28, h: 0.18 },
    { x: 0.52, y: 0.2, w: 0.24, h: 0.16 },
  ]
)

await blurFaces(
  'public/institucional/institucional (16).jpeg',
  'atencion-adultos.webp',
  [{ x: 0.05, y: 0.16, w: 0.32, h: 0.24 }]
)

await blurFaces(
  'public/institucional/institucional (13).jpeg',
  'atencion-adultos-mayores.webp',
  [
    { x: 0.0, y: 0.18, w: 0.32, h: 0.26 },
    { x: 0.58, y: 0.14, w: 0.38, h: 0.32 },
  ]
)

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
