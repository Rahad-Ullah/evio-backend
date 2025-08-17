import { Model, Types } from 'mongoose';
import { MESSAGE_TYPE } from './message.constants';

export type IMessage = {
  _id?: string;
  chat: Types.ObjectId;
  sender: Types.ObjectId;
  type: MESSAGE_TYPE;
  text?: string;
  image?: string;
  seenBy?: Types.ObjectId[];
};

export type MessageModel = Model<IMessage>;
