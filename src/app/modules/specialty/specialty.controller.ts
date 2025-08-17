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

export const SpecialtyController = { createSpecialty, updateSpecialty };
