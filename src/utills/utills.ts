import * as jwt from 'jsonwebtoken';
import {
  PhoneNumberFormat as PNF,
  PhoneNumberUtil,
} from 'google-libphonenumber';

import * as fs from 'fs';
import models from '../models/index';
import constants from '../constants/index';
import userType from '../Types/user';
import Configs from '../core/enivronment.config';

const privateKey = fs.readFileSync(
  `${process.env.INIT_CWD}/private.key`,
  'utf-8',
);
const publicKey = fs.readFileSync(
  `${process.env.INIT_CWD}/public.key`,
  'utf-8',
);

require('dotenv/config');

const { JWT_ALGO } = Configs();

export function encodeToJwtToken(
  data: any,
  expire?: number | string,
) {
  const signOptions: jwt.SignOptions = {
    algorithm: JWT_ALGO as jwt.Algorithm,
  };
  if (expire) {
    signOptions.expiresIn = expire;
  }

  try {
    const token = jwt.sign(data, privateKey, signOptions);
    return token;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export function decodeJwtToken(token: string) {
  try {
    const verified = jwt.verify(token, publicKey, {
      algorithms: [JWT_ALGO as jwt.Algorithm],
    });
    if (verified instanceof Error) {
      const response = verified as jwt.TokenExpiredError;
      throw new Error(response.message);
    }

    return verified;
  } catch (err) {
    const error = err as jwt.TokenExpiredError;
    throw error;
  }
}

export function getTokens(userCreds: userType) {
  try {
    const accessToken = encodeToJwtToken(
      {
        userId: userCreds,
      },
      constants.TokenExpiry.ACCESS_TOKENS,
    );
    const refreshToken = encodeToJwtToken(userCreds);

    return { accessToken, refreshToken };
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export function GeneratePin() {
  return (Math.floor(Math.random() * 10000) + 10000)
    .toString()
    .substring(1)
    .split('')
    .join(',');
}

export async function getPhoneNumberInfo(
  phone: string,
  countryCode: string,
) {
  try {
    // Get an instance of `PhoneNumberUtil`.
    const phoneUtil = PhoneNumberUtil.getInstance();

    // Parse number with country code and keep raw input.
    const number = phoneUtil.parseAndKeepRawInput(phone, countryCode);

    // Print the phone's
    const phoneNumber = phoneUtil.format(number, PNF.E164);

    return phoneNumber;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function phoneNumberExist(phoneNumber: string) {
  try {
    const doc = await models.Users.findOne({
      phoneNumber,
    });

    if (doc) {
      return true;
    }
    return false;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export function CheckPassword(pwd) {
  const passw = /^[A-Za-z]\w{7,14}$/;

  if (passw.test(pwd)) {
    return true;
  }
  return false;
}
