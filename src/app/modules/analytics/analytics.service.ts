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

  return {
    totalPatients,
    totalDoctors,
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
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const formattedResult = monthNames.map((name, index) => {
    const monthData = result.find(item => item._id === index + 1); // Mongo month is 1-based
    return {
      month: name,
      count: monthData ? monthData.count : 0,
    };
  });

  return formattedResult;
};

export const AnalyticsServices = { getOverview, getMonthlyUserGrowth };
