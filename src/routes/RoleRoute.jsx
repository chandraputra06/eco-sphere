// src/routes/RoleRoute.jsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { HOME_BY_ROLE } from '../context/AuthContext'

// Pakai: <RoleRoute allow={['csr','admin']}><CSRDashboard/></RoleRoute>
export default function RoleRoute({ allow = [], children }) {
  const { user, loading, isAuthenticated } = useAuth()
  if (loading) return <div className="grid min-h-screen place-items-center text-primary">Memuat…</div>
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!allow.includes(user.role)) return <Navigate to={HOME_BY_ROLE[user.role] || '/'} replace />
  return children
}
