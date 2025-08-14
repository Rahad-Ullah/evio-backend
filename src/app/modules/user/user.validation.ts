import { z } from 'zod';
import { USER_GENDER, USER_ROLES, USER_STATUS } from './user.constant';

const createUserZodSchema = z.object({
  body: z.object({
  firstName:  z.string().nonempty('First name cannot be empty'),
  lastName:   z.string().nonempty('Last name cannot be empty'),
  email:      z.string().email(),
  password:   z.string().min(8),
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
