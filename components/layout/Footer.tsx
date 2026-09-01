import { brand, contact, footer, locations, site, type SocialNetwork } from '@/content/site'
import Image from 'next/image'
import Link from 'next/link'

const socialIcons: Record<SocialNetwork, React.ReactNode> = {
  instagram: (
    <path d="M8 0C5.83 0 5.56.01 4.7.05 3.85.09 3.27.22 2.76.42a3.92 3.92 0 0 0-1.42.92A3.93 3.93 0 0 0 .42 2.76C.22 3.27.09 3.85.05 4.7.01 5.56 0 5.83 0 8s.01 2.44.05 3.3c.04.85.17 1.43.37 1.94.2.53.48.97.92 1.42.45.44.9.72 1.42.92.51.2 1.09.33 1.94.37C5.56 15.99 5.83 16 8 16s2.44-.01 3.3-.05c.85-.04 1.43-.17 1.94-.37a3.92 3.92 0 0 0 1.42-.92c.44-.45.72-.89.92-1.42.2-.51.33-1.09.37-1.94.04-.86.05-1.13.05-3.3s-.01-2.45-.05-3.3c-.04-.85-.17-1.43-.37-1.94a3.93 3.93 0 0 0-.92-1.42A3.91 3.91 0 0 0 13.24.42c-.51-.2-1.09-.33-1.94-.37C10.44.01 10.17 0 8 0Zm-.72 1.44H8c2.14 0 2.39.01 3.23.05.78.03 1.2.17 1.49.27.37.15.64.32.92.6.28.28.45.55.6.92.11.28.24.7.27 1.49.04.84.05 1.09.05 3.23s-.01 2.39-.05 3.23c-.03.78-.17 1.2-.27 1.49-.15.37-.32.64-.6.92-.28.28-.55.45-.92.6-.28.11-.7.24-1.49.27-.84.04-1.09.05-3.23.05s-2.39-.01-3.23-.05c-.78-.03-1.2-.17-1.49-.27a2.48 2.48 0 0 1-.92-.6 2.48 2.48 0 0 1-.6-.92c-.11-.28-.24-.7-.27-1.49-.04-.84-.05-1.09-.05-3.23s.01-2.39.05-3.23c.03-.78.17-1.2.27-1.49.15-.37.32-.64.6-.92.28-.28.55-.45.92-.6.28-.11.7-.24 1.49-.27.74-.03 1.02-.04 2.51-.04Zm4.99 1.33a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92ZM8 3.89a4.11 4.11 0 1 0 0 8.22 4.11 4.11 0 0 0 0-8.22Zm0 1.44a2.67 2.67 0 1 1 0 5.34 2.67 2.67 0 0 1 0-5.34Z" />
  ),
  facebook: (
    <path d="M16 8.05a8 8 0 1 0-9.25 7.95v-5.62H4.72V8.05h2.03V6.29c0-2.01 1.2-3.12 3.02-3.12.88 0 1.79.16 1.79.16v1.97h-1.01c-.99 0-1.3.62-1.3 1.25v1.5h2.22l-.36 2.33H9.25V16A8 8 0 0 0 16 8.05Z" />
  ),
  whatsapp: (
    <path d="M13.6 2.33A7.85 7.85 0 0 0 8 0a7.9 7.9 0 0 0-6.85 11.85L0 16l4.25-1.1A7.9 7.9 0 0 0 8 15.85 7.9 7.9 0 0 0 13.6 2.33ZM8 14.52c-1.17 0-2.32-.31-3.32-.9l-.24-.15-2.47.65.66-2.41-.16-.25a6.56 6.56 0 1 1 12.09-3.51A6.57 6.57 0 0 1 8 14.52Zm3.6-4.92c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.45.1-.13.2-.5.64-.62.77-.11.13-.23.15-.43.05-.2-.1-.83-.31-1.59-.98a5.94 5.94 0 0 1-1.1-1.37c-.11-.2-.01-.3.09-.4.09-.09.2-.23.3-.35.1-.12.13-.2.2-.34.06-.13.03-.25-.02-.35-.05-.1-.45-1.08-.61-1.47-.16-.39-.33-.34-.45-.34l-.38-.01c-.13 0-.35.05-.53.25-.18.2-.7.68-.7 1.66s.72 1.92.82 2.06c.1.13 1.41 2.15 3.42 3.02.48.2.85.33 1.14.42.48.15.91.13 1.26.08.38-.06 1.17-.48 1.34-.94.16-.46.16-.86.11-.94-.05-.08-.18-.13-.38-.23Z" />
  ),
}

export default function Footer() {
  const mainLocation = locations[0]
  // Server Component: el año se resuelve en el servidor, sin riesgo de que el
  // cliente renderice otro y rompa la hidratación.
  const year = new Date().getFullYear()

  return (
    <footer className="dark-brand-gradient relative mt-3 overflow-hidden rounded-t-[2rem] border-t border-white/10 text-brand-300 md:rounded-t-[2.75rem]">
      <div
        className="pointer-events-none absolute -right-24 -top-40 h-96 w-96 rounded-full border-[64px] border-accent-500/10"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1140px] px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 border-b border-brand-800 pb-10 md:grid-cols-3">
          <div>
            <Image
              src={brand.logoDark}
              alt={site.name}
              width={1142}
              height={512}
              sizes="220px"
              className="h-12 w-auto object-contain"
            />
            <p className="mt-5 max-w-xs leading-relaxed text-brand-300">
              {footer.tagline}
            </p>
          </div>

          <nav aria-label="Navegación del pie de página">
            <p className="text-sm font-bold uppercase tracking-wide text-white">
              Navegación
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-5">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded text-brand-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-white">Contacto</p>
            <ul className="mt-2">
              {contact.email && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex min-h-11 items-center rounded break-all text-brand-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                    className="inline-flex min-h-11 items-center rounded text-brand-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              {mainLocation && (
                <li className="text-brand-400">
                  {mainLocation.street}, {mainLocation.city}
                </li>
              )}
            </ul>

            {footer.social.length > 0 && (
              <>
                <p className="mt-6 text-sm font-bold uppercase tracking-wide text-white">
                  Redes
                </p>
                <ul className="mt-3 flex gap-3">
                  {footer.social.map((social) => (
                    <li key={social.href}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${site.name} en ${social.label}`}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-brand-700 text-brand-300 transition-colors hover:border-accent-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                      >
                        <svg
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-5 w-5"
                          aria-hidden="true"
                        >
                          {socialIcons[social.network]}
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-8 text-center text-sm text-brand-400 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>© {year} {footer.copyrightSuffix}</p>
          <p>{site.city} · {site.province}</p>
        </div>
      </div>
    </footer>
  )
}
