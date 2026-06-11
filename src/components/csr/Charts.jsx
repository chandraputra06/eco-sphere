// Reusable, dependency-free SVG charts for the CSR dashboard.

/* ---------- Area + line (single series) ---------- */
export function AreaLineChart({ data, xKey = 'm', yKey = 'v', color = '#1F7A6B', height = 240 }) {
  const W = 640, H = height, pad = 38
  const max = Math.max(...data.map((d) => d[yKey])) * 1.15 || 1
  const x = (i) => pad + (i * (W - pad * 2)) / (data.length - 1)
  const y = (v) => H - pad - (v / max) * (H - pad * 2)
  const line = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(d[yKey])}`).join(' ')
  const area = `${line} L ${x(data.length - 1)} ${H - pad} L ${x(0)} ${H - pad} Z`
  const ticks = 4
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Trend chart">
      <defs>
        <linearGradient id={`al-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: ticks + 1 }).map((_, i) => {
        const gy = pad + (i * (H - pad * 2)) / ticks
        const val = Math.round(max - (i * max) / ticks)
        return (
          <g key={i}>
            <line x1={pad} y1={gy} x2={W - pad} y2={gy} stroke="#EEF2F1" strokeWidth="1" />
            <text x={pad - 8} y={gy + 4} textAnchor="end" fontSize="11" fill="#9CA3AF">{val}</text>
          </g>
        )
      })}
      <path d={area} fill={`url(#al-${color.replace('#', '')})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(d[yKey])} r="4.5" fill="#fff" stroke={color} strokeWidth="2.5" />
          <text x={x(i)} y={H - pad + 18} textAnchor="middle" fontSize="11" fill="#6B7280">{d[xKey]}</text>
        </g>
      ))}
    </svg>
  )
}

/* ---------- Donut ---------- */
export function DonutChart({ data, size = 180, stroke = 26 }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r
  let offset = 0
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-44 h-44" role="img" aria-label="Composition">
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {data.map((d) => {
          const len = (d.pct / 100) * c
          const seg = (
            <circle
              key={d.label}
              cx={size / 2} cy={size / 2} r={r}
              fill="none" stroke={d.color} strokeWidth={stroke}
              strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-offset}
            />
          )
          offset += len
          return seg
        })}
      </g>
      <text x="50%" y="46%" textAnchor="middle" fontSize="26" fontWeight="800" fill="#153C35">{data[0].pct}%</text>
      <text x="50%" y="60%" textAnchor="middle" fontSize="11" fill="#6B7280">{data[0].label}</text>
    </svg>
  )
}

/* ---------- Stacked bars ---------- */
export function StackedBarChart({ data, keys, height = 260 }) {
  const W = 680, H = height, pad = 38, gap = 18
  const totals = data.map((d) => keys.reduce((s, k) => s + d[k.key], 0))
  const max = Math.max(...totals) * 1.15 || 1
  const bw = (W - pad * 2 - gap * (data.length - 1)) / data.length
  const y = (v) => H - pad - (v / max) * (H - pad * 2)
  const ticks = 5
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Stacked volume">
      {Array.from({ length: ticks + 1 }).map((_, i) => {
        const gy = pad + (i * (H - pad * 2)) / ticks
        const val = Math.round(max - (i * max) / ticks)
        return (
          <g key={i}>
            <line x1={pad} y1={gy} x2={W - pad} y2={gy} stroke="#EEF2F1" strokeWidth="1" />
            <text x={pad - 8} y={gy + 4} textAnchor="end" fontSize="10" fill="#9CA3AF">{val}</text>
          </g>
        )
      })}
      {data.map((d, i) => {
        const bx = pad + i * (bw + gap)
        let yCursor = H - pad
        return (
          <g key={i}>
            {keys.map((k) => {
              const h = (d[k.key] / max) * (H - pad * 2)
              yCursor -= h
              return <rect key={k.key} x={bx} y={yCursor} width={bw} height={h} fill={k.color} rx="2" />
            })}
            <text x={bx + bw / 2} y={H - pad + 16} textAnchor="middle" fontSize="10" fill="#6B7280">{d.label || d[Object.keys(d)[0]]}</text>
          </g>
        )
      })}
    </svg>
  )
}

/* ---------- Grouped (paired) bars ---------- */
export function GroupedBarChart({ data, keys, height = 240 }) {
  const W = 680, H = height, pad = 38, groupGap = 26
  const max = Math.max(...data.flatMap((d) => keys.map((k) => d[k.key]))) * 1.15 || 1
  const gw = (W - pad * 2 - groupGap * (data.length - 1)) / data.length
  const bw = gw / keys.length - 4
  const ticks = 5
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Grouped bars">
      {Array.from({ length: ticks + 1 }).map((_, i) => {
        const gy = pad + (i * (H - pad * 2)) / ticks
        const val = Math.round(max - (i * max) / ticks)
        return (
          <g key={i}>
            <line x1={pad} y1={gy} x2={W - pad} y2={gy} stroke="#EEF2F1" strokeWidth="1" />
            <text x={pad - 8} y={gy + 4} textAnchor="end" fontSize="10" fill="#9CA3AF">{val}</text>
          </g>
        )
      })}
      {data.map((d, i) => {
        const gx = pad + i * (gw + groupGap)
        return (
          <g key={i}>
            {keys.map((k, j) => {
              const h = (d[k.key] / max) * (H - pad * 2)
              return <rect key={k.key} x={gx + j * (bw + 4)} y={H - pad - h} width={bw} height={h} fill={k.color} rx="3" />
            })}
            <text x={gx + gw / 2} y={H - pad + 16} textAnchor="middle" fontSize="10" fill="#6B7280">{d.region || d.label}</text>
          </g>
        )
      })}
    </svg>
  )
}

/* ---------- Multi-line (optionally part-dashed for predictions) ---------- */
export function MultiLineChart({ months, series, height = 300, solidIdx = null }) {
  const W = 680, H = height, pad = 40
  const all = series.flatMap((s) => s.values)
  const max = Math.max(...all) * 1.12 || 1
  const min = Math.min(...all, 0)
  const x = (i) => pad + (i * (W - pad * 2)) / (months.length - 1)
  const y = (v) => H - pad - ((v - min) / (max - min)) * (H - pad * 2)
  const ticks = 5
  const segPath = (vals, from, to) =>
    vals.slice(from, to + 1).map((v, k) => `${k === 0 ? 'M' : 'L'} ${x(from + k)} ${y(v)}`).join(' ')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Multi-line chart">
      {Array.from({ length: ticks + 1 }).map((_, i) => {
        const gy = pad + (i * (H - pad * 2)) / ticks
        const val = Math.round(max - (i * (max - min)) / ticks)
        return (
          <g key={i}>
            <line x1={pad} y1={gy} x2={W - pad} y2={gy} stroke="#EEF2F1" strokeWidth="1" />
            <text x={pad - 8} y={gy + 4} textAnchor="end" fontSize="10" fill="#9CA3AF">{val}</text>
          </g>
        )
      })}
      {months.map((mo, i) => (
        <text key={i} x={x(i)} y={H - pad + 16} textAnchor="middle" fontSize="10" fill="#6B7280">{mo}</text>
      ))}
      {series.map((s) => {
        if (solidIdx == null) {
          return (
            <g key={s.name}>
              <path d={segPath(s.values, 0, s.values.length - 1)} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {s.values.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="3.5" fill="#fff" stroke={s.color} strokeWidth="2" />)}
            </g>
          )
        }
        return (
          <g key={s.name}>
            <path d={segPath(s.values, 0, solidIdx)} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d={segPath(s.values, solidIdx, s.values.length - 1)} fill="none" stroke={s.color} strokeWidth="2.5" strokeDasharray="6 5" strokeLinecap="round" />
            {s.values.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="3.5" fill="#fff" stroke={s.color} strokeWidth="2" />)}
          </g>
        )
      })}
    </svg>
  )
}

/* ---------- Simple vertical bars with per-bar tone ---------- */
export function BarChart({ data, xKey = 'm', yKey = 'v', colorKey = 'color', height = 260 }) {
  const W = 760, H = height, pad = 38, gap = 10
  const max = Math.max(...data.map((d) => d[yKey])) * 1.15 || 1
  const bw = (W - pad * 2 - gap * (data.length - 1)) / data.length
  const ticks = 4
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Bar chart">
      {Array.from({ length: ticks + 1 }).map((_, i) => {
        const gy = pad + (i * (H - pad * 2)) / ticks
        const val = Math.round(max - (i * max) / ticks)
        return (
          <g key={i}>
            <line x1={pad} y1={gy} x2={W - pad} y2={gy} stroke="#EEF2F1" strokeWidth="1" />
            <text x={pad - 8} y={gy + 4} textAnchor="end" fontSize="10" fill="#9CA3AF">{val}</text>
          </g>
        )
      })}
      {data.map((d, i) => {
        const bx = pad + i * (bw + gap)
        const h = (d[yKey] / max) * (H - pad * 2)
        return (
          <g key={i}>
            <rect x={bx} y={H - pad - h} width={bw} height={h} fill={d[colorKey] || '#1F7A6B'} rx="4" />
            <text x={bx + bw / 2} y={H - pad + 16} textAnchor="middle" fontSize="10" fill="#6B7280">{d[xKey]}</text>
          </g>
        )
      })}
    </svg>
  )
}