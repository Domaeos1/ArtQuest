import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type PrismaErrorCodes = "Create" | "Delete" | "Update" | "Find";
export interface IPrismaError {
  code: PrismaErrorCodes;
}

export interface IOverviewObject {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string | null;
}

export interface IUser {
  user: string;
  id: string;
  token?: JwtPayload | string;
}

export interface AuthRequest extends Request {
  user?: IUser;
}

export interface IRegister {
  user: string;
  password: string;
  email: string;
}

export interface ILogin {
  identifier: string;
  password: string;
}
