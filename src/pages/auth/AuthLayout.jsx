// src/pages/auth/AuthLayout.jsx
import { Link } from 'react-router-dom'
import { IconShield, IconTrophy, IconSprout } from './icons'

const FEATURES = [
  { Icon: IconShield, text: 'Verified by local communities & waste managers' },
  { Icon: IconTrophy, text: 'Collect points and climb the leaderboard' },
  { Icon: IconSprout, text: 'Manage waste wisely and help protect the Earth' },
]

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full font-poppins md:grid md:grid-cols-2">
      {/* Left panel — background image, centered content */}
      <aside className="relative hidden overflow-hidden p-10 text-white md:flex md:flex-col md:items-center md:justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/img/img-home-1.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#153C35]/90 via-[#1F7A6B]/75 to-[#153C35]/90" />

        <div className="relative w-full max-w-md">
          <div className="mb-8 flex items-center gap-3">
            <img src="/assets/logo/Logo-White.png" alt="Eco-Sphere" className="h-10" />
            <span className="text-lg font-semibold">Eco-Sphere</span>
          </div>

          <h2 className="text-4xl font-bold leading-tight">
            Manage Waste,<br />Protect the Earth Wisely
          </h2>
          <p className="mt-4 text-white/85">
            Scan, report, and manage waste with the community, local waste managers, and collectors.
          </p>
          <ul className="mt-8 space-y-4">
            {FEATURES.map(({ Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 flex-none place-items-center rounded-lg bg-white/15 text-[16px]">
                  <Icon />
                </span>
                <span className="text-sm text-white/90">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="absolute bottom-8 left-10 text-xs text-white/60">© {new Date().getFullYear()} Eco-Sphere</p>
      </aside>

      {/* Right panel — form */}
      <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">
          <Link to="/">
            <img src="/assets/logo/Logo-Green.png" alt="Eco-Sphere" className="mb-8 h-10" />
          </Link>
          {children}
          <div className="mt-8 text-center">
            <Link to="/" className="text-sm text-gray-400 transition hover:text-primary">← Back to Home</Link>
          </div>
        </div>
      </main>
    </div>
  )
}