import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar({ variant = 'type1' }) {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate  = useNavigate()
  const location  = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location.pathname])

  const navLinks = [
    { label: 'Beranda',      to: '/' },
    { label: 'Waste Map',    to: '/waste-map' },
    { label: 'Leaderboard',  to: '/leaderboard' },
    { label: 'Gamification', to: '/gamification' },
    { label: 'Contact Us',   to: '/contact' },
  ]

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <>
      <style>{`
        /* Nav link base */
        .nav-link {
          position: relative;
          padding-bottom: 4px;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.25s;
          text-decoration: none;
        }

        /* Underline track */
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          border-radius: 9999px;
          background: #1F7A6B;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }

        /* Scrolled: green underline */
        .nav-link.active-scrolled::after,
        .nav-link:hover::after {
          transform: scaleX(1);
        }

        /* Transparent: white underline */
        .nav-link.active-transparent::after {
          background: white;
          transform: scaleX(1);
        }
        .nav-transparent .nav-link:hover::after {
          background: rgba(255,255,255,0.7);
          transform: scaleX(1);
        }

        /* Scrolled link colors */
        .nav-scrolled .nav-link         { color: #4b5563; }
        .nav-scrolled .nav-link:hover   { color: #1F7A6B; }
        .nav-scrolled .nav-link.active-scrolled { color: #1F7A6B; font-weight: 600; }

        /* Transparent link colors */
        .nav-transparent .nav-link         { color: rgba(255,255,255,0.6); }
        .nav-transparent .nav-link:hover   { color: rgba(255,255,255,0.95); }
        .nav-transparent .nav-link.active-transparent { color: white; font-weight: 600; }

        /* Report button */
        .report-btn {
          position: relative;
          overflow: hidden;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          border: none;
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
          letter-spacing: 0.01em;
        }
        .report-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.15);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .report-btn:hover::before { opacity: 1; }
        .report-btn:active { transform: scale(0.97); }

        /* User avatar ring on hover */
        .user-avatar {
          transition: all 0.3s;
          cursor: pointer;
        }
        .user-avatar:hover {
          box-shadow: 0 0 0 2px #1F7A6B;
        }

        /* Mobile link */
        .mobile-link {
          display: flex;
          align-items: center;
          padding: 10px 16px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          transition: all 0.2s;
          position: relative;
        }
        .mobile-link:hover {
          background: #E8F5F3;
          color: #1F7A6B;
        }
        .mobile-link.active-mobile {
          background: #E8F5F3;
          color: #1F7A6B;
          font-weight: 600;
        }
        .mobile-link.active-mobile::before {
          content: '';
          position: absolute;
          left: 0;
          top: 25%;
          height: 50%;
          width: 3px;
          border-radius: 9999px;
          background: #1F7A6B;
        }
      `}</style>

      <nav
        id="navbar"
        className="fixed top-0 left-0 w-full z-[200] transition-all duration-500"
      >
        <div
          className={`
            flex justify-between items-center gap-3
            py-4 sm:py-5 lg:py-5
            px-4 sm:px-6 lg:px-20 xl:px-36
            transition-all duration-500
            ${scrolled
              ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100'
              : 'bg-[#1e7a6b]/60 backdrop-blur-sm border-b border-white/10'
            }
          `}
        >
          {/* ── Logo ── */}
          <div
            className="flex min-w-0 items-center gap-3 sm:gap-4 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img
              src={scrolled ? '/assets/logo/Logo-Green.png' : '/assets/logo/Logo-White.png'}
              alt="Eco-Sphere Logo"
              className="h-9 sm:h-10 lg:h-11 shrink-0 transition-all duration-300"
            />
            <h1 className={`truncate text-lg sm:text-xl font-bold tracking-tight transition-all duration-300 ${scrolled ? 'text-[#1F7A6B]' : 'text-white'}`}>
              Eco-Sphere
            </h1>
          </div>

          {/* ── Desktop Links ── */}
          {variant === 'type1' && (
            <div className={`hidden md:flex gap-8 lg:gap-12 items-center ${scrolled ? 'nav-scrolled' : 'nav-transparent'}`}>
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-link ${
                    isActive(link.to)
                      ? scrolled ? 'active-scrolled' : 'active-transparent'
                      : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* ── CTA ── */}
          <div className="flex shrink-0 items-center gap-3">
            {variant === 'type1' ? (
              <>
                <Link to="/report" className="hidden md:block shrink-0">
                  <button
                    className="report-btn px-7 py-2.5 rounded-xl"
                    style={scrolled
                      ? { background: '#1e7a6b', color: 'white' }
                      : { background: 'white', color: '#1e7a6b' }
                    }
                  >
                    Scan Waste
                  </button>
                </Link>

                {/* User icon — swap on scroll */}
                <div className="hidden md:flex w-10 h-10 rounded-full overflow-hidden border border-white/20 user-avatar">
                  <img
                    src={scrolled ? '/assets/icon/icon-user-2.png' : '/assets/icon/Icon-User.png'}
                    alt="User"
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                </div>
              </>
            ) : (
              <Link to="/" className="hidden md:block shrink-0">
                <button className="report-btn bg-white text-[#153C35] px-7 py-2.5 rounded-xl">
                  Home
                </button>
              </Link>
            )}

            {/* ── Hamburger ── */}
            <button
              type="button"
              className="relative z-[220] md:hidden flex h-11 w-11 items-center justify-center rounded-full cursor-pointer"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <span className="flex flex-col justify-center items-center gap-[5px]">
                <span className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${scrolled ? 'bg-gray-700' : 'bg-white'} ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${scrolled ? 'bg-gray-700' : 'bg-white'} ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block h-[2px] rounded-full transition-all duration-300 ${scrolled ? 'bg-gray-700' : 'bg-white'} ${mobileOpen ? '-rotate-45 -translate-y-[7px] w-6' : 'w-4 self-end'}`} />
              </span>
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          className={`md:hidden absolute top-full left-0 w-full z-[210] transition-all duration-300 origin-top ${
            mobileOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
          }`}
        >
          <div className="flex flex-col px-4 sm:px-6 py-4 gap-1 bg-white/97 backdrop-blur-md shadow-xl border-t border-gray-100 max-h-[calc(100vh-72px)] overflow-y-auto">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`mobile-link ${isActive(link.to) ? 'active-mobile' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
              <Link to="/report" className="flex-1" onClick={() => setMobileOpen(false)}>
                <button className="w-full bg-[#1F7A6B] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#153C35] transition cursor-pointer border-none">
                  Report Waste
                </button>
              </Link>
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 user-avatar flex-none">
                <img src="/assets/icon/icon-user-2.png" alt="User" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}