import { Model, Types } from 'mongoose';
import { FILE_CATEGORY, FILE_EXTENSION } from './file.constants';

export type IFile = {
  _id?: Types.ObjectId;
  name: string;
  size: number;
  category: FILE_CATEGORY;
  extension: FILE_EXTENSION;
  path: string;
  parent?: Types.ObjectId;
  user: Types.ObjectId;
};

export type FileModel = Model<IFile>;
