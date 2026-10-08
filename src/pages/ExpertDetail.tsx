import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, BadgeCheck, BookOpen, Briefcase, CalendarCheck2,
  Clock, GraduationCap, Globe2, Heart, MessageSquareText, PhoneCall,
  ShieldCheck, Star, TrendingUp, Users, Video,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BookingCalendar } from '../components/BookingCalendar'
import { TimeSlots } from '../components/TimeSlots'
import { TierPicker } from '../components/TierPicker'
import { useToast } from '../components/Toast'
import { Avatar, StatusPill } from '../components/ui/Avatar'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { Stars } from '../components/ui/Stars'
import { getExpert } from '../data/experts'

export default function ExpertDetail() {
  const { id } = useParams()
  const expert = getExpert(id ?? '')
  const [saved, setSaved] = useState(false)
  const [tier, setTier] = useState(expert?.tiers.find((t) => t.popular)?.id ?? expert?.tiers[0]?.id ?? 'advisory')
  const [date, setDate] = useState<string | null>(null)
  const [dateLabel, setDateLabel] = useState('')
  const [slot, setSlot] = useState<string | null>(null)
  const { push } = useToast()

  if (!expert) {
    return (
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-5 text-center">
        <p className="font-display text-4xl font-semibold text-ink">Advisor not found</p>
        <Button to="/experts" className="mt-6">Back to network</Button>
      </div>
    )
  }

  const { reviews } = expert
  const headlines = reviews.reduce<Record<string, number>>((acc, r) => {
    acc[r.outcome] = (acc[r.outcome] ?? 0) + 1
    return acc
  }, {})

  const bookEnabled = date && slot
  const activeTier = expert.tiers.find((t) => t.id === tier) ?? expert.tiers[0]
  const prefill = { tier, date, dateLabel, slot }

  return (
    <div className="mx-auto max-w-7xl px-5 pt-28 md:px-8">
      {/* Breadcrumb */}
      <Reveal>
        <Link to="/experts" className="inline-flex items-center gap-1.5 text-sm text-ink-faint transition-colors hover:text-gold">
          <ArrowLeft size={15} /> Back to all advisors
        </Link>
      </Reveal>

      {/* Hero */}
      <div className="mt-6 overflow-hidden rounded-[2rem] border border-line">
        <div className="relative h-56 md:h-72">
          <img src={expert.cover} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(60%_80%_at_50%_100%,#000,transparent)]" />
        </div>
        <div className="relative px-6 pb-8 md:px-10">
          <div className="-mt-14 flex flex-wrap items-end justify-between gap-6">
            <div className="flex items-end gap-5">
              <Avatar src={expert.avatar} alt={expert.name} size={128} status={expert.availabilityStatus} ring className="drop-shadow-2xl" />
              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">{expert.name}</h1>
                  {expert.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gold/12 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gold">
                      <BadgeCheck size={13} /> Verified
                    </span>
                  )}
                  <StatusPill status={expert.availabilityStatus} />
                </div>
                <p className="mt-1.5 text-base font-medium text-ink-soft">{expert.title}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 pb-1">
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setSaved((s) => !s)
                  push(saved ? 'info' : 'success', saved ? 'Removed from watchlist' : 'Added to watchlist', expert.name)
                }}
              >
                <Heart size={15} className={saved ? 'fill-rose-400 text-rose-400' : ''} />
                {saved ? 'Saved' : 'Watchlist'}
              </Button>
              <Button to={`/experts/${expert.id}/book`} state={prefill} size="lg">
                <Video size={17} /> Book a video call
              </Button>
            </div>
          </div>

          {/* Key stats */}
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { icon: TrendingUp, k: 'Experience', v: `${expert.yearsExperience} years` },
              { icon: Users, k: 'Consultations', v: expert.consultations.toLocaleString() },
              { icon: Star, k: 'Client rating', v: `${expert.rating.toFixed(1)} / 5` },
              { icon: Clock, k: 'Responds in', v: expert.responseTime },
            ].map((s, i) => (
              <Reveal key={s.k} delay={i * 0.05}>
                <div className="rounded-2xl border border-line bg-surface-2 p-4">
                  <s.icon size={16} className="text-gold" />
                  <p className="mt-2 text-sm font-semibold text-ink">{s.v}</p>
                  <p className="text-[11px] uppercase tracking-wider text-ink-faint">{s.k}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Body grid */}
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="min-w-0 space-y-10">
          {/* About */}
          <Reveal>
            <section>
              <h2 className="font-display text-2xl font-semibold text-ink">About {expert.name.split(' ')[0]}</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{expert.bio}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {expert.tags.map((t) => (
                  <span key={t} className="rounded-full border border-gold/25 bg-gold/5 px-3 py-1.5 text-xs font-semibold text-gold">{t}</span>
                ))}
              </div>
            </section>
          </Reveal>

          {/* Markets */}
          <Reveal>
            <section>
              <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
                <Globe2 size={20} className="text-gold" /> Markets covered
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {expert.markets.map((m) => (
                  <div key={m} className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3.5 text-sm text-ink transition-colors hover:border-gold/40">
                    <span className="h-2 w-2 rounded-full bg-gold animate-pulse-dot" />
                    {m}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <span className="flex items-center gap-1.5 text-ink-soft"><Globe2 size={14} className="text-gold" /> Languages: {expert.languages.join(', ')}</span>
                <span className="text-ink-faint">·</span>
                <span className="flex items-center gap-1.5 text-ink-soft"><MessageSquareText size={14} className="text-gold" /> {expert.followers.toLocaleString()} followers</span>
              </div>
            </section>
          </Reveal>

          {/* Education & certs */}
          <Reveal>
            <section>
              <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
                <GraduationCap size={20} className="text-gold" /> Education & credentials
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-line bg-surface p-6">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-faint"><BookOpen size={14} /> Education</p>
                  <ul className="mt-4 space-y-3">
                    {expert.education.map((e) => (
                      <li key={e} className="flex items-start gap-2.5 text-sm text-ink">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border border-line bg-surface p-6">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-faint"><ShieldCheck size={14} /> Certifications</p>
                  <ul className="mt-4 space-y-3">
                    {expert.certifications.map((c) => (
                      <li key={c} className="flex items-start gap-2.5 text-sm text-ink">
                        <span className="mt-0.5 rounded-md bg-gold/12 px-1.5 py-0.5 text-[10px] font-bold text-gold">✓</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </Reveal>

          {/* Experience timeline */}
          <Reveal>
            <section>
              <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
                <Briefcase size={20} className="text-gold" /> Professional experience
              </h2>
              <div className="relative mt-6 space-y-6 border-l border-line-strong pl-6">
                {expert.experience.map((x, i) => (
                  <motion.div
                    key={x.period + i}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="relative"
                  >
                    <span className="absolute -left-[31px] top-1 flex h-3 w-3 rounded-full border-2 border-gold bg-surface" />
                    <p className="font-mono text-xs font-semibold text-gold">{x.period}</p>
                    <p className="mt-1 font-display text-lg font-semibold text-ink">{x.role}</p>
                    <p className="text-sm text-ink-soft">{x.org}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* Reviews */}
          <Reveal>
            <section>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="font-display text-2xl font-semibold text-ink">Client reviews</h2>
                <div className="flex items-center gap-3">
                  <Stars rating={expert.rating} size={16} />
                  <span className="font-mono text-2xl font-bold text-ink">{expert.rating.toFixed(1)}</span>
                  <span className="text-sm text-ink-faint">{expert.reviewsCount} reviews</span>
                </div>
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {reviews.map((r) => (
                  <figure key={r.id} className="card-lux flex h-full flex-col p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar src={r.avatar} alt={r.author} size={42} />
                        <div>
                          <p className="text-sm font-semibold text-ink">{r.author}</p>
                          <p className="text-[11px] text-ink-faint">{r.date}</p>
                        </div>
                      </div>
                      <Stars rating={r.rating} size={12} />
                    </div>
                    <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">"{r.text}"</blockquote>
                    <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/8 px-3 py-2 text-xs font-semibold text-emerald-400">
                      📈 {r.outcome}
                    </div>
                  </figure>
                ))}
              </div>
              {Object.keys(headlines).length > 0 && (
                <div className="mt-6 rounded-2xl border border-line bg-surface-2 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-ink-faint">Reported outcomes</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {Object.entries(headlines).map(([o, n]) => (
                      <span key={o} className="rounded-full border border-gold/25 bg-gold/5 px-3 py-1.5 text-xs font-medium text-ink-soft">
                        <span className="font-bold text-gold">{n}×</span> {o}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </Reveal>
        </div>

        {/* Sticky sidebar */}
        <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-ambient">
              <div className="flex items-center gap-2">
                <CalendarCheck2 size={17} className="text-gold" />
                <h3 className="font-display text-xl font-semibold text-ink">Reserve a session</h3>
              </div>
              <p className="mt-1.5 text-sm text-ink-soft">Choose a tier — changes the calendar below.</p>

              <div className="mt-5">
                <TierPicker tiers={expert.tiers} selected={tier} onSelect={setTier} />
              </div>
              <div className="mt-5">
                <BookingCalendar selected={date} onSelect={(iso, label) => { setDate(iso); setDateLabel(label) }} label="Select a date" />
              </div>
              <div className="mt-4">
                <TimeSlots selected={slot} onSelect={setSlot} />
              </div>

              <AnimatePresence>
                {bookEnabled && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <div className="mt-5 rounded-2xl border border-gold/30 bg-gold/6 p-4 text-sm">
                      <p className="flex items-center justify-between"><span className="text-ink-soft">Date</span><span className="font-semibold text-ink">{dateLabel}</span></p>
                      <p className="mt-1.5 flex items-center justify-between"><span className="text-ink-soft">Time</span><span className="font-semibold text-ink">{slot} IST</span></p>
                      <p className="mt-1.5 flex items-center justify-between"><span className="text-ink-soft">Tier</span><span className="font-semibold text-ink">{activeTier.name} · ${activeTier.price}</span></p>
                    </div>
                    <Link
                      to={`/experts/${expert.id}/book`}
                      state={prefill}
                      className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-strong via-gold to-[#a8791a] text-sm font-bold text-[#141007] shadow-[0_12px_34px_-12px_var(--glow)] transition-all hover:brightness-105"
                    >
                      Continue to confirm <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-line bg-surface p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-faint">Get in touch</p>
              <p className="mt-2 text-sm text-ink-soft">Chat before booking — ask anything about {expert.name.split(' ')[0]}'s approach.</p>
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <Button to="/app/chat" variant="outline" className="w-full"><MessageSquareText size={15} /> Chat</Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => push('info', 'Call request sent', 'Your advisor will join shortly.')}
                >
                  <PhoneCall size={15} /> Call
                </Button>
              </div>
              <div className="mt-5 flex items-center gap-2 rounded-2xl border border-line bg-surface-2 p-3 text-xs text-ink-soft">
                <ShieldCheck size={15} className="shrink-0 text-gold" />
                Satisfaction guarantee on your first call — or your money back.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}