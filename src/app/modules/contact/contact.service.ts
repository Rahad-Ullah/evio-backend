import { IContact } from './contact.interface';
import { Contact } from './contact.model';

// create/update contact info
const createUpdateContact = async (payload: Partial<IContact>): Promise<IContact> => {
    const result = await Contact.findOneAndUpdate({}, payload, { upsert: true, new: true });
    return result;
};

// get contact info
const getContactInfo = async () => {
    const result = await Contact.findOne({}).lean();
    return result;
};

export const ContactServices = {createUpdateContact, getContactInfo };
