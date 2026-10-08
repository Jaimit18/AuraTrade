import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, ChartSpline, Package, Plus, Search, ShoppingBag, Star, Subscript, TrendingUp } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useCart } from '../components/Cart'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { products } from '../data/products'

const CATS = [
  { id: 'all', label: 'All', icon: Package },
  { id: 'Courses', label: 'Courses', icon: BookOpen },
  { id: 'Tools', label: 'Tools', icon: ChartSpline },
  { id: 'Books', label: 'Books', icon: Star },
  { id: 'Signals', label: 'Signals', icon: TrendingUp },
  { id: 'Subscriptions', label: 'Subscriptions', icon: Subscript },
]

export default function Marketplace() {
  const { add, count, total } = useCart()
  const [cat, setCat] = useState('all')
  const [q, setQ] = useState('')
  const [adding, setAdding] = useState<string | null>(null)

  const list = useMemo(
    () =>
      products.filter(
        (p) =>
          (cat === 'all' || p.category === cat) &&
          (p.name.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase())),
      ),
    [cat, q],
  )

  const quickAdd = (id: string) => {
    const p = products.find((x) => x.id === id)!
    setAdding(id)
    add(p)
    setTimeout(() => setAdding(null), 900)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
              The AuraTrade Vault
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink">
              Everything to <em className="gold-text italic">sharpen</em> your edge
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-2 max-w-md text-sm text-ink-soft">Courses, scanners, books and signals — curated by our own research desk.</p>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="flex items-center gap-3 rounded-3xl border border-line bg-surface px-5 py-3.5">
            <div className="flex items-center gap-2 text-sm">
              <span className="relative inline-flex">
                <ShoppingBag size={18} className="text-gold" />
                {count > 0 && (
                  <AnimatePresence>
                    <motion.span key={count} initial={{ scale: 0.4 }} animate={{ scale: 1 }} className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-[#141007]">
                      {count}
                    </motion.span>
                  </AnimatePresence>
                )}
              </span>
              <span className="font-mono text-lg font-bold gold-text">${total.toFixed(2)}</span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1 hide-scroll">
          {CATS.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-semibold transition-all ${
                cat === c.id
                  ? 'border-transparent bg-gradient-to-br from-gold-strong via-gold to-[#a8791a] text-[#141007] shadow-[0_8px_24px_-10px_var(--glow)]'
                  : 'border-line bg-surface text-ink-soft hover:border-gold/50 hover:text-gold'
              }`}
            >
              <c.icon size={14} /> {c.label}
            </button>
          ))}
        </div>
        <div className="relative sm:w-64">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search the vault…"
            className="h-11 w-full rounded-2xl border border-line bg-surface pl-10 pr-4 text-sm text-ink placeholder:text-ink-faint focus:border-gold/60 focus:outline-none focus:ring-4 focus:ring-gold/10"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {list.map((p, i) => (
          <motion.article
            key={p.id}
            layout
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
            className="card-lux group flex flex-col overflow-hidden"
          >
            <div className="relative h-44 overflow-hidden">
              <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              {p.badge && (
                <span className="absolute left-4 top-4 rounded-full bg-gradient-to-br from-gold-strong via-gold to-[#a8791a] px-2.5 py-1 text-[10px] font-bold text-[#141007] shadow-lg">
                  {p.badge}
                </span>
              )}
              {p.popular && (
                <span className="absolute right-4 top-4 rounded-full border border-gold/40 bg-[#141007]/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold backdrop-blur">
                  Popular
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-wider text-ink-faint">{p.category}</p>
                <span className="flex items-center gap-1 text-xs text-ink-soft"><Star size={11} className="fill-gold text-gold" /> {p.rating} ({p.reviews.toLocaleString()})</span>
              </div>
              <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink">{p.name}</h3>
              <p className="mt-2 line-clamp-2 flex-1 text-[13px] leading-relaxed text-ink-soft">{p.description}</p>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xl font-bold text-gold">${p.price}</span>
                  {p.originalPrice && <span className="font-mono text-xs text-ink-faint line-through">${p.originalPrice}</span>}
                </div>
                <button
                  onClick={() => quickAdd(p.id)}
                  disabled={adding === p.id}
                  className={`inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-xs font-bold transition-all ${
                    adding === p.id
                      ? 'bg-emerald-500 text-[#141007]'
                      : 'bg-gradient-to-br from-gold-strong via-gold to-[#a8791a] text-[#141007] shadow-[0_8px_22px_-10px_var(--glow)] hover:brightness-105 active:scale-95'
                  }`}
                >
                  <Plus size={14} strokeWidth={3} />
                  {adding === p.id ? 'Added' : 'Add'}
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {list.length === 0 && (
        <div className="flex flex-col items-center rounded-3xl border border-dashed border-line-strong py-20 text-center">
          <Package size={30} className="text-gold" />
          <p className="mt-4 font-display text-xl font-semibold text-ink">Nothing in this category yet</p>
          <p className="mt-1 text-sm text-ink-soft">Try another filter or check back soon.</p>
        </div>
      )}

      <div className="mt-4 flex justify-center">
        <Button variant="outline" className="px-10">Load more products</Button>
      </div>
    </div>
  )
}