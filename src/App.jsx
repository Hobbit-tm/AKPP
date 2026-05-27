import { Routes, Route } from "react-router-dom";

import PublicSite from "./pages/PublicSite";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicSite />} />

      <Route path="/admin" element={<AdminLogin />} />

      <Route path="/admin/panel" element={<AdminPanel />} />
    </Routes>
  );
}
