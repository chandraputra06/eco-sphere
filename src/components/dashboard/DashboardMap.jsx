// src/components/dashboard/DashboardMap.jsx
import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPin, Phone, User, X, Loader2, PlayCircle, CheckCircle2 } from 'lucide-react'

const statusColor = (st) => (st === 'resolved' ? '#22C55E' : st === 'in_progress' ? '#F59E0B' : '#ef4444')

export default function DashboardMap({ reports = [], onUpdateStatus, busyId }) {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const layerRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [selected, setSelected] = useState(null)

  // init map once
  useEffect(() => {
    if (mapInstance.current || !mapRef.current) return
    const map = L.map(mapRef.current, { zoomControl: true }).setView([-8.67, 115.22], 11)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19,
    }).addTo(map)
    mapInstance.current = map
    setReady(true)
    return () => { map.remove(); mapInstance.current = null }
  }, [])

  // draw markers whenever reports change
  useEffect(() => {
    if (!ready || !mapInstance.current) return
    if (layerRef.current) mapInstance.current.removeLayer(layerRef.current)
    const group = L.layerGroup()
    const pts = []
    reports.forEach((r) => {
      if (r.lat == null || r.lng == null) return
      const marker = L.circleMarker([r.lat, r.lng], {
        radius: 10, fillColor: statusColor(r.status), color: '#fff', weight: 2, fillOpacity: 0.9,
      }).addTo(group)
      marker.on('click', () => setSelected(r))
      pts.push([r.lat, r.lng])
    })
    group.addTo(mapInstance.current)
    layerRef.current = group
    if (pts.length) {
      try { mapInstance.current.fitBounds(pts, { padding: [40, 40], maxZoom: 14 }) } catch { /* ignore */ }
    }
  }, [reports, ready])

  // keep the open panel in sync with fresh data
  useEffect(() => {
    if (!selected) return
    const fresh = reports.find((r) => r.id === selected.id)
    if (fresh && fresh.status !== selected.status) setSelected(fresh)
  }, [reports]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-sm" style={{ height: 540 }}>
      <div ref={mapRef} className="w-full h-full" />

      {selected && (
        <div className="absolute top-4 right-4 w-80 max-w-[calc(100%-2rem)] bg-white rounded-3xl shadow-xl border border-gray-100 p-5 z-[500] animate-slideInRight">
          <button onClick={() => setSelected(null)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"><X className="h-4 w-4" /></button>

          <div className="flex items-center gap-2 flex-wrap pr-6">
            <p className="font-semibold text-primary-dark">{selected.category || 'Waste report'}</p>
            {selected.volume && <span className="text-[11px] rounded-full bg-gray-100 text-gray-500 px-2 py-0.5 capitalize">{selected.volume}</span>}
          </div>
          <p className="text-xs text-gray-500 mt-2 flex items-start gap-1.5">
            <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" /> {selected.address || `${selected.lat}, ${selected.lng}`}
          </p>

          <div className="mt-4 rounded-2xl bg-bali-50 p-3">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Reporter</p>
            <p className="text-sm font-medium text-primary-dark flex items-center gap-2">
              <User className="h-3.5 w-3.5" /> {selected.reporter?.name || 'Citizen'}
            </p>
            {selected.reporter?.phone ? (
              <a href={`tel:${selected.reporter.phone}`} className="text-sm text-primary flex items-center gap-2 mt-1 hover:underline">
                <Phone className="h-3.5 w-3.5" /> {selected.reporter.phone}
              </a>
            ) : (
              <p className="text-xs text-gray-400 flex items-center gap-2 mt-1"><Phone className="h-3.5 w-3.5" /> No phone provided</p>
            )}
          </div>

          <div className="mt-4">
            {selected.status === 'claimed' && (
              <button onClick={() => onUpdateStatus(selected.id, 'in_progress')} disabled={busyId === selected.id}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-warning/90 to-warning text-white px-3 py-2.5 text-sm font-semibold disabled:opacity-60">
                {busyId === selected.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlayCircle className="h-4 w-4" />} Confirm this report
              </button>
            )}
            {selected.status === 'in_progress' && (
              <button onClick={() => onUpdateStatus(selected.id, 'resolved')} disabled={busyId === selected.id}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-success to-primary-light text-white px-3 py-2.5 text-sm font-semibold disabled:opacity-60">
                {busyId === selected.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />} Mark as resolved
              </button>
            )}
            {selected.status === 'resolved' && (
              <p className="text-sm font-semibold text-success flex items-center justify-center gap-1.5 py-2"><CheckCircle2 className="h-4 w-4" /> Resolved</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}