import { z } from 'zod';

// doctor schema
const doctorZodSchema = z.object({
  body: z
    .object({
      degree: z.string().optional(),
      hospitalName: z.string().optional(),
      bio: z.string().optional(),
      specialty: z.string().optional(),
      experience: z.number().optional(),
      licenseNo: z.string().optional(),
      boardCertification: z.string().url().optional(),
      isVideoCallAvailable: z.boolean().optional(),
      availableHours: z
        .object({
          startTime: z.string().optional(),
          endTime: z.string().optional(),
        })
        .optional(),
      availableDays: z.array(z.number()).optional(),
      paymentInfo: z
        .object({
          bankName: z.string().optional(),
          accountName: z.string().optional(),
          routingNo: z.string().optional(),
          accountNo: z.string().optional(),
          currency: z.string().optional(),
        })
        .optional(),
    })
    .strict('Unnecessary fields not allowed'),
});

export const DoctorValidations = { doctorZodSchema };
