import { z } from "zod";

export const incidentClassificationValues = [
  "ATTEMPTED_THEFT_PILFERAGE",
  "PHYSICAL_INJURY",
  "BEHAVIORAL_CONCERN",
  "SAFETY_VIOLATION",
  "DAMAGE_TO_PROPERTY",
  "THEFT_PILFERAGE",
  "ENVIRONMENT_CONCERN",
  "TRESPASSING",
  "MALICIOUS_MISCHIEF",
  "VEHICULAR_ACCIDENT",
  "OPERATIONAL_PROCEDURE",
  "OTHERS"
] as const;

export const incidentStatusValues = ["PENDING", "OPEN", "CLOSED"] as const;

const optionalText = z.string().trim().optional().nullable().transform((value) => value || undefined);
const requiredText = z.string().trim().min(1);
const optionalDate = z.string().trim().optional().nullable().transform((value) => value || undefined);

export const createIncidentSchema = z.object({
  reportedByName: requiredText,
  reporterPosition: optionalText,
  reporterDepartment: optionalText,
  reporterSite: optionalText,
  reportDate: optionalDate,
  reportTime: optionalText,

  classification: z.enum(incidentClassificationValues),
  classificationOtherText: optionalText,
  incidentSite: optionalText,
  incidentArea: optionalText,
  incidentDate: optionalDate,
  incidentTime: optionalText,
  description: requiredText,
  immediateActionTaken: optionalText,

  reportTakenByName: optionalText,
  reportTakenByPosition: optionalText,
  reportTakenDate: optionalDate,
  reportTakenTime: optionalText,

  impactHealthSafety: z.boolean().default(false),
  impactLegal: z.boolean().default(false),
  impactOperational: z.boolean().default(false),
  impactReputational: z.boolean().default(false),
  impactFinancial: z.boolean().default(false),
  impactOthers: z.boolean().default(false),
  impactOtherText: optionalText,
  impactDescription: optionalText,

  recommendation: optionalText,
  notedBy: optionalText,
  approvedBy: optionalText
}).superRefine((value, context) => {
  if (value.classification === "OTHERS" && !value.classificationOtherText) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["classificationOtherText"],
      message: "classificationOtherText is required when classification is OTHERS."
    });
  }

  if (value.impactOthers && !value.impactOtherText) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["impactOtherText"],
      message: "impactOtherText is required when impactOthers is selected."
    });
  }
});

export const updateIncidentStatusSchema = z.object({
  status: z.enum(incidentStatusValues),
  statusNotes: optionalText
});

export const incidentListQuerySchema = z.object({
  status: z.enum(incidentStatusValues).optional(),
  classification: z.enum(incidentClassificationValues).optional(),
  search: z.string().trim().optional(),
  take: z.coerce.number().int().min(1).max(100).default(50),
  skip: z.coerce.number().int().min(0).default(0)
});

export type CreateIncidentInput = z.infer<typeof createIncidentSchema>;
export type UpdateIncidentStatusInput = z.infer<typeof updateIncidentStatusSchema>;
export type IncidentListQuery = z.infer<typeof incidentListQuerySchema>;
