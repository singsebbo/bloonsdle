import express, { Express } from "express";
import cors from "cors";
import routes from "./routes";

// Creates an Express application
const app: Express = express();

// Mounts middleware
const corsOptions: { origin: string } = {
  origin: "http://localhost:5173",
};
app.use(cors());
app.use(express.json());

// Mounts our routes
app.use("/api", routes);

export default app;
