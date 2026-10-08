import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, ShoppingCart, Trash2, X } from 'lucide-react'
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { products } from '../data/products'
import type { CartItem, Product } from '../types'
import { Button } from './ui/Button'

type CartCtx = {
  items: CartItem[]
  add: (p: Product) => void
  remove: (id: string) => void
  changeQty: (id: string, delta: number) => void
  clear: () => void
  openCart: () => void
  count: number
  total: number
}

const Ctx = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [open, setOpen] = useState(false)

  const add = (p: Product) => {
    setItems((cur) => {
      const found = cur.find((c) => c.product.id === p.id)
      if (found) return cur.map((c) => (c.product.id === p.id ? { ...c, qty: c.qty + 1 } : c))
      return [...cur, { product: p, qty: 1 }]
    })
    setOpen(true)
  }

  const remove = (id: string) => setItems((cur) => cur.filter((c) => c.product.id !== id))
  const changeQty = (id: string, delta: number) =>
    setItems((cur) =>
      cur
        .map((c) => (c.product.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c))
        .filter((c) => c.qty > 0),
    )
  const clear = () => setItems([])

  const { count, total } = useMemo(
    () => ({
      count: items.reduce((a, c) => a + c.qty, 0),
      total: items.reduce((a, c) => a + c.qty * c.product.price, 0),
    }),
    [items],
  )

  const value: CartCtx = { items, add, remove, changeQty, clear, openCart: () => setOpen(true), count, total }

  return (
    <Ctx.Provider value={value}>
      {children}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="fixed right-0 top-0 z-[95] flex h-full w-[min(94vw,420px)] flex-col border-l border-line bg-surface"
            >
              <div className="flex items-center justify-between border-b border-line px-6 py-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <ShoppingBag size={17} />
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold text-ink">Your Cart</p>
                    <p className="text-xs text-ink-soft">{count} items selected</p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="text-ink-faint transition-colors hover:text-ink">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                {items.length === 0 && (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-surface-2 text-ink-faint">
                      <ShoppingCart size={26} />
                    </span>
                    <p className="text-sm font-medium text-ink-soft">Your cart is empty</p>
                    <p className="max-w-[220px] text-xs text-ink-faint">Explore the vault to add tools, courses & research.</p>
                  </div>
                )}
                {items.map((c) => (
                  <motion.div
                    layout
                    key={c.product.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 rounded-2xl border border-line bg-surface-2 p-3"
                  >
                    <img src={c.product.image} alt={c.product.name} className="h-16 w-16 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-semibold text-ink">{c.product.name}</p>
                      <p className="text-xs text-ink-faint">{c.product.category}</p>
                      <div className="mt-1.5 flex items-center justify-between">
                        <span className="font-mono text-sm font-bold text-gold">${c.product.price}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => changeQty(c.product.id, -1)} className="rounded-md border border-line p-1 text-ink-soft hover:text-ink">
                            <Minus size={12} />
                          </button>
                          <span className="w-5 text-center text-sm font-semibold">{c.qty}</span>
                          <button onClick={() => changeQty(c.product.id, 1)} className="rounded-md border border-line p-1 text-ink-soft hover:text-ink">
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => remove(c.product.id)} className="self-start text-ink-faint transition-colors hover:text-rose-400">
                      <Trash2 size={15} />
                    </button>
                  </motion.div>
                ))}
              </div>

              {items.length > 0 && (
                <div className="border-t border-line px-6 py-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink-soft">Subtotal</span>
                    <span className="font-mono text-lg font-bold text-ink">${total.toFixed(2)}</span>
                  </div>
                  <Button className="mt-4 w-full" size="lg" onClick={() => { clear(); setOpen(false) }}>
                    Checkout · Secure payment
                  </Button>
                  <p className="mt-3 text-center text-[11px] text-ink-faint">Demo checkout — no real payment is processed.</p>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  )
}

export function useCart() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

/** Re-export catalog lookup so any page can find a product by id */
export function getProduct(id: string) {
  return products.find((p) => p.id === id)
}