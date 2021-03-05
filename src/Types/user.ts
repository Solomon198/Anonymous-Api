import { Document } from 'mongoose';

interface User extends Document {
  userId: string;
  hash: string;
  phoneNumber: string;
  isVerified: boolean;
  salt: string;
  email: string;
  loginAttempts: number;
  attemptsDuration: any;
  tillUnlocked: any;
  /* eslint-disable */
  setPassword: (pwd: string) => void;
  validatePassword: (pwd: string) => boolean;
  isAccountLocked: () => boolean;
  lockAccount: () => void;
  /* eslint-enable */
}

export default User;
