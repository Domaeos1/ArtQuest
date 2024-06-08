import Joi from "joi";

export const exhibitSchema = Joi.object({
  title: Joi.string().min(2).max(50).required(),
  description: Joi.string().max(250),
});

export const id = Joi.object({
  id: Joi.string().required(),
});

export const userSchema = Joi.object({
  user: Joi.string().alphanum().min(5).max(20).required(),
  password: Joi.string().min(8).max(255).required(),
  email: Joi.string().email().required(),
});

export const loginSchema = Joi.object({
  identifier: Joi.string()
    .pattern(/^[a-zA-Z0-9@_\-~.]+$/)
    .min(5)
    .max(20)
    .required(),
  password: Joi.string().min(6).required(),
});
