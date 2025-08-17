import { Model } from 'mongoose';

export type ISpecialty = {
  _id?: string;
  name: string;
  image: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type SpecialtyModel = Model<ISpecialty>;
