import { StatusCodes } from 'http-status-codes';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { DoctorModel } from './doctor.interface';
import { Doctor } from './doctor.model';
import ApiError from '../../../errors/ApiError';
import mongoose from 'mongoose';
import generateOTP from '../../../util/generateOTP';
import { emailTemplate } from '../../../shared/emailTemplate';
import { emailHelper } from '../../../helpers/emailHelper';

// create doctor
const createDoctorIntoDB = async (payload: Partial<IUser>) => {
  // check if the user already exists
  const isExistUser = await User.findOne({ email: payload.email });
  if (isExistUser) {
    throw new ApiError(StatusCodes.CONFLICT, 'User already exists');
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // create user
    const userRes = await User.create([payload], { session });
    const createdUser = userRes[0];

    // create doctor
    const doctorRes = await Doctor.create([{ user: createdUser._id }], {
      session,
    });
    const createdDoctor = doctorRes[0];

    // assign patient id to the user
    await User.findByIdAndUpdate(
      createdUser._id,
      { doctor: createdDoctor._id },
      { session }
    );

    // commit transaction
    await session.commitTransaction();

    // send verification email if user is not verified
    if (createdUser && !createdUser.isVerified) {
      const otp = generateOTP();
      const values = {
        name: createdUser.firstName,
        otp,
        email: createdUser.email!,
      };

      // send email
      const createAccountTemplate = emailTemplate.createAccount(values);
      await emailHelper.sendEmail(createAccountTemplate);

      // update user authentication
      const authentication = {
        oneTimeCode: otp,
        expireAt: new Date(Date.now() + 3 * 60000), // 3 minutes expiry
      };
      await User.findByIdAndUpdate(createdUser._id, {
        $set: { authentication },
      });
    }

    return null;
  } catch (error) {
    await session.abortTransaction();
    console.error('Transaction aborted due to error:', error);
    throw error;
  } finally {
    session.endSession();
  }
};

export const DoctorServices = {createDoctorIntoDB};
