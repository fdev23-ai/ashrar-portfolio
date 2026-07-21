import { skillGroups, skillsMarquee } from '../data/resume'
import ScrollReveal from './ui/ScrollReveal'
import Marquee from './ui/Marquee'
import SplitText from './ui/SplitText'

export default function Skills() {
  return (
    <section id="skills" className="section-pad relative bg-surface/40">
      <div className="container-px mx-auto max-w-6xl">
        <ScrollReveal>
          <span className="font-display text-sm uppercase tracking-[0.2em] text-cyan">Skills</span>
        </ScrollReveal>
        <h2 className="mt-4 max-w-2xl text-[clamp(1.75rem,4vw,3rem)] font-semibold text-fog">
          <SplitText text="Tools I reach for." />
        </h2>
      </div>

      <ScrollReveal delay={0.1} className="mt-10">
        <Marquee items={skillsMarquee} />
      </ScrollReveal>

      <div className="container-px mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <ScrollReveal key={group.title} delay={i * 0.06}>
            <div className="rounded-2xl border border-line bg-surface-2/60 p-6">
              <h3 className="font-display text-sm uppercase tracking-[0.15em] text-violet">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-line px-3 py-1 text-sm text-fog"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
