import { Request, Response, NextFunction } from 'express';
import { DoctorServices } from './doctor.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { USER_ROLES } from '../user/user.constant';

// create doctor
const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const payload = { ...req.body, role: USER_ROLES.DOCTOR };
  const result = await DoctorServices.createDoctorIntoDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Account created successfully. Please verify your email.',
    data: result,
  });
});

export const DoctorController = { createDoctor };
