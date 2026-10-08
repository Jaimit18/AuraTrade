import { motion } from 'framer-motion'
import { Camera, Check, Crown, Edit3, Heart, Lock, ShieldCheck, Sparkles, TrendingUp, Video } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '../components/ui/Avatar'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { bookmarkedExperts } from '../data/products'
import { getExpert } from '../data/experts'

const STATS = [
  { label: 'Portfolio value', value: '$84,210', delta: '+18.4% YTD', up: true },
  { label: 'Consultations', value: '23', delta: '4 this month', up: true },
  { label: 'Sessions joined', value: '96%', delta: 'attendance rate', up: true },
  { label: 'Calls completed', value: '21 / 23', delta: '2 upcoming', up: true },
]

export default function Profile() {
  const [editing, setEditing] = useState(false)
  const saved = bookmarkedExperts.map((id) => getExpert(id)!).filter(Boolean)

  return (
    <div className="space-y-8">
      {/* Header card */}
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-line">
          <div className="h-40 bg-[radial-gradient(90%_200%_at_50%_0%,var(--glow),transparent_60%)] bg-grid [mask-image:radial-gradient(80%_80%_at_50%_0%,#000,transparent)]" />
          <div className="relative px-6 pb-6 md:px-8">
            <div className="-mt-12 flex flex-wrap items-end justify-between gap-4">
              <div className="flex items-end gap-5">
                <div className="relative">
                  <Avatar src="https://randomuser.me/api/portraits/men/47.jpg" alt="Aarav Sharma" size={112} ring className="shadow-2xl" />
                  <button className="absolute -bottom-1 -right-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface text-ink-soft transition-colors hover:text-gold">
                    <Camera size={13} />
                  </button>
                </div>
                <div className="pb-1">
                  <div className="flex items-center gap-2.5">
                    <h1 className="font-display text-3xl font-semibold text-ink">Aarav Sharma</h1>
                    <span className="inline-flex items-center gap-1 rounded-full bg-gold/12 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gold">
                      <Crown size={12} /> Gold Member
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink-soft">Venture investor · Mumbai, IN · Member since 2023</p>
                </div>
              </div>
              <div className="flex gap-2.5 pb-1">
                <Button variant="outline" onClick={() => setEditing((v) => !v)}>
                  <Edit3 size={15} /> {editing ? 'Done' : 'Edit profile'}
                </Button>
                <Button to="/app/settings"><ShieldCheck size={15} /> Preferences</Button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05}>
            <div className="card-lux p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">{s.label}</p>
              <p className="mt-1.5 font-mono text-2xl font-bold text-ink">{s.value}</p>
              <p className={`mt-1 flex items-center gap-1 text-xs font-semibold ${s.up ? 'text-emerald-400' : 'text-ink-faint'}`}>
                <TrendingUp size={12} /> {s.delta}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* About / edit */}
        <Reveal className="lg:col-span-2">
          <div className="h-full rounded-3xl border border-line bg-surface p-6">
            <h2 className="font-display text-xl font-semibold text-ink">{editing ? 'Edit your details' : 'About you'}</h2>
            <div className={`mt-5 space-y-4 ${editing ? '' : 'pointer-events-none opacity-90'}`}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Full name</label>
                  <input defaultValue="Aarav Sharma" className="input-lux" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Location</label>
                  <input defaultValue="Mumbai, India" className="input-lux" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Short bio</label>
                  <textarea
                    rows={3}
                    defaultValue="Angel investor focused on early-stage fintech and long-term index compounding. Currently building a covered-call ladder for my F&O sleeve."
                    className="input-lux resize-none py-3"
                  />
                </div>
              </div>
            </div>
            {editing && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 flex gap-3">
                <Button onClick={() => setEditing(false)}>Save changes <Check size={16} /></Button>
                <Button variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
              </motion.div>
            )}
          </div>
        </Reveal>

        {/* Watchlist */}
        <Reveal delay={0.08}>
          <div className="h-full rounded-3xl border border-line bg-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-ink"><Heart size={17} className="text-rose-400" /> Watchlist</h2>
              <Link to="/app/experts" className="text-xs font-semibold text-gold hover:underline">Browse</Link>
            </div>
            <div className="mt-5 space-y-3">
              {saved.map((e) => (
                <Link key={e.id} to={`/app/experts/${e.id}`} className="card-lux flex items-center gap-3 p-3.5">
                  <Avatar src={e.avatar} alt={e.name} size={46} status={e.availabilityStatus} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">{e.name}</p>
                    <p className="truncate text-xs text-ink-soft">{e.title}</p>
                  </div>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-faint"><Video size={13} /></span>
                </Link>
              ))}
              {saved.length === 0 && <p className="py-8 text-center text-sm text-ink-soft">No saved advisors yet.</p>}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Badges */}
      <Reveal>
        <div className="rounded-3xl border border-line bg-surface p-6">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-ink"><Sparkles size={17} className="text-gold" /> Achievements</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Video, label: '10 calls completed', done: true },
              { icon: TrendingUp, label: 'First +10% month', done: true },
              { icon: Heart, label: '20 advisors watchlisted', done: false },
              { icon: Lock, label: '1-year discipline streak', done: false },
            ].map((b) => (
              <div key={b.label} className={`rounded-2xl border p-4 text-center ${b.done ? 'border-gold/40 bg-gold/8' : 'border-line bg-surface-2 opacity-55'}`}>
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${b.done ? 'bg-gold text-[#141007]' : 'bg-line text-ink-faint'}`}>
                  <b.icon size={19} />
                </span>
                <p className="mt-3 text-xs font-semibold text-ink">{b.label}</p>
                <p className="mt-0.5 text-[10px] text-ink-faint">{b.done ? 'Unlocked' : 'Locked'}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  )
}