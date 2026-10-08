import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../lib/theme'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`relative inline-flex h-10 w-[72px] items-center rounded-full border border-line bg-surface px-1.5 transition-colors ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ x: dark ? -4 : 4, opacity: 0 }}
          animate={{ x: dark ? 34 : 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring', stiffness: 460, damping: 28 }}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-gold-strong to-[#a8791a] text-[#141007] shadow-md"
        >
          {dark ? <Moon size={15} /> : <Sun size={15} />}
        </motion.span>
      </AnimatePresence>
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint">
        <Sun size={13} />
      </span>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint">
        <Moon size={13} />
      </span>
    </button>
  )
}