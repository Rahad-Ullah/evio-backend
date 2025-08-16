import { DisclaimerModel, IDisclaimer } from './disclaimer.interface';
import { Disclaimer } from './disclaimer.model';

// -------------- create/update disclaimer service --------------
const createUpdateDisclaimer = async (payload: Partial<IDisclaimer>) => {
  // update or create disclaimer
  const result = await Disclaimer.findOneAndUpdate(
    { type: payload.type },
    payload,
    { upsert: true, new: true }
  );
  return result;
};

export const DisclaimerServices = { createUpdateDisclaimer };
