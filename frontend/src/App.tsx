import { Routes, Route, Navigate } from "react-router-dom";
import PathSelect from "./pages/PathSelect";
import Session from "./pages/Session";
import { ReportPage } from "./report/ReportPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PathSelect />} />
      <Route path="/session" element={<Session />} />
      <Route path="/report" element={<ReportPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}