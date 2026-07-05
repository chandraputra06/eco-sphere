// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

const AuthContext = createContext(null)

// Ke mana user diarahkan setelah login, berdasarkan role.
// Ganti path collector/manager saat halaman-nya sudah dibuat.
export const HOME_BY_ROLE = {
  citizen: '/report',
  collector: '/dashboard',
  manager: '/dashboard',
  csr: '/csr-dashboard',
  admin: '/admin',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!api.isLoggedIn()) { setLoading(false); return }
    api.me()
      .then(setUser)
      .catch(() => api.logout())
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const u = await api.login(email, password)
    setUser(u)
    return u
  }
  const register = async (payload) => {
    const u = await api.register(payload)
    setUser(u)
    return u
  }
  const logout = () => { api.logout(); setUser(null) }

  const updateUser = async (patch) => {
    const u = await api.updateMe(patch)
    setUser(u)
    return u
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth harus dipakai di dalam <AuthProvider>')
  return ctx
}
