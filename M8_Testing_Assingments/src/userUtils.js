async function fetchAndDisplayUser(apiService, userId, element) {
  try {
    const user = await apiService.getUser(userId);
    if (!user.name) throw new Error("Invalid user data");
    element.textContent = `Hello, ${user.name}`;
  } catch (error) {
    element.textContent = error.message;
  }
}

module.exports = { fetchAndDisplayUser };
