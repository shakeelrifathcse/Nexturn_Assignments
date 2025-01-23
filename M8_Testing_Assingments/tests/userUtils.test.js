const { fetchAndDisplayUser } = require("../src/userUtils");

describe("fetchAndDisplayUser", () => {
  let mockApiService;
  let mockElement;

  beforeEach(() => {
    // Mock the API service
    mockApiService = {
      getUser: jest.fn(),
    };

    // Mock the DOM element
    mockElement = {
      textContent: "",
    };
  });

  test("should display the user name when fetching succeeds", async () => {
    const userId = 1;
    const mockUser = { name: "Alice" };

    // Mock the successful API response
    mockApiService.getUser.mockResolvedValue(mockUser);

    await fetchAndDisplayUser(mockApiService, userId, mockElement);

    expect(mockApiService.getUser).toHaveBeenCalledWith(userId);
    expect(mockElement.textContent).toBe("Hello, Alice");
  });

  test("should display an error message when the user has invalid data", async () => {
    const userId = 2;
    const mockUser = {}; // Missing the `name` property

    // Mock the API response with invalid data
    mockApiService.getUser.mockResolvedValue(mockUser);

    await fetchAndDisplayUser(mockApiService, userId, mockElement);

    expect(mockApiService.getUser).toHaveBeenCalledWith(userId);
    expect(mockElement.textContent).toBe("Invalid user data");
  });

  test("should display an error message when the API call fails", async () => {
    const userId = 3;

    // Mock the API call to reject with an error
    mockApiService.getUser.mockRejectedValue(new Error("User not found"));

    await fetchAndDisplayUser(mockApiService, userId, mockElement);

    expect(mockApiService.getUser).toHaveBeenCalledWith(userId);
    expect(mockElement.textContent).toBe("User not found");
  });
});
