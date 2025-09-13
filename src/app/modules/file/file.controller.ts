import { Request, Response, NextFunction } from 'express';
import { FileServices } from './file.service';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { getSingleFilePath } from '../../../shared/getFilePath';
import { StatusCodes } from 'http-status-codes';
import { FILE_CATEGORY } from './file.constants';
import fs from 'fs';
import path from 'path';

// create file
const createFile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const image = getSingleFilePath(req.files, 'image');
    const doc = getSingleFilePath(req.files, 'doc');
    const payload = {
      ...req.body,
      user: req.user.id,
      path:
        req.body.category === FILE_CATEGORY.IMAGE
          ? image
          : req.body.category === FILE_CATEGORY.DOCUMENT
          ? doc
          : '',
    };

    // throw error if file not found for file category
    if (payload.category !== FILE_CATEGORY.FOLDER && !payload.path) {
      throw new Error('File is required');
    }

    // set size and extension for files
    if (payload.category !== FILE_CATEGORY.FOLDER) {
      (payload.size = fs.statSync(
        path.join(process.cwd(), 'uploads', payload.path)
      ).size),
        (payload.extension = path.extname(payload.path));
    }

    const result = await FileServices.createFileIntoDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'File created successfully',
      data: result,
    });
  }
);

// update file
const updateFile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = { ...req.body };

    const result = await FileServices.updateFileIntoDB(req.params.id, payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'File updated successfully',
      data: result,
    });
  }
);

export const FileController = { createFile, updateFile };
