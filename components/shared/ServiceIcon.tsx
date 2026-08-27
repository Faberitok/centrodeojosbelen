import type { ServiceIcon as ServiceIconName } from '@/content/site'

/**
 * Set de íconos de línea para las tarjetas de servicios.
 *
 * Se dibujan a mano en lugar de sumar una librería: son ocho, no cambian
 * seguido, y así el bundle no paga por un set entero para usar un puñado.
 * Todos comparten viewBox 24, trazo 1.5 y currentColor.
 */

const paths: Record<ServiceIconName, React.ReactNode> = {
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3.25" />
    </>
  ),
  lens: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M9.2 9.2a4 4 0 0 1 2.3-1.15" />
    </>
  ),
  scalpel: (
    <>
      <path d="M12 3v3.5M12 17.5V21M3 12h3.5M17.5 12H21" />
      <circle cx="12" cy="12" r="4.25" />
      <path d="M12 9.75v4.5" />
    </>
  ),
  retina: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="14" cy="12" r="2" />
      <path d="M14 10c-2.2-1.6-4.4-2.1-6.6-1.6M14 14c-2.2 1.6-4.4 2.1-6.6 1.6M12.2 12H5.5" />
    </>
  ),
  pressure: (
    <>
      <path d="M12 3.5s5.5 5.6 5.5 9.2A5.5 5.5 0 0 1 12 18.2a5.5 5.5 0 0 1-5.5-5.5C6.5 9.1 12 3.5 12 3.5Z" />
      <path d="M9.5 13.2a2.5 2.5 0 0 0 2.5 2.4" />
    </>
  ),
  child: (
    <>
      <circle cx="12" cy="7" r="3" />
      <path d="M6.5 20.5v-1.8A5.5 5.5 0 0 1 12 13.2a5.5 5.5 0 0 1 5.5 5.5v1.8" />
      <path d="M10 17.5h4" />
    </>
  ),
  scan: (
    <>
      <path d="M3.5 8V5.5A2 2 0 0 1 5.5 3.5H8M16 3.5h2.5a2 2 0 0 1 2 2V8M20.5 16v2.5a2 2 0 0 1-2 2H16M8 20.5H5.5a2 2 0 0 1-2-2V16" />
      <path d="M6.5 12.5c1.4 0 1.4-2 2.8-2s1.4 3 2.8 3 1.4-3 2.8-3 1.4 2 2.6 2" />
    </>
  ),
  glasses: (
    <>
      <circle cx="6.5" cy="14" r="3.5" />
      <circle cx="17.5" cy="14" r="3.5" />
      <path d="M10 14a2.2 2.2 0 0 1 4 0M3 12.5 4.5 8h3M21 12.5 19.5 8h-3" />
    </>
  ),
}

interface ServiceIconProps {
  name: ServiceIconName
  className?: string
}

export default function ServiceIcon({ name, className = 'w-7 h-7' }: ServiceIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
