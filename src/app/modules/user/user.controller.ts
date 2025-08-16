import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { getSingleFilePath } from '../../../shared/getFilePath';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
import { USER_ROLES, USER_STATUS } from './user.constant';
import ApiError from '../../../errors/ApiError';

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

// toggle user status
const toggleUserStatus = catchAsync(async (req: Request, res: Response) => {
  const existingUser = await UserService.getUserById(req.params.id);
  const result = await UserService.updateUserById(req.params.id, {status: existingUser.status === USER_STATUS.ACTIVE ? USER_STATUS.INACTIVE : USER_STATUS.ACTIVE});

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User status updated successfully',
    data: result,
  });
});

// delete user by id
const deleteUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteUserById(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User deleted successfully',
    data: result,
  });
});

// delete user profile
const deleteUserProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UserService.deleteUserById(user.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User profile deleted successfully',
    data: result,
  });
});

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

  if (result.status !== USER_STATUS.ACTIVE) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Your account has been deactivated. Please contact support.'
    );
  }

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Profile data retrieved successfully',
    data: result,
  });
});

// get all users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers(req.query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Users data retrieved successfully',
    data: result.users,
    pagination: result.pagination,
  });
});

export const UserController = {
  createUser,
  createAdmin,
  updateProfile,
  toggleUserStatus,
  deleteUserById,
  deleteUserProfile,
  deleteUserByEmail,
  getUserById,
  getUserProfile,
  getAllUsers,
};
