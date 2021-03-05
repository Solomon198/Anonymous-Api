import { Response, Request } from 'express';
import models from '../../models/index';
import {
  ProcessingError,
  InvalidInputs,
  SuspendUser,
  LoginSuccess,
} from '../../RequestStatus/status';
import UserType from '../../Types/user';

import { getTokens } from '../../utills/utills';

// the middlewares handle most of the checks that should have been done here
export default async function loginAccount(
  req: Request,
  res: Response,
) {
  try {
    const formattedPhoneNumber = res.locals.phoneNumber;
    const phoneNumber = formattedPhoneNumber as string;
    const { password } = req.body as {
      password: string;
    };

    const doc = await models.Users.findOne({ phoneNumber });

    if (!doc) return InvalidInputs(res);

    // return forbiddend user suspended as error if acount is locked
    if (doc.isAccountLocked()) return SuspendUser(res);

    if (doc.validatePassword(password)) {
      // credentials successful login
      const tokens = getTokens(doc.toObject() as UserType);
      const { userId } = doc;

      return LoginSuccess(
        res,
        tokens.accessToken,
        tokens.refreshToken,
        userId,
      );
    }

    doc.lockAccount();

    return InvalidInputs(res);
  } catch (e: any) {
    return ProcessingError(res);
  }
}
