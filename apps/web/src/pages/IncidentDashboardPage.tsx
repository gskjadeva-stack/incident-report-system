import { useEffect, useState } from "react";
import { listIncidents } from "../api/client";
import { IncidentTable } from "../components/IncidentTable";
import { incidentStatusOptions, type Incident, type IncidentStatus } from "../types/incident";

export function IncidentDashboardPage({ refreshKey }: { refreshKey: number }) {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [status, setStatus] = useState<IncidentStatus | "">("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadIncidents() {
    setIsLoading(true);
    setError(null);

    try {
      const result = await listIncidents({ status: status || undefined, search: search || undefined });
      setIncidents(result.items);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load incidents.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadIncidents();
  }, [refreshKey, status]);

  function handleUpdated(updated: Incident) {
    setIncidents((current) => current.map((incident) => incident.id === updated.id ? updated : incident));
  }

  return (
    <div className="grid gap-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1fr_220px_auto]">
          <input
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
            placeholder="Search reference, reporter, site, area, or description"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <select
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
            value={status}
            onChange={(event) => setStatus(event.target.value as IncidentStatus | "")}
          >
            <option value="">All statuses</option>
            {incidentStatusOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <button
            className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-700"
            type="button"
            onClick={() => void loadIncidents()}
          >
            {isLoading ? "Loading..." : "Refresh"}
          </button>
        </div>
        {error ? <div className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</div> : null}
      </div>

      <IncidentTable incidents={incidents} onUpdated={handleUpdated} />
    </div>
  );
}
