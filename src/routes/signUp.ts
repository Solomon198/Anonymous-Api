import { Router } from 'express';
import AuthenticationControllers from '../controllers/authentication';
import Validator from '../Validators/authentication/index';
import Constants from '../constants/index';
import { HandleDuplicateSignUpMiddleWare } from '../Middlewares/signUp';

const SignupRoute = Router();
const { SIGNUP_BASE_SUB } = Constants.RoutesSubs;

SignupRoute.post(
  SIGNUP_BASE_SUB,
  Validator.CreateSignupUserValidator,
  HandleDuplicateSignUpMiddleWare,
  AuthenticationControllers.CreateSignup,
);

export default SignupRoute;
