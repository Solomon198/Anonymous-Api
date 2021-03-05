import { Router } from 'express';
import AuthenticationControllers from '../controllers/authentication';
import Validator from '../Validators/authentication/index';
import Constants from '../constants/index';
import { HandleUnverifiedAccount } from '../Middlewares/login';

const LoginRoute = Router();
const { LOGIN_BASE_SUB } = Constants.RoutesSubs;

LoginRoute.post(
  LOGIN_BASE_SUB,
  Validator.CreateLoginUserValidator,
  HandleUnverifiedAccount,
  AuthenticationControllers.CreateLogin,
);

export default LoginRoute;
