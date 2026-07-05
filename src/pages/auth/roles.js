// src/pages/auth/roles.js
import { IconLeaf, IconTruck, IconUsers, IconBuilding } from './icons'

// Role yang boleh mendaftar sendiri (admin dibuat manual, tidak di sini).
export const ROLES = [
  {
    id: 'citizen',
    label: 'Public / Citizen',
    tagline: 'Scan & report waste, collect points.',
    Icon: IconLeaf,
  },
  {
    id: 'collector',
    label: 'Collector',
    tagline: 'Transport & manage waste collection.',
    Icon: IconTruck,
  },
  {
    id: 'manager',
    label: 'Waste Management / Community',
    tagline: 'Manage waste programs and community initiatives.',
    Icon: IconUsers,
  },
  {
    id: 'csr',
    label: 'CSR',
    tagline: 'Sponsor campaigns and monitor impact.',
    Icon: IconBuilding,
  },
]

export const roleById = (id) => ROLES.find((r) => r.id === id)
