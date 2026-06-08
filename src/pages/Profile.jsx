import { useReveal } from '../hooks/useReveal'

export default function Profile() {
  useReveal()
  return (
    <div className="font-poppins bg-bali-50 text-gray-900 min-h-screen pt-24">
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-6 reveal reveal-up">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20 flex-none">
                <img src="/assets/icon/Icon-User.png" alt="User" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">User Name</h1>
                <p className="text-gray-500">user@email.com</p>
                <span className="inline-block mt-1 text-xs bg-primary text-white px-3 py-1 rounded-full">Eco Warrior</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-gray-100 pt-6">
              {[
                { val: '8', label: 'Reports' },
                { val: '1,240', label: 'Points' },
                { val: '2', label: 'Badges' },
                { val: '92%', label: 'Resolved' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-bold text-primary">{s.val}</p>
                  <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
