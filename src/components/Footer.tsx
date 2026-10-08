import { motion } from 'framer-motion'
import { ArrowUpRight, Globe2, MessageCircle, Rss, Share2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from './ui/Logo'

const cols = [
  {
    title: 'Platform',
    links: [
      { label: 'Find Advisors', to: '/experts' },
      { label: 'Video Calls', to: '/app' },
      { label: 'Messaging', to: '/app/chat' },
      { label: 'The Vault', to: '/app/shop' },
      { label: 'Dashboard', to: '/app' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/' },
      { label: 'Advisor Standards', to: '/experts' },
      { label: 'Careers', to: '/' },
      { label: 'Press', to: '/' },
      { label: 'Contact', to: '/' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Market Journal', to: '/' },
      { label: 'Learning Hub', to: '/app/shop' },
      { label: 'Help Center', to: '/' },
      { label: 'Trust & Safety', to: '/' },
      { label: 'Terms of Service', to: '/' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_100%_at_50%_0%,var(--hero-ray),transparent_65%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-soft">
              The private home for serious investors. Connect with verified advisors, trade with conviction,
              and learn from minds who have been through every cycle.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {[Globe2, Rss, MessageCircle, Share2].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, scale: 1.06 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink-soft transition-colors hover:border-gold/60 hover:text-gold"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-ink-faint">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="group inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-gold"
                    >
                      {l.label}
                      <ArrowUpRight size={12} className="opacity-0 transition-all group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-xs text-ink-faint">© 2026 AuraTrade Wealth Pvt. Ltd. — Demo experience, fictional data.</p>
          <p className="text-xs text-ink-faint">
            Markets carry risk. Nothing on this platform is personalised financial advice.
          </p>
        </div>
      </div>
    </footer>
  )
}