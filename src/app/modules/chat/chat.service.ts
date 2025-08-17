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
  const isExist = await Chat.findOne({
    participants: { $all: participants },
    isDeleted: false,
  });
  if (isExist) {
    return isExist;
  }

  const result = await Chat.create({ participants });
  return result;
};

// ---------------- delete chat service ----------------
const deleteChatFromDB = async (chatId: string) => {
  const isExist = await Chat.findById(chatId);
  if (!isExist) {
    throw new Error('Chat not found');
  }

  const result = await Chat.findByIdAndUpdate(
    chatId,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const ChatServices = { createChatIntoDB, deleteChatFromDB };
