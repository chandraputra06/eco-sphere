import { Link } from 'react-router-dom'
import { useHeroSlider } from '../../hooks/useHeroSlider'

const heroImages = [
  { src: '/assets/img/img-home-1.jpg', alt: 'Environment 1' },
  { src: '/assets/img/bali-tercemar-1.jpg', alt: 'Environment 2' },
 
]

export default function HeroSection() {
  const { current, setCurrent } = useHeroSlider(heroImages)

  return (
    <section className="relative bg-gray-950 min-h-[95vh] overflow-hidden text-white rounded-b-[40px] shadow-2xl">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          {heroImages.map((img, i) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                i === current ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 flex flex-col min-h-[95vh]">
        <div className="grow flex flex-col justify-center max-w-4xl mt-20">
          <h2 className="reveal reveal-left font-animal text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 tracking-wide drop-shadow-2xl">
            Protecting the Planet Through{' '}
            <br />
            Smart Waste Management
          </h2>

          <p className="reveal reveal-up delay-200 text-gray-200 text-base md:text-lg font-light mb-10 max-w-xl leading-relaxed opacity-90">
            Inspired by <span className="font-semibold italic">Tri Hita Karana</span>, uniting
            people, nature, and technology to restore environmental balance.
          </p>

          <div className="reveal reveal-up delay-400 flex flex-wrap gap-4">
            <Link to="/report">
                <button className="group relative overflow-hidden bg-[#1E7A6B] text-primary px-8 py-3 rounded-full text-base font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(255,255,255,0.3)] active:scale-95 cursor-pointer">
                <span className="relative z-10">Report Waste</span>
                <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              </button>
            </Link>

            <Link to="/waste-map">
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-base font-semibold backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 hover:bg-white hover:text-[#1E7A6B] hover:shadow-[0_10px_25px_rgba(255,255,255,0.2)] active:scale-95 cursor-pointer">
                View Waste Map
              </button>
            </Link>
          </div>
        </div>

        {/* Dots */}
        <div className="pb-10 flex justify-center items-center gap-3">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-500 ease-in-out cursor-pointer ${
                i === current
                  ? 'w-8 h-1.5 bg-[#1F7A6B] shadow-[0_0_10px_rgba(31,122,107,0.5)]'
                  : 'w-2 h-1.5 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
