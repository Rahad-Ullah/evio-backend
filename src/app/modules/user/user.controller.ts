import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { getSingleFilePath } from '../../../shared/getFilePath';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
import { USER_ROLES } from './user.constant';

// create user
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = { ...req.body };
    const result = await UserService.createUserToDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'User created successfully',
      data: result,
    });
  }
);

// create admin
const createAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = { ...req.body, role: USER_ROLES.ADMIN, isVerified: true };
    const result = await UserService.createUserToDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Admin created successfully',
      data: result,
    });
  }
);

// get user by id
const getUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUserById(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User data retrieved successfully',
    data: result,
  });
});

// get user profile
const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UserService.getUserById(user.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Profile data retrieved successfully',
    data: result,
  });
});

// update profile
const updateProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    let image = getSingleFilePath(req.files, 'image');

    const payload = {
      image,
      ...req.body,
    };
    const result = await UserService.updateUserById(user.id, payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Profile updated successfully',
      data: result,
    });
  }
);

// delete user by email
const deleteUserByEmail = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteUserByEmail(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User deleted successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  createAdmin,
  getUserById,
  getUserProfile,
  updateProfile,
  deleteUserByEmail
};
