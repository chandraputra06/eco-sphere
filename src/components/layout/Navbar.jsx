import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar({ variant = 'type1' }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setUserMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Waste Map', to: '/waste-map' },
    { label: 'Leaderboard', to: '/leaderboard' },
    { label: 'Gamification', to: '/gamification' },
    { label: 'Contact Us', to: '/contact' },
  ]

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  const isWhiteNavbar = scrolled || mobileOpen

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
    navigate('/')
  }

  const ghostBtn = isWhiteNavbar
    ? 'text-[#1e7a6b] hover:bg-[#1e7a6b]/10'
    : 'text-white hover:bg-white/10'
  const solidBtn = isWhiteNavbar
    ? 'bg-[#1e7a6b] text-white hover:bg-[#153C35]'
    : 'bg-white text-[#1e7a6b] hover:bg-white/90'

  return (
    <>
      <style>{`
        .nav-link { position: relative; padding-bottom: 4px; font-size: 14px; font-weight: 500; transition: color 0.25s; text-decoration: none; }
        .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 100%; height: 2px; border-radius: 9999px; background: #1F7A6B; transform: scaleX(0); transform-origin: left; transition: transform 0.3s cubic-bezier(0.22,1,0.36,1); }
        .nav-link.active-scrolled::after, .nav-link:hover::after { transform: scaleX(1); }
        .nav-link.active-transparent::after { background: white; transform: scaleX(1); }
        .nav-transparent .nav-link:hover::after { background: rgba(255,255,255,0.7); transform: scaleX(1); }
        .nav-scrolled .nav-link { color: #4b5563; }
        .nav-scrolled .nav-link:hover { color: #1F7A6B; }
        .nav-scrolled .nav-link.active-scrolled { color: #1F7A6B; font-weight: 600; }
        .nav-transparent .nav-link { color: rgba(255,255,255,0.65); }
        .nav-transparent .nav-link:hover { color: rgba(255,255,255,0.95); }
        .nav-transparent .nav-link.active-transparent { color: white; font-weight: 600; }
        .auth-btn { font-weight: 700; font-size: 13px; cursor: pointer; border: none; transition: all 0.25s cubic-bezier(0.22,1,0.36,1); letter-spacing: 0.01em; }
        .auth-btn:active { transform: scale(0.97); }
        .mobile-link { display: flex; align-items: center; padding: 14px 16px; border-radius: 14px; font-size: 15px; font-weight: 600; color: #374151; text-decoration: none; transition: all 0.2s; position: relative; }
        .mobile-link:hover { background: #E8F5F3; color: #1F7A6B; }
        .mobile-link.active-mobile { background: #E8F5F3; color: #1F7A6B; font-weight: 700; }
        .mobile-link.active-mobile::before { content: ''; position: absolute; left: 0; top: 25%; height: 50%; width: 3px; border-radius: 9999px; background: #1F7A6B; }
      `}</style>

      <nav id="navbar" className="fixed left-0 top-0 z-[200] w-full transition-all duration-500">
        <div
          className={`flex items-center justify-between gap-3 px-4 py-4 transition-all duration-500 sm:px-6 sm:py-5 lg:px-20 lg:py-5 xl:px-36 ${
            isWhiteNavbar
              ? 'border-b border-gray-100 bg-white/95 shadow-md backdrop-blur-md'
              : 'border-b border-white/10 bg-[#1e7a6b]/60 backdrop-blur-sm'
          }`}
        >
          {/* Logo */}
          <div className="flex min-w-0 cursor-pointer items-center gap-3 sm:gap-4" onClick={() => navigate('/')}>
            <img
              src={isWhiteNavbar ? '/assets/logo/Logo-Green.png' : '/assets/logo/Logo-White.png'}
              alt="Eco-Sphere Logo"
              className="h-9 shrink-0 transition-all duration-300 sm:h-10 lg:h-11"
            />
            <h1 className={`truncate text-lg font-bold tracking-tight transition-all duration-300 sm:text-xl ${isWhiteNavbar ? 'text-[#1F7A6B]' : 'text-white'}`}>
              Eco-Sphere
            </h1>
          </div>

          {/* Center links */}
          {variant === 'type1' && (
            <div className={`hidden items-center gap-8 md:flex lg:gap-12 ${isWhiteNavbar ? 'nav-scrolled' : 'nav-transparent'}`}>
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} className={`nav-link ${isActive(link.to) ? (isWhiteNavbar ? 'active-scrolled' : 'active-transparent') : ''}`}>
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right actions */}
          <div className="flex shrink-0 items-center gap-2">
            {isAuthenticated ? (
              // ── Logged in: user menu ──
              <div className="relative hidden md:block">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className={`flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 transition ${isWhiteNavbar ? 'hover:bg-gray-100' : 'hover:bg-white/10'}`}
                >
                  <span className={`grid h-9 w-9 place-items-center overflow-hidden rounded-full text-sm font-bold ${isWhiteNavbar ? 'bg-[#1e7a6b] text-white' : 'bg-white text-[#1e7a6b]'}`}>
                    {user?.avatar ? <img src={user.avatar} alt="" className="h-full w-full object-cover" /> : (user?.name?.[0] || 'U').toUpperCase()}
                  </span>
                  <span className={`max-w-[110px] truncate text-sm font-semibold ${isWhiteNavbar ? 'text-gray-700' : 'text-white'}`}>
                    {user?.name || 'Akun'}
                  </span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-gray-100 bg-white p-1 shadow-xl">
                    <div className="border-b border-gray-100 px-3 py-2">
                      <p className="truncate text-sm font-semibold text-gray-800">{user?.name}</p>
                      <p className="text-xs capitalize text-gray-400">{user?.role}</p>
                    </div>
                    {(user?.role === 'manager' || user?.role === 'collector') && (
                      <Link to="/dashboard" className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-[#E8F5F3] hover:text-[#1F7A6B]">
                        Dashboard
                      </Link>
                    )}
                    {user?.role === 'csr' && (
                      <Link to="/csr-dashboard" className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-[#E8F5F3] hover:text-[#1F7A6B]">
                        Dashboard
                      </Link>
                    )}
                    {user?.role === 'admin' && (
                      <Link to="/admin" className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-[#E8F5F3] hover:text-[#1F7A6B]">
                        Admin
                      </Link>
                    )}
                    <Link to="/profile" className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-[#E8F5F3] hover:text-[#1F7A6B]">
                      Profil
                    </Link>
                    <button type="button" onClick={handleLogout} className="block w-full rounded-lg px-3 py-2 text-left text-sm text-error transition hover:bg-red-50">
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // ── Logged out: Login + Register ──
              <div className="hidden items-center gap-2 md:flex">
                <Link to="/login">
                  <button className={`auth-btn rounded-xl px-5 py-2.5 ${ghostBtn}`}>Login</button>
                </Link>
                <Link to="/get-started">
                  <button className={`auth-btn rounded-xl px-5 py-2.5 ${solidBtn}`}>Register</button>
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              type="button"
              className="relative z-[220] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full md:hidden"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label="Toggle menu"
            >
              <span className="flex flex-col items-center justify-center gap-[5px]">
                <span className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${isWhiteNavbar ? 'bg-gray-700' : 'bg-white'} ${mobileOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
                <span className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${isWhiteNavbar ? 'bg-gray-700' : 'bg-white'} ${mobileOpen ? 'scale-x-0 opacity-0' : ''}`} />
                <span className={`block h-[2px] rounded-full transition-all duration-300 ${isWhiteNavbar ? 'bg-gray-700' : 'bg-white'} ${mobileOpen ? 'w-6 -translate-y-[7px] -rotate-45' : 'w-4 self-end'}`} />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`absolute left-0 top-full z-[210] w-full origin-top transition-all duration-300 md:hidden ${mobileOpen ? 'pointer-events-auto scale-y-100 opacity-100' : 'pointer-events-none scale-y-95 opacity-0'}`}>
          <div className="flex max-h-[calc(100vh-72px)] flex-col gap-1 overflow-y-auto border-t border-gray-100 bg-white px-4 py-5 shadow-xl sm:px-6">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className={`mobile-link ${isActive(link.to) ? 'active-mobile' : ''}`} onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}

            <div className="mt-4 border-t border-gray-100 pt-4">
              {isAuthenticated ? (
                <div className="flex flex-col gap-2">
                  {(user?.role === 'manager' || user?.role === 'collector') && (
                    <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                      <button className="w-full rounded-xl bg-[#1F7A6B] px-6 py-3 text-sm font-bold text-white">Dashboard</button>
                    </Link>
                  )}
                  {user?.role === 'csr' && (
                    <Link to="/csr-dashboard" onClick={() => setMobileOpen(false)}>
                      <button className="w-full rounded-xl bg-[#1F7A6B] px-6 py-3 text-sm font-bold text-white">Dashboard</button>
                    </Link>
                  )}
                  {user?.role === 'admin' && (
                    <Link to="/admin" onClick={() => setMobileOpen(false)}>
                      <button className="w-full rounded-xl bg-[#1F7A6B] px-6 py-3 text-sm font-bold text-white">Admin</button>
                    </Link>
                  )}
                  <Link to="/profile" onClick={() => setMobileOpen(false)}>
                    <button className="w-full rounded-xl bg-[#E8F5F3] px-6 py-3 text-sm font-bold text-[#1F7A6B]">Profil</button>
                  </Link>
                  <button onClick={handleLogout} className="w-full rounded-xl border border-red-200 px-6 py-3 text-sm font-bold text-error">Keluar</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <button className="w-full rounded-xl border border-[#1F7A6B] px-6 py-3 text-sm font-bold text-[#1F7A6B]">Login</button>
                  </Link>
                  <Link to="/get-started" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <button className="w-full rounded-xl bg-[#1F7A6B] px-6 py-3 text-sm font-bold text-white">Register</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}