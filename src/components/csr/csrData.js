// ─────────────────────────────────────────────────────────────
// Static demo data for the CSR dashboard (no backend — illustrative)
// ─────────────────────────────────────────────────────────────

export const COMPANY = {
  name: 'GreenCorp Indonesia',
  plan: 'CSR Partner — Enterprise',
  since: 'Partner since 2023',
  initials: 'GC',
}

// KPI cards — Overview
export const KPIS = [
  { key: 'waste',  label: 'Waste Diverted',  value: '128.4', unit: 'tons',  delta: +14, accent: '#1F7A6B', bar: '#1F7A6B' },
  { key: 'co2',    label: 'CO₂ Offset',      value: '342',   unit: 'tons',  delta: +9,  accent: '#3BAFDA', bar: '#F59E0B' },
  { key: 'trees',  label: 'Trees Funded',    value: '5,120', unit: 'trees', delta: +6,  accent: '#22C55E', bar: '#22C55E' },
  { key: 'hours',  label: 'Volunteer Hours', value: '8,940', unit: 'hrs',   delta: -3,  accent: '#F59E0B', bar: '#2563EB' },
]

// Monthly impact trend (tons diverted) — Masuk vs Ditangani analogue
export const TREND = [
  { m: 'Jan', collected: 28, processed: 22 },
  { m: 'Feb', collected: 33, processed: 27 },
  { m: 'Mar', collected: 39, processed: 32 },
  { m: 'Apr', collected: 41, processed: 36 },
  { m: 'May', collected: 44, processed: 39 },
  { m: 'Jun', collected: 47, processed: 42 },
]

export const WASTE_MIX = [
  { label: 'Plastic',    pct: 38, color: '#EF4444' },
  { label: 'Organic',    pct: 28, color: '#F59E0B' },
  { label: 'Paper',      pct: 16, color: '#2563EB' },
  { label: 'Electronic', pct: 10, color: '#8B5CF6' },
  { label: 'Other',      pct: 8,  color: '#94A3B8' },
]

// Per-site stacked volume (tons/week)  [plastic, organic, other]
export const SITE_VOLUME = [
  { site: 'Denpasar HQ',   plastic: 12, organic: 9, other: 5 },
  { site: 'Kuta Branch',   plastic: 8,  organic: 7, other: 4 },
  { site: 'Ubud Resort',   plastic: 6,  organic: 5, other: 3 },
  { site: 'Sanur Office',  plastic: 4,  organic: 3, other: 2 },
  { site: 'Nusa Dua Site', plastic: 3,  organic: 2, other: 1 },
  { site: 'Tabanan Plant', plastic: 2,  organic: 1, other: 1 },
]

// Multi-line trend per material (Jan–Jun)
export const MATERIAL_TREND = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    { name: 'Plastic',    color: '#EF4444', values: [205, 235, 262, 298, 322, 340] },
    { name: 'Organic',    color: '#F59E0B', values: [150, 175, 195, 220, 240, 248] },
    { name: 'Paper',      color: '#2563EB', values: [80, 90, 100, 115, 122, 130] },
    { name: 'Electronic', color: '#8B5CF6', values: [55, 62, 72, 85, 95, 105] },
  ],
}

// Processing rate per site (%)
export const PROCESS_RATE = [
  { name: 'Denpasar HQ',   pct: 89, color: '#1F7A6B' },
  { name: 'Ubud Resort',   pct: 81, color: '#1F7A6B' },
  { name: 'Kuta Branch',   pct: 74, color: '#F59E0B' },
  { name: 'Sanur Office',  pct: 67, color: '#F59E0B' },
  { name: 'Nusa Dua Site', pct: 58, color: '#F59E0B' },
  { name: 'Tabanan Plant', pct: 44, color: '#EF4444' },
  { name: 'Bangli Depot',  pct: 39, color: '#EF4444' },
]

// Sites for the Leaflet map (lat/lng around Bali) + status
export const SITE_LOCATIONS = [
  { id: 1, name: 'Denpasar HQ',   lat: -8.6705, lng: 115.2126, status: 'active',   tons: 42 },
  { id: 2, name: 'Kuta Branch',   lat: -8.7180, lng: 115.1686, status: 'active',   tons: 31 },
  { id: 3, name: 'Seminyak Hub',  lat: -8.6912, lng: 115.1680, status: 'warning',  tons: 24 },
  { id: 4, name: 'Sanur Office',  lat: -8.6880, lng: 115.2620, status: 'active',   tons: 18 },
  { id: 5, name: 'Nusa Dua Site', lat: -8.7967, lng: 115.2316, status: 'warning',  tons: 13 },
  { id: 6, name: 'Ubud Resort',   lat: -8.5069, lng: 115.2625, status: 'active',   tons: 24 },
  { id: 7, name: 'Tabanan Plant', lat: -8.5380, lng: 115.1320, status: 'critical', tons: 9 },
  { id: 8, name: 'Bangli Depot',  lat: -8.4510, lng: 115.3550, status: 'critical', tons: 7 },
]

export const STATUS_META = {
  active:   { label: 'Active',   color: '#22C55E' },
  warning:  { label: 'At Risk',  color: '#F59E0B' },
  critical: { label: 'Critical', color: '#EF4444' },
}

// Reports per region (for the bar under the map)
export const REGION_REPORTS = [
  { region: 'Badung',   count: 6 },
  { region: 'Denpasar', count: 6 },
  { region: 'Gianyar',  count: 1 },
  { region: 'Bangli',   count: 1 },
]

// Ecosystem KPIs
export const ECO_KPIS = [
  { label: 'Active Partners',    value: '47',    sub: 'Across Bali',   delta: '+3 new',   accent: '#22C55E' },
  { label: 'Priority Programs',  value: '12',    sub: 'Need action',   delta: '+4',       accent: '#F59E0B' },
  { label: 'Active Volunteers',  value: '3,842', sub: 'This week',     delta: '+18%',     accent: '#2563EB' },
  { label: 'Villages Joined',    value: '89',    sub: 'of 636 villages', delta: '14%',    accent: '#8B5CF6' },
]

// Priority programs (worst-performing sites needing attention)
export const PRIORITY_PROGRAMS = [
  { rank: 1, name: 'Kuta Coastal Cleanup',   area: 'Badung · 256 reports/wk',  score: 94, status: 'critical' },
  { rank: 2, name: 'Denpasar Plastic Drive',  area: 'Denpasar · 312 reports/wk', score: 91, status: 'critical' },
  { rank: 3, name: 'Seminyak Recycling',      area: 'Badung · 218 reports/wk',  score: 87, status: 'critical' },
  { rank: 4, name: 'Legian Waste Watch',      area: 'Badung · 190 reports/wk',  score: 78, status: 'warning' },
  { rank: 5, name: 'Gianyar Compost Hub',     area: 'Gianyar · 172 reports/wk', score: 72, status: 'warning' },
  { rank: 6, name: 'Ubud Green Market',       area: 'Gianyar · 124 reports/wk', score: 55, status: 'warning' },
]

// Urgency per region (horizontal bars)
export const URGENCY = [
  { region: 'Badung',     pct: 88, color: '#EF4444' },
  { region: 'Denpasar',   pct: 84, color: '#EF4444' },
  { region: 'Gianyar',    pct: 72, color: '#F59E0B' },
  { region: 'Tabanan',    pct: 58, color: '#F59E0B' },
  { region: 'Buleleng',   pct: 45, color: '#22C55E' },
  { region: 'Karangasem', pct: 40, color: '#22C55E' },
  { region: 'Klungkung',  pct: 34, color: '#22C55E' },
  { region: 'Bangli',     pct: 28, color: '#22C55E' },
]

// Partner directory
export const PARTNERS = [
  { name: 'BS Induk Denpasar', area: 'Denpasar · 08.00–16.00', tags: 'Plastic, Paper, Metal', meta: '320 members', load: 95 },
  { name: 'BS Gianyar Bersih', area: 'Gianyar · 08.00–15.00',  tags: 'Plastic, Organic',     meta: '180 members', load: 60 },
  { name: 'BS Kuta Lestari',   area: 'Badung · 09.00–14.00',   tags: 'Plastic, Bottles',     meta: '95 members',  load: 48 },
  { name: 'BS Buleleng Mandiri', area: 'Buleleng · 08.00–16.00', tags: 'Plastic, Paper, Metal', meta: '140 members', load: 40 },
]

export const COLLECTORS = [
  { name: 'Sanur Metal Collector',  area: 'Denpasar', tags: 'Metal, Electronic, TV', price: 'Metal Rp3k/kg' },
  { name: 'Ubud Used Goods',        area: 'Gianyar',  tags: 'Furniture, Electronic', price: 'Direct nego' },
  { name: 'Used Cooking Oil Depot', area: 'Denpasar', tags: 'Used cooking oil',      price: 'Rp4,000/liter' },
  { name: 'Kuta Plastic Buyer',     area: 'Badung',   tags: 'PET, HDPE, PP',         price: 'PET Rp2k/kg' },
]

export const FACILITIES = [
  { name: 'Processing Hub Suwung',  area: 'Denpasar / Badung', load: 95, color: '#EF4444' },
  { name: 'Recycling Temesi',       area: 'Gianyar',           load: 68, color: '#F59E0B' },
  { name: 'Transfer Station Mandung', area: 'Tabanan',         load: 72, color: '#F59E0B' },
  { name: 'Compost Yard Peh',       area: 'Buleleng',          load: 40, color: '#22C55E' },
  { name: 'Sorting Linggasana',     area: 'Bangli',            load: 35, color: '#22C55E' },
  { name: 'Depot Karangasem',       area: 'Karangasem',        load: 60, color: '#F59E0B' },
]

// Insights — facility capacity prediction (Apr–Aug, last 2 are predicted)
export const CAPACITY_PRED = {
  months: ['Apr', 'May', 'Jun*', 'Jul*', 'Aug*'],
  solidIdx: 1, // points up to this index are actuals; beyond = predicted (dashed)
  series: [
    { name: 'Hub Suwung',  color: '#EF4444', values: [88, 94, 102, 108, 115] },
    { name: 'Temesi',      color: '#F59E0B', values: [59, 67, 74, 79, 83] },
    { name: 'Peh',         color: '#1F7A6B', values: [34, 39, 43, 46, 49] },
  ],
}

export const CAPACITY_STATUS = [
  { name: 'Hub Suwung', pct: 95, tone: 'critical', note: 'Overload in ~14 days' },
  { name: 'Mandung',    pct: 72, tone: 'warning',  note: 'Needs close monitoring' },
  { name: 'Peh',        pct: 40, tone: 'success',  note: 'Capacity still healthy' },
]

// Seasonal plastic volume (12 months) with tone thresholds
export const SEASONAL = [
  { m: 'Jan', v: 205, tone: 'normal' }, { m: 'Feb', v: 188, tone: 'normal' },
  { m: 'Mar', v: 215, tone: 'normal' }, { m: 'Apr', v: 238, tone: 'normal' },
  { m: 'May', v: 275, tone: 'normal' }, { m: 'Jun', v: 312, tone: 'warning' },
  { m: 'Jul', v: 375, tone: 'peak' },   { m: 'Aug', v: 405, tone: 'peak' },
  { m: 'Sep', v: 308, tone: 'warning' },{ m: 'Oct', v: 245, tone: 'normal' },
  { m: 'Nov', v: 218, tone: 'normal' }, { m: 'Dec', v: 228, tone: 'normal' },
]

export const SEASONAL_TONE = {
  normal:  '#94A3B8',
  warning: '#F59E0B',
  peak:    '#EF4444',
}

// Recommendation: regions needing new partner facilities
export const PARTNER_GAPS = [
  { name: 'Kuta',         meta: '256 reports/wk · 1 active partner', gap: 'High' },
  { name: 'Seminyak',     meta: '218 reports/wk · 1 active partner', gap: 'High' },
  { name: 'Denpasar West',meta: '180 reports/wk · 2 active partners', gap: 'Medium' },
  { name: 'Gianyar City', meta: '172 reports/wk · 2 active partners', gap: 'Medium' },
  { name: 'Tabanan City', meta: '110 reports/wk · 1 active partner', gap: 'Medium' },
  { name: 'Singaraja',    meta: '90 reports/wk · 2 active partners', gap: 'Low' },
]

// Need vs facility gap (paired bars)
export const NEED_VS_FACILITY = [
  { region: 'Kuta',     need: 252, facility: 38 },
  { region: 'Seminyak', need: 214, facility: 38 },
  { region: 'Dps West', need: 178, facility: 78 },
  { region: 'Gianyar',  need: 170, facility: 78 },
  { region: 'Tabanan',  need: 108, facility: 38 },
  { region: 'Singaraja',need: 88,  facility: 76 },
]

export const GAP_TONE = {
  High:   { color: '#EF4444', chip: 'bg-error/10 text-error' },
  Medium: { color: '#F59E0B', chip: 'bg-warning/10 text-warning' },
  Low:    { color: '#22C55E', chip: 'bg-success/10 text-success' },
}