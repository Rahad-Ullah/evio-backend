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

export const AnalyticsServices = { getOverview };
