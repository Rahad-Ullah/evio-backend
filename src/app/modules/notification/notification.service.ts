import { FilterQuery } from 'mongoose';
import { Notification } from './notification.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { timeAgo } from '../../../util/timeAgo';

// ----------------- get notification by user id -----------------
const getUserNotificationFromDB = async (
  userId: string,
  query: FilterQuery<any>
): Promise<Object> => {
  const notificationQuery = new QueryBuilder(
    Notification.find({ receiver: userId }).sort('-createdAt'),
    query
  ).paginate();

  const [notifications, pagination, unreadCount] = await Promise.all([
    notificationQuery.modelQuery.lean().exec(),
    notificationQuery.getPaginationInfo(),
    Notification.countDocuments({ receiver: userId, isRead: false }),
  ]);

  return {
    notifications: notifications.map((notification: any) => {
      return {
        ...notification,
        timeAgo: timeAgo(notification.createdAt),
      };
    }),
    pagination,
    unreadCount,
  };
};

export const NotificationServices = { getUserNotificationFromDB };
