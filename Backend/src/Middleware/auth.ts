import { NextFunction, Request, Response, request } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthRequest, IUser } from "../types/types";

dotenv.config();
const JWT_KEY = process.env.JWT_SECRET || "jwt_secret_key";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY) as IUser;

    (req as AuthRequest).user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ error: "Forbidden" });
  }
};
