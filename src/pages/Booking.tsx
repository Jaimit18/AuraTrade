import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BadgeCheck, CalendarCheck2, Check, Clock, CreditCard, Lock, ShieldCheck, Sparkles, Video } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { BookingCalendar } from '../components/BookingCalendar'
import { TierPicker } from '../components/TierPicker'
import { TimeSlots } from '../components/TimeSlots'
import { useToast } from '../components/Toast'
import { Avatar } from '../components/ui/Avatar'
import { Button } from '../components/ui/Button'
import { getExpert } from '../data/experts'
import { useBookings } from '../lib/bookings'

const STEPS = ['Package', 'Schedule', 'Confirm']

export default function Booking() {
  const { id } = useParams()
  const expert = getExpert(id ?? '')
  const nav = useNavigate()
  const { push } = useToast()
  const { addBooking } = useBookings()
  const location = useLocation()
  const prefill = (location.state ?? {}) as {
    tier?: string | null
    date?: string | null
    dateLabel?: string | null
    slot?: string | null
  }

  const [step, setStep] = useState(0)
  const [tier, setTier] = useState(prefill.tier ?? 'advisory')
  const [date, setDate] = useState<string | null>(prefill.date ?? null)
  const [dateLabel, setDateLabel] = useState(prefill.dateLabel ?? '')
  const [slot, setSlot] = useState<string | null>(prefill.slot ?? null)
  const [note, setNote] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (redirectTimer.current) clearTimeout(redirectTimer.current) }, [])

  if (!expert) {
    return (
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-5 text-center">
        <p className="font-display text-4xl font-semibold text-ink">Advisor not found</p>
        <Button to="/experts" className="mt-6">Back to network</Button>
      </div>
    )
  }

  const activeTier = expert.tiers.find((t) => t.id === tier) ?? expert.tiers[0]
  const canNext = step === 0 ? true : step === 1 ? Boolean(date && slot) : true

  const confirm = () => {
    setConfirmed(true)
    addBooking({
      expertId: expert.id,
      tierName: activeTier.name,
      price: activeTier.price,
      date: dateLabel,
      time: `${slot} IST`,
    })
    push('success', 'Booking confirmed', `${activeTier.name} session with ${expert.name} on ${dateLabel} at ${slot}.`)
    redirectTimer.current = setTimeout(() => nav('/app'), 3400)
  }

  if (confirmed) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5 pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-gold/30 bg-surface p-10 text-center shadow-ambient"
        >
          <div className="pointer-events-none absolute -top-20 left-1/2 h-48 w-64 -translate-x-1/2 rounded-full bg-gold/20 blur-[70px]" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 16 }}
            className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold-strong via-gold to-[#a8791a] text-[#141007] shadow-[0_0_50px_-8px_var(--glow)]"
          >
            <Check size={36} strokeWidth={3} />
          </motion.div>
          <h1 className="relative mt-6 font-display text-3xl font-semibold text-ink">You're booked!</h1>
          <p className="relative mt-3 text-ink-soft">
            {expert.name} will meet you <span className="font-semibold text-ink">{dateLabel} at {slot} IST</span> for your
            <span className="font-semibold text-gold"> {activeTier.name}</span> session.
          </p>
          <p className="relative mt-6 text-xs text-ink-faint">
            A calendar invite and video link have been sent to your email.
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-5 pt-28 md:px-8">
      <Link to={`/experts/${expert.id}`} className="inline-flex items-center gap-1.5 text-sm text-ink-faint transition-colors hover:text-gold">
        <ArrowLeft size={15} /> Back to {expert.name.split(' ')[0]}'s profile
      </Link>

      {/* Advisor + progress */}
      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Avatar src={expert.avatar} alt={expert.name} size={64} status={expert.availabilityStatus} />
          <div>
            <p className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
              {expert.name}
              {expert.verified && <BadgeCheck size={18} className="text-gold" />}
            </p>
            <p className="text-sm text-ink-soft">{expert.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex h-9 items-center gap-2 rounded-full border px-4 text-xs font-semibold transition-all ${
                i === step ? 'border-gold/60 bg-gold/10 text-gold' : i < step ? 'border-line bg-surface text-ink-soft' : 'border-line bg-surface text-ink-faint'
              }`}>
                {i < step ? <Check size={13} /> : <span>{i + 1}</span>}
                <span className="hidden sm:inline">{s}</span>
              </div>
              {i < STEPS.length - 1 && <span className={`h-px w-6 ${i < step ? 'bg-gold' : 'bg-line'}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              {step === 0 && (
                <>
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-ink">1 · Choose your package</h2>
                    <p className="mt-1 text-sm text-ink-soft">Every tier includes a 1:1 video call with screen-share and session notes.</p>
                  </div>
                  <TierPicker tiers={expert.tiers} selected={tier} onSelect={setTier} />
                </>
              )}

              {step === 1 && (
                <>
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-ink">2 · Pick a date &amp; time</h2>
                    <p className="mt-1 text-sm text-ink-soft">Slots shown in India time (IST). Green days are available, red are full.</p>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <BookingCalendar selected={date} onSelect={(iso, label) => { setDate(iso); setDateLabel(label) }} />
                    <TimeSlots selected={slot} onSelect={setSlot} />
                  </div>
                  {date && slot && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between rounded-2xl border border-gold/30 bg-gold/6 px-5 py-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                        <CalendarCheck2 size={16} className="text-gold" /> {dateLabel} · <Clock size={16} className="text-gold" /> {slot} IST
                      </div>
                      <span className="text-xs font-medium text-ink-faint">Almost there ⚡</span>
                    </motion.div>
                  )}
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-ink">3 · Confirm & pay</h2>
                    <p className="mt-1 text-sm text-ink-soft">Add a note for your advisor — they'll review it before the call.</p>
                  </div>
                  <div className="rounded-3xl border border-line bg-surface p-6">
                    <div className="space-y-4">
                      {[
                        { label: 'Advisor', val: expert.name, icon: '👤' },
                        { label: 'Package', val: `${activeTier.name} · ${activeTier.duration} min`, icon: '💼' },
                        { label: 'When', val: `${dateLabel} · ${slot} IST`, icon: '📅' },
                      ].map((row) => (
                        <div key={row.label} className="flex items-center justify-between border-b border-line pb-4 text-sm last:border-0 last:pb-0">
                          <span className="text-ink-soft">{row.icon} {row.label}</span>
                          <span className="font-semibold text-ink">{row.val}</span>
                        </div>
                      ))}
                    </div>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={3}
                      placeholder="What would you like to cover? (e.g. review my options portfolio, plan a covered-call ladder…)"
                      className="mt-5 w-full rounded-2xl border border-line bg-surface-2 px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-gold/60 focus:outline-none focus:ring-4 focus:ring-gold/10"
                    />
                  </div>
                  <div className="rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/8 to-transparent p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-ink-soft">Payable now</p>
                        <p className="font-mono text-4xl font-bold gold-text">${activeTier.price}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-ink-soft">
                        <Lock size={14} className="text-gold" /> Secured by 256-bit SSL
                      </div>
                    </div>
                    <div className="mt-5 flex h-14 items-center gap-3 rounded-2xl border border-line bg-surface-2 px-5">
                      <CreditCard size={19} className="text-gold" />
                      <span className="font-mono text-sm tracking-widest text-ink-soft">•••• •••• •••• 4821</span>
                      <span className="ml-auto text-xs font-semibold text-emerald-400">● Card ready</span>
                    </div>
                    <button onClick={confirm} className="mt-4 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-strong via-gold to-[#a8791a] py-3.5 text-sm font-bold text-[#141007] shadow-[0_14px_40px_-12px_var(--glow)] transition-all hover:brightness-105">
                      <Sparkles size={17} /> Confirm & send booking
                    </button>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4 text-xs text-ink-soft">
                    <ShieldCheck size={16} className="mt-0.5 shrink-0 text-gold" />
                    <span>Full refund if you're unhappy with your first call. Cancel free up to 12 hours before your slot. Demo checkout — no real payment.</span>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mini summary */}
        <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-ambient">
            <p className="text-xs font-bold uppercase tracking-wider text-ink-faint">Session summary</p>
            <div className="mt-4 flex items-center gap-3">
              <Avatar src={expert.avatar} alt={expert.name} size={48} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">{expert.name}</p>
                <p className="truncate text-xs text-ink-soft">{activeTier.name} · {activeTier.duration} min</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
              <p className="flex items-center justify-between text-ink-soft"><span>Subtotal</span><span className="font-semibold text-ink">${activeTier.price}</span></p>
              <p className="flex items-center justify-between text-ink-soft"><span>Platform fee</span><span className="font-semibold text-emerald-400">Free</span></p>
              <p className="flex items-center justify-between border-t border-line pt-3 text-ink"><span className="font-semibold">Total</span><span className="font-mono text-xl font-bold text-gold">${activeTier.price}</span></p>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-surface-2 px-4 py-3 text-[11px] text-ink-soft">
              <Video size={14} className="shrink-0 text-gold" /> The video link appears instantly after confirmation.
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            {step > 0 && (
              <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
                <ArrowLeft size={15} /> Back
              </Button>
            )}
            {step < 2 ? (
              <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext} className="flex-1">
                Continue <ArrowRight size={16} />
              </Button>
            ) : (
              <Button onClick={confirm} className="flex-1">
                Confirm booking <Check size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}