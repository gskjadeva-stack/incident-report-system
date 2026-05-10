import { FormEvent, useState } from "react";
import { createIncident } from "../api/client";
import {
  incidentClassificationOptions,
  type Incident,
  type IncidentClassification,
  type IncidentPayload
} from "../types/incident";

const impactOptions = [
  { key: "impactHealthSafety", label: "Health and Safety" },
  { key: "impactLegal", label: "Legal" },
  { key: "impactOperational", label: "Operational" },
  { key: "impactReputational", label: "Reputational" },
  { key: "impactFinancial", label: "Financial" },
  { key: "impactOthers", label: "Others" }
] as const;

const emptyPayload: IncidentPayload = {
  reportedByName: "",
  reporterPosition: "",
  reporterDepartment: "",
  reporterSite: "",
  reportDate: "",
  reportTime: "",

  classification: "ATTEMPTED_THEFT_PILFERAGE",
  classificationOtherText: "",
  incidentSite: "",
  incidentArea: "",
  incidentDate: "",
  incidentTime: "",
  description: "",
  immediateActionTaken: "",

  reportTakenByName: "",
  reportTakenByPosition: "",
  reportTakenDate: "",
  reportTakenTime: "",

  impactHealthSafety: false,
  impactLegal: false,
  impactOperational: false,
  impactReputational: false,
  impactFinancial: false,
  impactOthers: false,
  impactOtherText: "",
  impactDescription: "",

  recommendation: "",
  notedBy: "",
  approvedBy: ""
};

function TextInput(props: {
  label: string;
  value?: string;
  required?: boolean;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-1 text-sm font-medium text-slate-700">
      {props.label}
      <input
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
        type={props.type ?? "text"}
        value={props.value ?? ""}
        required={props.required}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </label>
  );
}

function TextArea(props: {
  label: string;
  value?: string;
  required?: boolean;
  helper?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-1 text-sm font-medium text-slate-700 md:col-span-2">
      {props.label}
      {props.helper ? <span className="text-xs font-normal text-slate-500">{props.helper}</span> : null}
      <textarea
        className="min-h-28 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
        value={props.value ?? ""}
        required={props.required}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </label>
  );
}

export function IncidentForm({ onCreated }: { onCreated: (incident: Incident) => void }) {
  const [payload, setPayload] = useState<IncidentPayload>(emptyPayload);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof IncidentPayload>(key: K, value: IncidentPayload[K]) {
    setPayload((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const incident = await createIncident(payload);
      setPayload(emptyPayload);
      setMessage(`Incident submitted. Reference: ${incident.referenceNo}`);
      onCreated(incident);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit incident.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Operational Risk Incident Report</p>
        <h2 className="mt-1 text-xl font-bold text-slate-950">Submit incident report</h2>
        <p className="mt-2 text-sm text-slate-600">Fields are based on the provided OpIR template.</p>
      </div>

      {message ? <div className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">{message}</div> : null}
      {error ? <div className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</div> : null}

      <section className="grid gap-4 md:grid-cols-2">
        <h3 className="text-base font-semibold text-slate-900 md:col-span-2">Reported by</h3>
        <TextInput label="Name" value={payload.reportedByName} required onChange={(value) => update("reportedByName", value)} />
        <TextInput label="Position" value={payload.reporterPosition} onChange={(value) => update("reporterPosition", value)} />
        <TextInput label="Department" value={payload.reporterDepartment} onChange={(value) => update("reporterDepartment", value)} />
        <TextInput label="Site" value={payload.reporterSite} onChange={(value) => update("reporterSite", value)} />
        <TextInput label="Date" type="date" value={payload.reportDate} onChange={(value) => update("reportDate", value)} />
        <TextInput label="Time" type="time" value={payload.reportTime} onChange={(value) => update("reportTime", value)} />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <h3 className="text-base font-semibold text-slate-900 md:col-span-2">Incident details</h3>
        <label className="grid gap-1 text-sm font-medium text-slate-700 md:col-span-2">
          Classification of incident
          <select
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
            value={payload.classification}
            onChange={(event) => update("classification", event.target.value as IncidentClassification)}
          >
            {incidentClassificationOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        {payload.classification === "OTHERS" ? (
          <TextInput label="Others classification" value={payload.classificationOtherText} required onChange={(value) => update("classificationOtherText", value)} />
        ) : null}
        <TextInput label="Location / Site" value={payload.incidentSite} onChange={(value) => update("incidentSite", value)} />
        <TextInput label="Area" value={payload.incidentArea} onChange={(value) => update("incidentArea", value)} />
        <TextInput label="Incident date" type="date" value={payload.incidentDate} onChange={(value) => update("incidentDate", value)} />
        <TextInput label="Incident time" type="time" value={payload.incidentTime} onChange={(value) => update("incidentTime", value)} />
        <TextArea
          label="Description of incident"
          helper="Who / What / Where / When / Why / How"
          value={payload.description}
          required
          onChange={(value) => update("description", value)}
        />
        <TextArea label="Immediate action taken" value={payload.immediateActionTaken} onChange={(value) => update("immediateActionTaken", value)} />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <h3 className="text-base font-semibold text-slate-900 md:col-span-2">Report taken by</h3>
        <TextInput label="Name" value={payload.reportTakenByName} onChange={(value) => update("reportTakenByName", value)} />
        <TextInput label="Position" value={payload.reportTakenByPosition} onChange={(value) => update("reportTakenByPosition", value)} />
        <TextInput label="Date" type="date" value={payload.reportTakenDate} onChange={(value) => update("reportTakenDate", value)} />
        <TextInput label="Time" type="time" value={payload.reportTakenTime} onChange={(value) => update("reportTakenTime", value)} />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <h3 className="text-base font-semibold text-slate-900 md:col-span-2">Impact</h3>
        {impactOptions.map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={payload[key]}
              onChange={(event) => update(key, event.target.checked)}
            />
            {label}
          </label>
        ))}
        {payload.impactOthers ? (
          <TextInput label="Other impact" value={payload.impactOtherText} required onChange={(value) => update("impactOtherText", value)} />
        ) : null}
        <TextArea label="Description of impact" value={payload.impactDescription} onChange={(value) => update("impactDescription", value)} />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <h3 className="text-base font-semibold text-slate-900 md:col-span-2">Recommendation / further action required</h3>
        <TextArea
          label="Recommendation / action plan"
          helper="What other action plans are required? What long-term consideration should prevent recurrence?"
          value={payload.recommendation}
          onChange={(value) => update("recommendation", value)}
        />
        <TextInput label="Noted by" value={payload.notedBy} onChange={(value) => update("notedBy", value)} />
        <TextInput label="Approved by" value={payload.approvedBy} onChange={(value) => update("approvedBy", value)} />
      </section>

      <button
        className="rounded-lg bg-brand-700 px-4 py-3 font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit incident report"}
      </button>
    </form>
  );
}
