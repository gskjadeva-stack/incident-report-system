import type { IncidentStatus } from "../types/incident";

const statusClasses: Record<IncidentStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800 ring-amber-200",
  OPEN: "bg-blue-100 text-blue-800 ring-blue-200",
  CLOSED: "bg-emerald-100 text-emerald-800 ring-emerald-200"
};

export function StatusBadge({ status }: { status: IncidentStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusClasses[status]}`}>
      {status}
    </span>
  );
}
