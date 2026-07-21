import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type RotatingTextProps = {
  texts: string[]
  className?: string
  rotationInterval?: number
}

/**
 * Cycles through a list of phrases, each sliding up character-by-character
 * as it enters and sliding away as it exits (ReactBits "rotating text" style).
 */
export default function RotatingText({ texts, className = '', rotationInterval = 2600 }: RotatingTextProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (texts.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % texts.length), rotationInterval)
    return () => clearInterval(id)
  }, [texts.length, rotationInterval])

  const characters = texts[index].split('')

  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      <span className="invisible" aria-hidden>
        {texts.reduce((longest, t) => (t.length > longest.length ? t : longest), '')}
      </span>
      <AnimatePresence mode="wait">
        <motion.span key={texts[index]} className="absolute inset-0 flex" aria-live="polite">
          {characters.map((char, i) => (
            <motion.span
              key={i}
              // className (e.g. text-gradient) goes on the same element that
              // animates `transform` — an ancestor's background-clip:text
              // stops rendering once a descendant gets promoted to its own
              // paint layer, which `transform` does just as much as `filter`.
              className={`inline-block ${className}`}
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-120%', opacity: 0 }}
              transition={{ duration: 0.4, delay: i * 0.025, ease: [0.16, 1, 0.3, 1] }}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
