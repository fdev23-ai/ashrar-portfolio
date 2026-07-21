import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { skillWheel, skillsMarquee } from '../data/resume'
import ScrollReveal from './ui/ScrollReveal'
import Marquee from './ui/Marquee'
import SplitText from './ui/SplitText'
import SkillWheel from './ui/SkillWheel'

export default function Skills() {
  const [active, setActive] = useState(0)
  const activeSkill = skillWheel[active]

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

      <div className="container-px mx-auto mt-14 max-w-6xl">
        <ScrollReveal delay={0.15}>
          <div className="grid grid-cols-1 items-center gap-10 rounded-2xl border border-line bg-surface-2/60 p-6 sm:p-10 md:grid-cols-2 md:gap-12">
            <SkillWheel skills={skillWheel} active={active} onSelect={setActive} />

            <div className="min-h-[180px]">
              <p className="font-display text-xs uppercase tracking-[0.2em] text-mist">
                {active + 1} / {skillWheel.length} &middot; tap a node to explore
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSkill.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="mt-3 font-display text-2xl font-medium text-fog">{activeSkill.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mist">{activeSkill.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
