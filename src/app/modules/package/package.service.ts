import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IPackage } from './package.interface';
import { Package } from './package.model';

// -------------- create package service --------------
const createPackage = async (payload: any): Promise<IPackage> => {
  // check if the package already exist
  const isExist = await Package.findOne({ type: payload.type });
  if (isExist) {
    throw new ApiError(StatusCodes.CONFLICT, 'Package already exist!');
  }

  const result = await Package.create(payload);
  return result;
};

export const PackageServices = { createPackage };
