import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundRoute from "./app/middlewares/notFound";

import path from "path";
import { cwd } from "process";
const app: Application = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "https://bus-services-client.vercel.app",
  "https://digital-bus.ryzan.co",
  "http://digital-bus.ryzan.co",
  "https://sandbox.sslcommerz.com",
];

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Then apply the CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return; // Allow server-to-server requests
      }
      if (origin === "null") {
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/$/, ""); // remove any trailing slash

      if (allowedOrigins.includes(normalizedOrigin)) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS ${origin}`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

app.use("/api/uploads", express.static(path.join(cwd(), "uploads")));
app.use("/api", router);
app.get("/", (req: Request, res: Response) => {
  res.send("Bus is running too fast !! and giving bauli 🚌");
});

app.use(globalErrorHandler);
app.use(notFoundRoute);
export default app;
