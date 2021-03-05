import { Response, Request } from 'express';
import * as sinchRequest from 'sinch-request';
import * as https from 'https';
import * as moment from 'moment';
import {
  InvalidInputs,
  ProcessingError,
  ProcessingSuccess,
  UnAuthorized,
  InvalidCredential,
  LastPinNotTimout,
  MaxPinTrialExceeded,
} from '../../RequestStatus/status';
import {
  getPhoneNumberInfo,
  phoneNumberExist,
  GeneratePin,
  encodeToJwtToken,
  decodeJwtToken,
  getTokens,
} from '../../utills/utills';
import models from '../../models/index';
import { NumverifyResponseType } from '../../Types/numverifyResponse';
import Constants from '../../constants/index';
import User from '../../Types/user';

require('dotenv/config');

const creds = {
  key: process.env.SINCH_KEY,
  secret: process.env.SINCH_SECRET,
};

export async function SinchCall(req: Request, res: Response) {
  const { phoneNumber, countryCode } = req.body as {
    phoneNumber: string;
    countryCode: string;
  };

  if (!phoneNumber || !countryCode) return InvalidInputs(res);
  try {
    const intlFormat = await getPhoneNumberInfo(
      phoneNumber,
      countryCode,
    );

    const PhoneNumberExist = await phoneNumberExist(intlFormat);

    if (!PhoneNumberExist) return InvalidCredential(res);

    // check if user have is asking for a token when 3 minutes is not exhausted yet
    const now = new Date();
    const userVerificationinfo = await models.Verification.findOne({
      phoneNumber: intlFormat,
    });
    if (userVerificationinfo) {
      if (userVerificationinfo.lastTimePinRequested) {
        if (userVerificationinfo.lastTimePinRequested > now) {
          return LastPinNotTimout(res);
        }
      }
    }

    const PIN = GeneratePin();

    const bodyData = JSON.stringify({
      method: 'ttsCallout',
      ttsCallout: {
        destination: { type: 'number', endpoint: intlFormat },
        domain: 'pstn',
        custom: 'customData',
        locale: 'en-US',
        text: `Your Hanwok pin code is, ${PIN}. Your Hanwok pin code is, ${PIN}`,
      },
    });

    const options = {
      method: 'POST',
      host: 'callingapi.sinch.com',
      port: 443,
      path: '/v1/callouts',
      data: bodyData,
    };

    const token = encodeToJwtToken(
      { intlFormat },
      Constants.TokenExpiry.VERIFICATION_TOKENS,
    );

    sinchRequest.applicationSigned(options, creds);

    await models.Verification.deleteMany({ phoneNumber: intlFormat });

    // saving credentials in secure database
    const saveCred = new models.Verification();
    saveCred.phoneNumber = intlFormat;
    saveCred.pin = PIN.split(',').join('');
    saveCred.token = token;
    saveCred.date = new Date();
    saveCred.lastTimePinRequested = moment(new Date()).add(
      Constants.Timers.TIME_BEFORE_NEXT_PIN_REQUEST,
      'minutes',
    );
    saveCred.pinTrialDuration = moment(new Date()).add(
      Constants.Timers.TIME_BEFORE_PIN_TRIAL_ELAPSE,
      'minutes',
    );

    await saveCred.save(); // save document

    if (process.env.NODE_ENV === 'production') {
      const request = https.request(options, () => {
        const result = {
          token,
        };
        return ProcessingSuccess(res, result);
      });

      request.end(options.data);
    } else {
      return ProcessingSuccess(res, {
        token,
        pin: PIN.split(',').join(''),
      });
    }
  } catch (error: any) {
    console.log(error);
    return ProcessingError(res);
  }
}

export async function SinchSMS(req: Request, res: Response) {
  const { phoneNumber, countryCode } = req.body as {
    phoneNumber: string;
    countryCode: string;
  };

  if (!phoneNumber || !countryCode) return InvalidInputs(res);
  try {
    const intlFormat = await getPhoneNumberInfo(
      phoneNumber,
      countryCode,
    );

    const PhoneNumberExist = await phoneNumberExist(intlFormat);

    if (!PhoneNumberExist) return InvalidCredential(res);

    // check if user have is asking for a token when 3 minutes is not exhausted yet
    const now = new Date();
    const userVerificationinfo = await models.Verification.findOne({
      phoneNumber: intlFormat,
    });

    if (userVerificationinfo) {
      if (userVerificationinfo.lastTimePinRequested) {
        if (userVerificationinfo.lastTimePinRequested > now) {
          return LastPinNotTimout(res);
        }
      }
    }

    const PIN = GeneratePin();

    const options = {
      method: 'POST',
      host: 'messagingapi.sinch.com',
      port: 443,
      path: `/v1/sms/${intlFormat}`,
      data: JSON.stringify({
        message: `Your Hanwok pin code is ${PIN}`,
      }), // Data to be sent in JSON format
      withCredentials: false, // Necessary for browser compatability (browserify)
    };

    const token = encodeToJwtToken(
      { intlFormat },
      Constants.TokenExpiry.VERIFICATION_TOKENS,
    );

    sinchRequest.applicationSigned(options, creds);

    await models.Verification.deleteMany({ phoneNumber });

    // saving credentials in secure database
    const saveCred = new models.Verification();
    saveCred.phoneNumber = intlFormat;
    saveCred.pin = PIN.split(',').join('');
    saveCred.token = token;
    saveCred.date = new Date();
    saveCred.lastTimePinRequested = moment(new Date()).add(
      Constants.Timers.TIME_BEFORE_NEXT_PIN_REQUEST,
      'minutes',
    );

    saveCred.pinTrialDuration = moment(new Date()).add(
      Constants.Timers.TIME_BEFORE_PIN_TRIAL_ELAPSE,
      'minutes',
    );

    await saveCred.save(); // save document

    if (process.env.NODE_ENV === 'production') {
      console.log('runing');
      const request = https.request(options, () => {
        // here you can i.e save your callid,
        const result = {
          token,
        };
        return ProcessingSuccess(res, result);
      });

      request.end(options.data);
    } else {
      console.log(PIN, token);
      ProcessingSuccess(res, {
        token,
        pin: PIN.split(',').join(''),
      });
    }
  } catch (error: any) {
    console.log(error);
    return ProcessingError(res);
  }
}

export async function verifyCode(req: Request, res: Response) {
  try {
    const { pin, token } = req.body as { pin: string; token: string };

    if (!pin || !token) return InvalidInputs(res);

    let decode: NumverifyResponseType;

    try {
      decode = decodeJwtToken(token) as NumverifyResponseType;
    } catch (e) {
      return UnAuthorized(res);
    }
    const { intlFormat } = decode;

    const getDoc = await models.Verification.findOne({
      phoneNumber: intlFormat,
    });

    let phoneNumber: string;
    let vCode: string;

    if (getDoc) {
      phoneNumber = getDoc.phoneNumber;
      vCode = getDoc.pin;
    } else {
      return UnAuthorized(res);
    }

    if (getDoc.pinTrialDuration) {
      const now = new Date();
      if (getDoc.pinTrialDuration > now) {
        if (
          getDoc.pinTrials >= Constants.Timers.MAX_PIN_TRIAL_ATTEMPTS
        ) {
          return MaxPinTrialExceeded(res);
        }
      }
    }

    if (intlFormat === phoneNumber && pin === vCode) {
      const user = await models.Users.findOneAndUpdate(
        { phoneNumber: intlFormat },
        { $set: { isVerified: true } },
        { useFindAndModify: false },
      );

      const objectifyBSON = user.toObject() as User;
      const tokens = getTokens(objectifyBSON);
      const { accessToken } = tokens;
      const { refreshToken } = tokens;
      // limit number of login per user agains brutforce attack
      return ProcessingSuccess(res, { accessToken, refreshToken });
    }

    await getDoc.incrementPinTrial();

    return UnAuthorized(res);
  } catch (error: any) {
    return ProcessingError(res);
  }
}

export default {
  SinchCall,
  SinchSMS,
  verifyCode,
};
