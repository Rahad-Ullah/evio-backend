import { Model } from 'mongoose';
import { DISCLAIMER_TYPE } from './disclaimer.constants';

export type IDisclaimer = {
  _id?: string;
  type: DISCLAIMER_TYPE;
  content: string;
};

export type DisclaimerModel = Model<IDisclaimer>;
