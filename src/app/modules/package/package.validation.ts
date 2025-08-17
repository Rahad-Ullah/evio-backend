import { z } from 'zod';
import { PACKAGE_TYPE } from './package.constants';

// create package schema
const createPackageZodSchema = z.object({
  body: z
    .object({
      type: z.nativeEnum(PACKAGE_TYPE),
      price: z
        .number({ required_error: 'Price is required' })
        .positive('Price must be greater than 0'),
      benefits: z
        .array(z.string({ required_error: 'Benefit is required' }))
        .nonempty('Benefits cannot be empty'),
    })
    .strict('Unnecessary fields found'),
});

// update package schema
const updatePackageZodSchema = z.object({
  body: z
    .object({
      type: z.nativeEnum(PACKAGE_TYPE).optional(),
      price: z.number().positive('Price must be greater than 0').optional(),
      benefits: z.array(z.string()).optional(),
    })
    .strict('Unnecessary fields found'),
});

export const PackageValidations = { createPackageZodSchema, updatePackageZodSchema };
