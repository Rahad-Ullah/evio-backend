import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IPackage } from './package.interface';
import { Package } from './package.model';

// -------------- create package service --------------
const createPackage = async (payload: any): Promise<IPackage> => {
  // check if the package already exist
  const isExist = await Package.findOne({ type: payload.type, isDeleted: false });
  if (isExist) {
    throw new ApiError(StatusCodes.CONFLICT, 'Package already exist!');
  }

  const result = await Package.create(payload);
  return result;
};

// -------------- update package service --------------
const updatePackage = async (id: string, payload: Partial<IPackage>) => {
  // check if the package exists
  const isExistPackage = await Package.findById(id);
  if (!isExistPackage) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Package not found');
  }
  
  const result = await Package.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

// -------------- delete package service --------------
const deletePackage = async (id: string) => {
  // check if the package exists
  const isExistPackage = await Package.findById(id);
  if (!isExistPackage) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Package not found');
  }
  
  const result = await Package.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  return result;
};

export const PackageServices = { createPackage, updatePackage, deletePackage };
