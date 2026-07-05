// App.jsx
import { Routes, Route } from "react-router-dom";

import Layout from "./src/components/layout/Layout";
import ProtectedRoute from "./src/routes/ProtectedRoute";
import RoleRoute from "./src/routes/RoleRoute";

import Home from "./src/pages/Home";
import WasteMap from "./src/pages/WasteMap";
import Leaderboard from "./src/pages/Leaderboard";
import Gamification from "./src/pages/Gamification";
import ContactUs from "./src/pages/ContactUs";
import WasteReport from "./src/pages/WasteReport";
import Profile from "./src/pages/Profile";
import CSRDashboard from "./src/pages/CSRDashboard";
import OrgDashboard from "./src/pages/OrgDashboard";
import AdminDashboard from "./src/pages/AdminDashboard";

// Halaman auth
import RoleSelect from "./src/pages/auth/RoleSelect";
import Login from "./src/pages/auth/Login";
import Register from "./src/pages/auth/Register";

export default function App() {
  return (
    <Routes>
      {/* Halaman auth (tanpa Layout/navbar) */}
      <Route path="/get-started" element={<RoleSelect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Halaman dengan Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="waste-map" element={<WasteMap />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="gamification" element={<Gamification />} />
        <Route path="contact" element={<ContactUs />} />

        {/* Hanya untuk yang sudah login */}
        <Route
          path="report"
          element={
            <ProtectedRoute>
              <WasteReport />
            </ProtectedRoute>
          }
        />

        {/* Dashboard Collector / Manager */}
        <Route
          path="dashboard"
          element={
            <RoleRoute allow={["manager", "collector", "admin"]}>
              <OrgDashboard />
            </RoleRoute>
          }
        />

        {/* Dashboard CSR */}
        <Route
          path="csr-dashboard"
          element={
            <RoleRoute allow={["csr", "admin"]}>
              <CSRDashboard />
            </RoleRoute>
          }
        />

        {/* Admin */}
        <Route
          path="admin"
          element={
            <RoleRoute allow={["admin"]}>
              <AdminDashboard />
            </RoleRoute>
          }
        />
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