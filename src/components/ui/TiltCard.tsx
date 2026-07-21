import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

type TiltCardProps = {
  children: ReactNode
  className?: string
}

/** A card with 3D tilt + glow-follow-cursor, ReactBits "spotlight card" style. */
export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const springPx = useSpring(px, { stiffness: 150, damping: 20 })
  const springPy = useSpring(py, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(springPy, [0, 1], [8, -8])
  const rotateY = useTransform(springPx, [0, 1], [-8, 8])
  const glowX = useTransform(px, (v) => `${v * 100}%`)
  const glowY = useTransform(py, (v) => `${v * 100}%`)

  function handleMouseMove(e: MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  function handleMouseLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`group relative overflow-hidden rounded-2xl border border-line bg-surface-2/60 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(280px circle at ${gx} ${gy}, rgba(139,92,246,0.18), transparent 65%)`
          ),
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
