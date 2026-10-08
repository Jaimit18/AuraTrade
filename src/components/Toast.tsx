import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, X, XCircle } from 'lucide-react'
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

type ToastKind = 'success' | 'error' | 'info'
type Toast = { id: number; kind: ToastKind; title: string; message?: string }

const ToastCtx = createContext<{ push: (kind: ToastKind, title: string, message?: string) => void } | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const push = useCallback((kind: ToastKind, title: string, message?: string) => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, kind, title, message }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200)
  }, [])

  const dismiss = (id: number) => setToasts((t) => t.filter((x) => x.id !== id))

  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[120] flex w-[min(92vw,360px)] flex-col gap-3">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 60, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="pointer-events-auto glass rounded-2xl border border-line-strong p-4 shadow-ambient"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5">
                  {t.kind === 'success' && <CheckCircle2 size={19} className="text-emerald-400" />}
                  {t.kind === 'error' && <XCircle size={19} className="text-rose-400" />}
                  {t.kind === 'info' && <Info size={19} className="text-gold" />}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink">{t.title}</p>
                  {t.message && <p className="mt-0.5 text-[13px] text-ink-soft">{t.message}</p>}
                </div>
                <button onClick={() => dismiss(t.id)} className="text-ink-faint hover:text-ink">
                  <X size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastCtx)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}