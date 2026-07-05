// src/pages/AdminDashboard.jsx
import { useState, useEffect, useCallback } from 'react'
import {
  Flag, Building2, RefreshCw, Loader2, CheckCircle2, XCircle,
  MapPin, Clock, BadgeCheck, Trash2,
} from 'lucide-react'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'
import DashboardShell from '../components/dashboard/DashboardShell'

const NAV = [
  { id: 'reports', label: 'Report Moderation', icon: Flag },
  { id: 'orgs', label: 'Organizations', icon: Building2 },
]
const ORG_TYPE_LABEL = {
  collector: 'Collector',
  community: 'Environmental Community',
  waste_mgmt: 'Waste Management',
  csr: 'CSR Partner',
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const [active, setActive] = useState('reports')
  const [reports, setReports] = useState([])
  const [orgs, setOrgs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState('')

  const load = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const [r, o] = await Promise.all([api.adminFlaggedReports(), api.listOrgs()])
      setReports(r); setOrgs(o)
    } catch (err) { setError(err?.message || 'Failed to load') } finally { setLoading(false) }
  }, [])
  useEffect(() => { load() }, [load])

  const rejectReport = async (id) => {
    setBusyId(id)
    try { await api.moderateReport(id, 'reject'); setReports((l) => l.filter((r) => r.id !== id)) }
    catch (err) { setError(err?.message || 'Failed') } finally { setBusyId('') }
  }
  const verifyOrg = async (id) => {
    setBusyId(id)
    try { const u = await api.verifyOrg(id); setOrgs((l) => l.map((o) => (o.id === id ? { ...o, verified: u.verified } : o))) }
    catch (err) { setError(err?.message || 'Failed') } finally { setBusyId('') }
  }

  const refreshBtn = (
    <button onClick={load} className="inline-flex items-center gap-2 rounded-xl bg-white border border-gray-200 px-4 py-2 text-sm font-semibold text-primary shadow-sm hover:shadow transition">
      <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
    </button>
  )

  return (
    <DashboardShell
      brandLabel="Admin Panel"
      title={active === 'reports' ? 'Report Moderation' : 'Organizations'}
      subtitle={active === 'reports' ? 'Review and reject spam or invalid reports' : 'Verify partner organizations'}
      nav={NAV}
      active={active}
      onSelect={setActive}
      user={user}
      actions={refreshBtn}
    >
      {error && <div className="rounded-2xl border border-error/30 bg-error/5 px-4 py-3 text-sm text-error mb-5">{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-primary"><Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading…</div>
      ) : active === 'reports' ? (
        reports.length === 0 ? (
          <Empty icon={CheckCircle2} text="No reports awaiting review." />
        ) : (
          <div className="space-y-3">
            {reports.map((r) => (
              <div key={r.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 flex flex-col md:flex-row md:items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/15 to-primary-light/15 border border-white/60 flex items-center justify-center shrink-0">
                  <Trash2 className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-primary-dark">{r.category || 'Waste report'}</p>
                    {r.volume && <span className="text-[11px] rounded-full bg-gray-100 text-gray-500 px-2 py-0.5 capitalize">{r.volume}</span>}
                    <span className="text-[11px] rounded-full bg-warning/10 text-warning border border-warning/20 px-2 py-0.5">Pending</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5 truncate">
                    <MapPin className="h-3.5 w-3.5 shrink-0" /> {r.address || `${r.lat?.toFixed?.(4)}, ${r.lng?.toFixed?.(4)}`}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1.5">
                    <Clock className="h-3 w-3" /> {r.createdAt ? new Date(r.createdAt).toLocaleString() : '-'}
                  </p>
                </div>
                <button onClick={() => rejectReport(r.id)} disabled={busyId === r.id}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-error/30 bg-white text-error px-3 py-2 text-xs font-semibold hover:bg-error/5 disabled:opacity-60 shrink-0">
                  {busyId === r.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <XCircle className="h-3.5 w-3.5" />} Reject
                </button>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="space-y-3">
          {orgs.map((o) => (
            <div key={o.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/15 to-primary-light/15 border border-white/60 flex items-center justify-center shrink-0">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-primary-dark truncate">{o.name}</p>
                <p className="text-xs text-gray-500">{ORG_TYPE_LABEL[o.type] || o.type}</p>
              </div>
              {o.verified ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-success px-3"><BadgeCheck className="h-4 w-4" /> Verified</span>
              ) : (
                <button onClick={() => verifyOrg(o.id)} disabled={busyId === o.id}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white px-3 py-2 text-xs font-semibold disabled:opacity-60">
                  {busyId === o.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />} Verify
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  )
}

function Empty({ icon: Icon, text }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center">
      <Icon className="h-10 w-10 text-gray-300 mx-auto mb-3" />
      <p className="text-gray-500">{text}</p>
    </div>
  )
}