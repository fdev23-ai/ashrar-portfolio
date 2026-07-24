import { profile } from '../data/resume'
import ScrollReveal from './ui/ScrollReveal'
import SplitText from './ui/SplitText'

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

        <ScrollReveal delay={0.08} className="mt-10 max-w-3xl">
          <p className="text-lg leading-relaxed text-mist">{profile.about}</p>
        </ScrollReveal>
      </div>
    </section>
  )
}
