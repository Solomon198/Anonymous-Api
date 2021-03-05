import { Response, Request } from 'express';
import models from '../../models/index';
import {
  ProcessingError,
  ResourceCreated,
} from '../../RequestStatus/status';
import UserType from '../../Types/user';

export default async function CreateSignUp(
  req: Request,
  res: Response,
) {
  try {
    // get validated data from req coming from the middleware

    const userVerifiedPhoneNumber = res.locals.phoneNumber;
    const phoneNumber = userVerifiedPhoneNumber as string;
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    // create user,generate password and token
    const user = new models.Users() as UserType;
    user.phoneNumber = phoneNumber;

    /* eslint-disable */
    user.userId = user._id;
    /* eslint-enable */

    user.email = email;

    user.setPassword(password);

    const { userId } = user;

    await user.save({ validateBeforeSave: false });

    return ResourceCreated(res, userId);
  } catch (e: any) {
    console.log(e);
    return ProcessingError(res);
  }
}
