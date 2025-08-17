import { Schema, model } from 'mongoose';
import { IDoctor, DoctorModel } from './doctor.interface';

const doctorSchema = new Schema<IDoctor, DoctorModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    degree: {
      type: String,
      default: '',
    },
    hospitalName: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    specialty: {
      type: Schema.Types.ObjectId,
      ref: 'Specialty',
      default: null,
    },
    experience: {
      type: Number,
      default: 0,
    },
    licenseNo: {
      type: String,
      default: '',
    },
    boardCertification: {
      type: String,
      default: '',
    },
    isVideoCallAvailable: {
      type: Boolean,
      default: false,
    },
    availableHours: {
      startTime: {
        type: String,
        default: '',
      },
      endTime: {
        type: String,
        default: '',
      },
    },
    availableDays: {
      type: [Number],
      default: [],
    },
    paymentInfo: {
      bankName: {
        type: String,
        default: '',
      },
      accountName: {
        type: String,
        default: '',
      },
      routingNo: {
        type: String,
        default: '',
      },
      accountNo: {
        type: String,
        default: '',
      },
      currency: {
        type: String,
        default: '',
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Doctor = model<IDoctor, DoctorModel>('Doctor', doctorSchema);
