import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const profileStats = [
  { label: 'Completed Actions', value: '12' },
  { label: 'Active Badges', value: '3', highlight: true },
]

function InputField({ label, className = '', ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-xs font-semibold text-gray-500">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
      />
    </label>
  )
}

export default function Profile() {
  useReveal()

  return (
    <div className="min-h-screen bg-gray-50 pt-24 font-poppins text-gray-900">
      <section className="container mx-auto px-6 py-10 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/"
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-primary"
          >
            <span className="text-lg leading-none">‹</span>
            <span>Back to Home</span>
          </Link>

          <div className="reveal reveal-up">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Profile Settings
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500">
              Manage your personal information, account security, and track your rank and rewards.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-7 lg:grid-cols-[300px_1fr]">
            <aside className="space-y-6">
              <div className="reveal reveal-left rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-bali-50 bg-white shadow-sm">
                    <img
                      src="/assets/icon/Icon-User.png"
                      alt="User profile"
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  </div>

                  <h2 className="mt-5 text-lg font-bold text-gray-900">
                    Tut Anca
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Environmental Fighter
                  </p>

                  <button
                    type="button"
                    className="mt-5 w-full rounded-full bg-primary-subtle px-5 py-3 text-sm font-bold text-primary transition hover:bg-bali-100"
                  >
                    Change Photo
                  </button>
                </div>
              </div>

              <div className="reveal reveal-left relative overflow-hidden rounded-3xl bg-primary p-6 text-white shadow-sm">
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full border-[6px] border-white/10" />
                <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full border-[4px] border-white/10" />

                <p className="text-sm font-semibold text-white/80">
                  Total Points
                </p>
                <h3 className="mt-1 text-4xl font-bold tracking-tight">
                  1,250
                </h3>

                <div className="my-5 h-px bg-white/20" />

                <div className="grid grid-cols-2 gap-4">
                  {profileStats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-xs font-semibold text-white/70">
                        {stat.label}
                      </p>
                      <p
                        className={`mt-1 text-xl font-bold ${
                          stat.highlight ? 'text-warning' : 'text-white'
                        }`}
                      >
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <section className="reveal reveal-right rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
              <form className="space-y-10">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Account Information
                  </h2>

                  <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <InputField
                      label="Username"
                      type="text"
                      defaultValue="Tut Anca"
                    />

                    <InputField
                      label="Current Email"
                      type="email"
                      defaultValue="emailkamu@gmail.com"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Security
                  </h2>

                  <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <InputField
                      label="Current Password"
                      type="password"
                      placeholder="Enter your current password"
                    />

                    <div className="hidden md:block" />

                    <InputField
                      label="New Password"
                      type="password"
                      placeholder="Create a new password"
                    />

                    <InputField
                      label="Confirm New Password"
                      type="password"
                      placeholder="Re-enter your new password"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="rounded-full bg-primary px-8 py-3 text-sm font-bold text-white shadow-md transition hover:bg-primary-dark"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}