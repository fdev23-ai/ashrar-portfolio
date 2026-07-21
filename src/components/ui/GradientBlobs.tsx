/** Slow-drifting gradient blobs used behind the hero section. */
export default function GradientBlobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="animate-float-slow absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-violet/30 blur-[120px]" />
      <div className="animate-float-slower absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-cyan/20 blur-[120px]" />
      <div className="animate-float-slow absolute bottom-[-200px] left-1/3 h-[420px] w-[420px] rounded-full bg-pink/15 blur-[120px]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  )
}
