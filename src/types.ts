export type AvailabilityStatus = 'online' | 'busy' | 'away'

export type PriceTier = {
  id: string
  name: string
  price: number
  duration: number // minutes
  tagline: string
  features: string[]
  popular?: boolean
}

export type Review = {
  id: string
  author: string
  avatar: string
  rating: number
  date: string
  text: string
  outcome: string
}

export type Expert = {
  id: string
  name: string
  title: string
  avatar: string
  verified: boolean
  yearsExperience: number
  consultations: number
  rating: number
  reviewsCount: number
  responseTime: string
  availabilityStatus: AvailabilityStatus
  languages: string[]
  education: string[]
  certifications: string[]
  experience: { period: string; role: string; org: string }[]
  markets: string[]
  tags: string[]
  bio: string
  tiers: PriceTier[]
  reviews: Review[]
  followers: number
  sessionsThisWeek: number
  cover: string
}

export type Product = {
  id: string
  name: string
  price: number
  originalPrice?: number
  category: string
  image: string
  rating: number
  reviews: number
  badge?: string
  popular?: boolean
  description: string
}

export type ChatThread = {
  id: string
  expertId: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  messages: { from: 'me' | 'them'; text: string; time: string }[]
}

export type CartItem = { product: Product; qty: number }

export type Booking = {
  id: string
  expertId: string
  tierName: string
  price: number
  date: string
  time: string
  status: 'upcoming' | 'completed' | 'cancelled'
}