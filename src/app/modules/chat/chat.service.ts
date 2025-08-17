import { IChat } from './chat.interface';
import { Chat } from './chat.model';

// ---------------- create chat service ---------------
const createChatIntoDB = async (
  userId: string,
  payload: any
): Promise<IChat> => {
  const participants = [...payload.participants];
  // push the user id to participants if not already included
  if (!participants.includes(userId)) {
    participants.push(userId);
  }

  // create chat if it does not exist
  const isExist = await Chat.findOne({ participants: { $all: participants } });
  if (isExist) {
    return isExist;
  }

  const result = await Chat.create({ participants });
  return result;
};

export const ChatServices = { createChatIntoDB };
