import { Model, Types } from 'mongoose';
import { BLOOD_GROUP, RELATIONSHIP } from './patient.constants';

export type IPatient = {
  _id?: string;
  user: Types.ObjectId;
  allergy: {
    haveAllergies: boolean;
    allergies: string[];
  };
  isTakingMedicine: boolean;
  medicalCondition: string;
  primaryHealthConcern: string;
  bloodGroup: BLOOD_GROUP;
  isOrganDonor: boolean;
  healthInsurance: {
    haveInsurance: boolean;
    insuranceName: string;
    providerName: string;
  };
  smokingStatus: string;
  healthRating: string;
  height: number;
  weight: number;
  isPregnant: boolean;
  surgicalHistory: {
    procedure: string;
    date: Date;
    hospitalName: string;
  };
  disabilities: string[];
  medicalDevices: string[];
  mentalHealth: {
    pastDiagnoses: string[];
    isOngoingTreatment: boolean;
  };
  documents: string[];
  emergencyContact: IEmergencyContact;
  primaryPhysician: IPrimaryPhysician;
};

export interface IEmergencyContact {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  relationship: RELATIONSHIP;
  isMedicalDecisionMaker: boolean;
}
export interface IPrimaryPhysician {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  clinicName: string;
}

export type PatientModel = Model<IPatient>;
