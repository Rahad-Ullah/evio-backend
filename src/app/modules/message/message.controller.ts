import { Request, Response, NextFunction } from 'express';
import { MessageServices } from './message.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { getSingleFilePath } from '../../../shared/getFilePath';

// create message
const createMessage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const image = getSingleFilePath(req.files, 'image');
    const payload = { ...req.body, sender: req.user.id, image };
    const result = await MessageServices.createMessage(payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Message created successfully',
      data: result,
    });
  }
);

export const MessageController = { createMessage };
