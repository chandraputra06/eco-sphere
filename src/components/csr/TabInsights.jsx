import { AlertTriangle, CheckCircle2, Flame, Lightbulb } from 'lucide-react'
import { CAPACITY_PRED, CAPACITY_STATUS, SEASONAL, SEASONAL_TONE, PARTNER_GAPS, NEED_VS_FACILITY, GAP_TONE } from './csrData'
import { MultiLineChart, BarChart, GroupedBarChart } from './Charts'

const TONE_CARD = {
  critical: { wrap: 'bg-error/5 border-error/30', bar: '#EF4444', text: 'text-error', Icon: AlertTriangle },
  warning: { wrap: 'bg-warning/5 border-warning/30', bar: '#F59E0B', text: 'text-warning', Icon: AlertTriangle },
  success: { wrap: 'bg-success/5 border-success/30', bar: '#22C55E', text: 'text-success', Icon: CheckCircle2 },
}

export default function TabInsights() {
  const seasonalRows = SEASONAL.map((s) => ({ ...s, color: SEASONAL_TONE[s.tone] }))

  return (
    <div className="space-y-8">
      {/* capacity prediction */}
      <section>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Facility Capacity Prediction</p>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-primary-dark">Capacity Forecast (Apr–Aug)</h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                {CAPACITY_PRED.series.map((s) => (
                  <span key={s.name} className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />{s.name}</span>
                ))}
              </div>
            </div>
            <MultiLineChart months={CAPACITY_PRED.months} series={CAPACITY_PRED.series} solidIdx={CAPACITY_PRED.solidIdx} />
            <p className="text-xs text-gray-400 mt-2">* Dashed segments are predictions. Values are % of capacity.</p>
          </div>

          <div className="space-y-4">
            {CAPACITY_STATUS.map((c) => {
              const t = TONE_CARD[c.tone]
              const Icon = t.Icon
              return (
                <div key={c.name} className={`rounded-2xl border p-4 ${t.wrap}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-gray-900">{c.name} — {c.pct}%</p>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/70 overflow-hidden mb-2">
                    <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: t.bar }} />
                  </div>
                  <p className={`text-xs font-medium flex items-center gap-1.5 ${t.text}`}><Icon className="h-3.5 w-3.5" /> {c.note}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* seasonal */}
      <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold text-primary-dark">Seasonal Plastic Volume</h2>
            <p className="text-xs text-gray-400">Tourist-season peak (Jun–Aug)</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 text-warning bg-warning/10 rounded-full px-2.5 py-1 font-semibold"><AlertTriangle className="h-3.5 w-3.5" /> Near Full</span>
            <span className="inline-flex items-center gap-1.5 text-error bg-error/10 rounded-full px-2.5 py-1 font-semibold"><Flame className="h-3.5 w-3.5" /> Peak</span>
          </div>
        </div>
        <BarChart data={seasonalRows} xKey="m" yKey="v" colorKey="color" />
      </section>

      {/* recommendations */}
      <section>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Partner Expansion Recommendations</p>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="font-bold text-primary-dark mb-4 flex items-center gap-2"><Lightbulb className="h-4 w-4 text-warning" /> Regions Needing New Partners</h2>
            <div className="divide-y divide-gray-100">
              {PARTNER_GAPS.map((g) => (
                <div key={g.name} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900">{g.name}</p>
                    <p className="text-xs text-gray-400">{g.meta}</p>
                  </div>
                  <span className={`shrink-0 text-[11px] font-semibold rounded-full px-2.5 py-1 ${GAP_TONE[g.gap].chip}`}>{g.gap} Gap</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-primary-dark">Need vs Facility Gap</h2>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: '#FECACA' }} /> Need</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-primary" /> Facility</span>
              </div>
            </div>
            <GroupedBarChart
              data={NEED_VS_FACILITY}
              keys={[{ key: 'need', color: '#FECACA' }, { key: 'facility', color: '#1F7A6B' }]}
            />
          </div>
        </div>
      </section>
    </div>
  )
}