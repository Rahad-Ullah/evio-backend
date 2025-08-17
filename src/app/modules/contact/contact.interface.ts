import { Model } from 'mongoose';

export type IContact = {
  _id: string;
  phone: string;
  email: string;
  address: string;
};

export type ContactModel = Model<IContact>;
