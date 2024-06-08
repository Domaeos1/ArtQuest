import type { IPrismaError, PrismaErrorCodes } from "../types/types";

export class PrismaError extends Error implements IPrismaError {
  public code: PrismaErrorCodes;
  constructor(code: PrismaErrorCodes, message?: string) {
    super(message);
    this.code = code;
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
  }
}
