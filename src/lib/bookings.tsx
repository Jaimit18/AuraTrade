import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { bookings as seed } from '../data/products'
import type { Booking } from '../types'

type BookingsCtx = {
  bookings: Booking[]
  addBooking: (b: Omit<Booking, 'id' | 'status'> & { status?: Booking['status'] }) => Booking
}

const Ctx = createContext<BookingsCtx | null>(null)

export function BookingsProvider({ children }: { children: ReactNode }) {
  const [extra, setExtra] = useState<Booking[]>([])

  const addBooking = useCallback((b: Omit<Booking, 'id' | 'status'> & { status?: Booking['status'] }) => {
    const booking: Booking = { ...b, status: b.status ?? 'upcoming', id: `b-${Date.now()}` }
    setExtra((cur) => [booking, ...cur])
    return booking
  }, [])

  const bookings = useMemo(() => [...extra, ...seed], [extra])

  return <Ctx.Provider value={{ bookings, addBooking }}>{children}</Ctx.Provider>
}

export function useBookings() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useBookings must be used within BookingsProvider')
  return ctx
}