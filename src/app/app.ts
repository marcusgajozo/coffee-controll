import "express-async-errors";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import schedule from "node-schedule";
import swaggerUi from "swagger-ui-express";

import { planRouter } from "./routers/planRouter";
import { myDataSource } from "../database/data-source";
import { signatureRouter } from "./routers/signatureRouter";
import { disableExpiredSubscriptions } from "./tasks/disableExpiredSubscriptions";
import swaggerDocs from "../swagger.json";

export const app = express();

// establish database connection
myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err: any) => {
    console.error("Error during Data Source initialization:", err);
  });

// Verifica se tem assinaturas expiradas
schedule.scheduleJob("0 0 * * *", () => {
  console.log("Verificando assinaturas expiradas...");
  disableExpiredSubscriptions();
});

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(morgan("tiny"));

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use("/plans/", planRouter);

app.use("/signature/", signatureRouter);
