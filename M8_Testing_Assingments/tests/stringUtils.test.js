const { capitalize, reverseString } = require("../src/stringUtils");

describe("capitalize", () => {
  test("should capitalize the first letter of a word", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  test("should return an empty string if input is an empty string", () => {
    expect(capitalize("")).toBe("");
  });

  test("should handle single-character words correctly", () => {
    expect(capitalize("a")).toBe("A");
  });

  test("should not modify the rest of the word", () => {
    expect(capitalize("world")).toBe("World");
    expect(capitalize("javascript")).toBe("Javascript");
  });

  test("should handle non-string inputs gracefully (if not sanitized)", () => {
    expect(capitalize(null)).toBe("");
    expect(capitalize(undefined)).toBe("");
  });
});

describe("reverseString", () => {
  test("should reverse a normal string", () => {
    expect(reverseString("hello")).toBe("olleh");
  });

  test("should handle empty strings", () => {
    expect(reverseString("")).toBe("");
  });

  test("should handle single-character strings", () => {
    expect(reverseString("a")).toBe("a");
  });

  test("should reverse a palindrome correctly", () => {
    expect(reverseString("madam")).toBe("madam");
  });

  test("should handle strings with spaces and special characters", () => {
    expect(reverseString("a b c")).toBe("c b a");
    expect(reverseString("hello!")).toBe("!olleh");
  });
});
