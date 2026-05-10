import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import { attachUserIfPresent } from "./middleware/auth.js";
import { healthRouter } from "./routes/health.routes.js";
import { incidentsRouter } from "./routes/incidents.routes.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json({ limit: "1mb" }));
app.use(attachUserIfPresent);

app.use("/health", healthRouter);
app.use("/incidents", incidentsRouter);

app.use((_request, response) => {
  response.status(404).json({ error: { message: "Route not found." } });
});

app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  console.error(error);
  response.status(500).json({ error: { message: "Internal server error." } });
});

app.listen(env.PORT, () => {
  console.log(`Incident Report API listening on port ${env.PORT}`);
});
