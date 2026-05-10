import { Prisma, type IncidentStatus } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { prisma } from "../lib/prisma.js";
import type { CreateIncidentInput, IncidentListQuery, UpdateIncidentStatusInput } from "../validators/incident.schema.js";

function toNullableDate(value?: string) {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function generateReferenceNo() {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replaceAll("-", "");
  const timePart = String(now.getTime()).slice(-6);
  const suffix = randomUUID().slice(0, 8).toUpperCase();
  return `IR-${datePart}-${timePart}-${suffix}`;
}

export async function createIncident(input: CreateIncidentInput, submittedBy?: { id: string; email?: string }) {
  return prisma.incident.create({
    data: {
      referenceNo: generateReferenceNo(),

      reportedByName: input.reportedByName,
      reporterPosition: input.reporterPosition,
      reporterDepartment: input.reporterDepartment,
      reporterSite: input.reporterSite,
      reportDate: toNullableDate(input.reportDate),
      reportTime: input.reportTime,

      classification: input.classification,
      classificationOtherText: input.classificationOtherText,
      incidentSite: input.incidentSite,
      incidentArea: input.incidentArea,
      incidentDate: toNullableDate(input.incidentDate),
      incidentTime: input.incidentTime,
      description: input.description,
      immediateActionTaken: input.immediateActionTaken,

      reportTakenByName: input.reportTakenByName,
      reportTakenByPosition: input.reportTakenByPosition,
      reportTakenDate: toNullableDate(input.reportTakenDate),
      reportTakenTime: input.reportTakenTime,

      impactHealthSafety: input.impactHealthSafety,
      impactLegal: input.impactLegal,
      impactOperational: input.impactOperational,
      impactReputational: input.impactReputational,
      impactFinancial: input.impactFinancial,
      impactOthers: input.impactOthers,
      impactOtherText: input.impactOtherText,
      impactDescription: input.impactDescription,

      recommendation: input.recommendation,
      notedBy: input.notedBy,
      approvedBy: input.approvedBy,

      submittedByUserId: submittedBy?.id,
      submittedByEmail: submittedBy?.email
    }
  });
}

export async function listIncidents(query: IncidentListQuery) {
  const where: Prisma.IncidentWhereInput = {
    status: query.status,
    classification: query.classification
  };

  if (query.search) {
    where.OR = [
      { referenceNo: { contains: query.search, mode: "insensitive" } },
      { reportedByName: { contains: query.search, mode: "insensitive" } },
      { incidentSite: { contains: query.search, mode: "insensitive" } },
      { incidentArea: { contains: query.search, mode: "insensitive" } },
      { description: { contains: query.search, mode: "insensitive" } }
    ];
  }

  const [items, total] = await prisma.$transaction([
    prisma.incident.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: query.take,
      skip: query.skip
    }),
    prisma.incident.count({ where })
  ]);

  return { items, total, take: query.take, skip: query.skip };
}

export async function getIncidentById(id: string) {
  return prisma.incident.findUnique({ where: { id } });
}

export async function updateIncidentStatus(id: string, input: UpdateIncidentStatusInput) {
  const status = input.status as IncidentStatus;

  return prisma.incident.update({
    where: { id },
    data: {
      status,
      statusNotes: input.statusNotes,
      closedAt: status === "CLOSED" ? new Date() : null
    }
  });
}
