import { profile, languages } from '../data/resume'
import ScrollReveal from './ui/ScrollReveal'
import SplitText from './ui/SplitText'
import portrait from '../assets/ashrar-portrait.jpg'

export default function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="container-px mx-auto max-w-6xl">
        <ScrollReveal>
          <span className="font-display text-sm uppercase tracking-[0.2em] text-violet">About</span>
        </ScrollReveal>

        <h2 className="mt-4 max-w-3xl text-[clamp(1.75rem,4vw,3rem)] font-semibold text-fog">
          <SplitText text="A little about how I work." />
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-3">
          <ScrollReveal>
            <div className="overflow-hidden rounded-2xl border border-line">
              <img
                src={portrait}
                alt="Ashrar Ahmed"
                className="aspect-[3/4] w-full object-cover"
                width={900}
                height={957}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="md:col-span-2">
            <p className="text-lg leading-relaxed text-mist">{profile.about}</p>

            <div className="mt-8 max-w-sm rounded-2xl border border-line bg-surface-2/60 p-6">
              <h3 className="font-display text-sm uppercase tracking-[0.15em] text-mist">Languages</h3>
              <ul className="mt-4 space-y-3">
                {languages.map((lang) => (
                  <li key={lang.name} className="flex items-center justify-between text-sm">
                    <span className="text-fog">{lang.name}</span>
                    <span className="text-mist">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
