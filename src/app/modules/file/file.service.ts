import unlinkFile from '../../../shared/unlinkFile';
import { IFile } from './file.interface';
import { File } from './file.model';

// ----------------- create file service -----------------
const createFileIntoDB = async (payload: Partial<IFile>): Promise<IFile> => {
  // check if the file name already taken
  const isExist = await File.findOne({
    name: payload.name,
    category: payload.category,
    parent: payload.parent,
  });
  if (isExist) {
    throw new Error('Name already exist!');
  }

  const result = await File.create(payload);
  return result;
};

export const FileServices = { createFileIntoDB };
