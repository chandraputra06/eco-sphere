// src/pages/auth/Login.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import { useAuth, HOME_BY_ROLE } from '../../context/AuthContext'
import { IconMail, IconLock, IconEye, IconEyeOff, IconArrowRight } from './icons'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [welcome, setWelcome] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await login(email, password)
      setWelcome(user)
      setTimeout(() => navigate(HOME_BY_ROLE[user.role] || '/', { replace: true }), 1400)
    } catch (err) {
      setError(err.message || 'Failed to sign in')
      setLoading(false)
    }
  }

  if (welcome) {
    return (
      <AuthLayout>
        <div className="py-10 text-center animate-slideInRight">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light text-white shadow-sm">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-primary-dark">Welcome, {welcome.name}!</h2>
          <p className="mt-2 text-gray-500">Redirecting to your page…</p>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-primary-dark">Welcome, Heroes of Earth!</h2>
      <p className="mt-2 text-gray-500">Sign in to scan waste, manage reports, and collect points.</p>

      {error && (
        <div className="mt-6 rounded-xl border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">{error}</div>
      )}

      <form onSubmit={onSubmit} className="mt-6 space-y-5">
        <Field label="Email">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]"><IconMail /></span>
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com" autoComplete="email"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
          />
        </Field>

        <Field label="Password">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]"><IconLock /></span>
          <input
            type={show ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 6 characters" autoComplete="current-password"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-11 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
          />
          <button type="button" onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px] hover:text-primary" aria-label="Show password">
            {show ? <IconEyeOff /> : <IconEye />}
          </button>
        </Field>

        <div className="text-right">
          <Link to="/login" className="text-sm text-primary hover:underline">Forgot password?</Link>
        </div>

        <button
          type="submit" disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-white transition hover:bg-primary-dark disabled:opacity-60"
        >
          {loading ? 'Processing…' : <>Sign In <IconArrowRight /></>}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <Link to="/get-started" className="font-semibold text-primary hover:underline">Sign up for free</Link>
      </p>
    </AuthLayout>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</label>
      <div className="relative">{children}</div>
    </div>
  )
}