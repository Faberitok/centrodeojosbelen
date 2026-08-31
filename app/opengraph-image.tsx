import { ImageResponse } from 'next/og'

export const alt = 'Centro de Ojos Belén — Cuidamos tu visión'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          color: 'white',
          background: '#070712',
          padding: '76px 84px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 520,
            height: 520,
            borderRadius: 999,
            border: '74px solid rgba(33,159,192,.26)',
            right: -90,
            top: -85,
            display: 'flex',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              color: '#7CCDE0',
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: 'uppercase',
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 99,
                background: '#219FC0',
                display: 'flex',
              }}
            />
            Centro de Ojos Belén
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', maxWidth: 820, fontSize: 76, lineHeight: 1.02, fontWeight: 800 }}>
              Cuidamos tu visión en cada etapa de la vida.
            </div>
            <div style={{ display: 'flex', marginTop: 32, color: '#D7DAF2', fontSize: 28 }}>
              Atención oftalmológica integral · Belén, Catamarca
            </div>
          </div>
          <div style={{ display: 'flex', color: '#A4ACD9', fontSize: 22 }}>
            Rivadavia 490 · WhatsApp 3804-100707
          </div>
        </div>
      </div>
    ),
    size
  )
}
