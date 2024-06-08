import express, { Request, Response, Application, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
  createExhibitsController,
  deleteExhibitController,
  getAllExhibitsController,
  loginController,
  registerController,
} from "./Controllers/apiControllers";
import { PrismaError, ValidationError } from "./Errors/Errors";
import { authenticate } from "./Middleware/auth";

dotenv.config();

const env = process.env;
const app: Application = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

const port = process.env.PORT || 3000;

app.post("/api/register", registerController);
app.post("/api/login", loginController);
app.post("/api/exhibits", authenticate, createExhibitsController);
app.post("/api/exhibits/delete", authenticate, deleteExhibitController);
app.get("/api/exhibits", getAllExhibitsController);

app.get("*", (req: Request, res: Response) =>
  res.status(404).json({ error: "Not found" })
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof PrismaError) {
    if (err.code === "Create") {
      return res.status(422).json({
        error:
          err.message ?? "Could not create exhibit, please try again later",
      });
    }
  }
  next(err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof PrismaError) {
    if (err.code === "Find") {
      return res.status(500).json({ error: "Error fetching exhibit(s)" });
    }
  }
  next(err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return res
    .status(500)
    .json({ error: err.message ?? "Oops, something went wrong!" });
});

app.listen(port, () => {
  console.log("Server running on: " + port);
});
