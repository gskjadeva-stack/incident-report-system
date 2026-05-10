import type { Incident } from "../types/incident";
import { IncidentForm } from "../components/IncidentForm";

export function IncidentFormPage({ onCreated }: { onCreated: (incident: Incident) => void }) {
  return <IncidentForm onCreated={onCreated} />;
}
