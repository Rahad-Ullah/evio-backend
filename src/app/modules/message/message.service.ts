import { Chat } from '../chat/chat.model';
import { IMessage } from './message.interface';
import { Message } from './message.model';

// create message
const createMessage = async (payload: IMessage): Promise<IMessage> => {
  // check if the chat exists and the sender is a participant
  const isChatExist = await Chat.findOne({
    _id: payload.chat,
    isDeleted: false,
    participants: { $in: [payload.sender] },
  });
  if (!isChatExist) throw new Error('Chat not found or deleted');

  const result = await Message.create(payload);

  // emit socket event for new message
  //@ts-ignore
  const io = global.io;
  if (io) {
    io.emit(`getMessage::${payload.chat}`, result);
  }

  // update the chat to sort it to the top
  await Chat.findByIdAndUpdate(payload.chat, {});

  return result;
};

export const MessageServices = { createMessage };
