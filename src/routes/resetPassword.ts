import { Router } from 'express';
import AuthenticationControllers from '../controllers/authentication';
import Validator from '../Validators/authentication/index';
import Constants from '../constants/index';

const ResetRoute = Router();
const { RESSET_PASSWORD_BASE_SUB } = Constants.RoutesSubs;

ResetRoute.post(
  RESSET_PASSWORD_BASE_SUB,
  Validator.CreateResetPasswordValidator,
  AuthenticationControllers.CreateResetPassword,
);

export default ResetRoute;
