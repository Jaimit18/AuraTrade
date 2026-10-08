import type { AvailabilityStatus } from '../../types'

const meta: Record<AvailabilityStatus, { label: string; dot: string; text: string }> = {
  online: { label: 'Available now', dot: 'bg-emerald-400', text: 'text-emerald-400' },
  busy: { label: 'In session', dot: 'bg-amber-400', text: 'text-amber-400' },
  away: { label: 'Away', dot: 'bg-ink-faint', text: 'text-ink-faint' },
}

export function Avatar({
  src,
  alt,
  size = 44,
  status,
  ring = false,
  className = '',
}: {
  src: string
  alt: string
  size?: number
  status?: AvailabilityStatus
  ring?: boolean
  className?: string
}) {
  return (
    <span className={`relative inline-flex shrink-0 ${className}`} style={{ width: size, height: size }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full rounded-full object-cover"
        style={ring ? { boxShadow: '0 0 0 2px var(--surface), 0 0 0 5px color-mix(in srgb, var(--gold) 55%, transparent)' } : undefined}
      />
      {status && (
        <span
          className={`absolute rounded-full border-2 border-[var(--bg)] ${meta[status].dot} ${status === 'online' ? 'animate-pulse-dot' : ''}`}
          style={{ width: size * 0.28, height: size * 0.28, right: 0, bottom: 0 }}
        />
      )}
    </span>
  )
}

export function StatusPill({ status }: { status: AvailabilityStatus }) {
  const m = meta[status]
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[11px] font-semibold">
      <span className={`h-1.5 w-1.5 rounded-full ${m.dot} ${status === 'online' ? 'animate-pulse-dot' : ''}`} />
      <span className={m.text}>{m.label}</span>
    </span>
  )
}