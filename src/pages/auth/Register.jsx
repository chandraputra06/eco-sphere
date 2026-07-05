// src/pages/auth/Register.jsx
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import { useAuth, HOME_BY_ROLE } from '../../context/AuthContext'
import { ROLES, roleById } from './roles'
import { IconMail, IconLock, IconEye, IconEyeOff, IconArrowRight } from './icons'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const initialRole = roleById(params.get('role')) ? params.get('role') : 'citizen'

  const [role, setRole] = useState(initialRole)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await register({ name, email, password, phone, role })
      navigate(HOME_BY_ROLE[user.role] || '/', { replace: true })
    } catch (err) {
      setError(err.message || 'Gagal mendaftar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-primary-dark">Create Account</h2>
      <p className="mt-2 text-gray-500">Choose your role, fill in the details, and start contributing.</p>

      {/* Pemilih role (chips) */}
      <div className="mt-6 flex flex-wrap gap-2">
        {ROLES.map(({ id, label, Icon }) => (
          <button
            key={id} type="button" onClick={() => setRole(id)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition ${
              role === id
                ? 'border-primary bg-primary text-white'
                : 'border-gray-200 bg-white text-gray-600 hover:border-primary/40'
            }`}
          >
            <span className="text-[16px]"><Icon /></span> {label}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-gray-400">{roleById(role)?.tagline}</p>

      {error && (
        <div className="mt-5 rounded-xl border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">{error}</div>
      )}

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <Field label="Name">
          <input
            type="text" required value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Your name or organization"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
          />
        </Field>

        <Field label="Phone Number (Optional)">
          <input
            type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
            placeholder="08xxxxxxxxxx" autoComplete="tel"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
          />
        </Field>

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
            type={show ? 'text' : 'password'} required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 8 characters" autoComplete="new-password"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-11 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
          />
          <button type="button" onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px] hover:text-primary" aria-label="Tampilkan sandi">
            {show ? <IconEyeOff /> : <IconEye />}
          </button>
        </Field>

        <button
          type="submit" disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-white transition hover:bg-primary-dark disabled:opacity-60"
        >
          {loading ? 'Processing…' : <>Register Now <IconArrowRight /></>}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-primary hover:underline">Sign in here</Link>
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