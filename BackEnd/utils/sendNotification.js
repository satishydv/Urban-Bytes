import notificationModel from "../models/Notification.models.js";
import { io } from "../server.js"

const sendNotification = async ({
  userEmail, title, message, type = "order", orderId = null, }) => {
  const notification = await notificationModel.create({
    userEmail,
    title,
    message,
    type,
    orderId,
  });

  if (!notification) return;

  // Emit real-time notification to the user  
  io.to(userEmail).emit("notification", notification);
  return notification;

};

export default sendNotification;
