import { useState } from 'react'
import {
  LayoutDashboard, MapPin, BarChart3, Users, Sparkles, Download, CircleDot, Menu, X,
} from 'lucide-react'
import { COMPANY } from '../components/csr/csrData'
import TabOverview from '../components/csr/TabOverview'
import TabRegions from '../components/csr/TabRegions'
import TabWasteData from '../components/csr/TabWasteData'
import TabEcosystem from '../components/csr/TabEcosystem'
import TabInsights from '../components/csr/TabInsights'

const NAV = [
  { id: 'overview',   label: 'Overview',   icon: LayoutDashboard, title: 'Impact Overview',      sub: 'Your environmental impact at a glance' },
  { id: 'regions',    label: 'Regions',    icon: MapPin,          title: 'Sites & Regions',       sub: 'Real-time site distribution across Bali' },
  { id: 'waste',      label: 'Waste Data', icon: BarChart3,       title: 'Waste Data',            sub: 'Composition & volume analysis' },
  { id: 'ecosystem',  label: 'Ecosystem',  icon: Users,           title: 'Ecosystem & Community', sub: 'Partners, priority programs & directory' },
  { id: 'insights',   label: 'Insights',   icon: Sparkles,        title: 'Insights & Prediction', sub: 'Predictive analysis & AI recommendations' },
]

export default function CSRDashboard() {
  const [active, setActive] = useState('overview')
  const [range, setRange] = useState('Week')
  const [mobileNav, setMobileNav] = useState(false)
  const current = NAV.find((n) => n.id === active)

  const renderTab = () => {
    switch (active) {
      case 'regions': return <TabRegions />
      case 'waste': return <TabWasteData />
      case 'ecosystem': return <TabEcosystem />
      case 'insights': return <TabInsights />
      default: return <TabOverview />
    }
  }

  const NavItems = ({ onPick }) => (
    <>
      <p className="px-3 text-[10px] uppercase tracking-widest text-bali-50/40 mb-2">Menu</p>
      {NAV.map((n) => {
        const Icon = n.icon
        const on = active === n.id
        return (
          <button
            key={n.id}
            onClick={() => { setActive(n.id); onPick?.() }}
            className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${on ? 'bg-white/15 text-white' : 'text-bali-50/70 hover:bg-white/10 hover:text-white'}`}
          >
            <Icon className="h-5 w-5" />
            {n.label}
            {on && <CircleDot className="h-3.5 w-3.5 ml-auto text-primary-light" />}
          </button>
        )
      })}
    </>
  )

  return (
    <div className="font-poppins bg-bali-50 text-gray-900 min-h-screen pt-20">
      <div className="flex">
        {/* ===================== SIDEBAR (desktop) ===================== */}
        <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-primary-dark text-white min-h-[calc(100vh-5rem)] sticky top-20">
          <div className="px-6 py-6 border-b border-white/10">
            <p className="font-animal text-2xl leading-none">Eco-Sphere</p>
            <p className="text-[11px] uppercase tracking-widest text-bali-50/60 mt-1">CSR Dashboard</p>
          </div>
          <nav className="flex-1 px-3 py-5 space-y-1">
            <NavItems />
          </nav>
          <div className="px-4 py-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-sm font-bold">{COMPANY.initials}</div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{COMPANY.name}</p>
                <p className="text-[11px] text-bali-50/60">Administrator</p>
              </div>
            </div>
          </div>
        </aside>

        {/* mobile drawer */}
        {mobileNav && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileNav(false)} />
            <aside className="relative w-64 bg-primary-dark text-white flex flex-col animate-slideInLeft">
              <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-animal text-2xl leading-none">Eco-Sphere</p>
                  <p className="text-[11px] uppercase tracking-widest text-bali-50/60 mt-1">CSR Dashboard</p>
                </div>
                <button onClick={() => setMobileNav(false)}><X className="h-5 w-5" /></button>
              </div>
              <nav className="flex-1 px-3 py-5 space-y-1"><NavItems onPick={() => setMobileNav(false)} /></nav>
            </aside>
          </div>
        )}

        {/* ===================== MAIN ===================== */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-8">
          {/* header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div className="flex items-start gap-3">
              <button onClick={() => setMobileNav(true)} className="lg:hidden mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-gray-200 shadow-sm">
                <Menu className="h-5 w-5 text-primary-dark" />
              </button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-primary-dark tracking-tight">{current.title}</h1>
                <p className="text-gray-500 text-sm mt-1">{COMPANY.name} — {current.sub}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex rounded-xl bg-white border border-gray-200 p-1 shadow-sm">
                {['Day', 'Week', 'Month'].map((r) => (
                  <button key={r} onClick={() => setRange(r)} className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition ${range === r ? 'bg-primary text-white' : 'text-gray-500 hover:text-primary'}`}>{r}</button>
                ))}
              </div>
              <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white px-4 py-2 text-sm font-semibold shadow-sm hover:shadow transition">
                <Download className="h-4 w-4" /> Export PDF
              </button>
            </div>
          </div>

          {/* active tab */}
          {renderTab()}
        </main>
      </div>
    </div>
  )
}