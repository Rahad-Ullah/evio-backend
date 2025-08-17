import { Request, Response, NextFunction } from 'express';
import { ContactServices } from './contact.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

// contact info
const createUpdateContact = catchAsync(async (req: Request, res: Response) => {
  const payload = { ...req.body };
  const result = await ContactServices.createUpdateContact(payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Contact info updated successfully',
    data: result,
  });
});

// get contact info
const getContactInfo = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactServices.getContactInfo();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Contact info retrieved successfully',
    data: result,
  });
});

export const ContactController = { createUpdateContact, getContactInfo };
