import { Router } from 'express';
import AuthenticationControllers from '../controllers/authentication';
import Validator from '../Validators/authentication/index';
import Constants from '../constants/index';

const TokenRoute = Router();
const { TOKEN_MANAGEMEN_BASE_SUBT } = Constants.RoutesSubs;

TokenRoute.post(
  TOKEN_MANAGEMEN_BASE_SUBT,
  Validator.CreateRefreshTokenValidator,
  AuthenticationControllers.RefreshToken,
);
export default TokenRoute;
