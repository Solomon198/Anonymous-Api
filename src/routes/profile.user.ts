import { Router } from 'express';
import ProfileControllers from '../controllers/user-profile/index';
import constants from '../constants/index';
import { HandleDuplicateProfileUpMiddleWare } from '../Middlewares/profile.duplicate.handle';
import Validator from '../Validators/user-profile/index';

const { PROFILE, GET_PROFILE } = constants.RoutesSubs;
const ProfileRoute = Router();

ProfileRoute.get(
  GET_PROFILE,
  Validator.GetUserValidator,
  ProfileControllers.GetUser,
);

ProfileRoute.post(
  PROFILE,
  Validator.CreateUserValidator,
  HandleDuplicateProfileUpMiddleWare,
  ProfileControllers.CreateUser,
);

ProfileRoute.put(
  PROFILE,
  Validator.UpdateUserValidator,
  ProfileControllers.UpdateUser,
);

export default ProfileRoute;
