const { getElement } = require("../src/arrayUtils");

describe("getElement", () => {
  const sampleArray = [10, 20, 30, 40, 50];

  test("should return the correct element for a valid index", () => {
    expect(getElement(sampleArray, 0)).toBe(10);
    expect(getElement(sampleArray, 2)).toBe(30);
    expect(getElement(sampleArray, 4)).toBe(50);
  });

  test("should throw an error for negative indices", () => {
    expect(() => getElement(sampleArray, -1)).toThrow("Index out of bounds");
  });

  test("should throw an error for indices greater than or equal to the array length", () => {
    expect(() => getElement(sampleArray, 5)).toThrow("Index out of bounds");
    expect(() => getElement(sampleArray, 10)).toThrow("Index out of bounds");
  });

  test("should throw an error if the array is empty", () => {
    const emptyArray = [];
    expect(() => getElement(emptyArray, 0)).toThrow("Index out of bounds");
  });
});
