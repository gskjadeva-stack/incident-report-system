import { Router } from "express";
import {
  createIncidentHandler,
  getIncidentHandler,
  listIncidentsHandler,
  updateIncidentStatusHandler
} from "../controllers/incidents.controller.js";

export const incidentsRouter = Router();

incidentsRouter.post("/", createIncidentHandler);
incidentsRouter.get("/", listIncidentsHandler);
incidentsRouter.get("/:id", getIncidentHandler);
incidentsRouter.patch("/:id/status", updateIncidentStatusHandler);
