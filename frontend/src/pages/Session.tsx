import React from "react";
import { useNavigate } from "react-router-dom";
import type { TechPath } from "./PathSelect";

export default function Session() {
  const navigate = useNavigate();
  const selectedPath = sessionStorage.getItem("selectedPath") as TechPath | null;

  React.useEffect(() => {
    // If user refreshes /session without selecting a path
    if (!selectedPath) navigate("/", { replace: true });
  }, [selectedPath, navigate]);

  if (!selectedPath) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">Questions</h1>
            <p className="mt-1 text-slate-300">
              Path: <span className="text-slate-100">{selectedPath}</span>
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm hover:bg-slate-900"
          >
            Change Path
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/30 p-6 text-slate-200">
          <div className="font-semibold">Next step</div>
          <p className="mt-2 text-slate-300">
            This is the page where we’ll render the 5 generated questions + code
            editor.
          </p>
        </div>
      </div>
    </div>
  );
}