import { IDisclaimer } from './disclaimer.interface';
import { Disclaimer } from './disclaimer.model';

// -------------- create/update disclaimer service --------------
const createUpdateDisclaimer = async (payload: Partial<IDisclaimer>) => {
  const result = await Disclaimer.findOneAndUpdate(
    { type: payload.type },
    payload,
    { upsert: true, new: true }
  );
  return result;
};

// -------------- get disclaimer service --------------
const getDisclaimer = async (type: string) => {
  const result = await Disclaimer.findOne({ type });
  return result;
};

export const DisclaimerServices = { createUpdateDisclaimer, getDisclaimer };
