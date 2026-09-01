import CardCarousel from '@/components/shared/CardCarousel'
import { brand, team } from '@/content/site'
import Image from 'next/image'

export default function Staff() {
  return (
    <section id="staff" className="landing-panel bg-brand-50 py-14 md:py-20">
      <div className="mx-auto max-w-[1140px] px-6">
        <CardCarousel
          ariaLabel="Staff médico"
          prevLabel="Ver profesional anterior"
          nextLabel="Ver profesional siguiente"
          controlsClassName="md:hidden"
          itemClassName="w-[min(88vw,40rem)] shrink-0 snap-start md:w-auto md:max-w-none"
          desktopGridClassName="md:grid md:grid-cols-2 md:overflow-visible"
          listClassName="mt-10"
          header={
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-700">
                Nuestro staff
              </p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-brand-800 md:text-4xl">
                Profesionales que acompañan
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-brand-700">
                Experiencia, formación continua y una atención cercana para bebés, niños y
                adultos.
              </p>
            </div>
          }
        >
          {team.map((member) => (
            <article
              key={member.name}
              className="grid h-full overflow-hidden rounded-[2rem] border border-brand-200 bg-white shadow-[0_24px_70px_-48px_rgba(32,32,85,0.45)] transition duration-300 hover:border-accent-300 hover:shadow-[0_28px_70px_-44px_rgba(16,16,48,0.36)] grid-cols-[minmax(7.5rem,38%)_1fr]"
            >
              <div className="relative min-h-[16rem] overflow-hidden bg-[#E8E8EA] sm:min-h-[22rem]">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(min-width: 768px) 230px, 38vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full min-h-[16rem] items-center justify-center bg-brand-50">
                    <Image
                      src={brand.isotypeLight}
                      alt=""
                      width={918}
                      height={667}
                      className="w-24 opacity-25"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center p-4 sm:p-6 md:p-8">
                <h3 className="text-xl font-extrabold text-brand-800 sm:text-2xl">{member.name}</h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-accent-800 sm:text-base">
                  {member.role}
                </p>
                {member.license && (
                  <p className="mt-3 inline-flex w-fit rounded-full bg-accent-50 px-3 py-1 text-xs font-bold tracking-wide text-accent-800">
                    {member.license}
                  </p>
                )}
                <p className="mt-4 text-[13px] leading-relaxed text-brand-700 sm:text-[15px]">
                  {member.bio}
                </p>
              </div>
            </article>
          ))}
        </CardCarousel>
      </div>
    </section>
  )
}
