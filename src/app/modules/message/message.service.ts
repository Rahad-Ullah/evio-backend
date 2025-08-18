import { JwtPayload } from 'jsonwebtoken';
import { Chat } from '../chat/chat.model';
import { IMessage } from './message.interface';
import { Message } from './message.model';
import ApiError from '../../../errors/ApiError';
import QueryBuilder from '../../builder/QueryBuilder';
import { MESSAGE_TYPE } from './message.constants';
import { sendNotifications } from '../../../helpers/notificationHelper';
import { NOTIFICATION_TYPE } from '../notification/notification.constants';
import { Types } from 'mongoose';

// ----------------- create message service ---------------
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

  // ✅ Find the receiver(s): all participants except the sender
  const receivers = isChatExist.participants.filter(
    (participantId: Types.ObjectId) =>
      participantId.toString() !== payload.sender.toString()
  );

  // notify the receiver(s) for attachment
  if (payload.type === MESSAGE_TYPE.IMAGE) {
    await Promise.all(
      receivers.map((receiverId: Types.ObjectId) =>
        sendNotifications({
          type: NOTIFICATION_TYPE.ATTACHMENT,
          title: 'Attachment',
          receiver: receiverId,
          referenceId: result._id.toString(),
        })
      )
    );
  }

  // update the chat to sort it to the top
  await Chat.findByIdAndUpdate(payload.chat, {});

  return result;
};

// ----------------- get messages by chat id -------------------
export const getChatMessages = async (
  chatId: string,
  query: Record<string, any>,
  user: JwtPayload
) => {
  // check if the chat exists
  const existingChat = await Chat.findById(chatId);
  if (!existingChat) throw new ApiError(401, 'Chat not found');

  // get another participant
  const anotherParticipant = existingChat.participants.filter(
    participant => participant.toString() !== user?.id
  )[0];

  // update seen status those are not seen by the user
  await Message.updateMany(
    { chat: chatId, seenBy: { $nin: [user?.id] } },
    { $addToSet: { seenBy: user?.id } }
  );

  // get messages
  const messageQuery = new QueryBuilder(
    Message.find({ chat: chatId })
      .populate('sender', 'firstName lastName image')
      .sort({ createdAt: -1 })
      .lean(),
    query
  )
    .paginate()
    .search(['text'])
    .filter();

  const [messages, pagination] = await Promise.all([
    messageQuery.modelQuery.lean(),
    messageQuery.getPaginationInfo(),
  ]);

  // add seen status to messages
  const messagesWithStatus = messages.map((message: any) => {
    return {
      ...message,
      isSeen: message.seenBy
        .map((id: string) => id.toString())
        .includes(anotherParticipant.toString()),
    };
  });

  return { messages: messagesWithStatus, pagination };
};

export const MessageServices = { createMessage, getChatMessages };
