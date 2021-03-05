import { Request, Response } from 'express';
import { Types } from 'mongoose';
import {
  ProcessingError,
  InvalidInputs,
  ProcessingSuccess,
} from '../../RequestStatus/status';
import models from '../../models';

type SignUpData = {
  firstName: string;
  lastName: string;
  sex: string;
  phoneNumber: string;
  userId: string;
};
export default async function CreateProfile(
  req: Request,
  res: Response,
) {
  try {
    const userVerifiedPhoneNumber = res.locals.phoneNumber;
    const phoneNumber = userVerifiedPhoneNumber as string;
    // validating input
    const {
      firstName,
      lastName,
      sex,
      userId,
    } = req.body as SignUpData;

    // checking if user exist

    const NewProfile = new models.Profile();

    try {
      NewProfile.setSex(sex); // throws error if sex is not male or female
    } catch (e) {
      return InvalidInputs(res);
    }

    NewProfile._id = new Types.ObjectId(userId); //eslint-disable-line
    NewProfile.firstName = firstName;
    NewProfile.lastName = lastName;
    NewProfile.sex = sex;
    NewProfile.phoneNumber = phoneNumber;
    NewProfile.userId = new Types.ObjectId(userId);

    const savedProfile = await NewProfile.save({
      validateBeforeSave: false,
    });

    return ProcessingSuccess(res, savedProfile);
  } catch (e) {
    console.log(e);
    ProcessingError(res);
  }
}
