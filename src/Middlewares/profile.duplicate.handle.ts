import { Request, Response, NextFunction } from 'express';
import { getPhoneNumberInfo } from '../utills/utills';
import {
  ProcessingError,
  InvalidInputs,
} from '../RequestStatus/status';
import models from '../models/index';
import Constant from '../constants/index';

// checks if user tried to signup with an existing unverified account then delete the account and proceed with the signup
export async function HandleDuplicateProfileUpMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { phoneNumber, countryCode } = req.body as {
      phoneNumber: string;
      countryCode: string;
    };

    let intlFormat: string;

    try {
      intlFormat = await getPhoneNumberInfo(phoneNumber, countryCode);
    } catch (e) {
      return InvalidInputs(res);
    }

    if (!intlFormat)
      return InvalidInputs(
        res,
        Constant.RequestResponse.InvalidPhoneNumber,
      );

    res.locals.phoneNumber = intlFormat;

    const getUser = await models.Profile.findOne({
      phoneNumber: intlFormat,
    });

    if (getUser) {
      await models.Profile.deleteOne({
        phoneNumber: intlFormat,
      });
      next();
    } else {
      next();
    }
  } catch (e: any) {
    return ProcessingError(res);
  }
}

export function Fix() {}
