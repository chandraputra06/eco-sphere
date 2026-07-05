// src/pages/auth/RoleSelect.jsx
import { useNavigate, Link } from 'react-router-dom'
import { ROLES } from './roles'

export default function RoleSelect() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-bali-50 font-poppins px-6 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <Link to="/">
          <img src="/assets/logo/Logo-Green.png" alt="Eco-Sphere" className="mx-auto mb-5 h-12" />
        </Link>
        <h1 className="text-3xl font-bold text-primary-dark">Choose Your Role</h1>
        <p className="mt-2 text-gray-500">Determine how you want to contribute to protecting the environment with Eco-Sphere.</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ROLES.map(({ id, label, tagline, Icon }) => (
            <button
              key={id}
              onClick={() => navigate(`/register?role=${id}`)}
              className="group flex flex-col items-center rounded-2xl border border-transparent bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <span className="grid h-20 w-20 place-items-center rounded-full bg-bali-50 text-primary text-[34px] transition group-hover:bg-primary group-hover:text-white">
                <Icon />
              </span>
              <span className="mt-5 text-lg font-semibold text-primary-dark">{label}</span>
              <span className="mt-1 text-sm text-gray-500">{tagline}</span>
            </button>
          ))}
        </div>

        <p className="mt-12 text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-primary hover:underline">Sign in here</Link>
        </p>
      </div>
    </div>
  )
}