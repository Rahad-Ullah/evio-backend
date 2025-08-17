import { Model, Types } from 'mongoose';

export type IDoctor = {
  _id?: string;
  user: Types.ObjectId;
  degree: string;
  hospitalName: string;
  bio: string;
  specialty: Types.ObjectId;
  experience: number;
  licenseNo: string;
  boardCertification?: string;
  isVideoCallAvailable: boolean;
  availableHours: {
    startTime: string;
    endTime: string;
  };
  availableDays: number[];
  paymentInfo: {
    bankName: string;
    accountName: string;
    routingNo: string;
    accountNo: string;
    currency: string;
  };
};

export type DoctorModel = Model<IDoctor>;
