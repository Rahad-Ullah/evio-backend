import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { Patient } from './patient.model';
import generateOTP from '../../../util/generateOTP';
import { emailTemplate } from '../../../shared/emailTemplate';
import { emailHelper } from '../../../helpers/emailHelper';
import mongoose from 'mongoose';
import { IPatient } from './patient.interface';

// --------------- create admin service -----------------
const createPatientIntoDB = async (payload: Partial<IUser>) => {
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

    // create patient
    const patientRes = await Patient.create([{ user: createdUser._id }], {
      session,
    });
    const createdPatient = patientRes[0];

    // assign patient id to the user
    await User.findByIdAndUpdate(
      createdUser._id,
      { patient: createdPatient._id },
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

// ----------------- update patient service -----------------
const updatePatientIntoDB = async (id: string, payload: Partial<IPatient>) => {
    return payload
};

// ----------------- delete patient service -----------------

export const PatientServices = { createPatientIntoDB, updatePatientIntoDB };
