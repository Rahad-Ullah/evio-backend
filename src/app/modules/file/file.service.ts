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

// ----------------- update file service -----------------
const updateFileIntoDB = async (
  id: string,
  payload: Partial<IFile>
): Promise<IFile> => {
  // check if the file exists
  const existingFile = await File.findById(id);
  if (!existingFile) {
    throw new Error('File not found');
  }

  // check if the file name already taken
  const isNameExist = await File.findOne({
    name: existingFile.name,
    category: existingFile.category,
    parent: existingFile.parent,
  });
  if (isNameExist) {
    throw new Error('Name already exist!');
  }

  const result = await File.findByIdAndUpdate(existingFile._id, payload, {
    new: true,
  });

  if (!result) {
    throw new Error('Failed to update file');
  }

  return result;
};

export const FileServices = { createFileIntoDB, updateFileIntoDB };
