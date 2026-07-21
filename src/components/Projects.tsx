import { projects } from '../data/resume'
import ScrollReveal from './ui/ScrollReveal'
import TiltCard from './ui/TiltCard'
import SplitText from './ui/SplitText'
import { FiBluetooth } from 'react-icons/fi'

export default function Projects() {
  return (
    <section id="projects" className="section-pad relative">
      <div className="container-px mx-auto max-w-6xl">
        <ScrollReveal>
          <span className="font-display text-sm uppercase tracking-[0.2em] text-pink">Projects</span>
        </ScrollReveal>
        <h2 className="mt-4 max-w-2xl text-[clamp(1.75rem,4vw,3rem)] font-semibold text-fog">
          <SplitText text="Things I've built on the side." />
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ScrollReveal key={project.name} delay={i * 0.08}>
              <TiltCard className="h-full p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet/15 text-violet">
                  <FiBluetooth size={20} />
                </div>
                <h3 className="mt-6 font-display text-xl font-medium text-fog">{project.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-mist">{project.description}</p>
                <ul className="mt-4 space-y-2">
                  {project.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-mist">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-mist/60" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-3 py-1 text-xs text-mist"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}

          <ScrollReveal delay={projects.length * 0.08}>
            <div className="flex h-full flex-col items-start justify-center rounded-2xl border border-dashed border-line p-8 text-mist">
              <p className="font-display text-lg text-fog">More on the way</p>
              <p className="mt-2 text-sm leading-relaxed">
                Currently shipping a real-time surveillance platform at Etimad R&amp;D — case study coming
                soon.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
