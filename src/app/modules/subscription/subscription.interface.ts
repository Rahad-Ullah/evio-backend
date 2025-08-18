import { Model, Types } from 'mongoose';
import {
  PAYMENT_PROVIDER,
  SUBSCRIPTION_STATUS,
} from './subscription.constants';

export type ISubscription = {
  _id?: string;
  user: Types.ObjectId;
  package: Types.ObjectId;
  purchaseDate: Date;
  expiresDate: Date;
  status: SUBSCRIPTION_STATUS;
  amount: number;
  paymentProvider: PAYMENT_PROVIDER;
  transactionId: string;
};

export type SubscriptionModel = Model<ISubscription>;
