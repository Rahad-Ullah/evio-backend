import { Schema, model } from 'mongoose';
import { IPatient, PatientModel } from './patient.interface';
import { BLOOD_GROUP, RELATIONSHIP } from './patient.constants';

// --- Emergency Contact Schema ---
const EmergencyContactSchema = new Schema(
  {
    firstName: { type: String, default: '', trim: true },
    lastName: { type: String, default: '', trim: true },
    phone: { type: String, default: '', trim: true },
    email: { type: String, default: '', lowercase: true, trim: true },
    address: { type: String, default: '' },
    relationship: {
      type: String,
      enum: Object.values(RELATIONSHIP),
      default: null,
    },
    isMedicalDecisionMaker: { type: Boolean, default: false },
  },
  { _id: false }
);

// --- Primary Physician Schema ---
const PrimaryPhysicianSchema = new Schema(
  {
    firstName: { type: String, default: '', trim: true },
    lastName: { type: String, default: '', trim: true },
    phone: { type: String, default: '', trim: true },
    email: { type: String, default: '', lowercase: true, trim: true },
    address: { type: String, default: '' },
    clinicName: { type: String, default: '' },
  },
  { _id: false }
);

// --- Allergy Schema ---
const AllergySchema = new Schema(
  {
    haveAllergies: { type: Boolean, default: false },
    allergies: { type: [String], default: [] },
  },
  { _id: false }
);

// --- Health Insurance Schema ---
const HealthInsuranceSchema = new Schema(
  {
    haveInsurance: { type: Boolean, default: false },
    insuranceName: { type: String, default: '' },
    providerName: { type: String, default: '' },
  },
  { _id: false }
);

// --- Surgical History Schema ---
const SurgicalHistorySchema = new Schema(
  {
    procedure: { type: String, default: '' },
    date: { type: Date, default: '' },
    hospitalName: { type: String, default: '' },
  },
  { _id: false }
);

// --- Mental Health Schema ---
const MentalHealthSchema = new Schema(
  {
    pastDiagnoses: { type: [String], default: [] },
    isOngoingTreatment: { type: Boolean, default: false },
  },
  { _id: false }
);

// --- Patient Schema ---
const PatientSchema = new Schema<IPatient>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    allergy: { type: AllergySchema },
    isTakingMedicine: { type: Boolean, default: false },

    medicalCondition: { type: String, default: '' },
    primaryHealthConcern: { type: String, default: '' },

    bloodGroup: {
      type: String,
      enum: Object.values(BLOOD_GROUP),
      default: null,
    },

    isOrganDonor: { type: Boolean, default: false },

    healthInsurance: { type: HealthInsuranceSchema },

    smokingStatus: { type: String, default: '' },
    healthRating: { type: String, default: '' },

    height: { type: Number, default: null },
    weight: { type: Number, default: null },

    isPregnant: { type: Boolean, default: false },

    surgicalHistory: { type: SurgicalHistorySchema },

    disabilities: { type: [String], default: [] },
    medicalDevices: { type: [String], default: [] },

    mentalHealth: { type: MentalHealthSchema },

    documents: { type: [String], default: [] },

    emergencyContact: { type: EmergencyContactSchema },

    primaryPhysician: { type: PrimaryPhysicianSchema },
  },
  {
    timestamps: true,
  }
);

export const Patient = model<IPatient, PatientModel>('Patient', PatientSchema);

// Apply validators to all update operations
PatientSchema.pre(
  ['updateOne', 'updateMany', 'findOneAndUpdate'],
  function (next) {
    this.setOptions({ runValidators: true });
    next();
  }
);
