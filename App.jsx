import { Routes, Route } from 'react-router-dom'
import WasteReport from './src/pages/WasteReport'
import Profile from './src/pages/Profile'
import Leaderboard from './src/pages/Leaderboard'
import Layout from './src/components/layout/Layout'
import Home from './src/pages/Home'
import WasteMap from './src/pages/WasteMap'
import ContactUs from './src/pages/ContactUs'
import Gamification from './src/pages/Gamification'


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="waste-map" element={<WasteMap />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="gamification" element={<Gamification />} />
        <Route path="contact" element={<ContactUs/>} />
        <Route path="report" element={<WasteReport />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}
