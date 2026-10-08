import { motion } from 'framer-motion'
import { ArrowUp, Check, CheckCheck, MessageSquarePlus, Mic, Phone, Search, Smile, Video } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '../components/ui/Avatar'
import { chatThreads } from '../data/products'
import type { ChatThread } from '../types'

export default function Chat() {
  const [activeId, setActiveId] = useState(chatThreads[0].id)
  const [threads, setThreads] = useState(() => chatThreads.map((t) => ({ ...t, messages: [...t.messages] })))
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)
  const [queried, setQueried] = useState('')
  const active = threads.find((t) => t.id === activeId) ?? threads[0]
  const scrollRef = useRef<HTMLDivElement>(null)

  const selectedThread = active
  const messages = selectedThread.messages

  useEffect(() => {
    setTyping(true)
    const timer = setTimeout(() => setTyping(false), 1400)
    return () => clearTimeout(timer)
  }, [activeId])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages.length, typing])

  const send = () => {
    if (!draft.trim()) return
    const text = draft.trim()
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    setThreads((ts) =>
      ts.map((t) =>
        t.id === activeId
          ? { ...t, lastMessage: text, time: 'now', unread: 0, messages: [...t.messages, { from: 'me' as const, text, time }] }
          : t,
      ),
    )
    setDraft('')
  }

  const filtered = threads.filter((t) => t.name.toLowerCase().includes(queried.toLowerCase()))

  return (
    <div className="grid h-[calc(100vh-120px)] min-h-[560px] gap-5 lg:grid-cols-[320px_1fr]">
      {/* Thread list */}
      <div className="flex flex-col overflow-hidden rounded-3xl border border-line bg-surface">
        <div className="border-b border-line p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-ink">Messages</h2>
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold/12 text-gold transition-transform hover:scale-110">
              <MessageSquarePlus size={17} />
            </button>
          </div>
          <div className="relative mt-3">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
            <input
              value={queried}
              onChange={(e) => setQueried(e.target.value)}
              placeholder="Search conversations…"
              className="h-10 w-full rounded-xl border border-line bg-surface-2 pl-10 pr-3 text-sm text-ink placeholder:text-ink-faint focus:border-gold/60 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {filtered.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveId(t.id)}
              className={`mb-1 flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                t.id === activeId ? 'border-gold/50 bg-gold/8' : 'border-transparent hover:bg-surface-2'
              }`}
            >
              <Avatar src={t.avatar} alt={t.name} size={46} status={t.online ? 'online' : undefined} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-semibold text-ink">{t.name}</p>
                  <span className="text-[10px] text-ink-faint">{t.time}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-xs text-ink-soft">{t.lastMessage}</p>
                  {t.unread > 0 && (
                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1.5 text-[10px] font-bold text-[#141007]">{t.unread}</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Conversation */}
      <div className="flex flex-col overflow-hidden rounded-3xl border border-line bg-surface">
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <div className="flex items-center gap-3">
            <Avatar src={selectedThread.avatar} alt={selectedThread.name} size={42} status={selectedThread.online ? 'online' : undefined} />
            <div>
              <p className="text-sm font-semibold text-ink">{selectedThread.name}</p>
              <p className="text-[11px] text-emerald-400">{typing ? 'typing…' : selectedThread.online ? 'Online — replies fast' : 'Offline'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-gold/50 hover:text-gold"><Phone size={16} /></button>
            <Link
              to={`/app/call/${selectedThread.id}`}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-gradient-to-br from-gold-strong via-gold to-[#a8791a] px-4 text-xs font-bold text-[#141007] shadow-[0_8px_24px_-10px_var(--glow)]"
            >
              <Video size={14} /> Video call
            </Link>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          <div className="mx-auto flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-ink-faint">
            <span className="h-px w-10 bg-line" /> Today <span className="h-px w-10 bg-line" />
          </div>
          {messages.map((m, i) => {
            const mine = m.from === 'me'
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex ${mine ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[76%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    mine
                      ? 'rounded-br-md bg-gradient-to-br from-gold-strong via-gold to-[#a8791a] text-[#141007] shadow-[0_6px_20px_-8px_var(--glow)]'
                      : 'rounded-bl-md border border-line bg-surface-2 text-ink'
                  }`}
                >
                  <p>{m.text}</p>
                  <p className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${mine ? 'text-[#141007]/60' : 'text-ink-faint'}`}>
                    {m.time}
                    {mine && (i === messages.length - 1 ? <CheckCheck size={12} className="text-emerald-300" /> : <Check size={12} />)}
                  </p>
                </div>
              </motion.div>
            )
          })}
          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-line bg-surface-2 px-4 py-3">
                {[0, 1, 2].map((d) => (
                  <motion.span
                    key={d}
                    className="h-1.5 w-1.5 rounded-full bg-ink-faint"
                    animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1, delay: d * 0.18 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <div className="border-t border-line p-4">
          <div className="flex items-end gap-2.5">
            <button className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-gold/50 hover:text-gold"><Mic size={17} /></button>
            <div className="relative flex-1">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
                rows={1}
                placeholder={`Message ${selectedThread.name.split(' ')[0]}…`}
                className="max-h-32 w-full resize-none rounded-2xl border border-line bg-surface-2 px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-gold/60 focus:outline-none focus:ring-4 focus:ring-gold/10"
              />
              <button className="absolute bottom-2.5 right-2.5 inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-faint transition-colors hover:text-gold"><Smile size={16} /></button>
            </div>
            <button
              onClick={send}
              disabled={!draft.trim()}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-strong via-gold to-[#a8791a] text-[#141007] shadow-[0_8px_24px_-10px_var(--glow)] transition-all hover:brightness-105 disabled:opacity-40"
            >
              <ArrowUp size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export type { ChatThread }