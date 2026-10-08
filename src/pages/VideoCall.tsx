import { AnimatePresence, motion } from 'framer-motion'
import {
  BadgeCheck, Captions, Camera, CameraOff, CircleDot, MessageSquareText, Mic, MicOff,
  PhoneOff, ScreenShare, Send, Signal, Smile,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Avatar } from '../components/ui/Avatar'
import { useToast } from '../components/Toast'
import { getExpert } from '../data/experts'

const MOCK = [
  { who: 'them', text: "Alright, first let's look at your option chain exposure.", t: '10:31' },
  { who: 'me', text: 'My positions are mostly 11800 PEs for the expiry.', t: '10:32' },
  { who: 'them', text: "Good — let's roll that into a covered structure. Watch my screen.", t: '10:33' },
]

type Control = {
  key: string
  icon: typeof Mic
  label: string
  toggle?: boolean
  value?: boolean
  onToggle?: () => void
  onClick?: () => void
}

export default function VideoCall() {
  const { bookId } = useParams()
  const expert = useMemo(() => getExpert('adrian-cole')!, [])
  const { push } = useToast()

  const [connecting, setConnecting] = useState(true)
  const [micOn, setMicOn] = useState(true)
  const [camOn, setCamOn] = useState(true)
  const [sharing, setSharing] = useState(false)
  const [captions, setCaptions] = useState(false)
  const [recording, setRecording] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [msgs, setMsgs] = useState(MOCK)
  const [draft, setDraft] = useState('')
  const [elapsed, setElapsed] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setConnecting(false), 2200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (connecting) return
    timer.current = setInterval(() => setElapsed((s) => s + 1), 1000)
    push('info', 'Call connected', `Live with ${expert.name}`)
    return () => { if (timer.current) clearInterval(timer.current) }
  }, [connecting, expert.name, push])

  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0')
  const ss = String(elapsed % 60).padStart(2, '0')

  const send = () => {
    if (!draft.trim()) return
    setMsgs((m) => [...m, { who: 'me', text: draft.trim(), t: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }])
    setDraft('')
  }

  const controls: Control[] = [
    { key: 'mic', icon: Mic, label: micOn ? 'Mute' : 'Unmute', toggle: true, value: !micOn, onToggle: () => setMicOn((v) => !v) },
    { key: 'cam', icon: Camera, label: camOn ? 'Camera off' : 'Camera on', toggle: true, value: !camOn, onToggle: () => setCamOn((v) => !v) },
    { key: 'share', icon: ScreenShare, label: sharing ? 'Stop sharing' : 'Share screen', toggle: true, value: sharing, onToggle: () => setSharing((v) => !v) },
    { key: 'caps', icon: Captions, label: captions ? 'Captions off' : 'Captions', toggle: true, value: captions, onToggle: () => setCaptions((v) => !v) },
    { key: 'rec', icon: CircleDot, label: recording ? 'Stop recording' : 'Record', toggle: true, value: recording, onToggle: () => { setRecording((v) => !v); push(recording ? 'info' : 'success', recording ? 'Recording stopped, saved to chat' : 'Recording started — 4K local') } },
    { key: 'net', icon: Signal, label: 'Network', onClick: () => push('info', 'Connection', 'Excellent — 45ms · Full HD · stable') },
    { key: 'react', icon: Smile, label: 'Reactions', onClick: () => push('success', 'Reaction sent', '👏 Adrian received your clap') },
  ]

  return (
    <div className="grid h-[calc(100vh-120px)] min-h-[620px] grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
      {/* ===== Stage ===== */}
      <div className="relative flex flex-col overflow-hidden rounded-3xl border border-line bg-[#0b0b0e]">
        <div className="relative flex-1 overflow-hidden">
          <div className="absolute inset-0">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgb(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgb(255,255,255,0.025)_1px,transparent_1px)] bg-[size:46px_46px]" />
            <div className="pointer-events-none absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-gold/10 blur-[100px] animate-aurora" />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="relative">
              <Avatar src={expert.avatar} alt={expert.name} size={170} className="drop-shadow-2xl" />
              {micOn && !connecting && (
                <span className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-end gap-[3px]">
                  {[0, 1, 2, 3].map((i) => (
                    <motion.span key={i} className="w-1 rounded-full bg-emerald-400" animate={{ height: [6, 16, 8, 18, 10] }} transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.12 }} />
                  ))}
                </span>
              )}
            </div>
            <p className="mt-6 flex items-center gap-2 font-display text-2xl font-semibold text-white">
              {expert.name} <BadgeCheck size={18} className="text-gold" />
            </p>
            <p className="mt-1 text-sm text-white/60">{expert.title} · Session {bookId ?? 'b-1001'}</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-white/50">
              <Signal size={13} className="text-emerald-400" /> Latest latency 45ms
            </div>
          </div>

          {recording && (
            <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-500/15 px-3 py-1.5 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-rose-400" />
              <span className="font-mono text-xs font-bold text-rose-300">REC {mm}:{ss}</span>
            </div>
          )}

          <AnimatePresence>
            {captions && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute inset-x-8 bottom-5 rounded-2xl border border-white/15 bg-black/60 px-5 py-3 backdrop-blur">
                <p className="font-mono text-sm text-white/90">"…the risk-reward on this setup is 1 to 3.5, so we can size up slightly."</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Local tile */}
          <div className="absolute bottom-4 right-4 z-10 hidden w-52 sm:block">
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#121216] shadow-2xl">
              <div className="flex h-36 items-center justify-center">
                {camOn ? (
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br to-gold from-gold-strong/40 text-[#141007]">AS</span>
                ) : (
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold/12 text-gold"><CameraOff size={20} /></span>
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent px-3 py-2">
                <span className="text-[11px] font-semibold text-white">You · Aarav</span>
                {micOn ? (
                  <span className="flex items-end gap-0.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span key={i} className="w-0.5 rounded-full bg-gold" animate={{ height: [3, 8, 5] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }} />
                    ))}
                  </span>
                ) : (
                  <MicOff size={13} className="text-rose-400" />
                )}
              </div>
            </div>
          </div>

          {/* Connecting overlay */}
          <AnimatePresence>
            {connecting && (
              <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0b0b0e]">
                <div className="relative">
                  <span className="absolute -inset-6 animate-ping rounded-full border border-gold/30" />
                  <Avatar src={expert.avatar} alt={expert.name} size={96} />
                </div>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 text-sm text-white/70">Connecting you securely…</motion.p>
                <div className="mt-4 flex gap-1.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-gold" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.15 }} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Control bar */}
        <div className="relative z-20 flex flex-wrap items-center justify-center gap-2 border-t border-white/10 bg-[#0b0b0e] px-4 py-4">
          {controls.map((c) => (
            <button
              key={c.key}
              onClick={c.toggle ? c.onToggle : c.onClick}
              aria-label={c.label}
              aria-pressed={c.toggle ? Boolean(c.value) : undefined}
              className={`inline-flex h-12 w-12 items-center justify-center rounded-full border transition-all active:scale-90 ${
                c.toggle && c.value
                  ? 'border-rose-400/40 bg-rose-500 text-white shadow-[0_8px_24px_-8px_rgba(244,63,94,0.6)]'
                  : 'border-white/15 bg-white/8 text-white hover:bg-white/15'
              }`}
            >
              <c.icon size={18} />
            </button>
          ))}
          <button
            onClick={() => setChatOpen((v) => !v)}
            aria-label="Toggle in-session chat"
            aria-pressed={chatOpen}
            className={`relative inline-flex h-12 w-12 items-center justify-center rounded-full border transition-all active:scale-90 ${
              chatOpen ? 'border-gold bg-gold/20 text-gold' : 'border-white/15 bg-white/8 text-white hover:bg-white/15'
            }`}
          >
            <MessageSquareText size={18} />
            {msgs.length > 2 && !chatOpen && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-gold animate-pulse-dot" />}
          </button>
          <Link
            to="/app"
            onClick={() => push('info', 'Call ended', 'Shared notes were saved to your chat.')}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-rose-500 to-[#b91c1c] px-6 text-sm font-bold text-white shadow-[0_10px_34px_-10px_rgba(244,63,94,0.7)] transition-all hover:brightness-110 active:scale-95"
          >
            <PhoneOff size={18} /> Leave
          </Link>
        </div>
      </div>

      {/* ===== Side ===== */}
      <div
        className={`flex-col overflow-hidden rounded-3xl border border-line bg-surface ${
          chatOpen
            ? 'fixed inset-4 z-[70] flex md:inset-8 xl:static xl:z-auto xl:inset-auto'
            : 'hidden xl:block'
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <p className="font-display text-lg font-semibold text-ink">In-call chat</p>
          <button
            onClick={() => setChatOpen(false)}
            aria-label="Close in-call chat"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-gold/50 hover:text-gold"
          >
            <MessageSquareText size={15} />
          </button>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
          <div className="mx-auto w-fit rounded-full border border-line bg-surface-2 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-ink-faint">Live · {mm}:{ss}</div>
          {msgs.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: m.who === 'me' ? 14 : -14 }} animate={{ opacity: 1, x: 0 }} className={`flex ${m.who === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[88%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ${m.who === 'me' ? 'rounded-br-md bg-gold/15 text-ink' : 'rounded-bl-md border border-line bg-surface-2 text-ink'}`}>
                <p>{m.text}</p>
                <p className={`mt-1 text-right text-[10px] ${m.who === 'me' ? 'text-gold' : 'text-ink-faint'}`}>{m.t}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="border-t border-line p-4">
          <div className="flex gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); send() } }}
              placeholder="Send a quick message…"
              className="h-11 min-w-0 flex-1 rounded-xl border border-line bg-surface-2 px-4 text-sm text-ink placeholder:text-ink-faint focus:border-gold/60 focus:outline-none"
            />
            <button onClick={send} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold-strong via-gold to-[#a8791a] text-[#141007] transition-all hover:brightness-105 active:scale-95">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}