import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Mail, ShieldCheck, Sparkles, Star, TrendingUp, User, Lock } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import Logo from '../components/ui/Logo'
import { useToast } from '../components/Toast'
import { Field } from './_authShared'

const PLAN = [
  { title: 'Free forever tier', price: '$0', note: 'Browse advisors, read reviews, send first message' },
  { title: 'Premium (recommended)', price: '$19/mo', note: 'Live market context, priority slots, vault discounts' },
]

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [plan, setPlan] = useState(1)
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()
  const { push } = useToast()

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      push('success', 'Account created', `Welcome to AuraTrade, ${name.split(' ')[0] || 'investor'}!`)
      nav('/app')
    }, 1300)
  }

  const strong = pass.length >= 8 && /[A-Z]/.test(pass) && /\d/.test(pass)

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Visual side */}
      <div className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(70%_70%_at_40%_30%,#000,transparent)]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[420px] w-[420px] rounded-full bg-gold/12 blur-[120px] animate-aurora" />
        <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full bg-gold/8 blur-[100px] animate-aurora" style={{ animationDelay: '-5s' }} />

        <div className="relative z-10">
          <Logo />
        </div>

        <div className="relative z-10 max-w-md">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/8 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
              <Sparkles size={13} /> Join free, upgrade anytime
            </span>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-tight text-ink">
              Make your first call with an <em className="gold-text italic">edge</em>.
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                { icon: Star, t: 'Verified advisors, real track records, zero hype' },
                { icon: TrendingUp, t: 'Video calls that read your watchlist live' },
                { icon: ShieldCheck, t: 'Refund guarantee on your very first call' },
              ].map((f) => (
                <li key={f.t} className="flex items-center gap-3 text-sm text-ink-soft">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold/12 text-gold"><f.icon size={16} /></span>
                  {f.t}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="relative z-10 rounded-2xl border border-line bg-surface/50 p-5 backdrop-blur">
          <div className="flex items-center gap-3">
            <p className="font-mono text-4xl font-bold gold-text">+38%</p>
            <div>
              <p className="text-xs uppercase tracking-wider text-ink-faint">Avg. first-year client result</p>
              <p className="text-xs text-ink-soft">Across 24,000 guided portfolios*</p>
            </div>
          </div>
          <p className="mt-3 text-[10px] text-ink-faint">*Demo figure for illustration. Past performance ≠ future returns.</p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center px-5 py-16 md:px-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="w-full max-w-md">
          <div className="lg:hidden"><Logo size={30} /></div>
          <h1 className="mt-8 font-display text-4xl font-semibold text-ink">Create your account</h1>
          <p className="mt-2 text-ink-soft">60 seconds to your first conversation with a verified advisor.</p>

          <form onSubmit={submit} className="mt-9 space-y-5">
            <Field label="Full name" icon={User}>
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Aarav Sharma" className="input-lux pl-11" />
            </Field>
            <Field label="Email address" icon={Mail}>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="input-lux pl-11" />
            </Field>
            <Field label="Password" hint="8+ chars, uppercase & number">
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint"><Lock size={16} /></span>
                <input type="password" required value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Create a strong password" className="input-lux pl-11" />
              </div>
              {pass.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex h-1.5 flex-1 gap-1">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className={`h-full flex-1 rounded-full transition-colors ${pass.length > (i + 1) * 3 ? (strong ? 'bg-emerald-400' : 'bg-gold') : 'bg-line-strong'}`} />
                    ))}
                  </div>
                  <AnimatePresence key={strong ? 's' : 'w'}>
                    <span className={`text-[11px] font-semibold ${strong ? 'text-emerald-400' : 'text-ink-faint'}`}>{strong ? 'Strong' : 'Weak'}</span>
                  </AnimatePresence>
                </div>
              )}
            </Field>

            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-faint">Choose a plan</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {PLAN.map((p, i) => (
                  <button
                    type="button"
                    key={p.title}
                    onClick={() => setPlan(i)}
                    className={`rounded-2xl border p-4 text-left transition-all ${plan === i ? 'border-gold/70 bg-gold/8 shadow-[0_12px_40px_-16px_var(--glow)]' : 'border-line bg-surface hover:border-gold/40'}`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-ink">{p.title}</p>
                      {plan === i && (
                        <motion.span layoutId="plan-check" className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[#141007]">
                          <Check size={12} strokeWidth={3} />
                        </motion.span>
                      )}
                    </div>
                    <p className="mt-1 font-mono text-2xl font-bold text-gold">{p.price}</p>
                    <p className="mt-1 text-[11px] text-ink-faint">{p.note}</p>
                  </button>
                ))}
              </div>
            </div>

            <Button size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#141007]/30 border-t-[#141007]" />
                  Creating account…
                </span>
              ) : (
                <>Create my account <ArrowRight size={17} /></>
              )}
            </Button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <span className="h-px flex-1 bg-line" />
            <span className="text-xs font-semibold uppercase tracking-widest text-ink-faint">or continue with</span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex h-12 items-center justify-center gap-2.5 rounded-full border border-line bg-surface text-sm font-semibold text-ink transition-all hover:border-gold/50 hover:text-gold">
              <svg width="17" height="17" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.23 1.66l3.16-3.16C17.44 1.68 14.97.72 12 .72 7.36.72 3.4 3.34 1.58 7.1l3.7 2.87C6.18 7.7 8.85 5.04 12 5.04Z"/><path fill="#4285F4" d="M23.28 12.26c0-.82-.07-1.4-.22-2.02H12v3.84h6.48c-.13 1.04-.84 2.6-2.4 3.65l3.62 2.8c2.15-1.98 3.58-4.93 3.58-8.27Z"/><path fill="#FBBC05" d="M5.28 14.03a5.16 5.16 0 0 1-.42-2.03c0-.7.15-1.38.4-2.03L1.56 7.07A12.06 12.06 0 0 0 .72 12c0 1.93.46 3.76 1.28 5.4l3.28-3.37Z"/><path fill="#34A853" d="M12 23.28c3.24 0 5.96-1.07 7.95-2.92l-3.62-2.82c-1.01.7-2.36 1.18-4.33 1.18-3.15 0-5.82-2.14-6.79-5.03l-3.7 2.87C3.4 20.66 7.36 23.28 12 23.28Z"/></svg>
              Google
            </button>
            <button className="flex h-12 items-center justify-center gap-2.5 rounded-full border border-line bg-surface text-sm font-semibold text-ink transition-all hover:border-gold/50 hover:text-gold">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="#000"><path d="M18.9 10.76v5.03a2.3 2.3 0 0 1-2.3 2.3H7.4a2.3 2.3 0 0 1-2.3-2.3V7.4a2.3 2.3 0 0 1 2.3-2.3h5.5v2.03H7.4v8.66h9.2v-5.03h2.3Zm-5.83 5.03 1.63-1.63-3.6-3.66 1.63-1.62h-5.5v5.03h5.84Z"/></svg>
              Apple
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-ink-soft">
            Already have an account?{' '}
            <Link to="/login" className="group inline-flex items-center gap-1 font-semibold text-gold hover:underline">
              <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
              Sign in here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}