function getElement(arr, index) {
  if (index < 0 || index >= arr.length) {
    throw new Error("Index out of bounds");
  }
  return arr[index];
}

module.exports = { getElement };
