import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi'
import { profile } from '../data/resume'
import ScrollReveal from './ui/ScrollReveal'
import MagneticButton from './ui/MagneticButton'
import SplitText from './ui/SplitText'
import GradientBlobs from './ui/GradientBlobs'

export default function Contact() {
  return (
    <section id="contact" className="section-pad relative overflow-hidden">
      <GradientBlobs />
      <div className="container-px relative z-10 mx-auto max-w-4xl text-center">
        <ScrollReveal>
          <span className="font-display text-sm uppercase tracking-[0.2em] text-teal">Contact</span>
        </ScrollReveal>

        <h2 className="mx-auto mt-4 max-w-2xl text-[clamp(2rem,5vw,3.5rem)] font-semibold text-fog">
          <SplitText text="Let's build something real-time together." />
        </h2>

        <ScrollReveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-lg text-lg text-mist">
            Have a project, a role, or an idea in mind? My inbox is open — I usually reply within a
            day.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-fog px-6 py-3 font-display text-sm font-medium text-ink"
            >
              <FiMail /> {profile.email}
            </MagneticButton>
            <MagneticButton
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-display text-sm font-medium text-fog hover:border-amber hover:text-amber"
            >
              <FiPhone /> {profile.phone}
            </MagneticButton>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <div className="mt-8 flex items-center justify-center gap-5">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-mist transition-colors hover:text-amber"
            >
              <FiLinkedin size={22} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-mist transition-colors hover:text-amber"
            >
              <FiGithub size={22} />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
