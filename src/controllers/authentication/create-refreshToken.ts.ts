import { Request, Response } from 'express';
import {
  ProcessingError,
  ProcessingSuccess,
  InvalidInputs,
} from '../../RequestStatus/status';
import { decodeJwtToken, getTokens } from '../../utills/utills';
import User from '../../Types/user';

export default async function RefreshAccessToken(
  req: Request,
  res: Response,
) {
  try {
    const { refreshToken } = req.body;
    try {
      const payload = decodeJwtToken(refreshToken) as User; // throws error if not valid
      const tokens = getTokens(payload);
      delete tokens.refreshToken;
      return ProcessingSuccess(res, tokens);
    } catch (e) {
      return InvalidInputs(res);
    }
  } catch (e: any) {
    ProcessingError(res);
  }
}

export function Fix() {}
