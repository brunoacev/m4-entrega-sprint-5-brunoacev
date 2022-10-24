import express from "express";
import { Request, Response } from "express";
import { routes } from "./routes";
import { globalErrorMiddleware } from "./middlewares/globalError.middleware";
import { AppError } from "./errors/appError";
import "express-async-errors";

const app = express();

app.use(express.json());

routes(app);

app.get("/", async (request: Request, response: Response) => {
  throw new AppError(401, "");
});

app.use(globalErrorMiddleware);

export default app;
