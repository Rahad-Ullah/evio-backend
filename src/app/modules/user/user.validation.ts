import { z } from 'zod';
import { USER_GENDER } from './user.constant';

const createUserZodSchema = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName:  z.string().optional(),
    email:     z.string().email('Invalid email').nonempty('Email cannot be empty'),
    password:  z.string().min(8, 'Password must be at least 8 characters'),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
  firstName:  z.string().optional(),
  lastName:   z.string().optional(),
  phone:      z.string().optional(),
  gender:     z.nativeEnum(USER_GENDER).optional(),
  dob:        z.string().optional(),
  occupation: z.string().optional(),
  address:    z.string().optional(),
  language:   z.string().optional(),
  religion:   z.string().optional(),
  image:      z.string().url().optional(),
  })
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
