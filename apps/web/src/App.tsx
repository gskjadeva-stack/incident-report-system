import { useState } from "react";
import { IncidentDashboardPage } from "./pages/IncidentDashboardPage";
import { IncidentFormPage } from "./pages/IncidentFormPage";
import type { Incident } from "./types/incident";

type Tab = "form" | "dashboard";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("form");
  const [refreshKey, setRefreshKey] = useState(0);

  function handleCreated(_incident: Incident) {
    setRefreshKey((current) => current + 1);
    setActiveTab("dashboard");
  }

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-200">IR Monitoring System</p>
        <div className="mt-2 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h1 className="text-3xl font-bold">Operational Risk Incident Reports</h1>
            <p className="mt-2 max-w-3xl text-slate-300">
              Consolidate incident reports, assign unique references, and monitor each report until closure.
            </p>
          </div>
          <nav className="flex gap-2 rounded-full bg-white/10 p-1">
            <button
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === "form" ? "bg-white text-slate-950" : "text-white hover:bg-white/10"}`}
              type="button"
              onClick={() => setActiveTab("form")}
            >
              Submit IR
            </button>
            <button
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === "dashboard" ? "bg-white text-slate-950" : "text-white hover:bg-white/10"}`}
              type="button"
              onClick={() => setActiveTab("dashboard")}
            >
              Monitoring
            </button>
          </nav>
        </div>
      </header>

      {activeTab === "form" ? (
        <IncidentFormPage onCreated={handleCreated} />
      ) : (
        <IncidentDashboardPage refreshKey={refreshKey} />
      )}
    </main>
  );
}
