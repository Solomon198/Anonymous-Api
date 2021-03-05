import { Router } from 'express';
import VerificationControllers from '../controllers/verification';
import Validator from '../Validators/verification/index';
import Constants from '../constants/index';

const VerificationRoute = Router();
const {
  VERIFICATION_CALL_BASE_SUB,
  VERIFICATION_CODE_BASE_SUB,
  VERIFICATION_SMS_BASE_SUB,
} = Constants.RoutesSubs;

VerificationRoute.post(
  VERIFICATION_CALL_BASE_SUB,
  Validator.CreatePhoneValidator,
  VerificationControllers.Verification.SinchCall,
);

VerificationRoute.post(
  VERIFICATION_SMS_BASE_SUB,
  Validator.CreatePhoneValidator,
  VerificationControllers.Verification.SinchSMS,
);

VerificationRoute.post(
  VERIFICATION_CODE_BASE_SUB,
  VerificationControllers.Verification.verifyCode,
);

export default VerificationRoute;
