import { Model } from 'mongoose';
import { PACKAGE_TYPE } from './package.constants';

export type IPackage = {
  _id: string;
  type: PACKAGE_TYPE;
  price: number;
  benefits: string[];
  isDeleted: boolean;
};

export type PackageModel = Model<IPackage>;
