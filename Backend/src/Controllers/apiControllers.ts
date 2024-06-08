import {
  exhibitSchema,
  id,
  loginSchema,
  userSchema,
} from "../validations/schemas";
import {
  authenticateUser,
  createExhibit,
  deleteExhibit,
  getAllExhibits,
  registerUser,
} from "../Models/Models";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../Errors/Errors";
import { AuthRequest, ILogin } from "../types/types";

export const createExhibitsController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = exhibitSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const result = await createExhibit(req as AuthRequest, next);
    res.status(201).send(result);
  } catch (e) {
    next(e);
  }
};

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const result = await registerUser(value, next);
  return res.status(201).json(result);
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) throw new ValidationError("Invalid request");

    const result = await authenticateUser(value as ILogin, next);
    return res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};

export const getAllExhibitsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getAllExhibits(next);
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const deleteExhibitController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = id.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const result = await deleteExhibit(req, next);
  if (result) res.status(200).send("Done");
};
