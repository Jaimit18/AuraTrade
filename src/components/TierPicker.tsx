import { Check, Crown, Rocket, Zap } from 'lucide-react'
import type { PriceTier } from '../types'

const IconMap = [
  { icon: Zap, grad: 'from-slate-400 to-slate-600' },
  { icon: Rocket, grad: 'from-gold-strong via-gold to-[#a8791a]' },
  { icon: Crown, grad: 'from-amber-200 via-gold to-[#8a650a]' },
]

export function TierPicker({
  tiers,
  selected,
  onSelect,
}: {
  tiers: PriceTier[]
  selected: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {tiers.map((tier, i) => {
        const Icon = IconMap[i]?.icon ?? Zap
        const active = selected === tier.id
        return (
          <button
            key={tier.id}
            onClick={() => onSelect(tier.id)}
            className={`group relative overflow-hidden rounded-3xl border p-5 text-left transition-all duration-300 ${
              active
                ? 'border-gold/70 bg-gradient-to-b from-gold/10 to-transparent shadow-[0_20px_60px_-20px_var(--glow)] scale-[1.02]'
                : 'border-line bg-surface hover:border-gold/40 hover:-translate-y-1'
            }`}
          >
            {tier.popular && (
              <span className="absolute right-4 top-4 rounded-full bg-gradient-to-br from-gold-strong via-gold to-[#a8791a] px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#141007]">
                Popular
              </span>
            )}
            <span
              className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${IconMap[i].grad} text-[#141007] shadow-lg`}
            >
              <Icon size={20} />
            </span>
            <p className="mt-4 font-display text-lg font-semibold text-ink">{tier.name}</p>
            <p className="text-xs text-ink-soft">{tier.tagline}</p>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-mono text-3xl font-bold text-gold">${tier.price}</span>
              <span className="text-xs text-ink-faint">/ {tier.duration} min</span>
            </div>
            <ul className="mt-4 space-y-2">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13px] text-ink-soft">
                  <Check size={14} className="mt-0.5 shrink-0 text-gold" />
                  {f}
                </li>
              ))}
            </ul>
          </button>
        )
      })}
    </div>
  )
}