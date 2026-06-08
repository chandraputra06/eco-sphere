import { useState, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

export default function WasteReport() {
  useReveal()
  const [preview, setPreview] = useState(null)
  const [volume, setVolume] = useState('')
  const fileRef = useRef()

  const handleFile = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target.result)
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  return (
    <div className="font-poppins bg-bali-50 text-gray-900">
      {/* Hero */}
      <section className="relative bg-gray-950 min-h-[92vh] overflow-hidden text-white rounded-b-[40px] shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/img/pelaporan/hero-pelaporan-img.png"
            alt="Waste Report"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-black/30" />
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-12 flex flex-col min-h-[92vh]">
          <div className="grow flex items-center justify-center pt-28 pb-16">
            <div className="max-w-3xl text-center">
              <p className="font-animal text-6xl md:text-8xl lg:text-9xl text-white/95 leading-tight mb-6 reveal reveal-up delay-100">
                Scan Waste
              </p>
              <p className="text-gray-200 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed opacity-90 reveal reveal-up delay-200">
                Upload a waste photo, enter the location manually, get AI classification, and choose the best action.
              </p>
              <div className="mt-10 flex flex-wrap gap-4 justify-center reveal reveal-up delay-300">
                {[
                  { val: '4,891', sub: 'Total Reports' },
                  { val: '+320', sub: 'Active Citizens' },
                  { val: '92%', sub: 'Resolved' },
                ].map((s) => (
                  <div
                    key={s.sub}
                    className="min-w-[140px] rounded-2xl border border-white/35 bg-white/10 px-6 py-4 backdrop-blur-sm shadow-lg"
                  >
                    <p className="text-3xl font-bold text-white">{s.val}</p>
                    <p className="text-sm text-white/80 mt-1">{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-white reveal reveal-up delay-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12 reveal reveal-up delay-200">
            <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-3">
              Waste Report Form
            </h2>
            <p className="text-gray-500 text-base">
              Fill in the following information to report waste
            </p>
          </div>

          <div className="max-w-5xl mx-auto rounded-3xl border border-primary/20 shadow-sm overflow-hidden bg-white reveal reveal-up delay-300">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Photo Upload */}
              <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-primary/15">
                <h3 className="text-2xl font-bold text-gray-900 mb-5">Waste Photo</h3>
                <div
                  className="rounded-2xl border-2 border-dashed border-primary/50 bg-bali-50 min-h-80 flex flex-col items-center justify-center text-center px-6 transition-all duration-300 cursor-pointer hover:bg-bali-100/40 hover:border-primary"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileRef.current?.click()}
                >
                  {preview ? (
                    <img
                      src={preview}
                      className="w-full h-full object-cover rounded-2xl"
                      alt="Preview"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4">
                        <img
                          src="/assets/icon/icon-upload.png"
                          alt="Upload"
                          className="h-8 w-8 object-contain"
                        />
                      </div>
                      <p className="text-base font-semibold text-gray-800">
                        Click or drag photo here
                      </p>
                      <p className="mt-1 text-sm text-gray-400">PNG, JPG max 10MB</p>
                    </div>
                  )}
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="bg-primary text-white px-7 py-2.5 rounded-full text-sm font-semibold hover:bg-bali-700 transition-all duration-300 shadow-md cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Choose Photo
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) => handleFile(e.target.files[0])}
                  />
                </div>
              </div>

              {/* Report Details */}
              <div className="p-6 lg:p-8 flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full h-11 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition"
                    placeholder="Enter waste location"
                  />
                  <p className="mt-1.5 text-xs text-gray-400">
                    Enter location manually at the point of discovery
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Waste Category
                  </label>
                  <input
                    type="text"
                    className="w-full h-11 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition"
                    placeholder="E.g.: Plastic, Organic, Hazardous"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Volume Estimate
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Small', 'Medium', 'Large'].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setVolume(v)}
                        className={`h-11 rounded-2xl border text-sm font-medium cursor-pointer transition-all duration-300 ${
                          volume === v
                            ? 'border-primary text-primary bg-bali-50'
                            : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary hover:bg-bali-50'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Notes{' '}
                    <span className="font-normal text-gray-400">(optional)</span>
                  </label>
                  <textarea
                    rows={4}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none transition"
                    placeholder="Describe the waste condition in more detail..."
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-bali-50 px-6 py-4 border-t border-primary/15">
              <div className="flex items-center gap-2.5 text-sm text-gray-500">
                <img
                  src="/assets/icon/icon-information.png"
                  alt="Info"
                  className="w-5 h-5 shrink-0"
                />
                <p>Data encrypted & privacy protected</p>
              </div>
              <button
                type="button"
                className="bg-primary text-white flex items-center justify-center gap-2 px-7 py-2.5 rounded-full text-sm font-semibold hover:bg-bali-700 transition-all duration-300 shadow-lg cursor-pointer hover:shadow-xl hover:-translate-y-0.5"
              >
                Submit & AI Analysis
                <img src="/assets/icon/icon-right-arrow.png" alt="Arrow" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
