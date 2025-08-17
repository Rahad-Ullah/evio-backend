import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Specialty } from './specialty.model';

const createSpecialty = async (payload: any): Promise<any> => {
  // check if the specialty is already exist
  const isExist = await Specialty.findOne({ name: payload.name });
  if (isExist) {
    throw new ApiError(StatusCodes.CONFLICT, 'Specialty already exist!');
  }

  const result = await Specialty.create(payload);
  return result;
};

export const SpecialtyServices = { createSpecialty };
