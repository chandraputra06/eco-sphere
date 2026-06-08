import { useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'

export default function ContactUs() {
  useReveal()

  return (
    <div className="font-poppins bg-bali-50 text-gray-900 overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[72vh] overflow-hidden rounded-b-[36px] bg-gray-950 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/img/bali-tercemar-1.jpg"
            alt="Contact Us"
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/20 to-black/55" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 flex flex-col items-center text-center">
          <h1 className="font-animal text-5xl md:text-8xl lg:text-9xl text-white leading-tight mb-6 reveal reveal-up delay-100">
            Contact Us
          </h1>
          <p className="text-white/65 text-sm md:text-base max-w-md leading-relaxed mb-10 reveal reveal-up delay-200">
            Submit your questions or issues. The Eco-Sphere team will respond as quickly as possible.
          </p>
          <div className="flex flex-wrap justify-center gap-3 reveal reveal-up delay-300">
            {[
              { label: '08.00–17.00', sub: 'Service hours' },
              { label: '< 24 hours', sub: 'Estimated response' },
              { label: 'Email & Phone', sub: 'Support channels' },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/8 border border-white/14 rounded-2xl px-5 py-3.5 backdrop-blur-sm text-center min-w-[130px]"
              >
                <p className="text-lg font-semibold text-white">{item.label}</p>
                <p className="text-xs text-white/55 mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-5 items-start">
          {/* Form Card */}
          <div className="bg-white border border-gray-200/70 rounded-3xl shadow-sm p-7 md:p-9 reveal reveal-left delay-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">Send a message</h2>
            <p className="text-sm text-gray-500 mb-7 leading-relaxed">
              Fill in the details completely so our team can help you faster and more accurately.
            </p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-gray-600 mb-1.5">Name</label>
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full h-11 rounded-xl border border-gray-200 bg-slate-50 px-4 text-sm text-gray-800 outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-gray-600 mb-1.5">Email</label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="w-full h-11 rounded-xl border border-gray-200 bg-slate-50 px-4 text-sm text-gray-800 outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-medium text-gray-600 mb-1.5">Subject</label>
                <input
                  type="text"
                  placeholder="Write your message subject"
                  className="w-full h-11 rounded-xl border border-gray-200 bg-slate-50 px-4 text-sm text-gray-800 outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-gray-600 mb-1.5">Message</label>
                <textarea
                  rows={5}
                  placeholder="Write your message here..."
                  className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-gray-800 outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none transition-all leading-relaxed"
                />
              </div>
              <div className="flex items-center justify-between gap-4 flex-wrap pt-1">
                <p className="text-[12px] text-gray-400 leading-relaxed max-w-[280px]">
                  Make sure the email you enter is active so we can reply.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-7 py-3 text-sm font-semibold hover:bg-bali-600 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                >
                  Send message
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {/* Info Card */}
            <div className="bg-white border border-gray-200/70 rounded-3xl shadow-sm p-6 md:p-7 reveal reveal-right delay-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Service information</h2>
              <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                You can also reach us through the following channels.
              </p>
              <div className="space-y-3">
                {[
                  {
                    icon: (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    ),
                    label: 'Email',
                    value: 'support@eco-sphere.id',
                  },
                  {
                    icon: (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    ),
                    label: 'Support number',
                    value: '+62 812 3456 7890',
                  },
                  {
                    icon: (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    ),
                    label: 'Operating hours',
                    value: 'Mon – Fri, 08.00 – 17.00',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 bg-bali-50 border border-primary/10 rounded-2xl px-4 py-3.5"
                  >
                    <div className="w-9 h-9 rounded-xl bg-bali-100 border border-bali-200 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        {item.icon}
                      </svg>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400">{item.label}</p>
                      <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Card */}
            <div className="bg-white border border-gray-200/70 rounded-3xl shadow-sm p-6 md:p-7 reveal reveal-right delay-300">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Quick help</h2>
              <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                Most frequently asked topics by users.
              </p>
              <div className="space-y-2">
                {[
                  { title: 'Account issues', desc: 'Login, profile data, or password changes' },
                  { title: 'Reporting issues', desc: 'Report not sent, status not changing, or verification problems' },
                  { title: 'General questions', desc: 'Feature information, rewards, or Eco-Sphere services' },
                ].map((faq) => (
                  <div
                    key={faq.title}
                    className="bg-bali-50 border border-primary/10 hover:border-primary/25 hover:bg-bali-100 rounded-2xl p-4 transition-colors cursor-default"
                  >
                    <p className="text-sm font-semibold text-gray-900">{faq.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{faq.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-[#10685B] rounded-3xl p-5 flex items-center justify-between gap-4 reveal reveal-right delay-400">
              <div>
                <p className="text-sm font-semibold text-white">Chat via WhatsApp</p>
                <p className="text-xs text-white/65 mt-0.5">Faster response during business hours</p>
              </div>
              <a
                href="https://wa.me/6281246662579"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25d366] text-white rounded-full px-4 py-2.5 text-xs font-semibold hover:opacity-85 transition cursor-pointer whitespace-nowrap"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.528 5.845L.057 23.428a.75.75 0 00.921.921l5.571-1.476A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.699 9.699 0 01-4.94-1.352l-.354-.211-3.305.876.877-3.317-.218-.362A9.699 9.699 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z" />
                </svg>
                Chat now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
