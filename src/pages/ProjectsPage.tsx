import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { projects, aiProjects } from '../data/resume'
import { projectIcons } from '../components/projectIcons'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ui/ScrollReveal'
import TiltCard from '../components/ui/TiltCard'
import CurvedLoop from '../components/ui/CurvedLoop'
import GradientBlobs from '../components/ui/GradientBlobs'

export default function ProjectsPage() {
  return (
    <div className="relative">
      <Navbar />
      <main className="relative z-10">
        <section className="section-pad relative overflow-hidden pt-28">
          <GradientBlobs />
          <div className="container-px relative z-10 mx-auto max-w-6xl">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-display text-sm text-mist transition-colors hover:text-violet"
            >
              <FiArrowLeft /> Back home
            </Link>

            <span className="mt-8 block font-display text-sm uppercase tracking-[0.2em] text-pink">
              All projects
            </span>
            <h1 className="mt-4 max-w-2xl text-[clamp(1.75rem,4vw,3rem)] font-semibold text-fog">
              Everything I've built.
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-mist">
              Shipped products, freelance work, and practice projects from an AI/ML certification course.
            </p>

            <h2 className="mt-16 font-display text-lg font-medium text-fog">Products</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {projects.map((project, i) => {
                const Icon = projectIcons[project.icon]
                return (
                  <ScrollReveal key={project.name} delay={i * 0.06}>
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
                          <span key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-mist">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </TiltCard>
                  </ScrollReveal>
                )
              })}
            </div>

            <h2 className="mt-20 font-display text-lg font-medium text-fog">AI/ML practice projects</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist">
              Smaller-scope builds from a 6-month AI/ML certification course through GUVi.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {aiProjects.map((project, i) => {
                const Icon = projectIcons[project.icon]
                return (
                  <ScrollReveal key={project.name} delay={i * 0.05}>
                    <div className="h-full rounded-2xl border border-line bg-surface-2/60 p-6">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan/15 text-cyan">
                        <Icon size={16} />
                      </div>
                      <h3 className="mt-4 font-display text-base font-medium text-fog">{project.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-mist">{project.description}</p>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
