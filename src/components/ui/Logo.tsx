import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none" aria-hidden>
      <defs>
        <linearGradient id="lgGold" x1="0" y1="0" x2="40" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f6df9c" />
          <stop offset="0.45" stopColor="#d9b24a" />
          <stop offset="0.75" stopColor="#8a650a" />
          <stop offset="1" stopColor="#f2d27e" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="37" height="37" rx="12" stroke="url(#lgGold)" strokeWidth="1.6" opacity="0.9" />
      <path
        d="M9 26.5 15.8 18.5 21.4 23.5 31 13"
        stroke="url(#lgGold)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="31" cy="13" r="2.6" fill="url(#lgGold)" />
    </svg>
  )
}

export default function Logo({ size = 34 }: { size?: number }) {
  return (
    <Link to="/" className="group flex items-center gap-3">
      <motion.span whileHover={{ rotate: -6, scale: 1.04 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }} className="inline-flex">
        <LogoMark size={size} />
      </motion.span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-semibold tracking-tight text-ink">
          Aura<span className="gold-text italic">Trade</span>
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink-faint">
          private wealth
        </span>
      </span>
    </Link>
  )
}