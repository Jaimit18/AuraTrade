import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Award, BadgeCheck, CalendarCheck2, LineChart, MessageSquareText, Play, ShieldCheck, Sparkles, Star, TrendingUp, Users, Video } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AnimatedCounter } from '../components/ui/AnimatedCounter'
import { Avatar } from '../components/ui/Avatar'
import { Button } from '../components/ui/Button'
import { Marquee, TickerItem } from '../components/ui/Marquee'
import { Reveal, Stagger, StaggerItem } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Sparkline } from '../components/ui/Sparkline'
import { ExpertCard } from '../components/ExpertCard'
import { products } from '../data/products'
import { experts } from '../data/experts'
import { marketTickers } from '../data/products'

const heroSeries = [18, 22, 20, 25, 24, 29, 27, 33, 31, 36, 34, 40, 38, 43, 41, 47, 45, 52, 49, 56]

const STATS = [
  { label: 'Verified advisors', value: 1200, suffix: '+' },
  { label: 'Consultations held', value: 48500, suffix: '+' },
  { label: 'Average client rating', value: 4.9, decimals: 1 },
  { label: 'Markets covered', value: 24, suffix: '' },
]

const STEPS = [
  { n: '01', icon: Users, title: 'Find your advisor', desc: 'Browse verified specialists across options, macros, value investing and more — filter by rating, price and availability.' },
  { n: '02', icon: CalendarCheck2, title: 'Book in seconds', desc: 'Pick a consultation tier, choose a date on the calendar, grab a time slot — instant confirmation.' },
  { n: '03', icon: Video, title: 'Meet live on video', desc: 'Join a premium video room with screen-share, integrated chat and a shared whiteboard for your portfolio.' },
]

const TESTIMONIALS = [
  {
    quote: 'AuraTrade changed how I treat my portfolio. The advisor read my risk profile better than my broker did in ten years.',
    name: 'Rohan Mehta', role: 'Startup Founder · Mumbai', avatar: 'https://randomuser.me/api/portraits/men/11.jpg', metric: '+9.2% in 3 months',
  },
  {
    quote: 'The video sessions feel like institutional research delivered with zero jargon. Worth every rupee.',
    name: 'Sana Kapoor', role: 'Dermatologist · Delhi', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', metric: 'Paid back fee in one trade',
  },
  {
    quote: 'From terrified of F&O to running a disciplined iron-condor book. The mentorship tier is a masterpiece.',
    name: 'Arvind Nair', role: 'Engineer · Bengaluru', avatar: 'https://randomuser.me/api/portraits/men/86.jpg', metric: 'Weekly income since week 2',
  },
]

const FEATURES = [
  { icon: ShieldCheck, title: 'Vetted & verified', desc: 'Every advisor passes credential checks, track-record audits and a 3-stage interview.' },
  { icon: Video, title: 'Crystal-clear video', desc: 'HD rooms with screen-share, noise isolation and recording so you never miss a level.' },
  { icon: LineChart, title: 'Live market context', desc: 'Sessions pull live charts and your watchlist into the call for grounded decisions.' },
  { icon: MessageSquareText, title: 'Integrated chat', desc: 'Follow-up questions land directly in your thread with priority response guarantees.' },
]

export default function Landing() {
  return (
    <div className="overflow-x-clip">
      <Hero />
      <Ticker />
      <Stats />
      <HowItWorks />
      <FeaturedAdvisors />
      <WhyUs />
      <Testimonials />
      <MarketPreview />
      <FinalCTA />
    </div>
  )
}

/* ---------------------------------------------------------------- Hero */
function Hero() {
  return (
    <section className="relative flex min-h-screen items-center pt-28 pb-16">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(70%_60%_at_50%_20%,#000,transparent)]" />
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[480px] w-[480px] rounded-full bg-gold/12 blur-[130px] animate-aurora" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-gold/8 blur-[120px] animate-aurora" style={{ animationDelay: '-6s' }} />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold/5 px-4 py-2 text-xs font-semibold text-gold"
          >
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse-dot" />
            India's #1 private advisory network
            <Sparkles size={14} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[2.9rem] font-semibold leading-[1.04] tracking-tight text-ink text-balance sm:text-6xl lg:text-[4.4rem]"
          >
            Guidance that makes <em className="gold-text italic">markets</em> feel personal.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft md:text-lg"
          >
            Book 1:1 video consultations with verified stock-market advisors. See their real track record,
            chat before you commit, and make decisions with institutional clarity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3.5"
          >
            <Button to="/experts" size="lg">
              Explore advisors <ArrowRight size={18} />
            </Button>
            <Link
              to="/experts/adrian-cole"
              className="group inline-flex h-[52px] items-center gap-3 rounded-full border border-line bg-surface/60 px-5 pr-6 text-sm font-semibold text-ink transition-all hover:border-gold/50"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-gold transition-transform group-hover:scale-110">
                <Play size={14} className="ml-0.5" />
              </span>
              See a live session
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <div className="flex -space-x-3">
              {['/portraits/women/65.jpg', '/portraits/men/85.jpg', '/portraits/men/21.jpg', '/portraits/women/79.jpg'].map((a) => (
                <Avatar key={a} src={`https://randomuser.me${a}`} alt="client" size={38} className="ring-[3px] ring-[var(--bg)]" />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className="fill-gold text-gold" />)}
                <span className="ml-1 text-sm font-bold text-ink">4.9</span>
              </div>
              <p className="text-xs text-ink-soft">Trusted by 48,500+ investors</p>
            </div>
          </motion.div>
        </div>

        {/* Hero visual */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          <div className="glass card-lux relative z-10 rounded-[2rem] p-6 shadow-ambient">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-faint">AuraWatch · NIFTY 50</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-mono text-3xl font-bold text-ink">26,438</span>
                  <span className="flex items-center gap-1 font-mono text-sm font-semibold text-emerald-400">
                    <TrendingUp size={13} /> +112.4
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint">1D</span>
            </div>
            <div className="mt-4">
              <Sparkline data={heroSeries} width={520} height={180} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { k: 'Vol', v: '₹1.42T' },
                { k: 'Adv/Dec', v: '1,842 / 692' },
                { k: 'Open Int.', v: '₹8.95T' },
              ].map((s) => (
                <div key={s.k} className="rounded-2xl border border-line bg-surface-2/60 px-3 py-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">{s.k}</p>
                  <p className="mt-0.5 font-mono text-sm font-semibold text-ink">{s.v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute -left-12 top-8 z-20 animate-float"
          >
            <div className="glass card-lux flex items-center gap-3 rounded-2xl px-4 py-3 shadow-ambient">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400"><TrendingUp size={18} /></span>
              <div>
                <p className="text-[11px] text-ink-soft">Covered-call strategy</p>
                <p className="font-mono text-sm font-bold text-emerald-400">+18.2% this month</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute -right-8 bottom-10 z-20 animate-float"
            style={{ animationDelay: '-3.2s' }}
          >
            <div className="glass card-lux flex items-center gap-3 rounded-2xl px-4 py-3 shadow-ambient">
              <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" alt="Adrian Cole" size={40} status="online" />
              <div>
                <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">Adrian Cole <BadgeCheck size={13} className="text-gold" /></p>
                <p className="text-[11px] text-emerald-400">● Available now · talks live</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- Ticker */
function Ticker() {
  return (
    <section className="relative border-y border-line bg-surface/40 py-4">
      <Marquee duration={48}>
        {marketTickers.map((t) => (
          <TickerItem key={t.sym} sym={t.sym} value={t.value} change={t.change} />
        ))}
      </Marquee>
    </section>
  )
}

/* ---------------------------------------------------------------- Stats */
function Stats() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
      <Reveal>
        <div className="grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="group bg-surface px-8 py-10 text-center transition-colors duration-500 hover:bg-gold/5">
              <p className="font-display text-5xl font-semibold text-ink">
                <AnimatedCounter value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix ?? ''} className="gold-text" />
              </p>
              <p className="mt-2 text-[13px] font-medium uppercase tracking-wider text-ink-soft">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

/* ---------------------------------------------------------------- How it works */
function HowItWorks() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[600px] -translate-x-1/2 rounded-full bg-gold/6 blur-[110px]" />
      <SectionHeading
        eyebrow="How it works"
        title={<>Wealth advice, <em className="gold-text italic">without the friction</em></>}
        sub="Three steps between you and a decision you can defend."
      />
      <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
        {STEPS.map((s) => (
          <StaggerItem key={s.n}>
            <div className="card-lux group relative h-full overflow-hidden p-8">
              <span className="pointer-events-none absolute -right-3 -top-6 font-display text-[7rem] font-bold leading-none text-ink/[0.04] transition-colors duration-500 group-hover:text-gold/10">
                {s.n}
              </span>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/20 to-transparent text-gold transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                <s.icon size={22} />
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold text-ink">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
              <div className="mt-6 h-px w-12 bg-gradient-to-r from-gold to-transparent transition-all duration-500 group-hover:w-full" />
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}

/* ---------------------------------------------------------------- Featured */
function FeaturedAdvisors() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          align="left"
          eyebrow="Featured advisors"
          title={<>Meet the <em className="gold-text italic">minds</em> behind the calls</>}
          sub="Every profile is independently verified — credentials, track record and reviews."
        />
        <Reveal delay={0.2}>
          <Button to="/experts" variant="outline">
            View all 1,200+ advisors <ArrowRight size={16} />
          </Button>
        </Reveal>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {experts.slice(0, 3).map((e, i) => (
          <ExpertCard key={e.id} expert={e} index={i} />
        ))}
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- Why us */
function WhyUs() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
      <SectionHeading
        eyebrow="Why AuraTrade"
        title={<>Built like a <em className="gold-text italic">family office</em>, priced for everyone</>}
      />
      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <StaggerItem key={f.title}>
            <div className="card-lux group h-full p-7">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/12 text-gold transition-all duration-500 group-hover:shadow-[0_0_30px_-6px_var(--glow)]">
                <f.icon size={21} />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink">{f.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{f.desc}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-[2rem] border border-line bg-surface-2/60 px-8 py-6">
          {[
            { icon: Award, t: 'Top 1% advisor acceptance' },
            { icon: ShieldCheck, t: 'Refund guarantee on first call' },
            { icon: Users, t: 'Average 18 min to a slot' },
          ].map((it) => (
            <div key={it.t} className="flex items-center gap-2.5 text-sm font-medium text-ink-soft">
              <it.icon size={17} className="text-gold" />
              {it.t}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

/* ---------------------------------------------------------------- Testimonials */
function Testimonials() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
      <SectionHeading
        eyebrow="Client stories"
        title={<>Real investors, <em className="gold-text italic">real outcomes</em></>}
      />
      <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <StaggerItem key={t.name}>
            <figure className="card-lux flex h-full flex-col p-7">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className="fill-gold text-gold" />)}
              </div>
              <blockquote className="mt-4 flex-1 font-display text-lg leading-relaxed text-ink">
                "{t.quote}"
              </blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <Avatar src={t.avatar} alt={t.name} size={44} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-ink-soft">{t.role}</p>
                </div>
                <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-400">
                  {t.metric}
                </span>
              </div>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}

/* ---------------------------------------------------------------- Market preview */
function MarketPreview() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          align="left"
          eyebrow="The vault"
          title={<>Tools &amp; resources that <em className="gold-text italic">compound</em></>}
          sub="Courses, research, scanners and signals — curated by the same team that advises on calls."
        />
        <Reveal delay={0.2}>
          <Button to="/app/shop" variant="outline">
            Browse the vault <ArrowRight size={16} />
          </Button>
        </Reveal>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((p, i) => (
          <Reveal key={p.id} delay={i * 0.07}>
            <Link to="/app/shop" className="card-lux group block overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                {p.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-gradient-to-br from-gold-strong via-gold to-[#a8791a] px-2.5 py-1 text-[10px] font-bold text-[#141007]">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="p-5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-ink-faint">{p.category}</p>
                <h3 className="mt-1.5 truncate font-display text-lg font-semibold text-ink">{p.name}</h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-mono text-lg font-bold text-gold">${p.price}</span>
                  <span className="flex items-center gap-1 text-xs text-ink-soft"><Star size={12} className="fill-gold text-gold" /> {p.rating} ({p.reviews})</span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- Final CTA */
function FinalCTA() {
  const scroll = useScroll({ target: undefined, offset: ['start end', 'end start'] })
  const y = useTransform(scroll.scrollYProgress, [0, 1], [60, -60])
  return (
    <section className="mx-auto max-w-7xl px-5 pt-12 md:px-8">
      <motion.div style={{ y }} className="relative overflow-hidden rounded-[2.5rem] border border-gold/30 p-10 text-center md:p-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/[0.14] via-transparent to-gold/[0.07]" />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(60%_60%_at_50%_40%,#000,transparent)]" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[560px] -translate-x-1/2 rounded-full bg-gold/15 blur-[100px]" />
        <div className="relative">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold">
              <Sparkles size={13} /> Begin your journey
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-semibold leading-tight text-ink md:text-6xl">
              Your next best <em className="gold-text italic">trade</em> starts with a conversation.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-md text-ink-soft">
              Join 48,500+ investors who stopped guessing. Book a video call and meet an advisor before you commit to anything.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
              <Button to="/signup" size="lg">
                Create free account <ArrowRight size={18} />
              </Button>
              <Button to="/experts" variant="outline" size="lg">
                Meet an advisor
              </Button>
            </div>
          </Reveal>
        </div>
      </motion.div>
    </section>
  )
}