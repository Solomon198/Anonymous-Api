import * as joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import {
  InvalidInputs,
  ProcessingError,
} from '../../RequestStatus/status';

const mediaSchema = joi
  .object({
    url: joi.string(),
    thumbnail: joi.string(),
  })
  .optional();

const coordinatesSchema = joi
  .object({
    coordinates: joi.array().items(joi.number()),
  })
  .optional();

const requestBodySchema = joi.object({
  userId: joi.string().required(),

  updates: joi.object({
    firstName: joi.string(),
    lastName: joi.string(),
    bio: joi.string(),
    avatar: mediaSchema,
    coverPhoto: mediaSchema,
    address: joi.string(),
    businessAddress: joi.string(),
    businessAddressDescription: joi.string(),
    businessPhotos: joi.array().items(joi.string()),
    addressCoords: coordinatesSchema,
    businessAddressCoords: coordinatesSchema,
  }),
});

export default function ValidateUpdateUser(
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
