document.addEventListener("DOMContentLoaded", () => {
  const highscoresList = document.getElementById("highscores-list");
  const clearScoresButton = document.getElementById("clear-scores");

  // Retrieve highscores from local storage
  const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

  // Display highscores in the list
  highscores.forEach((entry, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${entry.initials} - ${
      entry.timeLeft
    }`;
    highscoresList.appendChild(listItem);
  });

  // Clear scores button click handler
  clearScoresButton.addEventListener("click", () => {
    localStorage.removeItem("highscores");
    highscoresList.innerHTML = ""; // Clear displayed list items
  });
});
