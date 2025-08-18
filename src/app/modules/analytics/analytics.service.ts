import { Subscription } from '../subscription/subscription.model';
import { USER_ROLES } from '../user/user.constant';
import { User } from '../user/user.model';

// ---------------- get overview ----------------
const getOverview = async () => {
  const totalPatients = await User.countDocuments({
    role: USER_ROLES.PATIENT,
  });

  const totalDoctors = await User.countDocuments({
    role: USER_ROLES.DOCTOR,
  });

  const totalSubscriptions = await Subscription.countDocuments();

  const totalRevenue = await Subscription.aggregate([
    {
      $group: {
        _id: null,
        totalAmount: { $sum: '$amount' },
      },
    },
    {
      $project: {
        _id: 0,
        totalAmount: 1,
      },
    },
  ]);

  return {
    totalPatients,
    totalDoctors,
    totalSubscriptions,
    totalRevenue: totalRevenue[0]?.totalAmount || 0,
  };
};

// ---------------- get monthly user growth ---------------
const getMonthlyUserGrowth = async (query: Record<string, unknown>) => {
  const year = Number(query.year) || new Date().getFullYear();

  const result = await User.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01`),
          $lt: new Date(`${year + 1}-01-01`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$createdAt' },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  // Map month number (1-12) to name
  const monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

  const formattedResult = monthNames.map((name, index) => {
    const monthData = result.find(item => item._id === index + 1); // Mongo month is 1-based
    return {
      month: name,
      count: monthData ? monthData.count : 0,
    };
  });

  return formattedResult;
};

// ---------------- get monthly total revenue ---------------
const getMonthlyTotalRevenue = async (query: Record<string, any>) => {
  const year = Number(query.year) || new Date().getFullYear();

  // Step 1: MongoDB aggregation
  const result = await Subscription.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01`),
          $lt: new Date(`${year + 1}-01-01`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$createdAt' },
        amount: { $sum: '$amount' },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  // Step 2: All 12 month names
  const monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Step 3: Merge with full 12 months
  const finalResult = monthNames.map((name, index) => {
    const monthData = result.find(item => item._id === index + 1);
    return {
      month: name,
      amount: monthData ? monthData.amount : 0,
    };
  });

  return finalResult;
};

// ---------------- get active/inactive user ratio ---------------
const getActiveInactiveUserRatio = async () => {
  const result = await User.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        status: '$_id',
        count: 1,
      },
    },
  ]);

  return result;
};

export const AnalyticsServices = {
  getOverview,
  getMonthlyUserGrowth,
  getMonthlyTotalRevenue,
  getActiveInactiveUserRatio,
};
