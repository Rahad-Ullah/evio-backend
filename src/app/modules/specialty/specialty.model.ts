import { Schema, model } from 'mongoose';
import { ISpecialty, SpecialtyModel } from './specialty.interface';

const specialtySchema = new Schema<ISpecialty, SpecialtyModel>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Specialty = model<ISpecialty, SpecialtyModel>(
  'Specialty',
  specialtySchema
);
