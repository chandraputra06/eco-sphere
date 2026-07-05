// src/services/api.js
// Klien API Eco-Sphere. Tambahkan di frontend .env.local:
//   VITE_API_BASE=http://localhost:4000/api/v1
// (VITE_GEMINI_API_KEY sudah tidak perlu di frontend — kunci ada di backend.)

const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api/v1'
const TOKENS = 'eco_sphere_tokens'

function getTokens() {
  try { return JSON.parse(localStorage.getItem(TOKENS)) || {} } catch { return {} }
}
function setTokens(t) { localStorage.setItem(TOKENS, JSON.stringify(t)) }
function clearTokens() { localStorage.removeItem(TOKENS) }

async function request(path, { method = 'GET', body, auth = true, _retry } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  const { accessToken, refreshToken } = getTokens()
  if (auth && accessToken) headers.Authorization = `Bearer ${accessToken}`

  const res = await fetch(`${BASE}${path}`, {
    method, headers, body: body ? JSON.stringify(body) : undefined,
  })

  if (res.status === 401 && auth && refreshToken && !_retry) {
    const ok = await refresh(refreshToken)
    if (ok) return request(path, { method, body, auth, _retry: true })
  }

  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data?.error?.message || `Gagal memproses (${res.status})`)
  return data
}

async function refresh(refreshToken) {
  try {
    const res = await fetch(`${BASE}/auth/refresh`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })
    if (!res.ok) { clearTokens(); return false }
    const data = await res.json()
    setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken })
    return true
  } catch { clearTokens(); return false }
}

export const api = {
  async login(email, password) {
    const data = await request('/auth/login', { method: 'POST', auth: false, body: { email, password } })
    setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken })
    return data.user
  },
  async register(payload) {
    const data = await request('/auth/register', { method: 'POST', auth: false, body: payload })
    setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken })
    return data.user
  },
  me: () => request('/auth/me'),
  logout: () => clearTokens(),
  isLoggedIn: () => Boolean(getTokens().accessToken),

  // dipakai nanti untuk fitur lain
  classify: (dataUrl) => request('/ai/classify', { method: 'POST', body: { image: dataUrl } }),
  createReport: (payload) => request('/reports', { method: 'POST', body: payload }),
  claimPoints: (payload) => request('/leaderboard/claim', { method: 'POST', body: payload }),
  leaderboard: () => request('/leaderboard'),
  myOrgReports: () => request('/organizations/me/reports'),
  updateOrgReport: (id, status) => request(`/organizations/me/reports/${id}`, { method: 'PATCH', body: { status } }),
  adminFlaggedReports: () => request('/admin/reports/flagged'),
  moderateReport: (id, decision) => request(`/admin/reports/${id}/moderate`, { method: 'PATCH', body: { decision } }),
  verifyOrg: (id) => request(`/admin/orgs/${id}/verify`, { method: 'POST' }),
  myOrgStats: () => request('/organizations/me/stats'),
  updateMe: (payload) => request('/auth/me', { method: 'PATCH', body: payload }),

  listOrgs: (type) => request(`/organizations${type ? `?type=${type}` : ''}`),
  nearestCollectors: ({ lat, lng, category, ewaste }) =>
    request(`/collectors/nearest?lat=${lat}&lng=${lng}${category ? `&category=${encodeURIComponent(category)}` : ''}${ewaste ? '&ewaste=1' : ''}`),
}
