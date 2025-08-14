import { z } from 'zod';
import { USER_GENDER, USER_ROLES, USER_STATUS } from './user.constant';

const createUserZodSchema = z.object({
  body: z.object({
  firstName:  z.string(),
  lastName:   z.string(),
  email:      z.string().email(),
  password:   z.string().min(8),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
  firstName:  z.string().optional(),
  lastName:   z.string().optional(),
  email:      z.string().email().optional(),
  phone:      z.string().optional(),
  gender:     z.nativeEnum(USER_GENDER).optional(),
  dob:        z.string().optional(),
  occupation: z.string().optional(),
  address:    z.string().optional(),
  language:   z.string().optional(),
  religion:   z.string().optional(),
  image:      z.string().url().optional(),
  subscription: z.string().optional(),
  status:     z.nativeEnum(USER_STATUS).optional(),
  isOnline:   z.boolean().optional(),
  isVerified: z.boolean().optional(),
  isDeleted:  z.boolean().optional(),
  })
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
