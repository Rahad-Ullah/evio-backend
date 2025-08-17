import { Schema, model } from 'mongoose';
import { IContact, ContactModel } from './contact.interface';

const contactSchema = new Schema<IContact, ContactModel>({
  phone: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
});

export const Contact = model<IContact, ContactModel>('Contact', contactSchema);
