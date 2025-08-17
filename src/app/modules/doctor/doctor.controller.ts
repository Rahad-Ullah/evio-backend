import { Request, Response, NextFunction } from 'express';
import { DoctorServices } from './doctor.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { USER_ROLES } from '../user/user.constant';
import { getSingleFilePath } from '../../../shared/getFilePath';

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

// update doctor
const updateDoctor = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const boardCertification = getSingleFilePath(req.files, 'doc');
  const payload = { ...req.body, boardCertification };
  const result = await DoctorServices.updateDoctorIntoDB(user.id, payload);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Doctor profile updated successfully',
    data: result,
  });
});

// get doctor by id
const getDoctorById = catchAsync(async (req: Request, res: Response) => {
  const result = await DoctorServices.getDoctorById(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Doctor data retrieved successfully',
    data: result,
  });
});

// get all doctors
const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
  const result = await DoctorServices.getAllDoctors(req.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Doctors data retrieved successfully',
    data: result.doctors,
    pagination: result.pagination,
  });
});

export const DoctorController = { createDoctor, updateDoctor, getDoctorById, getAllDoctors };
