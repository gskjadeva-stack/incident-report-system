import type { Response } from "express";
import { Prisma } from "@prisma/client";
import type { AuthenticatedRequest } from "../middleware/auth.js";
import {
  createIncidentSchema,
  incidentListQuerySchema,
  updateIncidentStatusSchema
} from "../validators/incident.schema.js";
import {
  createIncident,
  getIncidentById,
  listIncidents,
  updateIncidentStatus
} from "../services/incidents.service.js";

function sendError(response: Response, status: number, message: string, details?: unknown) {
  response.status(status).json({ error: { message, details } });
}

export async function createIncidentHandler(request: AuthenticatedRequest, response: Response) {
  const parsed = createIncidentSchema.safeParse(request.body);

  if (!parsed.success) {
    sendError(response, 400, "Invalid incident payload.", parsed.error.flatten());
    return;
  }

  try {
    const incident = await createIncident(parsed.data, request.user);
    response.status(201).json({ data: incident });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      sendError(response, 409, "Incident reference collision. Please submit again.");
      return;
    }

    throw error;
  }
}

export async function listIncidentsHandler(request: AuthenticatedRequest, response: Response) {
  const parsed = incidentListQuerySchema.safeParse(request.query);

  if (!parsed.success) {
    sendError(response, 400, "Invalid incident query.", parsed.error.flatten());
    return;
  }

  const result = await listIncidents(parsed.data);
  response.json({ data: result });
}

export async function getIncidentHandler(request: AuthenticatedRequest, response: Response) {
  const incident = await getIncidentById(request.params.id);

  if (!incident) {
    sendError(response, 404, "Incident not found.");
    return;
  }

  response.json({ data: incident });
}

export async function updateIncidentStatusHandler(request: AuthenticatedRequest, response: Response) {
  const parsed = updateIncidentStatusSchema.safeParse(request.body);

  if (!parsed.success) {
    sendError(response, 400, "Invalid status payload.", parsed.error.flatten());
    return;
  }

  try {
    const incident = await updateIncidentStatus(request.params.id, parsed.data);
    response.json({ data: incident });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      sendError(response, 404, "Incident not found.");
      return;
    }

    throw error;
  }
}
