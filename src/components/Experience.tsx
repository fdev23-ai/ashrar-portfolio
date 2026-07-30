import { motion } from 'framer-motion'
import { experience } from '../data/resume'
import ScrollReveal from './ui/ScrollReveal'
import SplitText from './ui/SplitText'

export default function Experience() {
  return (
    <section id="experience" className="section-pad relative bg-surface/40">
      <div className="container-px mx-auto max-w-6xl">
        <ScrollReveal>
          <span className="font-display text-sm uppercase tracking-[0.2em] text-teal">Experience</span>
        </ScrollReveal>
        <h2 className="mt-4 max-w-2xl text-[clamp(1.75rem,4vw,3rem)] font-semibold text-fog">
          <SplitText text="Where I've built things." />
        </h2>

        <div className="relative mt-16">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line md:left-[7px]" />
          <div className="space-y-14">
            {experience.map((job, i) => (
              <ScrollReveal key={job.company} delay={i * 0.08} className="relative pl-10">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-amber bg-ink"
                />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-display text-xl font-medium text-fog">{job.role}</h3>
                  <span className="font-display text-sm text-mist">{job.period}</span>
                </div>
                <p className="mt-1 text-sm text-amber">
                  {job.company} &middot; {job.location}
                </p>
                <ul className="mt-4 space-y-2">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-mist">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-mist/60" />
                      {point}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
