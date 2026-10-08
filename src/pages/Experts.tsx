import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ExpertCard } from '../components/ExpertCard'
import { Reveal } from '../components/ui/Reveal'
import { experts } from '../data/experts'

const CATS = [
  { id: 'all', label: 'All' },
  { id: 'options', label: 'Options & F&O' },
  { id: 'value', label: 'Value Investing' },
  { id: 'technical', label: 'Technical Analysis' },
  { id: 'macro', label: 'Global Macro' },
  { id: 'risk', label: 'Risk Management' },
  { id: 'psych', label: 'Psychology & Discipline' },
  { id: 'ipo', label: 'IPO & FinTech' },
]

const CAT_KEYWORDS: Record<string, string[]> = {
  options: ['options', 'f&o', 'greeks', 'derivatives', 'iron condor', 'option chain', 'covered', 'calls', 'puts', 'spreads'],
  value: ['fundamental', 'value', 'earnings', 'sector', 'equity', 'book value'],
  technical: ['price action', 'intraday', 'swing', 'technical', 'chart', 'support/resistance', 'setup'],
  macro: ['macro', 'fx', 'forex', 'treasuries', 'global', 'rates', 'esg', 'commodities', 'dollar'],
  risk: ['risk', 'allocation', 'drawdown', 'defensive', 'portfolio', 'volatility', 'retirement'],
  psych: ['psychology', 'discipline', 'mindset', 'habits', 'behavioral', 'overtrading'],
  ipo: ['ipo', 'fintech', 'startup', 'venture', 'neobank', 'private equity'],
}

const PRICE_RANGES = [
  { id: 'any', label: 'Any price', min: 0, max: Infinity },
  { id: 'under50', label: 'Under $50', min: 0, max: 50 },
  { id: '50to150', label: '$50 – $150', min: 50, max: 150 },
  { id: '150plus', label: '$150+', min: 150, max: Infinity },
]

export default function Experts() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('all')
  const [price, setPrice] = useState('any')
  const [onlineOnly, setOnlineOnly] = useState(false)
  const [sort, setSort] = useState<'rating' | 'price' | 'experts'>('rating')

  const list = useMemo(() => {
    const pr = PRICE_RANGES.find((p) => p.id === price)!
    const keywords = cat === 'all' ? [] : CAT_KEYWORDS[cat] ?? []
    let out = experts.filter((e) => {
      const haystack = [e.name, e.title, e.bio, ...e.tags, ...e.markets].join(' ').toLowerCase()
      const matchCat = keywords.length === 0 || keywords.some((k) => haystack.includes(k))
      const minPrice = Math.min(...e.tiers.map((t) => t.price))
      const matchPrice = minPrice >= pr.min && minPrice <= pr.max
      const matchOnline = !onlineOnly || e.availabilityStatus === 'online'
      const q = query.trim().toLowerCase()
      const matchQuery = !q || haystack.includes(q)
      return matchCat && matchPrice && matchOnline && matchQuery
    })
    out = [...out].sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating
      if (sort === 'price') return Math.min(...a.tiers.map((t) => t.price)) - Math.min(...b.tiers.map((t) => t.price))
      return b.consultations - a.consultations
    })
    return out
  }, [query, cat, price, onlineOnly, sort])

  return (
    <div className="mx-auto max-w-7xl px-5 pt-28 md:px-8">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
          Advisor network
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h1 className="mt-5 max-w-2xl font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink">
          Choose your <em className="gold-text italic">guide</em> into the market
        </h1>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mt-4 max-w-xl text-ink-soft">
          1,200+ verified professionals across every style — filter by specialty, budget and availability.
        </p>
      </Reveal>

      {/* Filter bar */}
      <Reveal delay={0.2}>
        <div className="mt-10 flex flex-col gap-3 rounded-3xl border border-line bg-surface/70 p-4 backdrop-blur lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, skill or market…"
              className="h-12 w-full rounded-2xl border border-line bg-surface-2 pl-11 pr-4 text-sm text-ink placeholder:text-ink-faint focus:border-gold/60 focus:outline-none focus:ring-4 focus:ring-gold/10"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="h-12 rounded-2xl border border-line bg-surface-2 px-4 text-sm text-ink focus:border-gold/60 focus:outline-none"
            >
              <option value="rating">Top rated</option>
              <option value="price">Price low → high</option>
              <option value="experts">Most consulted</option>
            </select>
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="h-12 rounded-2xl border border-line bg-surface-2 px-4 text-sm text-ink focus:border-gold/60 focus:outline-none"
            >
              {PRICE_RANGES.map((p) => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
            <label
              className={`flex h-12 cursor-pointer items-center gap-2 rounded-2xl border px-4 text-sm font-medium transition-all ${
                onlineOnly ? 'border-gold/60 bg-gold/10 text-gold' : 'border-line bg-surface-2 text-ink-soft'
              }`}
            >
              <input type="checkbox" checked={onlineOnly} onChange={(e) => setOnlineOnly(e.target.checked)} className="sr-only" />
              <span className={`h-2 w-2 rounded-full ${onlineOnly ? 'bg-gold animate-pulse-dot' : 'bg-ink-faint/50'}`} />
              Available now
            </label>
          </div>
        </div>
      </Reveal>

      {/* Category chips */}
      <div className="mt-5 flex gap-2 overflow-x-auto pb-1 hide-scroll">
        {CATS.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            aria-pressed={cat === c.id}
            className={`relative shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition-all ${
              cat === c.id ? 'border-transparent bg-gradient-to-br from-gold-strong via-gold to-[#a8791a] text-[#141007]' : 'border-line bg-surface text-ink-soft hover:border-gold/50 hover:text-gold'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-ink-soft">
          Showing <span className="font-semibold text-ink">{list.length}</span> of {experts.length} advisors
        </p>
        {(query || cat !== 'all' || price !== 'any' || onlineOnly) && (
          <button
            onClick={() => { setQuery(''); setCat('all'); setPrice('any'); setOnlineOnly(false) }}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-faint hover:text-gold"
          >
            <X size={13} /> Clear filters
          </button>
        )}
      </div>

      {list.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-[2rem] border border-dashed border-line-strong py-24 text-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold"><SlidersHorizontal size={26} /></span>
          <h3 className="mt-5 font-display text-2xl font-semibold text-ink">No advisors match</h3>
          <p className="mt-2 max-w-sm text-sm text-ink-soft">Try widening your budget or removing the availability filter.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 pb-10 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((e, i) => (
            <ExpertCard key={e.id} expert={e} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}