function sendNotification(notificationService, message) {
  const status = notificationService.send(message);
  return status ? "Notification Sent" : "Failed to Send";
}

module.exports = { sendNotification };
