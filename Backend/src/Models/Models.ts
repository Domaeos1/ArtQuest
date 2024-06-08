import { PrismaClient } from "@prisma/client";
import { NextFunction, Request } from "express";
import { PrismaError, ValidationError } from "../Errors/Errors";
import {
  AuthRequest,
  ILogin,
  IOverviewObject,
  IRegister,
  IUser,
} from "../types/types";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
const JWT_KEY = process.env.JWT_SECRET || "jwt_secret_key";

const prisma = new PrismaClient();
const createToken = (user: string, id: string) => {
  const token = jwt.sign({ user, id }, JWT_KEY, {
    expiresIn: "2 days",
  });
  return token;
};

prisma.$use(async (params, next) => {
  if (params.model === "User") {
    if (params.action === "create" || params.action === "update") {
      const user = params.args.data;
      if (user.password) {
        const hashedPass = await bcrypt.hash(user.password, 10);
        user.password = hashedPass;
      }
    }
  }
  return next(params);
});

export async function createExhibit(
  req: AuthRequest,
  next: NextFunction
): Promise<IOverviewObject | void> {
  try {
    if (req.user?.id) {
      const result = await prisma.exhibit.create({
        data: {
          description: req.body.description,
          name: req.body.title,
          ownerID: req.user.id,
        },
      });
      return result;
    } else {
      throw new Error("Cant authenticate user");
    }
  } catch (e) {
    next(new PrismaError("Create"));
  }
  return Promise.reject(new PrismaError("Create", "Turned off"));
}

export async function registerUser(value: IRegister, next: NextFunction) {
  try {
    const { password, user, email } = value;
    const userCheck = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (userCheck) throw new Error("Username exists");
    const emailCheck = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (emailCheck) throw new Error("Email exists");

    const newUser = await prisma.user.create({
      data: { email, user, password },
    });

    const token = createToken(newUser.user, newUser.id);

    return { user: newUser.user, id: newUser.id, token };
  } catch (e) {
    next(e);
  }
}

export async function authenticateUser(
  userData: ILogin,
  next: NextFunction
): Promise<IUser | void> {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ user: userData.identifier }, { email: userData.identifier }],
      },
    });

    if (!user) throw new ValidationError("User not found");

    const passwordCheck = bcrypt.compareSync(userData.password, user.password);

    if (!passwordCheck) throw new ValidationError("Incorrect password");

    const token = createToken(user.user, user.id);

    return { user: user.user, id: user.id, token };
  } catch (e) {
    next(e);
  }
}

export async function getAllExhibits(
  next: NextFunction
): Promise<IOverviewObject[] | void> {
  try {
    return await prisma.exhibit.findMany();
  } catch (e) {
    next(new PrismaError("Find"));
  }
}

export async function deleteExhibit(req: AuthRequest, next: NextFunction) {
  console.log(req.body.id);
  console.log(req.user?.id);
  try {
    const exhibit = await prisma.exhibit.findFirstOrThrow({
      where: { id: req.body.id },
    });
    if (exhibit.ownerID !== req.user?.id) {
      throw new Error("Exhibit does not belong to user");
    }
    return prisma.exhibit.delete({
      where: {
        id: req.body.id,
      },
    });
  } catch (e) {
    next(e);
  }
}
