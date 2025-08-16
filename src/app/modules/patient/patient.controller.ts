import { Request, Response } from 'express';
import { PatientServices } from './patient.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { USER_ROLES } from '../user/user.constant';

// create patient
const createPatient = catchAsync(async (req: Request, res: Response) => {
  const payload = { ...req.body, role: USER_ROLES.PATIENT };
  const result = await PatientServices.createAdminIntoDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Account created successfully. Please verify your email.',
    data: result,
  });
});

export const PatientController = { createPatient };
