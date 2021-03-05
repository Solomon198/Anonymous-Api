import { Document, Types } from 'mongoose';

type photo = {
  thumbnail: string;
  url: string;
};

type location = {
  latitude: string;
  longitude: string;
};

interface Profile extends Document {
  _id: Types.ObjectId; //eslint-disable-line

  userId: Types.ObjectId;

  firstName: string;

  lastName: string;

  sex: string;

  bio: string;

  phoneNumber: string;

  email: string;

  showPhoneNumber: boolean;

  showEmail: boolean;

  avatar: photo;

  coverPhoto: photo;

  address: string;

  addressCoords: location;

  businessAddressCoords: location;

  businessAddress: string;

  businessAddressDescription: string;

  businessPhotos: string[];

  setSex: (sex: string) => void; //eslint-disable-line
}

export default Profile;
