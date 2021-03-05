import { Response, Request } from 'express';
import {
  ProcessingError,
  ProcessingSuccess,
  UnAuthorized,
} from '../../RequestStatus/status';
import { decodeJwtToken, getTokens } from '../../utills/utills';
import models from '../../models/index';

import UserType from '../../Types/user';

require('dotenv/config');

export default async function RessetPassword(
  req: Request,
  res: Response,
) {
  try {
    const { password, accessToken } = req.body as {
      password: string;
      accessToken: string;
    };

    let decode: UserType;

    try {
      decode = decodeJwtToken(accessToken) as UserType;
    } catch (e) {
      return UnAuthorized(res);
    }

    const { userId } = decode;

    const getDoc = await models.Users.findOne({
      userId,
    });

    if (!getDoc) return UnAuthorized(res);

    getDoc.setPassword(password);

    await getDoc.save();

    const tokens = getTokens(getDoc.toObject() as UserType);

    return ProcessingSuccess(res, tokens);
  } catch (error: any) {
    return ProcessingError(res);
  }
}
