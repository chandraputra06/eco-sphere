import { Routes, Route } from "react-router-dom";

import Layout from "./src/components/layout/Layout";
import ProtectedRoute from "./src/routes/ProtectedRoute";

import Home from "./src/pages/Home";
import WasteMap from "./src/pages/WasteMap";
import Leaderboard from "./src/pages/Leaderboard";
import Gamification from "./src/pages/Gamification";
import ContactUs from "./src/pages/ContactUs";
import WasteReport from "./src/pages/WasteReport";
import Profile from "./src/pages/Profile";
import CSRDashboard from "./src/pages/CSRDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="waste-map" element={<WasteMap />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="gamification" element={<Gamification />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="report" element={<WasteReport />} />
        <Route path="csr-dashboard" element={<CSRDashboard />} />
      </Route>

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}