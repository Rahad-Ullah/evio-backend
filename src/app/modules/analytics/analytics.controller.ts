import { Request, Response, NextFunction } from 'express';
import { AnalyticsServices } from './analytics.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

// get overview
const getOverview = catchAsync(async (req: Request, res: Response) => {
  const result = await AnalyticsServices.getOverview();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Analytics overview retrieved successfully',
    data: result,
  });
});

// get monthly user growth
const getMonthlyUserGrowth = catchAsync(async (req: Request, res: Response) => {
  const result = await AnalyticsServices.getMonthlyUserGrowth(req.query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Monthly user growth retrieved successfully',
    data: result,
  });
});

// get monthly total revenue
const getMonthlyTotalRevenue = catchAsync(async (req: Request, res: Response) => {
  const result = await AnalyticsServices.getMonthlyTotalRevenue(req.query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Monthly total revenue retrieved successfully',
    data: result,
  });
});

// get user ratio
const getUserRatio = catchAsync(async (req: Request, res: Response) => {
  const result = await AnalyticsServices.getActiveInactiveUserRatio();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User ratio retrieved successfully',
    data: result,
  });
});

export const AnalyticsController = { getOverview, getMonthlyUserGrowth, getMonthlyTotalRevenue, getUserRatio };
