import { z } from 'zod';

// create specialty schema
const createSpecialtyZodSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .nonempty('Name cannot be empty'),
    image: z.string({ required_error: 'Image is required' }).optional(),
  }),
});

export const SpecialtyValidations = { createSpecialtyZodSchema };
