const testimonials = [
  {
    img: '/assets/img/Bali-Anca.png',
    quote: '"Reporting waste is easy, and handling is fast. The surrounding environment has become much cleaner."',
    name: 'Anca Wikan Canggu',
  },
  {
    img: '/assets/img/Bali-Joey.png',
    quote: '"You can clean it yourself or report to officers. Besides helping the environment, I also earn points."',
    name: 'Januarta Joey Nusa Dua',
  },
]

const stats = [
  { value: '4,891+', label: 'Total Reports Submitted' },
  { value: '92%', label: 'Reports Resolved' },
  { value: '2.3 Tons', label: 'Waste Handled' },
  { value: '320+', label: 'Contributing Citizens' },
]

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-bali-50 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-36">
        <div className="text-center mb-12 reveal reveal-up">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
            From Those Who Take Action
          </h2>
          <p className="text-gray-500 text-md leading-relaxed">
            Experiences from those who help keep the environment clean.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`bg-white p-8 rounded-3xl shadow-xl border border-primary/10 flex items-center gap-6 group hover:shadow-2xl transition-all duration-300 reveal ${
                i === 0 ? 'reveal-left delay-100' : 'reveal-right delay-200'
              }`}
            >
              <div className="relative flex-none">
                <div className="w-24">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <p className="text-gray-600 italic mb-2 leading-relaxed">{t.quote}</p>
                <h4 className="font-bold text-gray-900">- {t.name}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center border-t border-primary/10 pt-16">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center reveal reveal-up delay-${(i + 1) * 100}`}
            >
              <span className="text-4xl md:text-5xl font-semibold text-primary mb-2">
                {s.value}
              </span>
              <p className="text-gray-500 font-normal">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
