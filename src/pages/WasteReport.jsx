import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Upload, MapPin, Navigation, Loader2, RefreshCw,
  Map as MapIcon, HandHeart, Recycle, Sprout, Building2, ArrowRight,
  CheckCircle2, AlertTriangle, Leaf, Lightbulb, ChevronRight, ImageOff,
  ScanSearch, Search, Activity, Clock, User, CircleDot, Camera, X, Circle,
  Trophy, Coins, TrendingUp, Phone, ExternalLink,
} from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { useReveal } from '../hooks/useReveal'
import { bankSampahData, reports } from '../data/mapData'
import { csrChallenges } from '../data/gameData'

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

// Haversine distance in km between two coordinates
function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// Maps an AI category onto the material keywords used in bankSampahData.accepts.
// Order matters: more specific keys are checked before the generic "organic"
// so that "Plastic / Inorganic" is not captured by the "organic" substring.
const CATEGORY_RULES = [
  { keys: ['b3', 'hazard'], materials: ['Electronics', 'Metal', 'Used cooking oil'] },
  { keys: ['inorganic', 'plastic'], materials: ['Plastic', 'Metal', 'Glass', 'Paper', 'Bottles', 'Cardboard', 'Electronics'] },
  { keys: ['organic'], materials: ['Organic'] },
]

function materialsForCategory(category = '') {
  const c = category.toLowerCase()
  const rule = CATEGORY_RULES.find((r) => r.keys.some((k) => c.includes(k)))
  return rule ? rule.materials : []
}

// Returns up to `limit` waste banks nearest to coords, optionally matching category
function nearestBankSampah(coords, category, limit = 2) {
  const materials = materialsForCategory(category)
  let list = bankSampahData.map((b) => ({
    ...b,
    distance: coords ? distanceKm(coords.lat, coords.lng, b.lat, b.lng) : null,
  }))

  if (materials.length) {
    const matched = list.filter((b) =>
      b.accepts.some((a) => materials.includes(a)),
    )
    if (matched.length) list = matched
  }

  if (coords) list.sort((a, b) => a.distance - b.distance)
  return list.slice(0, limit)
}

// Self-processing tips per category
function processingTips(category = '') {
  const c = category.toLowerCase()
  if (c.includes('b3') || c.includes('hazard')) {
    return {
      icon: AlertTriangle,
      title: 'Hazardous Waste Handling',
      steps: [
        'Do not mix it with regular household waste.',
        'Store batteries, electronics, or bulbs in a separate, closed container.',
        'Drop it off at a hazardous-waste collection point or nearby e-waste collector.',
        'Avoid burning it or pouring it into drains.',
      ],
    }
  }
  if (c.includes('inorganic') || c.includes('plastic')) {
    return {
      icon: Recycle,
      title: 'DIY Recycling',
      steps: [
        'Rinse and dry packaging so it does not smell.',
        'Sort by type: plastic, paper, metal, glass.',
        'Flatten bottles and cardboard to save space.',
        'Collect enough before dropping it off at a waste bank.',
      ],
    }
  }
  // organic (default)
  return {
    icon: Sprout,
    title: 'Simple Home Composting',
    steps: [
      'Use an old bucket and punch holes in the bottom for airflow.',
      'Chop vegetable, fruit, and leaf scraps into small pieces.',
      'Layer with soil or finished compost, and stir every 3 days.',
      'In 3-4 weeks the compost is ready for your home plants.',
    ],
  }
}

const KM = (d) => (d == null ? '' : d < 1 ? `${Math.round(d * 1000)} m` : `${d.toFixed(1)} km`)

// Visual style per report status (Active Reports section)
function statusStyle(status = '') {
  const s = status.toLowerCase()
  if (s === 'critical') return { dot: 'text-error', chip: 'bg-error/10 text-error border-error/20', label: 'Critical' }
  if (s === 'warning') return { dot: 'text-warning', chip: 'bg-warning/10 text-warning border-warning/20', label: 'Warning' }
  return { dot: 'text-success', chip: 'bg-success/10 text-success border-success/20', label: 'Resolved' }
}

// Points awarded per action (drives the submit pop-up)
function pointsFor(action, selfChoice) {
  if (action === 'community') return 80
  if (action === 'self') return selfChoice === 'bank' ? 60 : 40
  return 30
}

/* ------------------------------------------------------------------ */
/*  Step indicator (glass pills)                                       */
/* ------------------------------------------------------------------ */

function Stepper({ current }) {
  const steps = ['Photo', 'Location', 'AI Analysis', 'Action']
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-3 flex-wrap">
      {steps.map((label, i) => {
        const idx = i + 1
        const done = current > idx
        const active = current === idx
        return (
          <div key={label} className="flex items-center gap-1.5 sm:gap-3">
            <div
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-300 ${
                active
                  ? 'glass ring-glow'
                  : done
                  ? 'bg-primary/10 border border-primary/20'
                  : 'bg-white/40 border border-white/50'
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold transition-all ${
                  done || active
                    ? 'bg-gradient-to-br from-primary to-primary-light text-white shadow-sm'
                    : 'bg-white/70 text-gray-400'
                }`}
              >
                {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : idx}
              </span>
              <span
                className={`text-xs font-medium ${
                  active ? 'text-primary-dark' : done ? 'text-primary' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </div>
            {idx < steps.length && (
              <span className={`hidden sm:block h-px w-5 ${done ? 'bg-primary/40' : 'bg-gray-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function WasteAnalysis() {
  useReveal()
  const navigate = useNavigate()

  // Upload
  const [preview, setPreview] = useState(null)
  const fileRef = useRef()

  // Camera
  const [cameraOn, setCameraOn] = useState(false)
  const [cameraError, setCameraError] = useState('')
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  // Location
  const [location, setLocation] = useState('')
  const [coords, setCoords] = useState(null)
  const [locStatus, setLocStatus] = useState('idle') // idle | loading | done | denied

  // AI analysis
  const [isWaste, setIsWaste] = useState(true)
  const [category, setCategory] = useState('')
  const [volume, setVolume] = useState('')
  const [aiNote, setAiNote] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [hasAnalyzed, setHasAnalyzed] = useState(false)
  const [aiError, setAiError] = useState('')
  const [scanProgress, setScanProgress] = useState(0)
  const scanTimer = useRef(null)

  // Chosen action (Req. 5)
  const [selectedAction, setSelectedAction] = useState('')
  const [selfChoice, setSelfChoice] = useState('') // '' | 'bank' | 'diy'
  const [submitted, setSubmitted] = useState(false)

  // Points pop-up (animation only; leaderboard stays static)
  const [showPoints, setShowPoints] = useState(false)
  const [earnedPoints, setEarnedPoints] = useState(0)
  const [displayPoints, setDisplayPoints] = useState(0)

  const chooseAction = (action) => {
    setSelectedAction(action)
    setSelfChoice('')
    setSubmitted(false)
  }

  const isBig = volume.toLowerCase().includes('large')
  // Only show recommendations + submit when the image is actual waste
  const showActions = hasAnalyzed && isWaste

  /* ----- Location: auto-generate nearest on mount (Req. 3) -------- */
  const detectLocation = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setLocStatus('denied')
      setLocation('Automatic location is not supported by this browser. Please enter an address manually.')
      return
    }
    setLocStatus('loading')
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        setCoords({ lat, lng })
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
            { headers: { 'Accept-Language': 'en' } },
          )
          const data = await res.json()
          setLocation(data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`)
        } catch {
          setLocation(`${lat.toFixed(5)}, ${lng.toFixed(5)}`)
        } finally {
          setLocStatus('done')
        }
      },
      () => {
        setLocStatus('denied')
        setLocation('')
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  }, [])

  useEffect(() => {
    detectLocation()
  }, [detectLocation])

  // Clean up the progress interval and camera stream on unmount
  useEffect(() => () => {
    if (scanTimer.current) clearInterval(scanTimer.current)
    if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop())
  }, [])

  // Count-up animation for the points pop-up
  useEffect(() => {
    if (!showPoints) return
    setDisplayPoints(0)
    const start = performance.now()
    const duration = 900
    let raf
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setDisplayPoints(Math.round(eased * earnedPoints))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [showPoints, earnedPoints])

  /* ----- Reset analysis-related state ----------------------------- */
  const resetAnalysis = () => {
    setHasAnalyzed(false)
    setIsWaste(true)
    setCategory('')
    setVolume('')
    setAiNote('')
    setSelectedAction('')
    setSelfChoice('')
    setSubmitted(false)
    setScanProgress(0)
  }

  /* ----- Upload (Req. 2) ------------------------------------------ */
  const handleFile = (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setAiError('The file must be an image (PNG or JPG).')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target.result)
      setAiError('')
      resetAnalysis()
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    handleFile(e.dataTransfer.files?.[0])
  }

  /* ----- Camera capture ------------------------------------------- */
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
    if (videoRef.current) videoRef.current.srcObject = null
    setCameraOn(false)
  }, [])

  const startCamera = async () => {
    setCameraError('')
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError('Your browser does not support camera access. Please upload a photo instead.')
      return
    }
    try {
      // Prefer the rear camera on phones; fall back to any camera.
      let stream
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } },
          audio: false,
        })
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      }
      streamRef.current = stream
      setCameraOn(true)
      // attach after the <video> has mounted
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play().catch(() => {})
        }
      })
    } catch (err) {
      console.error('Camera error:', err)
      if (err?.name === 'NotAllowedError' || err?.name === 'SecurityError') {
        setCameraError('Camera permission was denied. Allow it in your browser, or upload a photo instead.')
      } else if (err?.name === 'NotFoundError') {
        setCameraError('No camera was found on this device. Please upload a photo instead.')
      } else {
        setCameraError('Could not start the camera. Note: camera access requires a secure (https) connection.')
      }
    }
  }

  const capturePhoto = () => {
    const video = videoRef.current
    if (!video || !video.videoWidth) return
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92)
    stopCamera()
    setPreview(dataUrl)
    setAiError('')
    resetAnalysis()
  }

  /* ----- AI analysis (Req. 4) ------------------------------------- */
  const handleAnalyzeAI = async () => {
    if (!preview) {
      setAiError('Please upload a photo of the waste first.')
      return
    }
    setIsAnalyzing(true)
    setAiError('')

    // Animate an indeterminate progress readout (eases toward ~95%, never finishing
    // on its own) so the scanner feels responsive while we await the API.
    setScanProgress(0)
    if (scanTimer.current) clearInterval(scanTimer.current)
    scanTimer.current = setInterval(() => {
      setScanProgress((p) => (p >= 95 ? 95 : p + Math.max(1, Math.round((95 - p) * 0.08))))
    }, 180)

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      if (!apiKey) {
        throw new Error('API key is not available. Add VITE_GEMINI_API_KEY to your .env file and restart the dev server.')
      }

      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

      const mimeType = preview.substring(preview.indexOf(':') + 1, preview.indexOf(';'))
      const base64Data = preview.split(',')[1]

      const prompt = `
        You are an environmental expert. Analyze this image.
        Reply with ONLY valid JSON, no other text, in exactly this shape:
        {
          "isWaste": true | false,
          "category": "Organic" | "Plastic / Inorganic" | "B3 / Hazardous" | null,
          "volume": "Small" | "Large" | null,
          "note": "one short sentence in English"
        }

        Rules:
        - Set "isWaste" to true ONLY if the image shows real, physical discarded waste/trash/litter.
        - If the image is NOT actual waste (for example: an educational diagram, an illustration, a chart, a screenshot, a logo, a person, a landscape, food that is still good), set "isWaste" to false, set "category" and "volume" to null, and in "note" explain briefly what it is and, if printed, which waste type it could fall under. Example: "This image is educational material, not waste, which if printed could be classified as inorganic paper waste."
        - When "isWaste" is true, fill "category" and "volume".
        - Volume rules: "Small" = individual waste one person can clear quickly (e.g. a bottle, a food wrapper). "Large" = a pile of waste that is overflowing or needs many people/tools to clean up.
      `

      const result = await model.generateContent([
        prompt,
        { inlineData: { data: base64Data, mimeType } },
      ])
      const text = result.response.text()
      const match = text.match(/\{[\s\S]*\}/)
      if (!match) throw new Error('The AI did not return valid JSON. Please try another photo.')

      const data = JSON.parse(match[0])
      const waste = data.isWaste !== false
      setIsWaste(waste)
      setCategory(waste ? (data.category || 'Unknown') : '')
      setVolume(waste ? (data.volume || 'Small') : '')
      setAiNote(data.note || '')
      setSelectedAction('')
      setSubmitted(false)
      setHasAnalyzed(true)
    } catch (err) {
      console.error('AI error:', err)
      const raw = (err?.message || '').toString()
      const status = err?.status ?? err?.code
      const lower = raw.toLowerCase()

      const isRateLimited =
        status === 429 ||
        lower.includes('429') ||
        lower.includes('quota') ||
        lower.includes('rate limit') ||
        lower.includes('exceeded')
      const isAuthError =
        status === 401 || status === 403 ||
        lower.includes('api key') || lower.includes('permission') || lower.includes('unauthorized')

      if (isRateLimited) {
        // Pull "retry in 58s" / retryDelay: "58s" if the API included one
        const m = raw.match(/retry[^0-9]{0,12}(\d+)(?:\.\d+)?\s*s/i)
        const wait = m ? `about ${Math.ceil(Number(m[1]))} second(s)` : 'a little while'
        setAiError(
          `The AI usage limit has been reached for now. This is a limit on the Gemini API key, not your photo. Please try again in ${wait}. (The free tier allows a limited number of requests per day.)`,
        )
      } else if (isAuthError) {
        setAiError('The AI service rejected the request (invalid or missing API key). Please check VITE_GEMINI_API_KEY in your .env file.')
      } else {
        setAiError(raw || 'Something went wrong during analysis. Please try again.')
      }
    } finally {
      if (scanTimer.current) {
        clearInterval(scanTimer.current)
        scanTimer.current = null
      }
      setScanProgress(100)
      setIsAnalyzing(false)
    }
  }

  /* ----- Derived recommendations ---------------------------------- */
  const recommendedBanks = showActions && !isBig ? nearestBankSampah(coords, category, 2) : []
  const tips = showActions && !isBig ? processingTips(category) : null
  const TipIcon = tips?.icon

  // Active reports = anything not yet resolved (Critical + Warning), newest-feel first
  const activeReports = reports
    .filter((r) => r.status.toLowerCase() !== 'resolved')
    .slice(0, 6)

  /* ----- Current step for the stepper ----------------------------- */
  // Step 4 is only reached when the image is verified as actual waste.
  const currentStep = !preview
    ? 1
    : !location
    ? 2
    : !hasAnalyzed || !isWaste
    ? 3
    : 4

  const categoryStyle = (() => {
    const c = category.toLowerCase()
    if (c.includes('b3') || c.includes('hazard')) return { Icon: AlertTriangle, tint: 'text-error', grad: 'from-error/80 to-error' }
    if (c.includes('inorganic') || c.includes('plastic')) return { Icon: Recycle, tint: 'text-secondary', grad: 'from-secondary/80 to-info' }
    if (c.includes('organic')) return { Icon: Leaf, tint: 'text-success', grad: 'from-success/80 to-primary-light' }
    return { Icon: Recycle, tint: 'text-secondary', grad: 'from-secondary/80 to-info' }
  })()

  /* ---------------------------------------------------------------- */

  return (
    <div className="font-poppins text-gray-900">
      {/* ============================ HERO ============================ */}
      <section className="relative bg-primary-dark min-h-[80vh] overflow-hidden text-white rounded-b-[44px] shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/img/pelaporan/hero-pelaporan-img.png"
            alt="Scan Waste"
            className="w-full h-full object-cover opacity-60"
          />
          {/* layered toska gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/90 via-primary-dark/55 to-primary/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-12 flex flex-col min-h-[80vh]">
          <div className="grow flex items-center justify-center pt-28 pb-16">
            <div className="max-w-3xl text-center">
              <p className="font-animal text-6xl md:text-8xl lg:text-9xl text-white leading-tight mt-6 mb-6 reveal reveal-up delay-100 drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
                Scan Waste
              </p>
              <p className="text-bali-50/90 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed reveal reveal-up delay-200">
                Upload a photo of waste, let the nearest location be detected
                automatically, then have our AI identify its category and volume
                to suggest the best action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ FORM ============================ */}
      <section className="bg-bali-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-10 reveal reveal-up delay-200">
            <h2 className="text-3xl md:text-5xl font-semibold text-primary-dark mb-3 tracking-tight">
              Scan Waste
            </h2>
            <p className="text-gray-500 text-base">
              A few short steps to find the most suitable way to handle it.
            </p>
          </div>

          {/* Stepper */}
          <div className="max-w-3xl mx-auto mb-10 reveal reveal-up delay-300">
            <Stepper current={currentStep} />
          </div>

          {/* MAIN PANEL */}
          <div className="bg-white max-w-5xl mx-auto rounded-[32px] overflow-hidden border border-gray-200/80 shadow-[0_12px_40px_rgba(21,60,53,0.08)] reveal reveal-up delay-300">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* ----------- LEFT: Upload (Req. 2) ----------- */}
              <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-200/80">
                <h3 className="text-xl font-bold text-primary-dark mb-1 flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light text-white text-xs font-bold shadow-sm">1</span>
                  Waste Photo
                </h3>
                <p className="text-sm text-gray-500 mb-5 ml-9">Take or upload a clear photo.</p>

                <div
                  className={`group relative rounded-3xl border-2 ${
                    isAnalyzing || cameraOn
                      ? 'border-solid border-primary/40 bg-primary-dark'
                      : 'border-dashed border-gray-300 bg-gray-50 hover:bg-bali-50 hover:border-primary/50 cursor-pointer'
                  } min-h-80 flex flex-col items-center justify-center text-center px-6 transition-all duration-300 overflow-hidden`}
                  onDrop={isAnalyzing || cameraOn ? undefined : handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={isAnalyzing || cameraOn ? undefined : () => fileRef.current?.click()}
                >
                  {cameraOn ? (
                    /* ---------- LIVE CAMERA ---------- */
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {/* framing brackets */}
                      <div className="scan-frame">
                        <span className="c-tl" /><span className="c-tr" />
                        <span className="c-bl" /><span className="c-br" />
                      </div>
                      {/* close */}
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); stopCamera() }}
                        className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full glass-dark text-white hover:bg-black/50 transition"
                        aria-label="Close camera"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      {/* capture */}
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); capturePhoto() }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg ring-4 ring-white/40 hover:scale-105 active:scale-95 transition"
                        aria-label="Capture photo"
                      >
                        <span className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                          <Circle className="h-6 w-6 text-white" fill="currentColor" />
                        </span>
                      </button>
                      <span className="absolute top-3 left-3 z-10 glass-dark text-white text-xs font-medium px-3 py-1.5 rounded-full">
                        Point at the waste, then capture
                      </span>
                    </>
                  ) : preview ? (
                    <>
                      <img
                        src={preview}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                          isAnalyzing ? 'scale-105 brightness-90' : ''
                        }`}
                        alt="Waste preview"
                      />

                      {/* ---- AI SCANNER OVERLAY (while analyzing) ---- */}
                      {isAnalyzing && (
                        <>
                          <div className="absolute inset-0 bg-primary-dark/35" />
                          <div className="scan-grid" />
                          <div className="scan-frame">
                            <span className="c-tl" /><span className="c-tr" />
                            <span className="c-bl" /><span className="c-br" />
                          </div>
                          <div className="scan-line" />

                          {/* status pill */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                            <span className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-2 text-white text-sm font-medium shadow-lg">
                              <Loader2 className="h-4 w-4 animate-spin text-emerald-300" />
                              Analyzing waste...
                            </span>
                          </div>

                          {/* bottom progress card (like the reference) */}
                          <div className="absolute bottom-3 left-3 right-3 z-10 glass-dark rounded-2xl px-4 py-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="flex items-center gap-2 text-xs font-medium text-white/90">
                                <Search className="h-3.5 w-3.5 text-emerald-300" />
                                Detecting category &amp; volume
                              </span>
                              <span className="text-xs font-bold text-white tabular-nums">{scanProgress}%</span>
                            </div>
                            <div className="scan-progress-track">
                              <div className="scan-progress-fill" style={{ width: `${scanProgress}%` }} />
                            </div>
                          </div>
                        </>
                      )}

                      {/* hover "replace" hint (only when idle) */}
                      {!isAnalyzing && (
                        <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/45 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition glass-dark text-white text-sm font-semibold flex items-center gap-2 px-4 py-2 rounded-full">
                            <RefreshCw className="h-4 w-4" /> Replace photo
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-primary-light/15 border border-white/60 flex items-center justify-center shadow-sm mb-4">
                        <Upload className="h-7 w-7 text-primary" />
                      </div>
                      <p className="text-base font-semibold text-gray-800">Click or drag a photo here</p>
                      <p className="mt-1 text-sm text-gray-400">PNG or JPG, max 10MB</p>
                    </div>
                  )}
                </div>

                {cameraError && (
                  <p className="mt-3 text-xs text-error bg-error/10 border border-error/20 rounded-xl px-3 py-2">
                    {cameraError}
                  </p>
                )}

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={isAnalyzing || cameraOn}
                    className="lift bg-gradient-to-r from-primary to-primary-light text-white px-5 py-3 rounded-2xl text-sm font-semibold shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    <Upload className="h-4 w-4" />
                    {preview ? 'Replace' : 'Choose Photo'}
                  </button>
                  <button
                    type="button"
                    onClick={cameraOn ? stopCamera : startCamera}
                    disabled={isAnalyzing}
                    className="lift border-2 border-primary/30 bg-white text-primary px-5 py-3 rounded-2xl text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 hover:bg-bali-50 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    <Camera className="h-4 w-4" />
                    {cameraOn ? 'Close Camera' : 'Use Camera'}
                  </button>
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />
              </div>

              {/* ----------- RIGHT: Location + AI ----------- */}
              <div className="p-6 lg:p-8 flex flex-col gap-6">
                {/* Location (Req. 3) */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="flex items-center gap-2.5 text-sm font-bold text-primary-dark">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light text-white text-xs font-bold shadow-sm">2</span>
                      Location Found
                    </label>
                    <button
                      onClick={detectLocation}
                      type="button"
                      disabled={locStatus === 'loading'}
                      className="text-xs font-medium text-primary hover:text-primary-dark flex items-center gap-1 glass-soft px-2.5 py-1.5 rounded-full transition disabled:opacity-60"
                    >
                      {locStatus === 'loading' ? (
                        <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Detecting...</>
                      ) : (
                        <><Navigation className="h-3.5 w-3.5" /> Detect again</>
                      )}
                    </button>
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-primary/70" />
                    <textarea
                      rows={2}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full rounded-2xl border border-white/60 bg-white/50 pl-10 pr-4 py-3 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15 resize-none transition backdrop-blur-sm"
                      placeholder="The nearest location will be filled in automatically..."
                    />
                  </div>

                  <p className="mt-1.5 text-xs text-gray-400 flex items-center gap-1.5">
                    {locStatus === 'loading' && <><Loader2 className="h-3 w-3 animate-spin" /> Finding your nearest location...</>}
                    {locStatus === 'done' && <><CheckCircle2 className="h-3 w-3 text-success" /> Location detected automatically. You can edit it.</>}
                    {locStatus === 'denied' && <><AlertTriangle className="h-3 w-3 text-warning" /> Location permission is off. Please enter an address manually.</>}
                    {locStatus === 'idle' && <span>Preparing location detection...</span>}
                  </p>
                </div>

                {/* AI block (Req. 4) */}
                <div className="flex-1 flex flex-col">
                  <label className="flex items-center gap-2.5 text-sm font-bold text-primary-dark mb-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light text-white text-xs font-bold shadow-sm">3</span>
                    AI Analysis
                  </label>

                  {!hasAnalyzed ? (
                    <div className="glass-soft flex-1 flex flex-col items-center justify-center rounded-3xl p-6 text-center">
                      {/* AI scan emblem */}
                      <div className="relative w-16 h-16 mb-4">
                        {isAnalyzing && <div className="scan-ring absolute -inset-1 rounded-full" />}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/15 to-primary-light/20 border border-white/60 flex items-center justify-center">
                          <ScanSearch className="h-7 w-7 text-primary" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        The AI is ready to process your photo to detect the waste category and estimated volume.
                      </p>
                      {aiError && (
                        <p className="mb-3 text-xs text-error bg-error/10 border border-error/20 rounded-xl px-3 py-2 text-left w-full">
                          {aiError}
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={handleAnalyzeAI}
                        disabled={isAnalyzing || !preview}
                        className="lift bg-gradient-to-r from-primary to-primary-light text-white flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold shadow-md w-full disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                      >
                        {isAnalyzing ? (
                          <><Loader2 className="h-4 w-4 animate-spin" /> AI is analyzing...</>
                        ) : (
                          <><ScanSearch className="h-4 w-4" /> Start AI Analysis</>
                        )}
                      </button>
                      {!preview && (
                        <p className="mt-2 text-xs text-gray-400">Upload a photo first to begin.</p>
                      )}
                    </div>
                  ) : !isWaste ? (
                    /* ---------- NOT WASTE: educational note, ask to re-upload ---------- */
                    <div className="flex-1 flex flex-col items-center justify-center rounded-3xl p-6 text-center animate-slideInRight border border-warning/30 bg-warning/10 backdrop-blur-sm">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-warning/20 to-warning/10 border border-white/60 flex items-center justify-center mb-4">
                        <ImageOff className="h-7 w-7 text-warning" />
                      </div>
                      <p className="text-sm font-bold text-gray-900 mb-1.5">This doesn&apos;t look like waste</p>
                      <p className="text-sm text-gray-600 mb-4">
                        {aiNote || 'The AI could not detect actual waste in this image.'}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          resetAnalysis()
                          fileRef.current?.click()
                        }}
                        className="lift bg-gradient-to-r from-primary to-primary-light text-white flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold shadow-md w-full"
                      >
                        <Upload className="h-4 w-4" /> Upload a different image
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4 animate-slideInRight">
                      {/* Result cards */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="glass-soft p-4 rounded-2xl">
                          <p className="text-xs text-gray-500 mb-2">Category</p>
                          <div className="flex items-center gap-2">
                            <span className={`flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${categoryStyle.grad} text-white shadow-sm`}>
                              <categoryStyle.Icon className="h-4 w-4" />
                            </span>
                            <p className={`font-semibold text-sm ${categoryStyle.tint}`}>{category || '-'}</p>
                          </div>
                        </div>
                        <div className="glass-soft p-4 rounded-2xl">
                          <p className="text-xs text-gray-500 mb-2">Estimated Volume</p>
                          <div className="flex items-center gap-2">
                            <span className={`flex h-8 w-8 items-center justify-center rounded-xl text-white shadow-sm bg-gradient-to-br ${isBig ? 'from-warning/80 to-warning' : 'from-success/80 to-primary-light'}`}>
                              {isBig ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                            </span>
                            <p className={`font-semibold text-sm ${isBig ? 'text-warning' : 'text-success'}`}>{volume || '-'}</p>
                          </div>
                        </div>
                      </div>

                      {aiNote && (
                        <p className="text-xs text-gray-500 bg-white/50 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/60">
                          {aiNote}
                        </p>
                      )}

                      <button
                        type="button"
                        onClick={handleAnalyzeAI}
                        disabled={isAnalyzing}
                        className="text-xs font-medium text-primary hover:text-primary-dark flex items-center gap-1 disabled:opacity-60"
                      >
                        <RefreshCw className={`h-3.5 w-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} /> Re-analyze
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ============== RECOMMENDATIONS (Req. 5) ============== */}
            {showActions && (
              <div className="border-t border-white/50 p-6 lg:p-8 bg-white/30 animate-slideInRight">
                <div className="flex items-center gap-2.5 mb-1">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light text-white text-xs font-bold shadow-sm">4</span>
                  <h4 className="text-base font-bold text-primary-dark">Recommended Action</h4>
                </div>
                <p className="text-sm text-gray-500 ml-9 mb-6">
                  {isBig
                    ? 'A large volume was detected - collective handling is more effective. Choose one:'
                    : 'A small volume was detected - you can handle it yourself today.'}
                </p>

                {/* ---------- LARGE volume: 2 options ---------- */}
                {isBig ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Smart Waste Map */}
                    <button
                      type="button"
                      onClick={() => chooseAction('map')}
                      className={`lift text-left rounded-3xl p-5 transition-all ${
                        selectedAction === 'map' ? 'glass ring-glow' : 'glass-soft'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-sm">
                          <MapIcon className="h-5 w-5 text-white" />
                        </div>
                        {selectedAction === 'map' && <CheckCircle2 className="h-5 w-5 text-primary" />}
                      </div>
                      <p className="font-semibold text-primary-dark mb-1">Add to Smart Waste Map</p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Pin this spot on the map so officers and other community members can see and handle it.
                      </p>
                    </button>

                    {/* Community */}
                    <button
                      type="button"
                      onClick={() => chooseAction('community')}
                      className={`lift text-left rounded-3xl p-5 transition-all ${
                        selectedAction === 'community' ? 'glass ring-glow' : 'glass-soft'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-info flex items-center justify-center shadow-sm">
                          <HandHeart className="h-5 w-5 text-white" />
                        </div>
                        {selectedAction === 'community' && <CheckCircle2 className="h-5 w-5 text-primary" />}
                      </div>
                      <p className="font-semibold text-primary-dark mb-1">Clean up with the Community</p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Join a nearby community cleanup and earn points together.
                      </p>
                    </button>
                  </div>
                ) : (
                  /* ---------- SMALL volume: clean it yourself ---------- */
                  <div>
                    <button
                      type="button"
                      onClick={() => chooseAction('self')}
                      className={`lift w-full text-left rounded-3xl p-5 mb-4 transition-all ${
                        selectedAction === 'self' ? 'glass ring-glow' : 'glass-soft'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-success to-primary-light flex items-center justify-center shrink-0 shadow-sm">
                          <Leaf className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-primary-dark">Clean It Yourself</p>
                          <p className="text-xs text-gray-500">Be an environmental hero today - pick how you'll handle it.</p>
                        </div>
                        {selectedAction === 'self' && <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />}
                      </div>
                    </button>

                    {selectedAction === 'self' && (
                      <div className="animate-slideInRight">
                        {/* two selectable sub-options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setSelfChoice('bank')}
                            className={`lift text-left rounded-3xl p-5 transition-all ${
                              selfChoice === 'bank' ? 'glass ring-glow' : 'glass-soft'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-light text-white shadow-sm">
                                <Building2 className="h-5 w-5" />
                              </span>
                              {selfChoice === 'bank' && <CheckCircle2 className="h-5 w-5 text-primary" />}
                            </div>
                            <p className="font-semibold text-primary-dark mb-1">Take to a Waste Bank</p>
                            <p className="text-xs text-gray-500 leading-relaxed">
                              Drop it at the nearest waste bank that accepts {category}.
                            </p>
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelfChoice('diy')}
                            className={`lift text-left rounded-3xl p-5 transition-all ${
                              selfChoice === 'diy' ? 'glass ring-glow' : 'glass-soft'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-warning/80 to-warning text-white shadow-sm">
                                <Lightbulb className="h-5 w-5" />
                              </span>
                              {selfChoice === 'diy' && <CheckCircle2 className="h-5 w-5 text-primary" />}
                            </div>
                            <p className="font-semibold text-primary-dark mb-1">DIY Processing</p>
                            <p className="text-xs text-gray-500 leading-relaxed">
                              Handle it at home, like simple composting or recycling.
                            </p>
                          </button>
                        </div>

                        {/* ---- BANK detail (animated) ---- */}
                        {selfChoice === 'bank' && (
                          <div className="detail-reveal mt-4 glass-soft rounded-3xl p-5 overflow-hidden">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-white shadow-sm">
                                <Building2 className="h-4 w-4" />
                              </span>
                              <p className="text-sm font-bold text-primary-dark">Nearest Waste Bank</p>
                            </div>
                            <div className="space-y-3">
                              {recommendedBanks.map((b, idx) => {
                                const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}`
                                return (
                                  <div
                                    key={b.id}
                                    className={`rounded-2xl bg-white/60 border p-3.5 ${idx === 0 ? 'border-primary/40 ring-1 ring-primary/15' : 'border-white/60'}`}
                                  >
                                    <div className="flex items-start justify-between gap-2">
                                      <div>
                                        <p className="text-sm font-semibold text-gray-900 leading-snug">
                                          {b.name}
                                          {idx === 0 && <span className="ml-2 text-[10px] font-bold text-primary bg-primary/10 rounded-full px-2 py-0.5 align-middle">Closest</span>}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">{b.address}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{b.hours} · {b.price}</p>
                                      </div>
                                      {b.distance != null && (
                                        <span className="shrink-0 text-[11px] font-semibold text-primary bg-primary/10 rounded-full px-2 py-0.5">
                                          {KM(b.distance)}
                                        </span>
                                      )}
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-1">
                                      {b.accepts.slice(0, 4).map((a) => (
                                        <span key={a} className="text-[10px] bg-white/70 border border-white/70 text-gray-500 rounded-full px-2 py-0.5">{a}</span>
                                      ))}
                                    </div>
                                    <div className="mt-3 grid grid-cols-2 gap-2">
                                      <a
                                        href={mapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="lift inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white text-xs font-semibold py-2.5"
                                      >
                                        <Navigation className="h-3.5 w-3.5" /> Get Directions
                                      </a>
                                      <a
                                        href={mapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={`How to register: ${b.howToRegister}`}
                                        className="lift inline-flex items-center justify-center gap-1.5 rounded-xl border-2 border-primary/30 bg-white text-primary text-xs font-semibold py-2.5 hover:bg-bali-50"
                                      >
                                        <Phone className="h-3.5 w-3.5" /> Contact
                                      </a>
                                    </div>
                                    <p className="mt-2 text-[11px] text-gray-400 flex items-start gap-1">
                                      <ExternalLink className="h-3 w-3 mt-0.5 shrink-0" />
                                      To register: {b.howToRegister}.
                                    </p>
                                  </div>
                                )
                              })}
                            </div>
                            <button
                              type="button"
                              onClick={() => navigate('/waste-map')}
                              className="mt-3 w-full text-xs font-semibold text-primary hover:text-primary-dark flex items-center justify-center gap-1"
                            >
                              See all on the map <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        )}

                        {/* ---- DIY detail (animated) ---- */}
                        {selfChoice === 'diy' && tips && (
                          <div className="detail-reveal mt-4 glass-soft rounded-3xl p-5 overflow-hidden">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-warning/80 to-warning text-white shadow-sm">
                                <Lightbulb className="h-4 w-4" />
                              </span>
                              <p className="text-sm font-bold text-primary-dark">DIY Processing Tips</p>
                            </div>
                            <div className="flex items-center gap-2 mb-3 rounded-2xl bg-white/55 border border-white/60 px-3 py-2">
                              {TipIcon && <TipIcon className="h-4 w-4 text-primary" />}
                              <p className="text-sm font-semibold text-primary">{tips.title}</p>
                            </div>
                            <ol className="space-y-2.5">
                              {tips.steps.map((s, i) => (
                                <li
                                  key={i}
                                  className="detail-reveal flex gap-2.5 text-xs text-gray-600 leading-relaxed"
                                  style={{ animationDelay: `${i * 90}ms` }}
                                >
                                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light text-[10px] font-bold text-white mt-0.5 shadow-sm">
                                    {i + 1}
                                  </span>
                                  {s}
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Community detail (large volume) */}
                {isBig && selectedAction === 'community' && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 animate-slideInRight">
                    {csrChallenges.map((c) => (
                      <div key={c.id} className="lift glass-soft rounded-3xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{c.badge}</span>
                          <p className="text-sm font-bold text-primary-dark leading-snug">{c.title}</p>
                        </div>
                        <p className="text-xs text-gray-500 mb-3 leading-relaxed">{c.desc}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">{c.participants} participants</span>
                          <span className="font-semibold text-primary">{c.deadline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ===================== FOOTER / SUBMIT ===================== */}
            {showActions && (
              submitted ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-success/10 px-6 py-5 border-t border-success/20 animate-slideInRight">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-success to-primary-light text-white shadow-sm">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {selectedAction === 'community' ? 'You joined the community action!' : 'Report submitted. Thank you!'}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {selectedAction === 'community'
                          ? 'Schedule details will appear on the Gamification page.'
                          : 'Every small action helps keep the environment clean.'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null)
                      resetAnalysis()
                    }}
                    className="lift shrink-0 inline-flex items-center justify-center gap-2 rounded-2xl border border-primary/30 bg-white/70 backdrop-blur-sm px-6 py-2.5 text-sm font-semibold text-primary hover:bg-white transition-all"
                  >
                    <RefreshCw className="h-4 w-4" /> Analyze another item
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/40 px-6 py-5 border-t border-white/50">
                  <div className="flex items-center gap-2.5 text-xs text-gray-500">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <p>Your photo and location are processed securely.</p>
                  </div>
                  <button
                    type="button"
                    disabled={!selectedAction || !location || (selectedAction === 'self' && !selfChoice)}
                    onClick={() => {
                      if (selectedAction === 'map') { navigate('/waste-map'); return }
                      const pts = pointsFor(selectedAction, selfChoice)
                      setEarnedPoints(pts)
                      setSubmitted(true)
                      setShowPoints(true)
                    }}
                    className="lift bg-gradient-to-r from-primary to-primary-light text-white flex items-center justify-center gap-2 px-8 py-3 rounded-2xl text-sm font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {selectedAction === 'map' ? 'Open Smart Waste Map' : 'Submit Report'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ======================= ACTIVE REPORTS ======================= */}
      <section className="bg-bali-50 pb-20 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between gap-4 mb-8 reveal reveal-up">
              <div>
                <h2 className="text-2xl md:text-4xl font-semibold text-primary-dark tracking-tight flex items-center gap-2.5">
                  <Activity className="h-7 w-7 text-primary" />
                  Active Reports
                </h2>
                <p className="text-gray-500 text-sm mt-1.5">
                  Waste reports near you that still need handling.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/waste-map')}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark whitespace-nowrap"
              >
                View on map <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {activeReports.map((r, i) => {
                const st = statusStyle(r.status)
                return (
                  <article
                    key={r.id}
                    className={`lift bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm reveal reveal-up delay-${Math.min((i % 3) * 100 + 100, 300)}`}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img src={r.img} alt={r.title} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className={`absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm bg-white/85 ${st.chip}`}>
                        <CircleDot className={`h-3 w-3 ${st.dot}`} />
                        {st.label}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 leading-snug">{r.title}</h3>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">{r.desc}</p>
                      <div className="mt-3 flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
                        <span className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5" /> {r.reporter}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" /> {r.time}
                        </span>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            <button
              type="button"
              onClick={() => navigate('/waste-map')}
              className="sm:hidden mt-6 w-full inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-primary glass-soft rounded-2xl py-3"
            >
              View all on map <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ======================= POINTS POP-UP ======================= */}
      {showPoints && (
        <div
          className="points-backdrop fixed inset-0 z-50 flex items-center justify-center bg-primary-dark/50 backdrop-blur-sm px-4"
          onClick={() => setShowPoints(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="points-card relative w-full max-w-sm bg-white rounded-[28px] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* confetti */}
            <div className="absolute inset-x-0 top-0 h-0 pointer-events-none">
              {[
                { l: '12%', c: '#1F7A6B', d: '0ms' }, { l: '26%', c: '#F59E0B', d: '120ms' },
                { l: '40%', c: '#4FA493', d: '60ms' }, { l: '54%', c: '#3BAFDA', d: '200ms' },
                { l: '68%', c: '#22C55E', d: '90ms' }, { l: '82%', c: '#F59E0B', d: '160ms' },
                { l: '90%', c: '#1F7A6B', d: '40ms' }, { l: '20%', c: '#3BAFDA', d: '240ms' },
              ].map((p, i) => (
                <span key={i} className="confetti" style={{ left: p.l, background: p.c, animationDelay: p.d }} />
              ))}
            </div>

            <div className="px-7 pt-9 pb-7 text-center">
              <div className="coin-pulse mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-500 shadow-lg">
                <Trophy className="h-9 w-9 text-white" />
              </div>

              <p className="text-sm font-medium text-gray-500">You earned</p>
              <div className="my-1 flex items-center justify-center gap-2">
                <Coins className="h-7 w-7 text-amber-500" />
                <span className="text-5xl font-black text-primary-dark tabular-nums">+{displayPoints}</span>
              </div>
              <p className="text-sm font-semibold text-primary mb-1">points</p>

              <p className="text-xs text-gray-500 leading-relaxed mt-3">
                {selectedAction === 'community'
                  ? 'Thanks for joining a community cleanup!'
                  : selfChoice === 'bank'
                  ? 'Nice! Dropping waste at a waste bank keeps recyclables in the loop.'
                  : 'Great! Handling waste at home reduces what reaches the landfill.'}
              </p>

              {/* leaderboard hint */}
              <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-bali-50 border border-primary/15 px-4 py-2.5">
                <TrendingUp className="h-4 w-4 text-primary" />
                <p className="text-xs font-medium text-primary-dark">Added to your community leaderboard score</p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => { setShowPoints(false); navigate('/leaderboard') }}
                  className="lift inline-flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-primary to-primary-light text-white text-sm font-semibold py-3"
                >
                  <Trophy className="h-4 w-4" /> Leaderboard
                </button>
                <button
                  type="button"
                  onClick={() => setShowPoints(false)}
                  className="lift inline-flex items-center justify-center rounded-2xl border-2 border-primary/30 bg-white text-primary text-sm font-semibold py-3 hover:bg-bali-50"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}