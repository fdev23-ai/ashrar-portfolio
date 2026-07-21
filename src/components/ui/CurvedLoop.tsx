import { useId } from 'react'
import { motion } from 'framer-motion'

type CurvedLoopProps = {
  text: string
  className?: string
  size?: number
  duration?: number
  reverse?: boolean
}

/** A ring of text looping continuously along a circular path, ReactBits "curved loop" style. */
export default function CurvedLoop({
  text,
  className = '',
  size = 96,
  duration = 14,
  reverse = false,
}: CurvedLoopProps) {
  const pathId = useId()
  const radius = size / 2 - 12

  return (
    <motion.svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      width={size}
      height={size}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      <defs>
        <path
          id={pathId}
          d={`M ${size / 2},${size / 2} m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
        />
      </defs>
      <text fontSize="7.5" letterSpacing="1.5" className="fill-current uppercase">
        <textPath href={`#${pathId}`}>{text}</textPath>
      </text>
    </motion.svg>
  )
}
