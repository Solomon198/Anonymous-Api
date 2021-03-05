import * as joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import {
  InvalidInputs,
  ProcessingError,
} from '../../RequestStatus/status';

const requestBodySchema = joi.object({
  userId: joi.string().required(),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  sex: joi.string().required(),
  phoneNumber: joi.string().required(),
  countryCode: joi.string().required(),
});

export default function ValidateCreateUserMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { error } = requestBodySchema.validate(req.body);
    if (error) {
      return InvalidInputs(res, error.message);
    }
    next();
  } catch (e) {
    return ProcessingError(res);
  }
}
