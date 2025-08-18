import { z } from 'zod';
import {
  PAYMENT_PROVIDER,
  SUBSCRIPTION_STATUS,
} from './subscription.constants';

// subscription schema
const subscriptionZodSchema = z.object({
  body: z.object({
    package: z
      .string({ required_error: 'Package is required' })
      .nonempty('Package cannot be empty'),
    purchaseDate: z
      .string({ required_error: 'Purchase date is required' })
      .nonempty('Purchase date cannot be empty'),
    expiresDate: z
      .string({ required_error: 'Expires date is required' })
      .nonempty('Expires date cannot be empty'),
    status: z.nativeEnum(SUBSCRIPTION_STATUS),
    amount: z
      .number({ required_error: 'Amount is required' })
      .positive('Amount must be greater than 0'),
    paymentProvider: z.nativeEnum(PAYMENT_PROVIDER),
    transactionId: z
      .string({ required_error: 'Transaction ID is required' })
      .nonempty('Transaction ID cannot be empty'),
  }),
});

export const SubscriptionValidations = { subscriptionZodSchema };
