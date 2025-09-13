import { z } from 'zod';
import { FILE_CATEGORY, FILE_EXTENSION } from './file.constants';

// create file schema
const createFileZodSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .nonempty('Name cannot be empty'),
    category: z.nativeEnum(FILE_CATEGORY),
    parent: z.string().optional(),
  }),
});

// update file schema
const updateFileZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    parent: z.string().optional(),
  }),
});

export const FileValidations = { createFileZodSchema, updateFileZodSchema };
