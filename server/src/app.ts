import express, { Express } from "express";
import cors from "cors";
import routes from "./routes";
import { WEBSITE_URL } from "./config";

// Creates an Express application
const app: Express = express();

// Mounts middleware
const corsOptions: { origin: string } = {
  origin: WEBSITE_URL!,
};
app.use(cors(corsOptions));
app.use(express.json());

// Mounts our routes
app.use("/api", routes);

export default app;
