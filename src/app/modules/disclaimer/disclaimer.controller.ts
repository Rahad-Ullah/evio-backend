import { Request, Response } from 'express';
import { DisclaimerServices } from './disclaimer.service';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';

// create/update disclaimer
const createUpdateDisclaimer = catchAsync(async (req: Request, res: Response) => {
    const payload = { ...req.body };
    const result = await DisclaimerServices.createUpdateDisclaimer(payload);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Disclaimer updated successfully',
      data: result,
    });
  });

// get disclaimer
const getDisclaimer = catchAsync(async (req: Request, res: Response) => {
  const result = await DisclaimerServices.getDisclaimer(req.params.type);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Disclaimer data retrieved successfully',
    data: result,
  });
});

export const DisclaimerController = { createUpdateDisclaimer, getDisclaimer };
