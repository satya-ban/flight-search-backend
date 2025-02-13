import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const searchSchema = Joi.object({
  origin: Joi.string().required(),
  destination: Joi.string().required(),
  departureDate: Joi.string().isoDate().required(),
  passengers: Joi.number().min(1).required(),
  returnDate: Joi.string().optional()
});

export const validateSearch = (req: Request, res: Response, next: NextFunction): Response | any => {
  const { error } = searchSchema.validate(req.query);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
}
