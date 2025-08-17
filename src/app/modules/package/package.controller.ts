import { Request, Response, NextFunction } from 'express';
import { PackageServices } from './package.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

// create package
const createPackage = catchAsync(async (req: Request, res: Response) => {
  const payload = { ...req.body };
  const result = await PackageServices.createPackage(payload);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Package created successfully',
    data: result,
  });
});

// update package
const updatePackage = catchAsync(async (req: Request, res: Response) => {
  const payload = { ...req.body };
  const result = await PackageServices.updatePackage(req.params.id, payload);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Package updated successfully',
    data: result,
  });
});


export const PackageController = { createPackage, updatePackage };
