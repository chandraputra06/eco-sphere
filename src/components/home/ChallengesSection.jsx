import { useHeroSlider } from '../../hooks/useHeroSlider'

const impactImages = [
  '/assets/img/bali-tercemar-1.jpg',
  '/assets/img/bali-tercemar-2.jpg',
  '/assets/img/bali-tercemar-3.jpg',
]

const stats = [
  {
    icon: '/assets/icon/Icon-home-1.png',
    value: '3,800',
    unit: 'tons/day',
    desc: 'Daily waste output continues to rise due to tourism and urban growth, overwhelming local disposal systems.',
  },
  {
    icon: '/assets/icon/Icon-home-2.png',
    value: '48%',
    unit: null,
    desc: 'Nearly half of all waste still ends up in open dumping sites or leaks into surrounding ecosystems.',
  },
  {
    icon: '/assets/icon/Icon-home-3.png',
    value: '33',
    unit: 'tons',
    desc: 'Plastic waste entering the ocean annually, threatening marine ecosystems and coastal tourism.',
  },
]

const issues = [
  {
    title: 'Overtourism Overload',
    desc: 'Millions of visitors arrive each year, but waste processing capacity cannot keep up with the demand.',
  },
  {
    title: 'Sacred Sites Impacted',
    desc: 'Rivers passing through sacred areas are becoming polluted, disturbing both sanctity and surrounding ecosystems.',
  },
  {
    title: 'Health & Economic Impact',
    desc: 'Contaminated water and illegal dumping affect agriculture, fisheries, and community health.',
  },
  {
    title: 'Ecological Balance Disrupted',
    desc: 'Environmental degradation also affects the natural balance that is a crucial part of local cultural life.',
  },
]

export default function ChallengesSection() {
  const { current, setCurrent } = useHeroSlider(impactImages, 4000)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-40">
        <div className="text-center max-w-3xl mx-auto mb-12 reveal reveal-up">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
            Environmental Challenges
          </h2>
          <p className="text-gray-500 text-md leading-relaxed">
            Behind the beauty of nature lies a growing waste crisis. The impact is spreading to
            ecosystems, sacred places, public health, and the balance of community life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-20">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition text-center reveal reveal-up"
              style={{ animationDelay: `${(i + 1) * 200}ms` }}
            >
              <div className="w-16 h-16 bg-bali-50 rounded-xl flex items-center justify-center mx-auto mb-6">
                <img src={stat.icon} alt="stat" className="h-8 w-8" />
              </div>
              <div className="flex items-baseline justify-center gap-1 mb-3">
                <span className="text-4xl font-bold text-gray-900">{stat.value}</span>
                {stat.unit && (
                  <span className="text-gray-500 font-medium text-sm">{stat.unit}</span>
                )}
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Impact slider */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group reveal reveal-left aspect-[4/3]">
            <div className="absolute inset-0">
              {impactImages.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    i === current ? 'opacity-100' : 'opacity-0'
                  }`}
                  alt={`Impact ${i + 1}`}
                />
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1e7a6b]/90 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-6 left-6 z-20">
              <span className="bg-white text-[#1e7a6b] px-5 py-2 rounded-xl font-semibold text-xs tracking-wider shadow-lg">
                Environmental Impact Zone
              </span>
            </div>
            <div className="absolute bottom-8 right-6 z-20 flex gap-2">
              {impactImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-500 cursor-pointer ${
                    i === current
                      ? 'w-8 h-1.5 bg-[#ffffff] shadow-[0_0_15px_rgba(31,122,107,0.8)]'
                      : 'w-2 h-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Issues list */}
          <div className="space-y-8">
            {issues.map((issue, i) => (
              <div
                key={i}
                className="flex gap-6 border-l-4 border-primary pl-6 py-1 reveal reveal-right"
                style={{ animationDelay: `${(i + 1) * 100}ms` }}
              >
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{issue.title}</h4>
                  <p className="text-gray-500 leading-relaxed">{issue.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}