import { Reveal } from './Reveal'

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'center',
  className = '',
}: {
  eyebrow: string
  title: React.ReactNode
  sub?: string
  align?: 'center' | 'left'
  className?: string
}) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <div className={`max-w-2xl ${alignCls} ${className}`}>
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-dot" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink text-balance md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className={`mt-5 text-[15px] leading-relaxed text-ink-soft md:text-base ${align === 'center' ? 'mx-auto' : ''}`}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  )
}