import { Request, Response } from 'express';
import { SpecialtyServices } from './specialty.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { getSingleFilePath } from '../../../shared/getFilePath';

// create doctor specialty
const createSpecialty = catchAsync(async (req: Request, res: Response) => {
  const image = getSingleFilePath(req.files, 'image');
  const payload = { ...req.body, image };
  const result = await SpecialtyServices.createSpecialty(payload);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Specialty created successfully',
    data: result,
  });
});

// update doctor specialty
const updateSpecialty = catchAsync(async (req: Request, res: Response) => {
  const image = getSingleFilePath(req.files, 'image');
  const payload = { ...req.body, image };
  const result = await SpecialtyServices.updateSpecialty(req.params.id, payload);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Specialty updated successfully',
    data: result,
  });
});

// delete doctor specialty
const deleteSpecialty = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialtyServices.deleteSpecialty(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Specialty deleted successfully',
    data: result,
  });
});

// get all specialties
const getAllSpecialties = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialtyServices.getAllSpecialties(req.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Specialty data retrieved successfully',
    data: result.specialties,
    pagination: result.pagination,
  });
});

export const SpecialtyController = { createSpecialty, updateSpecialty, deleteSpecialty, getAllSpecialties };
