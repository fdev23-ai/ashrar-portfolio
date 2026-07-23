import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'

type MagneticButtonProps = {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  strength?: number
  // A static asset to download (e.g. a PDF) rather than an SPA route —
  // forces the plain-<a> path below even though the href starts with "/".
  download?: boolean | string
}

/** A button that gently pulls toward the cursor, ReactBits "magnetic" style. */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  strength = 0.35,
  download,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 })
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 })

  function handleMouseMove(e: MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    x.set(relX * strength)
    y.set(relY * strength)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const motionProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { x: springX, y: springY },
    whileTap: { scale: 0.94 },
  }

  // An internal route (e.g. "/projects") goes through react-router's Link so
  // it does client-side navigation with the basename applied correctly.
  // Kept as a plain (non-motion) element nested inside the motion.div: an
  // earlier version passed Link through framer-motion's `motion(Link)`
  // wrapper directly, which triggered "Invalid hook call" — motion-wrapping
  // a component that itself calls router hooks isn't safe here, so the
  // motion transform and the router navigation are two separate elements.
  const isInternalRoute = !download && href?.startsWith('/') && !href.startsWith('//')

  if (isInternalRoute) {
    return (
      <motion.div ref={ref as any} {...motionProps} className="inline-block">
        <Link to={href!} onClick={onClick} className={className}>
          {children}
        </Link>
      </motion.div>
    )
  }

  const Tag: any = href ? motion.a : motion.button

  return (
    <Tag
      ref={ref as any}
      href={href}
      download={download}
      onClick={onClick}
      target={!download && href?.startsWith('http') ? '_blank' : undefined}
      rel={!download && href?.startsWith('http') ? 'noreferrer' : undefined}
      {...motionProps}
      className={className}
    >
      {children}
    </Tag>
  )
}
