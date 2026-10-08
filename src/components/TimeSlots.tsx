import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'

const SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '17:00', '17:30', '18:00']

const MARKED = new Set(['09:00', '11:30', '13:00', '15:30', '17:00'])

export function TimeSlots({
  selected,
  onSelect,
}: {
  selected: string | null
  onSelect: (slot: string) => void
}) {
  return (
    <div className="rounded-3xl border border-line bg-surface p-5">
      <div className="flex items-center gap-2">
        <Clock size={15} className="text-gold" />
        <p className="text-sm font-semibold text-ink">Pick a time slot</p>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {SLOTS.map((s, i) => {
          const full = MARKED.has(s)
          const isSel = selected === s
          return (
            <motion.button
              key={s}
              disabled={full}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03, type: 'spring', stiffness: 400, damping: 25 }}
              onClick={() => onSelect(s)}
              className={`rounded-xl border px-2 py-2.5 font-mono text-[13px] font-medium transition-all ${
                isSel
                  ? 'border-transparent bg-gradient-to-br from-gold-strong via-gold to-[#a8791a] font-bold text-[#141007] shadow-[0_8px_22px_-8px_var(--glow)] scale-105'
                  : full
                    ? 'border-line text-ink-faint/40 line-through cursor-not-allowed'
                    : 'border-line bg-surface-2 text-ink hover:border-gold/60 hover:text-gold hover:scale-105'
              }`}
            >
              {s}
            </motion.button>
          )
        })}
      </div>
      <p className="mt-3 text-[11px] text-ink-faint">Time zone: India (IST) · 30-min increments</p>
    </div>
  )
}