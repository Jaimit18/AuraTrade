import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { ArrowUpRight, LogIn, Menu, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useCart } from './Cart'
import Logo from './ui/Logo'
import { ThemeToggle } from './ui/ThemeToggle'

const NAV: { to: string; label: string; end?: boolean }[] = [
  { to: '/', label: 'Home', end: true },
  { to: '/experts', label: 'Advisors' },
  { to: '/app/chat', label: 'Messages' },
  { to: '/app/shop', label: 'The Vault' },
  { to: '/app', label: 'Dashboard', end: true },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()
  const location = useLocation()
  const { count, openCart } = useCart()

  useEffect(() => scrollY.on('change', (v) => setScrolled(v > 24)), [scrollY])
  useEffect(() => setMobileOpen(false), [location.pathname])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass border-b border-line py-2.5' : 'bg-transparent py-4'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `group relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-gold' : 'text-ink-soft hover:text-ink'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {n.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <ThemeToggle className="hidden sm:inline-flex" />
            <button
              onClick={openCart}
              aria-label={`Open cart (${count} items)`}
              className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink-soft transition-colors hover:text-gold hover:border-gold/50 sm:inline-flex"
            >
              <ShoppingBag size={17} />
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-gold-strong to-[#a8791a] text-[10px] font-bold text-[#141007]"
                >
                  {count}
                </motion.span>
              )}
            </button>
            <Link
              to="/login"
              className="hidden h-10 items-center gap-2 rounded-full border border-line bg-surface px-5 text-sm font-semibold text-ink-soft transition-colors hover:border-gold/50 hover:text-gold lg:inline-flex"
            >
              Sign in
              <LogIn size={15} />
            </Link>
            <Link
              to="/app"
              className="hidden h-10 items-center gap-2 rounded-full bg-gradient-to-br from-gold-strong via-gold to-[#a8791a] px-5 text-sm font-semibold text-[#141007] shadow-[0_10px_30px_-10px_var(--glow)] transition-all hover:brightness-105 hover:shadow-[0_16px_40px_-12px_var(--glow)] lg:inline-flex"
            >
              My Portal
              <ArrowUpRight size={15} />
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="fixed right-0 top-0 z-[85] flex h-full w-[min(84vw,360px)] flex-col border-l border-line bg-surface p-6 lg:hidden"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button onClick={() => setMobileOpen(false)} className="text-ink-faint hover:text-ink">
                  <X size={22} />
                </button>
              </div>
              <nav className="mt-10 flex flex-col gap-1">
                {NAV.map((n, i) => (
                  <motion.div
                    key={n.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06 }}
                  >
                    <NavLink
                      to={n.to}
                      end={n.end}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-xl font-medium transition-colors ${
                          isActive ? 'gold-text' : 'text-ink hover:bg-surface-2'
                        }`
                      }
                    >
                      {n.label}
                      <ArrowUpRight size={18} className="text-ink-faint" />
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto space-y-3">
                <ThemeToggle />
                <Link
                  to="/app"
                  className="flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-br from-gold-strong via-gold to-[#a8791a] text-sm font-semibold text-[#141007]"
                >
                  Open My Portal
                </Link>
                <Link to="/login" className="flex h-12 w-full items-center justify-center rounded-full border border-line text-sm font-semibold text-ink">
                  Sign in
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}