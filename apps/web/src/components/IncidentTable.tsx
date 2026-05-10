import { useState } from "react";
import { updateIncidentStatus } from "../api/client";
import { StatusBadge } from "./StatusBadge";
import { incidentClassificationOptions, incidentStatusOptions, type Incident, type IncidentStatus } from "../types/incident";

function classificationLabel(value: string) {
  return incidentClassificationOptions.find((option) => option.value === value)?.label ?? value;
}

export function IncidentTable({ incidents, onUpdated }: { incidents: Incident[]; onUpdated: (incident: Incident) => void }) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleStatusChange(incident: Incident, status: IncidentStatus) {
    setUpdatingId(incident.id);
    setError(null);

    try {
      const updated = await updateIncidentStatus(incident.id, status, incident.statusNotes ?? undefined);
      onUpdated(updated);
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Unable to update status.");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Monitoring</p>
          <h2 className="text-xl font-bold text-slate-950">Incident reports</h2>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">{incidents.length} shown</span>
      </div>

      {error ? <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</div> : null}

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2 text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2">Reference</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Reported by</th>
              <th className="px-3 py-2">Classification</th>
              <th className="px-3 py-2">Site / Area</th>
              <th className="px-3 py-2">Incident date</th>
              <th className="px-3 py-2">Update status</th>
            </tr>
          </thead>
          <tbody>
            {incidents.length === 0 ? (
              <tr>
                <td className="rounded-lg bg-slate-50 px-3 py-6 text-center text-slate-500" colSpan={7}>No incident reports yet.</td>
              </tr>
            ) : incidents.map((incident) => (
              <tr key={incident.id} className="bg-slate-50">
                <td className="rounded-l-lg px-3 py-3 font-semibold text-slate-900">{incident.referenceNo}</td>
                <td className="px-3 py-3"><StatusBadge status={incident.status} /></td>
                <td className="px-3 py-3 text-slate-700">{incident.reportedByName}</td>
                <td className="px-3 py-3 text-slate-700">{classificationLabel(incident.classification)}</td>
                <td className="px-3 py-3 text-slate-700">{[incident.incidentSite, incident.incidentArea].filter(Boolean).join(" / ") || "—"}</td>
                <td className="px-3 py-3 text-slate-700">{incident.incidentDate ? new Date(incident.incidentDate).toLocaleDateString() : "—"}</td>
                <td className="rounded-r-lg px-3 py-3">
                  <select
                    className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-slate-900"
                    value={incident.status}
                    disabled={updatingId === incident.id}
                    onChange={(event) => handleStatusChange(incident, event.target.value as IncidentStatus)}
                  >
                    {incidentStatusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
