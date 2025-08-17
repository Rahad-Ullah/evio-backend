import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Specialty } from './specialty.model';
import unlinkFile from '../../../shared/unlinkFile';
import QueryBuilder from '../../builder/QueryBuilder';

// ----------------- create specialty -----------------
const createSpecialty = async (payload: any): Promise<any> => {
  // check if the specialty is already exist
  const isExist = await Specialty.findOne({ name: payload.name });
  if (isExist) {
    throw new ApiError(StatusCodes.CONFLICT, 'Specialty already exist!');
  }

  const result = await Specialty.create(payload);
  return result;
};

// ----------------- update specialty -----------------
const updateSpecialty = async (id: string, payload: any): Promise<any> => {
  // check if the specialty exists
  const isExistSpecialty = await Specialty.findById(id);
  if (!isExistSpecialty) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Specialty not found');
  }

  // check if the name already taken
  if (isExistSpecialty.name !== payload.name) {
    const isExist = await Specialty.findOne({ name: payload.name });
    if (isExist) {
      throw new ApiError(StatusCodes.CONFLICT, 'Specialty name already taken!');
    }
  }

  const result = await Specialty.findByIdAndUpdate(id, payload, { new: true });

  // unlink file here
  if (payload.image && isExistSpecialty.image) {
    unlinkFile(isExistSpecialty.image);
  }

  return result;
};

// ----------------- delete specialty -----------------
const deleteSpecialty = async (id: string): Promise<any> => {
  // check if the specialty exists
  const isExistSpecialty = await Specialty.findById(id);
  if (!isExistSpecialty) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Specialty not found');
  }

  const result = await Specialty.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

// get all specialties
const getAllSpecialties = async (query: Record<string, unknown>) => {
  const specialtyQuery = new QueryBuilder(
    Specialty.find({ isDeleted: false }),
    query
  )
    .filter()
    .search(['name'])
    .sort()
    .paginate();

  const [specialties, pagination] = await Promise.all([
    specialtyQuery.modelQuery.lean(),
    specialtyQuery.getPaginationInfo(),
  ]);

  return {
    specialties,
    pagination,
  };
};

export const SpecialtyServices = { createSpecialty, updateSpecialty, deleteSpecialty, getAllSpecialties };
