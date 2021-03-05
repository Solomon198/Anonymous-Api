import { Response } from 'express';
import STATUS_CODES from './codes';
import Constants from '../constants/index';

// VALIDATING INPUT
export const InvalidInputs = (res: Response, inputType?: string) => {
  res.status(STATUS_CODES.BAD_REQUEST.CODE).json({
    message: inputType,
    error: Constants.RequestResponse.InvalidInput,
  });
};

// PROCESSING ERROR
export const ProcessingError = (res: Response) => {
  res.status(STATUS_CODES.INTERNAL_SERVER_ERROR.CODE).json({
    message: STATUS_CODES.INTERNAL_SERVER_ERROR.STATUS_TEXT,
    error: Constants.RequestResponse.ServerError,
  });
};

// PROCESSING SUCCESS
export const ProcessingSuccess = (res: Response, data: any) => {
  res.status(STATUS_CODES.OK.CODE).json({
    message: STATUS_CODES.OK.STATUS_TEXT,
    payload: data,
  });
};
// AUTH

// UNAUTHORIZED
export const UnAuthorized = (res: Response) => {
  res.status(STATUS_CODES.UNAUTHORIZED.CODE).json({
    error: Constants.RequestResponse.UnAuthorizedRequest,
    message: STATUS_CODES.UNAUTHORIZED.STATUS_TEXT,
  });
};

// resource created
export const ResourceCreated = (res: Response, data: any) => {
  res.status(STATUS_CODES.OK.CODE).json({
    message: STATUS_CODES.OK.STATUS_TEXT,
    payload: data,
  });
};

// resource created
export const RecommendationAreadyExist = (res: Response) => {
  res.status(STATUS_CODES.CONFLICT.CODE).json({
    message: STATUS_CODES.CONFLICT.STATUS_TEXT,
  });
};

// SUSPENDS USER
export const SuspendUser = (res: Response) => {
  res.status(STATUS_CODES.FORBIDDEN.CODE).json({
    message: Constants.Validations.USER_SUSPENDED,
    error: Constants.RequestResponse.UserSuspended,
  });
};

// LOGIN SUCCESS
export const LoginSuccess = (
  res: Response,
  accessToken: string,
  refreshToken: string,
  userId: string,
) => {
  res.status(STATUS_CODES.OK.CODE).json({
    statusText: STATUS_CODES.OK.STATUS_TEXT,
    message: Constants.RequestResponse.LoginSuccess,
    accessToken,
    refreshToken,
    userId,
  });
};

// INVALID CREDENTIALS
export const InvalidCredential = (res: Response) => {
  res.status(STATUS_CODES.FORBIDDEN.CODE).json({
    message: Constants.Validations.INVALID_CREDENTIALS,
    error: Constants.RequestResponse.InvalidCredential,
  });
};

// last pin request not timout for USER
export const LastPinNotTimout = (res: Response) => {
  res.status(STATUS_CODES.FORBIDDEN.CODE).json({
    message: Constants.Validations.PIN_NOT_TIMED_OUT,
    error: Constants.RequestResponse.PinNotTimeOut,
  });
};

// Max pin exceeded by USER
export const MaxPinTrialExceeded = (res: Response) => {
  res.status(STATUS_CODES.FORBIDDEN.CODE).json({
    message: Constants.Validations.MAX_PIN_TRIAL,
    error: Constants.RequestResponse.MAX_TRIALS_EXCEEDED,
  });
};

// signup Failure
export const UserDoesNotExist = (res: Response) => {
  res.status(STATUS_CODES.NOT_FOUND.CODE).json({
    message: Constants.Validations.USER_NOT_EXIST,
    error: Constants.RequestResponse.UserNotFound,
  });
};

// signup Failure
export const UserExist = (res: Response) => {
  res.status(STATUS_CODES.CONFLICT.CODE).json({
    message: Constants.Validations.USER_EXIST,
    error: Constants.RequestResponse.UserExist,
  });
};

// invalid Account
export const UnVerifiedAccount = (res: Response) => {
  res.status(STATUS_CODES.INVALID_ACCOUNT.CODE).json({
    message: Constants.Validations.UNVERIFIED_ACCOUNT,
    error: Constants.RequestResponse.AccountNotVerified,
  });
};
