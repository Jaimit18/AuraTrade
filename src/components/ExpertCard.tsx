import { motion } from 'framer-motion'
import { ArrowUpRight, BadgeCheck, CalendarCheck, Clock, Globe2, MessagesSquare, PlayCircle, TrendingUp, Video } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Expert } from '../types'
import { Avatar, StatusPill } from './ui/Avatar'
import { Stars } from './ui/Stars'

export function ExpertCard({ expert, index = 0 }: { expert: Expert; index?: number }) {
  const best = expert.tiers[1].popular ? expert.tiers[1] : expert.tiers[0]
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="card-lux group relative flex flex-col overflow-hidden"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={expert.cover}
          alt=""
          className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
        <div className="absolute inset-x-5 bottom-3 flex items-end justify-between">
          <Avatar src={expert.avatar} alt={expert.name} size={72} ring status={expert.availabilityStatus} className="drop-shadow-xl" />
          <StatusPill status={expert.availabilityStatus} />
        </div>
        {expert.verified && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#141007]/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#f2d27e] backdrop-blur">
            <BadgeCheck size={12} /> Verified
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-gold">
              {expert.name}
            </h3>
            <p className="mt-0.5 text-[13px] font-medium text-ink-soft">{expert.title}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint">from</p>
            <p className="font-mono text-lg font-bold text-gold">${best.price}</p>
            <p className="text-[10px] text-ink-faint">/ {best.duration} min</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Stars rating={expert.rating} size={13} />
          <span className="text-xs font-semibold text-ink">{expert.rating.toFixed(1)}</span>
          <span className="text-xs text-ink-faint">({expert.reviewsCount})</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-[12px] text-ink-soft">
          <span className="flex items-center gap-1.5"><TrendingUp size={13} className="text-gold" /> {expert.yearsExperience} yrs experience</span>
          <span className="flex items-center gap-1.5"><CalendarCheck size={13} className="text-gold" /> {expert.consultations.toLocaleString()} calls</span>
          <span className="flex items-center gap-1.5"><Globe2 size={13} className="text-gold" /> {expert.languages.join(', ')}</span>
          <span className="flex items-center gap-1.5"><Clock size={13} className="text-gold" /> Responds {expert.responseTime}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {expert.tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-ink-soft">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-5">
          <Link
            to={`/experts/${expert.id}/book`}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-strong via-gold to-[#a8791a] text-sm font-semibold text-[#141007] shadow-[0_8px_26px_-10px_var(--glow)] transition-all hover:brightness-105 active:scale-[0.98]"
          >
            <Video size={15} /> Book a call
          </Link>
          <Link
            to={`/experts/${expert.id}`}
            aria-label={`View ${expert.name}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-gold/60 hover:text-gold"
          >
            <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="mt-3 flex items-center gap-3 text-[11px] text-ink-faint">
          <span className="inline-flex items-center gap-1"><MessagesSquare size={11} /> {expert.followers.toLocaleString()} followers</span>
          <span className="inline-flex items-center gap-1"><PlayCircle size={11} /> {expert.sessionsThisWeek} sessions this week</span>
        </div>
      </div>
    </motion.article>
  )
}