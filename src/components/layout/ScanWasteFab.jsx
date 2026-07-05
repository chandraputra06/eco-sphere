// src/components/layout/ScanWasteFab.jsx
import { Link } from 'react-router-dom'

// Tombol melayang "Scan Waste" di kanan bawah (seperti contoh PawSphere).
export default function ScanWasteFab() {
  return (
    <Link
      to="/report"
      aria-label="Scan Waste"
      className="group fixed bottom-6 right-6 z-[300] flex items-center gap-2 rounded-full bg-[#1F7A6B] px-5 py-4 text-white shadow-lg shadow-[#1F7A6B]/30 transition-all duration-300 hover:bg-[#153C35] hover:shadow-xl active:scale-95 sm:bottom-8 sm:right-8"
    >
      {/* ikon kamera/scan */}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
        <circle cx="12" cy="13" r="3.2" />
      </svg>
      <span className="pr-1 text-sm font-bold">Scan Waste</span>
    </Link>
  )
}