import * as joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import {
  InvalidInputs,
  ProcessingError,
} from '../../RequestStatus/status';
import Constants from '../../constants/index';

const requestBodySchema = joi.object({
  phoneNumber: joi.string().required().min(8),
  countryCode: joi.string().length(2).required(),
  password: joi
    .string()
    .pattern(new RegExp(/^[A-Za-z]\w{7,14}$/))
    .required()
    .error(new Error(Constants.Validations.INVALID_PASSWORD)),
});

export default function ValidateSignUpMiddleWare(
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
