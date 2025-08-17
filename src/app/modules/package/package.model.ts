import { Schema, model } from 'mongoose';
import { IPackage, PackageModel } from './package.interface';
import { PACKAGE_TYPE } from './package.constants';

const packageSchema = new Schema<IPackage, PackageModel>({
  type: {
    type: String,
    enum: Object.values(PACKAGE_TYPE),
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  benefits: {
    type: [String],
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Package = model<IPackage, PackageModel>('Package', packageSchema);
