import { Routes, Route, Navigate } from "react-router-dom";
import PathSelect from "./pages/PathSelect";
import Session from "./pages/Session";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PathSelect />} />
      <Route path="/session" element={<Session />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}