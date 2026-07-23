import { motion } from 'framer-motion'
import { FiArrowDown, FiDownload, FiMail } from 'react-icons/fi'
import { profile, resumeUrl } from '../data/resume'
import SplitText from './ui/SplitText'
import RotatingText from './ui/RotatingText'
import MagneticButton from './ui/MagneticButton'
import GradientBlobs from './ui/GradientBlobs'

const rotatingRoles = ['Flutter', 'React']

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <GradientBlobs />
      <div className="container-px relative z-10 mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface-2/60 px-4 py-1.5 font-display text-sm text-mist"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
          </span>
          Open to new opportunities · {profile.location}
        </motion.p>

        <h1 className="max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[1.02] text-fog">
          <SplitText text={`Hi, I'm ${profile.name.split(' ')[0]}.`} />
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="block"
          >
            I build real-time <RotatingText texts={rotatingRoles} className="text-gradient" /> products.
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-fog px-6 py-3 font-display text-sm font-medium text-ink"
          >
            <FiMail /> Get in touch
          </MagneticButton>
          <MagneticButton
            href="#experience"
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-display text-sm font-medium text-fog hover:border-violet hover:text-violet"
          >
            View experience
          </MagneticButton>
          <MagneticButton
            href={resumeUrl}
            download="Ashrar-Ahmed-Resume.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-display text-sm font-medium text-mist hover:border-violet hover:text-violet"
          >
            <FiDownload /> Resume
          </MagneticButton>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-mist"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FiArrowDown size={20} />
      </motion.a>
    </section>
  )
}
