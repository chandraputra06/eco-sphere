import { useState } from 'react'
import { Recycle, Truck, Factory } from 'lucide-react'
import { ECO_KPIS, PRIORITY_PROGRAMS, URGENCY, PARTNERS, COLLECTORS, FACILITIES } from './csrData'

const STATUS_CHIP = {
  critical: 'bg-error/10 text-error',
  warning: 'bg-warning/10 text-warning',
}
const STATUS_BAR = { critical: '#EF4444', warning: '#F59E0B' }

export default function TabEcosystem() {
  const [filter, setFilter] = useState('all')
  const programs = PRIORITY_PROGRAMS.filter((p) => filter === 'all' || p.status === filter)
  const maxUrg = 100

  return (
    <div className="space-y-8">
      {/* KPI cards */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {ECO_KPIS.map((k) => (
            <div key={k.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm border-t-4" style={{ borderTopColor: k.accent }}>
              <p className="text-xs text-gray-400 uppercase tracking-wide">{k.label}</p>
              <p className="mt-2 text-3xl font-extrabold text-primary-dark leading-none">{k.value}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-400">{k.sub}</span>
                <span className="text-[11px] font-bold text-success bg-success/10 rounded-full px-2 py-0.5">{k.delta}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* priority programs + urgency */}
      <section>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Priority Programs</p>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-primary-dark">Worst-performing Areas</h2>
              <div className="flex rounded-xl bg-gray-100 p-1">
                {[['all', 'All'], ['critical', 'Critical'], ['warning', 'At Risk']].map(([k, label]) => (
                  <button key={k} onClick={() => setFilter(k)} className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${filter === k ? 'bg-primary text-white' : 'text-gray-500 hover:text-primary'}`}>{label}</button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {programs.map((p) => (
                <div key={p.rank} className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-300 w-6">#{p.rank}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.area}</p>
                  </div>
                  <div className="w-28 hidden sm:block">
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${p.score}%`, background: STATUS_BAR[p.status] }} />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-700 w-8 text-right">{p.score}</span>
                  <span className={`text-[11px] font-semibold rounded-full px-2 py-0.5 ${STATUS_CHIP[p.status]}`}>{p.status === 'critical' ? 'Critical' : 'At Risk'}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="font-bold text-primary-dark mb-4">Urgency per Region</h2>
            <div className="space-y-3">
              {URGENCY.map((u) => (
                <div key={u.region} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-20 shrink-0">{u.region}</span>
                  <div className="flex-1 h-3 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(u.pct / maxUrg) * 100}%`, background: u.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* directories */}
      <section>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Waste Management Directory</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* partners */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-primary-dark flex items-center gap-2"><Recycle className="h-4 w-4 text-primary" /> Waste Banks</h3>
              <span className="text-xs font-semibold text-success bg-success/10 rounded-full px-2 py-0.5">47 active</span>
            </div>
            <div className="divide-y divide-gray-100">
              {PARTNERS.map((p) => (
                <div key={p.name} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900">{p.name}</p>
                    <span className="text-[11px] text-gray-400">{p.meta}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{p.area}</p>
                  <p className="text-xs text-primary mt-0.5">{p.tags}</p>
                </div>
              ))}
            </div>
          </div>

          {/* collectors */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-primary-dark flex items-center gap-2"><Truck className="h-4 w-4 text-secondary" /> Collectors</h3>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 rounded-full px-2 py-0.5">32 listed</span>
            </div>
            <div className="divide-y divide-gray-100">
              {COLLECTORS.map((c) => (
                <div key={c.name} className="py-3 first:pt-0 last:pb-0">
                  <p className="text-sm font-semibold text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{c.area} · {c.tags}</p>
                  <p className="text-xs text-primary mt-0.5 font-medium">{c.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* facilities */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-primary-dark flex items-center gap-2"><Factory className="h-4 w-4 text-warning" /> Facilities</h3>
              <span className="text-xs font-semibold text-warning bg-warning/10 rounded-full px-2 py-0.5">6 sites</span>
            </div>
            <div className="space-y-4">
              {FACILITIES.map((f) => (
                <div key={f.name}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-gray-900">{f.name}</p>
                    <span className="text-xs font-bold" style={{ color: f.color }}>{f.load}%</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-1.5">{f.area}</p>
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${f.load}%`, background: f.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}