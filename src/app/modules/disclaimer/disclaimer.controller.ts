import { Request, Response } from 'express';
import { DisclaimerServices } from './disclaimer.service';
import sendResponse from '../../../shared/sendResponse';

// create/update disclaimer
const createUpdateDisclaimer = async (req: Request, res: Response) => {
  const payload = { ...req.body };
  const result = await DisclaimerServices.createUpdateDisclaimer(payload);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Disclaimer updated successfully',
    data: result,
  });
};

export const DisclaimerController = { createUpdateDisclaimer };
