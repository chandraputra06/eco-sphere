import { TrendingUp, TrendingDown, ArrowUpRight, Recycle, CloudDownload, TreePine, Users, Award, Droplets } from 'lucide-react'
import { KPIS, TREND, WASTE_MIX, PROCESS_RATE } from './csrData'
import { AreaLineChart, DonutChart } from './Charts'

const ICONS = { waste: Recycle, co2: CloudDownload, trees: TreePine, hours: Users }

export default function TabOverview() {
  return (
    <div className="space-y-8">
      {/* KPI cards */}
      <section>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Impact Summary</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {KPIS.map((k) => {
            const Icon = ICONS[k.key]
            const up = k.delta >= 0
            return (
              <div key={k.key} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-sm" style={{ background: k.accent }}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className={`inline-flex items-center gap-1 text-xs font-bold rounded-full px-2 py-1 ${up ? 'text-success bg-success/10' : 'text-error bg-error/10'}`}>
                    {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}{Math.abs(k.delta)}%
                  </span>
                </div>
                <p className="mt-4 text-3xl font-extrabold text-primary-dark leading-none">
                  {k.value} <span className="text-base font-semibold text-gray-400">{k.unit}</span>
                </p>
                <p className="text-gray-500 text-sm mt-1.5">{k.label}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* trend + donut */}
      <section>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Trends & Composition</p>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-primary-dark">Waste Diverted</h2>
                <p className="text-xs text-gray-400">Collected vs processed, in tons</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1">
                <ArrowUpRight className="h-3.5 w-3.5" /> +18% YoY
              </span>
            </div>
            <AreaLineChart data={TREND} yKey="processed" color="#1F7A6B" />
            <div className="flex items-center gap-5 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-primary" /> Processed</span>
              <span className="text-gray-400">Peak month: Jun (42t)</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="font-bold text-primary-dark mb-1">Waste Mix</h2>
            <p className="text-xs text-gray-400 mb-3">By material type</p>
            <div className="flex flex-col items-center">
              <DonutChart data={WASTE_MIX} />
              <div className="mt-4 w-full space-y-2">
                {WASTE_MIX.map((w) => (
                  <div key={w.label} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-gray-600"><span className="h-2.5 w-2.5 rounded-full" style={{ background: w.color }} />{w.label}</span>
                    <span className="font-semibold text-gray-700">{w.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* processing rate + impact banner */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-1 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-bold text-primary-dark mb-4">Processing Rate by Site</h2>
          <div className="space-y-3.5">
            {PROCESS_RATE.slice(0, 6).map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600">{s.name}</span>
                  <span className="font-bold" style={{ color: s.color }}>{s.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-2 bg-gradient-to-br from-primary-dark to-primary rounded-2xl p-6 text-white shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4"><Award className="h-5 w-5 text-primary-light" /><h2 className="font-bold">Impact Highlights</h2></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Droplets, big: '4.2M', small: 'Liters water saved' },
                { icon: Recycle, big: '128t', small: 'Waste recycled' },
                { icon: TreePine, big: '5.1k', small: 'Trees planted' },
                { icon: Users, big: '2,340', small: 'Volunteers engaged' },
              ].map((h, i) => {
                const Icon = h.icon
                return (
                  <div key={i} className="rounded-xl bg-white/10 backdrop-blur-sm p-4 border border-white/10">
                    <Icon className="h-5 w-5 text-primary-light mb-2" />
                    <p className="text-2xl font-extrabold leading-none">{h.big}</p>
                    <p className="text-[11px] text-bali-50/70 mt-1">{h.small}</p>
                  </div>
                )
              })}
            </div>
            <p className="text-xs text-bali-50/70 mt-5 max-w-lg leading-relaxed">
              Your initiatives this year are equivalent to taking roughly 74 cars off the road for a full year.
            </p>
          </div>
          <Recycle className="absolute -right-6 -bottom-6 h-40 w-40 text-white/5" />
        </div>
      </section>
    </div>
  )
}