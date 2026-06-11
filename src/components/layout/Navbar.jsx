import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loginUser } from '../../services/authService'

export default function Navbar({ variant = 'type1' }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)

    window.addEventListener('scroll', onScroll)
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
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

  return (
    <>
      <style>{`
        .nav-link {
          position: relative;
          padding-bottom: 4px;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.25s;
          text-decoration: none;
        }

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

        .nav-link.active-scrolled::after,
        .nav-link:hover::after {
          transform: scaleX(1);
        }

        .nav-link.active-transparent::after {
          background: white;
          transform: scaleX(1);
        }

        .nav-transparent .nav-link:hover::after {
          background: rgba(255,255,255,0.7);
          transform: scaleX(1);
        }

        .nav-scrolled .nav-link {
          color: #4b5563;
        }

        .nav-scrolled .nav-link:hover {
          color: #1F7A6B;
        }

        .nav-scrolled .nav-link.active-scrolled {
          color: #1F7A6B;
          font-weight: 600;
        }

        .nav-transparent .nav-link {
          color: rgba(255,255,255,0.65);
        }

        .nav-transparent .nav-link:hover {
          color: rgba(255,255,255,0.95);
        }

        .nav-transparent .nav-link.active-transparent {
          color: white;
          font-weight: 600;
        }

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

        .report-btn:hover::before {
          opacity: 1;
        }

        .report-btn:active {
          transform: scale(0.97);
        }

        .user-avatar {
          transition: all 0.3s;
          cursor: pointer;
        }

        .user-avatar:hover {
          box-shadow: 0 0 0 2px #1F7A6B;
        }

        .mobile-link {
          display: flex;
          align-items: center;
          padding: 14px 16px;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 600;
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
          font-weight: 700;
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
        className="fixed left-0 top-0 z-[200] w-full transition-all duration-500"
      >
        <div
          className={`
            flex items-center justify-between gap-3
            px-4 py-4
            transition-all duration-500
            sm:px-6 sm:py-5
            lg:px-20 lg:py-5
            xl:px-36
            ${
              isWhiteNavbar
                ? 'border-b border-gray-100 bg-white/95 shadow-md backdrop-blur-md'
                : 'border-b border-white/10 bg-[#1e7a6b]/60 backdrop-blur-sm'
            }
          `}
        >
          <div
            className="flex min-w-0 cursor-pointer items-center gap-3 sm:gap-4"
            onClick={() => navigate('/')}
          >
            <img
              src={
                isWhiteNavbar
                  ? '/assets/logo/Logo-Green.png'
                  : '/assets/logo/Logo-White.png'
              }
              alt="Eco-Sphere Logo"
              className="h-9 shrink-0 transition-all duration-300 sm:h-10 lg:h-11"
            />

            <h1
              className={`truncate text-lg font-bold tracking-tight transition-all duration-300 sm:text-xl ${
                isWhiteNavbar ? 'text-[#1F7A6B]' : 'text-white'
              }`}
            >
              Eco-Sphere
            </h1>
          </div>

          {variant === 'type1' && (
            <div
              className={`hidden items-center gap-8 md:flex lg:gap-12 ${
                isWhiteNavbar ? 'nav-scrolled' : 'nav-transparent'
              }`}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-link ${
                    isActive(link.to)
                      ? isWhiteNavbar
                        ? 'active-scrolled'
                        : 'active-transparent'
                      : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          <div className="flex shrink-0 items-center gap-3">
            {variant === 'type1' ? (
              <>
                <Link to="/report" className="hidden shrink-0 md:block">
                  <button
                    className="report-btn rounded-xl px-7 py-2.5"
                    style={
                      isWhiteNavbar
                        ? { background: '#1e7a6b', color: 'white' }
                        : { background: 'white', color: '#1e7a6b' }
                    }
                  >
                    Scan Waste
                  </button>
                </Link>

                <button
                  type="button"
                  onClick={() => setLoginOpen(true)}
                  className="user-avatar hidden h-10 w-10 overflow-hidden rounded-full border border-white/20 md:flex"
                  aria-label="Open login modal"
                >
                  <img
                    src={
                      isWhiteNavbar
                        ? '/assets/icon/icon-user-2.png'
                        : '/assets/icon/Icon-User.png'
                    }
                    alt="User profile"
                    className="h-full w-full object-cover transition-all duration-300"
                  />
                </button>
              </>
            ) : (
              <Link to="/" className="hidden shrink-0 md:block">
                <button className="report-btn rounded-xl bg-white px-7 py-2.5 text-[#153C35]">
                  Home
                </button>
              </Link>
            )}

            <button
              type="button"
              className="relative z-[220] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full md:hidden"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label="Toggle menu"
            >
              <span className="flex flex-col items-center justify-center gap-[5px]">
                <span
                  className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${
                    isWhiteNavbar ? 'bg-gray-700' : 'bg-white'
                  } ${mobileOpen ? 'translate-y-[7px] rotate-45' : ''}`}
                />
                <span
                  className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${
                    isWhiteNavbar ? 'bg-gray-700' : 'bg-white'
                  } ${mobileOpen ? 'scale-x-0 opacity-0' : ''}`}
                />
                <span
                  className={`block h-[2px] rounded-full transition-all duration-300 ${
                    isWhiteNavbar ? 'bg-gray-700' : 'bg-white'
                  } ${
                    mobileOpen
                      ? 'w-6 -translate-y-[7px] -rotate-45'
                      : 'w-4 self-end'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          className={`absolute left-0 top-full z-[210] w-full origin-top transition-all duration-300 md:hidden ${
            mobileOpen
              ? 'pointer-events-auto scale-y-100 opacity-100'
              : 'pointer-events-none scale-y-95 opacity-0'
          }`}
        >
          <div className="flex max-h-[calc(100vh-72px)] flex-col gap-1 overflow-y-auto border-t border-gray-100 bg-white px-4 py-5 shadow-xl sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`mobile-link ${
                  isActive(link.to) ? 'active-mobile' : ''
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4">
              <Link
                to="/report"
                className="flex-1"
                onClick={() => setMobileOpen(false)}
              >
                <button className="w-full cursor-pointer rounded-xl border-none bg-[#1F7A6B] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#153C35]">
                  Scan Waste
                </button>
              </Link>

              <button
                type="button"
                className="user-avatar h-11 w-11 flex-none overflow-hidden rounded-full border border-gray-200"
                onClick={() => {
                  setMobileOpen(false)
                  setLoginOpen(true)
                }}
                aria-label="Open login modal"
              >
                <img
                  src="/assets/icon/icon-user-2.png"
                  alt="User profile"
                  className="h-full w-full object-cover"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {loginOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/55 px-4 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-[28px] bg-white px-8 py-9 shadow-2xl">
            <button
              type="button"
              onClick={() => setLoginOpen(false)}
              className="absolute right-6 top-5 text-2xl text-gray-400 transition hover:text-gray-700"
              aria-label="Close login modal"
            >
              ×
            </button>

            <h2 className="text-center text-2xl font-bold text-primary">
              Welcome to Eco-Sphere
            </h2>

            <form className="mt-7 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-primary">
                  Email
                </span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>

              <label className="block">
                <div className="mb-2 flex items-center justify-between">
                  <span className="block text-sm font-bold text-primary">
                    Password
                  </span>
                  <button
                    type="button"
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    Hide
                  </button>
                </div>

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>

              <button
                type="button"
                className="text-xs font-bold italic text-primary hover:underline"
              >
                Forgot Password?
              </button>

              <button
                type="button"
                onClick={() => {
                  loginUser()
                  setLoginOpen(false)
                  navigate('/profile')
                }}
                className="mt-2 w-full rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-primary-dark"
              >
                Sign In
              </button>
            </form>

            <div className="my-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-100" />
              <span className="text-xs italic text-gray-400">or</span>
              <div className="h-px flex-1 bg-gray-100" />
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z"
                  fill="#4285F4"
                />
                <path
                  d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z"
                  fill="#34A853"
                />
                <path
                  d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957273C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957273 13.0418L3.96409 10.71Z"
                  fill="#FBBC05"
                />
                <path
                  d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z"
                  fill="#EA4335"
                />
              </svg>

              Continue with Google
            </button>

            <p className="mt-6 text-center text-sm text-gray-500">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                className="font-bold text-primary hover:underline"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  )
}