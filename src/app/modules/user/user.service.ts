import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { emailHelper } from '../../../helpers/emailHelper';
import { emailTemplate } from '../../../shared/emailTemplate';
import unlinkFile from '../../../shared/unlinkFile';
import generateOTP from '../../../util/generateOTP';
import { IUser } from './user.interface';
import { User } from './user.model';
import { USER_ROLES } from './user.constant';
import mongoose from 'mongoose';
import { Patient } from '../patient/patient.model';

// ----------------- create user service -----------------
const createUserToDB = async (payload: Partial<IUser>): Promise<IUser> => {
  // check if the user is already exist
  const isExistUser = await User.findOne({ email: payload.email });
  if (isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User already exist');
  }

  const createdUser = await User.create(payload);
  if (!createdUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');
  }

  // verify email if not verified
  if (!createdUser.isVerified) {
    //send email
    const otp = generateOTP();
    const values = {
      name: createdUser.firstName,
      otp: otp,
      email: createdUser.email!,
    };
    const createAccountTemplate = emailTemplate.createAccount(values);
    emailHelper.sendEmail(createAccountTemplate);

    // update user authentication
    const authentication = {
      oneTimeCode: otp,
      expireAt: new Date(Date.now() + 3 * 60000),
    };
    await User.findByIdAndUpdate(createdUser._id, { $set: { authentication } });
  }

  return createdUser;
};

// ----------------- get user profile service -----------------
const getUserById = async (id: string): Promise<Partial<IUser>> => {
  const result = await User.findById(id).populate('patient doctor');
  if (!result) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  if (result.isDeleted) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User is deleted!');
  }

  return result;
};

// ----------------- update user profile service -----------------
const updateUserById = async (
  id: string,
  payload: Partial<IUser>
): Promise<Partial<IUser | null>> => {
  const isExistUser = await User.isExistUserById(id);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  //unlink file here
  if (payload.image && isExistUser.image) {
    unlinkFile(isExistUser.image);
  }

  const updateDoc = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updateDoc;
};

// ----------------- delete user by id -----------------
const deleteUserById = async (id: string) => {
  // check if the user is exist
  const existingUser = await User.findById(id);
  if (!existingUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  const result = await User.findByIdAndUpdate(id, {
    $set: { isDeleted: true },
  });
  return result;
};

// ----------------- delete user by email -----------------
const deleteUserByEmail = async (payload: Partial<IUser>) => {
  // check if the user is exist
  const existingUser = await User.findOne({ email: payload.email }).select(
    '+password'
  );
  if (!existingUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  // check if user already deleted
  if (existingUser.isDeleted) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User already deleted');
  }

  // match password
  if (
    payload.password &&
    !(await User.isMatchPassword(payload.password, existingUser.password))
  ) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Password is incorrect');
  }

  const result = await User.findByIdAndUpdate(
    existingUser._id,
    { $set: { isDeleted: true } },
    { new: true }
  );

  return result;
};

export const UserService = {
  createUserToDB,
  getUserById,
  updateUserById,
  deleteUserById,
  deleteUserByEmail,
};
