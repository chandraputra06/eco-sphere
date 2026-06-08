export const reports = [
  { id: 1, title: "Sanur Beach Coast", lat: -8.6750, lng: 115.2630, status: "Critical", reporter: "Wayan Sudarma", time: "12 mins ago", img: "https://images.unsplash.com/photo-1618477461853-cf6ed80fbe5e?q=80&w=2070", desc: "Plastic waste washed ashore near the ferry dock." },
  { id: 2, title: "Tukad Badung River", lat: -8.6650, lng: 115.2150, status: "Warning", reporter: "Made Gede", time: "1 hour ago", img: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=2000", desc: "Household waste blocking river flow under the bridge." },
  { id: 3, title: "Suwung Mangrove Forest", lat: -8.7391, lng: 115.2140, status: "Resolved", reporter: "Santi Putri", time: "2 days ago", img: "https://images.unsplash.com/photo-1532660621034-ee5b6ad1f168?q=80&w=2000", desc: "Mangrove area cleaned up by local community." },
  { id: 4, title: "Petitenget Beach", lat: -8.6820, lng: 115.1510, status: "Resolved", reporter: "Gede Agus", time: "5 hours ago", img: "https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?q=80&w=2000", desc: "Drifted wood waste removed by sanitation workers." },
  { id: 5, title: "Kumbasari Market", lat: -8.6580, lng: 115.2130, status: "Critical", reporter: "Ketut Arta", time: "30 mins ago", img: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=2000", desc: "Organic market waste overflowing onto the roadside." },
  { id: 6, title: "Uluwatu Temple Area", lat: -8.8290, lng: 115.0840, status: "Warning", reporter: "Putu Siska", time: "3 hours ago", img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2000", desc: "Offerings residue and plastic bottles scattered on the trail." },
  { id: 7, title: "Pandawa Beach", lat: -8.8450, lng: 115.1850, status: "Resolved", reporter: "Nyoman Satria", time: "1 day ago", img: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=2000", desc: "Regular cleanup by beach management completed." },
  { id: 8, title: "Kuta Beach", lat: -8.7180, lng: 115.1680, status: "Critical", reporter: "Komang Ardi", time: "18 mins ago", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000", desc: "Tourist plastic waste accumulating at the shoreline." },
  { id: 9, title: "Badung Market", lat: -8.6545, lng: 115.2105, status: "Warning", reporter: "Kadek Yoga", time: "45 mins ago", img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2000", desc: "Vegetable scraps and plastic beginning to pile up behind the market." },
  { id: 10, title: "Jimbaran Beach", lat: -8.7900, lng: 115.1600, status: "Critical", reporter: "Luh Ayu", time: "20 mins ago", img: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=2000", desc: "Plastic and styrofoam waste found along the coastline." },
  { id: 11, title: "Ubung Terminal", lat: -8.6400, lng: 115.2000, status: "Warning", reporter: "Nyoman Eka", time: "2 hours ago", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000", desc: "Terminal area filled with bottle and food waste." },
  { id: 12, title: "Berawa Beach", lat: -8.6600, lng: 115.1300, status: "Resolved", reporter: "Made Suta", time: "5 hours ago", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000", desc: "Beach cleanup completed by local community." },
  { id: 13, title: "Batur Lake", lat: -8.2500, lng: 115.3700, status: "Warning", reporter: "Ketut Budi", time: "1 day ago", img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2000", desc: "Visitor waste found around the lake area." },
  { id: 14, title: "Melasti Beach", lat: -8.8470, lng: 115.1540, status: "Critical", reporter: "Putu Adi", time: "10 mins ago", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000", desc: "Ocean-borne waste accumulation increasing." },
  { id: 15, title: "Ayung River", lat: -8.5000, lng: 115.2600, status: "Resolved", reporter: "Gusti Rai", time: "3 days ago", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000", desc: "River cleanup successfully done with volunteers." },
];

export const tpaData = [
  { id: 1, name: "TPA Suwung", lat: -8.7450, lng: 115.2180, capacity: "overload", percent: 95, region: "Denpasar / Badung", hours: "06:00 - 18:00" },
  { id: 2, name: "TPA Temesi", lat: -8.5850, lng: 115.3580, capacity: "medium", percent: 68, region: "Gianyar", hours: "06:00 - 17:00" },
  { id: 3, name: "TPA Peh", lat: -8.3200, lng: 115.0850, capacity: "available", percent: 40, region: "Buleleng", hours: "06:00 - 17:00" },
  { id: 4, name: "TPA Mandung", lat: -8.5460, lng: 115.0730, capacity: "medium", percent: 72, region: "Tabanan", hours: "06:00 - 17:00" },
  { id: 5, name: "TPA Linggasana", lat: -8.4620, lng: 115.3510, capacity: "available", percent: 35, region: "Bangli", hours: "06:00 - 16:00" },
  { id: 6, name: "TPA Karangasem", lat: -8.4530, lng: 115.6080, capacity: "medium", percent: 60, region: "Karangasem", hours: "06:00 - 17:00" },
];

export const bankSampahData = [
  { id: 1, name: "Bank Sampah Induk Denpasar", lat: -8.6705, lng: 115.2126, type: "bank_sampah", address: "Jl. Cargo, North Denpasar", hours: "Mon-Fri 08:00-16:00", accepts: ["Plastic", "Paper", "Metal", "Glass"], price: "Market rate per kg", howToRegister: "Walk in, bring ID" },
  { id: 2, name: "Bank Sampah Gianyar Bersih", lat: -8.5380, lng: 115.3250, type: "bank_sampah", address: "Jl. Ngurah Rai, Gianyar", hours: "Mon-Sat 08:00-15:00", accepts: ["Plastic", "Paper", "Organic"], price: "Paid per kg", howToRegister: "Contact village coordinator" },
  { id: 3, name: "Sanur Metal & E-waste Collector", lat: -8.6880, lng: 115.2620, type: "pengepul", address: "Jl. Danau Poso, Sanur", hours: "Daily 08:00-17:00", accepts: ["Metal", "Electronics", "TV", "Fridge", "AC"], price: "Iron Rp 3,000/kg, Copper Rp 60,000/kg", howToRegister: "Walk in directly" },
  { id: 4, name: "Bank Sampah Kuta Lestari", lat: -8.7200, lng: 115.1680, type: "bank_sampah", address: "Jl. Raya Kuta, Badung", hours: "Tue & Fri 09:00-14:00", accepts: ["Plastic", "Bottles", "Cardboard"], price: "Plastic bottle Rp 1,500/kg", howToRegister: "Register online via WhatsApp" },
  { id: 5, name: "Ubud Used Goods Collector", lat: -8.5069, lng: 115.2624, type: "pengepul", address: "Jl. Raya Ubud, Gianyar", hours: "Daily 07:00-18:00", accepts: ["Furniture", "Electronics", "Books", "Clothing"], price: "Negotiable", howToRegister: "Walk in or call" },
  { id: 6, name: "Bank Sampah Buleleng Mandiri", lat: -8.1120, lng: 115.0890, type: "bank_sampah", address: "Jl. A. Yani, Singaraja", hours: "Mon-Fri 08:00-16:00", accepts: ["Plastic", "Paper", "Metal"], price: "Monthly savings per kg", howToRegister: "Register at village office" },
  { id: 7, name: "Denpasar Used Cooking Oil Collector", lat: -8.6520, lng: 115.2300, type: "pengepul", address: "Jl. Imam Bonjol, Denpasar", hours: "Mon-Sat 08:00-17:00", accepts: ["Used cooking oil"], price: "Rp 4,000/liter", howToRegister: "Walk in with container" },
  { id: 8, name: "Bank Sampah Renon Hijau", lat: -8.6710, lng: 115.2390, type: "bank_sampah", address: "Jl. Raya Puputan, Renon", hours: "Mon-Sat 08:00-15:00", accepts: ["Plastic", "Paper"], price: "Paid per kg", howToRegister: "Walk in" },
];
