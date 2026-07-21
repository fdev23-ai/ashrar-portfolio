import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/** A soft light that follows the cursor across the whole page, ReactBits "spotlight" style. */
export default function Spotlight() {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const springX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 60, damping: 20, mass: 0.6 })

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [x, y])

  return (
    <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-0 hidden md:block">
      <motion.div
        className="absolute h-[500px] w-[500px] rounded-full"
        style={{
          left: springX,
          top: springY,
          x: '-50%',
          y: '-50%',
          background:
            'radial-gradient(circle, rgba(139,92,246,0.10) 0%, rgba(34,211,238,0.05) 40%, transparent 70%)',
        }}
      />
    </motion.div>
  )
}
