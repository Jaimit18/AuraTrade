import { motion } from 'framer-motion'
import {
  ChartNoAxesCombined, LayoutGrid, Settings,
  ShoppingBag, UserRound, Video, VideoOff,
} from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { useCart } from './Cart'
import { Navbar } from './Navbar'

const NAV = [
  { to: '/app', label: 'Overview', icon: LayoutGrid, end: true },
  { to: '/app/experts', label: 'Advisors', icon: UserRound },
  { to: '/app/chat', label: 'Messages', icon: Video },
  { to: '/app/shop', label: 'The Vault', icon: ShoppingBag, badge: 'use-cart' },
  { to: '/app/profile', label: 'Profile', icon: ChartNoAxesCombined },
]

const BOTTOM = [
  { to: '/app/settings', label: 'Settings', icon: Settings },
]

export function AppLayout() {
  const { count } = useCart()
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex max-w-7xl gap-6 px-5 pt-24 md:px-8">
        <aside className="sticky top-24 hidden h-[calc(100vh-120px)] w-60 shrink-0 flex-col justify-between lg:flex">
          <nav className="space-y-1.5">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={'end' in n ? n.end : false}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? 'border-gold/40 bg-gold/8 text-gold shadow-[0_10px_30px_-14px_var(--glow)]'
                      : 'border-transparent text-ink-soft hover:bg-surface hover:text-ink'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <n.icon size={17} className={isActive ? 'text-gold' : 'text-ink-faint'} />
                    {n.label}
                    {'badge' in n && n.badge === 'use-cart' && count > 0 && (
                      <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1.5 text-[10px] font-bold text-[#141007]">
                        {count}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <nav className="space-y-1.5">
            {BOTTOM.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? 'border-gold/40 bg-gold/8 text-gold'
                      : 'border-transparent text-ink-soft hover:bg-surface hover:text-ink'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <n.icon size={17} className={isActive ? 'text-gold' : 'text-ink-faint'} />
                    {n.label}
                  </>
                )}
              </NavLink>
            ))}
            <div className="mt-2 rounded-2xl border border-line bg-surface-2 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-ink">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Markets open
              </div>
              <p className="mt-1.5 text-[11px] leading-relaxed text-ink-faint">Your advisors are online for live video sessions.</p>
              <NavLink
                to="/app/call/b-1001"
                className="mt-3 flex h-9 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-strong via-gold to-[#a8791a] text-xs font-bold text-[#141007]"
              >
                <Video size={13} /> Join session
              </NavLink>
            </div>
          </nav>
        </aside>

        <main className="min-w-0 flex-1 pb-24">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* mobile bottom nav */}
      <div className="glass fixed inset-x-4 bottom-4 z-40 flex items-center justify-around rounded-3xl border border-line px-2 py-2 lg:hidden">
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={'end' in n ? n.end : false}
            className={({ isActive }) =>
              `relative flex h-11 items-center justify-center gap-1.5 rounded-2xl px-3.5 text-[11px] font-semibold transition-colors ${
                isActive ? 'text-gold' : 'text-ink-faint'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <n.icon size={18} />
                <span className="hidden sm:inline">{n.label}</span>
                {isActive && <motion.span layoutId="mnav" className="absolute inset-0 -z-10 rounded-2xl bg-gold/10" />}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

// Used in empty / coming-soon surfaces
export function ComingSoon({ icon: Icon = VideoOff, title, desc }: { icon?: typeof VideoOff; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-line-strong py-24 text-center">
      <span className="animate-float inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold">
        <Icon size={28} />
      </span>
      <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-ink-soft">{desc}</p>
    </div>
  )
}