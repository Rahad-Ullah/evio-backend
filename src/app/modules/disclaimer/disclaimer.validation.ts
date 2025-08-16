import { z } from 'zod';
import { DISCLAIMER_TYPE } from './disclaimer.constants';

// disclaimer schema
const disclaimerZodSchema = z.object({
  body: z.object({
    type: z.nativeEnum(DISCLAIMER_TYPE),
    content: z.string({ required_error: 'Content is required' }),
  }),
});

export const DisclaimerValidations = { disclaimerZodSchema };
