function capitalize(word) {
  if (!word) return "";
  return word[0].toUpperCase() + word.slice(1);
}

function reverseString(str) {
  return str.split("").reverse().join("");
}

module.exports = { capitalize, reverseString }; // For Node.js
