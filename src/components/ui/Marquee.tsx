import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Marquee({
  children,
  reverse = false,
  className = '',
  duration = 38,
}: {
  children: ReactNode
  reverse?: boolean
  className?: string
  duration?: number
}) {
  return (
    <div className={`mask-fade-x overflow-hidden ${className}`}>
      <div
        className="flex w-max"
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        <div key="copy-a" className="flex w-max shrink-0 items-center">{children}</div>
        <div key="copy-b" className="flex w-max shrink-0 items-center">{children}</div>
      </div>
    </div>
  )
}

export function TickerItem({ sym, value, change }: { sym: string; value: string; change: number }) {
  const up = change >= 0
  return (
    <div className="flex shrink-0 items-center gap-3 px-6">
      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-soft">{sym}</span>
      <span className="font-mono text-[13px] font-medium text-ink">{value}</span>
      <motion.span
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center gap-0.5 font-mono text-[12px] font-semibold ${
          up ? 'text-emerald-400' : 'text-rose-400'
        }`}
      >
        {up ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
      </motion.span>
    </div>
  )
}