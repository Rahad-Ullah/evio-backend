import { Schema, model } from 'mongoose';
import { IFile, FileModel } from './file.interface';
import { FILE_CATEGORY, FILE_EXTENSION } from './file.constants';

const fileSchema = new Schema<IFile, FileModel>(
  {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: false,
    },
    category: {
      type: String,
      enum: Object.values(FILE_CATEGORY),
      required: true,
    },
    extension: {
      type: String,
      enum: Object.values(FILE_EXTENSION),
      required: false,
    },
    path: {
      type: String,
      required: false,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'File',
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Apply validators to all update operations
fileSchema.pre(
  ['updateOne', 'updateMany', 'findOneAndUpdate'],
  function (next) {
    this.setOptions({ runValidators: true });
    next();
  }
);

export const File = model<IFile, FileModel>('File', fileSchema);
