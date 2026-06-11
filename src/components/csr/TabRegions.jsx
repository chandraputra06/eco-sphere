import { useEffect, useRef, useState } from 'react'
import { MapPin, Building2 } from 'lucide-react'
import { SITE_LOCATIONS, STATUS_META, REGION_REPORTS } from './csrData'

export default function TabRegions() {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const [selected, setSelected] = useState(null)

  const counts = SITE_LOCATIONS.reduce((acc, s) => { acc[s.status] = (acc[s.status] || 0) + 1; return acc }, {})

  useEffect(() => {
    if (mapInstance.current) return
    const start = () => initMap()
    if (!window.L) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.onload = start
      document.head.appendChild(script)
    } else {
      start()
    }
    return () => {
      if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null }
    }
  }, [])

  const initMap = () => {
    const L = window.L
    if (!mapRef.current || mapInstance.current) return
    const map = L.map(mapRef.current, { center: [-8.62, 115.18], zoom: 10, minZoom: 9, zoomControl: false })
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { attribution: '© CartoDB' }).addTo(map)
    L.control.zoom({ position: 'bottomright' }).addTo(map)
    SITE_LOCATIONS.forEach((s) => {
      const color = STATUS_META[s.status].color
      const marker = L.circleMarker([s.lat, s.lng], {
        radius: 9, fillColor: color, color: '#fff', weight: 2, opacity: 1, fillOpacity: 0.9,
      }).addTo(map)
      marker.on('click', () => setSelected(s))
    })
    mapInstance.current = map
  }

  const maxReports = Math.max(...REGION_REPORTS.map((r) => r.count))

  return (
    <div className="space-y-8">
      <section>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Site Distribution Map</p>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* map */}
          <div className="xl:col-span-2 bg-white rounded-2xl p-2 border border-gray-100 shadow-sm overflow-hidden">
            <div ref={mapRef} className="w-full h-[460px] rounded-xl z-0" />
          </div>

          {/* summary + detail */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="font-bold text-primary-dark mb-4">Summary</h2>
              <div className="space-y-3">
                {Object.entries(STATUS_META).map(([key, meta]) => (
                  <div key={key} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-gray-600">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: meta.color }} />{meta.label}
                    </span>
                    <span className="font-bold" style={{ color: meta.color }}>{counts[key] || 0}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-3">
                  <span className="text-gray-500">Total sites</span>
                  <span className="font-bold text-primary-dark">{SITE_LOCATIONS.length}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm min-h-[180px]">
              <h2 className="font-bold text-primary-dark mb-3">Site Detail</h2>
              {selected ? (
                <div className="animate-slideInRight">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl text-white" style={{ background: STATUS_META[selected.status].color }}>
                      <Building2 className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">{selected.name}</p>
                      <p className="text-xs" style={{ color: STATUS_META[selected.status].color }}>{STATUS_META[selected.status].label}</p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-center">
                    <div className="rounded-xl bg-bali-50 p-3"><p className="text-lg font-bold text-primary-dark">{selected.tons}t</p><p className="text-[11px] text-gray-500">Diverted/wk</p></div>
                    <div className="rounded-xl bg-bali-50 p-3"><p className="text-lg font-bold text-primary-dark">{selected.lat.toFixed(2)}</p><p className="text-[11px] text-gray-500">Latitude</p></div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-400 flex items-center gap-2"><MapPin className="h-4 w-4" /> Click a marker on the map to see site detail.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* reports per region */}
      <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="font-bold text-primary-dark mb-5">Sites per Region</h2>
        <div className="space-y-4">
          {REGION_REPORTS.map((r) => (
            <div key={r.region}>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-gray-600">{r.region}</span>
                <span className="font-semibold text-primary-dark">{r.count}</span>
              </div>
              <div className="h-6 rounded-lg bg-gray-100 overflow-hidden">
                <div className="h-full rounded-lg bg-gradient-to-r from-primary to-primary-light" style={{ width: `${(r.count / maxReports) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}