import { motion } from 'framer-motion'
import {
  ArrowUpRight, Bell, CalendarCheck2, Clock3, Flame, MoonStar, Sparkles, TrendingUp, Trophy, Video,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Avatar } from '../components/ui/Avatar'
import { Reveal, Stagger, StaggerItem } from '../components/ui/Reveal'
import { Sparkline } from '../components/ui/Sparkline'
import { sparkSeries } from '../data/products'
import { experts } from '../data/experts'
import { useBookings } from '../lib/bookings'

const idxSeries = [
  { t: '09:15', v: 26210 }, { t: '09:45', v: 26280 }, { t: '10:15', v: 26190 }, { t: '10:45', v: 26250 },
  { t: '11:15', v: 26320 }, { t: '11:45', v: 26290 }, { t: '12:15', v: 26360 }, { t: '12:45', v: 26310 },
  { t: '13:15', v: 26380 }, { t: '13:45', v: 26440 }, { t: '14:15', v: 26410 }, { t: '14:45', v: 26480 },
  { t: '15:15', v: 26438 },
]

const FEED = [
  { icon: Video, tint: 'text-gold bg-gold/10', title: 'Adrian Cole shared session notes', time: '2m ago' },
  { icon: TrendingUp, tint: 'text-emerald-400 bg-emerald-400/10', title: 'Your watchlist is up +1.8% today', time: '26m ago' },
  { icon: CalendarCheck2, tint: 'text-gold bg-gold/10', title: 'Mira Bedrossian opened a new slot for Fri', time: '1h ago' },
  { icon: Flame, tint: 'text-orange-400 bg-orange-400/10', title: 'Bank Nifty broke 57k — kit Kat alert 🚀', time: '2h ago' },
  { icon: Trophy, tint: 'text-gold bg-gold/10', title: 'You hit your 100th consultation badge', time: '1d ago' },
]

export default function Dashboard() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const { bookings } = useBookings()
  const upcoming = bookings.filter((b) => b.status === 'upcoming').slice(0, 2)
  const rec = experts.filter((e) => ['adrian-cole', 'mira-bedrossian', 'riyaz-khan'].includes(e.id))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Reveal>
            <p className="text-sm text-ink-soft">{today}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-1 font-display text-3xl font-semibold text-ink md:text-4xl">
              Good morning, <em className="gold-text italic">Aarav</em> ⚡
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-1.5 text-sm text-ink-soft">Your portfolio is up <span className="font-semibold text-emerald-400">+1.8%</span> today — keep the discipline.</p>
          </Reveal>
        </div>
        <Reveal delay={0.12}>
          <div className="flex items-center gap-3">
            <button className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink-soft transition-colors hover:text-gold">
              <Bell size={18} />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-gold animate-pulse-dot" />
            </button>
            <div className="flex items-center gap-3 rounded-full border border-line bg-surface py-1.5 pl-1.5 pr-4">
              <Avatar src="https://randomuser.me/api/portraits/men/47.jpg" alt="Aarav Sharma" size={38} />
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-ink">Aarav Sharma</p>
                <p className="text-[10px] text-ink-faint">Gold Member</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Market overview */}
      <Reveal>
        <section className="card-lux overflow-hidden p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-faint">Watchlist · NIFTY 50</p>
              <div className="mt-1 flex items-baseline gap-3">
                <span className="font-mono text-3xl font-bold text-ink">26,438.10</span>
                <span className="flex items-center gap-1 font-mono text-sm font-bold text-emerald-400"><TrendingUp size={13} /> +112.35 (+0.42%)</span>
              </div>
            </div>
            <div className="flex gap-1.5">
              {['1D', '1W', '1M'].map((r) => (
                <button key={r} className={`h-8 rounded-full border px-3.5 text-xs font-semibold transition-colors ${r === '1D' ? 'border-gold/60 bg-gold/10 text-gold' : 'border-line text-ink-soft hover:text-gold'}`}>{r}</button>
              ))}
            </div>
          </div>
          <div className="mt-5 h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={idxSeries} margin={{ top: 6, right: 6, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="niftyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d9b24a" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#d9b24a" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="niftyLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8a650a" />
                    <stop offset="100%" stopColor="#f2d27e" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 6" stroke="var(--grid)" vertical={false} />
                <XAxis dataKey="t" tick={{ fill: 'var(--ink-faint)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={['dataMin - 40', 'dataMax + 40']} tick={{ fill: 'var(--ink-faint)', fontSize: 11 }} axisLine={false} tickLine={false} width={52} tickFormatter={(v) => v.toLocaleString()} />
                <Tooltip
                  cursor={{ stroke: 'var(--gold)', strokeDasharray: '4 4' }}
                  contentStyle={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, fontSize: 12, color: 'var(--ink)' }}
                  labelStyle={{ color: 'var(--ink-soft)' }}
                  formatter={(v) => [Number(v).toLocaleString(), 'Index']}
                />
                <Area type="monotone" dataKey="v" stroke="url(#niftyLine)" strokeWidth={2.5} fill="url(#niftyGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming calls */}
        <Reveal className="lg:col-span-2">
          <section className="h-full rounded-3xl border border-line bg-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-ink">Upcoming sessions</h2>
              <Link to="/experts" className="text-xs font-semibold text-gold hover:underline">Book another</Link>
            </div>
            <div className="mt-5 space-y-3">
              {upcoming.map((b) => {
                const ex = experts.find((e) => e.id === b.expertId)!
                return (
                  <motion.div key={b.id} whileHover={{ x: 4 }} className="group flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface-2 p-4 transition-colors hover:border-gold/40">
                    <Avatar src={ex.avatar} alt={ex.name} size={48} status={ex.availabilityStatus} />
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">{ex.name}</p>
                      <p className="text-xs text-ink-soft">{b.tierName} session · ${b.price}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-ink-soft">
                      <span className="flex items-center gap-1.5"><CalendarCheck2 size={14} className="text-gold" /> {b.date}</span>
                      <span className="flex items-center gap-1.5"><Clock3 size={14} className="text-gold" /> {b.time.split('—')[0]}</span>
                    </div>
                    <Link to={`/app/call/${b.id}`} className="inline-flex h-10 items-center gap-2 rounded-full bg-gradient-to-br from-gold-strong via-gold to-[#a8791a] px-5 text-xs font-bold text-[#141007] shadow-[0_8px_24px_-10px_var(--glow)] transition-transform group-hover:scale-105">
                      <Video size={14} /> Join
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </section>
        </Reveal>

        {/* Activity */}
        <Reveal delay={0.08}>
          <section className="h-full rounded-3xl border border-line bg-surface p-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
              <MoonStar size={18} className="text-gold" /> Activity
            </h2>
            <div className="mt-5 space-y-1">
              {FEED.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.07 }} className="flex items-start gap-3 rounded-2xl px-2 py-3 transition-colors hover:bg-surface-2">
                  <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${f.tint}`}><f.icon size={15} /></span>
                  <div className="min-w-0">
                    <p className="text-[13px] leading-snug text-ink">{f.title}</p>
                    <p className="mt-0.5 text-[11px] text-ink-faint">{f.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </Reveal>
      </div>

      {/* Recommended advisors */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
            <Sparkles size={19} className="text-gold" /> Recommended for you
          </h2>
          <Link to="/app/experts" className="inline-flex items-center gap-1 text-xs font-semibold text-gold hover:underline">View all <ArrowUpRight size={13} /></Link>
        </div>
        <Stagger className="mt-5 grid gap-5 md:grid-cols-3">
          {rec.map((e) => (
            <StaggerItem key={e.id}>
              <Link to={`/app/experts/${e.id}`} className="card-lux group flex items-center gap-4 p-4">
                <Avatar src={e.avatar} alt={e.name} size={60} status={e.availabilityStatus} ring />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink group-hover:text-gold">{e.name}</p>
                  <p className="truncate text-xs text-ink-soft">{e.title}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="flex items-center gap-1 font-mono text-xs font-bold text-gold">
                      <TrendingUp size={11} /> {e.consultations.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-ink-faint">
                      <Sparkline data={e.tags.length > 0 ? sparkSeries.up : sparkSeries.day} width={70} height={22} stroke="var(--gold)" strokeWidth={1.6} />
                    </span>
                  </div>
                </div>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink-faint transition-all group-hover:border-gold/60 group-hover:text-gold"><ArrowUpRight size={15} /></span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  )
}