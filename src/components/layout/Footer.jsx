import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-12 border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 xl:px-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3 cursor-pointer">
              <img
                src="/assets/logo/Logo-Green.png"
                alt="Eco-Sphere Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-2xl font-bold text-primary tracking-tight">
                Eco-Sphere
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Community-based waste reporting platform to protect the beauty and cleanliness of our environment.
            </p>
            <div className="flex gap-3">
              {[
                { src: '/assets/icon/icon-instagram.png', alt: 'Instagram' },
                { src: '/assets/icon/icon-twitter.png', alt: 'Twitter' },
                { src: '/assets/icon/icon-yt.png', alt: 'YouTube' },
                { src: '/assets/icon/icon-media.png', alt: 'Website' },
              ].map((social) => (
                <a
                  key={social.alt}
                  href="#"
                  className="w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center hover:bg-primary group transition-all"
                >
                  <img
                    src={social.src}
                    alt={social.alt}
                    className="w-4 h-4 object-contain group-hover:brightness-0 group-hover:invert transition-all"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">
              Pages
            </h4>
            <ul className="flex flex-col gap-4 text-gray-400 text-sm font-medium">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/waste-map" className="hover:text-primary transition-colors">
                  Waste Map
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-primary transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/gamification" className="hover:text-primary transition-colors">
                  Gamification
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/report" className="hover:text-primary transition-colors">
                  Report Waste
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Start Contributing
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Together we keep the environment clean and sustainable for future generations.
            </p>
            <Link to="/report" className="inline-block">
              <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-bali-600 transition-all shadow-md w-full md:w-auto cursor-pointer">
                Report Now
              </button>
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-400">
          <p>Copyright © 2026 Eco-Sphere. All rights reserved.</p>
          <p className="text-xs">
            Inspired by <span className="italic font-medium">Tri Hita Karana</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
