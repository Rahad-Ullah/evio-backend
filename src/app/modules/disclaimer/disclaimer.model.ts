import { Schema, model } from 'mongoose';
import { IDisclaimer, DisclaimerModel } from './disclaimer.interface';
import { DISCLAIMER_TYPE } from './disclaimer.constants';

const disclaimerSchema = new Schema<IDisclaimer, DisclaimerModel>(
  {
    type: {
      type: String,
      enum: Object.values(DISCLAIMER_TYPE),
      required: true,
    },
    content: {
      type: String,
      required: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Disclaimer = model<IDisclaimer, DisclaimerModel>(
  'Disclaimer',
  disclaimerSchema
);
