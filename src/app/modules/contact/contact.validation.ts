import { z } from 'zod';

// create/update contact info
const contactZodSchema = z.object({
  body: z
    .object({
      phone: z.string().optional(),
      email: z.string().email('Invalid email').optional(),
      address: z.string().optional(),
    })
    .strict('Unnecessary fields not allowed'),
});

export const ContactValidations = { contactZodSchema };
