import SectionWrapper from '@/components/shared/SectionWrapper'
import { brand, team } from '@/content/site'
import Image from 'next/image'

export default function Staff() {
  return (
    <SectionWrapper id="staff" className="bg-brand-50 py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-700">
            Nuestro staff
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-brand-900 md:text-4xl">
            Profesionales que acompañan
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-brand-700">
            Experiencia, formación continua y una atención cercana para bebés, niños y
            adultos.
          </p>
        </div>

        <ul className="space-y-6">
          {team.map((member, index) => (
            <li
              key={member.name}
              className="group grid overflow-hidden rounded-[2rem] border border-brand-200 bg-white shadow-[0_24px_70px_-48px_rgba(7,7,18,0.55)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-45px_rgba(7,7,18,0.65)] sm:grid-cols-[13rem_1fr]"
            >
              <div className="relative min-h-72 overflow-hidden bg-brand-100 sm:min-h-full">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(min-width: 640px) 208px, 100vw"
                    className="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full min-h-72 items-center justify-center bg-[radial-gradient(circle_at_center,#D7DAF2_0%,#ECEEFA_68%)]">
                    <Image
                      src={brand.isotypeLight}
                      alt=""
                      width={918}
                      height={667}
                      className="w-28 opacity-25"
                    />
                  </div>
                )}
                <span className="absolute left-5 top-5 rounded-full bg-brand-900/75 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                  0{index + 1}
                </span>
              </div>

              <div className="flex flex-col justify-center p-7 md:p-9">
                <h3 className="text-2xl font-extrabold text-brand-900">{member.name}</h3>
                <p className="mt-2 font-semibold leading-relaxed text-accent-800">
                  {member.role}
                </p>
                {member.license && (
                  <p className="mt-3 inline-flex w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-bold tracking-wide text-brand-700">
                    {member.license}
                  </p>
                )}
                <p className="mt-5 text-[15px] leading-relaxed text-brand-700">{member.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  )
}
