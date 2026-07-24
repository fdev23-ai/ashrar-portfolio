import { useEffect, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type RotatingTextProps = {
  texts: string[]
  className?: string
  // A CSS `background` value per text (gradient or solid color), applied as
  // a background-clip:text fill instead of the shared `className` gradient —
  // lets each rotating word carry its own color instead of one fixed one.
  colors?: string[]
  rotationInterval?: number
}

/**
 * Cycles through a list of phrases, each sliding up character-by-character
 * as it enters and sliding away as it exits (ReactBits "rotating text" style).
 */
export default function RotatingText({ texts, className = '', colors, rotationInterval = 2600 }: RotatingTextProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (texts.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % texts.length), rotationInterval)
    return () => clearInterval(id)
  }, [texts.length, rotationInterval])

  const characters = texts[index].split('')
  const color = colors?.[index]
  const colorStyle: CSSProperties | undefined = color
    ? {
        backgroundImage: color,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      }
    : undefined

  return (
    // No overflow-hidden here: splitting a word into per-character spans
    // makes the sum of their widths run slightly wider than the same word
    // measured as one string (kerning isn't applied across separate inline
    // boxes), so clipping at the word level cuts off the last character or
    // two. Each character gets its own tightly-fitted clip box instead.
    <span className="relative inline-block whitespace-nowrap align-bottom">
      {/* whitespace-nowrap matters here: this is normal text (so it can wrap
          on narrow screens) while the visible characters below are absolutely
          positioned (so they never wrap) — without it, a mismatch between the
          two on narrow viewports clips or misaligns the animated glyphs. */}
      <span className="invisible" aria-hidden>
        {texts.reduce((longest, t) => (t.length > longest.length ? t : longest), '')}
      </span>
      <AnimatePresence mode="wait">
        <motion.span key={texts[index]} className="absolute inset-0 flex" aria-live="polite">
          {characters.map((char, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
              <motion.span
                // className/colorStyle go on the same element that animates
                // `transform` — an ancestor's background-clip:text stops
                // rendering once a descendant gets promoted to its own paint
                // layer, which `transform` does just as much as `filter`.
                className={`inline-block ${color ? '' : className}`}
                style={colorStyle}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-120%', opacity: 0 }}
                transition={{ duration: 0.4, delay: i * 0.025, ease: [0.16, 1, 0.3, 1] }}
              >
                {char === ' ' ? ' ' : char}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
