import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Field({
  label,
  hint,
  icon: Icon,
  children,
}: {
  label: string
  hint?: string
  icon?: React.ComponentType<{ size?: number | string; className?: string }>
  children: ReactNode
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-ink">{label}</span>
        {hint && <span className="text-[11px] text-ink-faint">{hint}</span>}
      </div>
      <div className="relative">
        {Icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint">
            <Icon size={16} />
          </span>
        )}
        {children}
      </div>
    </label>
  )
}

export function PasswordStrengthRing() {
  return (
    <motion.span className="absolute right-4 top-1/2 -translate-y-1/2">
      <svg width="20" height="20" viewBox="0 0 20 20" className="-rotate-90">
        <circle cx="10" cy="10" r="8" fill="none" stroke="var(--line)" strokeWidth="2" />
        <motion.circle
          cx="10"
          cy="10" r="8" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 0.66 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
    </motion.span>
  )
}