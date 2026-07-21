import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type SplitTextProps = {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

/** Animates text in word-by-word with a blur + rise reveal, ReactBits-style. */
export default function SplitText({ text, className = '', delay = 0, as = 'span' }: SplitTextProps) {
  const words = text.split(' ')
  const Tag = motion[as]
  const ref = useRef(null)
  // One observer per heading (not one per word) — per-word whileInView observers
  // could fail to fire when the browser jumps straight to a section (e.g. a nav
  // link's anchor scroll) instead of scrolling gradually into view.
  const inView = useInView(ref, { once: true, amount: 0, margin: '0px 0px -10% 0px' })

  return (
    <Tag ref={ref} className="block" aria-label={text}>
      {words.map((word, i) => (
        // The space between words is a plain text sibling, not part of the
        // inline-block word wrapper — a trailing space inside an inline-block
        // box doesn't reliably contribute to its layout width.
        <span key={i}>
          <span className="inline-block overflow-hidden pb-[0.15em] align-bottom">
            <motion.span
              // className (e.g. text-gradient) is applied here, not on the outer Tag:
              // background-clip:text on an ancestor breaks once a descendant animates
              // `filter`, since that promotes the descendant to its own paint layer.
              className={`inline-block ${className}`}
              initial={{ y: '110%', opacity: 0, filter: 'blur(8px)' }}
              animate={inView ? { y: '0%', opacity: 1, filter: 'blur(0px)' } : undefined}
              transition={{
                duration: 0.7,
                delay: delay + i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
