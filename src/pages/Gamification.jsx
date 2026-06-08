import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Camera, CheckCircle2, MapPin, Recycle, Leaf, Flame, Waves,
  ShieldCheck, Globe, Award, Trash2, Sparkles, ArrowRight, Clock,
  Users, Gift
} from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { badges, dailyMissions, csrChallenges, recentActivities, leaderboardData } from '../data/gameData'

const PRIMARY = '#1F7A6B'
const DARK    = '#153C35'

const iconMap = {
  Camera, CheckCircle2, MapPin, Recycle, Leaf, Flame, Waves,
  ShieldCheck, Globe, Award, Trash2, Sparkles, CheckCircle: CheckCircle2,
}
function IconComp({ name, size = 20 }) {
  const C = iconMap[name]
  return C ? <C size={size} /> : null
}

export default function Gamification() {
  useReveal()
  const [activeChallenge, setActiveChallenge] = useState(null)
  const unlockedCount = badges.filter(b => b.unlocked).length

  return (
    <div className="font-poppins bg-bali-50 text-gray-900 overflow-x-hidden min-h-screen">

      {/* ── HERO ── */}
      <section className="relative min-h-[72vh] overflow-hidden rounded-b-[36px] bg-gray-950 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/img/bg-gamifikasi.png"
            alt="Eco Warrior"
            className="w-full h-full object-cover opacity-45"
            onError={e => { e.target.style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/55" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 flex flex-col items-center text-center">
          <h1 className="font-animal text-5xl md:text-8xl lg:text-9xl text-white leading-tight mb-6 reveal reveal-up delay-100">
            Eco Warrior
          </h1>
          <p className="text-white/65 text-sm md:text-base max-w-md leading-relaxed mb-10 reveal reveal-up delay-200">
            Track your impact, complete missions, and compete with other eco warriors across Bali to protect our environment.
          </p>

          <div className="flex flex-wrap justify-center gap-3 reveal reveal-up delay-300">
            {[
              { label: 'Wira Resik',  sub: 'Your username' },
              { label: 'Level 12',    sub: 'Current rank' },
              { label: '42 kg',       sub: 'Waste reported' },
              { label: '2,450 XP',    sub: 'Total points' },
            ].map(item => (
              <div
                key={item.label}
                className="bg-white/8 border border-white/14 rounded-2xl px-5 py-3.5 backdrop-blur-sm text-center min-w-[120px]"
              >
                <p className="text-lg font-semibold text-white">{item.label}</p>
                <p className="text-xs text-white/55 mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <main className="py-12 px-6 lg:px-10 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-7">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-7">

            {/* XP Progress */}
            <div className="bg-white border border-gray-200/70 rounded-3xl p-7 shadow-sm reveal reveal-up">
              <div className="flex justify-between items-end mb-3">
                <h3 className="font-semibold text-gray-900">Your Level Progress</h3>
                <span className="text-xs font-semibold text-gray-400">XP: 1,350 / 2,000</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: '65%', backgroundColor: PRIMARY }}
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-2.5 italic">
                *Earn 650 more XP to level up to Eco Warrior rank.
              </p>
            </div>

            {/* Daily Missions */}
            <div className="bg-white border border-gray-200/70 rounded-3xl p-7 shadow-sm reveal reveal-up">
              <div className="flex items-center justify-between mb-7">
                <h3 className="font-semibold text-gray-900 text-lg">Today's Missions</h3>
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Clock size={13} />
                  <span className="text-xs font-semibold tracking-wide">Reset in 12h 30m</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dailyMissions.map(m => (
                  <MissionCard key={m.id} mission={m} />
                ))}
              </div>
            </div>

            {/* CSR Challenges */}
            <div className="bg-white border border-gray-200/70 rounded-3xl p-7 shadow-sm reveal reveal-up">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">CSR Challenges</h3>
                  <p className="text-xs text-gray-400 mt-1">Apply for corporate challenges and win cash rewards</p>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5 shrink-0">
                  <Gift size={13} className="text-amber-500" />
                  <span className="text-xs font-bold text-amber-600">Cash Prizes</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {csrChallenges.map(c => (
                  <CsrChallengeCard key={c.id} challenge={c} onApply={() => setActiveChallenge(c)} />
                ))}
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white border border-gray-200/70 rounded-3xl p-7 shadow-sm reveal reveal-up">
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-gray-900">Badges & Achievements</h3>
                <p className="text-xs text-gray-400 mt-1">
                  <span className="font-semibold text-gray-600">{unlockedCount}</span> of {badges.length} badges unlocked.
                </p>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {badges.map((b, i) => (
                  <BadgeCard key={i} badge={b} />
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-7">

            {/* Leaderboard */}
            <div className="bg-white border border-gray-200/70 rounded-3xl p-7 shadow-sm reveal reveal-up">
              <h3 className="font-semibold text-gray-900 text-lg mb-6">Leaderboard</h3>

              <div className="flex flex-col gap-4">
                {/* Top 3 */}
                {leaderboardData.slice(0, 3).map(u => (
                  <div key={u.rank} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs font-black w-6 shrink-0"
                        style={{ color: u.rank === 1 ? PRIMARY : '#d1d5db' }}
                      >
                        0{u.rank}
                      </span>
                      {/* Avatar placeholder */}
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-bold shrink-0"
                        style={{
                          backgroundColor: u.rank === 1 ? `${PRIMARY}18` : '#F9FAFB',
                          color: u.rank === 1 ? PRIMARY : '#9ca3af',
                          border: u.rank === 1 ? `1px solid ${PRIMARY}30` : '1px solid #F3F4F6',
                        }}
                      >
                        {u.name.charAt(0)}
                      </div>
                      <span
                        className="text-sm"
                        style={{
                          fontWeight: u.rank === 1 ? 700 : 500,
                          color: u.rank === 1 ? '#111827' : '#6b7280',
                        }}
                      >
                        {u.name}
                      </span>
                    </div>
                    <span
                      className="text-xs font-black"
                      style={{ color: u.rank === 1 ? DARK : '#9ca3af' }}
                    >
                      {u.pts.toLocaleString()}
                    </span>
                  </div>
                ))}

                {/* Dots separator */}
                <div className="flex justify-center gap-1 py-1">
                  <div className="w-1 h-1 rounded-full bg-gray-300" />
                  <div className="w-1 h-1 rounded-full bg-gray-300" />
                  <div className="w-1 h-1 rounded-full bg-gray-300" />
                </div>

                {/* Your rank */}
                <div
                  className="flex justify-between items-center rounded-2xl px-4 py-3"
                  style={{ backgroundColor: `${PRIMARY}0D`, border: `1px solid ${PRIMARY}20` }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-black" style={{ color: PRIMARY }}>#45</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: PRIMARY }}>Your Rank</span>
                  </div>
                  <span className="text-base font-black" style={{ color: PRIMARY }}>2.4k</span>
                </div>

                {/* Rank below */}
                {leaderboardData.slice(-1).map(u => (
                  <div key={u.rank} className="flex items-center justify-between opacity-40 pl-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-400 w-6">{u.rank}</span>
                      <span className="text-sm font-medium text-gray-500">{u.name}</span>
                    </div>
                    <span className="text-xs font-bold text-gray-400">{u.pts.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <Link to="/leaderboard" className="block mt-5">
                <button className="w-full py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition cursor-pointer font-poppins">
                  View Full Leaderboard →
                </button>
              </Link>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-gray-200/70 rounded-3xl p-7 shadow-sm reveal reveal-up">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900 text-lg">Your Impact Log</h3>
                <a
                  href="#"
                  className="text-[10px] font-bold uppercase tracking-wider no-underline hover:underline"
                  style={{ color: PRIMARY }}
                >
                  View All
                </a>
              </div>
              <div className="flex flex-col gap-5">
                {recentActivities.map((a, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${PRIMARY}12`, color: PRIMARY }}
                      >
                        <IconComp name={a.icon} size={17} />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-800">{a.title}</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5">{a.place} · {a.time}</p>
                      </div>
                    </div>
                    <span className="text-xs font-black" style={{ color: PRIMARY }}>+{a.pts}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips card */}
            <div
              className="rounded-3xl p-6 reveal reveal-up"
              style={{ backgroundColor: `${PRIMARY}0F`, border: `1px solid ${PRIMARY}18` }}
            >
              <div className="flex items-center gap-2 mb-3" style={{ color: PRIMARY }}>
                <Leaf size={16} />
                <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: PRIMARY }}>Tip of the Week</h4>
              </div>
              <p className="text-[12px] leading-relaxed font-medium" style={{ color: DARK }}>
                "Sorting organic waste at home can reduce landfill load by up to 60%. Start from your kitchen today!"
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ── CSR MODAL ── */}
      {activeChallenge && (
        <CsrModal challenge={activeChallenge} onClose={() => setActiveChallenge(null)} />
      )}
    </div>
  )
}

/* ── MISSION CARD ── */
function MissionCard({ mission }) {
  if (mission.completed) {
    return (
      <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 relative overflow-hidden">
        <div className="flex justify-between items-start mb-5">
          <div className="w-11 h-11 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-300">
            <IconComp name={mission.icon} size={20} />
          </div>
          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">Done</span>
        </div>
        <div className="mb-5">
          <h4 className="text-sm font-semibold text-gray-300 mb-1">{mission.title}</h4>
          <p className="text-xs text-gray-300 leading-relaxed">{mission.desc}</p>
        </div>
        <div className="w-full py-3 bg-white border border-gray-100 rounded-xl text-xs font-semibold text-gray-300 text-center">
          Mission Complete ✓
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 rounded-3xl bg-white border-2 border-gray-50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 group"
      style={{ '--tw-shadow-color': `${PRIMARY}10` }}>
      <div className="flex justify-between items-start mb-5">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform"
          style={{ backgroundColor: `${PRIMARY}12`, color: PRIMARY }}
        >
          <IconComp name={mission.icon} size={20} />
        </div>
        <span
          className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
          style={{ backgroundColor: `${PRIMARY}12`, color: PRIMARY }}
        >
          +{mission.pts} PTS
        </span>
      </div>
      <div className="mb-5">
        <h4 className="text-sm font-semibold text-gray-900 mb-1">{mission.title}</h4>
        <p className="text-xs text-gray-400 leading-relaxed">{mission.desc}</p>
      </div>
      {mission.link ? (
        <Link to={mission.link} className="block">
          <button
            className="w-full py-3 text-white rounded-xl text-xs font-semibold cursor-pointer font-poppins flex items-center justify-center gap-1.5 hover:opacity-90 transition border-none"
            style={{ backgroundColor: PRIMARY }}
          >
            Start Mission <ArrowRight size={11} />
          </button>
        </Link>
      ) : (
        <button
          className="w-full py-3 text-white rounded-xl text-xs font-semibold cursor-pointer font-poppins hover:opacity-90 transition border-none"
          style={{ backgroundColor: PRIMARY }}
        >
          Log Action
        </button>
      )}
    </div>
  )
}

/* ── CSR CHALLENGE CARD ── */
function CsrChallengeCard({ challenge, onApply }) {
  return (
    <div className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-lg"
            style={{ backgroundColor: `${challenge.color}15` }}
          >
            {challenge.badge}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">{challenge.title}</h4>
            <p className="text-[11px] text-gray-400 mt-0.5">by {challenge.sponsor}</p>
          </div>
        </div>
        <div className="text-right shrink-0 ml-3">
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-2.5 py-1 text-xs font-bold text-amber-600">
            {challenge.reward}
          </div>
          <p className="text-[10px] text-gray-400 mt-1">{challenge.deadline}</p>
        </div>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed mb-3">{challenge.desc}</p>

      <div className="mb-3">
        <div className="flex justify-between text-[11px] mb-1.5">
          <span className="text-gray-400 flex items-center gap-1">
            <Users size={10} /> {challenge.participants.toLocaleString()} participants
          </span>
          <span className="font-semibold" style={{ color: challenge.color }}>{challenge.progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: `${challenge.progress}%`, backgroundColor: challenge.color }}
          />
        </div>
      </div>

      <button
        onClick={onApply}
        className="w-full py-2.5 text-white rounded-xl text-xs font-semibold cursor-pointer font-poppins flex items-center justify-center gap-1.5 hover:opacity-90 transition border-none"
        style={{ backgroundColor: challenge.color }}
      >
        Apply for Challenge <ArrowRight size={12} />
      </button>
    </div>
  )
}

/* ── BADGE CARD ── */
function BadgeCard({ badge }) {
  return (
    <div
      className="rounded-2xl p-3.5 flex flex-col items-center gap-2.5 text-center transition-all duration-300"
      style={{
        backgroundColor: badge.unlocked ? `${PRIMARY}0D` : 'white',
        border: badge.unlocked ? `1px solid ${PRIMARY}20` : '1px solid #F3F4F6',
        opacity: badge.unlocked ? 1 : 0.35,
        filter: badge.unlocked ? 'none' : 'grayscale(1)',
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          backgroundColor: badge.unlocked ? PRIMARY : '#F3F4F6',
          color: badge.unlocked ? 'white' : '#9ca3af',
        }}
      >
        <IconComp name={badge.icon} size={18} />
      </div>
      <div>
        <h4 className="text-[10px] font-semibold text-gray-800 leading-tight mb-1">{badge.name}</h4>
        <span
          className="text-[9px] font-bold px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: badge.unlocked ? 'white' : '#F9FAFB',
            color: badge.unlocked ? PRIMARY : '#9ca3af',
            border: badge.unlocked ? `1px solid ${PRIMARY}20` : 'none',
          }}
        >
          +{badge.pts} PTS
        </span>
      </div>
    </div>
  )
}

/* ── CSR MODAL ── */
function CsrModal({ challenge, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-3xl block mb-2">{challenge.badge}</span>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{challenge.title}</h2>
            <p className="text-sm text-gray-400">
              Sponsored by <strong className="text-gray-700">{challenge.sponsor}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 border-none flex items-center justify-center text-gray-500 hover:bg-gray-200 transition cursor-pointer text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* Prize banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 text-center">
          <Gift size={22} className="text-amber-500 mx-auto mb-2" />
          <p className="text-xs font-semibold text-amber-800 mb-1">Cash Prize</p>
          <p className="text-2xl font-black text-amber-600">{challenge.reward}</p>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed mb-6">{challenge.desc}</p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <p className="text-xs text-gray-400 mb-1">Deadline</p>
            <p className="text-sm font-semibold text-gray-800">{challenge.deadline}</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <p className="text-xs text-gray-400 mb-1">Participants</p>
            <p className="text-sm font-semibold text-gray-800">{challenge.participants.toLocaleString()}</p>
          </div>
        </div>

        <button
          className="w-full py-3.5 text-white rounded-2xl text-sm font-semibold cursor-pointer font-poppins hover:opacity-90 transition border-none"
          style={{ backgroundColor: challenge.color }}
        >
          Apply Now — Join the Challenge
        </button>
      </div>
    </div>
  )
}