import type { ReactNode } from 'react'

type MarqueeProps = {
  items: ReactNode[]
  reverse?: boolean
}

/** An infinitely-scrolling strip, ReactBits "marquee" style. Pure CSS, no JS layout thrash. */
export default function Marquee({ items, reverse = false }: MarqueeProps) {
  const track = [...items, ...items]
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent" />
      <div
        className="animate-marquee flex w-max gap-4"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {track.map((item, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center rounded-full border border-line bg-surface-2 px-5 py-2.5 font-display text-sm text-fog"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
