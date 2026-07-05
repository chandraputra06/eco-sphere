// src/pages/OrgDashboard.jsx
import { useState, useEffect, useCallback } from 'react'
import {
  Trash2, MapPin, Clock, RefreshCw, Loader2, CheckCircle2, PlayCircle,
  Package, Inbox, ExternalLink, TrendingUp, PieChart, Activity, Target,
  LayoutDashboard, ClipboardList, Map as MapIcon,
} from 'lucide-react'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { AreaLineChart, DonutChart, BarChart } from '../components/csr/Charts'
import DashboardShell from '../components/dashboard/DashboardShell'
import DashboardMap from '../components/dashboard/DashboardMap'

const STATUS_META = {
  claimed:     { label: 'New',         chip: 'bg-info/10 text-info border-info/20' },
  in_progress: { label: 'In Progress', chip: 'bg-warning/10 text-warning border-warning/20' },
  resolved:    { label: 'Resolved',    chip: 'bg-success/10 text-success border-success/20' },
  rejected:    { label: 'Rejected',    chip: 'bg-error/10 text-error border-error/20' },
}
const CAT_COLOR = { 'Organic': '#22C55E', 'Plastic / Inorganic': '#3BAFDA', 'B3 / Hazardous': '#F59E0B' }
const catColor = (c) => CAT_COLOR[c] || '#94A3B8'

const NAV = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'map', label: 'Map', icon: MapIcon },
  { id: 'reports', label: 'Reports', icon: ClipboardList },
]
const TABS = ['all', 'claimed', 'in_progress', 'resolved']
const TAB_LABEL = { all: 'All', claimed: 'New', in_progress: 'In Progress', resolved: 'Resolved' }

export default function OrgDashboard() {
  const { user } = useAuth()
  const [active, setActive] = useState('overview')
  const [reports, setReports] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tab, setTab] = useState('all')
  const [busyId, setBusyId] = useState('')

  const load = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const [r, st] = await Promise.all([api.myOrgReports(), api.myOrgStats()])
      setReports(r); setStats(st)
    } catch (err) {
      setError(err?.message || 'Failed to load')
    } finally { setLoading(false) }
  }, [])
  useEffect(() => { load() }, [load])

  const updateStatus = async (id, status) => {
    setBusyId(id)
    try {
      await api.updateOrgReport(id, status)
      load()
    } catch (err) { setError(err?.message || 'Failed to update') } finally { setBusyId('') }
  }

  const s = stats || { total: 0, byStatus: { claimed: 0, in_progress: 0, resolved: 0 }, byCategory: {}, resolutionRate: 0, trend: [] }
  const kpis = [
    { label: 'Assigned', value: s.total, Icon: Inbox, grad: 'from-primary to-primary-light' },
    { label: 'New', value: s.byStatus.claimed || 0, Icon: Package, grad: 'from-info/80 to-info' },
    { label: 'In Progress', value: s.byStatus.in_progress || 0, Icon: PlayCircle, grad: 'from-warning/80 to-warning' },
    { label: 'Resolution Rate', value: `${s.resolutionRate}%`, Icon: Target, grad: 'from-success/80 to-primary-light' },
  ]
  const trendData = (s.trend || []).map((t) => ({ m: t.label, v: t.value }))
  const donut = Object.entries(s.byCategory || {})
    .map(([label, n]) => ({ label, n, color: catColor(label) }))
    .sort((a, b) => b.n - a.n)
  const donutTotal = donut.reduce((a, d) => a + d.n, 0) || 1
  donut.forEach((d) => { d.pct = Math.round((d.n / donutTotal) * 100) })
  const statusBar = [
    { m: 'New', v: s.byStatus.claimed || 0, color: '#3BAFDA' },
    { m: 'In Prog.', v: s.byStatus.in_progress || 0, color: '#F59E0B' },
    { m: 'Resolved', v: s.byStatus.resolved || 0, color: '#22C55E' },
  ]
  const counts = {
    all: reports.length,
    claimed: reports.filter((r) => r.status === 'claimed').length,
    in_progress: reports.filter((r) => r.status === 'in_progress').length,
    resolved: reports.filter((r) => r.status === 'resolved').length,
  }
  const visible = tab === 'all' ? reports : reports.filter((r) => r.status === tab)

  const refreshBtn = (
    <button onClick={load} className="inline-flex items-center gap-2 rounded-xl bg-white border border-gray-200 px-4 py-2 text-sm font-semibold text-primary shadow-sm hover:shadow transition">
      <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
    </button>
  )

  return (
    <DashboardShell
      brandLabel={user?.role === 'collector' ? 'Collector Dashboard' : 'Management Dashboard'}
      title={active === 'overview' ? 'Overview' : active === 'map' ? 'Reports Map' : 'Assigned Reports'}
      subtitle={active === 'overview' ? `${user?.name || 'Organization'} — impact at a glance` : active === 'map' ? 'Click a marker to view the reporter and confirm' : 'Reports citizens assigned to you'}
      nav={NAV}
      active={active}
      onSelect={setActive}
      user={user}
      actions={refreshBtn}
    >
      {error && <div className="rounded-2xl border border-error/30 bg-error/5 px-4 py-3 text-sm text-error mb-5">{error}</div>}

      {active === 'overview' ? (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {kpis.map(({ label, value, Icon, grad }) => (
              <div key={label} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center shadow-sm mb-3`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <p className="text-3xl font-bold text-primary-dark tabular-nums">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-primary-dark">Incoming reports · last 7 days</h3>
              </div>
              {trendData.length ? <AreaLineChart data={trendData} xKey="m" yKey="v" /> : <Placeholder />}
            </div>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <PieChart className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-primary-dark">By category</h3>
              </div>
              {donut.length ? (
                <div className="flex flex-col items-center">
                  <DonutChart data={donut} />
                  <div className="mt-3 w-full space-y-1.5">
                    {donut.map((d) => (
                      <div key={d.label} className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 text-gray-600">
                          <span className="w-2.5 h-2.5 rounded-sm" style={{ background: d.color }} /> {d.label}
                        </span>
                        <span className="font-semibold text-primary-dark">{d.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : <Placeholder />}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-primary-dark">Status breakdown</h3>
            </div>
            {s.total ? <BarChart data={statusBar} xKey="m" yKey="v" colorKey="color" height={220} /> : <Placeholder />}
          </div>
        </>
      ) : active === 'map' ? (
        <DashboardMap reports={reports} onUpdateStatus={updateStatus} busyId={busyId} />
      ) : (
        <>
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${tab === t ? 'bg-primary text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-primary/40'}`}>
                {TAB_LABEL[t]} {t !== 'all' && <span className="opacity-70">· {counts[t]}</span>}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16 text-primary"><Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading…</div>
          ) : visible.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center">
              <Inbox className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No reports here yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {visible.map((r) => {
                const meta = STATUS_META[r.status] || STATUS_META.claimed
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${r.lat},${r.lng}`
                return (
                  <div key={r.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/15 to-primary-light/15 border border-white/60 flex items-center justify-center shrink-0">
                      <Trash2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-primary-dark">{r.category || 'Waste report'}</p>
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${meta.chip}`}>{meta.label}</span>
                        {r.volume && <span className="text-[11px] rounded-full bg-gray-100 text-gray-500 px-2 py-0.5 capitalize">{r.volume}</span>}
                      </div>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5 truncate">
                        <MapPin className="h-3.5 w-3.5 shrink-0" /> {r.address || `${r.lat?.toFixed?.(4)}, ${r.lng?.toFixed?.(4)}`}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1.5">
                        <Clock className="h-3 w-3" /> {r.createdAt ? new Date(r.createdAt).toLocaleString() : '-'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 hover:border-primary/40">
                        <ExternalLink className="h-3.5 w-3.5" /> Map
                      </a>
                      {r.status === 'claimed' && (
                        <button onClick={() => updateStatus(r.id, 'in_progress')} disabled={busyId === r.id}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-warning/90 to-warning text-white px-3 py-2 text-xs font-semibold disabled:opacity-60">
                          {busyId === r.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <PlayCircle className="h-3.5 w-3.5" />} Start
                        </button>
                      )}
                      {r.status === 'in_progress' && (
                        <button onClick={() => updateStatus(r.id, 'resolved')} disabled={busyId === r.id}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-success to-primary-light text-white px-3 py-2 text-xs font-semibold disabled:opacity-60">
                          {busyId === r.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />} Resolve
                        </button>
                      )}
                      {r.status === 'resolved' && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-success px-2"><CheckCircle2 className="h-4 w-4" /> Done</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </DashboardShell>
  )
}

function Placeholder() {
  return <div className="h-40 flex items-center justify-center text-sm text-gray-400">No data yet</div>
}