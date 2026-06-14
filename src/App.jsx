import { Routes, Route } from "react-router-dom";

import PublicSite from "./pages/PublicSite";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import DiagnostikaAKPP from "./pages/DiagnostikaAKPP";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicSite />} />
      <Route path="/diagnostika-akpp" element={<DiagnostikaAKPP />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/panel"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
