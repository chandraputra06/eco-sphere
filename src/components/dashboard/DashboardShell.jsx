// src/components/dashboard/DashboardShell.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, CircleDot, Home } from 'lucide-react'

/**
 * Sidebar dashboard shell (same look as the CSR dashboard) with a Back to Home link.
 * Props: brandLabel, title, subtitle, nav [{id,label,icon}], active, onSelect, user, actions, children
 */
export default function DashboardShell({ brandLabel, title, subtitle, nav, active, onSelect, user, actions, children }) {
  const [mobileNav, setMobileNav] = useState(false)

  const NavItems = ({ onPick }) => (
    <>
      <p className="px-3 text-[10px] uppercase tracking-widest text-bali-50/40 mb-2">Menu</p>
      {nav.map((n) => {
        const Icon = n.icon
        const on = active === n.id
        return (
          <button
            key={n.id}
            onClick={() => { onSelect(n.id); onPick?.() }}
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

  const SidebarInner = ({ onPick }) => (
    <>
      <div className="px-6 py-6 border-b border-white/10">
        <p className="font-animal text-2xl leading-none">Eco-Sphere</p>
        <p className="text-[11px] uppercase tracking-widest text-bali-50/60 mt-1">{brandLabel}</p>
      </div>
      <nav className="flex-1 px-3 py-5 space-y-1"><NavItems onPick={onPick} /></nav>
      <div className="px-3 py-4 border-t border-white/10 space-y-2">
        <Link
          to="/"
          onClick={onPick}
          className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-bali-50/70 hover:bg-white/10 hover:text-white transition"
        >
          <Home className="h-5 w-5" /> Back to Home
        </Link>
        {user && (
          <div className="flex items-center gap-3 px-2 pt-2">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-sm font-bold shrink-0">
              {user.avatar ? <img src={user.avatar} alt="" className="h-full w-full object-cover" /> : (user.name?.[0] || 'U').toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-[11px] text-bali-50/60 capitalize">{user.role}</p>
            </div>
          </div>
        )}
      </div>
    </>
  )

  return (
    <div className="font-poppins bg-bali-50 text-gray-900 min-h-screen">
      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-primary-dark text-white min-h-screen sticky top-0">
          <SidebarInner />
        </aside>

        {/* Mobile drawer */}
        {mobileNav && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileNav(false)} />
            <aside className="relative w-64 bg-primary-dark text-white flex flex-col">
              <button onClick={() => setMobileNav(false)} className="absolute right-4 top-6 z-10"><X className="h-5 w-5" /></button>
              <SidebarInner onPick={() => setMobileNav(false)} />
            </aside>
          </div>
        )}

        {/* Main */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div className="flex items-start gap-3">
              <button onClick={() => setMobileNav(true)} className="lg:hidden mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-gray-200 shadow-sm">
                <Menu className="h-5 w-5 text-primary-dark" />
              </button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-primary-dark tracking-tight">{title}</h1>
                {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
              </div>
            </div>
            {actions && <div className="flex items-center gap-3">{actions}</div>}
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}