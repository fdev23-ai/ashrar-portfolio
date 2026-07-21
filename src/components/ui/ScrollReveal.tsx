import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

/** Fades + rises an element into view as it enters the viewport. */
export default function ScrollReveal({ children, className = '', delay = 0, y = 24 }: ScrollRevealProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0, margin: '0px 0px -10% 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
