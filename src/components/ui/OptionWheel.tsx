import { useCallback, useEffect, useRef, useState } from 'react'
import './OptionWheel.css'

type OptionWheelProps = {
  items: string[]
  value: number
  onChange: (index: number) => void
  side?: 'left' | 'right'
  fontSize?: number // rem
  spacing?: number // row height, as a multiple of fontSize
  tilt?: number // degrees between neighboring rows
  curve?: number // 0 flattens the curl, 1 is full curl
  fade?: number // opacity lost per row of distance
  blurPerRow?: number // px of blur gained per row of distance
  smoothing?: number // ms time-constant for the easing
  inset?: number // px from the anchored edge to the resting row
}

type Config = {
  items: string[]
  side: 'left' | 'right'
  fontSize: number
  spacing: number
  tilt: number
  curve: number
  fade: number
  blurPerRow: number
  smoothing: number
}

/**
 * A vertical list of options that curls around one edge of its container —
 * closer rows sit upright and sharp, farther ones blur, fade, and tilt away.
 * Own implementation of the "option wheel" interaction pattern (as seen on
 * reactbits.dev): each row's position is a point on a circle sized so the
 * arc length between neighbors matches one row height, eased toward the
 * selected index every frame.
 *
 * All live config is read from a single ref rather than closed over by the
 * event handlers, so a new `items` array (or any other prop) on every
 * parent render never has to re-wire the pointer/wheel/keyboard listeners
 * or reset an in-flight interaction — only the one-time setup effect does.
 */
export default function OptionWheel({
  items,
  value,
  onChange,
  side = 'left',
  fontSize = 1.9,
  spacing = 1.5,
  tilt = 7,
  curve = 1,
  fade = 0.22,
  blurPerRow = 2,
  smoothing = 180,
  inset = 28,
}: OptionWheelProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const positionRef = useRef(value)
  const targetRef = useRef(value)
  const frameRef = useRef<number | null>(null)
  const lastTickRef = useRef(0)
  const dragRef = useRef<{ startY: number; startTarget: number } | null>(null)
  const draggedRef = useRef(false)
  const onChangeRef = useRef(onChange)
  const configRef = useRef<Config>({ items, side, fontSize, spacing, tilt, curve, fade, blurPerRow, smoothing })
  const [isDragging, setIsDragging] = useState(false)

  onChangeRef.current = onChange
  configRef.current = { items, side, fontSize, spacing, tilt, curve, fade, blurPerRow, smoothing }

  const layout = useCallback(() => {
    const cfg = configRef.current
    const remPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    const rowHeight = cfg.fontSize * cfg.spacing * remPx
    const tiltRad = (cfg.tilt * Math.PI) / 180
    const radius = tiltRad > 0.0005 ? rowHeight / tiltRad : 0
    const mirror = cfg.side === 'right' ? -1 : 1
    const pos = positionRef.current

    cfg.items.forEach((_, i) => {
      const el = rowRefs.current[i]
      if (!el) return
      const distance = i - pos
      const absDistance = Math.abs(distance)

      let x = 0
      let y = distance * rowHeight
      let rotation = 0
      if (radius > 0) {
        const angle = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, distance * tiltRad))
        y = radius * Math.sin(angle)
        x = -mirror * radius * (1 - Math.cos(angle)) * cfg.curve
        rotation = (mirror * angle * 180) / Math.PI
      }

      el.style.transform = `translateY(-50%) translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) rotate(${rotation.toFixed(2)}deg)`
      el.style.opacity = String(Math.max(0.08, 1 - absDistance * cfg.fade))
      el.style.filter = cfg.blurPerRow > 0 ? `blur(${(absDistance * cfg.blurPerRow).toFixed(2)}px)` : 'none'
      el.style.setProperty('--ow-active', String(Math.max(0, 1 - Math.min(absDistance, 1))))
    })
  }, [])

  const tick = useCallback((now: number) => {
    const dt = Math.min((now - lastTickRef.current) / 1000, 0.05)
    lastTickRef.current = now
    const tau = Math.max(configRef.current.smoothing, 1) / 1000
    const easing = 1 - Math.exp(-dt / tau)

    const target = targetRef.current
    const current = positionRef.current
    let next = current + (target - current) * easing
    const settled = Math.abs(target - next) < 0.001
    if (settled) next = target
    positionRef.current = next

    layout()

    frameRef.current = settled ? null : requestAnimationFrame(tick)
  }, [layout])

  const startLoop = useCallback(() => {
    if (frameRef.current != null) return
    lastTickRef.current = performance.now()
    frameRef.current = requestAnimationFrame(tick)
  }, [tick])

  const setTarget = useCallback(
    (raw: number, snap: boolean) => {
      const count = configRef.current.items.length
      let next = Math.min(Math.max(raw, 0), count - 1)
      if (snap) next = Math.round(next)
      targetRef.current = next
      startLoop()
      const rounded = Math.round(next)
      if (snap && rounded !== value) onChangeRef.current(rounded)
    },
    [startLoop, value]
  )

  // Keep the wheel following external selection changes (e.g. clicking a
  // different item elsewhere, or the parent driving `value` some other way).
  useEffect(() => {
    if (Math.round(targetRef.current) === value) return
    targetRef.current = value
    startLoop()
  }, [value, startLoop])

  useEffect(() => {
    layout()
  }, [layout, items, fontSize, spacing, tilt, curve, fade, blurPerRow, side])

  // One-time wiring: listeners read everything through refs, so they never
  // need to be torn down and re-attached as props change.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const onWheelEvent = (e: WheelEvent) => {
      e.preventDefault()
      const cfg = configRef.current
      const remPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
      const rowHeight = cfg.fontSize * cfg.spacing * remPx
      const delta = e.deltaMode === 1 ? e.deltaY * 24 : e.deltaY
      const step = Math.max(-1, Math.min(1, delta / rowHeight))
      setTarget(targetRef.current + step, Math.abs(delta) < 4)
    }
    el.addEventListener('wheel', onWheelEvent, { passive: false })
    return () => el.removeEventListener('wheel', onWheelEvent)
  }, [setTarget])

  useEffect(() => () => {
    if (frameRef.current != null) cancelAnimationFrame(frameRef.current)
  }, [])

  function handlePointerDown(e: React.PointerEvent) {
    dragRef.current = { startY: e.clientY, startTarget: targetRef.current }
    draggedRef.current = false
    setIsDragging(true)
  }

  function handlePointerMove(e: React.PointerEvent) {
    const drag = dragRef.current
    if (!drag) return
    const dy = e.clientY - drag.startY
    if (!draggedRef.current && Math.abs(dy) > 4) {
      draggedRef.current = true
      rootRef.current?.setPointerCapture(e.pointerId)
    }
    if (draggedRef.current) {
      const cfg = configRef.current
      const remPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
      const rowHeight = cfg.fontSize * cfg.spacing * remPx
      setTarget(drag.startTarget - dy / rowHeight, false)
    }
  }

  function handlePointerUp() {
    if (!dragRef.current) return
    dragRef.current = null
    setIsDragging(false)
    if (draggedRef.current) setTarget(targetRef.current, true)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      setTarget(Math.round(targetRef.current) - 1, true)
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      setTarget(Math.round(targetRef.current) + 1, true)
    }
  }

  return (
    <div
      ref={rootRef}
      role="listbox"
      tabIndex={0}
      aria-label="Skill wheel"
      className={`option-wheel ${side === 'right' ? 'option-wheel--right' : ''} ${isDragging ? 'option-wheel--dragging' : ''}`}
      style={{ '--ow-font-size': `${fontSize}rem`, '--ow-inset': `${inset}px` } as React.CSSProperties}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
    >
      {items.map((label, i) => (
        <div
          key={label}
          ref={(el) => {
            rowRefs.current[i] = el
          }}
          role="option"
          aria-selected={value === i}
          className={`option-wheel__item ${value === i ? 'option-wheel__item--active' : ''}`}
          onClick={() => {
            if (!draggedRef.current) setTarget(i, true)
          }}
        >
          {label}
        </div>
      ))}
    </div>
  )
}
