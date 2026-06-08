import { Link } from 'react-router-dom'

const steps = [
  {
    icon: '/assets/icon/icon-home-4.png',
    title: 'Upload Photo',
    desc: 'Take a photo of waste directly from your camera or upload from your device.',
    delay: 'delay-100',
  },
  {
    icon: '/assets/icon/icon-home-5.png',
    title: 'Auto GPS Detection',
    desc: 'Your location is automatically detected via GPS, so the report is mapped accurately.',
    delay: 'delay-300',
  },
  {
    icon: '/assets/icon/icon-home-6.png',
    title: 'Choose Action',
    desc: 'Decide whether to clean it yourself or send a report for authorities to handle.',
    delay: 'delay-500',
  },
  {
    icon: '/assets/icon/icon-home-7.png',
    title: 'Submit & Track',
    desc: 'Submit the report and monitor its handling status in real-time until resolved.',
    delay: 'delay-700',
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-24 mt-12 relative z-20 bg-bali-50 rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.08)] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-36 text-center">
        <div className="max-w-3xl mx-auto mb-20 reveal reveal-up">
          <h2 className="text-5xl font-semibold text-gray-900 mb-6">How Waste Reporting Works</h2>
          <p className="text-gray-500 text-md leading-relaxed">
            Simple steps to report waste and help keep the environment clean in real-time.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 relative mb-20">
          <div className="hidden md:block absolute top-10 left-[10%] right-[10%] border-t-2 border-primary/20 border-dashed z-0 reveal delay-700" />

          {steps.map((step, i) => (
            <div
              key={i}
              className={`flex-1 flex flex-col items-center group relative z-10 reveal reveal-left ${step.delay}`}
            >
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-[#1E7A6B] rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={step.icon}
                    alt={step.title}
                    className="w-10 h-10 object-contain brightness-0 invert"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100 font-bold text-gray-900">
                  {i + 1}
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">{step.desc}</p>
            </div>
          ))}
        </div>

        <Link to="/report">
          <button className="bg-white text-primary border border-primary/10 px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-[#1e7a6b] hover:text-white transition-all duration-300 transform hover:-translate-y-1 reveal reveal-up delay-900">
            Start Reporting Now →
          </button>
        </Link>
      </div>
    </section>
  )
}
