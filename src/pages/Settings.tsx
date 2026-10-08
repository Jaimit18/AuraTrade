import { motion } from 'framer-motion'
import { Bell, Check, CreditCard, Globe2, KeyRound, Lock, ShieldCheck, Smartphone, Sparkles, Type } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { useToast } from '../components/Toast'
import { useTheme } from '../lib/theme'

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`relative h-7 w-12 rounded-full border transition-colors ${on ? 'border-gold/60 bg-gold/20' : 'border-line bg-surface-2'}`}
    >
      <motion.span
        animate={{ x: on ? 22 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`absolute top-[3px] h-[22px] w-[22px] rounded-full ${on ? 'bg-gold' : 'bg-ink-faint'}`}
      />
    </button>
  )
}

export default function Settings() {
  const { push } = useToast()
  const { theme } = useTheme()
  const [notifs, setNotifs] = useState({
    calls: true, markets: true, marketing: false, promo: true,
  })
  const [twoFA, setTwoFA] = useState(false)
  const [digest, setDigest] = useState<'daily' | 'weekly' | 'off'>('weekly')

  const toggle = (k: keyof typeof notifs) => setNotifs((n) => ({ ...n, [k]: !n[k] }))

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <Reveal>
          <h1 className="font-display text-4xl font-semibold text-ink">Settings</h1>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-2 text-sm text-ink-soft">Tune your AuraTrade experience — appearance, alerts and security.</p>
        </Reveal>
      </div>

      <Reveal>
        <section className="rounded-3xl border border-line bg-surface p-6">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-ink"><Type size={17} className="text-gold" /> Appearance</h2>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface-2 p-4">
            <div>
              <p className="text-sm font-semibold text-ink">{theme === 'dark' ? 'Dark mode' : 'Light mode'}</p>
              <p className="text-xs text-ink-soft">A comfortable, luxury studio look for market hours.</p>
            </div>
            <ThemeToggle />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface-2 p-4">
            <div>
              <p className="text-sm font-semibold text-ink">Font scale</p>
              <p className="text-xs text-ink-soft">Default · Aa</p>
            </div>
            <div className="flex gap-1.5">
              {['A', 'A', 'A'].map((s, i) => (
                <button key={i} className={`h-9 rounded-xl border px-3.5 font-display text-sm transition-colors ${i === 0 ? 'border-gold/60 bg-gold/10 text-gold' : 'border-line text-ink-soft hover:text-gold'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.04}>
        <section className="rounded-3xl border border-line bg-surface p-6">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-ink"><Bell size={17} className="text-gold" /> Notifications</h2>
          <div className="mt-5 space-y-3">
            {[
              { k: 'calls' as const, label: 'Upcoming calls & reminders', desc: 'Bookings, calendar invites, session links.' },
              { k: 'markets' as const, label: 'Market & watchlist alerts', desc: 'Price moves and setup alerts on your watchlist.' },
              { k: 'marketing' as const, label: 'Newsletter & insights', desc: 'AuraTrade journal, a weekly macro read.' },
              { k: 'promo' as const, label: 'Vault offers', desc: 'Discounts on courses, tools and memberships.' },
            ].map((n) => (
              <div key={n.k} className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface-2 p-4">
                <div>
                  <p className="text-sm font-semibold text-ink">{n.label}</p>
                  <p className="text-xs text-ink-soft">{n.desc}</p>
                </div>
                <Toggle on={notifs[n.k]} onChange={() => toggle(n.k)} />
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-4" onClick={() => push('success', 'Preferences saved', 'Notification settings updated.')}><Check size={15} /> Save preferences</Button>
        </section>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        <Reveal delay={0.06}>
          <section className="h-full rounded-3xl border border-line bg-surface p-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-ink"><ShieldCheck size={17} className="text-gold" /> Security</h2>
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-line bg-surface-2 p-4">
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink"><KeyRound size={15} /> Two-factor auth</p>
                  <p className="text-xs text-ink-soft">Protect your portal with an app code.</p>
                </div>
                <Toggle on={twoFA} onChange={() => { setTwoFA((v) => !v); push(twoFA ? 'info' : 'success', twoFA ? '2FA disabled' : '2FA enabled', 'An authenticator setup email is on its way.') }} />
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-line bg-surface-2 p-4">
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink"><Smartphone size={15} /> Active sessions</p>
                  <p className="text-xs text-ink-soft">2 devices currently signed in.</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => push('info', 'Signed out others', 'Other sessions were revoked.')}>Manage</Button>
              </div>
              <Button variant="outline" className="w-full" onClick={() => push('error', 'Password change', 'Demo — change it in a real build.')}><Lock size={15} /> Change password</Button>
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.1}>
          <section className="h-full rounded-3xl border border-line bg-surface p-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-ink"><CreditCard size={17} className="text-gold" /> Billing & plan</h2>
            <div className="mt-5 rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/10 to-transparent p-5">
              <p className="flex items-center gap-2 text-sm font-bold text-ink"><Sparkles size={15} className="text-gold" /> Gold Member</p>
              <p className="mt-1 text-xs text-ink-soft">$19/month · renews Oct 1, 2026</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="font-mono text-xs text-ink-soft">•••• 4821</span>
                <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-emerald-400">Active</span>
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-ink-soft"><Globe2 size={14} /> Region</span>
                <span className="font-semibold text-ink">India (IN) · ₹ / $</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-ink-soft"><Type size={14} /> Digest</span>
                <div className="flex gap-1.5">
                  {(['daily', 'weekly', 'off'] as const).map((d) => (
                    <button key={d} onClick={() => setDigest(d)} className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize transition-colors ${digest === d ? 'border-gold/60 bg-gold/10 text-gold' : 'border-line text-ink-soft hover:text-gold'}`}>{d}</button>
                  ))}
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={() => push('info', 'Download invoice', 'Invoices are available in the demo.')}>Download invoice</Button>
            </div>
          </section>
        </Reveal>
      </div>
    </div>
  )
}