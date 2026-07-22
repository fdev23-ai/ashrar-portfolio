import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { projects } from '../data/resume'
import { projectIcons } from './projectIcons'
import ScrollReveal from './ui/ScrollReveal'
import TiltCard from './ui/TiltCard'
import SplitText from './ui/SplitText'
import CurvedLoop from './ui/CurvedLoop'
import MagneticButton from './ui/MagneticButton'

const featured = projects.filter((p) => p.featured)

export default function Projects() {
  return (
    <section id="projects" className="section-pad relative">
      <div className="container-px mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <ScrollReveal>
              <span className="font-display text-sm uppercase tracking-[0.2em] text-pink">Projects</span>
            </ScrollReveal>
            <h2 className="mt-4 max-w-2xl text-[clamp(1.75rem,4vw,3rem)] font-semibold text-fog">
              <SplitText text="Things I've built." />
            </h2>
          </div>
          <ScrollReveal delay={0.1}>
            <MagneticButton
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-display text-sm text-fog hover:border-violet hover:text-violet"
            >
              View all projects <FiArrowRight />
            </MagneticButton>
          </ScrollReveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {featured.map((project, i) => {
            const Icon = projectIcons[project.icon]
            return (
              <ScrollReveal key={project.name} delay={i * 0.08}>
                <TiltCard className="h-full p-8">
                  <div className="relative flex h-11 w-11 items-center justify-center">
                    {project.badgeText && (
                      <CurvedLoop
                        text={project.badgeText}
                        size={72}
                        className="absolute -inset-[15px] text-violet/50"
                      />
                    )}
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-violet/15 text-violet">
                      <Icon size={20} />
                    </div>
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
            )
          })}
        </div>

        <ScrollReveal delay={0.2} className="mt-8 text-center">
          <Link to="/projects" className="font-display text-sm text-mist underline-offset-4 hover:text-violet hover:underline">
            + {projects.length - featured.length} more, including AI/ML practice projects
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
