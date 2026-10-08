import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Eye, EyeOff, Mail, ShieldCheck, Sparkles, Star, TrendingUp } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import Logo from '../components/ui/Logo'
import { useToast } from '../components/Toast'
import { Field } from './_authShared'

export default function Login() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()
  const { push } = useToast()

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      push('success', 'Welcome back', 'Signed in to your AuraTrade portal.')
      nav('/app')
    }, 1200)
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Visual side */}
      <div className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(70%_70%_at_40%_30%,#000,transparent)]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[420px] w-[420px] rounded-full bg-gold/12 blur-[120px] animate-aurora" />
        <div className="pointer-events-none absolute right-0 top-16 h-72 w-72 rounded-full bg-gold/8 blur-[100px] animate-aurora" style={{ animationDelay: '-8s' }} />

        <div className="relative z-10">
          <Logo />
        </div>

        <div className="relative z-10 max-w-md">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/8 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
              <ShieldCheck size={13} /> Member-only portal
            </span>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-tight text-ink">
              Your portfolio's <em className="gold-text italic">silver lining</em> starts here.
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                { icon: Star, t: 'Book verified advisors in under a minute' },
                { icon: TrendingUp, t: 'Live market context inside every video call' },
                { icon: Sparkles, t: 'Join 48,500+ investors who stopped guessing' },
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
            <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className="fill-gold text-gold" />)}</div>
            <p className="text-sm text-ink-soft">"The most professional advisory experience I've ever had."</p>
          </div>
          <p className="mt-2 text-xs font-semibold text-ink">Sana Kapoor · Dermatologist, Delhi</p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center px-5 py-16 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden"><Logo size={30} /></div>
          <h1 className="mt-8 font-display text-4xl font-semibold text-ink">Welcome back</h1>
          <p className="mt-2 text-ink-soft">Sign in to your AuraTrade portal.</p>

          <form onSubmit={submit} className="mt-9 space-y-5">
            <Field label="Email address" icon={Mail}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-lux pl-11"
              />
            </Field>
            <Field label="Password">
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  required
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="••••••••"
                  className="input-lux pr-12"
                />
                <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-faint hover:text-gold">
                  {show ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </Field>

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
                <input type="checkbox" className="checkbox-lux" defaultChecked /> Remember me
              </label>
              <Link to="/signup" className="text-sm font-medium text-gold hover:underline">Forgot password?</Link>
            </div>

            <Button size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#141007]/30 border-t-[#141007]" />
                  Signing in…
                </span>
              ) : (
                <>Sign in to portal <ArrowRight size={17} /></>
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
            New to AuraTrade?{' '}
            <Link to="/signup" className="group inline-flex items-center gap-1 font-semibold text-gold hover:underline">
              Create an account <ArrowLeft size={13} className="rotate-180 transition-transform group-hover:-translate-x-0.5" />
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}