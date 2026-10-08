import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'gold' | 'outline' | 'ghost' | 'white' | 'danger'
type Size = 'sm' | 'md' | 'lg'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight whitespace-nowrap transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-gold/60 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer'

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-6 text-sm',
  lg: 'h-[52px] px-8 text-[15px]',
}

const variants: Record<Variant, string> = {
  gold: 'shimmer-btn text-[#141007] bg-gradient-to-br from-gold-strong via-gold to-[#a8791a] shadow-[0_10px_30px_-10px_var(--glow)] hover:shadow-[0_18px_44px_-12px_var(--glow)] hover:brightness-105 active:scale-[0.98]',
  outline:
    'border border-line-strong text-ink hover:border-gold/70 hover:text-gold hover:shadow-[0_8px_30px_-12px_var(--glow)] active:scale-[0.98] bg-surface/40',
  ghost: 'text-ink-soft hover:text-ink hover:bg-ink/5 active:scale-[0.98]',
  white:
    'text-[#141007] bg-white hover:bg-[#f6f0df] shadow-lg shadow-black/10 active:scale-[0.98]',
  danger:
    'text-[#141007] bg-gradient-to-br from-[#f87171] to-[#b91c1c] hover:brightness-105 active:scale-[0.98]',
}

type Props = {
  variant?: Variant
  size?: Size
  to?: string
  state?: unknown
  children: ReactNode
  className?: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

export function Button({ variant = 'gold', size = 'md', to, state, children, className = '', ...rest }: Props) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`
  const inner = <span className="relative z-10 inline-flex items-center gap-2">{children}</span>

  if (to) {
    return (
      <Link to={to} state={state} className={cls}>
        {inner}
      </Link>
    )
  }
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  )
}

export function IconButton({
  className = '',
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink-soft transition-colors hover:text-gold hover:border-gold/50 ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}