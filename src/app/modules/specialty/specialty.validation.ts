import { z } from 'zod';

// create specialty schema
const createSpecialtyZodSchema = z.object({
  body: z
    .object({
      name: z
        .string({ required_error: 'Name is required' })
        .nonempty('Name cannot be empty'),
      image: z.string({ required_error: 'Image is required' }).optional(),
    })
    .strict('Unnecessary fields found'),
});

// update specialty schema
const updateSpecialtyZodSchema = z.object({
  body: z
    .object({
      name: z.string().optional(),
      image: z.string().url().optional(),
    })
    .strict('Unnecessary fields found'),
});

export const SpecialtyValidations = {
  createSpecialtyZodSchema,
  updateSpecialtyZodSchema,
};
