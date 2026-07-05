// src/pages/Profile.jsx
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Camera, LogOut, Loader2, CheckCircle2, Trophy, ChevronLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useReveal } from '../hooks/useReveal'

const ROLE_LABEL = {
  citizen: 'Environmental Fighter',
  collector: 'Collector',
  manager: 'Partner Organization',
  csr: 'CSR Partner',
  admin: 'Administrator',
}

// Read a file, center-crop to a square and resize to keep the base64 small.
function fileToResizedDataUrl(file, size = 256) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const min = Math.min(img.width, img.height)
        const sx = (img.width - min) / 2
        const sy = (img.height - min) / 2
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, sx, sy, min, min, 0, 0, size, size)
        resolve(canvas.toDataURL('image/jpeg', 0.85))
      }
      img.onerror = reject
      img.src = e.target.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-gray-500">{label}</span>
      <input
        {...props}
        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 disabled:opacity-60"
      />
    </label>
  )
}

export default function Profile() {
  useReveal()
  const navigate = useNavigate()
  const { user, updateUser, logout } = useAuth()

  const [name, setName] = useState(user?.name || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [avatar, setAvatar] = useState(user?.avatar || '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef(null)

  const initial = (user?.name?.[0] || 'U').toUpperCase()

  const onFile = async (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) { setError('The file must be an image.'); return }
    try {
      const dataUrl = await fileToResizedDataUrl(file)
      setAvatar(dataUrl)
      setSaved(false)
      setError('')
    } catch {
      setError('Could not read that image.')
    }
  }

  const onSave = async () => {
    setSaving(true); setError(''); setSaved(false)
    try {
      await updateUser({ name, phone: phone || null, avatar: avatar || null })
      setSaved(true)
    } catch (err) {
      setError(err?.message || 'Failed to save changes.')
    } finally {
      setSaving(false)
    }
  }

  const onLogout = () => { logout(); navigate('/') }

  return (
    <div className="min-h-screen bg-bali-50 pt-24 font-poppins text-gray-900">
      <section className="container mx-auto px-6 py-10 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Link to="/" className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-primary">
            <ChevronLeft className="h-4 w-4" /> Back to Home
          </Link>

          <div className="reveal reveal-up">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Profile Settings</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500">
              Manage your personal information and profile photo.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-7 lg:grid-cols-[300px_1fr]">
            <aside className="space-y-6">
              {/* Avatar card */}
              <div className="reveal reveal-left rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-bali-50 bg-gradient-to-br from-primary to-primary-light text-2xl font-bold text-white shadow-sm">
                    {avatar ? <img src={avatar} alt="Profile" className="h-full w-full object-cover" /> : initial}
                  </div>
                  <h2 className="mt-5 text-lg font-bold text-gray-900">{user?.name || 'User'}</h2>
                  <p className="mt-1 text-sm text-gray-500">{ROLE_LABEL[user?.role] || user?.role}</p>

                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-subtle px-5 py-3 text-sm font-bold text-primary transition hover:bg-bali-100"
                  >
                    <Camera className="h-4 w-4" /> Change Photo
                  </button>
                  <p className="mt-2 text-[11px] text-gray-400">Square image works best · saved when you press Save.</p>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
                </div>
              </div>

              {/* Points card */}
              <div className="reveal reveal-left relative overflow-hidden rounded-3xl bg-primary p-6 text-white shadow-sm">
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full border-[6px] border-white/10" />
                <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full border-[4px] border-white/10" />
                <p className="text-sm font-semibold text-white/80 flex items-center gap-1.5"><Trophy className="h-4 w-4" /> Total Points</p>
                <h3 className="mt-1 text-4xl font-bold tracking-tight">{(user?.points ?? 0).toLocaleString()}</h3>
                <div className="my-5 h-px bg-white/20" />
                <button onClick={onLogout} className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold transition hover:bg-white/25">
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </div>
            </aside>

            {/* Form */}
            <section className="reveal reveal-right rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
              <h2 className="text-lg font-bold text-gray-900">Account Information</h2>
              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <Field label="Email (cannot be changed)" type="email" value={user?.email || ''} disabled />
                <Field label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08xxxxxxxxxx" />
              </div>

              {error && <p className="mt-6 rounded-2xl border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">{error}</p>}
              {saved && (
                <p className="mt-6 rounded-2xl border border-success/30 bg-success/5 px-4 py-3 text-sm text-success flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" /> Profile updated.
                </p>
              )}

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={onSave}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-bold text-white shadow-md transition hover:bg-primary-dark disabled:opacity-60"
                >
                  {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</> : 'Save Changes'}
                </button>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}