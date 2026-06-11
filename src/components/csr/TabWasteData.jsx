import { WASTE_MIX, SITE_VOLUME, MATERIAL_TREND, PROCESS_RATE, TREND } from './csrData'
import { DonutChart, StackedBarChart, MultiLineChart, GroupedBarChart } from './Charts'

export default function TabWasteData() {
  const siteRows = SITE_VOLUME.map((s) => ({ ...s, label: s.site }))
  const trendRows = TREND.map((t) => ({ ...t, region: t.m }))

  return (
    <div className="space-y-8">
      {/* composition + per-site volume */}
      <section>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Composition & Volume</p>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="font-bold text-primary-dark mb-1">Reported Waste Types</h2>
            <p className="text-xs text-gray-400 mb-4">Share by material</p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <DonutChart data={WASTE_MIX} />
              <div className="flex-1 w-full space-y-2">
                {WASTE_MIX.map((w) => (
                  <div key={w.label} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-gray-600"><span className="h-2.5 w-2.5 rounded-full" style={{ background: w.color }} />{w.label}</span>
                    <span className="font-semibold text-gray-700">{w.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="font-bold text-primary-dark mb-1">Volume per Site (tons/week)</h2>
            <p className="text-xs text-gray-400 mb-3">Stacked by material</p>
            <StackedBarChart
              data={siteRows}
              keys={[{ key: 'plastic', color: '#EF4444' }, { key: 'organic', color: '#F59E0B' }, { key: 'other', color: '#94A3B8' }]}
            />
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-error" /> Plastic</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-warning" /> Organic</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: '#94A3B8' }} /> Other</span>
            </div>
          </div>
        </div>
      </section>

      {/* trend + processing rate */}
      <section>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Trends & Processing</p>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="font-bold text-primary-dark mb-1">Trend per Material (Jan–Jun)</h2>
            <p className="text-xs text-gray-400 mb-3">Tons collected</p>
            <MultiLineChart months={MATERIAL_TREND.months} series={MATERIAL_TREND.series} />
            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-500">
              {MATERIAL_TREND.series.map((s) => (
                <span key={s.name} className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />{s.name}</span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="font-bold text-primary-dark mb-4">Processing Rate per Site</h2>
            <div className="space-y-3.5">
              {PROCESS_RATE.map((s) => (
                <div key={s.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">{s.name}</span>
                    <span className="font-bold" style={{ color: s.color }}>{s.pct}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* collected vs processed */}
      <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-primary-dark">Collected vs Processed (tons)</h2>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-error" /> Collected</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-primary" /> Processed</span>
          </div>
        </div>
        <GroupedBarChart
          data={trendRows}
          keys={[{ key: 'collected', color: '#EF4444' }, { key: 'processed', color: '#1F7A6B' }]}
        />
      </section>
    </div>
  )
}