import { Request, Response } from 'express';
import {
  ProcessingError,
  ProcessingSuccess,
  UserDoesNotExist,
} from '../../RequestStatus/status';
import models from '../../models';

export default async function GetUser(req: Request, res: Response) {
  try {
    const { uid } = req.params as { uid: string };

    const findUser = await models.Profile.findOne({ userId: uid });

    if (!findUser) return UserDoesNotExist(res);

    const user = findUser.toObject();

    return ProcessingSuccess(res, user);
  } catch (e) {
    ProcessingError(res);
  }
}

export function Fix() {}
