import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'

function buildMonth(year: number, month: number) {
  const first = new Date(year, month, 1)
  const startDay = (first.getDay() + 6) % 7 // Monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = Array(startDay).fill(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

// deterministic pseudo-random "full" days based on date
function isFull(day: number) {
  const seed = day * 7 + 13
  return seed % 9 === 0
}

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

export function BookingCalendar({
  selected,
  onSelect,
  label = 'Select a date',
}: {
  selected: string | null
  onSelect: (iso: string, display: string) => void
  label?: string
}) {
  const today = new Date()
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() })

  const { year, month } = view
  const cells = useMemo(() => buildMonth(year, month), [year, month])
  const monthName = new Date(year, month, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' })

  const goTo = (m: number, y: number) => setView(({ year: yy, month: mm }) => {
    const target = mm + m
    return { year: yy + y, month: target < 0 ? 11 : target > 11 ? 0 : target }
  })

  const canGoPrev = year > today.getFullYear() || (year === today.getFullYear() && month > today.getMonth())
  const display = (day: number) => new Date(year, month, day).toLocaleDateString('en-US', {
    weekday: 'short', day: 'numeric', month: 'short',
  })
  const toLocalIso = (day: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  return (
    <div className="rounded-3xl border border-line bg-surface p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ink">{label}</p>
        <div className="flex items-center gap-2">
          <p className="font-display text-base font-semibold text-ink-soft">{monthName}</p>
          <button
            disabled={!canGoPrev}
            onClick={() => goTo(-1, month === 0 ? -1 : 0)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-soft transition-colors enabled:hover:border-gold/60 enabled:hover:text-gold disabled:opacity-40"
            aria-label="Previous month"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={() => goTo(1, month === 11 ? 1 : 0)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-gold/60 hover:text-gold"
            aria-label="Next month"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((w) => (
          <span key={w} className="pb-2 text-[10px] font-bold uppercase tracking-wider text-ink-faint">{w}</span>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <span key={`e-${i}`} />
          const isPast = new Date(year, month, day, 0, 0, 0, 0) < new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0)
          const full = isFull(day)
          const iso = toLocalIso(day)
          const isSel = selected === iso
          const isToday = new Date(year, month, day).toDateString() === today.toDateString()

          return (
            <button
              key={iso}
              disabled={isPast || full}
              onClick={() => onSelect(iso, display(day))}
              aria-pressed={isSel}
              className={`relative flex h-11 items-center justify-center rounded-xl text-sm transition-all ${
                isSel
                  ? 'bg-gradient-to-br from-gold-strong via-gold to-[#a8791a] font-bold text-[#141007] shadow-[0_8px_22px_-8px_var(--glow)] scale-105'
                  : !isPast && !full
                    ? 'text-ink hover:bg-gold/10 hover:scale-105'
                    : full
                      ? 'text-ink-faint/40 line-through cursor-not-allowed'
                      : 'text-ink-faint/35 cursor-not-allowed'
              }`}
            >
              {day}
              {isToday && !isSel && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-gold" />}
              {full && !isPast && <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-400/70" />}
            </button>
          )
        })}
      </div>
      <div className="mt-4 flex items-center gap-4 border-t border-line pt-3 text-[11px] text-ink-faint">
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-gold" /> Available</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-400/70" /> Fully booked</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-ink-faint/30" /> Past</span>
      </div>
    </div>
  )
}