import { Routes, Route } from "react-router-dom";

import PublicSite from "./pages/PublicSite";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import DiagnostikaAKPP from "./pages/DiagnostikaAKPP";
import RemontDSG from "./pages/RemontDSG";
import RemontCVT from "./pages/RemontCVT";
import ZamenaMaslaAKPP from "./pages/ZamenaMaslaAKPP";

import RemontAKPPToyota from "./pages/RemontAKPPToyota";
import RemontAKPPLexus from "./pages/RemontAKPPLexus";
import RemontAKPPHyundai from "./pages/RemontAKPPHyundai";
import RemontAKPPKia from "./pages/RemontAKPPKia";
import RemontAKPPVolkswagen from "./pages/RemontAKPPVolkswagen";
import RemontAKPPAudi from "./pages/RemontAKPPAudi";
import RemontAKPPSkoda from "./pages/RemontAKPPSkoda";
import RemontAKPPBMW from "./pages/RemontAKPPBMW";
import RemontAKPPMercedes from "./pages/RemontAKPPMercedes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicSite />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/diagnostika-akpp" element={<DiagnostikaAKPP />} />
      <Route path="/remont-dsg" element={<RemontDSG />} />
      <Route path="/remont-cvt" element={<RemontCVT />} />
      <Route path="/zamena-masla-akpp" element={<ZamenaMaslaAKPP />} />

      <Route path="/remont-akpp-toyota" element={<RemontAKPPToyota />} />
      <Route path="/remont-akpp-lexus" element={<RemontAKPPLexus />} />
      <Route path="/remont-akpp-hyundai" element={<RemontAKPPHyundai />} />
      <Route path="/remont-akpp-kia" element={<RemontAKPPKia />} />
      <Route
        path="/remont-akpp-volkswagen"
        element={<RemontAKPPVolkswagen />}
      />
      <Route path="/remont-akpp-audi" element={<RemontAKPPAudi />} />
      <Route path="/remont-akpp-skoda" element={<RemontAKPPSkoda />} />
      <Route path="/remont-akpp-bmw" element={<RemontAKPPBMW />} />
      <Route path="/remont-akpp-mercedes" element={<RemontAKPPMercedes />} />

      <Route
        path="/admin/panel"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
      <Route path="/index.html" element={<PublicSite />} />
    </Routes>
  );
}
