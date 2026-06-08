import React, { useEffect, useRef, useState } from 'react';
import { MapPin, X, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

import { reports, tpaData, bankSampahData } from '../data/mapData';

const PRIMARY = '#1F7A6B';
const DARK = '#153C35';

export default function WasteMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [activeLayer, setActiveLayer] = useState({ laporan: true, heatmap: false, tpa: false, banksampah: false });
  const [selectedReport, setSelectedReport] = useState(null);
  const layersRef = useRef({});

  useEffect(() => {
    if (mapInstanceRef.current) return;
    if (!window.L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => initMap();
      document.head.appendChild(script);
      const heatScript = document.createElement('script');
      heatScript.src = 'https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js';
      document.head.appendChild(heatScript);
    } else {
      initMap();
    }
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const initMap = () => {
    const L = window.L;
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [-8.70, 115.18],
      zoom: 11,
      minZoom: 9,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '© CartoDB'
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);
    mapInstanceRef.current = map;

    // Reports layer
    const laporanGroup = L.layerGroup();
    reports.forEach(r => {
      const color = r.status === 'Critical' ? '#ef4444' : r.status === 'Warning' ? '#f59e0b' : '#1F7A6B';
      const marker = L.circleMarker([r.lat, r.lng], {
        radius: 10, fillColor: color, color: 'white', weight: 2, fillOpacity: 0.9
      }).addTo(laporanGroup);
      marker.on('click', () => setSelectedReport(r));
    });
    laporanGroup.addTo(map);
    layersRef.current.laporan = laporanGroup;

    // Heatmap layer
    const heatData = reports.map(r => [r.lat, r.lng, r.status === 'Critical' ? 1 : 0.5]);
    let heatLayer;
    const tryHeat = () => {
      if (window.L && window.L.heatLayer) {
        heatLayer = window.L.heatLayer(heatData, { radius: 35, blur: 20, maxZoom: 14 });
        layersRef.current.heatmap = heatLayer;
      } else {
        setTimeout(tryHeat, 500);
      }
    };
    tryHeat();

    // TPA layer
    const tpaGroup = L.layerGroup();
    tpaData.forEach(t => {
      const color = t.capacity === 'overload' ? '#ef4444' : t.capacity === 'medium' ? '#f59e0b' : '#22c55e';
      L.marker([t.lat, t.lng], {
        icon: L.divIcon({
          className: '',
          html: `<div style="background:${color};width:28px;height:28px;border-radius:8px;border:2px solid white;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:900;color:white;box-shadow:0 2px 8px rgba(0,0,0,0.3)">TPA</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        })
      }).bindPopup(`<b>${t.name}</b><br>${t.region}<br>Capacity: ${t.percent}%`).addTo(tpaGroup);
    });
    layersRef.current.tpa = tpaGroup;

    // Bank Sampah layer
    const bankGroup = L.layerGroup();
    bankSampahData.forEach(b => {
      L.marker([b.lat, b.lng], {
        icon: L.divIcon({
          className: '',
          html: `<div style="background:#3b82f6;width:28px;height:28px;border-radius:50%;border:2px solid white;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:900;color:white;box-shadow:0 2px 8px rgba(0,0,0,0.3)">BS</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        })
      }).bindPopup(`<b>${b.name}</b><br>${b.address}<br>${b.hours}`).addTo(bankGroup);
    });
    layersRef.current.banksampah = bankGroup;
  };

  const toggleLayer = (key) => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const newState = { ...activeLayer, [key]: !activeLayer[key] };
    setActiveLayer(newState);

    const layer = layersRef.current[key];
    if (!layer) return;
    if (newState[key]) {
      layer.addTo(map);
    } else {
      map.removeLayer(layer);
    }
  };

  const findNearest = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      const map = mapInstanceRef.current;
      if (map) map.setView([latitude, longitude], 13);
    });
  };

  const statusColor = (s) => s === 'Critical' ? '#ef4444' : s === 'Warning' ? '#f59e0b' : '#1F7A6B';
  const statusBg = (s) => s === 'Critical' ? '#fef2f2' : s === 'Warning' ? '#fffbeb' : '#F0F7F5';

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      <main style={{ position: 'relative', flex: 1, overflow: 'hidden', marginTop: 76 }}>
        {/* Map */}
        <div ref={mapRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

        {/* Top-left Controls */}
        <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 10, pointerEvents: 'none' }}>

          {/* Live indicator */}
          <div style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', padding: '10px 20px', borderRadius: 24, border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 4px 20px rgba(21,60,53,0.08)', pointerEvents: 'auto' }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: DARK, display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
              <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8 }}>
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: DARK, opacity: 0.7, animation: 'ping 1.5s infinite' }} />
                <span style={{ position: 'relative', width: 8, height: 8, borderRadius: '50%', background: DARK, display: 'inline-flex' }} />
              </span>
              Waste Spread Monitoring
            </p>
          </div>

          {/* Legend */}
          <div style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', padding: '12px 18px', borderRadius: 22, border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 4px 20px rgba(21,60,53,0.08)', pointerEvents: 'auto' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 20px' }}>
              {[['#ef4444', 'Critical'], ['#f59e0b', 'Warning'], [PRIMARY, 'Resolved'], ['#3b82f6', 'Waste Bank']].map(([c, l]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                  <span style={{ fontSize: 11, color: '#6b7280', fontWeight: 500 }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Layer Toggles */}
          <div style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', padding: '12px 16px', borderRadius: 22, border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 4px 20px rgba(21,60,53,0.08)', pointerEvents: 'auto' }}>
            <p style={{ fontSize: 9, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8, marginTop: 0 }}>Show Layers</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {[['laporan', 'Reports'], ['heatmap', 'Heatmap'], ['tpa', 'Landfills'], ['banksampah', 'Waste Banks']].map(([k, l]) => (
                <button key={k} className={`layer-btn ${activeLayer[k] ? 'active' : ''}`} onClick={() => toggleLayer(k)}>{l}</button>
              ))}
            </div>
          </div>

          {/* Find Nearest */}
          <button onClick={findNearest} style={{ background: DARK, color: 'white', border: 'none', padding: '12px 18px', borderRadius: 18, fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 16px rgba(21,60,53,0.3)', fontFamily: 'Poppins', pointerEvents: 'auto', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = PRIMARY}
            onMouseLeave={e => e.currentTarget.style.background = DARK}>
            <MapPin size={16} />
            Find Nearest Waste Bank
          </button>
        </div>

        {/* Detail Panel */}
        <div style={{
          position: 'absolute', top: 16, right: 16, bottom: 60,
          width: selectedReport ? 380 : 0,
          background: 'white', borderRadius: 32, boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
          zIndex: 20, overflow: 'hidden', transition: 'width 0.4s cubic-bezier(0.22,1,0.36,1)',
          display: 'flex', flexDirection: 'column',
        }}>
          {selectedReport && (
            <>
              <button onClick={() => setSelectedReport(null)}
                style={{ position: 'absolute', top: 16, right: 16, zIndex: 30, background: '#f9fafb', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={16} />
              </button>
              <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
                <img src={selectedReport.img} alt={selectedReport.title}
                  style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 20, marginBottom: 20 }} />

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: statusBg(selectedReport.status), border: `1px solid ${statusColor(selectedReport.status)}30`, borderRadius: 8, padding: '4px 12px', marginBottom: 12 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: statusColor(selectedReport.status) }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: statusColor(selectedReport.status) }}>{selectedReport.status}</span>
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: '0 0 6px' }}>{selectedReport.title}</h3>
                <p style={{ fontSize: 12, color: '#9ca3af', margin: '0 0 16px' }}>
                  Reported by <strong style={{ color: '#374151' }}>{selectedReport.reporter}</strong> · {selectedReport.time}
                </p>
                <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.7, margin: '0 0 24px' }}>{selectedReport.desc}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <button style={{ width: '100%', padding: '12px', background: PRIMARY, color: 'white', border: 'none', borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Poppins' }}>
                    Confirm This Report
                  </button>
                  <button style={{ width: '100%', padding: '12px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Poppins', color: '#374151' }}>
                    Get Directions
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <style>{`
        @keyframes ping {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
}