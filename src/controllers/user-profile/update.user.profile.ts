import { Request, Response } from 'express';
import { Types } from 'mongoose';
import {
  ProcessingError,
  ProcessingSuccess,
  UserDoesNotExist,
} from '../../RequestStatus/status';
import models from '../../models';
import User from '../../Types/user';

export default async function UpdateUserProfile(
  req: Request,
  res: Response,
) {
  try {
    const { userId, updates } = req.body as {
      userId: string;
      updates: User;
    };

    const $UID = new Types.ObjectId(userId);
    const $user = await models.Profile.findByIdAndUpdate(
      $UID,
      updates,
    );

    if (!$user) return UserDoesNotExist(res);

    return ProcessingSuccess(res, $user);
  } catch (e) {
    console.log(e);
    ProcessingError(res);
  }
}
