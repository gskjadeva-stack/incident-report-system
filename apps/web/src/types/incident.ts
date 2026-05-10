export const incidentClassificationOptions = [
  { value: "ATTEMPTED_THEFT_PILFERAGE", label: "Attempted Theft / Pilferage" },
  { value: "PHYSICAL_INJURY", label: "Physical Injury" },
  { value: "BEHAVIORAL_CONCERN", label: "Behavioral Concern (including threat to person)" },
  { value: "SAFETY_VIOLATION", label: "Safety Violation" },
  { value: "DAMAGE_TO_PROPERTY", label: "Damage to Property" },
  { value: "THEFT_PILFERAGE", label: "Theft / Pilferage" },
  { value: "ENVIRONMENT_CONCERN", label: "Environment Concern" },
  { value: "TRESPASSING", label: "Trespassing" },
  { value: "MALICIOUS_MISCHIEF", label: "Malicious Mischief" },
  { value: "VEHICULAR_ACCIDENT", label: "Vehicular Accident" },
  { value: "OPERATIONAL_PROCEDURE", label: "Operational Procedure" },
  { value: "OTHERS", label: "Others" }
] as const;

export const incidentStatusOptions = ["PENDING", "OPEN", "CLOSED"] as const;

export type IncidentClassification = typeof incidentClassificationOptions[number]["value"];
export type IncidentStatus = typeof incidentStatusOptions[number];

export type IncidentPayload = {
  reportedByName: string;
  reporterPosition?: string;
  reporterDepartment?: string;
  reporterSite?: string;
  reportDate?: string;
  reportTime?: string;

  classification: IncidentClassification;
  classificationOtherText?: string;
  incidentSite?: string;
  incidentArea?: string;
  incidentDate?: string;
  incidentTime?: string;
  description: string;
  immediateActionTaken?: string;

  reportTakenByName?: string;
  reportTakenByPosition?: string;
  reportTakenDate?: string;
  reportTakenTime?: string;

  impactHealthSafety: boolean;
  impactLegal: boolean;
  impactOperational: boolean;
  impactReputational: boolean;
  impactFinancial: boolean;
  impactOthers: boolean;
  impactOtherText?: string;
  impactDescription?: string;

  recommendation?: string;
  notedBy?: string;
  approvedBy?: string;
};

export type Incident = IncidentPayload & {
  id: string;
  referenceNo: string;
  status: IncidentStatus;
  statusNotes?: string | null;
  closedAt?: string | null;
  submittedByUserId?: string | null;
  submittedByEmail?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type IncidentListResponse = {
  items: Incident[];
  total: number;
  take: number;
  skip: number;
};
