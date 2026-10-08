import { motion } from 'framer-motion'
import { useId } from 'react'

export function Sparkline({
  data,
  width = 120,
  height = 40,
  stroke = 'var(--gold)',
  fill = true,
  animate = true,
  strokeWidth = 2,
  className = '',
}: {
  data: number[]
  width?: number
  height?: number
  stroke?: string
  fill?: boolean
  animate?: boolean
  strokeWidth?: number
  className?: string
}) {
  const gradId = useId().replace(/:/g, '')
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pad = 6
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (width - pad * 2) + pad
    const y = height - pad - ((v - min) / range) * (height - pad * 2)
    return [x, y]
  })
  const line = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)},${height} L${pts[0][0].toFixed(1)},${height} Z`
  const up = data[data.length - 1] >= data[0]

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} className={className} aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <motion.path d={area} fill={`url(#${gradId})`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} />}
      <motion.path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animate ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
      {up && (
        <motion.circle
          cx={pts[pts.length - 1][0]}
          cy={pts[pts.length - 1][1]}
          r="3.4"
          fill={stroke}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.6, type: 'spring', stiffness: 400, damping: 15 }}
          style={{ transformOrigin: 'center' }}
        />
      )}
    </svg>
  )
}