import { useEffect, useRef, useState, type ComponentType } from 'react'
import { motion } from 'framer-motion'
import { FiBarChart2, FiBluetooth, FiLayers, FiRadio, FiVideo, FiZap } from 'react-icons/fi'
import { SiDjango, SiFigma, SiFlutter, SiReact } from 'react-icons/si'
import type { SkillDetail, SkillWheelIcon } from '../../data/resume'

const icons: Record<SkillWheelIcon, ComponentType<{ size?: number }>> = {
  flutter: SiFlutter,
  react: SiReact,
  webrtc: FiVideo,
  rtsp: FiRadio,
  websocket: FiZap,
  ble: FiBluetooth,
  getx: FiLayers,
  backend: SiDjango,
  figma: SiFigma,
  scanner: FiBarChart2,
}

type SkillWheelProps = {
  skills: SkillDetail[]
  active: number
  onSelect: (index: number) => void
}

/** A circular selector of skills — click a node to bring up its explanation. */
export default function SkillWheel({ skills, active, onSelect }: SkillWheelProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState(300)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (width) setSize(width)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const center = size / 2
  const nodeSize = 52
  const radius = center - nodeSize / 2 - 8
  const angleStep = 360 / skills.length

  const positions = skills.map((_, i) => {
    const angleDeg = i * angleStep - 90
    const angleRad = (angleDeg * Math.PI) / 180
    return {
      x: center + radius * Math.cos(angleRad),
      y: center + radius * Math.sin(angleRad),
    }
  })

  const activePos = positions[active]

  return (
    <div ref={containerRef} className="relative mx-auto aspect-square w-full max-w-[320px]">
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        <circle cx={center} cy={center} r={radius} fill="none" stroke="var(--color-line)" strokeDasharray="2 6" />
        {activePos && (
          <motion.line
            x1={center}
            y1={center}
            animate={{ x2: activePos.x, y2: activePos.y }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            stroke="var(--color-violet)"
            strokeWidth={1.5}
          />
        )}
      </svg>

      <div
        className="absolute flex items-center justify-center rounded-full bg-surface-2 text-center font-display text-[11px] uppercase tracking-wider text-mist"
        style={{ left: center, top: center, width: 72, height: 72, transform: 'translate(-50%, -50%)' }}
      >
        Skills
      </div>

      {skills.map((skill, i) => {
        const Icon = icons[skill.icon]
        const pos = positions[i]
        const isActive = i === active
        return (
          <button
            key={skill.name}
            type="button"
            onClick={() => onSelect(i)}
            aria-pressed={isActive}
            aria-label={skill.name}
            className="absolute flex items-center justify-center rounded-full"
            style={{
              left: pos.x,
              top: pos.y,
              width: nodeSize,
              height: nodeSize,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.span
              animate={{
                scale: isActive ? 1.15 : 1,
                backgroundColor: isActive ? 'rgba(139,92,246,0.25)' : 'rgba(17,19,28,1)',
                borderColor: isActive ? 'var(--color-violet)' : 'var(--color-line)',
                color: isActive ? 'var(--color-violet)' : 'var(--color-mist)',
              }}
              transition={{ duration: 0.25 }}
              className="flex h-full w-full items-center justify-center rounded-full border"
              style={{ borderWidth: 1 }}
            >
              <Icon size={18} />
            </motion.span>
          </button>
        )
      })}
    </div>
  )
}
