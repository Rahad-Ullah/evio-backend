import { Model, Types } from 'mongoose';
import { USER_GENDER, USER_ROLES, USER_STATUS } from './user.constant';

export type IUser = {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: USER_ROLES;
  phone: string;
  gender: USER_GENDER;
  dob: Date;
  occupation: string;
  address: string;
  language: string;
  religion: string;
  image?: string;
  subscription?: Types.ObjectId;
  status: USER_STATUS;
  isOnline: boolean;
  isVerified: boolean;
  isDeleted: boolean;
  authentication?: {
    isResetPassword: boolean;
    oneTimeCode: number;
    expireAt: Date;
  };
};

export type UserModal = {
  isExistUserById(id: string): any;
  isExistUserByEmail(email: string): any;
  isMatchPassword(password: string, hashPassword: string): boolean;
} & Model<IUser>;
