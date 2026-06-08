import { useState, useEffect, useRef } from 'react'
import { Search, TrendingUp, TrendingDown, Minus, Users, FileText, CheckCircle, Leaf, MapPin } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const PRIMARY = '#1F7A6B'

const communities = [
  { rank: 1,  name: 'Eco Peduli Denpasar',   region: 'Denpasar',   reports: 156, resolved: 98, points: 12840, members: 2847, trend: 'up' },
  { rank: 2,  name: 'Green Action Badung',    region: 'Badung',     reports: 312, resolved: 94, points: 8940,  members: 1920, trend: 'up' },
  { rank: 3,  name: 'Bumi Lestari Gianyar',  region: 'Gianyar',    reports: 287, resolved: 91, points: 7620,  members: 2103, trend: 'down' },
  { rank: 4,  name: 'Clean Coast Denpasar',   region: 'Denpasar',   reports: 201, resolved: 89, points: 6850,  members: 1540, trend: 'up' },
  { rank: 5,  name: 'Hijau Bersama Badung',   region: 'Badung',     reports: 189, resolved: 86, points: 6120,  members: 1370, trend: 'stable' },
  { rank: 6,  name: 'Zero Waste Badung',      region: 'Badung',     reports: 174, resolved: 84, points: 5780,  members: 1200, trend: 'up' },
  { rank: 7,  name: 'Peduli Alam Gianyar',    region: 'Gianyar',    reports: 168, resolved: 82, points: 5340,  members: 1089, trend: 'down' },
  { rank: 8,  name: 'Eco Warriors Buleleng',  region: 'Buleleng',   reports: 155, resolved: 80, points: 4980,  members: 980,  trend: 'stable' },
  { rank: 9,  name: 'Resik Bareng Tabanan',   region: 'Tabanan',    reports: 143, resolved: 78, points: 4620,  members: 870,  trend: 'up' },
  { rank: 10, name: 'Lestari Bangli',         region: 'Bangli',     reports: 132, resolved: 75, points: 4280,  members: 760,  trend: 'stable' },
  { rank: 11, name: 'Go Green Klungkung',     region: 'Klungkung',  reports: 124, resolved: 73, points: 3940,  members: 690,  trend: 'up' },
  { rank: 12, name: 'Bersih Karangasem',      region: 'Karangasem', reports: 118, resolved: 70, points: 3640,  members: 620,  trend: 'down' },
  { rank: 13, name: 'Green Impact Jembrana',  region: 'Jembrana',   reports: 109, resolved: 68, points: 3280,  members: 540,  trend: 'stable' },
  { rank: 14, name: 'Eco Squad Badung',       region: 'Badung',     reports: 98,  resolved: 65, points: 2980,  members: 490,  trend: 'up' },
  { rank: 15, name: 'Save Earth Badung',      region: 'Badung',     reports: 91,  resolved: 62, points: 2720,  members: 430,  trend: 'stable' },
  { rank: 16, name: 'Blue Guardian Karangasem', region: 'Karangasem', reports: 84, resolved: 60, points: 2480, members: 380,  trend: 'down' },
  { rank: 17, name: 'Alam Sehat Tabanan',     region: 'Tabanan',    reports: 78,  resolved: 58, points: 2260,  members: 340,  trend: 'up' },
  { rank: 18, name: 'Bersih Bareng Buleleng', region: 'Buleleng',   reports: 72,  resolved: 55, points: 2040,  members: 300,  trend: 'stable' },
  { rank: 19, name: 'Laut Bersih Buleleng',   region: 'Buleleng',   reports: 65,  resolved: 52, points: 1820,  members: 260,  trend: 'up' },
  { rank: 20, name: 'Coral Care Karangasem',  region: 'Karangasem', reports: 58,  resolved: 48, points: 1620,  members: 220,  trend: 'stable' },
]

const ITEMS_PER_PAGE = 10

const medalConfig = {
  1: { ringColor: '#F59E0B', rankBg: 'bg-amber-400',  rankText: 'text-amber-900',  label: 'Gold',   border: 'border-amber-200' },
  2: { ringColor: '#94A3B8', rankBg: 'bg-slate-400',  rankText: 'text-slate-900',  label: 'Silver', border: 'border-slate-200' },
  3: { ringColor: '#F97316', rankBg: 'bg-orange-400', rankText: 'text-orange-900', label: 'Bronze', border: 'border-orange-200' },
}

function TrendBadge({ trend }) {
  if (trend === 'up')   return <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 border border-emerald-100 text-[11px] font-semibold px-2 py-0.5 rounded-full"><TrendingUp size={11} />Up</span>
  if (trend === 'down') return <span className="inline-flex items-center gap-1 text-red-500 bg-red-50 border border-red-100 text-[11px] font-semibold px-2 py-0.5 rounded-full"><TrendingDown size={11} />Down</span>
  return <span className="inline-flex items-center gap-1 text-gray-400 bg-gray-50 border border-gray-100 text-[11px] font-semibold px-2 py-0.5 rounded-full"><Minus size={11} />Stable</span>
}

function RankBadge({ rank }) {
  const cfg = medalConfig[rank]
  return (
    <div
      className={`w-12 h-12 rounded-2xl ${cfg.rankBg} flex items-center justify-center shadow-md`}
      style={{ boxShadow: `0 4px 20px ${cfg.ringColor}55` }}
    >
      <span className={`text-xl font-black ${cfg.rankText}`}>#{rank}</span>
    </div>
  )
}

function PodiumCard({ community, size = 'md' }) {
  const cfg = medalConfig[community.rank]
  const isLarge = size === 'lg'

  return (
    <div
      className={`bg-white rounded-3xl overflow-hidden flex flex-col border-2 ${cfg.border} ${isLarge ? 'p-7' : 'p-5'}`}
      style={{ boxShadow: `0 8px 32px ${cfg.ringColor}22` }}
    >
      {/* Rank + Name */}
      <div className="flex flex-col items-center text-center mb-5">
        <RankBadge rank={community.rank} />
        <div className="mt-4 mb-1">
          <h3
            className={`font-bold leading-tight text-gray-900 ${isLarge ? 'text-xl' : 'text-base'}`}
            style={{ letterSpacing: '-0.01em' }}
          >
            {community.name}
          </h3>
        </div>
        <div className="inline-flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1 text-[11px] text-gray-400 font-medium">
          <MapPin size={10} />
          {community.region}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-100 mb-5" />

      {/* Resolution Rate */}
      <div className="text-center mb-5">
        <p
          className={`font-black leading-none mb-1 ${isLarge ? 'text-5xl' : 'text-3xl'}`}
          style={{ color: PRIMARY }}
        >
          {community.resolved}%
        </p>
        <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Resolution Rate</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3 text-center">
          <p className={`font-bold text-gray-900 ${isLarge ? 'text-xl' : 'text-lg'}`}>{community.reports}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Reports</p>
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3 text-center">
          <p className={`font-bold text-gray-900 ${isLarge ? 'text-xl' : 'text-lg'}`}>{community.points.toLocaleString()}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Points</p>
        </div>
      </div>

      {/* Members */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
        <Users size={11} />
        <span>{community.members.toLocaleString()} active members</span>
      </div>
    </div>
  )
}

export default function Leaderboard() {
  useReveal()
  const [filter, setFilter]   = useState('all')
  const [search, setSearch]   = useState('')
  const [page, setPage]       = useState(1)

  const regions  = ['all', ...Array.from(new Set(communities.map(c => c.region)))]
  const filtered = communities.filter(c => {
    const matchFilter = filter === 'all' || c.region === filter
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.region.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)

  return (
    <div className="font-poppins bg-bali-50 text-gray-900 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[72vh] overflow-hidden rounded-b-[36px] bg-gray-950 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/img/bg-rank.jpg"
            alt="Community Ranking"
            className="w-full h-full object-cover opacity-40"
            onError={e => { e.target.style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/65" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 flex flex-col items-center text-center">
          <h1 className="font-animal text-5xl md:text-8xl lg:text-9xl text-white leading-tight mb-6 reveal reveal-up delay-100">
            Leaderboard
          </h1>
          <p className="text-white/65 text-sm md:text-base max-w-md leading-relaxed mb-10 reveal reveal-up delay-200">
            Track waste action performance across every community. Together we push every neighborhood to contribute to a cleaner environment.
          </p>

          <div className="flex flex-wrap justify-center gap-3 reveal reveal-up delay-300">
            {[
              { label: '850+',    sub: 'Total Communities' },
              { label: '12,400+', sub: 'Total Reports' },
              { label: '89%',     sub: 'Resolved' },
              { label: '4.7 Tons',sub: 'Waste Handled' },
            ].map(item => (
              <div
                key={item.label}
                className="bg-white/8 border border-white/14 rounded-2xl px-5 py-3.5 backdrop-blur-sm text-center min-w-[130px]"
              >
                <p className="text-lg font-semibold text-white">{item.label}</p>
                <p className="text-xs text-white/55 mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PODIUM ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Section header */}
          <div className="text-center mb-10 reveal reveal-up">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight mb-2">Top Communities</h2>
            <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
              This week's best performing communities based on reports, resolution rate, and participation.
            </p>
          </div>

          {/* Podium layout: 2nd | 1st | 3rd */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end reveal reveal-up delay-100">
            {/* 2nd */}
            <div className="md:mb-6">
              <PodiumCard community={communities[1]} size="sm" />
            </div>
            {/* 1st */}
            <div className="order-first md:order-none relative">
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full text-amber-900"
                style={{ backgroundColor: '#FDE68A', boxShadow: '0 2px 12px #F59E0B44' }}
              >
                 Best This Week
              </div>
              <PodiumCard community={communities[0]} size="lg" />
            </div>
            {/* 3rd */}
            <div className="md:mb-12">
              <PodiumCard community={communities[2]} size="sm" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FULL TABLE ── */}
      <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border border-gray-200/70 rounded-3xl shadow-sm overflow-hidden reveal reveal-up">

            {/* Table header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">All Communities</h3>
                <p className="text-sm text-gray-400 mt-0.5">Search and monitor community positions based on the latest data.</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Region filter */}
                <div className="flex bg-gray-50 border border-gray-200 rounded-xl p-1 gap-1 flex-wrap">
                  {regions.map(r => (
                    <button
                      key={r}
                      onClick={() => { setFilter(r); setPage(1) }}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer border-none font-poppins ${
                        filter === r
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-transparent text-gray-500 hover:text-gray-700'
                      }`}
                      style={filter === r ? { backgroundColor: PRIMARY } : {}}
                    >
                      {r === 'all' ? 'All' : r}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={search}
                    onChange={e => { setSearch(e.target.value); setPage(1) }}
                    placeholder="Search community..."
                    className="h-9 w-52 rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm text-gray-800 outline-none focus:bg-white focus:border-primary focus:ring-1 transition-all font-poppins"
                    style={{ '--tw-ring-color': `${PRIMARY}30` }}
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full" style={{ minWidth: 680 }}>
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {['Rank', 'Community', 'Region', 'Reports', 'Resolution Rate', 'Points', 'Trend'].map(h => (
                      <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((c) => {
                    const isTop3 = c.rank <= 3
                    const top3Colors = { 1: '#F59E0B', 2: '#94A3B8', 3: '#F97316' }
                    return (
                    <tr
                      key={c.rank}
                      className={`border-t transition-colors ${isTop3 ? 'border-gray-100' : 'border-gray-50 hover:bg-gray-50/60'}`}
                      style={isTop3 ? { background: `${top3Colors[c.rank]}08`, borderLeft: `3px solid ${top3Colors[c.rank]}` } : {}}
                    >
                      {/* Rank */}
                      <td className="px-5 py-4">
                        <span
                          className={`text-sm font-black ${isTop3 ? '' : 'text-gray-300'}`}
                          style={isTop3 ? { color: top3Colors[c.rank] } : {}}
                        >
                          {String(c.rank).padStart(2, '0')}
                        </span>
                      </td>

                      {/* Community name */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={isTop3
                              ? { backgroundColor: `${top3Colors[c.rank]}18`, border: `1px solid ${top3Colors[c.rank]}33` }
                              : { backgroundColor: '#F9FAFB', border: '1px solid #F3F4F6' }
                            }
                          >
                            <Leaf size={15} style={{ color: isTop3 ? top3Colors[c.rank] : '#9CA3AF' }} />
                          </div>
                          <div>
                            <span className={`text-sm block ${isTop3 ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>
                              {c.name}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Region */}
                      <td className="px-5 py-4">
                        <span className="text-xs font-medium text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
                          {c.region}
                        </span>
                      </td>

                      {/* Reports */}
                      <td className="px-5 py-4 text-sm font-semibold text-gray-700">{c.reports}</td>

                      {/* Resolution */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${c.resolved}%`, backgroundColor: isTop3 ? top3Colors[c.rank] : PRIMARY }}
                            />
                          </div>
                          <span
                            className="text-xs font-bold"
                            style={{ color: isTop3 ? top3Colors[c.rank] : PRIMARY }}
                          >
                            {c.resolved}%
                          </span>
                        </div>
                      </td>

                      {/* Points */}
                      <td className="px-5 py-4">
                        <span className="text-sm font-bold text-gray-900">{c.points.toLocaleString()}</span>
                        <span className="text-xs text-gray-400 ml-1">pts</span>
                      </td>

                      {/* Trend */}
                      <td className="px-5 py-4">
                        <TrendBadge trend={c.trend} />
                      </td>
                    </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between flex-wrap gap-3 px-6 py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Showing <span className="font-semibold text-gray-600">{((page - 1) * ITEMS_PER_PAGE) + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)}</span> of {filtered.length} communities
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="h-8 px-4 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer font-poppins"
                >
                  ← Prev
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 rounded-lg text-xs font-semibold transition cursor-pointer border font-poppins ${
                        page === p
                          ? 'text-white border-transparent'
                          : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                      }`}
                      style={page === p ? { backgroundColor: PRIMARY, borderColor: PRIMARY } : {}}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="h-8 px-4 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer font-poppins"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW POINTS ARE CALCULATED ── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-md mx-auto text-center mb-10 reveal reveal-up">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight mb-3">
              How are points calculated?
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              The ranking system is transparent and based on real data from community reports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: FileText,
                title: 'Number of Reports',
                desc: 'Every waste report submitted by community members earns +10 points for the community.',
                weight: '40%',
              },
              {
                icon: CheckCircle,
                title: 'Resolution Rate',
                desc: 'Successfully handled reports improve the percentage and give bonus points to the community.',
                weight: '40%',
              },
              {
                icon: Users,
                title: 'Member Participation',
                desc: 'The more active members contributing, the greater the points multiplier the community earns.',
                weight: '20%',
              },
            ].map(({ icon: Icon, title, desc, weight }) => (
              <div
                key={title}
                className="bg-bali-50 border border-primary/10 rounded-3xl p-7 reveal reveal-up"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-primary/10 flex items-center justify-center mb-5 shadow-sm">
                  <Icon size={22} style={{ color: PRIMARY }} />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{desc}</p>
                <span
                  className="inline-flex rounded-full px-3 py-1 text-xs font-bold"
                  style={{ backgroundColor: `${PRIMARY}18`, color: PRIMARY }}
                >
                  Weight {weight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}