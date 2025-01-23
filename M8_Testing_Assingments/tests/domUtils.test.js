const { toggleVisibility } = require("../src/domUtils");

describe("toggleVisibility", () => {
  let mockElement;

  beforeEach(() => {
    // Create a mock element with a `style` property
    mockElement = { style: { display: "" } };
  });

  test('should set display to "none" when initially visible', () => {
    mockElement.style.display = "block"; // Initially visible

    toggleVisibility(mockElement);

    expect(mockElement.style.display).toBe("none");
  });

  test('should set display to "block" when initially hidden', () => {
    mockElement.style.display = "none"; // Initially hidden

    toggleVisibility(mockElement);

    expect(mockElement.style.display).toBe("block");
  });

  test("should correctly toggle multiple times", () => {
    mockElement.style.display = "none"; // Initially hidden

    toggleVisibility(mockElement);
    expect(mockElement.style.display).toBe("block");

    toggleVisibility(mockElement);
    expect(mockElement.style.display).toBe("none");

    toggleVisibility(mockElement);
    expect(mockElement.style.display).toBe("block");
  });
});
