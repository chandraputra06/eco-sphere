export default function GovernmentDashboard() {
  return (
    <div className="font-poppins bg-bali-50 text-gray-900 min-h-screen pt-24">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Government Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Open Reports', value: '391', status: 'warning' },
            { label: 'In Progress', value: '124', status: 'info' },
            { label: 'Completed This Month', value: '1,240', status: 'success' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <p className="text-3xl font-bold text-primary mb-1">{s.value}</p>
              <p className="text-gray-500 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
