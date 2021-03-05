const INVALID_PASSWORD =
  'password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters';

const INVALID_CREDENTIALS =
  'The credentials provided is invalid please check the credentials and retry.';

const USER_SUSPENDED =
  'A failed suspicious attempt was detected in accessing your account please retry after some time.';

const MAX_PIN_TRIAL =
  'Maximum trial for pin exceeded, make sure you have the valid credential and request another pin';

const PIN_NOT_TIMED_OUT =
  'Mulitiple request detected to verify a single account please try after some time.';

const INCORRECT_PASSWORD = 'Incorrect password please try again.';

const USER_EXIST = 'User exist';

const SERVER_ERROR =
  'An unexpected error is preventing the server from processing the request please try again later.';

const UNAUTHORIZED =
  'The user is not authorized to access this resource, please make sure the accessToken is valid and the user credential valid';

const UNVERIFIED_ACCOUNT =
  'This account is not verified, please verify account before attempting to use this account.';

const USER_NOT_EXIST = 'The user does not exist';
export default {
  INVALID_PASSWORD,
  INVALID_CREDENTIALS,
  USER_SUSPENDED,
  MAX_PIN_TRIAL,
  PIN_NOT_TIMED_OUT,
  INCORRECT_PASSWORD,
  USER_EXIST,
  USER_NOT_EXIST,
  SERVER_ERROR,
  UNAUTHORIZED,
  UNVERIFIED_ACCOUNT,
};
