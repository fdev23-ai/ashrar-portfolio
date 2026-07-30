import { certifications, education } from '../data/resume'
import ScrollReveal from './ui/ScrollReveal'
import SplitText from './ui/SplitText'
import { FiAward, FiBook } from 'react-icons/fi'

export default function Education() {
  return (
    <section id="education" className="section-pad relative">
      <div className="container-px mx-auto max-w-6xl">
        <ScrollReveal>
          <span className="font-display text-sm uppercase tracking-[0.2em] text-amber">
            Education &amp; Certifications
          </span>
        </ScrollReveal>
        <h2 className="mt-4 max-w-2xl text-[clamp(1.75rem,4vw,3rem)] font-semibold text-fog">
          <SplitText text="Foundations." />
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <ScrollReveal>
            <div className="flex h-full items-start gap-4 rounded-2xl border border-line bg-surface-2/60 p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/15 text-teal">
                <FiBook size={20} />
              </div>
              <div>
                <h3 className="font-display text-lg text-fog">{education.degree}</h3>
                <p className="mt-1 text-sm text-mist">
                  {education.school} &middot; {education.location}
                </p>
                <p className="mt-1 text-sm text-mist">{education.period}</p>
              </div>
            </div>
          </ScrollReveal>

          {certifications.map((cert, i) => (
            <ScrollReveal key={cert.name} delay={0.06 * (i + 1)}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-line bg-surface-2/60 p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-fuchsia/15 text-fuchsia">
                  <FiAward size={20} />
                </div>
                <div>
                  <h3 className="font-display text-lg text-fog">{cert.name}</h3>
                  <p className="mt-1 text-sm text-mist">{cert.issuer}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
