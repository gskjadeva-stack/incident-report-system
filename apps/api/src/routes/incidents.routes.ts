import { Router, type NextFunction, type Request, type RequestHandler, type Response } from "express";
import {
  createIncidentHandler,
  getIncidentHandler,
  listIncidentsHandler,
  updateIncidentStatusHandler
} from "../controllers/incidents.controller.js";

export const incidentsRouter = Router();

type AsyncRouteHandler = (request: Request, response: Response, next: NextFunction) => Promise<unknown>;

function asyncHandler(handler: AsyncRouteHandler): RequestHandler {
  return (request, response, next) => {
    Promise.resolve(handler(request, response, next)).catch(next);
  };
}

incidentsRouter.post("/", asyncHandler(createIncidentHandler));
incidentsRouter.get("/", asyncHandler(listIncidentsHandler));
incidentsRouter.get("/:id", asyncHandler(getIncidentHandler));
incidentsRouter.patch("/:id/status", asyncHandler(updateIncidentStatusHandler));
