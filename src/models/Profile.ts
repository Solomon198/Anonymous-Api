import { Schema, model } from 'mongoose';
import Profile from '../Types/profile';

const Profiles: Schema = new Schema(
  {
    _id: Schema.Types.ObjectId,

    userId: Schema.Types.String,

    firstName: Schema.Types.String,

    lastName: Schema.Types.String,

    phoneNumber: Schema.Types.String,

    email: {
      type: Schema.Types.String,
      required: false,
      default: '',
    },

    sex: {
      type: Schema.Types.String,
      enum: ['male', 'female'],
      required: true,
    },

    bio: {
      type: Schema.Types.String,
      required: false,
      default: '',
    },

    showPhoneNumber: {
      type: Schema.Types.Boolean,
      default: true,
    },

    showEmail: {
      type: Schema.Types.Boolean,
      default: true,
    },

    avatar: {
      thumbnail: {
        type: Schema.Types.String,
        default: '',
      },
      url: {
        type: Schema.Types.String,
        default: '',
      },
    },

    coverPhoto: {
      thumbnail: {
        type: Schema.Types.String,
        default: '',
      },
      url: {
        type: Schema.Types.String,
        default: '',
      },
    },

    address: {
      type: Schema.Types.String,
      default: '',
    },

    addressCoords: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },

    businessAddressCoords: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },

    businessAddress: {
      type: Schema.Types.String,
      default: '',
    },

    businessAddressDescription: {
      type: Schema.Types.String,
      default: '',
    },

    businessPhotos: [
      {
        type: Schema.Types.String,
        default: '',
      },
    ],
  },
  { autoIndex: false },
);

Profiles.methods.setSex = function setSex(sex: string) {
  const doc = this as Profile;
  if (sex === 'male' || sex === 'female') {
    doc.sex = sex;
  } else {
    throw new Error('Invalid Gender');
  }
};

export default model<Profile>('profiles', Profiles);
