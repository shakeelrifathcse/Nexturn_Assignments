const { sendNotification } = require("../src/notificationUtils");

describe("sendNotification", () => {
  let mockNotificationService;

  beforeEach(() => {
    // Create a mock for the notification service
    mockNotificationService = {
      send: jest.fn(),
    };
  });

  test('should return "Notification Sent" when notificationService.send returns true', () => {
    // Mock successful send
    mockNotificationService.send.mockReturnValue(true);

    const message = "Hello, this is a test notification.";
    const result = sendNotification(mockNotificationService, message);

    expect(mockNotificationService.send).toHaveBeenCalledWith(message);
    expect(result).toBe("Notification Sent");
  });

  test('should return "Failed to Send" when notificationService.send returns false', () => {
    // Mock failed send
    mockNotificationService.send.mockReturnValue(false);

    const message = "Hello, this is a test notification.";
    const result = sendNotification(mockNotificationService, message);

    expect(mockNotificationService.send).toHaveBeenCalledWith(message);
    expect(result).toBe("Failed to Send");
  });
});
