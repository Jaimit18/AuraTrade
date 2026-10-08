import { Star } from 'lucide-react'

export function Stars({ rating, size = 14, className = '' }: { rating: number; size?: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100))
  return (
    <span className={`relative inline-flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5`}>
      <span className="flex items-center gap-0.5 text-ink-faint/50">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={size} />
        ))}
      </span>
      <span
        className="absolute inset-0 flex items-center gap-0.5 overflow-hidden text-gold"
        style={{ width: `${pct}%` }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={size} className="shrink-0 fill-gold" />
        ))}
      </span>
    </span>
  )
}