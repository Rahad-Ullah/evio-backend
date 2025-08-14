import { z } from 'zod';
import { BLOOD_GROUP, RELATIONSHIP } from './patient.constants';

export const patientSchema = z.object({
  body: z.object({
    user: z.string().nonempty('User cannot be empty'),

    allergy: z.object({
      haveAllergies: z.boolean().optional(),
      allergies: z.array(z.string()).optional(),
    }).optional(),

    isTakingMedicine: z.boolean().optional(),

    medicalCondition: z.string().optional(),
    primaryHealthConcern: z.string().optional(),

    bloodGroup: z.nativeEnum(BLOOD_GROUP).nullable().optional(),

    isOrganDonor: z.boolean().optional(),

    healthInsurance: z.object({
      haveInsurance: z.boolean().optional(),
      insuranceName: z.string().optional(),
      providerName: z.string().optional(),
    }).optional(),

    smokingStatus: z.string().optional(),
    healthRating: z.string().optional(),

    height: z.number().nullable().optional(),
    weight: z.number().nullable().optional(),

    isPregnant: z.boolean().optional(),

    surgicalHistory: z.object({
      procedure: z.string().optional(),
      date: z.preprocess(
        val => (val ? new Date(val as string) : null),
        z.date().nullable().optional()
      ),
      hospitalName: z.string().optional(),
    }).optional(),

    disabilities: z.array(z.string()).optional(),
    medicalDevices: z.array(z.string()).optional(),

    mentalHealth: z.object({
      pastDiagnoses: z.array(z.string()).optional(),
      isOngoingTreatment: z.boolean().optional(),
    }).optional(),

    documents: z.array(z.string()).optional(),

    emergencyContact: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      phone: z.string().optional(),
      email: z.string().email().optional(),
      address: z.string().optional().optional(),
      relationship: z.nativeEnum(RELATIONSHIP).nullable().optional(),
      isMedicalDecisionMaker: z.boolean().optional(),
    }),

    primaryPhysician: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      phone: z.string().optional(),
      email: z.string().email().optional(),
      address: z.string().optional(),
      clinicName: z.string().optional(),
    }),
  }),
});

export const PatientValidations = { patientSchema };
