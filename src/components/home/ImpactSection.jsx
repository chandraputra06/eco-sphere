const impacts = [
  {
    num: 1,
    title: 'Cleaner Environment',
    desc: 'Reports you submit help reduce waste around you and prevent buildup that can damage the ecosystem.',
    variant: 'primary',
  },
  {
    num: 2,
    title: 'Faster Response',
    desc: 'Authorities can immediately see the location and details of a report, enabling quicker and more targeted action.',
    variant: 'white',
  },
  {
    num: 3,
    title: 'Earn Points & Badges',
    desc: 'Every action you take earns points and badges as recognition for your contribution to environmental care.',
    variant: 'primary',
  },
  {
    num: 4,
    title: 'Community Impact',
    desc: 'Your contribution doesn\'t just clean one spot — it helps maintain cleanliness and environmental harmony together.',
    variant: 'white',
  },
]

export default function ImpactSection() {
  return (
    <section className="py-24 bg-white relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-36 text-center">
        <div className="max-w-3xl mx-auto mb-20 relative reveal reveal-up">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
            Every Action Has an Impact
          </h2>
          <p className="text-gray-500 text-md leading-relaxed max-w-xl mx-auto">
            Simple steps to report waste and help keep the environment clean in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {impacts.map((item, i) => (
            <div
              key={i}
              className={`relative p-8 rounded-tl-[60px] rounded-br-[60px] shadow-lg flex flex-col items-center justify-center group hover:-translate-y-2 transition-all duration-300 min-h-72 reveal reveal-up delay-${(i + 1) * 100} ${
                item.variant === 'primary'
                  ? 'bg-[#1E7A6B] text-white border border-primary/5'
                  : 'bg-white text-gray-900 border border-gray-100'
              }`}
            >
              <div
                className={`absolute -top-7 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center font-bold text-3xl shadow-lg border-4 border-white z-10 flex-none ${
                  item.variant === 'primary' ? 'bg-[#1E7A6B] text-white' : 'bg-[#1E7A6B] text-white'
                }`}
              >
                {item.num}
              </div>
              <h3
                className={`text-xl font-bold mb-4 mt-8 ${
                  item.variant === 'white' ? 'text-[#1E7A6B]' : ''
                }`}
              >
                {item.title}
              </h3>
              <div
                className={`w-24 border-t-2 mb-6 ${
                  item.variant === 'primary' ? 'border-white' : 'border-primary'
                }`}
              />
              <p
                className={`text-sm leading-relaxed max-w-[256px] ${
                  item.variant === 'primary' ? 'text-bali-50/80' : 'text-gray-500'
                }`}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
