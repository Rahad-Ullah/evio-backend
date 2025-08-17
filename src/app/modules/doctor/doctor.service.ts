import { StatusCodes } from 'http-status-codes';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { DoctorModel, IDoctor } from './doctor.interface';
import { Doctor } from './doctor.model';
import ApiError from '../../../errors/ApiError';
import mongoose from 'mongoose';
import generateOTP from '../../../util/generateOTP';
import { emailTemplate } from '../../../shared/emailTemplate';
import { emailHelper } from '../../../helpers/emailHelper';
import unlinkFile from '../../../shared/unlinkFile';
import QueryBuilder from '../../builder/QueryBuilder';

// --------------- create doctor service -----------------
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

// ------------ update doctor service -----------------
const updateDoctorIntoDB = async (
  userId: string,
  payload: Partial<IDoctor>
) => {
  // check if the doctor exists
  const isExistDoctor = await Doctor.findOne({ user: userId });
  if (!isExistDoctor) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Doctor not found');
  }

  // update doctor
  const result = await Doctor.findByIdAndUpdate(isExistDoctor._id, payload, {
    new: true,
  }).lean();

  // unlink file here
  if (payload.boardCertification && isExistDoctor.boardCertification) {
    unlinkFile(isExistDoctor.boardCertification);
  }

  return result;
};

// get single doctor by id
const getDoctorById = async (id: string) => {
  const result = await Doctor.findById(id)
    .populate([{ path: 'user' }, { path: 'specialty', select: 'name image' }])
    .lean();
  return result;
};

// get all doctors
const getAllDoctors = async (query: Record<string, unknown>) => {
  const doctorQuery = new QueryBuilder(
    Doctor.find()
      .populate([
        {
          path: 'user',
          select: 'firstName lastName image isOnline gender',
          match: query.gender
            ? { gender: { $regex: query.gender as string, $options: 'i' } }
            : {},
        },
        {
          path: 'specialty',
          select: 'name image',
          match: query.searchTerm
            ? { name: { $regex: query.searchTerm as string, $options: 'i' } }
            : {},
        },
      ])
      .select('user specialty')
      .lean(),
    query
  );

  const [doctors, pagination] = await Promise.all([
    doctorQuery.modelQuery.lean(),
    doctorQuery.getPaginationInfo(),
  ]);

  // remove doctors where specialty did not match
  const filteredDoctors = doctors.filter(
    (doc: any) => doc.specialty && doc.user
  );

  return {
    doctors: filteredDoctors,
    pagination,
  };
};

export const DoctorServices = {
  createDoctorIntoDB,
  updateDoctorIntoDB,
  getDoctorById,
  getAllDoctors,
};
